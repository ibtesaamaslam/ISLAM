import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Send, Bot, Sparkles, AlertCircle, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';
import Markdown from 'react-markdown';
import { useGamification } from '../contexts/GamificationContext';

async function retrieveQuranGrounding(userQuery: string): Promise<string> {
    try {
        // Extract possible surah:ayah patterns (e.g. 2:255, 112:1)
        const refMatch = userQuery.match(/(\d{1,3})[:\s](\d{1,3})/);
        if (refMatch) {
            const surah = refMatch[1];
            const ayah = refMatch[2];
            const res = await fetch(`https://api.alquran.cloud/v1/ayah/${surah}:${ayah}/editions/quran-uthmani,en.sahih,ur.jalandhry`);
            if (res.ok) {
                const data = await res.json();
                if (data?.data?.length >= 3) {
                    const arabic = data.data[0].text;
                    const english = data.data[1].text;
                    const urdu = data.data[2].text;
                    const surahName = data.data[0].surah.englishName;
                    return `\n[VERIFIED RETRIEVED QURAN AYAH DATABASE RECORD]:\n- Surah: ${surahName} (${surah}:${ayah})\n- Arabic: ${arabic}\n- English: ${english}\n- Urdu: ${urdu}\n`;
                }
            }
        }

        // Clean query for search keywords
        const stopWords = new Set(['what', 'when', 'where', 'which', 'about', 'islam', 'does', 'tell', 'explain', 'mean', 'should', 'would', 'could', 'their', 'there', 'please']);
        const cleanWords = userQuery.replace(/[^a-zA-Z0-9\s]/g, ' ')
            .split(/\s+/)
            .filter(w => w.length > 3 && !stopWords.has(w.toLowerCase()))
            .slice(0, 2);

        if (cleanWords.length > 0) {
            const searchTerm = cleanWords.join(' ');
            const res = await fetch(`https://api.alquran.cloud/v1/search/${encodeURIComponent(searchTerm)}/all/en.sahih`);
            if (res.ok) {
                const data = await res.json();
                if (data?.data?.matches && data.data.matches.length > 0) {
                    const topMatches = data.data.matches.slice(0, 3);
                    const formatted = topMatches.map((m: any) => 
                        `- Surah ${m.surah.englishName} (${m.surah.number}:${m.numberInSurah}): "${m.text}"`
                    ).join('\n');
                    return `\n[VERIFIED RETRIEVED QURAN TEXT MATCHES (GROUND TRUTH)]:\n${formatted}\n`;
                }
            }
        }
    } catch (e) {
        console.warn('Quran retrieval error:', e);
    }
    return '';
}

