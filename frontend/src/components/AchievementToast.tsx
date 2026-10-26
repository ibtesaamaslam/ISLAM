import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useGamification } from '../contexts/GamificationContext';
import { Trophy, Sparkles, X, Star } from 'lucide-react';

export const AchievementToast: React.FC = () => {
    const { notification, clearNotification } = useGamification();

    // Trigger celebratory confetti explosion whenever an achievement or level up notification appears
    useEffect(() => {
        if (!notification) return;

        let isCancelled = false;
        (async () => {
            try {
                const confetti = (await import('canvas-confetti')).default;
                if (isCancelled) return;
                
                // Double burst
                confetti({
                    particleCount: 45,
                    spread: 70,
                    origin: { y: 0.75, x: 0.5 },
                    colors: ['#fbbf24', '#f59e0b', '#10b981', '#38bdf8', '#a855f7']
                });
            } catch (e) {
                console.warn('Confetti error in AchievementToast:', e);
            }
        })();

        return () => {
            isCancelled = true;
        };
    }, [notification]);

    return (
        <AnimatePresence>
            {notification && (
                <motion.div
                    initial={{ opacity: 0, y: 80, scale: 0.7, rotate: -4 }}
                    animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, y: 60, scale: 0.8, rotate: 4 }}
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    className="fixed bottom-28 left-1/2 -translate-x-1/2 z-[100] w-[92%] max-w-md pointer-events-auto"
                >
                    <div className="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 p-1 rounded-[2.2rem] shadow-[0_20px_50px_rgba(245,158,11,0.45)]">
                        <div className="bg-slate-900 rounded-[2rem] p-4 sm:p-5 flex items-center gap-4 text-white relative overflow-hidden">
                            {/* Ambient Glow */}
                            <div className="absolute top-0 right-0 w-36 h-36 bg-amber-400/25 rounded-full blur-2xl pointer-events-none" />

                            {/* Badge Icon */}
                            <motion.div 
                                initial={{ scale: 0, rotate: -30 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: "spring", bounce: 0.6 }}
                                className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-300 text-slate-950 flex items-center justify-center text-4xl shadow-xl shrink-0 border-2 border-white"
                            >
                                {notification.icon || '🏆'}
                            </motion.div>
                            
                            <div className="flex-1 min-w-0 z-10">
                                <div className="flex items-center gap-1.5 mb-1">
                                    <span className="text-[10px] font-black text-slate-950 uppercase tracking-wider bg-amber-400 px-2 py-0.5 rounded-md flex items-center gap-1">
                                        <Sparkles size={11} /> Milestone Unlocked!
                                    </span>
                                </div>
                                <h3 className="text-base sm:text-lg font-black text-white leading-tight truncate">
                                    {notification.title}
                                </h3>
                                <p className="text-xs font-semibold text-yellow-100/90 leading-snug line-clamp-2 mt-0.5">
                                    {notification.description}
                                </p>
                            </div>

                            <button 
                                onClick={clearNotification}
                                className="text-slate-400 hover:text-white p-1.5 hover:bg-white/10 rounded-xl transition-all cursor-pointer shrink-0"
                                title="Dismiss"
                            >
                                <X size={18} strokeWidth={2.5} />
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AchievementToast;
