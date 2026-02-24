import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { BookOpen, Star, MessageCircle, Play } from 'lucide-react';

const Home = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 pb-32">
            {/* Hero Section */}
            <div className="pt-20 pb-10 text-center px-4">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                >
                    <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-4 drop-shadow-sm">
                        ISLAM
                    </h1>
                    <p className="text-xl text-slate-600 font-medium max-w-md mx-auto">
                        Your magical journey to learn about Allah, the Quran, and the Prophet (PBUH)! 🌟
                    </p>
                </motion.div>
            </div>

            {/* Game Map / Dashboard */}
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Quran Adventure Card */}
                    <Link to="/quran">
                        <motion.div 
                            whileHover={{ y: -5, rotate: -1 }}
                            className="bg-white rounded-3xl p-6 shadow-xl border-b-8 border-emerald-200 overflow-hidden relative group"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100 rounded-full -mr-10 -mt-10 opacity-50 group-hover:scale-110 transition-transform" />
                            <div className="relative z-10">
                                <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 mb-4 shadow-sm">
                                    <BookOpen size={32} />
                                </div>
                                <h2 className="text-2xl font-bold text-slate-800 mb-2">Quran Quest</h2>
                                <p className="text-slate-500 text-sm">Read the Holy Book, listen to beautiful recitations, and earn stars!</p>
                            </div>
                        </motion.div>
                    </Link>

                    {/* Hadith Heroes Card */}
                    <Link to="/hadith">
                        <motion.div 
                            whileHover={{ y: -5, rotate: 1 }}
                            className="bg-white rounded-3xl p-6 shadow-xl border-b-8 border-amber-200 overflow-hidden relative group"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100 rounded-full -mr-10 -mt-10 opacity-50 group-hover:scale-110 transition-transform" />
                            <div className="relative z-10">
                                <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600 mb-4 shadow-sm">
                                    <Star size={32} />
                                </div>
                                <h2 className="text-2xl font-bold text-slate-800 mb-2">Hadith Heroes</h2>
                                <p className="text-slate-500 text-sm">Discover the wisdom of the Prophet (PBUH) and collect wisdom cards.</p>
                            </div>
                        </motion.div>
                    </Link>

                    {/* AI Guide Card */}
                    <Link to="/chat">
                        <motion.div 
                            whileHover={{ y: -5, rotate: -1 }}
                            className="bg-white rounded-3xl p-6 shadow-xl border-b-8 border-rose-200 overflow-hidden relative group md:col-span-2"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-100 rounded-full -mr-10 -mt-10 opacity-50 group-hover:scale-110 transition-transform" />
                            <div className="relative z-10 flex items-center gap-6">
                                <div className="w-20 h-20 bg-rose-100 rounded-2xl flex items-center justify-center text-rose-600 shadow-sm shrink-0">
                                    <MessageCircle size={40} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Ask the Wise Bot</h2>
                                    <p className="text-slate-500 text-sm">Have a question? Our friendly AI guide is here to help you learn!</p>
                                </div>
                            </div>
                        </motion.div>
                    </Link>

                </div>
            </div>
        </div>
    );
};

export default Home;
