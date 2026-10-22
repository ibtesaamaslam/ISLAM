import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
    Sparkles, RotateCcw, Volume2, VolumeX, CheckCircle2, ChevronLeft, ChevronRight, 
    Award, Flame, Star, BookOpen, Layers, Square, Search, Bot
} from 'lucide-react';
import { dhikrList, getDhikrOfTheDay, getTodayKey, DhikrItem } from '../data/dhikrData';
import { useGamification } from '../contexts/GamificationContext';
import { playAiVoice, stopCurrentAiVoice, VoicePlaybackController } from '../utils/aiVoice';

// Subtle audio synthesizer for realistic tactile Tasbeeh bead clicks
const playTasbeehClick = (pitch = 900) => {
    try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(pitch, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.04);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.05);
    } catch {
        // AudioContext may be restricted
    }
};

const playCompletionChime = () => {
    try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((freq, idx) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);
            gain.gain.setValueAtTime(0.15, ctx.currentTime + idx * 0.08);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.25);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(ctx.currentTime + idx * 0.08);
            osc.stop(ctx.currentTime + idx * 0.08 + 0.26);
        });
    } catch {
        // AudioContext restricted
    }
};

// Helper to ensure every Hadith starts naturally with Hazrat Muhammad ﷺ ne farmaya & is enclosed in quotes ""
const getNaturalUrduHadith = (text: string) => {
    const clean = (text || '').trim();
    const hasPrefix = /^(حضرت محمد ﷺ نے فرمایا|رسول اللہ ﷺ نے فرمایا|نبی کریم ﷺ نے فرمایا|نبی اکرم ﷺ نے فرمایا)/.test(clean);
    
    if (hasPrefix) {
        if ((clean.includes('”') && clean.includes('“')) || clean.includes('"')) {
            return clean;
        }
        const colonIndex = clean.indexOf(':') !== -1 ? clean.indexOf(':') + 1 : clean.indexOf('فرمایا') + 6;
        const prefix = clean.substring(0, colonIndex).trim();
        const content = clean.substring(colonIndex).replace(/^[“”"'\s]+|[“”"'\s]+$/g, '').trim();
        return `${prefix} ”${content}“`;
    } else {
        const withoutQuotes = clean.replace(/^[“”"']+|[“”"']+$/g, '').trim();
        return `حضرت محمد ﷺ نے فرمایا: ”${withoutQuotes}“`;
    }
};

const getNaturalEnglishHadith = (text: string) => {
    const clean = (text || '').trim();
    const hasPrefix = /^(The Prophet Muhammad \(ﷺ\)|The Prophet Muhammad \(PBUH\)|The Prophet \(PBUH\)|The Messenger of Allah \(PBUH\)|The Prophet \(ﷺ\)|The Messenger of Allah \(ﷺ\))/i.test(clean);
    
    if (hasPrefix) {
        if ((clean.includes('“') && clean.includes('”')) || clean.includes('"')) {
            return clean;
        }
        const colonIndex = clean.indexOf(':') !== -1 ? clean.indexOf(':') + 1 : clean.indexOf('said') + 4;
        const prefix = clean.substring(0, colonIndex).trim();
        const content = clean.substring(colonIndex).replace(/^[“”"'\s]+|[“”"'\s]+$/g, '').trim();
        return `${prefix} "${content}"`;
    } else {
        const withoutQuotes = clean.replace(/^[“”"']+|[“”"']+$/g, '').trim();
        return `The Prophet Muhammad (ﷺ) said: "${withoutQuotes}"`;
    }
};

export const DailyDhikrWidget: React.FC = () => {
    const todayKey = getTodayKey();
    const defaultDhikr = getDhikrOfTheDay();
    const [selectedDhikr, setSelectedDhikr] = useState<DhikrItem>(defaultDhikr);
    const [targetGoal, setTargetGoal] = useState<number>(defaultDhikr.recommendedGoal);
    const [count, setCount] = useState<number>(0);
    const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
    const [showDhikrPicker, setShowDhikrPicker] = useState<boolean>(false);
    const [streak, setStreak] = useState<number>(1);
    const [completedToday, setCompletedToday] = useState<boolean>(false);
    const [showCelebration, setShowCelebration] = useState<boolean>(false);
    const [tapEffect, setTapEffect] = useState<number>(0);
    const [languageView, setLanguageView] = useState<'both' | 'urdu' | 'english'>('both');
    
    // Voice / Speech Synthesis (AI TTS) State
    const [speakingTrack, setSpeakingTrack] = useState<'none' | 'all' | 'arabic' | 'urdu' | 'english' | 'hadith' | 'hadith_eng'>('none');
    const [speakingStepText, setSpeakingStepText] = useState<string>('');
    const [pickerSearch, setPickerSearch] = useState<string>('');
    const [pickerCategory, setPickerCategory] = useState<string>('all');
    const activeVoiceControllerRef = useRef<VoicePlaybackController | null>(null);

    const naturalUrduHadith = getNaturalUrduHadith(selectedDhikr.urduVirtue);
    const naturalEnglishHadith = getNaturalEnglishHadith(selectedDhikr.virtue);

    const { addPoints } = useGamification();

    // Stop speaking when switching dhikr, on unmount, or when Azan triggers
    useEffect(() => {
        const handleStopAudio = () => {
            stopSpeaking();
        };
        window.addEventListener('app:stop_all_audio', handleStopAudio);
        return () => {
            window.removeEventListener('app:stop_all_audio', handleStopAudio);
            stopSpeaking();
        };
    }, []);

    // Load saved counts & streaks for today
    useEffect(() => {
        try {
            // Check daily total
            const savedTodayCount = localStorage.getItem(`tasbeeh_count_${todayKey}_${selectedDhikr.id}`);
            if (savedTodayCount) {
                setCount(parseInt(savedTodayCount, 10) || 0);
            } else {
                setCount(0);
            }

            // Check streak
            const savedStreak = localStorage.getItem('tasbeeh_streak');
            const lastCompletedDate = localStorage.getItem('tasbeeh_last_completed_date');
            if (savedStreak) {
                const numStreak = parseInt(savedStreak, 10) || 1;
                setStreak(numStreak);
                if (lastCompletedDate === todayKey) {
                    setCompletedToday(true);
                }
            }
        } catch {
            // ignore localStorage restrictions
        }
    }, [selectedDhikr.id, todayKey]);

    // Handle AI Voice Speech
    const stopSpeaking = () => {
        if (activeVoiceControllerRef.current) {
            try { activeVoiceControllerRef.current.stop(); } catch {}
            activeVoiceControllerRef.current = null;
        }
        stopCurrentAiVoice();
        setSpeakingTrack('none');
        setSpeakingStepText('');
    };

    const speakArabic = () => {
        if (speakingTrack === 'arabic') {
            stopSpeaking();
            return;
        }
        stopSpeaking();
        setSpeakingTrack('arabic');
        setSpeakingStepText('AI Scholar Voice: Reciting Arabic Zikr...');
        const ctrl = playAiVoice(selectedDhikr.arabic, {
            lang: 'ar-SA',
            onEnd: () => {
                setSpeakingTrack('none');
                setSpeakingStepText('');
                activeVoiceControllerRef.current = null;
            },
            onError: () => stopSpeaking()
        });
        activeVoiceControllerRef.current = ctrl;
    };

    const speakUrdu = () => {
        if (speakingTrack === 'urdu') {
            stopSpeaking();
            return;
        }
        stopSpeaking();
        setSpeakingTrack('urdu');
        setSpeakingStepText('AI Scholar Voice: Speaking Urdu Translation...');
        const ctrl = playAiVoice('اردو ترجمہ: ' + selectedDhikr.urduMeaning, {
            lang: 'ur-PK',
            onEnd: () => {
                setSpeakingTrack('none');
                setSpeakingStepText('');
                activeVoiceControllerRef.current = null;
            },
            onError: () => stopSpeaking()
        });
        activeVoiceControllerRef.current = ctrl;
    };

    const speakEnglish = () => {
        if (speakingTrack === 'english') {
            stopSpeaking();
            return;
        }
        stopSpeaking();
        setSpeakingTrack('english');
        setSpeakingStepText('AI Scholar Voice: Speaking English Translation...');
        const ctrl = playAiVoice('English translation: ' + selectedDhikr.englishMeaning, {
            lang: 'en-US',
            onEnd: () => {
                setSpeakingTrack('none');
                setSpeakingStepText('');
                activeVoiceControllerRef.current = null;
            },
            onError: () => stopSpeaking()
        });
        activeVoiceControllerRef.current = ctrl;
    };

    const speakHadith = () => {
        if (speakingTrack === 'hadith') {
            stopSpeaking();
            return;
        }
        stopSpeaking();
        setSpeakingTrack('hadith');
        setSpeakingStepText('AI Scholar Voice: Speaking Hadith Reward in Urdu...');
        const ctrl = playAiVoice(naturalUrduHadith, {
            lang: 'ur-PK',
            onEnd: () => {
                setSpeakingTrack('none');
                setSpeakingStepText('');
                activeVoiceControllerRef.current = null;
            },
            onError: () => stopSpeaking()
        });
        activeVoiceControllerRef.current = ctrl;
    };

    const speakEnglishHadith = () => {
        if (speakingTrack === 'hadith_eng') {
            stopSpeaking();
            return;
        }
        stopSpeaking();
        setSpeakingTrack('hadith_eng');
        setSpeakingStepText('AI Scholar Voice: Speaking English Hadith Reward...');
        const ctrl = playAiVoice(naturalEnglishHadith, {
            lang: 'en-US',
            onEnd: () => {
                setSpeakingTrack('none');
                setSpeakingStepText('');
                activeVoiceControllerRef.current = null;
            },
            onError: () => stopSpeaking()
        });
        activeVoiceControllerRef.current = ctrl;
    };

    // Full Sequence: Speak Arabic Zikr -> Urdu Trans -> English Trans
    const speakAllSequence = async () => {
        if (speakingTrack !== 'none') {
            stopSpeaking();
            return;
        }

        stopSpeaking();
        setSpeakingTrack('all');

        try {
            // 1. Arabic Zikr
            setSpeakingStepText('1/3: AI Voice Reciting Arabic Zikr...');
            const c1 = playAiVoice(selectedDhikr.arabic, { lang: 'ar-SA' });
            activeVoiceControllerRef.current = c1;
            await c1.promise;

            // 2. Urdu Translation
            setSpeakingStepText('2/3: AI Voice Speaking Urdu Translation (اردو ترجمہ)...');
            const c2 = playAiVoice('اردو ترجمہ: ' + selectedDhikr.urduMeaning, { lang: 'ur-PK' });
            activeVoiceControllerRef.current = c2;
            await c2.promise;

            // 3. English Translation
            setSpeakingStepText('3/3: AI Voice Speaking English Translation...');
            const c3 = playAiVoice('English translation: ' + selectedDhikr.englishMeaning, { lang: 'en-US' });
            activeVoiceControllerRef.current = c3;
            await c3.promise;
        } catch (err) {
            console.warn("Sequence audio notice:", err);
        } finally {
            setSpeakingTrack('none');
            setSpeakingStepText('');
            activeVoiceControllerRef.current = null;
        }
    };

    // Handle Tasbeeh Increment
    const handleIncrement = () => {
        const nextCount = count + 1;
        setCount(nextCount);
        setTapEffect(prev => prev + 1);

        // Haptic feedback
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
            try {
                navigator.vibrate(20);
            } catch {}
        }

        // Sound effect
        if (soundEnabled) {
            playTasbeehClick(nextCount % targetGoal === 0 ? 1200 : 850 + (nextCount % 10) * 15);
        }

        // Save progress
        try {
            localStorage.setItem(`tasbeeh_count_${todayKey}_${selectedDhikr.id}`, nextCount.toString());
            const overallToday = parseInt(localStorage.getItem(`tasbeeh_total_today_${todayKey}`) || '0', 10) + 1;
            localStorage.setItem(`tasbeeh_total_today_${todayKey}`, overallToday.toString());
        } catch {}

        // Award gamification points every 10 counts
        if (nextCount % 10 === 0) {
            addPoints(5);
        }

        // Goal reached milestone celebration
        if (nextCount === targetGoal) {
            handleGoalAchieved();
        }
    };

    const handleGoalAchieved = () => {
        setShowCelebration(true);
        if (soundEnabled) {
            playCompletionChime();
        }
        addPoints(30);

        // Update streak
        try {
            const lastDate = localStorage.getItem('tasbeeh_last_completed_date');
            if (lastDate !== todayKey) {
                const currentStreak = parseInt(localStorage.getItem('tasbeeh_streak') || '0', 10);
                const newStreak = currentStreak + 1;
                setStreak(newStreak);
                setCompletedToday(true);
                localStorage.setItem('tasbeeh_streak', newStreak.toString());
                localStorage.setItem('tasbeeh_last_completed_date', todayKey);
            }
        } catch {}

        setTimeout(() => {
            setShowCelebration(false);
        }, 5000);
    };

    const handleReset = () => {
        setCount(0);
        try {
            localStorage.removeItem(`tasbeeh_count_${todayKey}_${selectedDhikr.id}`);
        } catch {}
    };

    const handleUndo = () => {
        if (count > 0) {
            const nextCount = count - 1;
            setCount(nextCount);
            try {
                localStorage.setItem(`tasbeeh_count_${todayKey}_${selectedDhikr.id}`, nextCount.toString());
            } catch {}
        }
    };

    const switchDhikr = (dhikr: DhikrItem) => {
        stopSpeaking();
        setSelectedDhikr(dhikr);
        setTargetGoal(dhikr.recommendedGoal);
        setShowDhikrPicker(false);
    };

    const nextDhikr = () => {
        stopSpeaking();
        const currentIndex = dhikrList.findIndex(d => d.id === selectedDhikr.id);
        const nextIndex = (currentIndex + 1) % dhikrList.length;
        switchDhikr(dhikrList[nextIndex]);
    };

    const prevDhikr = () => {
        stopSpeaking();
        const currentIndex = dhikrList.findIndex(d => d.id === selectedDhikr.id);
        const prevIndex = (currentIndex - 1 + dhikrList.length) % dhikrList.length;
        switchDhikr(dhikrList[prevIndex]);
    };

    const progressPercent = Math.min(100, Math.round((count / targetGoal) * 100));

    // Categories in Dhikr list
    const categories = ['all', ...Array.from(new Set(dhikrList.map(d => d.category)))];

    const filteredDhikrs = dhikrList.filter(d => {
        const matchesCategory = pickerCategory === 'all' || d.category === pickerCategory;
        const q = pickerSearch.toLowerCase().trim();
        const matchesSearch = !q || 
            d.arabic.includes(q) || 
            d.transliteration.toLowerCase().includes(q) || 
            d.englishMeaning.toLowerCase().includes(q) || 
            d.urduMeaning.includes(q) ||
            d.category.toLowerCase().includes(q);
        return matchesCategory && matchesSearch;
    });

    return (
        <section className="w-full my-12 relative">
            {/* Celebration Confetti Overlay */}
            <AnimatePresence>
                {showCelebration && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center p-4 bg-emerald-950/40 backdrop-blur-sm"
                    >
                        <div className="bg-white rounded-[2.5rem] p-8 border-4 border-yellow-400 shadow-2xl max-w-md w-full text-center relative overflow-hidden pointer-events-auto">
                            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-yellow-300 to-amber-500 rounded-3xl flex items-center justify-center shadow-lg border-4 border-white rotate-6 animate-bounce">
                                <Award size={42} className="text-white" strokeWidth={2.5} />
                            </div>
                            <span className="inline-block px-4 py-1.5 bg-yellow-100 text-yellow-800 rounded-full font-black text-xs uppercase tracking-wider mb-2">
                                Goal Completed! 🎉
                            </span>
                            <h3 className="text-3xl font-black text-slate-900 mb-2">Māshā’Allāh!</h3>
                            <p className="text-slate-600 font-bold mb-6">
                                You completed {targetGoal} counts of this blessed Dhikr. May Allah fill your heart with light and reward your every bead!
                            </p>
                            <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-4 mb-6">
                                <p className="text-emerald-800 font-bold text-sm">
                                    +30 Quest XP Earned &bull; Daily Streak: {streak} Days 🔥
                                </p>
                            </div>
                            <button
                                onClick={() => setShowCelebration(false)}
                                className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black text-lg rounded-2xl shadow-[0_4px_0_#065f46] hover:translate-y-[-2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer"
                            >
                                Continue Dhikr
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Container Card */}
            <div className="w-full bg-white/95 backdrop-blur-xl rounded-[2.5rem] border-4 border-white shadow-[0_12px_40px_rgba(15,23,42,0.12)] overflow-hidden">
                
                {/* Header Banner */}
                <div className="bg-gradient-to-r from-sky-600 via-indigo-600 to-teal-600 p-6 md:p-8 text-white relative overflow-hidden">
                    {/* Decorative Background Elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl -mr-20 -mt-20 pointer-events-none" />
                    <div className="absolute bottom-0 left-10 w-40 h-40 bg-yellow-300/10 rounded-full blur-xl pointer-events-none" />

                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl border-2 border-white/40 flex items-center justify-center shadow-inner shrink-0">
                                <Sparkles className="text-yellow-300 fill-yellow-300 animate-pulse" size={28} />
                            </div>
                            <div>
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="bg-yellow-400 text-slate-900 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                                        Today's Dhikr
                                    </span>
                                    <span className="text-xs font-bold text-sky-200">
                                        Rotates Daily Across 60+ Authentic Zikrs
                                    </span>
                                </div>
                                <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight mt-1">
                                    Daily Dhikr &amp; Digital Tasbeeh
                                </h2>
                            </div>
                        </div>

                        {/* Badges / Controls */}
                        <div className="flex items-center gap-3 flex-wrap">
                            {/* Streak Badge */}
                            <div className="flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 shadow-sm">
                                <Flame className="text-amber-300 fill-amber-300" size={20} />
                                <div className="leading-tight">
                                    <span className="text-[10px] uppercase font-bold text-sky-100 block">Streak</span>
                                    <span className="text-sm font-black text-white">{streak} Day{streak !== 1 ? 's' : ''}</span>
                                </div>
                            </div>

                            {/* Sound Toggle */}
                            <button
                                onClick={() => setSoundEnabled(!soundEnabled)}
                                className="p-3 bg-white/15 hover:bg-white/25 rounded-2xl border border-white/20 text-white transition-all shadow-sm cursor-pointer"
                                title={soundEnabled ? "Mute Click Sound" : "Enable Click Sound"}
                            >
                                {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
                            </button>

                            {/* Change Dhikr Selector Button */}
                            <button
                                onClick={() => setShowDhikrPicker(!showDhikrPicker)}
                                className="flex items-center gap-2 px-4 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-black rounded-2xl shadow-[0_3px_0_#ca8a04] active:translate-y-[2px] active:shadow-none transition-all text-sm cursor-pointer"
                            >
                                <Layers size={18} />
                                <span>Change Dhikr ({dhikrList.length}+)</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Dhikr Selector Drawer/Dropdown (Collapsible with Search & Filter) */}
                <AnimatePresence>
                    {showDhikrPicker && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="bg-slate-50 border-b-2 border-slate-200 overflow-hidden"
                        >
                            <div className="p-5 md:p-6 max-h-[500px] overflow-y-auto">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
                                    <div>
                                        <h4 className="font-black text-slate-800 text-lg flex items-center gap-2">
                                            <BookOpen size={20} className="text-sky-600" />
                                            Choose from {dhikrList.length}+ Powerful Authentic Zikrs
                                        </h4>
                                        <p className="text-xs text-slate-500 font-bold">
                                            All verified with authentic Sahih references from Hadith literature
                                        </p>
                                    </div>
                                    <button 
                                        onClick={() => setShowDhikrPicker(false)}
                                        className="text-xs font-black text-slate-600 hover:text-slate-900 bg-white px-4 py-2 rounded-xl border border-slate-300 shadow-sm cursor-pointer"
                                    >
                                        ✕ Close
                                    </button>
                                </div>

                                {/* Search Bar & Categories */}
                                <div className="flex flex-col sm:flex-row gap-2.5 mb-4">
                                    <div className="relative flex-1">
                                        <Search size={16} className="text-slate-400 absolute left-3.5 top-3" />
                                        <input
                                            type="text"
                                            value={pickerSearch}
                                            onChange={(e) => setPickerSearch(e.target.value)}
                                            placeholder="Search by Arabic, translation, or virtue..."
                                            className="w-full pl-10 pr-4 py-2 bg-white rounded-xl border border-slate-300 text-xs font-bold text-slate-800 focus:outline-none focus:border-sky-500"
                                        />
                                    </div>
                                    {/* Category Filter Pills */}
                                    <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
                                        {categories.slice(0, 6).map(cat => (
                                            <button
                                                key={cat}
                                                onClick={() => setPickerCategory(cat)}
                                                className={`px-3 py-1.5 rounded-xl text-xs font-black whitespace-nowrap transition-all capitalize cursor-pointer ${
                                                    pickerCategory === cat
                                                        ? 'bg-sky-600 text-white'
                                                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                                                }`}
                                            >
                                                {cat === 'all' ? `All (${dhikrList.length})` : cat}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {filteredDhikrs.map(dhikr => (
                                        <button
                                            key={dhikr.id}
                                            onClick={() => switchDhikr(dhikr)}
                                            className={`text-left p-4 rounded-2xl border-2 transition-all duration-200 flex flex-col justify-between cursor-pointer ${
                                                selectedDhikr.id === dhikr.id
                                                    ? 'bg-sky-50 border-sky-500 shadow-md ring-2 ring-sky-200'
                                                    : 'bg-white border-slate-200 hover:border-sky-300 hover:shadow-sm'
                                            }`}
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-[10px] font-black uppercase tracking-wider text-sky-700 bg-sky-100 px-2.5 py-0.5 rounded-full">
                                                    {dhikr.category}
                                                </span>
                                                <span className="text-xs font-bold text-slate-400">
                                                    Goal: {dhikr.recommendedGoal}
                                                </span>
                                            </div>
                                            <p className="text-right text-lg font-serif text-slate-900 mb-1" dir="rtl" style={{ fontFamily: 'Traditional Arabic, serif' }}>
                                                {dhikr.arabic}
                                            </p>
                                            <p className="text-xs font-bold text-slate-500 line-clamp-1 italic">
                                                {dhikr.transliteration}
                                            </p>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Main Interactive Grid */}
                <div className="p-6 md:p-10 grid lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Left: Dhikr Text & Immense Reward Details (Col 7) */}
                    <div className="lg:col-span-7 space-y-6">
                        
                        {/* Nav Carousel Controls */}
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-black text-slate-500 tracking-wider uppercase flex items-center gap-1.5">
                                <Star size={16} className="text-amber-500 fill-amber-500" />
                                {selectedDhikr.category}
                            </span>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={prevDhikr}
                                    className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                                    title="Previous Dhikr"
                                >
                                    <ChevronLeft size={18} />
                                </button>
                                <span className="text-xs font-bold text-slate-500">
                                    {dhikrList.findIndex(d => d.id === selectedDhikr.id) + 1} of {dhikrList.length}
                                </span>
                                <button
                                    onClick={nextDhikr}
                                    className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                                    title="Next Dhikr"
                                >
                                    <ChevronRight size={18} />
                                </button>
                            </div>
                        </div>

                        {/* GEMINI AI VOICE PLAYBAR */}
                        <div className="bg-gradient-to-r from-sky-50 via-indigo-50 to-teal-50 p-4 rounded-2xl border-2 border-sky-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-white ${
                                    speakingTrack !== 'none' ? 'bg-amber-500 animate-pulse' : 'bg-sky-600'
                                }`}>
                                    <Bot size={22} />
                                </div>
                                <div>
                                    <h4 className="text-xs font-black text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
                                        <span>AI Voice Audio Guide</span>
                                        <span className="bg-indigo-100 text-indigo-800 text-[10px] font-bold px-2 py-0.5 rounded-md">Gemini AI</span>
                                    </h4>
                                    <p className="text-[11px] font-bold text-slate-500">
                                        {speakingStepText || "Listen to high-fidelity AI pronunciation & spoken translations"}
                                    </p>
                                </div>
                            </div>

                            {/* PRIMARY SPEAK BUTTONS */}
                            <div className="flex items-center gap-2 flex-wrap">
                                {speakingTrack !== 'none' ? (
                                    <button
                                        type="button"
                                        onClick={stopSpeaking}
                                        className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-black shadow-xs transition-all active:scale-95 cursor-pointer animate-pulse"
                                    >
                                        <Square size={13} fill="currentColor" />
                                        <span>Stop Voice</span>
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={speakAllSequence}
                                        className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white text-xs font-black shadow-xs transition-all active:scale-95 cursor-pointer"
                                        title="AI Agent speaks Arabic Zikr, followed by Urdu Translation, followed by English Translation"
                                    >
                                        <Volume2 size={15} />
                                        <span>Speak the Zikr (Also Urdu &amp; English Trans)</span>
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Arabic Script Display Card */}
                        <div className="bg-gradient-to-br from-amber-50/80 via-white to-sky-50/50 p-6 md:p-8 rounded-[2rem] border-2 border-amber-200/60 shadow-sm relative">
                            {/* Individual Voice Quick Action */}
                            <div className="flex items-center justify-between mb-3 border-b border-amber-100 pb-2">
                                <span className="text-[10px] font-black uppercase text-amber-800 tracking-wider">
                                    Arabic Dhikr Script
                                </span>
                                <div className="flex items-center gap-1.5">
                                    <button
                                        type="button"
                                        onClick={speakArabic}
                                        className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                                            speakingTrack === 'arabic'
                                                ? 'bg-amber-500 text-white shadow-xs animate-pulse'
                                                : 'bg-white text-slate-700 border border-slate-200 hover:bg-amber-50'
                                        }`}
                                        title="AI Agent speaks Arabic Zikr only"
                                    >
                                        <Volume2 size={13} />
                                        <span>Speak the Zikr</span>
                                    </button>
                                </div>
                            </div>

                            <p 
                                className="text-right text-3xl md:text-5xl leading-[2.1] md:leading-[2.2] font-serif text-slate-900 selection:bg-amber-200" 
                                dir="rtl"
                                style={{ fontFamily: 'Traditional Arabic, serif' }}
                            >
                                {selectedDhikr.arabic}
                            </p>
                        </div>

                        {/* Transliteration */}
                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">
                                Transliteration / Pronunciation
                            </span>
                            <p className="text-base font-bold text-slate-700 italic">
                                "{selectedDhikr.transliteration}"
                            </p>
                        </div>

                        {/* Translation Toggle & Display */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between flex-wrap gap-2">
                                <span className="text-xs font-black text-slate-500 uppercase tracking-wider">
                                    Meaning &amp; Translation
                                </span>
                                <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-black">
                                    <button 
                                        onClick={() => setLanguageView('both')}
                                        className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${languageView === 'both' ? 'bg-white text-sky-700 shadow-sm' : 'text-slate-500'}`}
                                    >
                                        Both
                                    </button>
                                    <button 
                                        onClick={() => setLanguageView('urdu')}
                                        className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${languageView === 'urdu' ? 'bg-white text-sky-700 shadow-sm' : 'text-slate-500'}`}
                                    >
                                        Urdu
                                    </button>
                                    <button 
                                        onClick={() => setLanguageView('english')}
                                        className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${languageView === 'english' ? 'bg-white text-sky-700 shadow-sm' : 'text-slate-500'}`}
                                    >
                                        English
                                    </button>
                                </div>
                            </div>

                            {/* Urdu Translation */}
                            {(languageView === 'both' || languageView === 'urdu') && (
                                <div className="bg-white p-4.5 rounded-2xl border-2 border-indigo-100 shadow-sm">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-[10px] font-black uppercase text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-md inline-block">
                                            اردو ترجمہ
                                        </span>
                                        <button
                                            type="button"
                                            onClick={speakUrdu}
                                            className={`text-[11px] font-black flex items-center gap-1 px-3 py-1 rounded-lg transition-all cursor-pointer ${
                                                speakingTrack === 'urdu' ? 'bg-indigo-600 text-white animate-pulse' : 'text-indigo-700 bg-indigo-50 hover:bg-indigo-100'
                                            }`}
                                        >
                                            <Volume2 size={12} />
                                            <span>Speak Urdu Trans (سنیں)</span>
                                        </button>
                                    </div>
                                    <p className="text-xl text-right font-medium text-slate-800 leading-[2.1]" dir="rtl" style={{ fontFamily: 'Noto Nastaliq Urdu, serif' }}>
                                        {selectedDhikr.urduMeaning}
                                    </p>
                                </div>
                            )}

                            {/* English Translation */}
                            {(languageView === 'both' || languageView === 'english') && (
                                <div className="bg-white p-4.5 rounded-2xl border-2 border-slate-100 shadow-sm">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-[10px] font-black uppercase text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-md inline-block">
                                            English Translation
                                        </span>
                                        <button
                                            type="button"
                                            onClick={speakEnglish}
                                            className={`text-[11px] font-black flex items-center gap-1 px-3 py-1 rounded-lg transition-all cursor-pointer ${
                                                speakingTrack === 'english' ? 'bg-sky-600 text-white animate-pulse' : 'text-sky-700 bg-sky-50 hover:bg-sky-100'
                                            }`}
                                        >
                                            <Volume2 size={12} />
                                            <span>Speak English Trans</span>
                                        </button>
                                    </div>
                                    <p className="text-sm font-bold text-slate-700 leading-relaxed">
                                        {selectedDhikr.englishMeaning}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Immense Spiritual Virtue & Hadith Reward Card */}
                        {/* REQUIREMENT: ADD "" AT START AND END SO IT MUST LOOK A HADITH AND START IT LIKE HAZRAT MUHAMMAD NE FARMAYA */}
                        <div className="bg-gradient-to-br from-amber-50 via-emerald-50/40 to-yellow-50 p-6 md:p-7 rounded-[2rem] border-2 border-emerald-300 shadow-sm relative overflow-hidden">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="p-2 bg-emerald-600 text-white rounded-xl shadow-xs">
                                    <Sparkles size={18} fill="currentColor" />
                                </div>
                                <span className="text-xs font-black uppercase tracking-wider text-emerald-950">
                                    Immense Spiritual Virtue &amp; Hadith Reward (فضیلت و ثواب)
                                </span>
                            </div>

                            {/* 1. FIRST: REWARD WRITTEN IN URDU WITH "HAZRAT MUHAMMAD NE FARMAYA" AND QUOTES "" */}
                            <div className="bg-white/95 backdrop-blur-sm p-5 md:p-6 rounded-2xl border-2 border-emerald-300 mb-4 shadow-sm relative overflow-hidden">
                                <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                                    <span className="text-[11px] font-black uppercase tracking-wider text-emerald-900 bg-emerald-100 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-2xs">
                                        <Sparkles size={13} className="text-emerald-600 fill-emerald-600" />
                                        فضیلت و ثواب (Urdu Hadith Reward)
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={speakHadith}
                                            className={`text-[11px] font-black flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all shadow-xs cursor-pointer ${
                                                speakingTrack === 'hadith' 
                                                    ? 'bg-rose-500 text-white animate-pulse' 
                                                    : 'text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200'
                                            }`}
                                            title="حدیث مبارکہ بول کر سنیں"
                                        >
                                            <Volume2 size={13} />
                                            <span>{speakingTrack === 'hadith' ? 'Stop Voice' : 'حدیث سنیں (Listen Hadith)'}</span>
                                        </button>
                                        <span className="text-xs font-black text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg">
                                            حدیث مبارکہ
                                        </span>
                                    </div>
                                </div>

                                {/* NATURAL HADITH WORDING (INCORPORATED NATURALLY IN TEXT) */}
                                <div className="text-right" dir="rtl">
                                    <p 
                                        className="text-xl md:text-2xl font-medium text-emerald-950 leading-[2.3] pr-1" 
                                        style={{ fontFamily: 'Noto Nastaliq Urdu, serif' }}
                                    >
                                        {naturalUrduHadith}
                                    </p>
                                </div>
                            </div>

                            {/* 2. SECOND: REWARD WRITTEN IN ENGLISH WITH QUOTES "" */}
                            <div className="bg-white/95 backdrop-blur-sm p-5 md:p-6 rounded-2xl border-2 border-amber-300 shadow-sm">
                                <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                                    <span className="text-[11px] font-black uppercase tracking-wider text-amber-900 bg-amber-100 px-3 py-1 rounded-full shadow-2xs">
                                        English Translation of Reward
                                    </span>
                                    <button
                                        type="button"
                                        onClick={speakEnglishHadith}
                                        className={`text-[11px] font-black flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all shadow-xs cursor-pointer ${
                                            speakingTrack === 'hadith_eng' 
                                                ? 'bg-rose-500 text-white animate-pulse' 
                                                : 'text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200'
                                        }`}
                                        title="Listen to English Hadith Reward"
                                    >
                                        <Volume2 size={13} />
                                        <span>{speakingTrack === 'hadith_eng' ? 'Stop Voice' : 'Listen Hadith'}</span>
                                    </button>
                                </div>

                                <div className="space-y-1">
                                    <p className="text-base font-bold text-slate-800 leading-relaxed pl-1">
                                        {naturalEnglishHadith}
                                    </p>
                                </div>
                            </div>

                            {/* 3. AUTHENTIC REFERENCE */}
                            <div className="mt-4 flex items-center justify-between text-xs font-extrabold text-slate-600 flex-wrap gap-2 pt-2 border-t border-amber-200/60">
                                <span className="flex items-center gap-1.5 text-amber-900 bg-amber-100/90 px-3 py-1.5 rounded-xl">
                                    📖 Hadith Reference: {selectedDhikr.reference}
                                </span>
                                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100/90 px-2.5 py-1.5 rounded-xl flex items-center gap-1">
                                    <CheckCircle2 size={13} className="text-emerald-600" />
                                    Authentic &amp; Sahih Verified
                                </span>
                            </div>
                        </div>

                    </div>

                    {/* Right: Interactive Tasbeeh Counter & Visual Progress Bar (Col 5) */}
                    <div className="lg:col-span-5 flex flex-col items-center">
                        <div className="w-full max-w-sm bg-slate-50 rounded-[2.5rem] p-6 md:p-8 border-4 border-slate-200/80 shadow-lg flex flex-col items-center sticky top-24">
                            
                            {/* Target Goal Selector */}
                            <div className="w-full mb-6">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs font-black text-slate-500 uppercase tracking-wider">
                                        Target Goal
                                    </span>
                                    <span className="text-xs font-bold text-sky-600">
                                        {count} / {targetGoal}
                                    </span>
                                </div>
                                <div className="grid grid-cols-4 gap-2">
                                    {[33, 100, 300, 1000].map(val => (
                                        <button
                                            key={val}
                                            onClick={() => setTargetGoal(val)}
                                            className={`py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                                                targetGoal === val
                                                    ? 'bg-sky-600 text-white shadow-md'
                                                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                                            }`}
                                        >
                                            {val}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Visual Progress Bar */}
                            <div className="w-full mb-8">
                                <div className="flex justify-between items-center text-xs font-black mb-2">
                                    <span className="text-slate-600">Visual Progress</span>
                                    <span className={count >= targetGoal ? "text-emerald-600 font-extrabold" : "text-sky-600"}>
                                        {progressPercent}%
                                    </span>
                                </div>
                                <div className="w-full h-4 bg-slate-200 rounded-full overflow-hidden p-0.5 border border-slate-300">
                                    <motion.div 
                                        className={`h-full rounded-full transition-all duration-300 ${
                                            count >= targetGoal
                                                ? 'bg-gradient-to-r from-emerald-400 to-teal-500'
                                                : 'bg-gradient-to-r from-amber-400 via-sky-400 to-indigo-500'
                                        }`}
                                        style={{ width: `${progressPercent}%` }}
                                    />
                                </div>
                            </div>

                            {/* The Main Tactile Tasbeeh Tap Button */}
                            <div className="relative my-2">
                                {/* Tap Ripple Animation */}
                                <AnimatePresence>
                                    {tapEffect > 0 && (
                                        <motion.div
                                            key={tapEffect}
                                            initial={{ scale: 0.8, opacity: 0.8 }}
                                            animate={{ scale: 1.4, opacity: 0 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.4 }}
                                            className="absolute inset-0 rounded-full bg-sky-400/30 pointer-events-none"
                                        />
                                    )}
                                </AnimatePresence>

                                <motion.button
                                    whileTap={{ scale: 0.94 }}
                                    onClick={handleIncrement}
                                    className="relative w-52 h-52 rounded-full bg-gradient-to-b from-sky-500 via-sky-600 to-blue-700 text-white shadow-[0_12px_0_#1d4ed8,0_20px_35px_rgba(37,99,235,0.35)] active:shadow-[0_2px_0_#1d4ed8] active:translate-y-[10px] border-4 border-sky-300 flex flex-col items-center justify-center select-none transition-transform group cursor-pointer"
                                >
                                    {/* Top reflection glare */}
                                    <div className="absolute top-3 w-32 h-14 bg-white/20 rounded-full blur-[1px] pointer-events-none" />
                                    
                                    <span className="text-[11px] font-black uppercase tracking-widest text-sky-100 drop-shadow-sm mb-1">
                                        Tap Tasbeeh
                                    </span>
                                    
                                    <span className="text-6xl font-black tracking-tight text-white drop-shadow-md">
                                        {count}
                                    </span>
                                    
                                    <span className="text-xs font-bold text-sky-100 mt-1 flex items-center gap-1">
                                        {count >= targetGoal ? (
                                            <span className="text-yellow-300 flex items-center gap-1">
                                                <CheckCircle2 size={14} /> Completed!
                                            </span>
                                        ) : (
                                            <span>Goal: {targetGoal}</span>
                                        )}
                                    </span>
                                </motion.button>
                            </div>

                            {/* Action Buttons: Reset, Undo */}
                            <div className="flex items-center gap-3 mt-8 w-full">
                                <button
                                    onClick={handleUndo}
                                    disabled={count === 0}
                                    className="flex-1 py-3 px-4 rounded-2xl bg-white border-2 border-slate-200 text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-white font-black text-xs transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                                >
                                    <span>-1 Undo</span>
                                </button>

                                <button
                                    onClick={handleReset}
                                    disabled={count === 0}
                                    className="flex-1 py-3 px-4 rounded-2xl bg-rose-50 border-2 border-rose-200 text-rose-600 hover:bg-rose-100 disabled:opacity-40 disabled:hover:bg-rose-50 font-black text-xs transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                                >
                                    <RotateCcw size={14} />
                                    <span>Reset</span>
                                </button>
                            </div>

                            {/* Motivation Footer */}
                            <p className="text-[11px] font-bold text-slate-400 text-center mt-5">
                                Every single bead is a light on your scale of deeds! 🌟
                            </p>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
};

export default DailyDhikrWidget;
