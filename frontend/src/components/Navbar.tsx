import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, MessageCircle, Home, Star, Trophy, Heart } from 'lucide-react';
import { motion } from 'motion/react';
import { useGamification } from '../contexts/GamificationContext';
import LevelsAndAchievementsModal from './LevelsAndAchievementsModal';

const Navbar = () => {
    const location = useLocation();
    const { points, level } = useGamification();
    const [isLevelsModalOpen, setIsLevelsModalOpen] = useState(false);

    const NavItem = ({ to, icon: Icon, label, activeColor, inactiveColor }: { to: string, icon: any, label: string, activeColor: string, inactiveColor: string }) => {
        const isActive = location.pathname === to;
        return (
            <Link to={to} className="relative group">
                <motion.div 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex flex-col items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl transition-all duration-300 border-b-4 active:border-b-0 active:translate-y-1 ${
                        isActive 
                            ? `bg-white shadow-lg ${activeColor} border-slate-200` 
                            : `bg-white/80 hover:bg-white ${inactiveColor} border-transparent hover:border-slate-100`
                    }`}
                >
                    <Icon size={28} strokeWidth={2.5} className={`transition-colors ${isActive ? '' : 'opacity-70 group-hover:opacity-100'}`} />
                    <span className={`text-[10px] sm:text-xs font-black mt-1 uppercase tracking-wide ${isActive ? '' : 'opacity-70 group-hover:opacity-100'}`}>{label}</span>
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

            {/* Bottom Nav */}
            <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-xl p-3 rounded-[2rem] shadow-2xl border-4 border-white/50 flex gap-2 sm:gap-4 z-50 max-w-[95vw] overflow-x-auto scrollbar-hide">
                <NavItem to="/" icon={Home} label="Home" activeColor="text-indigo-500" inactiveColor="text-indigo-300" />
                <NavItem to="/quran" icon={BookOpen} label="Quran" activeColor="text-emerald-500" inactiveColor="text-emerald-300" />
                <NavItem to="/hadith" icon={Star} label="Hadith" activeColor="text-amber-500" inactiveColor="text-amber-300" />
                <NavItem to="/discover" icon={Heart} label="Discover" activeColor="text-rose-500" inactiveColor="text-rose-300" />
                <NavItem to="/chat" icon={MessageCircle} label="Ask AI" activeColor="text-sky-500" inactiveColor="text-sky-300" />
            </nav>
        </>
    );
};

export default Navbar;
