import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, Sparkles, CheckCircle2, Calendar, Award, Trophy, ChevronRight, Zap } from 'lucide-react';
import { useGamification } from '../contexts/GamificationContext';

interface DayStatus {
    dayLabel: string;
    dateStr: string;
    isPast: boolean;
    isToday: boolean;
    isCompleted: boolean;
}

export const DailyStreakWidget: React.FC = () => {
    const { addPoints } = useGamification();
    const [streak, setStreak] = useState<number>(1);
    const [isCheckedInToday, setIsCheckedInToday] = useState<boolean>(false);
    const [showRewardModal, setShowRewardModal] = useState<boolean>(false);
    const [rewardBonus, setRewardBonus] = useState<number>(25);
    const [recentDays, setRecentDays] = useState<DayStatus[]>([]);

    const getTodayDateStr = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const getYesterdayDateStr = () => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const year = yesterday.getFullYear();
        const month = String(yesterday.getMonth() + 1).padStart(2, '0');
        const day = String(yesterday.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // Calculate and synchronize daily streak
    useEffect(() => {
        try {
            const todayStr = getTodayDateStr();
            const yesterdayStr = getYesterdayDateStr();

            // Read streak count from both possible keys
            const appStreak = localStorage.getItem('app_daily_streak');
            const tasbeehStreak = localStorage.getItem('tasbeeh_streak');
            const lastActiveDate = localStorage.getItem('app_last_active_date') || localStorage.getItem('tasbeeh_last_completed_date');

            let currentStreak = 1;
            if (appStreak) {
                currentStreak = parseInt(appStreak, 10) || 1;
            } else if (tasbeehStreak) {
                currentStreak = parseInt(tasbeehStreak, 10) || 1;
            }

            if (lastActiveDate === todayStr) {
                setIsCheckedInToday(true);
                setStreak(currentStreak);
            } else if (lastActiveDate === yesterdayStr) {
                // Streak is maintained from yesterday, not yet claimed today
                setIsCheckedInToday(false);
                setStreak(currentStreak);
            } else if (!lastActiveDate) {
                // Brand new user
                setIsCheckedInToday(false);
                setStreak(1);
            } else {
                // Missed more than 1 day -> reset streak to 1
                setIsCheckedInToday(false);
                setStreak(1);
                localStorage.setItem('app_daily_streak', '1');
            }

            // Build 7-day track: past 3 days, today, next 3 days (or 7 days of this week)
            const days: DayStatus[] = [];
            const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            const todayObj = new Date();

            for (let i = -3; i <= 3; i++) {
                const d = new Date();
                d.setDate(todayObj.getDate() + i);
                const dStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
                const isToday = i === 0;
                const isPast = i < 0;
                // Check if user was recorded active on that date
                const wasActive = isPast ? (currentStreak > Math.abs(i)) : (isToday && lastActiveDate === todayStr);

                days.push({
                    dayLabel: dayNames[d.getDay()],
                    dateStr: dStr,
                    isPast,
                    isToday,
                    isCompleted: wasActive
                });
            }
            setRecentDays(days);
        } catch {
            // fallback gracefully
        }
    }, []);

    const handleClaimDailyCheckIn = () => {
        if (isCheckedInToday) return;

        const todayStr = getTodayDateStr();
        const yesterdayStr = getYesterdayDateStr();
        const lastActiveDate = localStorage.getItem('app_last_active_date');

        let newStreak = streak;
        if (lastActiveDate === yesterdayStr) {
            newStreak = streak + 1;
        } else {
            newStreak = Math.max(1, streak);
        }

        const bonusXp = 25 + (newStreak > 5 ? 25 : 0);
        setRewardBonus(bonusXp);
        setStreak(newStreak);
        setIsCheckedInToday(true);
        addPoints(bonusXp);

        try {
            localStorage.setItem('app_daily_streak', newStreak.toString());
            localStorage.setItem('tasbeeh_streak', newStreak.toString());
            localStorage.setItem('app_last_active_date', todayStr);
            localStorage.setItem('tasbeeh_last_completed_date', todayStr);
        } catch {}

        // Update 7-day track
        setRecentDays(prev => prev.map(d => d.isToday ? { ...d, isCompleted: true } : d));

        setShowRewardModal(true);
    };

    const getStreakTitle = (num: number) => {
        if (num >= 30) return '🏆 Champion of Istiqamah';
        if (num >= 14) return '✨ Beacon of Noor';
        if (num >= 7) return '🌟 1-Week Iman Master';
        if (num >= 3) return '⚡ Steadfast Believer';
        return '🌱 Seed of Dedication';
    };

    return (
        <div className="relative mb-8 w-full">
            {/* Card Container */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500 via-orange-500 to-rose-600 p-6 sm:p-7 text-white shadow-xl border-4 border-yellow-300"
            >
                {/* Background decorative circles & sparkles */}
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-56 h-56 bg-yellow-300/20 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-56 h-56 bg-rose-400/20 rounded-full blur-2xl pointer-events-none" />

                <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
                    {/* Left: Flame & Big Streak Counter */}
                    <div className="flex items-center gap-5 w-full lg:w-auto">
                        <div className="relative shrink-0">
                            {/* Animated glowing back ring */}
                            <motion.div 
                                animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.9, 0.6] }}
                                transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                                className="absolute inset-0 bg-yellow-300 rounded-2xl blur-md"
                            />
                            <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-tr from-amber-400 to-yellow-300 rounded-2xl flex items-center justify-center shadow-lg border-4 border-white">
                                <motion.div
                                    animate={{ 
                                        rotate: [-3, 3, -3],
                                        scale: [1, 1.08, 1]
                                    }}
                                    transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
                                >
                                    <Flame size={48} className="text-orange-600 fill-orange-500 filter drop-shadow-md" />
                                </motion.div>
                                <Sparkles size={20} className="absolute -top-2 -right-2 text-white animate-spin duration-[4000ms]" fill="currentColor" />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className="bg-yellow-300 text-amber-950 font-black text-xs uppercase px-3 py-1 rounded-full shadow-xs tracking-wider">
                                    Daily Streak
                                </span>
                                <span className="text-xs font-bold text-yellow-100 flex items-center gap-1">
                                    <Calendar size={13} /> Consistent Learning
                                </span>
                            </div>

                            <div className="flex items-baseline gap-2 mt-1">
                                <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white drop-shadow-sm">
                                    {streak} <span className="text-2xl sm:text-3xl font-extrabold text-yellow-200">Day{streak !== 1 ? 's' : ''}</span>
                                </h2>
                                <span className="text-sm font-black text-yellow-200 bg-white/20 px-2.5 py-0.5 rounded-lg border border-white/30">
                                    Streak 🔥
                                </span>
                            </div>

                            <p className="text-xs sm:text-sm font-bold text-yellow-100 mt-1">
                                {getStreakTitle(streak)} &bull; {isCheckedInToday ? 'Today is recorded! Keep it up tomorrow!' : 'Engage today to grow your streak!'}
                            </p>
                        </div>
                    </div>

                    {/* Middle: 7-Day Visual Progress Track */}
                    <div className="w-full lg:w-auto bg-black/15 backdrop-blur-sm p-3.5 rounded-2xl border border-white/25">
                        <div className="text-[11px] font-black uppercase text-yellow-200 mb-2 flex items-center justify-between">
                            <span>This Week's Activity Track</span>
                            <span className="text-white/80">{isCheckedInToday ? '✅ Active Today' : '⚡ Pending Check-in'}</span>
                        </div>
                        <div className="grid grid-cols-7 gap-2">
                            {recentDays.map((day, idx) => (
                                <div 
                                    key={idx} 
                                    className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all ${
                                        day.isToday 
                                            ? 'bg-yellow-300 text-amber-950 ring-2 ring-white shadow-md font-black scale-105' 
                                            : day.isCompleted 
                                                ? 'bg-white/25 text-white font-bold' 
                                                : 'bg-white/10 text-white/50 font-medium'
                                    }`}
                                >
                                    <span className="text-[10px] uppercase font-black">{day.dayLabel}</span>
                                    <div className="mt-1">
                                        {day.isCompleted ? (
                                            <CheckCircle2 size={16} className={day.isToday ? "text-amber-900" : "text-yellow-300"} />
                                        ) : day.isToday ? (
                                            <Flame size={16} className="text-orange-600 fill-orange-500 animate-pulse" />
                                        ) : (
                                            <div className="w-3.5 h-3.5 rounded-full border-2 border-white/30" />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Check-in / Claim Action Button */}
                    <div className="shrink-0 w-full sm:w-auto text-center sm:text-right">
                        {isCheckedInToday ? (
                            <div className="inline-flex items-center gap-2 px-5 py-3 bg-emerald-500 text-white font-black rounded-2xl shadow-lg border-2 border-white/40">
                                <CheckCircle2 size={20} />
                                <span>Checked In For Today!</span>
                            </div>
                        ) : (
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleClaimDailyCheckIn}
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-yellow-300 hover:bg-yellow-200 text-amber-950 font-black text-sm sm:text-base rounded-2xl shadow-[0_5px_0_#b45309] hover:shadow-[0_6px_0_#b45309] transition-all cursor-pointer border-2 border-white active:translate-y-1 active:shadow-none"
                            >
                                <Zap size={20} className="text-orange-600 fill-orange-500" />
                                <span>Claim Daily Streak (+25 XP)</span>
                            </motion.button>
                        )}
                        <p className="text-[11px] font-bold text-yellow-100 mt-2 italic max-w-xs sm:ml-auto">
                            "The most beloved deeds to Allah are those most consistent, even if small."
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Streak Celebration Popup Modal */}
            <AnimatePresence>
                {showRewardModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowRewardModal(false)}
                            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
                        />
                        <motion.div 
                            initial={{ scale: 0.8, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.8, opacity: 0, y: 20 }}
                            className="relative z-10 w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 text-center shadow-2xl border-4 border-yellow-300"
                        >
                            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-tr from-amber-400 to-yellow-300 rounded-3xl flex items-center justify-center shadow-lg border-4 border-yellow-100">
                                <Flame size={44} className="text-orange-600 fill-orange-500 animate-bounce" />
                            </div>

                            <span className="bg-amber-100 text-amber-900 text-xs font-black uppercase px-3 py-1 rounded-full tracking-wider">
                                Day {streak} Streak Unlocked!
                            </span>

                            <h3 className="text-2xl sm:text-3xl font-black text-slate-800 mt-2">
                                Alhamdulillah! 🔥
                            </h3>

                            <p className="text-sm font-bold text-slate-600 mt-2">
                                You kept your daily commitment alive! Consistency in learning and remembrance brings abundant blessings into your life.
                            </p>

                            <div className="my-5 p-4 bg-amber-50 rounded-2xl border-2 border-amber-200 flex items-center justify-center gap-3">
                                <Sparkles className="text-amber-500 fill-amber-500" size={24} />
                                <span className="text-xl font-black text-amber-900">
                                    +{rewardBonus} Bonus Quest XP!
                                </span>
                            </div>

                            <button
                                onClick={() => setShowRewardModal(false)}
                                className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black rounded-2xl shadow-[0_4px_0_#c2410c] active:translate-y-1 active:shadow-none transition-all cursor-pointer"
                            >
                                Continue Adventure
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default DailyStreakWidget;
