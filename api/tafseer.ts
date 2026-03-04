import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
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

    const { surah, ayah, arabic, urduTranslation, englishTranslation } = req.body;

    if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({ error: 'GEMINI_API_KEY not configured' });
    }

    try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const prompt = `
            You are an Islamic scholar. Provide a JSON response with:
            1. "explanation": A clear, general Tafseer (explanation) in Urdu for the following Quran Ayah.
            2. "englishExplanation": A clear, general Tafseer (explanation) in English for the following Quran Ayah.
            3. "backgroundHistory": A detailed "Asbab al-Nuzul" (Background History) explaining when this Ayah was revealed and the story behind it in English.
            4. "backgroundHistoryUrdu": A detailed "Asbab al-Nuzul" (Background History) explaining when this Ayah was revealed and the story behind it in Urdu.
            5. "historicalContext": A brief section providing historical context or related events mentioned in the Quran or authentic Hadith relevant to this Ayah in English.
            6. "historicalContextUrdu": A brief section providing historical context or related events mentioned in the Quran or authentic Hadith relevant to this Ayah in Urdu.
            7. "didYouKnow": A fun fact related to this Ayah or Surah in English.
            8. "quiz": A simple multiple choice question object with "question" (string), "options" (array of 3 strings), and "correctIndex" (number 0-2).

            Surah: ${surah}, Ayah: ${ayah}
            Arabic: ${arabic}
            Urdu Translation: ${urduTranslation}
            English Translation: ${englishTranslation}
            
            Format: JSON only. No markdown.
        `;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: { responseMimeType: "application/json" }
        });

        const data = JSON.parse(response.text);
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching tafseer:', error);
        res.status(500).json({ error: 'Failed to fetch tafseer' });
    }
}
