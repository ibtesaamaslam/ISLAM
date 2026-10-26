import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, MessageCircle, Home, Star, Trophy, Heart, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { useGamification } from '../contexts/GamificationContext';
import LevelsAndAchievementsModal from './LevelsAndAchievementsModal';

const Navbar = () => {
    const location = useLocation();
    const { points, level } = useGamification();
    const [isLevelsModalOpen, setIsLevelsModalOpen] = useState(false);

    interface NavConfig {
        to: string;
        icon: any;
        label: string;
        activeBg: string;
        activeBorder: string;
        shadowColor: string;
    }

    const navItems: NavConfig[] = [
        { to: '/', icon: Home, label: 'Home', activeBg: 'bg-indigo-600', activeBorder: 'border-indigo-700', shadowColor: 'shadow-indigo-300/60' },
        { to: '/quran', icon: BookOpen, label: 'Quran', activeBg: 'bg-emerald-600', activeBorder: 'border-emerald-700', shadowColor: 'shadow-emerald-300/60' },
        { to: '/hadith', icon: Star, label: 'Hadith', activeBg: 'bg-amber-500', activeBorder: 'border-amber-600', shadowColor: 'shadow-amber-300/60' },
        { to: '/duas', icon: Sparkles, label: 'Duas', activeBg: 'bg-amber-500', activeBorder: 'border-amber-600', shadowColor: 'shadow-amber-300/60' },
        { to: '/discover', icon: Heart, label: 'Discover', activeBg: 'bg-rose-500', activeBorder: 'border-rose-600', shadowColor: 'shadow-rose-300/60' },
        { to: '/achievements', icon: Trophy, label: 'Badges', activeBg: 'bg-yellow-500', activeBorder: 'border-yellow-600', shadowColor: 'shadow-yellow-300/60' },
        { to: '/chat', icon: MessageCircle, label: 'Ask AI', activeBg: 'bg-sky-500', activeBorder: 'border-sky-600', shadowColor: 'shadow-sky-300/60' },
    ];

    const NavItem = ({ item }: { item: NavConfig }) => {
        const isActive = location.pathname === item.to;
        const Icon = item.icon;

        return (
            <Link to={item.to} className="relative group">
                <motion.div 
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.94 }}
                    className={`flex flex-col items-center justify-center w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl transition-all duration-300 border-b-4 active:border-b-0 active:translate-y-1 ${
                        isActive 
                            ? `${item.activeBg} ${item.activeBorder} text-white shadow-xl ${item.shadowColor}` 
                            : 'bg-slate-100/80 hover:bg-slate-100 text-slate-500 hover:text-slate-900 border-transparent hover:border-slate-200'
                    }`}
                >
                    <Icon 
                        strokeWidth={2.8} 
                        className={`w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 transition-all ${
                            isActive ? 'text-white drop-shadow-xs' : 'opacity-70 group-hover:opacity-100'
                        }`} 
                    />
                    <span 
                        className={`text-[9px] sm:text-[10px] md:text-xs font-black mt-1 uppercase tracking-wide transition-all ${
                            isActive ? 'text-white' : 'opacity-70 group-hover:opacity-100'
                        }`}
                    >
                        {item.label}
                    </span>
                </motion.div>
            </Link>
        );
    };

    return (
        <>
            {/* Points & Level Badge (Top Right) - Opens Levels and Achievements Modal */}
            <div className="fixed top-4 right-4 z-50">
                <button 
                    type="button"
                    onClick={() => setIsLevelsModalOpen(true)}
                    className="focus:outline-none"
                    title="View Levels & Achievements"
                >
                    <motion.div 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-white px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-[0_4px_0_#fbbf24] border-2 border-amber-200 flex items-center gap-2 cursor-pointer active:shadow-none active:translate-y-[4px] transition-all"
                    >
                        <span className="text-[10px] sm:text-xs font-black bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full uppercase tracking-wider">
                            Lvl {level}
                        </span>
                        <Star className="text-amber-400 fill-amber-400" size={20} strokeWidth={2.5} />
                        <span className="font-black text-slate-700 text-base sm:text-lg">{points}</span>
                    </motion.div>
                </button>
            </div>

            {/* Levels and Achievements Modal */}
            <LevelsAndAchievementsModal 
                isOpen={isLevelsModalOpen} 
                onClose={() => setIsLevelsModalOpen(false)} 
            />

            {/* Bottom Nav - Solid crisp background without bleed-through transparency */}
            <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white/98 sm:bg-white backdrop-blur-2xl p-2.5 sm:p-3 rounded-[2.2rem] shadow-[0_20px_50px_rgba(0,0,0,0.22)] border-2 border-slate-200/90 flex gap-1.5 sm:gap-3 z-50 max-w-[98vw] overflow-x-auto scrollbar-hide">
                {navItems.map((item) => (
                    <NavItem key={item.to} item={item} />
                ))}
            </nav>
        </>
    );
};

export default Navbar;
