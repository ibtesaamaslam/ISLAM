import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Star, Award, Zap, Lock, CheckCircle2, X, Sparkles, BookOpen, Crown, ChevronRight, Heart, HelpCircle, Compass, Target } from 'lucide-react';
import { useGamification } from '../contexts/GamificationContext';
import { LEVELS_100, LEVEL_TIERS, getLevelInfo, getTierForLevel, LevelInfo, LevelTier } from '../data/levelsData';

interface LevelsAndAchievementsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const LevelsAndAchievementsModal: React.FC<LevelsAndAchievementsModalProps> = ({ isOpen, onClose }) => {
    const { points, level, unlockedAchievements, achievements } = useGamification();
    const [activeTab, setActiveTab] = useState<'levels' | 'achievements' | 'earn'>('levels');
    const [selectedTierId, setSelectedTierId] = useState<number | 'all'>('all');
    const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all');
    const [revealedFacts, setRevealedFacts] = useState<{ [lvl: number]: boolean }>({});
    const currentLevelCardRef = useRef<HTMLDivElement | null>(null);

    const currentLevelInfo = getLevelInfo(level);
    const currentTier = getTierForLevel(level);

    const currentXpInLevel = points % 100;
    const xpNeededForNext = level >= 100 ? 0 : 100 - currentXpInLevel;
    const progressPercent = level >= 100 ? 100 : Math.min(100, Math.max(0, currentXpInLevel));

