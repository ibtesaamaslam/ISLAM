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
                    initial={{ opacity: 0, y: 50, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.8 }}
                    className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-sm"
                >
                    <div className="bg-white rounded-2xl shadow-2xl border-2 border-amber-200 p-4 flex items-center gap-4 relative overflow-hidden">
                        {/* Background Shine */}
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent translate-x-[-100%] animate-shimmer" />
                        
                        <div className="bg-amber-100 w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-inner flex-shrink-0">
                            {notification.icon}
                        </div>
                        
                        <div className="flex-1">
                            <h4 className="text-xs font-bold text-amber-500 uppercase tracking-wider mb-0.5">Achievement Unlocked!</h4>
                            <h3 className="text-lg font-bold text-slate-800 leading-tight">{notification.title}</h3>
                            <p className="text-xs text-slate-500 mt-1">{notification.description}</p>
                        </div>

                        <button 
                            onClick={clearNotification}
                            className="text-slate-400 hover:text-slate-600 p-1"
                        >
                            <X size={16} />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AchievementToast;
