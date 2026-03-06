import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// Fix for ES modules __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from root
dotenv.config({ path: path.join(__dirname, '../.env') });

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
    console.error('GEMINI_API_KEY not found in .env');
    process.exit(1);
}

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
const DATA_DIR = path.join(__dirname, '../frontend/public/quran-data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

interface Surah {
    number: number;
    name: string;
    englishName: string;
    englishNameTranslation: string;
    numberOfAyahs: number;
    revelationType: string;
}

interface Ayah {
    number: number;
    text: string;
    translation: string;
}

async function fetchSurahList(): Promise<Surah[]> {
    try {
        const res = await axios.get('http://api.alquran.cloud/v1/surah');
        return res.data.data;
    } catch (error) {
        console.error('Failed to fetch Surah list:', error);
        return [];
    }
}

async function fetchSurahAyahs(surahNumber: number): Promise<Ayah[]> {
    try {
        // Fetch English translation (Sahih International)
        const res = await axios.get(`http://api.alquran.cloud/v1/surah/${surahNumber}/en.sahih`);
        return res.data.data.ayahs.map((a: any) => ({
            number: a.numberInSurah,
            text: a.text, // This is English translation text from en.sahih
            translation: a.text // Use same for now as prompt expects translation
        }));
    } catch (error) {
        console.error(`Failed to fetch Ayahs for Surah ${surahNumber}:`, error);
        return [];
    }
}

async function generateWithRetry(generator: () => Promise<any>, retries = 3, delay = 60000): Promise<any> {
    for (let i = 0; i < retries; i++) {
        try {
            return await generator();
        } catch (error: any) {
            if (error?.status === 429 || error?.message?.includes('429')) {
                console.log(`  Rate limit hit. Waiting ${delay / 1000}s before retry ${i + 1}/${retries}...`);
                await new Promise(resolve => setTimeout(resolve, delay));
            } else {
                throw error;
            }
        }
    }
    return null;
}

async function generateSurahSummary(surah: Surah) {
    const prompt = `
        You are an Islamic scholar creating a comprehensive study guide for Surah ${surah.englishName} (Chapter ${surah.number}).
        Provide a detailed JSON response with the following sections suitable for a PDF download:

        1. "introduction": A brief introduction to the Surah (Meaning of name, Period of revelation, Main themes).
        2. "background": Detailed "Asbab al-Nuzul" (Background of Revelation) explaining the context.
        3. "keyThemes": A list of 3-5 key themes or lessons covered in this Surah.
        4. "summary": A concise summary of the Surah's content.
        5. "virtues": Authentic Hadith regarding the virtues of reciting this Surah (if any).
        6. "quiz": A list of 5 multiple-choice questions to test understanding. Each question object should have:
           - "question": string
           - "options": array of 4 strings
           - "correctAnswer": string (the correct option text)

        Format: JSON only. No markdown.
    `;

    return generateWithRetry(async () => {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: { responseMimeType: "application/json" }
        });
        return JSON.parse(response.text || '{}');
    });
}