const ISLAMIC_ASSISTANT_SYSTEM_PROMPT = `You are an Islamic knowledge assistant for a web app ("Reclaim Your Heart" / "Ask Noor"). Your single most important rule is: NEVER fabricate or guess Islamic content. Hallucination in religious matters is a serious harm — it misleads people about their deen. Follow every rule below strictly, in order of priority.

═══════════════════════════════════════════
1. GROUNDING RULES (Anti-Hallucination)
═══════════════════════════════════════════
- Only state a Quranic ayah, Hadith, or fiqh ruling if you are highly confident it is accurate. If you are not certain of the exact wording, Surah:Ayah number, or Hadith reference, DO NOT invent one.
- NEVER fabricate a Hadith, an ayah number, a narrator chain (isnad), or a scholar's opinion. If you cannot recall the exact reference, say so plainly: "I don't have the exact reference for this — please verify with a scholar or a trusted source like Quran.com / Sunnah.com."
- Only cite Hadith from recognized authentic collections: Sahih al-Bukhari, Sahih Muslim, Sunan Abu Dawood, Jami' at-Tirmidhi, Sunan an-Nasa'i, Sunan Ibn Majah (and note the authenticity grade — Sahih / Hasan / Da'if — if known). Never present a weak (da'if) or fabricated (mawdu') narration as if it were authentic without labeling it.
- For every Quranic reference, give Surah name + number + Ayah number (e.g., Surah Al-Baqarah 2:286). Double-check the number makes sense before outputting it — if unsure, describe the ayah's meaning without inventing a number, and suggest the user verify on Quran.com.
- If a question touches on a matter where scholars genuinely differ (fiqh differences between Hanafi, Shafi'i, Maliki, Hanbali, or between classical and contemporary scholars), present it as a difference of opinion rather than a single absolute answer. Do not pick one madhab's view and present it as the only correct one unless the user specifies their madhab.
- For sensitive personal matters (divorce, inheritance shares, complex financial/business fiqh, medical/ethical dilemmas), give general guidance from Quran and Hadith, but clearly recommend the user consult a qualified local scholar (mufti/imam) for a binding personal ruling (fatwa).
- If a question is outside Islamic knowledge (not religious in nature) or ambiguous, answer helpfully but do not force an Islamic ruling onto it.

═══════════════════════════════════════════
2. ANSWER STYLE — Explain Like I'm 12 (ELI12)
═══════════════════════════════════════════
- Use simple, everyday words. Avoid heavy Arabic/fiqh jargon unless you explain the term the first time it's used.
- Structure every answer clearly using this format:
  1. **Short Direct Answer** (1-2 sentences)
  2. **Quran/Hadith Evidence** (with exact reference, or a note if uncertain)
  3. **Simple Explanation** (as if teaching a curious 12-year-old — use an analogy or everyday example if it helps)
  4. **Practical Takeaway** (what this means for the person day-to-day)
- Use headings, bullet points, and short paragraphs — no giant walls of text.
- Keep a warm, respectful, non-judgmental tone. Never shame or lecture the user.

═══════════════════════════════════════════
3. BILINGUAL OUTPUT (Mandatory)
═══════════════════════════════════════════
- EVERY answer must be given in BOTH English and Urdu, in that order.
- Structure:

  ### 🇬🇧 English

  #### 1. Short Direct Answer
  [1-2 sentences]

  #### 2. Quran / Hadith Evidence
  [Exact reference with Arabic text + transliteration + meaning, or note if uncertain]

  #### 3. Simple Explanation (ELI12)
  [Clear explanation with everyday analogy]

  #### 4. Practical Takeaway
  [Actionable takeaway for daily life]

  ---

  ### 🇵🇰 اردو

  #### ۱. مختصر اور واضح جواب
  [1-2 sentences in Urdu]

  #### ۲. قرآن و حدیث کا حوالہ
  [Arabic text + Urdu translation with reference]

  #### ۳. آسان وضاحت
  [Simple explanation in Urdu with everyday example]

  #### ۴. عملی سبق
  [Practical takeaway in Urdu]

- Keep Quranic ayahs in Arabic script + English transliteration + English meaning in the English section, and Arabic script + Urdu translation in the Urdu section.

═══════════════════════════════════════════
4. URDU TEXT FORMATTING RULES
═══════════════════════════════════════════
- Always write the Urdu section in proper Urdu script (Unicode), never in Roman Urdu (Urdu written using English letters).
- Use correct Urdu punctuation: ۔ (Urdu full stop) instead of a period where natural, and proper spacing after Arabic/Urdu words.
- Do not mix English words into the Urdu section unless there is no accepted Urdu equivalent (e.g. technical terms).
- Keep Urdu sentences grammatically correct and natural — avoid literal word-for-word translation from English.
- Output the Urdu text as plain Unicode text only. Do not wrap it in a specific font name or styling instruction — font rendering is handled by the app's frontend, not by you.

═══════════════════════════════════════════
5. WHEN UNSURE
═══════════════════════════════════════════
- It is always better to say "I'm not fully certain of this — please confirm with a qualified scholar or a trusted source" than to guess or invent content. This applies in both English and Urdu sections.
- Never present your own opinion as an Islamic ruling.

═══════════════════════════════════════════
6. TONE
═══════════════════════════════════════════
- Respectful, humble, and warm — like a knowledgeable older sibling, not a preacher. Avoid overly formal or robotic religious language.`;

const isRtlText = (node: any): boolean => {
    if (typeof node === 'string') {
        return /[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]/.test(node);
    }
    if (Array.isArray(node)) {
        return node.some(isRtlText);
    }
    if (node && typeof node === 'object' && 'props' in node && node.props?.children) {
        return isRtlText(node.props.children);
    }
    return false;
};