    // Scroll to current level when requested
    const scrollToCurrentLevel = () => {
        setSelectedTierId('all');
        setTimeout(() => {
            currentLevelCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 150);
    };

    const toggleFact = (lvl: number) => {
        setRevealedFacts(prev => ({ ...prev, [lvl]: !prev[lvl] }));
    };

    if (!isOpen) return null;

    const filteredLevels = LEVELS_100.filter(lvl => {
        if (selectedTierId === 'all') return true;
        return lvl.tier === selectedTierId;
    });

    const filteredAchievements = achievements.filter(ach => {
        const isUnlocked = unlockedAchievements.includes(ach.id);
        if (filter === 'unlocked') return isUnlocked;
        if (filter === 'locked') return !isUnlocked;
        return true;
    });

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
                {/* Backdrop */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 bg-slate-900/65 backdrop-blur-md"
                />

                {/* Modal Container */}
                <motion.div 
                    initial={{ scale: 0.92, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.92, opacity: 0, y: 20 }}
                    transition={{ type: "spring", duration: 0.45, bounce: 0.15 }}
                    className="relative z-10 w-full max-w-3xl bg-white rounded-[2.5rem] shadow-2xl border-4 border-amber-300 overflow-hidden flex flex-col max-h-[92vh]"
                >
                    {/* Header Bar */}
                    <div className="relative bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 p-5 sm:p-7 text-white flex items-center justify-between shadow-md">
                        {/* Decorative Background Elements */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl -mr-20 -mt-20 pointer-events-none" />

                        <div className="relative z-10 flex items-center gap-3.5">
                            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner border-2 border-white/40 text-3xl shrink-0">
                                {currentLevelInfo.icon}
                            </div>
                            <div>
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="bg-yellow-300 text-slate-900 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full tracking-wider shadow-xs">
                                        Tier {currentTier.id}: {currentTier.name}
                                    </span>
                                    <span className="text-xs font-bold text-yellow-100">
                                        100 Levels Quest
                                    </span>
                                </div>
                                <h2 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight drop-shadow-sm mt-0.5 flex items-center gap-2">
                                    <span>Lvl {level}: {currentLevelInfo.title}</span>
                                    <span className="text-sm sm:text-base font-serif text-yellow-200" dir="rtl">
                                        ({currentLevelInfo.arabicTitle})
                                    </span>
                                </h2>
                                <p className="text-xs sm:text-sm font-bold text-amber-100">
                                    ⭐ {points} Total XP Points Collected &bull; {level}/100 Levels Conquered
                                </p>
                            </div>
                        </div>

                        <button 
                            onClick={onClose}
                            className="relative z-10 w-11 h-11 rounded-2xl bg-black/15 hover:bg-black/25 text-white flex items-center justify-center transition-all active:scale-95 shrink-0"
                            title="Close"
                        >
                            <X size={22} strokeWidth={3} />
                        </button>
                    </div>

                    {/* Level Progress Banner */}
                    <div className="bg-gradient-to-r from-amber-50 via-yellow-50 to-orange-50 px-5 sm:px-7 py-3.5 border-b border-amber-200">
                        <div className="flex justify-between items-center text-xs font-black text-amber-950 mb-1.5 flex-wrap gap-1">
                            <span className="flex items-center gap-1.5">
                                <Zap size={15} className="text-amber-500 fill-amber-500 animate-pulse" />
                                {level >= 100 ? 'Supreme Level 100 Completed! 🏆' : `Level ${level} Progress`}
                            </span>
                            <span className="text-amber-800">
                                {level >= 100 ? 'Maximum Level Master' : `${currentXpInLevel} / 100 XP (${xpNeededForNext} XP to Level ${level + 1})`}
                            </span>
                        </div>
                        <div className="w-full h-4 bg-amber-200/60 rounded-full overflow-hidden p-0.5 shadow-inner">
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${progressPercent}%` }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="h-full bg-gradient-to-r from-amber-400 via-orange-400 to-emerald-400 rounded-full shadow-sm"
                            />
                        </div>
                    </div>

                    {/* Tabs Bar */}
                    <div className="flex border-b border-slate-200 bg-slate-50/90 p-2 gap-2 text-xs sm:text-sm font-black">
                        <button
                            onClick={() => setActiveTab('levels')}
                            className={`flex-1 py-2.5 rounded-2xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
                                activeTab === 'levels'
                                    ? 'bg-white text-orange-600 shadow-sm border border-slate-200 ring-2 ring-orange-200'
                                    : 'text-slate-500 hover:text-slate-800'
                            }`}
                        >
                            <Crown size={16} />
                            <span>100 Levels Journey</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('achievements')}
                            className={`flex-1 py-2.5 rounded-2xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
                                activeTab === 'achievements'
                                    ? 'bg-white text-orange-600 shadow-sm border border-slate-200 ring-2 ring-orange-200'
                                    : 'text-slate-500 hover:text-slate-800'
                            }`}
                        >
                            <Trophy size={16} />
                            <span>Achievements ({unlockedAchievements.length}/{achievements.length})</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('earn')}
                            className={`flex-1 py-2.5 rounded-2xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
                                activeTab === 'earn'
                                    ? 'bg-white text-orange-600 shadow-sm border border-slate-200 ring-2 ring-orange-200'
                                    : 'text-slate-500 hover:text-slate-800'
                            }`}
                        >
                            <Sparkles size={16} />
                            <span>How to Level Up</span>
                        </button>
                    </div>

                    {/* Scrollable Content */}
                    <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
                        
                        {/* TAB 1: 100 LEVELS JOURNEY */}
                        {activeTab === 'levels' && (
                            <div className="space-y-4">
                                
                                {/* Quick Navigation Toolbar */}
                                <div className="flex items-center justify-between gap-2 flex-wrap bg-amber-50/70 p-3 rounded-2xl border border-amber-200">
                                    <div className="flex items-center gap-2">
                                        <Compass size={18} className="text-amber-600" />
                                        <span className="text-xs font-black text-amber-900 uppercase tracking-wide">
                                            10 Realms &bull; 100 Levels
                                        </span>
                                    </div>
                                    <button
                                        onClick={scrollToCurrentLevel}
                                        className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl text-xs font-black shadow-xs hover:brightness-105 active:scale-95 transition-all cursor-pointer"
                                    >
                                        <Target size={14} />
                                        <span>Jump to My Level ({level})</span>
                                    </button>
                                </div>

                                {/* Tier Filter Pills */}
                                <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
                                    <button
                                        onClick={() => setSelectedTierId('all')}
                                        className={`px-3 py-1.5 rounded-xl text-xs font-black whitespace-nowrap transition-all ${
                                            selectedTierId === 'all'
                                                ? 'bg-orange-500 text-white shadow-xs'
                                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                        }`}
                                    >
                                        All 100 Levels
                                    </button>
                                    {LEVEL_TIERS.map(tier => (
                                        <button
                                            key={tier.id}
                                            onClick={() => setSelectedTierId(tier.id)}
                                            className={`px-3 py-1.5 rounded-xl text-xs font-black whitespace-nowrap transition-all flex items-center gap-1 ${
                                                selectedTierId === tier.id
                                                    ? 'bg-orange-500 text-white shadow-xs'
                                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                            }`}
                                        >
                                            <span>{tier.icon}</span>
                                            <span>T{tier.id}: {tier.name}</span>
                                        </button>
                                    ))}
                                </div>

                                {/* Level Cards List */}
                                <div className="space-y-3">
                                    {filteredLevels.map((lvlInfo) => {
                                        const isReached = level >= lvlInfo.level;
                                        const isCurrent = level === lvlInfo.level;
                                        const isNext = level + 1 === lvlInfo.level;
                                        const tier = LEVEL_TIERS.find(t => t.id === lvlInfo.tier) || LEVEL_TIERS[0];
                                        const isFactRevealed = revealedFacts[lvlInfo.level];

                                        return (
                                            <div 
                                                key={lvlInfo.level}
                                                ref={isCurrent ? currentLevelCardRef : null}
                                                className={`p-4 sm:p-5 rounded-2xl border-2 transition-all relative overflow-hidden ${
                                                    isCurrent 
                                                        ? 'bg-gradient-to-r from-amber-50 via-yellow-50 to-orange-50 border-amber-400 ring-4 ring-amber-300 shadow-md' 
                                                        : isReached 
                                                        ? 'bg-white border-emerald-200 hover:border-emerald-300 shadow-xs' 
                                                        : isNext
                                                        ? 'bg-white border-dashed border-orange-300 shadow-xs'
                                                        : 'bg-slate-50/80 border-slate-200 opacity-75'
                                                }`}
                                            >
                                                {/* Left Accent Bar */}
                                                <div className={`absolute top-0 left-0 bottom-0 w-2 ${
                                                    isCurrent 
                                                        ? 'bg-gradient-to-b from-amber-400 to-orange-500' 
                                                        : isReached 
                                                        ? 'bg-emerald-400' 
                                                        : 'bg-slate-300'
                                                }`} />

                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pl-2">
                                                    
                                                    {/* Left: Icon, Number, Title, Perk */}
                                                    <div className="flex items-start gap-3.5 flex-1 min-w-0">
                                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 border-2 shadow-xs ${
                                                            isCurrent
                                                                ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-white border-amber-300 ring-2 ring-amber-200'
                                                                : isReached
                                                                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                                                : 'bg-slate-100 text-slate-400 border-slate-200 grayscale'
                                                        }`}>
                                                            {lvlInfo.icon}
                                                        </div>

                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-center gap-2 flex-wrap">
                                                                <span className="text-xs font-black uppercase text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md">
                                                                    Level {lvlInfo.level}
                                                                </span>
                                                                <h4 className="font-black text-slate-900 text-base">
                                                                    {lvlInfo.title}
                                                                </h4>
                                                                <span className="text-xs font-serif text-slate-500" dir="rtl">
                                                                    {lvlInfo.arabicTitle}
                                                                </span>

                                                                {isCurrent && (
                                                                    <span className="text-[10px] font-black uppercase bg-amber-500 text-white px-2.5 py-0.5 rounded-full shadow-xs animate-bounce">
                                                                        Current Level 🎯
                                                                    </span>
                                                                )}
                                                                {isNext && (
                                                                    <span className="text-[10px] font-black uppercase bg-orange-100 text-orange-800 border border-orange-200 px-2 py-0.5 rounded-full">
                                                                        Up Next ⚡
                                                                    </span>
                                                                )}
                                                            </div>

                                                            {/* Perk / Reward Description */}
                                                            <p className="text-xs text-slate-600 font-bold mt-1 flex items-center gap-1.5">
                                                                <GiftIcon />
                                                                <span>{lvlInfo.perk}</span>
                                                            </p>

                                                            {/* Curiosity Fun Fact Preview / Accordion */}
                                                            <div className="mt-2.5">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => toggleFact(lvlInfo.level)}
                                                                    className="text-[11px] font-black text-indigo-600 hover:text-indigo-800 flex items-center gap-1 bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                                                                >
                                                                    <HelpCircle size={13} />
                                                                    <span>
                                                                        {isFactRevealed ? "Hide Secret Curiosity Fact" : "🔍 Secret Islamic Curiosity Fact"}
                                                                    </span>
                                                                </button>
                                                                
                                                                {isFactRevealed && (
                                                                    <motion.div 
                                                                        initial={{ opacity: 0, height: 0 }}
                                                                        animate={{ opacity: 1, height: 'auto' }}
                                                                        exit={{ opacity: 0, height: 0 }}
                                                                        className="mt-2 p-3 bg-gradient-to-r from-indigo-50 to-sky-50 rounded-xl border border-indigo-200 text-xs font-bold text-indigo-950 leading-relaxed shadow-xs"
                                                                    >
                                                                        <span className="text-amber-600 font-black mr-1">✨ Curiosity Trivia:</span>
                                                                        {lvlInfo.funFact}
                                                                    </motion.div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Right: XP Requirement & Status */}
                                                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                                                        <span className="text-xs font-black text-slate-700 block">
                                                            {lvlInfo.requiredXp} XP Req
                                                        </span>
                                                        {isReached ? (
                                                            <span className="text-xs font-extrabold text-emerald-600 flex items-center gap-1 mt-0.5">
                                                                <CheckCircle2 size={15} /> Unlocked
                                                            </span>
                                                        ) : (
                                                            <span className="text-xs font-bold text-slate-400 flex items-center gap-1 mt-0.5">
                                                                <Lock size={13} /> {Math.max(0, lvlInfo.requiredXp - points)} XP Left
                                                            </span>
                                                        )}
                                                    </div>

                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* TAB 2: ACHIEVEMENTS */}
                        {activeTab === 'achievements' && (
                            <div className="space-y-4">
                                {/* Sub Filter */}
                                <div className="flex gap-2">
                                    {(['all', 'unlocked', 'locked'] as const).map((f) => (
                                        <button
                                            key={f}
                                            onClick={() => setFilter(f)}
                                            className={`px-3.5 py-1.5 rounded-full text-xs font-black capitalize transition-all ${
                                                filter === f
                                                    ? 'bg-amber-500 text-white shadow-xs'
                                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                            }`}
                                        >
                                            {f === 'all' ? `All (${achievements.length})` : 
                                             f === 'unlocked' ? `Unlocked (${unlockedAchievements.length})` : 
                                             `Locked (${achievements.length - unlockedAchievements.length})`}
                                        </button>
                                    ))}
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {filteredAchievements.map((ach) => {
                                        const isUnlocked = unlockedAchievements.includes(ach.id);
                                        return (
                                            <div 
                                                key={ach.id}
                                                className={`p-4 rounded-2xl border-2 transition-all flex items-start gap-3.5 ${
                                                    isUnlocked 
                                                        ? 'bg-amber-50/70 border-amber-300 shadow-sm' 
                                                        : 'bg-slate-50 border-slate-200 opacity-70'
                                                }`}
                                            >
                                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-xs border ${
                                                    isUnlocked 
                                                        ? 'bg-gradient-to-br from-amber-300 to-yellow-400 border-amber-300' 
                                                        : 'bg-slate-200 border-slate-300 grayscale'
                                                }`}>
                                                    {ach.icon || '🏅'}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-1.5">
                                                        <h4 className="font-black text-slate-800 text-sm truncate">{ach.title}</h4>
                                                        {isUnlocked ? (
                                                            <CheckCircle2 size={15} className="text-emerald-500 shrink-0" />
                                                        ) : (
                                                            <Lock size={13} className="text-slate-400 shrink-0" />
                                                        )}
                                                    </div>
                                                    <p className="text-xs text-slate-500 font-medium leading-relaxed mt-0.5">
                                                        {ach.description}
                                                    </p>
                                                    <span className={`inline-block text-[10px] font-black uppercase tracking-wider mt-1.5 px-2 py-0.5 rounded-md ${
                                                        isUnlocked ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                                                    }`}>
                                                        {isUnlocked ? 'Completed' : 'Locked'}
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* TAB 3: HOW TO LEVEL UP */}
                        {activeTab === 'earn' && (
                            <div className="space-y-3.5">
                                <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-2xl border border-amber-200">
                                    <h4 className="font-black text-amber-950 text-sm mb-1 flex items-center gap-1.5">
                                        <Sparkles size={16} className="text-amber-500" />
                                        <span>Curiosity &amp; 100 Levels Mastery</span>
                                    </h4>
                                    <p className="text-xs text-amber-800 font-bold leading-relaxed">
                                        Every single Surah you read, Dhikr you whisper, and quiz question you solve grants you sacred XP. Conquering all 100 levels unlocks the grand Celestial Sultan of Jannah crown!
                                    </p>
                                </div>

                                <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-200 flex items-center gap-3.5">
                                    <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                                        <BookOpen size={24} />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-black text-emerald-950 text-sm">Read & Recite Quran</h4>
                                        <p className="text-xs text-emerald-800 font-medium mt-0.5">Explore Surahs and listen to verses</p>
                                    </div>
                                    <span className="font-black text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-xl text-sm shrink-0">
                                        +10 XP
                                    </span>
                                </div>

                                <div className="p-4 rounded-2xl bg-rose-50 border-2 border-rose-200 flex items-center gap-3.5">
                                    <div className="w-12 h-12 rounded-2xl bg-rose-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                                        <Heart size={24} />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-black text-rose-950 text-sm">Daily Dhikr & Tasbeeh</h4>
                                        <p className="text-xs text-rose-800 font-medium mt-0.5">Complete 10 counts of remembrance</p>
                                    </div>
                                    <span className="font-black text-rose-700 bg-rose-100 px-3 py-1.5 rounded-xl text-sm shrink-0">
                                        +10 XP
                                    </span>
                                </div>

                                <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-200 flex items-center gap-3.5">
                                    <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                                        <Star size={24} />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-black text-amber-950 text-sm">Discover Prophetic Hadith</h4>
                                        <p className="text-xs text-amber-800 font-medium mt-0.5">Explore wisdom topics from Sunnah</p>
                                    </div>
                                    <span className="font-black text-amber-700 bg-amber-100 px-3 py-1.5 rounded-xl text-sm shrink-0">
                                        +15 XP
                                    </span>
                                </div>

                                <div className="p-4 rounded-2xl bg-indigo-50 border-2 border-indigo-200 flex items-center gap-3.5">
                                    <div className="w-12 h-12 rounded-2xl bg-indigo-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                                        <Award size={24} />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-black text-indigo-950 text-sm">Quizzes & Learning Modules</h4>
                                        <p className="text-xs text-indigo-800 font-medium mt-0.5">Test your Islamic knowledge</p>
                                    </div>
                                    <span className="font-black text-indigo-700 bg-indigo-100 px-3 py-1.5 rounded-xl text-sm shrink-0">
                                        +20-50 XP
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

const GiftIcon = () => (
    <span className="text-orange-500 text-xs">🎁</span>
);

export default LevelsAndAchievementsModal;
