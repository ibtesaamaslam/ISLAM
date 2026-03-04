import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useGamification } from '../contexts/GamificationContext';
import { Trophy, X } from 'lucide-react';

const AchievementToast = () => {
    const { notification, clearNotification } = useGamification();

    return (
        <AnimatePresence>
            {notification && (
                <motion.div
                    initial={{ opacity: 0, y: 100, scale: 0.5, rotate: -10 }}
                    animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, y: 50, scale: 0.8, rotate: 10 }}
                    className="fixed bottom-28 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-sm"
                >
                    <div className="bg-white rounded-[2rem] shadow-2xl border-4 border-yellow-400 p-4 flex items-center gap-4 relative overflow-hidden">
                        {/* Background Shine */}
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-yellow-100/50 to-transparent translate-x-[-100%] animate-shimmer pointer-events-none" />
                        
                        <div className="bg-yellow-100 w-16 h-16 rounded-2xl flex items-center justify-center text-4xl shadow-inner flex-shrink-0 border-2 border-yellow-200 transform rotate-3">
                            {notification.icon}
                        </div>
                        
                        <div className="flex-1 z-10">
                            <h4 className="text-[10px] font-black text-yellow-500 uppercase tracking-widest mb-1 bg-yellow-50 px-2 py-0.5 rounded-full inline-block border border-yellow-100">Achievement Unlocked! 🏆</h4>
                            <h3 className="text-lg font-black text-slate-800 leading-tight mb-1">{notification.title}</h3>
                            <p className="text-xs font-bold text-slate-500 leading-snug">{notification.description}</p>
                        </div>

                        <button 
                            onClick={clearNotification}
                            className="text-slate-300 hover:text-slate-500 p-2 hover:bg-slate-50 rounded-full transition-colors"
                        >
                            <X size={20} strokeWidth={3} />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AchievementToast;
