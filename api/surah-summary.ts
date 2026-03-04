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

    const { surahName, surahNumber, ayahCount } = req.body;

    if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({ error: 'GEMINI_API_KEY not configured' });
    }

    try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const prompt = `
            You are an Islamic scholar creating a comprehensive study guide for Surah ${surahName} (Chapter ${surahNumber}).
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

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: { responseMimeType: "application/json" }
        });

        const data = JSON.parse(response.text);
        res.status(200).json(data);
    } catch (error) {
        console.error('Error generating surah summary:', error);
        res.status(500).json({ error: 'Failed to generate surah summary' });
    }
}
