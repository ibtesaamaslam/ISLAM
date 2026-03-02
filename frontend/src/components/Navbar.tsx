import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, MessageCircle, Home, Star, Trophy, Heart } from 'lucide-react';
import { motion } from 'motion/react';
import { useGamification } from '../contexts/GamificationContext';

const Navbar = () => {
    const location = useLocation();
    const { points } = useGamification();

    const NavItem = ({ to, icon: Icon, label, color }: { to: string, icon: any, label: string, color: string }) => {
        const isActive = location.pathname === to;
        return (
            <Link to={to} className="relative group">
                <motion.div 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex flex-col items-center justify-center w-16 h-16 rounded-2xl transition-all duration-300 ${isActive ? 'bg-white shadow-lg' : 'bg-white/50 hover:bg-white/80'}`}
                >
                    <Icon size={24} className={`${isActive ? color : 'text-slate-400'} transition-colors`} />
                    <span className={`text-[10px] font-bold mt-1 ${isActive ? color : 'text-slate-400'}`}>{label}</span>
                </motion.div>
                {isActive && (
                    <motion.div 
                        layoutId="activeTab"
                        className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${color.replace('text-', 'bg-')}`}
                    />
                )}
            </Link>
        );
    };

    return (
        <>
            {/* Points Badge (Top Right) */}
            <div className="fixed top-4 right-4 z-50">
                <Link to="/discover">
                    <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-amber-200 flex items-center gap-2"
                    >
                        <Star className="text-amber-500 fill-amber-500" size={16} />
                        <span className="font-black text-slate-800">{points}</span>
                    </motion.div>
                </Link>
            </div>

            {/* Bottom Nav */}
            <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md p-2 rounded-3xl shadow-2xl border border-white/50 flex gap-2 sm:gap-4 z-50">
                <NavItem to="/" icon={Home} label="Home" color="text-indigo-500" />
                <NavItem to="/quran" icon={BookOpen} label="Quran" color="text-emerald-500" />
                <NavItem to="/hadith" icon={Star} label="Hadith" color="text-amber-500" />
                <NavItem to="/discover" icon={Heart} label="Discover" color="text-rose-500" />
                <NavItem to="/chat" icon={MessageCircle} label="Ask AI" color="text-sky-500" />
            </nav>
        </>
    );
};

export default Navbar;
