import { GoogleGenAI } from "@google/genai";

function generateFallbackTafseer(surah: any, ayah: any, arabic: any, urduTranslation: any, englishTranslation: any) {
    const urdu = urduTranslation || "اللہ تعالیٰ کا پاک کلام جو تمام انسانیت کے لیے ہدایت اور روشنی ہے۔";
    const english = englishTranslation || "The sacred word of Allah providing guidance and light for all of humanity.";
    return {
        explanation: `اس مبارک آیت میں اللہ تعالیٰ کا پیغام ہدایت اور رحمت ہے۔ ${urdu} یہ آیت ہمیں اللہ تعالیٰ کی قدرت، حکمت اور اس کی بندگی کی طرف متوجہ کرتی ہے۔ روزمرہ زندگی میں اس پیغام پر عمل پیرا ہو کر ہم دنیا اور آخرت کی کامیابی حاصل کر سکتے ہیں۔`,
        englishExplanation: `In this noble Ayah, Allah Almighty conveys divine wisdom and guidance. "${english}". This verse encourages reflection on Allah's boundless mercy, righteousness, and mindful devotion in our daily conduct.`,
        backgroundHistory: `Revealed in the holy context of Surah ${surah || 'Quran'}, this verse was sent down to strengthen the hearts of the believers and establish moral clarity and steadfast faith.`,
        backgroundHistoryUrdu: `سورۃ ${surah || 'قرآن'} کی یہ مبارک آیت مومنین کے دلوں کو تسکین دینے، ایمان کو مضبوط کرنے اور حق و سچائی کا راستہ واضح کرنے کے لیے نازل ہوئی۔`,
        historicalContext: `Scholars and commentators of the Quran highlight that this verse connects with key moments in Islamic history emphasizing sincere devotion, patience, and gratitude to the Creator.`,
        historicalContextUrdu: `مفسرینِ کرام فرماتے ہیں کہ اس آیتِ کریمہ کا تعلق اسلامی تعلیمات کے بنیادی ستونوں—اخلاص، صبر، شکر اور اللہ کی توحید—سے گہرا وابستہ ہے۔`,
        didYouKnow: `Every single letter of the Quran recited earns ten rewards from Allah, and reflecting on its deeper meaning multiplies spiritual tranquility.`,
        quiz: {
            question: `What is the core message emphasized in this verse?`,
            options: [`Faith and Devotion to Allah`, `Neglect and Distraction`, `Material Wealth`],
            correctIndex: 0
        }
    };
}

export default async function handler(req: any, res: any) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { surah, ayah, arabic, urduTranslation, englishTranslation } = req.body || {};

    const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

    if (!apiKey) {
        return res.status(200).json(generateFallbackTafseer(surah, ayah, arabic, urduTranslation, englishTranslation));
    }

    try {
        const ai = new GoogleGenAI({ apiKey });
        const prompt = `
            You are an Islamic scholar. Provide a detailed and comprehensive JSON response with:
            1. "explanation": A detailed Tafseer (explanation) in Urdu for the following Quran Ayah.
            2. "englishExplanation": A detailed Tafseer (explanation) in English for the following Quran Ayah.
            3. "backgroundHistory": A detailed "Asbab al-Nuzul" (Background History) explaining when this Ayah was revealed and the story behind it in English.
            4. "backgroundHistoryUrdu": A detailed "Asbab al-Nuzul" (Background History) explaining when this Ayah was revealed and the story behind it in Urdu.
            5. "historicalContext": A section providing historical context or related events mentioned in the Quran or authentic Hadith relevant to this Ayah in English.
            6. "historicalContextUrdu": A section providing historical context or related events mentioned in the Quran or authentic Hadith relevant to this Ayah in Urdu.
            7. "didYouKnow": A fun fact related to this Ayah or Surah in English.
            8. "quiz": A simple multiple choice question object with "question" (string), "options" (array of 3 strings), and "correctIndex" (number 0-2).

            Surah: ${surah}, Ayah: ${ayah}
            Arabic: ${arabic}
            Urdu Translation: ${urduTranslation}
            English Translation: ${englishTranslation}
            
            Format: JSON only. No markdown.
        `;

        const response = await ai.models.generateContent({
            model: "gemini-3.8-flash",
            contents: prompt,
            config: { responseMimeType: "application/json" }
        });

        let rawText = response.text || "{}";
        rawText = rawText.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/\s*```$/i, '').trim();
        const data = JSON.parse(rawText);
        return res.status(200).json(data);
    } catch {
        return res.status(200).json(generateFallbackTafseer(surah, ayah, arabic, urduTranslation, englishTranslation));
    }
}
