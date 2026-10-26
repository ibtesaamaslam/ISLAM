import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
    Search, Volume2, Square, Sparkles, Heart, CheckCircle2, 
    Copy, Check, BookOpen, RotateCcw, Compass, CheckCircle, 
    VolumeX, Award, CheckCheck, Play
} from 'lucide-react';
import { useGamification } from '../../contexts/GamificationContext';
import { dailyDuas, duaCategories, DailyDua } from '../../data/dailyDuasData';
import { playAiVoice, stopCurrentAiVoice, VoicePlaybackController } from '../../utils/aiVoice';

export default function DailyDuas() {
    const { addPoints, unlockAchievement } = useGamification();
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [meaningView, setMeaningView] = useState<'both' | 'urdu' | 'english'>('both');
    const [favorites, setFavorites] = useState<string[]>(() => {
        try {
            const saved = localStorage.getItem('daily_duas_favorites');
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });
    const [completedDuas, setCompletedDuas] = useState<string[]>(() => {
        try {
            const saved = localStorage.getItem('daily_duas_completed_today');
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });
    const [duaCounters, setDuaCounters] = useState<Record<string, number>>({});
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [speakingTrack, setSpeakingTrack] = useState<{ id: string; type: 'arabic' | 'urdu' | 'english' } | null>(null);
    const activeVoiceRef = useRef<VoicePlaybackController | null>(null);
    const synthRef = useRef<SpeechSynthesisUtterance | null>(null);

    // Save favorites to localStorage
    useEffect(() => {
        try {
            localStorage.setItem('daily_duas_favorites', JSON.stringify(favorites));
        } catch {}
    }, [favorites]);

    // Save completed today to localStorage
    useEffect(() => {
        try {
            localStorage.setItem('daily_duas_completed_today', JSON.stringify(completedDuas));
        } catch {}
    }, [completedDuas]);

    // Stop voice on audio event or unmount
    useEffect(() => {
        const handleStopAudio = () => {
            stopVoice();
        };
        window.addEventListener('app:stop_all_audio', handleStopAudio);
        return () => {
            stopVoice();
            window.removeEventListener('app:stop_all_audio', handleStopAudio);
        };
    }, []);

    const stopVoice = () => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
        }
        if (activeVoiceRef.current) {
            try { activeVoiceRef.current.stop(); } catch {}
            activeVoiceRef.current = null;
        }
        stopCurrentAiVoice();
        setSpeakingTrack(null);
    };

    // Arabic voice playback using Voice Agent
    const speakArabic = (dua: DailyDua) => {
        if (speakingTrack?.id === dua.id && speakingTrack.type === 'arabic') {
            stopVoice();
            return;
        }

        stopVoice();
        setSpeakingTrack({ id: dua.id, type: 'arabic' });

        const ctrl = playAiVoice(dua.arabic, {
            lang: 'ar-SA',
            onEnd: () => setSpeakingTrack(null),
            onError: () => stopVoice()
        });
        activeVoiceRef.current = ctrl;
    };

    // Urdu voice playback using Voice Agent
    const speakUrdu = (dua: DailyDua) => {
        if (speakingTrack?.id === dua.id && speakingTrack.type === 'urdu') {
            stopVoice();
            return;
        }

        stopVoice();
        setSpeakingTrack({ id: dua.id, type: 'urdu' });

        const ctrl = playAiVoice(dua.urduTranslation, {
            lang: 'ur-PK',
            onEnd: () => setSpeakingTrack(null),
            onError: () => stopVoice()
        });
        activeVoiceRef.current = ctrl;
    };

    // English voice playback
    const speakEnglish = (dua: DailyDua) => {
        if (speakingTrack?.id === dua.id && speakingTrack.type === 'english') {
            stopVoice();
            return;
        }

        stopVoice();
        setSpeakingTrack({ id: dua.id, type: 'english' });

        const textToSpeak = `${dua.titleEnglish}. ${dua.englishTranslation}.`;

        const ctrl = playAiVoice(textToSpeak, {
            lang: 'en-US',
            onEnd: () => {
                setSpeakingTrack(null);
                activeVoiceRef.current = null;
            },
            onError: () => {
                stopVoice();
            }
        });
        activeVoiceRef.current = ctrl;
    };

    const toggleFavorite = (id: string) => {
        setFavorites(prev => 
            prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
        );
    };

    const handleCopy = (dua: DailyDua) => {
        const textToCopy = `${dua.titleEnglish} (${dua.titleUrdu})\nOccasion: ${dua.occasionEnglish}\n\n${dua.arabic}\n\nTransliteration: "${dua.transliteration}"\n\nاردو ترجمہ:\n"${dua.urduTranslation}"\n\nEnglish Translation:\n"${dua.englishTranslation}"\n\nReference: ${dua.referenceEnglish}`;
        navigator.clipboard.writeText(textToCopy);
        setCopiedId(dua.id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const incrementCounter = (dua: DailyDua) => {
        const current = duaCounters[dua.id] || 0;
        const next = current + 1;
        setDuaCounters(prev => ({ ...prev, [dua.id]: next }));

        // Check if reached or exceeded recommended count
        if (next >= dua.recommendedCount && !completedDuas.includes(dua.id)) {
            markAsCompleted(dua.id);
        }
    };

    const resetCounter = (id: string) => {
        setDuaCounters(prev => ({ ...prev, [id]: 0 }));
    };

    const markAsCompleted = (id: string) => {
        if (!completedDuas.includes(id)) {
            setCompletedDuas(prev => [...prev, id]);
            addPoints(20);
            unlockAchievement('dua_devotee');
        }
    };

    // Filtered Duas
    const filteredDuas = useMemo(() => {
        return dailyDuas.filter(dua => {
            const matchesCategory = selectedCategory === 'all' 
                ? true 
                : selectedCategory === 'favorites'
                ? favorites.includes(dua.id)
                : dua.category === selectedCategory;

            if (!matchesCategory) return false;

            if (!searchQuery.trim()) return true;

            const q = searchQuery.toLowerCase().trim();
            const titleEnMatch = dua.titleEnglish.toLowerCase().includes(q);
            const titleUrMatch = dua.titleUrdu.includes(q);
            const occasionEnMatch = dua.occasionEnglish.toLowerCase().includes(q);
            const occasionUrMatch = dua.occasionUrdu.includes(q);
            const englishMatch = dua.englishTranslation.toLowerCase().includes(q);
            const urduMatch = dua.urduTranslation.includes(q);
            const transMatch = dua.transliteration.toLowerCase().includes(q);
            const refMatch = dua.referenceEnglish.toLowerCase().includes(q);
            const tagMatch = dua.tags.some(tag => tag.toLowerCase().includes(q));

            return titleEnMatch || titleUrMatch || occasionEnMatch || occasionUrMatch || 
                   englishMatch || urduMatch || transMatch || refMatch || tagMatch;
        });
    }, [selectedCategory, searchQuery, favorites]);

    const featuredDua = dailyDuas[0];

    return (
        <div className="min-h-screen bg-gradient-to-b from-yellow-50/80 via-amber-50/60 to-yellow-100/40 pb-36 pt-8 px-3 sm:px-6 lg:px-8 font-sans selection:bg-yellow-200 selection:text-amber-950">
            <div className="w-full max-w-[96rem] mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 border-2 border-amber-300 text-amber-900 font-black text-xs uppercase tracking-wide mb-3 shadow-xs"
                    >
                        <Sparkles size={16} className="text-amber-500 fill-amber-500" />
                        <span>Authentic Masnoon Supplications (مسنون دعائیں)</span>
                    </motion.div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                        Daily <span className="text-amber-600">Duas</span> & Supplications
                    </h1>
                    <p className="mt-2 text-sm sm:text-base text-slate-700 max-w-xl mx-auto font-medium">
                        Comprehensive collection of powerful, authentic supplications with Arabic, Urdu translation, English translation, and audio voice narration for all three!
                    </p>
                </div>

                {/* Search Bar - No 80+ */}
                <div className="max-w-2xl mx-auto mb-6">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-600" size={20} />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search duas by keyword, need (e.g. debt, illness, morning, parents)..."
                            className="w-full pl-12 pr-10 py-3.5 bg-white rounded-2xl border-2 border-amber-300 shadow-sm font-bold text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-amber-500 text-sm sm:text-base transition-all"
                        />
                        {searchQuery && (
                            <button
                                type="button"
                                onClick={() => setSearchQuery('')}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 bg-amber-50 px-2 py-1 rounded-md"
                            >
                                Clear
                            </button>
                        )}
                    </div>
                </div>

                {/* Global Translation Display Toggle */}
                <div className="flex items-center justify-center gap-2 mb-6">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Meaning View:
                    </span>
                    <div className="inline-flex bg-white p-1 rounded-xl border border-slate-200 shadow-2xs">
                        <button
                            type="button"
                            onClick={() => setMeaningView('both')}
                            className={`px-3 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
                                meaningView === 'both' ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                            }`}
                        >
                            Both
                        </button>
                        <button
                            type="button"
                            onClick={() => setMeaningView('urdu')}
                            className={`px-3 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
                                meaningView === 'urdu' ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                            }`}
                        >
                            Urdu
                        </button>
                        <button
                            type="button"
                            onClick={() => setMeaningView('english')}
                            className={`px-3 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
                                meaningView === 'english' ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                            }`}
                        >
                            English
                        </button>
                    </div>
                </div>

                {/* Category Selection Tabs - WRAPS CLEANLY WITHOUT HORIZONTAL SCROLLBAR */}
                <div className="flex flex-wrap justify-center gap-2.5 mb-8 max-w-5xl mx-auto">
                    <button
                        type="button"
                        onClick={() => setSelectedCategory('favorites')}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-2xl font-bold text-xs sm:text-sm transition-all border shrink-0 cursor-pointer shadow-xs ${
                            selectedCategory === 'favorites'
                                ? 'bg-rose-500 text-white border-rose-600 shadow-md ring-2 ring-rose-200'
                                : 'bg-white text-rose-700 hover:bg-rose-50 border-rose-200'
                        }`}
                    >
                        <Heart size={14} className={selectedCategory === 'favorites' ? 'fill-white' : 'fill-rose-500'} />
                        <span>Favorites ({favorites.length})</span>
                    </button>

                    {duaCategories.map(cat => {
                        const isSelected = selectedCategory === cat.id;
                        return (
                            <button
                                key={cat.id}
                                type="button"
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`flex items-center gap-1.5 px-4 py-2 rounded-2xl font-bold text-xs sm:text-sm transition-all border shrink-0 cursor-pointer shadow-xs ${
                                    isSelected
                                        ? 'bg-amber-500 text-slate-950 font-black border-amber-600 shadow-md ring-2 ring-amber-300'
                                        : 'bg-white text-slate-700 hover:bg-amber-50/50 border-slate-200'
                                }`}
                            >
                                <span>{cat.icon}</span>
                                <span>{cat.nameEnglish}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Duas Grid: Edge-to-edge multi-column on desktop */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    <AnimatePresence>
                        {filteredDuas.length === 0 ? (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="bg-white rounded-3xl p-10 text-center border-2 border-amber-200 shadow-sm"
                            >
                                <Compass size={44} className="mx-auto text-amber-400 mb-2" />
                                <h3 className="text-xl font-bold text-slate-800 mb-1">
                                    No Supplications Found
                                </h3>
                                <p className="text-slate-500 text-sm">
                                    Try searching for other keywords like "morning", "healing", "debt", or "forgiveness".
                                </p>
                            </motion.div>
                        ) : (
                            filteredDuas.map((dua) => {
                                const isFav = favorites.includes(dua.id);
                                const isCompleted = completedDuas.includes(dua.id);
                                const count = duaCounters[dua.id] || 0;
                                const isCurrentDuaSpeaking = speakingTrack?.id === dua.id;
                                const isTargetReached = count >= dua.recommendedCount;
                                const progressPercent = Math.min(100, Math.round((count / dua.recommendedCount) * 100));

                                return (
                                    <motion.div
                                        key={dua.id}
                                        layout
                                        initial={{ y: 15, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        className={`bg-white rounded-[2rem] p-5 sm:p-7 border-2 transition-all shadow-sm relative overflow-hidden ${
                                            isCompleted ? 'border-emerald-300 bg-emerald-50/15' : 'border-amber-200/80 hover:border-amber-300'
                                        }`}
                                    >
                                        {/* Top Header Row matching user screenshot */}
                                        <div className="flex items-start justify-between gap-3 mb-4 flex-wrap">
                                            {/* Occasion & Source Badges */}
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <span className="bg-amber-100/90 text-amber-950 font-bold text-xs px-3 py-1 rounded-xl border border-amber-200">
                                                    {dua.occasionEnglish}
                                                </span>
                                                <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                                                    {dua.referenceEnglish}
                                                </span>
                                            </div>

                                            {/* Actions */}
                                            <div className="flex items-center gap-1.5">
                                                <button
                                                    type="button"
                                                    onClick={() => toggleFavorite(dua.id)}
                                                    className={`p-2 rounded-xl border transition-all cursor-pointer ${
                                                        isFav 
                                                            ? 'bg-rose-50 text-rose-500 border-rose-200' 
                                                            : 'bg-slate-50 text-slate-400 hover:text-rose-500 border-slate-200'
                                                    }`}
                                                    title={isFav ? 'Remove from favorites' : 'Add to favorites'}
                                                >
                                                    <Heart size={16} className={isFav ? 'fill-rose-500' : ''} />
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => handleCopy(dua)}
                                                    className="p-2 bg-slate-50 text-slate-500 hover:text-slate-800 rounded-xl border border-slate-200 transition-all cursor-pointer"
                                                    title="Copy Dua"
                                                >
                                                    {copiedId === dua.id ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => markAsCompleted(dua.id)}
                                                    className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                                                        isCompleted
                                                            ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                                                            : 'bg-white text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 border-slate-200'
                                                    }`}
                                                    title="Mark as recited (+20 XP)"
                                                >
                                                    <CheckCircle2 size={15} className={isCompleted ? 'text-emerald-600 fill-emerald-100' : ''} />
                                                    <span>{isCompleted ? 'Recited ✓' : 'Mark Recited'}</span>
                                                </button>
                                            </div>
                                        </div>

                                        {/* Dua Titles */}
                                        <div className="text-center mb-5">
                                            <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                                                {dua.titleEnglish}
                                            </h3>
                                            <p className="text-sm font-bold text-amber-800 mt-0.5" dir="rtl" style={{ fontFamily: 'Noto Nastaliq Urdu, serif' }}>
                                                {dua.titleUrdu}
                                            </p>
                                        </div>

                                        {/* 1. ARABIC TEXT (with Arabic Voice button) */}
                                        <div className="bg-amber-50/70 rounded-2xl p-5 sm:p-7 text-center mb-4 border-2 border-amber-200/80 relative">
                                            <p 
                                                className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 leading-[2.1] sm:leading-[2.3] mb-3"
                                                style={{ fontFamily: 'Amiri, Traditional Arabic, serif' }}
                                                dir="rtl"
                                            >
                                                {dua.arabic}
                                            </p>

                                            <div className="p-3 bg-white/70 rounded-xl border border-amber-200/60 mb-3 text-left">
                                                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">
                                                    Transliteration / Pronunciation
                                                </span>
                                                <p className="text-xs sm:text-sm font-semibold text-slate-700 italic" dir="ltr">
                                                    "{dua.transliteration}"
                                                </p>
                                            </div>

                                            {/* Arabic Audio Playback Button */}
                                            <div className="flex justify-center">
                                                <button
                                                    type="button"
                                                    onClick={() => speakArabic(dua)}
                                                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                                                        speakingTrack?.id === dua.id && speakingTrack.type === 'arabic'
                                                            ? 'bg-rose-500 text-white animate-pulse'
                                                            : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border border-emerald-300'
                                                    }`}
                                                >
                                                    <Volume2 size={14} />
                                                    <span>
                                                        {speakingTrack?.id === dua.id && speakingTrack.type === 'arabic'
                                                            ? 'Stop Arabic Voice'
                                                            : 'Speak Arabic (عربی سنیں)'}
                                                    </span>
                                                </button>
                                            </div>
                                        </div>

                                        {/* MEANING & TRANSLATION SECTION */}
                                        <div className="space-y-3 mb-5">
                                            {/* 2. URDU TRANSLATION (IN THE MIDDLE between Arabic and English, matching user screenshot) */}
                                            {(meaningView === 'both' || meaningView === 'urdu') && (
                                                <div className="p-4 sm:p-5 bg-white rounded-2xl border-2 border-indigo-100 shadow-2xs relative" dir="rtl">
                                                    <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                                                        <span className="bg-indigo-100 text-indigo-900 text-xs font-black px-2.5 py-0.5 rounded-md">
                                                            اردو ترجمہ
                                                        </span>

                                                        <button
                                                            type="button"
                                                            onClick={() => speakUrdu(dua)}
                                                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
                                                                speakingTrack?.id === dua.id && speakingTrack.type === 'urdu'
                                                                    ? 'bg-rose-500 text-white animate-pulse'
                                                                    : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border border-indigo-200'
                                                            }`}
                                                            dir="ltr"
                                                        >
                                                            <Volume2 size={13} />
                                                            <span>
                                                                {speakingTrack?.id === dua.id && speakingTrack.type === 'urdu'
                                                                    ? 'روکیں (Stop)'
                                                                    : 'Speak Urdu Trans (سنیں)'}
                                                            </span>
                                                        </button>
                                                    </div>

                                                    <p 
                                                        className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800 leading-[2.1] text-right"
                                                        style={{ fontFamily: 'Noto Nastaliq Urdu, serif' }}
                                                    >
                                                        {dua.urduTranslation}
                                                    </p>

                                                    {dua.urduVirtue && (
                                                        <p className="text-xs font-semibold text-slate-500 mt-2 pt-2 border-t border-slate-100 text-right leading-relaxed" style={{ fontFamily: 'Noto Nastaliq Urdu, serif' }}>
                                                            فضیلت: {dua.urduVirtue}
                                                        </p>
                                                    )}
                                                </div>
                                            )}

                                            {/* 3. ENGLISH TRANSLATION */}
                                            {(meaningView === 'both' || meaningView === 'english') && (
                                                <div className="p-4 sm:p-5 bg-slate-50 rounded-2xl border-2 border-slate-200 text-left relative" dir="ltr">
                                                    <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                                                        <span className="bg-amber-100 text-amber-900 text-xs font-black px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                                                            English Translation
                                                        </span>

                                                        <button
                                                            type="button"
                                                            onClick={() => speakEnglish(dua)}
                                                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
                                                                speakingTrack?.id === dua.id && speakingTrack.type === 'english'
                                                                    ? 'bg-rose-500 text-white animate-pulse'
                                                                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                                                            }`}
                                                        >
                                                            <Volume2 size={13} />
                                                            <span>
                                                                {speakingTrack?.id === dua.id && speakingTrack.type === 'english'
                                                                    ? 'Stop Voice'
                                                                    : 'Speak English Trans'}
                                                            </span>
                                                        </button>
                                                    </div>

                                                    <p className="text-sm sm:text-base font-bold text-slate-800 leading-relaxed">
                                                        "{dua.englishTranslation}"
                                                    </p>

                                                    <div className="mt-2.5 pt-2 border-t border-slate-200">
                                                        <p className="text-xs font-semibold text-slate-600 leading-relaxed">
                                                            ✨ <span className="font-bold text-slate-900">Virtue & Authentic Benefit:</span> {dua.englishVirtue}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Global Stop Voice Button (shown when any track is playing) */}
                                        {isCurrentDuaSpeaking && (
                                            <div className="flex justify-center mb-4">
                                                <button
                                                    type="button"
                                                    onClick={stopVoice}
                                                    className="px-4 py-1.5 bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer animate-pulse"
                                                >
                                                    <Square size={13} fill="currentColor" />
                                                    <span>Stop Voice</span>
                                                </button>
                                            </div>
                                        )}

                                        {/* STATE-OF-THE-ART TASBEEH COUNTER FOOTER */}
                                        <div className="pt-3 border-t-2 border-slate-100 flex items-center justify-between gap-3 flex-wrap">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs font-bold text-slate-500">
                                                    Sunnah Count:
                                                </span>
                                                <span className="px-2.5 py-0.5 bg-amber-100 text-amber-900 rounded-lg text-xs font-black">
                                                    {dua.recommendedCount} {dua.recommendedCount > 1 ? 'times' : 'time'}
                                                </span>
                                                {isTargetReached && (
                                                    <span className="inline-flex items-center gap-1 text-[11px] font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                                                        <CheckCheck size={13} /> Target Complete!
                                                    </span>
                                                )}
                                            </div>

                                            {/* Beautiful Interactive Counter Button */}
                                            <div className="flex items-center gap-2">
                                                <motion.button
                                                    whileHover={{ scale: 1.04 }}
                                                    whileTap={{ scale: 0.94 }}
                                                    type="button"
                                                    onClick={() => incrementCounter(dua)}
                                                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-black text-xs sm:text-sm shadow-md transition-all cursor-pointer border-2 ${
                                                        isTargetReached
                                                            ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-emerald-300'
                                                            : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white border-amber-300'
                                                    }`}
                                                >
                                                    <span>{isTargetReached ? 'Completed!' : 'Tap Counter:'}</span>
                                                    <span className="bg-white/25 px-2.5 py-0.5 rounded-md text-sm font-black">
                                                        {count} / {dua.recommendedCount}
                                                    </span>
                                                </motion.button>

                                                {count > 0 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => resetCounter(dua.id)}
                                                        className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-all cursor-pointer border border-slate-200"
                                                        title="Reset counter"
                                                    >
                                                        <RotateCcw size={15} />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
