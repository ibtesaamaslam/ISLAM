import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { BookOpen, MessageCircle, Star, Sparkles, ChevronRight, CloudSun, Heart, Globe, Atom, Orbit } from 'lucide-react';

const Home = () => {
    return (
        <div className="min-h-screen bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed bg-sky-300 font-sans selection:bg-yellow-300 selection:text-blue-900 pb-20 overflow-x-hidden">
            
            {/* Fun Background Blobs */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-yellow-300/40 rounded-full blur-[80px] animate-bounce duration-[5000ms]" />
                <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-pink-300/40 rounded-full blur-[60px] animate-pulse" />
                <div className="absolute top-[40%] left-[20%] w-[20%] h-[20%] bg-lime-300/30 rounded-full blur-[50px]" />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
                
                {/* Header / Nav */}
                <motion.header 
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="flex justify-between items-center mb-12 bg-white/80 backdrop-blur-md p-4 rounded-full shadow-lg border-4 border-white"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-tr from-blue-500 to-cyan-400 rounded-full flex items-center justify-center shadow-md border-4 border-white">
                            <CloudSun className="text-white" size={24} />
                        </div>
                        <span className="text-3xl font-black tracking-tight text-blue-900">
                            Deen<span className="text-pink-500">Daily</span>
                        </span>
                    </div>
                </motion.header>

                <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
                    
                    {/* Hero Text */}
                    <motion.div 
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-center lg:text-left"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border-2 border-yellow-400 text-orange-500 font-black uppercase tracking-wide mb-6 shadow-sm">
                            <Sparkles size={16} className="text-yellow-500 fill-yellow-500" /> Fun Learning Adventure!
                        </div>
                        
                        <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6 text-white drop-shadow-[0_4px_0_rgba(0,0,0,0.1)]">
                            Learn Islam the <br />
                            <span className="text-yellow-300 inline-block cursor-default">Fun Way!</span> 🚀
                        </h1>
                        
                        <p className="text-xl text-blue-900/80 font-bold mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0 bg-white/30 p-4 rounded-2xl backdrop-blur-sm border-2 border-white/50">
                            Join the magical journey! Read the Quran, collect Hadith stars, and make new friends with our AI guide.
                        </p>

                        <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                            <Link to="/quran" className="group relative px-8 py-4 bg-gradient-to-b from-orange-400 to-orange-500 rounded-2xl font-black text-white shadow-[0_6px_0_#c2410c] active:shadow-none active:translate-y-[6px] transition-all border-2 border-orange-300">
                                <span className="relative flex items-center gap-2 text-lg">
                                    Start Adventure <ChevronRight size={24} strokeWidth={3} />
                                </span>
                            </Link>
                        </div>
                    </motion.div>

                    {/* Hero Visual / Futuristic Animation */}
                    <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="relative h-[400px] flex items-center justify-center"
                    >
                        {/* Central Glowing Orb */}
                        <motion.div 
                            animate={{ 
                                scale: [1, 1.1, 1],
                                rotate: [0, 5, -5, 0],
                            }}
                            transition={{ 
                                duration: 4, 
                                repeat: Infinity,
                                ease: "easeInOut" 
                            }}
                            className="relative z-20 w-48 h-48 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center shadow-[0_0_60px_rgba(59,130,246,0.5)] border-4 border-white/50 backdrop-blur-sm"
                        >
                            <Atom size={80} className="text-white drop-shadow-lg" strokeWidth={1.5} />
                        </motion.div>

                        {/* Orbiting Elements */}
                        <div className="absolute inset-0 z-10">
                            <motion.div 
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0"
                            >
                                <div className="absolute top-10 left-1/2 -translate-x-1/2 w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                                    <Star size={20} className="text-yellow-600 fill-yellow-600" />
                                </div>
                                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-12 h-12 bg-emerald-400 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                                    <BookOpen size={20} className="text-white" />
                                </div>
                            </motion.div>
                            
                            <motion.div 
                                animate={{ rotate: -360 }}
                                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 scale-75"
                            >
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-rose-400 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                                    <Heart size={18} className="text-white fill-white" />
                                </div>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-sky-400 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                                    <Globe size={18} className="text-white" />
                                </div>
                            </motion.div>
                        </div>

                        {/* Background Rings */}
                        <div className="absolute inset-0 z-0 flex items-center justify-center">
                            <div className="w-[300px] h-[300px] border-2 border-white/30 rounded-full animate-pulse" />
                            <div className="absolute w-[400px] h-[400px] border border-white/20 rounded-full" />
                        </div>
                    </motion.div>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                        to="/hadiths"
                        icon={<Star size={32} className="text-white" />}
                        title="Hadith Heroes"
                        desc="Collect wisdom stars from the Prophet (PBUH) every day!"
                        delay={0.7}
                        color="bg-amber-400"
                        shadow="shadow-amber-600"
                    />
                    <FeatureCard 
                        to="/chat"
                        icon={<MessageCircle size={32} className="text-white" />}
                        title="Ask A Friend"
                        desc="Have a question? Chat with our friendly robot guide!"
                        delay={0.8}
                        color="bg-rose-400"
                        shadow="shadow-rose-600"
                    />
                    <FeatureCard 
                        to="/discover"
                        icon={<Globe size={32} className="text-white" />}
                        title="Discover"
                        desc="Explore the wonders of Islam and the world around us!"
                        delay={0.9}
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
