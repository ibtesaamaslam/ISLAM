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
            You are an Islamic scholar. Provide a concise JSON response with:
            1. "explanation": A clear, general Tafseer (explanation) in Urdu (max 2 sentences).
            2. "englishExplanation": A clear, general Tafseer (explanation) in English (max 2 sentences).
            3. "backgroundHistory": A brief "Asbab al-Nuzul" (Background History) in English (max 2 sentences).
            4. "backgroundHistoryUrdu": A brief "Asbab al-Nuzul" (Background History) in Urdu (max 2 sentences).
            5. "historicalContext": A brief historical context in English (max 1 sentence).
            6. "historicalContextUrdu": A brief historical context in Urdu (max 1 sentence).
            7. "didYouKnow": A fun fact related to this Ayah or Surah in English (max 1 sentence).
            8. "quiz": A simple multiple choice question object with "question" (string), "options" (array of 3 strings), and "correctIndex" (number 0-2).

            Surah: ${surah}, Ayah: ${ayah}
            Arabic: ${arabic}
            Urdu Translation: ${urduTranslation}
            English Translation: ${englishTranslation}
            
            Format: JSON only. No markdown. Keep it short.
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
