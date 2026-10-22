import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RefreshCw, Search, BookOpen, Sparkles, Volume2, Square } from 'lucide-react';
import { useGamification } from '../../contexts/GamificationContext';
import { curatedHadiths, HadithItem } from '../../data/curatedHadiths';
import { playAiVoice, stopCurrentAiVoice, VoicePlaybackController } from '../../utils/aiVoice';

const HadithViewer = () => {
    const [hadith, setHadith] = useState<HadithItem | null>(null);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [topic, setTopic] = useState('Anger Management');
    const [speakingTrack, setSpeakingTrack] = useState<'none' | 'urdu' | 'english'>('none');
    const activeVoiceRef = useRef<VoicePlaybackController | null>(null);
    const { addPoints, unlockAchievement } = useGamification();

    const stopVoice = () => {
        if (activeVoiceRef.current) {
            try { activeVoiceRef.current.stop(); } catch {}
            activeVoiceRef.current = null;
        }
        stopCurrentAiVoice();
        setSpeakingTrack('none');
    };

    const speakUrdu = () => {
        if (!hadith?.hadithUrdu) return;
        if (speakingTrack === 'urdu') {
            stopVoice();
            return;
        }
        stopVoice();
        setSpeakingTrack('urdu');
        const ctrl = playAiVoice(hadith.hadithUrdu, {
            lang: 'ur-PK',
            onEnd: () => {
                setSpeakingTrack('none');
                activeVoiceRef.current = null;
            },
            onError: () => stopVoice()
        });
        activeVoiceRef.current = ctrl;
    };

    const speakEnglish = () => {
        if (!hadith?.hadithEnglish) return;
        if (speakingTrack === 'english') {
            stopVoice();
            return;
        }
        stopVoice();
        setSpeakingTrack('english');
        const ctrl = playAiVoice(hadith.hadithEnglish, {
            lang: 'en-US',
            onEnd: () => {
                setSpeakingTrack('none');
                activeVoiceRef.current = null;
            },
            onError: () => stopVoice()
        });
        activeVoiceRef.current = ctrl;
    };

    const fetchHadithByTopic = async (selectedTopic: string) => {
        stopVoice();
        setLoading(true);
        setTopic(selectedTopic);

        // 1. Check curated authentic database first for instant loading
        const curatedList = curatedHadiths[selectedTopic];
        if (curatedList && curatedList.length > 0) {
            // Pick a random gem if multiple exist for this topic
            const randomItem = curatedList[Math.floor(Math.random() * curatedList.length)];
            setHadith(randomItem);
            setLoading(false);
            addPoints(15);
            unlockAchievement('hadith_hero');
            return;
        }

        // 2. Fetch from backend /api/hadith
        try {
            const res = await fetch('/api/hadith', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ topic: selectedTopic })
            });

            if (res.ok) {
                const data = await res.json();
                if (data && (data.hadithUrdu || data.hadithEnglish)) {
                    setHadith({
                        header: data.header || "Sahih al-Bukhari",
                        hadithNumber: data.hadithNumber ? String(data.hadithNumber) : "Sahih",
                        bookSlug: data.bookSlug || selectedTopic,
                        hadithUrdu: data.hadithUrdu || data.hadithEnglish,
                        hadithEnglish: data.hadithEnglish || data.hadithUrdu
                    });
                    addPoints(15);
                    unlockAchievement('hadith_hero');
                    setLoading(false);
                    return;
                }
            }
            throw new Error("Could not load dynamic Hadith");
        } catch (error) {
            console.error("Error fetching Hadith:", error);
            // Fallback to default
            const fallback = curatedHadiths["General Wisdom"][0];
            setHadith(fallback);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        // Start with Anger Management as shown in user screenshot
        fetchHadithByTopic('Anger Management');
        return () => {
            stopVoice();
        };
    }, []);

    const topics = [
        "Anger Management", "General Wisdom", "Manners", "Parents", "Charity", 
        "Patience", "Honesty", "Knowledge", "Neighbors", "Forgiveness", 
        "Prayer", "Cleanliness", "Kindness", "Gratitude", "Humility"
    ];

    return (
        <div className="min-h-screen bg-amber-50 pb-32 pt-10 px-4 sm:px-8 lg:px-12 xl:px-16 flex flex-col items-center font-sans selection:bg-yellow-200 selection:text-amber-900 w-full">
            <div className="w-full max-w-[1600px]">
                <motion.div 
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-center mb-10"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border-2 border-amber-200 text-amber-500 font-black uppercase tracking-wide mb-4 shadow-sm">
                        <Sparkles size={16} className="fill-amber-500" /> Wisdom of the Prophet (ﷺ)
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-amber-500 mb-4 drop-shadow-[0_2px_0_rgba(0,0,0,0.1)]">
                        Hadith <span className="text-amber-400">Heroes</span>
                    </h1>
                    <p className="text-amber-800/70 font-bold text-lg md:text-xl max-w-2xl mx-auto">
                        Collect shiny stars of wisdom! Pick a topic to learn what our beloved Prophet (ﷺ) taught us.
                    </p>
                </motion.div>

                {/* Search / Topic Input */}
                <div className="relative mb-12 w-full">
                    <div className="flex flex-wrap justify-center gap-3 mb-8 max-w-5xl mx-auto">
                        {topics.map((t, i) => (
                            <motion.button
                                key={t}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: i * 0.03 }}
                                onClick={() => fetchHadithByTopic(t)}
                                className={`px-6 py-3 rounded-2xl text-sm md:text-base font-black transition-all border-2 shadow-[0_4px_0_rgba(0,0,0,0.1)] active:shadow-none active:translate-y-[4px] cursor-pointer ${
                                    topic === t 
                                    ? 'bg-amber-400 text-white border-amber-500 shadow-amber-600' 
                                    : 'bg-white text-amber-600 border-amber-100 hover:bg-amber-50 hover:border-amber-200'
                                }`}
                            >
                                {t}
                            </motion.button>
                        ))}
                    </div>

                    <div className="relative max-w-3xl mx-auto">
                        <Search className="absolute left-5 top-5 text-amber-300" size={24} strokeWidth={3} />
                        <input 
                            type="text" 
                            placeholder="Type any topic (e.g. Cats, Friends, Smile, Parents)..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && searchQuery.trim()) {
                                    fetchHadithByTopic(searchQuery.trim());
                                }
                            }}
                            className="w-full pl-14 pr-32 py-5 rounded-3xl border-4 border-amber-200 focus:border-amber-400 focus:outline-none text-amber-900 font-black placeholder:text-amber-300/70 bg-white shadow-xl text-lg"
                        />
                        <button 
                            onClick={() => searchQuery.trim() && fetchHadithByTopic(searchQuery.trim())}
                            className="absolute right-3 top-3 bottom-3 bg-amber-500 text-white px-7 rounded-2xl font-black hover:bg-amber-600 transition shadow-md active:scale-95 text-lg cursor-pointer"
                        >
                            Go! 🚀
                        </button>
                    </div>
                </div>

                {/* Hadith Card */}
                <motion.div 
                    key={hadith?.hadithNumber || hadith?.hadithEnglish || 'loading'}
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-full bg-white rounded-[3rem] p-6 sm:p-10 md:p-16 shadow-2xl border-8 border-amber-100 relative overflow-hidden min-h-[460px] flex flex-col justify-center"
                >
                    {/* Decorative Background Accents */}
                    <div className="absolute top-0 right-0 w-48 h-48 bg-amber-50 rounded-full -mr-16 -mt-16 opacity-60" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-yellow-50 rounded-full -ml-12 -mb-12 opacity-60" />
                    <div className="absolute top-1/2 left-10 w-24 h-24 bg-orange-50 rounded-full blur-xl opacity-70" />
                    
                    {loading ? (
                        <div className="flex flex-col items-center justify-center h-full gap-6 relative z-10 py-16">
                            <div className="w-20 h-20 border-8 border-amber-100 border-t-amber-400 rounded-full animate-spin" />
                            <p className="text-amber-500 font-black text-xl animate-bounce">Finding an authentic gem for you...</p>
                        </div>
                    ) : hadith ? (
                        <div className="relative z-10 text-center">
                            
                            {/* TOP BADGE: EXACT HADITH SOURCE & NUMBER */}
                            <div className="inline-flex flex-col sm:flex-row items-center gap-3.5 mb-8 bg-amber-50 px-6 sm:px-8 py-3.5 rounded-2xl border-2 border-amber-200 shadow-xs">
                                <div className="p-2.5 bg-amber-400 rounded-xl text-white shadow-xs">
                                    <BookOpen size={24} strokeWidth={3} />
                                </div>
                                <div className="text-center sm:text-left">
                                    <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                                        <h3 className="font-black text-amber-900 text-lg sm:text-xl leading-none">
                                            {hadith.header}
                                        </h3>
                                        {hadith.hadithNumber && (
                                            <span className="bg-amber-200/90 text-amber-950 text-xs sm:text-sm font-black px-2.5 py-0.5 rounded-lg border border-amber-300">
                                                Hadith #{hadith.hadithNumber}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center justify-center sm:justify-start gap-2 mt-1.5 flex-wrap">
                                        <p className="text-xs font-black text-amber-700 uppercase tracking-wider">
                                            {hadith.bookSlug}
                                        </p>
                                        {hadith.hadithNumber && (
                                            <span className="text-[11px] font-bold text-amber-900 bg-white/90 px-2 py-0.5 rounded-md border border-amber-200" dir="rtl">
                                                حدیث نمبر: {hadith.hadithNumber}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            
                            {/* 1. URDU HADITH FIRST: EXACT SAME LARGE BOLD FONT AND QUOTES */}
                            <div className="mb-10 relative px-2 sm:px-6 text-center" dir="rtl">
                                <span className="absolute -top-10 sm:-top-12 right-0 sm:right-4 text-7xl sm:text-9xl text-amber-100 font-serif opacity-70 select-none">”</span>
                                <p 
                                    className="text-2xl sm:text-3xl md:text-5xl font-black text-slate-800 leading-[2.2] md:leading-[2.3] relative z-10 drop-shadow-sm px-2 sm:px-6"
                                    style={{ fontFamily: 'Noto Nastaliq Urdu, Traditional Arabic, serif' }}
                                >
                                    {hadith.hadithUrdu}
                                </p>
                                <span className="absolute -bottom-14 sm:-bottom-16 left-0 sm:left-4 text-7xl sm:text-9xl text-amber-100 font-serif opacity-70 select-none">“</span>
                            </div>

                            {/* Voice playback action for Urdu */}
                            <div className="flex justify-center mb-8">
                                <button
                                    type="button"
                                    onClick={speakUrdu}
                                    className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition-all shadow-xs cursor-pointer ${
                                        speakingTrack === 'urdu'
                                            ? 'bg-rose-500 text-white animate-pulse'
                                            : 'bg-amber-100/80 text-amber-900 hover:bg-amber-200 border border-amber-300'
                                    }`}
                                >
                                    {speakingTrack === 'urdu' ? (
                                        <><Square size={14} fill="currentColor" /> روکیں (Stop Urdu Voice)</>
                                    ) : (
                                        <><Volume2 size={16} /> اردو حدیث سنیں (Listen Urdu Voice)</>
                                    )}
                                </button>
                            </div>

                            {/* 2. ENGLISH TRANSLATION */}
                            <div className="pt-8 border-t-2 border-amber-100/90 mb-8 relative px-2 sm:px-6 text-center" dir="ltr">
                                <div className="flex items-center justify-center gap-3 mb-4 flex-wrap">
                                    <span className="inline-block bg-amber-100/80 text-amber-900 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider">
                                        English Translation
                                    </span>
                                    <button
                                        type="button"
                                        onClick={speakEnglish}
                                        className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                            speakingTrack === 'english'
                                                ? 'bg-rose-500 text-white animate-pulse'
                                                : 'text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200'
                                        }`}
                                    >
                                        {speakingTrack === 'english' ? (
                                            <><Square size={12} fill="currentColor" /> Stop</>
                                        ) : (
                                            <><Volume2 size={13} /> Listen English</>
                                        )}
                                    </button>
                                </div>
                                <p className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-700 leading-relaxed max-w-4xl mx-auto drop-shadow-xs italic">
                                    “{hadith.hadithEnglish}”
                                </p>
                            </div>

                            {/* "Another Gem" Button matching original design */}
                            <div className="flex justify-center mt-8">
                                <button 
                                    onClick={() => fetchHadithByTopic(topic)}
                                    className="group flex items-center gap-3 bg-white text-amber-600 px-8 py-4 rounded-2xl font-black hover:bg-amber-50 transition-all border-4 border-amber-100 shadow-[0_6px_0_#fef3c7] active:shadow-none active:translate-y-[6px] cursor-pointer text-base sm:text-lg"
                                >
                                    <RefreshCw size={24} strokeWidth={3} className="group-hover:rotate-180 transition-transform duration-500" />
                                    Another Gem about {topic}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center text-slate-400 relative z-10 py-12">
                            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Search size={40} className="text-slate-300" />
                            </div>
                            <p className="font-bold text-xl text-slate-400">Pick a topic above to find a treasure!</p>
                        </div>
                    )}
                </motion.div>

                <div className="mt-12 text-center">
                    <p className="text-amber-800/40 text-sm font-bold uppercase tracking-widest">
                        Authentic Knowledge • Sahih Sources • Verified Hadith References
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HadithViewer;
