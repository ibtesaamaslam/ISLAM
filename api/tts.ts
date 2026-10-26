import { GoogleGenAI } from "@google/genai";

// In-memory cache for audio base64 to ensure instant playback on repeats
const audioCache = new Map<string, { audioBase64: string; mimeType: string }>();

// Cooldown trackers to prevent repeated failed calls and error spam
let upstreamCooldownUntil = 0;
// Since gemini-3.8-flash-lite-tts free-tier daily quota (10 requests/day) was exceeded,
// initialize cooldown to prevent further RESOURCE_EXHAUSTED errors
let geminiQuotaExceededUntil = Date.now() + 6 * 60 * 60 * 1000;

export default async function handler(req: any, res: any) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', 'true');
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
    const cacheKey = `${lang || 'auto'}_${safeText.slice(0, 300)}`;

    // Return cached audio if already generated
    if (audioCache.has(cacheKey)) {
        return res.status(200).json(audioCache.get(cacheKey));
    }

    // 1. Try upstream voice agent from reclaimyourheart.vercel.app if not cooling down
    if (Date.now() > upstreamCooldownUntil) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 3500);

            const upstreamRes = await fetch("https://reclaimyourheart.vercel.app/api/tts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: safeText, lang: lang || 'auto' }),
                signal: controller.signal
            }).catch(() => null);

            clearTimeout(timeoutId);

            if (upstreamRes && upstreamRes.ok) {
                const data: any = await upstreamRes.json().catch(() => null);
                if (data && data.audioBase64) {
                    const result = {
                        audioBase64: data.audioBase64,
                        mimeType: data.mimeType || "audio/wav"
                    };

                    if (audioCache.size > 300) {
                        const firstKey = audioCache.keys().next().value;
                        if (firstKey) audioCache.delete(firstKey);
                    }
                    audioCache.set(cacheKey, result);

                    return res.status(200).json(result);
                } else {
                    // Upstream returned non-audio response
                    upstreamCooldownUntil = Date.now() + 60000;
                }
            } else if (upstreamRes && (upstreamRes.status === 429 || upstreamRes.status >= 500)) {
                upstreamCooldownUntil = Date.now() + 60000;
            }
        } catch {
            // Silently handle upstream timeouts/aborts and move to fallback
            upstreamCooldownUntil = Date.now() + 30000;
        }
    }

    // 2. Try Gemini TTS if not cooling down and API key is present
    if (Date.now() > geminiQuotaExceededUntil) {
        const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
        if (apiKey) {
            try {
                const ai = new GoogleGenAI({
                    apiKey,
                    httpOptions: {
                        headers: {
                            'User-Agent': 'aistudio-build',
                        }
                    }
                });

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

                if (audioData) {
                    const result = {
                        audioBase64: audioData,
                        mimeType: mimeType
                    };

                    if (audioCache.size > 300) {
                        const firstKey = audioCache.keys().next().value;
                        if (firstKey) audioCache.delete(firstKey);
                    }
                    audioCache.set(cacheKey, result);

                    return res.status(200).json(result);
                }
            } catch (geminiErr: any) {
                // If quota exhausted (429), set cooldown to avoid spamming the logs
                const errMsg = String(geminiErr?.message || geminiErr || '');
                if (errMsg.includes('429') || errMsg.includes('RESOURCE_EXHAUSTED') || errMsg.includes('quota')) {
                    geminiQuotaExceededUntil = Date.now() + 6 * 60 * 60 * 1000;
                } else {
                    geminiQuotaExceededUntil = Date.now() + 5 * 60 * 1000;
                }
            }
        }
    }

    // 3. Clean fallback to browser speech synthesis
    return res.status(200).json({
        fallback: true,
        notice: 'Using browser speech synthesis fallback'
    });
}
