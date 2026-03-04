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

    const { surah, ayahs } = req.body; // ayahs is array of { number, text, translation }

    if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({ error: 'GEMINI_API_KEY not configured' });
    }

    try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        
        // We will process in a single prompt to save round trips, but keep it concise
        const prompt = `
            You are an Islamic scholar. Provide a concise Tafseer (explanation) for the following Ayahs of Surah ${surah}.
            
            Ayahs to explain:
            ${ayahs.map(a => `Ayah ${a.number}: ${a.translation}`).join('\n')}

            Return a JSON object where keys are the Ayah numbers (as strings) and values are objects containing:
            {
                "explanation": "Urdu explanation",
                "englishExplanation": "English explanation",
                "quiz": { "question": "...", "options": ["..."], "correctIndex": 0 }
            }
            
            Keep explanations brief but meaningful (2-3 sentences).
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
        console.error('Error batch generating tafseer:', error);
        res.status(500).json({ error: 'Failed to generate batch tafseer' });
    }
}
