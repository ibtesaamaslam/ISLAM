import { GoogleGenAI } from "@google/genai";

// In-memory cache for audio base64 to ensure instant playback on repeats
const audioCache = new Map<string, { audioBase64: string; mimeType: string }>();

export default async function handler(req: any, res: any) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
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

    const { text, lang } = req.body || {};

    if (!text || typeof text !== 'string' || !text.trim()) {
        return res.status(400).json({ error: 'Text parameter is required' });
    }

    const safeText = text.trim();
    // Cache key incorporates text and language
    const cacheKey = `${lang || 'auto'}_${safeText.slice(0, 300)}`;

    if (audioCache.has(cacheKey)) {
        return res.status(200).json(audioCache.get(cacheKey));
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: 'Gemini API key is not configured' });
    }

    try {
        const ai = new GoogleGenAI({
            apiKey,
            httpOptions: {
                headers: {
                    'User-Agent': 'aistudio-build',
                }
            }
        });
        
        // Use Gemini Flash Lite TTS model with standard speechConfig
        const response = await ai.models.generateContent({
            model: "gemini-3.8-flash-lite-tts",
            contents: [
                {
                    role: "user",
                    parts: [
                        {
                            text: safeText,
                            speechMetadata: {
                                style: lang === 'ur' ? "Warm, peaceful, and melodious recitation" : "Clear, inspiring, and expressive educator",
                            },
                        },
                    ],
                },
            ],
            config: {
                responseModalities: ["AUDIO"],
                speechConfig: {
                    voiceConfig: {
                        prebuiltVoiceConfig: { voiceName: "Kore" },
                    },
                },
            },
        });

        const part = response.candidates?.[0]?.content?.parts?.[0];
        const audioData = part?.inlineData?.data;
        const mimeType = part?.inlineData?.mimeType || "audio/wav";

        if (!audioData) {
            throw new Error("No inline audio data returned from Gemini TTS");
        }

        const result = {
            audioBase64: audioData,
            mimeType: mimeType
        };

        // Cache management: keep maximum 250 entries
        if (audioCache.size > 250) {
            const firstKey = audioCache.keys().next().value;
            if (firstKey) audioCache.delete(firstKey);
        }
        audioCache.set(cacheKey, result);

        return res.status(200).json(result);
    } catch (error: any) {
        console.error("Gemini TTS Generation Error:", error?.message || error);
        return res.status(500).json({
            error: error?.message || "Failed to generate speech with Gemini AI"
        });
    }
}
