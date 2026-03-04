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
        const prompt = `You are a friendly, welcoming, and wise Muslim friend talking to a non-Muslim child who is curious about Islam. 
            Answer their question simply, gently, and with love. Use analogies suitable for kids.
            
            Format your answer using Markdown:
            - Use **Bold** for key terms.
            - Use ### Headings for different parts of the answer.
            - Use bullet points for lists.
            - Keep paragraphs short and easy to read.
            
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