async function generateAyahTafseer(surahName: string, ayahs: Ayah[], filePath: string, currentData: any) {
    // Initialize tafseer object if it doesn't exist
    if (!currentData.tafseer) {
        currentData.tafseer = {};
    }

    const BATCH_SIZE = 5; // Reduced batch size to be safer
    for (let i = 0; i < ayahs.length; i += BATCH_SIZE) {
        const batch = ayahs.slice(i, i + BATCH_SIZE);
        
        // Check if we already have tafseer for this entire batch
        const allExist = batch.every((a: any) => currentData.tafseer[a.number]);
        if (allExist) {
            console.log(`  Skipping Ayahs ${batch[0].number}-${batch[batch.length - 1].number} (already exist)`);
            continue;
        }

        console.log(`  Generating Tafseer for Ayahs ${batch[0].number}-${batch[batch.length - 1].number}...`);
        
        const prompt = `
        You are a Quran scholar. Provide a detailed Tafseer (explanation) for the following Ayahs of Surah ${surahName}.
        
        Ayahs:
        ${JSON.stringify(batch.map((a: any) => ({ number: a.number, text: a.text })), null, 2)}

        For EACH Ayah, provide a JSON object with the following keys:
        - explanation (Urdu): Detailed explanation in Urdu.
        - englishExplanation: Detailed explanation in English.
        - backgroundHistory (Urdu): Context of revelation in Urdu.
        - backgroundHistory: Context of revelation in English.
        - historicalContext (Urdu): Historical context in Urdu.
        - historicalContext: Historical context in English.
        - didYouKnow: An interesting fact about the Ayah (English).
        - quiz: A JSON object with "question", "options" (array of 4 strings), and "correctIndex" (0-3).

        Return a JSON object where keys are the Ayah numbers (as strings, e.g., "1", "2") and values are the objects described above.
        ONLY return the JSON.
        `;

        try {
            const batchData = await generateWithRetry(async () => {
                const response = await ai.models.generateContent({
                    model: 'gemini-2.5-flash',
                    contents: prompt,
                    config: { responseMimeType: "application/json" }
                });
                const text = response.text;
                if (!text) return null;
                return JSON.parse(text);
            });
            
            if (batchData) {
                // Update current data
                currentData.tafseer = { ...currentData.tafseer, ...batchData };
                
                // Save immediately to file
                fs.writeFileSync(filePath, JSON.stringify(currentData, null, 2));
                console.log(`  Saved progress for Ayahs ${batch[0].number}-${batch[batch.length - 1].number}`);
            }
            
            // Rate limit pause
            await new Promise(resolve => setTimeout(resolve, 2000));
        } catch (error) {
            console.error(`  Error generating tafseer batch for Ayahs ${batch[0].number}-${batch[batch.length - 1].number}:`, error);
        }
    }
    return currentData.tafseer;
}

async function main() {
    console.log('Fetching Surah list...');
    const surahs = await fetchSurahList();
    console.log(`Found ${surahs.length} Surahs.`);

    // Process ALL Surahs
    // We iterate 1 to 114
    const allSurahNumbers = Array.from({ length: 114 }, (_, i) => i + 1);

    for (const surahNumber of allSurahNumbers) {
        const surah = surahs.find(s => s.number === surahNumber);
        if (!surah) continue;

        const filePath = path.join(DATA_DIR, `${surah.number}.json`);
        let currentData: any = {};

        // Load existing data if available
        if (fs.existsSync(filePath)) {
            try {
                const fileContent = fs.readFileSync(filePath, 'utf-8');
                currentData = JSON.parse(fileContent);
                console.log(`Loaded existing data for Surah ${surah.number} (${surah.englishName}).`);
            } catch (e) {
                console.error(`Error reading existing file for Surah ${surah.number}, starting fresh.`);
                currentData = { surahInfo: surah };
            }
        } else {
            currentData = { surahInfo: surah };
        }

        console.log(`Processing Surah ${surah.number}: ${surah.englishName}...`);

        // 1. Generate Summary if missing
        if (!currentData.summary) {
            console.log('  Generating Summary...');
            const summary = await generateSurahSummary(surah);
            if (summary) {
                currentData.summary = summary;
                // Save summary immediately
                fs.writeFileSync(filePath, JSON.stringify(currentData, null, 2));
                console.log('  Saved Summary.');
            }
        } else {
            console.log('  Summary already exists.');
        }

        // 2. Fetch Ayahs (we need them to check what's missing in tafseer)
        console.log('  Fetching Ayahs list...');
        const ayahs = await fetchSurahAyahs(surah.number);
        
        // 3. Generate Tafseer (Incremental)
        if (!currentData.tafseer) {
            currentData.tafseer = {};
        }
        
        // Check if we have all ayahs
        const totalAyahs = ayahs.length;
        const existingAyahsCount = Object.keys(currentData.tafseer).length;
        
        if (existingAyahsCount < totalAyahs) {
            console.log(`  Generating Tafseer for missing Ayahs (${existingAyahsCount}/${totalAyahs} exist)...`);
            await generateAyahTafseer(surah.englishName, ayahs, filePath, currentData);
        } else {
            console.log('  Tafseer already complete.');
        }

        console.log(`Completed processing Surah ${surah.number}.`);
        
        // Pause between Surahs
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
}

main().catch(console.error);
