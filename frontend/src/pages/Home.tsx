import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { BookOpen, MessageCircle, Star, Sparkles, ChevronRight, Heart, Globe } from 'lucide-react';
import DailyDhikrWidget from '../components/DailyDhikrWidget';
import DailyStreakWidget from '../components/DailyStreakWidget';
import PrayerTimesWidget from '../components/PrayerTimesWidget';

const Home = () => {
    return (
        <div className="min-h-screen bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed bg-sky-300 font-sans selection:bg-yellow-300 selection:text-blue-900 pb-20 overflow-x-hidden">
            
            {/* Fun Background Blobs */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-yellow-300/40 rounded-full blur-[80px] animate-bounce duration-[5000ms]" />
                <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-pink-300/40 rounded-full blur-[60px] animate-pulse" />
                <div className="absolute top-[40%] left-[20%] w-[20%] h-[20%] bg-lime-300/30 rounded-full blur-[50px]" />
            </div>

            <div className="relative z-10 w-full px-4 sm:px-8 lg:px-12 xl:px-16 py-8">
                
                {/* Header / Nav */}
                <motion.header 
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="inline-flex items-center mb-12 bg-white/80 backdrop-blur-md p-4 pr-8 rounded-full shadow-lg border-4 border-white"
                >
                    <div className="flex items-center gap-4">
                        <div className="relative w-14 h-14 bg-gradient-to-br from-rose-500 to-orange-400 rounded-2xl rotate-3 flex items-center justify-center shadow-[0_4px_0_rgba(0,0,0,0.1)] border-4 border-white group transition-transform hover:rotate-6">
                            <Heart className="text-white fill-white/20" size={28} strokeWidth={2.5} />
                            <Sparkles className="text-yellow-300 absolute -top-2 -right-2 animate-pulse" size={20} fill="currentColor" />
                        </div>
                        <div className="flex flex-col leading-none">
                            <span className="text-2xl md:text-3xl font-black tracking-tight text-slate-800">
                                RECLAIM <span className="text-rose-500">YOUR HEART</span>
                            </span>
                            <span className="text-[10px] md:text-xs font-medium text-slate-500 tracking-wide ml-1 mt-1 italic">
                                "Verily, in the remembrance of Allah do hearts find rest."
                            </span>
                        </div>
                    </div>
                </motion.header>

                <div className="mb-8 sm:mb-10 w-full">
                    {/* Hero Text */}
                    <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border-2 border-yellow-400 text-orange-500 font-black uppercase tracking-wide mb-4 shadow-sm">
                            <Sparkles size={16} className="text-yellow-500 fill-yellow-500" /> Fun Learning Adventure!
                        </div>
                        
                        <h1 className="text-4xl md:text-6xl xl:text-7xl font-black leading-tight mb-4 text-white drop-shadow-[0_4px_0_rgba(0,0,0,0.1)]">
                            Learn Islam the <span className="text-yellow-300 inline-block cursor-default">Fun Way!</span> 🚀
                        </h1>
                        
                        <p className="text-lg md:text-xl text-blue-950 font-bold mb-6 leading-relaxed max-w-2xl mx-auto bg-white/40 p-4 rounded-3xl backdrop-blur-sm border-2 border-white/60">
                            Join the magical journey! Read the Quran, collect Hadith stars, and make new friends with our AI guide.
                        </p>

                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link 
                                to="/quran" 
                                className="group inline-flex items-center gap-2 px-8 py-3.5 bg-[#ff6e00] hover:bg-[#ff7700] rounded-full font-black text-white text-base sm:text-lg shadow-[0_5px_0_#c2410c,0_8px_16px_rgba(0,0,0,0.12)] hover:shadow-[0_6px_0_#c2410c,0_10px_20px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 active:translate-y-[4px] active:shadow-[0_1px_0_#c2410c] transition-all duration-150 border-t border-white/30 border-b border-orange-700/50 select-none cursor-pointer"
                            >
                                <span>Start the Adventure</span>
                                <ChevronRight size={20} strokeWidth={3.5} className="inline-block transition-transform group-hover:translate-x-0.5" />
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Daily Streak Counter Widget */}
                <DailyStreakWidget />

                {/* Local Prayer Times Section with Geolocation & Azan */}
                <PrayerTimesWidget />

                {/* Daily Dhikr & Digital Tasbeeh Feature */}
                <DailyDhikrWidget />

                {/* Features Grid */}
                <div className="grid md:grid-cols-3 gap-6">
                    <FeatureCard 
                        to="/quran"
                        icon={<BookOpen size={32} className="text-white" />}
                        title="Quran Quest"
                        desc="Read the Holy Book with a magical helper who explains everything!"
                        delay={0.6}
                        color="bg-emerald-400"
                        shadow="shadow-emerald-600"
                    />
                    <FeatureCard 
                        to="/hadith"
                        icon={<Star size={32} className="text-white" />}
                        title="Hadith Heroes"
                        desc="Collect wisdom stars from the Prophet (PBUH) every day!"
                        delay={0.7}
                        color="bg-amber-400"
                        shadow="shadow-amber-600"
                    />
                    <FeatureCard 
                        to="/discover"
                        icon={<Globe size={32} className="text-white" />}
                        title="Discover"
                        desc="Explore the wonders of Islam and the world around us!"
                        delay={0.8}
                        color="bg-indigo-400"
                        shadow="shadow-indigo-600"
                    />
                </div>

                {/* Footer */}
                <footer className="mt-20 text-center text-blue-900/60 font-bold text-sm bg-white/50 p-6 rounded-3xl backdrop-blur-sm">
                    <p className="flex items-center justify-center gap-2">
                        Made with <Heart size={16} className="text-red-500 fill-red-500 animate-pulse" /> for Muslim Kids everywhere!
                    </p>
                </footer>
            </div>
        </div>
    );
};

const FeatureCard = ({ to, icon, title, desc, delay, color, shadow }: { to: string, icon: React.ReactNode, title: string, desc: string, delay: number, color: string, shadow: string }) => (
    <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay, type: "spring", bounce: 0.4 }}
    >
        <Link to={to} className={`block h-full p-6 rounded-3xl bg-white border-4 border-white shadow-[0_8px_0_rgba(0,0,0,0.1)] hover:-translate-y-2 transition-transform duration-300 group overflow-hidden relative`}>
            <div className={`absolute top-0 right-0 w-32 h-32 ${color} opacity-10 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-500`} />
            
            <div className={`w-16 h-16 ${color} rounded-2xl flex items-center justify-center mb-4 shadow-[0_4px_0_rgba(0,0,0,0.2)]`}>
                {icon}
            </div>
            
            <h3 className="text-2xl font-black text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">{title}</h3>
            <p className="text-slate-500 font-bold leading-relaxed">{desc}</p>
        </Link>
    </motion.div>
);

export default Home;