const Chat = () => {
    const [query, setQuery] = useState('');
    const [messages, setMessages] = useState<{role: 'user' | 'model', content: string}[]>([]);
    const [loading, setLoading] = useState(false);
    const { addPoints, unlockAchievement } = useGamification();

    const handleSend = async () => {
        if (!query.trim()) return;

        const userMsg = { role: 'user' as const, content: query };
        setMessages(prev => [...prev, userMsg]);
        setQuery('');
        setLoading(true);

        try {
            const apiKey = import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
            let text;

            // Helper function to fetch from API
            const fetchFromApi = async () => {
                const response = await fetch('/api/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message: userMsg.content })
                });
                if (!response.ok) throw new Error('Failed to fetch chat response');
                const data = await response.json();
                return data.text;
            };

            if (apiKey) {
                try {
                    const ai = new GoogleGenAI({ apiKey });
                    const retrievedContext = await retrieveQuranGrounding(userMsg.content);
                    const prompt = `${ISLAMIC_ASSISTANT_SYSTEM_PROMPT}

${retrievedContext ? `═══════════════════════════════════════════
VERIFIED RETRIEVED DATABASE GROUNDING (Use as exact factual basis)
═══════════════════════════════════════════
${retrievedContext}
` : ''}
Question: ${userMsg.content}`;

                    const response = await ai.models.generateContent({
                        model: "gemini-3.8-flash",
                        contents: prompt,
                        config: {
                            temperature: 0.3,
                        }
                    });
                    text = response.text;
                } catch (clientError) {
                    console.warn("Client-side generation failed, trying server-side...", clientError);
                    text = await fetchFromApi();
                }
            } else {
                // No API key, try server-side directly
                text = await fetchFromApi();
            }

            setMessages(prev => [...prev, { role: 'model', content: text }]);
            addPoints(10);
            unlockAchievement('ai_friend');
        } catch (err) {
            console.error(err);
            setMessages(prev => [...prev, { role: 'model', content: "I'm having trouble connecting to my knowledge base right now. Please try again in a moment, or check back shortly! 🌙" }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-rose-50 pb-32 pt-6 px-4 sm:px-8 lg:px-12 xl:px-16 flex flex-col font-sans selection:bg-rose-200 selection:text-rose-900 w-full">
            <div className="w-full max-w-[1500px] mx-auto flex-1 flex flex-col h-full">
                <motion.div 
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-center mb-8"
                >
                    <div className="w-24 h-24 bg-white rounded-full mx-auto flex items-center justify-center text-rose-500 mb-4 shadow-lg border-4 border-rose-200 relative">
                        <div className="absolute top-0 right-0 w-6 h-6 bg-green-400 rounded-full border-2 border-white animate-pulse" />
                        <Bot size={48} strokeWidth={2.5} />
                    </div>
                    <h1 className="text-4xl font-black text-rose-500 mb-1 drop-shadow-sm">Ask Noor 🤖</h1>
                    <p className="text-rose-400 font-bold text-lg">Your Friendly AI Islamic Guide (ELI12 & Bilingual)</p>
                </motion.div>

                <div className="flex-1 overflow-y-auto space-y-6 mb-6 p-4 scrollbar-hide">
                    {messages.length === 0 && (
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-center text-rose-300 mt-10 flex flex-col items-center gap-4"
                        >
                            <div className="p-6 bg-white rounded-[2rem] shadow-sm border-2 border-rose-100 rotate-3">
                                <Sparkles className="text-rose-400 animate-pulse" size={64} />
                            </div>
                            <p className="font-black text-xl max-w-md text-rose-500">
                                Salaam! I'm Noor. Ask me any question about Islam, the Quran, or daily practice! 🕌✨
                            </p>
                            <p className="text-sm text-slate-500 max-w-sm">
                                Accurate, authentic references explained simply in English & Urdu.
                            </p>
                        </motion.div>
                    )}
                    {messages.map((msg, idx) => (
                        <motion.div 
                            initial={{ opacity: 0, y: 20, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            key={idx} 
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            {msg.role === 'user' ? (
                                <div className="max-w-[85%] rounded-3xl p-5 shadow-sm font-medium text-lg leading-relaxed bg-rose-500 text-white rounded-br-none shadow-rose-200 whitespace-pre-wrap">
                                    {msg.content}
                                </div>
                            ) : (
                                <div className="max-w-[95%] md:max-w-[90%] rounded-3xl p-6 shadow-md bg-white text-slate-800 rounded-bl-none border-2 border-rose-100 leading-relaxed overflow-hidden">
                                    <div className="markdown-body text-slate-800 text-base md:text-lg">
                                        <Markdown
                                            components={{
                                                h3: ({ children }) => {
                                                    const isRtl = isRtlText(children);
                                                    return (
                                                        <h3 className={`font-black text-rose-600 border-b-2 border-rose-100 pb-2 mt-5 mb-3 flex items-center gap-2 ${isRtl ? 'urdu-text text-2xl font-bold justify-end' : 'text-xl'}`}>
                                                            {children}
                                                        </h3>
                                                    );
                                                },
                                                h4: ({ children }) => {
                                                    const isRtl = isRtlText(children);
                                                    return (
                                                        <h4 className={`font-bold text-rose-700 mt-4 mb-1.5 ${isRtl ? 'urdu-text text-xl font-bold text-right' : 'text-base text-slate-900 text-left'}`}>
                                                            {children}
                                                        </h4>
                                                    );
                                                },
                                                p: ({ children }) => {
                                                    const isRtl = isRtlText(children);
                                                    return (
                                                        <p className={`mb-3.5 ${isRtl ? 'urdu-text text-slate-800' : 'text-slate-700 leading-relaxed text-left'}`}>
                                                            {children}
                                                        </p>
                                                    );
                                                },
                                                ul: ({ children }) => (
                                                    <ul className="list-disc list-inside space-y-1.5 mb-3 text-slate-700 pl-1">
                                                        {children}
                                                    </ul>
                                                ),
                                                ol: ({ children }) => (
                                                    <ol className="list-decimal list-inside space-y-1.5 mb-3 text-slate-700 pl-1">
                                                        {children}
                                                    </ol>
                                                ),
                                                li: ({ children }) => {
                                                    const isRtl = isRtlText(children);
                                                    return (
                                                        <li className={`leading-relaxed ${isRtl ? 'urdu-text text-slate-800 mb-2' : 'text-slate-700 text-left'}`}>
                                                            {children}
                                                        </li>
                                                    );
                                                },
                                                hr: () => (
                                                    <hr className="my-6 border-t-2 border-dashed border-rose-200" />
                                                ),
                                                strong: ({ children }) => (
                                                    <strong className="font-bold text-slate-900">
                                                        {children}
                                                    </strong>
                                                ),
                                                blockquote: ({ children }) => {
                                                    const isRtl = isRtlText(children);
                                                    return (
                                                        <blockquote className={`my-3 px-4 py-3 rounded-2xl bg-rose-50/70 font-medium ${isRtl ? 'urdu-text border-r-4 border-l-0 border-rose-400 text-slate-800' : 'border-l-4 border-rose-400 text-slate-700 italic'}`}>
                                                            {children}
                                                        </blockquote>
                                                    );
                                                }
                                            }}
                                        >
                                            {msg.content}
                                        </Markdown>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    ))}
                    {loading && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex justify-start"
                        >
                            <div className="bg-white text-rose-400 rounded-3xl p-5 rounded-bl-none border-2 border-rose-100 italic font-bold text-sm flex items-center gap-2 shadow-sm">
                                <div className="flex gap-1">
                                    <div className="w-2 h-2 bg-rose-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                    <div className="w-2 h-2 bg-rose-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                    <div className="w-2 h-2 bg-rose-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                </div>
                                Noor is gathering authentic references & preparing your answer... ✨
                            </div>
                        </motion.div>
                    )}
                </div>

                <div className="sticky bottom-2 space-y-2">
                    <div className="bg-white p-3 rounded-[2rem] shadow-xl border-4 border-rose-100 flex gap-3">
                        <input 
                            type="text" 
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Ask an Islamic question (e.g. Why do we pray 5 times?)..."
                            className="flex-1 p-4 rounded-2xl focus:outline-none text-slate-700 placeholder:text-rose-300 font-bold text-lg bg-rose-50/50 focus:bg-rose-50 transition-colors"
                        />
                        <button 
                            onClick={handleSend}
                            disabled={loading || !query.trim()}
                            className="bg-rose-500 text-white p-4 rounded-2xl hover:bg-rose-600 disabled:opacity-50 disabled:hover:bg-rose-500 transition-all shadow-[0_4px_0_#be123c] active:shadow-none active:translate-y-[4px] active:bg-rose-600"
                        >
                            <Send size={24} strokeWidth={3} />
                        </button>
                    </div>

                    {/* Disclaimer Footer */}
                    <div className="bg-white/80 backdrop-blur-sm border border-rose-200/80 rounded-2xl px-4 py-2 text-center text-xs md:text-sm text-slate-600 font-medium shadow-xs flex items-center justify-center gap-2">
                        <AlertCircle size={15} className="text-amber-500 shrink-0" />
                        <span>
                            <strong>Disclaimer:</strong> This is an AI assistant for general Islamic guidance. For personal fatwas and legal rulings, consult a qualified scholar.
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;
