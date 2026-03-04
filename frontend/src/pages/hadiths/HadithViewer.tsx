import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Star, RefreshCw, Search, BookOpen, Sparkles } from 'lucide-react';
import { useGamification } from '../../contexts/GamificationContext';
import { GoogleGenAI } from "@google/genai";

interface Hadith {
    hadithEnglish: string;
    header: string;
    bookSlug: string;
}

const HadithViewer = () => {
    const [hadith, setHadith] = useState<Hadith | null>(null);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [topic, setTopic] = useState('General Wisdom');
    const { addPoints, unlockAchievement } = useGamification();

    const fetchHadithByTopic = async (selectedTopic: string) => {
        setLoading(true);
        setTopic(selectedTopic);
        setHadith(null);

        try {
            const apiKey = process.env.GEMINI_API_KEY || import.meta.env.VITE_GEMINI_API_KEY;
            if (!apiKey) throw new Error("API Key missing");

            const ai = new GoogleGenAI({ apiKey });
            const prompt = `
            Provide a single, authentic Hadith (Sahih Bukhari, Sahih Muslim, Tirmidhi, Abu Dawood, etc.) related to the topic: "${selectedTopic}".
            
            Return ONLY a JSON object with this structure:
            {
                "header": "Source Name (e.g. Sahih Bukhari)",
                "bookSlug": "Chapter/Topic Name",
                "hadithEnglish": "The full text of the Hadith in English."
            }
            Ensure the Hadith is authentic and directly relevant to living a good Islamic life.
            `;

            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: prompt,
                config: { responseMimeType: "application/json" }
            });

            const data = JSON.parse(response.text);
            setHadith(data);
            addPoints(15);
            unlockAchievement('hadith_hero');

        } catch (error) {
            console.error("Error fetching Hadith:", error);
            // Fallback to a static one if AI fails
            setHadith({
                header: "Sahih Bukhari",
                bookSlug: "Good Manners",
                hadithEnglish: "The Prophet (ﷺ) said, \"None of you will have faith till he wishes for his (Muslim) brother what he likes for himself.\""
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHadithByTopic('General Wisdom');
    }, []);

    const topics = [
        "General Wisdom", "Manners", "Parents", "Charity", "Patience", 
        "Honesty", "Knowledge", "Neighbors", "Forgiveness", "Prayer",
        "Cleanliness", "Kindness", "Anger Management", "Gratitude", "Humility"
    ];

    return (
        <div className="min-h-screen bg-amber-50 pb-32 pt-10 px-4 flex flex-col items-center font-sans selection:bg-yellow-200 selection:text-amber-900">
            <div className="max-w-3xl w-full">
                <motion.div 
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-center mb-10"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border-2 border-amber-200 text-amber-500 font-black uppercase tracking-wide mb-4 shadow-sm">
                        <Sparkles size={16} className="fill-amber-500" /> Wisdom of the Prophet (ﷺ)
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black text-amber-500 mb-4 drop-shadow-[0_2px_0_rgba(0,0,0,0.1)]">
                        Hadith <span className="text-amber-400">Heroes</span>
                    </h1>
                    <p className="text-amber-800/70 font-bold text-lg max-w-lg mx-auto">
                        Collect shiny stars of wisdom! Pick a topic to learn what our beloved Prophet (ﷺ) taught us.
                    </p>
                </motion.div>

                {/* Search / Topic Input */}
                <div className="relative mb-12">
                    <div className="flex flex-wrap justify-center gap-3 mb-8">
                        {topics.map((t, i) => (
                            <motion.button
                                key={t}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: i * 0.05 }}
                                onClick={() => fetchHadithByTopic(t)}
                                className={`px-5 py-2.5 rounded-2xl text-sm font-black transition-all border-2 shadow-[0_4px_0_rgba(0,0,0,0.1)] active:shadow-none active:translate-y-[4px] ${
                                    topic === t 
                                    ? 'bg-amber-400 text-white border-amber-500 shadow-amber-600' 
                                    : 'bg-white text-amber-600 border-amber-100 hover:bg-amber-50 hover:border-amber-200'
                                }`}
                            >
                                {t}
                            </motion.button>
                        ))}
                    </div>

                    <div className="relative max-w-xl mx-auto">
                        <Search className="absolute left-5 top-5 text-amber-300" size={24} strokeWidth={3} />
                        <input 
                            type="text" 
                            placeholder="Type any topic (e.g. Cats, Friends, Smile)..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && searchQuery.trim()) {
                                    fetchHadithByTopic(searchQuery);
                                }
                            }}
                            className="w-full pl-14 pr-32 py-5 rounded-3xl border-4 border-amber-200 focus:border-amber-400 focus:outline-none text-amber-900 font-black placeholder:text-amber-300/70 bg-white shadow-xl text-lg"
                        />
                        <button 
                            onClick={() => searchQuery.trim() && fetchHadithByTopic(searchQuery)}
                            className="absolute right-3 top-3 bottom-3 bg-amber-500 text-white px-6 rounded-2xl font-black hover:bg-amber-600 transition shadow-md active:scale-95"
                        >
                            Go! 🚀
                        </button>
                    </div>
                </div>

                <motion.div 
                    key={hadith?.hadithEnglish || 'loading'}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border-8 border-amber-100 relative overflow-hidden min-h-[400px] flex flex-col justify-center"
                >
                    {/* Decorative Blobs */}
                    <div className="absolute top-0 right-0 w-48 h-48 bg-amber-50 rounded-full -mr-16 -mt-16 opacity-50" />
                    <div className="absolute bottom-0 left-0 w-40 h-40 bg-yellow-50 rounded-full -ml-10 -mb-10 opacity-50" />
                    <div className="absolute top-1/2 left-10 w-20 h-20 bg-orange-50 rounded-full blur-xl opacity-60" />
                    
                    {loading ? (
                        <div className="flex flex-col items-center justify-center h-full gap-6 relative z-10">
                            <div className="w-20 h-20 border-8 border-amber-100 border-t-amber-400 rounded-full animate-spin" />
                            <p className="text-amber-400 font-black text-xl animate-bounce">Finding a gem for you...</p>
                        </div>
                    ) : hadith ? (
                        <div className="relative z-10 text-center">
                            <div className="inline-flex items-center gap-3 mb-8 bg-amber-50 px-6 py-3 rounded-2xl border-2 border-amber-100">
                                <div className="p-2 bg-amber-400 rounded-xl text-white shadow-sm">
                                    <BookOpen size={24} strokeWidth={3} />
                                </div>
                                <div className="text-left">
                                    <h3 className="font-black text-amber-800 text-lg leading-none">{hadith.header}</h3>
                                    <p className="text-xs font-bold text-amber-500 uppercase tracking-wider mt-1">{hadith.bookSlug}</p>
                                </div>
                            </div>
                            
                            <div className="mb-10 relative px-4">
                                <span className="absolute -top-8 left-0 text-8xl text-amber-100 font-serif opacity-50">"</span>
                                <p className="text-2xl md:text-4xl font-black text-slate-700 leading-tight relative z-10 drop-shadow-sm">
                                    {hadith.hadithEnglish}
                                </p>
                                <span className="absolute -bottom-12 right-0 text-8xl text-amber-100 font-serif rotate-180 opacity-50">"</span>
                            </div>

                            <div className="flex justify-center mt-6">
                                <button 
                                    onClick={() => fetchHadithByTopic(topic)}
                                    className="group flex items-center gap-3 bg-white text-amber-500 px-8 py-4 rounded-2xl font-black hover:bg-amber-50 transition-all border-4 border-amber-100 shadow-[0_6px_0_#fef3c7] active:shadow-none active:translate-y-[6px]"
                                >
                                    <RefreshCw size={24} strokeWidth={3} className="group-hover:rotate-180 transition-transform duration-500" />
                                    Another Gem about {topic}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center text-slate-400 relative z-10">
                            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Search size={40} className="text-slate-300" />
                            </div>
                            <p className="font-bold text-xl text-slate-400">Pick a topic above to find a treasure!</p>
                        </div>
                    )}
                </motion.div>

                <div className="mt-12 text-center">
                    <p className="text-amber-800/40 text-sm font-bold uppercase tracking-widest">
                        Authentic Knowledge • Sahih Sources
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HadithViewer;
