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

    const { message } = req.body;

    if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({ error: 'GEMINI_API_KEY not configured' });
    }

    try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const prompt = `You are a friendly, wise, and welcoming Islamic guide.
            Your task is to answer the user's question using the "Explain Like I'm 10" (ELI10) approach.
            
            Guidelines for your response:
            - Use simple, everyday language that a 10-year-old can easily understand.
            - Avoid complex theological jargon. If you must use an Islamic term, explain it simply.
            - Use fun, relatable analogies (like school, games, nature, or family) to explain deep concepts.
            - Keep your tone gentle, loving, and encouraging.
            - Keep paragraphs short (1-3 sentences).
            - IMPORTANT: Do NOT use any Markdown formatting (no ** for bold, no * for italics). Just use plain text and emojis.
            - Use newlines to separate different points or steps.
            
            Question: ${message}`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        res.status(200).json({ text: response.text });
    } catch (error) {
        console.error('Error in chat:', error);
        res.status(500).json({ error: 'Failed to generate response' });
    }
}
