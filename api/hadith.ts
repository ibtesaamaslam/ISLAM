import { GoogleGenAI } from "@google/genai";

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

    const topic = (req.body?.topic || req.query?.topic || 'General Wisdom').toString().trim();

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

        const prompt = `
        Provide a single, authentic, Sahih Hadith (from Sahih Bukhari, Sahih Muslim, Tirmidhi, Abu Dawood, etc.) about this topic: "${topic}".
        
        CRITICAL REQUIREMENTS:
        1. "header": Book name (e.g., "Sahih al-Bukhari", "Sahih Muslim", "Jami at-Tirmidhi").
        2. "hadithNumber": The exact standard Hadith reference number as a number or string (e.g., "6114", "2564").
        3. "bookSlug": The specific chapter/book name in English and Arabic transliteration (e.g., "Good Manners and Form (Al-Adab)").
        4. "hadithUrdu": The authentic text in URDU starting with narrator and Hazrat Muhammad ﷺ (e.g. "حضرت ... رضی اللہ عنہ سے روایت ہے کہ رسول اللہ ﷺ نے فرمایا: ”...“").
        5. "hadithEnglish": The full authentic text in English.

        Return ONLY a JSON object:
        {
            "header": "Sahih al-Bukhari",
            "hadithNumber": "6114",
            "bookSlug": "Good Manners and Form (Al-Adab)",
            "hadithUrdu": "حضرت ... نے فرمایا: ”...“",
            "hadithEnglish": "Narrated ... : The Prophet (ﷺ) said, '...'"
        }
        `;

        const response = await ai.models.generateContent({
            model: "gemini-3.8-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
            }
        });

        const text = response.text?.trim() || "{}";
        const data = JSON.parse(text);

        return res.status(200).json(data);
    } catch (error: any) {
        console.warn("Notice: Hadith API generation notice, providing authentic fallback:", error?.message || error);
        return res.status(200).json({
            header: "Sahih al-Bukhari",
            hadithNumber: "1",
            bookSlug: "Revelation (Kitab Bad' al-Wahy)",
            hadithUrdu: "حضرت عمر بن خطاب رضی اللہ عنہ نے فرمایا: میں نے رسول اللہ ﷺ کو فرماتے ہوئے سنا: ”تمام اعمال کا دارومدار نیتوں پر ہے اور ہر انسان کے لیے وہی ہے جس کی اس نے نیت کی۔“",
            hadithEnglish: "Narrated 'Umar bin Al-Khattab: I heard Allah's Messenger (ﷺ) saying, 'The reward of deeds depends upon the intentions and every person will get the reward according to what he has intended.'"
        });
    }
}
