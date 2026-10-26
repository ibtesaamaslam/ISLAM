import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
    Trophy, Star, Flame, Sparkles, BookOpen, Heart, 
    CheckCircle2, Lock, ArrowLeft, Filter, Search, 
    Share2, Award, Zap, Shield, Compass, ChevronRight,
    RotateCcw, Eye
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useGamification } from '../../contexts/GamificationContext';
import { generate100PlusBadges, GalleryBadge } from '../../data/badgesCatalog';
import { getLevelInfo, getTierForLevel } from '../../data/levelsData';

export default function AchievementGallery() {
    const { points, level, streak, unlockedAchievements } = useGamification();
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedBadge, setSelectedBadge] = useState<GalleryBadge | null>(null);
    const [animatingBadgeId, setAnimatingBadgeId] = useState<string | null>(null);

    const levelInfo = getLevelInfo(level);
    const tier = getTierForLevel(level);

    // Initial celebratory explosion of confetti when user views their badges
    useEffect(() => {
        let isCancelled = false;
        (async () => {
            try {
                const confetti = (await import('canvas-confetti')).default;
                if (isCancelled) return;
                
                confetti({
                    particleCount: 55,
                    spread: 80,
                    origin: { y: 0.6, x: 0.5 },
                    colors: ['#f59e0b', '#fbbf24', '#10b981', '#3b82f6', '#ec4899', '#8b5cf6']
                });
            } catch (e) {
                console.warn('Confetti error in gallery:', e);
            }
        })();

        return () => {
            isCancelled = true;
        };
    }, []);

    // 100+ Curated challenging badges covering Streaks, Quran levels, Zikr, Duas, and Knowledge
    const galleryBadges = useMemo(() => {
        return generate100PlusBadges(streak, level, points);
    }, [streak, level, points]);

    // Check unlocked state based on storage or progress
    const enrichedBadges = useMemo(() => {
        return galleryBadges.map(badge => {
            const isManuallyUnlocked = unlockedAchievements.includes(badge.id);
            const isProgressCompleted = badge.progressTarget !== undefined && 
                                        badge.progressCurrent !== undefined && 
                                        badge.progressCurrent >= badge.progressTarget;
            return {
                ...badge,
                unlocked: isManuallyUnlocked || isProgressCompleted
            };
        });
    }, [galleryBadges, unlockedAchievements]);

    // Filters
    const filteredBadges = useMemo(() => {
        return enrichedBadges.filter(badge => {
            const matchesCategory = selectedCategory === 'all' || badge.category === selectedCategory;
            if (!matchesCategory) return false;

            if (!searchQuery.trim()) return true;
            const q = searchQuery.toLowerCase();
            return badge.title.toLowerCase().includes(q) || 
                   badge.description.toLowerCase().includes(q) ||
                   (badge.quote && badge.quote.toLowerCase().includes(q));
        });
    }, [enrichedBadges, selectedCategory, searchQuery]);

    const totalBadges = enrichedBadges.length;
    const unlockedCount = enrichedBadges.filter(b => b.unlocked).length;
    const progressPercentage = Math.round((unlockedCount / totalBadges) * 100);

    // Trigger celebration & explosion of confetti when inspecting/celebrating a badge
    const inspectAndCelebrateBadge = async (badge: GalleryBadge) => {
        setSelectedBadge(badge);
        setAnimatingBadgeId(badge.id);

        try {
            const confetti = (await import('canvas-confetti')).default;
            confetti({
                particleCount: badge.unlocked ? 50 : 25,
                spread: 70,
                origin: { y: 0.65, x: 0.5 },
                colors: ['#f59e0b', '#10b981', '#6366f1', '#ec4899', '#f97316']
            });
        } catch {}

        setTimeout(() => setAnimatingBadgeId(null), 1200);
    };

    const categories = [
        { id: 'all', label: 'All Badges', icon: '🏆' },
        { id: 'streaks', label: 'Daily Streaks', icon: '🔥' },
        { id: 'quran', label: 'Quran Quest', icon: '📖' },
        { id: 'dhikr', label: 'Zikr & Tasbeeh', icon: '📿' },
        { id: 'duas', label: 'Daily Duas', icon: '🤲' },
        { id: 'knowledge', label: 'Discover Islam', icon: '🌟' },
        { id: 'milestones', label: 'Milestones', icon: '👑' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-amber-50/70 via-slate-50 to-emerald-50/50 pb-36 pt-6 px-3 sm:px-6 lg:px-8 font-sans selection:bg-amber-200 selection:text-amber-950">
            <div className="w-full max-w-[96rem] mx-auto">
                {/* Top Navigation & Breadcrumb */}
                <div className="flex items-center justify-between mb-6">
                    <Link 
                        to="/"
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white rounded-xl border border-slate-200 text-xs font-black text-slate-700 hover:text-amber-600 hover:border-amber-300 shadow-2xs transition-all"
                    >
                        <ArrowLeft size={16} />
                        <span>Back to Home</span>
                    </Link>

                    <div className="flex items-center gap-2">
                        <span className="text-[11px] font-black uppercase tracking-wider bg-amber-100 text-amber-900 px-3 py-1 rounded-full border border-amber-300">
                            Lvl {level}: {levelInfo.title}
                        </span>
                        <div className="flex items-center gap-1 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-2xs text-xs font-black text-slate-800">
                            <Star size={15} className="text-amber-400 fill-amber-400" />
                            <span>{points} XP</span>
                        </div>
                    </div>
                </div>

                {/* Hero Header */}
                <div className="relative overflow-hidden bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-8">
                    {/* Ambient Glow */}
                    <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative z-10 max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-yellow-200 text-xs font-black uppercase tracking-wider mb-2">
                            <Sparkles size={14} />
                            <span>Spiritual Honors & Badges</span>
                        </div>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight drop-shadow-sm">
                            Achievement Gallery
                        </h1>
                        <p className="mt-2 text-sm sm:text-base text-yellow-100 font-medium leading-relaxed max-w-2xl">
                            Celebrate every step of your sacred journey! Earn challenging badges by maintaining daily streaks, turning beads in Zikr, reciting the Quran, and discovering authentic Islamic wisdom.
                        </p>
                    </div>

                    {/* Progress Showcase Banner */}
                    <div className="mt-6 pt-5 border-t border-white/20 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3.5 border border-white/15">
                            <span className="text-[11px] font-bold text-yellow-200 block uppercase">Badges Unlocked</span>
                            <span className="text-2xl sm:text-3xl font-black text-white mt-0.5 block">
                                {unlockedCount} <span className="text-sm font-semibold text-white/70">/ {totalBadges}</span>
                            </span>
                            <div className="w-full h-2 bg-white/20 rounded-full mt-2 overflow-hidden">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progressPercentage}%` }}
                                    transition={{ duration: 0.8 }}
                                    className="h-full bg-yellow-300 rounded-full"
                                />
                            </div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3.5 border border-white/15">
                            <span className="text-[11px] font-bold text-yellow-200 block uppercase">Daily Streak</span>
                            <span className="text-2xl sm:text-3xl font-black text-white mt-0.5 flex items-center gap-1.5">
                                <Flame size={22} className="text-orange-300 fill-orange-300" />
                                {streak} Days
                            </span>
                            <span className="text-[10px] text-white/80 font-medium mt-1 block">
                                Unbroken habit
                            </span>
                        </div>

                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3.5 border border-white/15">
                            <span className="text-[11px] font-bold text-yellow-200 block uppercase">Spiritual Rank</span>
                            <span className="text-lg sm:text-xl font-black text-white mt-0.5 block truncate">
                                {tier.name}
                            </span>
                            <span className="text-[10px] text-white/80 font-medium mt-1 block">
                                Level {level} of 100
                            </span>
                        </div>

                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3.5 border border-white/15">
                            <span className="text-[11px] font-bold text-yellow-200 block uppercase">Next Unlock</span>
                            <span className="text-base sm:text-lg font-black text-yellow-200 mt-0.5 block truncate">
                                {enrichedBadges.find(b => !b.unlocked)?.title || 'All Conquered! 🏆'}
                            </span>
                            <span className="text-[10px] text-white/80 font-medium mt-1 block">
                                Keep making progress daily
                            </span>
                        </div>
                    </div>
                </div>

                {/* Search & Category Filter Bar */}
                <div className="mb-8 space-y-4">
                    {/* Search Bar - Clean, no 100+ */}
                    <div className="relative max-w-xl mx-auto">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search badges by title, description, or deed..."
                            className="w-full pl-11 pr-10 py-3 bg-white rounded-2xl border-2 border-slate-200 shadow-2xs font-bold text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-amber-400 text-sm transition-all"
                        />
                        {searchQuery && (
                            <button
                                type="button"
                                onClick={() => setSearchQuery('')}
                                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 bg-slate-100 px-2 py-1 rounded-md"
                            >
                                Clear
                            </button>
                        )}
                    </div>

                    {/* Category Tabs - WRAPS CLEANLY WITHOUT HORIZONTAL SCROLLBAR (LIKE HADITH MODULE) */}
                    <div className="flex flex-wrap justify-center gap-2.5 max-w-5xl mx-auto">
                        {categories.map(cat => {
                            const isSelected = selectedCategory === cat.id;
                            const count = cat.id === 'all' 
                                ? enrichedBadges.length 
                                : enrichedBadges.filter(b => b.category === cat.id).length;

                            return (
                                <button
                                    key={cat.id}
                                    type="button"
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={`flex items-center gap-1.5 px-4 py-2 rounded-2xl font-bold text-xs sm:text-sm transition-all border shrink-0 cursor-pointer shadow-xs ${
                                        isSelected
                                            ? 'bg-amber-600 text-white border-amber-600 shadow-md ring-2 ring-amber-300'
                                            : 'bg-white text-slate-700 hover:bg-amber-50/50 border-slate-200'
                                    }`}
                                >
                                    <span>{cat.icon}</span>
                                    <span>{cat.label}</span>
                                    <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-full ml-0.5 ${
                                        isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                                    }`}>
                                        {count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Badges Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
                    <AnimatePresence>
                        {filteredBadges.map((badge, idx) => {
                            const isAnimating = animatingBadgeId === badge.id;
                            return (
                                <motion.div
                                    key={badge.id}
                                    layout
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.2, delay: idx * 0.015 }}
                                    whileHover={{ y: -4, scale: 1.02 }}
                                    onClick={() => inspectAndCelebrateBadge(badge)}
                                    className={`relative p-5 rounded-3xl border-2 transition-all cursor-pointer flex flex-col justify-between overflow-hidden shadow-xs ${
                                        badge.unlocked
                                            ? 'bg-gradient-to-b from-white via-amber-50/30 to-yellow-50/40 border-amber-300 shadow-sm hover:border-amber-400 hover:shadow-md'
                                            : 'bg-white/70 border-slate-200/80 opacity-75 hover:opacity-100 hover:border-slate-300'
                                    }`}
                                >
                                    {/* Unlocked Radiant Aura */}
                                    {badge.unlocked && (
                                        <div className="absolute top-0 right-0 w-24 h-24 bg-amber-400/10 rounded-full blur-xl pointer-events-none" />
                                    )}

                                    <div>
                                        <div className="flex items-start justify-between gap-2 mb-3">
                                            {/* Icon with unlock bounce */}
                                            <motion.div 
                                                animate={isAnimating ? { rotate: [0, -15, 15, -10, 10, 0], scale: [1, 1.25, 1] } : {}}
                                                transition={{ duration: 0.6 }}
                                                className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-sm border-2 ${
                                                    badge.unlocked
                                                        ? 'bg-gradient-to-tr from-amber-100 to-yellow-200 border-amber-300'
                                                        : 'bg-slate-100 border-slate-200 text-slate-400 grayscale'
                                                }`}
                                            >
                                                {badge.icon}
                                            </motion.div>

                                            <div className="text-right">
                                                {badge.unlocked ? (
                                                    <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                                                        <CheckCircle2 size={12} />
                                                        Unlocked
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                                                        <Lock size={11} />
                                                        Locked
                                                    </span>
                                                )}
                                                <div className="text-[11px] font-black text-amber-600 mt-1">
                                                    +{badge.xpReward} XP
                                                </div>
                                            </div>
                                        </div>

                                        <h3 className="font-black text-slate-800 text-base leading-tight mb-1">
                                            {badge.title}
                                        </h3>
                                        <p className="text-xs text-slate-600 font-medium leading-relaxed line-clamp-2">
                                            {badge.description}
                                        </p>
                                    </div>

                                    {/* Progress Track */}
                                    <div className="mt-4 pt-3 border-t border-slate-100">
                                        {badge.progressTarget !== undefined && badge.progressCurrent !== undefined ? (
                                            <div>
                                                <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-1">
                                                    <span>Progress</span>
                                                    <span>
                                                        {Math.min(badge.progressCurrent, badge.progressTarget)} / {badge.progressTarget}
                                                    </span>
                                                </div>
                                                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                    <div 
                                                        className={`h-full rounded-full transition-all duration-500 ${
                                                            badge.unlocked ? 'bg-emerald-500' : 'bg-amber-400'
                                                        }`}
                                                        style={{ 
                                                            width: `${Math.min(100, Math.round((badge.progressCurrent / badge.progressTarget) * 100))}%` 
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-between text-[11px] text-amber-700 font-bold">
                                                <span>Honor Badge</span>
                                                <Sparkles size={13} className="text-amber-500" />
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>

                {/* Empty State */}
                {filteredBadges.length === 0 && (
                    <div className="text-center py-16 bg-white rounded-3xl border-2 border-dashed border-slate-200 mt-6">
                        <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto text-2xl mb-3">
                            🔍
                        </div>
                        <h3 className="font-black text-lg text-slate-800 mb-1">No badges found</h3>
                        <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
                            Try searching for something else or switch to another category tab.
                        </p>
                        <button
                            type="button"
                            onClick={() => {
                                setSelectedCategory('all');
                                setSearchQuery('');
                            }}
                            className="px-4 py-2 bg-amber-500 text-white rounded-xl text-xs font-black hover:bg-amber-600 transition-all cursor-pointer"
                        >
                            Reset Filters
                        </button>
                    </div>
                )}

                {/* Badge Detail Modal with Celebration */}
                <AnimatePresence>
                    {selectedBadge && (
                        <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedBadge(null)}
                                className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm"
                            />

                            <motion.div
                                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                                className="relative z-10 w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 text-center shadow-2xl border-4 border-amber-300 overflow-hidden"
                            >
                                <button
                                    onClick={() => setSelectedBadge(null)}
                                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-sm cursor-pointer"
                                >
                                    ✕
                                </button>

                                <motion.div
                                    animate={{ scale: [0.8, 1.1, 1], rotate: [0, -10, 10, 0] }}
                                    transition={{ duration: 0.5 }}
                                    className={`w-24 h-24 rounded-3xl mx-auto flex items-center justify-center text-5xl shadow-md border-4 mb-4 ${
                                        selectedBadge.unlocked
                                            ? 'bg-gradient-to-tr from-amber-100 to-yellow-100 border-amber-400'
                                            : 'bg-slate-100 border-slate-300 grayscale'
                                    }`}
                                >
                                    {selectedBadge.icon}
                                </motion.div>

                                <span className="text-[10px] font-black uppercase tracking-wider text-amber-900 bg-amber-100 px-3 py-1 rounded-full border border-amber-200">
                                    {selectedBadge.category} &bull; +{selectedBadge.xpReward} XP Reward
                                </span>

                                <h3 className="text-2xl font-black text-slate-900 mt-2 mb-1">
                                    {selectedBadge.title}
                                </h3>

                                <p className="text-sm text-slate-600 font-medium leading-relaxed mb-4">
                                    {selectedBadge.description}
                                </p>

                                {selectedBadge.quote && (
                                    <div className="bg-amber-50/80 p-3.5 rounded-2xl border border-amber-200 text-xs text-amber-950 italic leading-relaxed mb-5">
                                        "{selectedBadge.quote}"
                                    </div>
                                )}

                                <div className="flex items-center justify-center gap-3">
                                    {selectedBadge.unlocked ? (
                                        <button
                                            type="button"
                                            onClick={() => inspectAndCelebrateBadge(selectedBadge)}
                                            className="py-2.5 px-6 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-xs rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                                        >
                                            <Sparkles size={16} />
                                            <span>Celebrate Unlocking! 🎉</span>
                                        </button>
                                    ) : (
                                        <div className="text-xs font-bold text-slate-500">
                                            🔒 Complete daily requirements to unlock this honor!
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
