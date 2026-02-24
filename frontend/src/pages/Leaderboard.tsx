import React from 'react';
import { useGamification } from '../contexts/GamificationContext';
import { Trophy, Star, Medal } from 'lucide-react';
import { motion } from 'motion/react';

const Leaderboard = () => {
    const { points, level, badges } = useGamification();

    // Mock leaderboard data
    const mockUsers = [
        { name: "Ali", points: points + 150, avatar: "👦" },
        { name: "You", points: points, avatar: "👤" },
        { name: "Fatima", points: Math.max(0, points - 50), avatar: "🧕" },
        { name: "Omar", points: Math.max(0, points - 120), avatar: "🧒" },
    ].sort((a, b) => b.points - a.points);

    return (
        <div className="min-h-screen bg-indigo-50 pb-32 pt-10 px-4">
            <div className="container mx-auto max-w-2xl">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-black text-indigo-600 mb-2">My Progress</h1>
                    <div className="inline-block bg-white px-6 py-2 rounded-full shadow-sm border border-indigo-100">
                        <span className="text-lg font-bold text-slate-600">Level {level}</span>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-white p-6 rounded-3xl shadow-sm border-b-4 border-indigo-200 text-center">
                        <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3 text-indigo-600">
                            <Star size={24} fill="currentColor" />
                        </div>
                        <div className="text-3xl font-black text-slate-800">{points}</div>
                        <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Total Points</div>
                    </div>
                    <div className="bg-white p-6 rounded-3xl shadow-sm border-b-4 border-emerald-200 text-center">
                        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3 text-emerald-600">
                            <Trophy size={24} />
                        </div>
                        <div className="text-3xl font-black text-slate-800">{badges.filter(b => b.unlocked).length}</div>
                        <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Badges Earned</div>
                    </div>
                </div>

                {/* Badges Section */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 mb-8">
                    <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <Medal className="text-amber-500" /> Badges
                    </h2>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                        {badges.map((badge) => (
                            <motion.div 
                                key={badge.id}
                                whileHover={{ scale: 1.05 }}
                                className={`aspect-square rounded-2xl flex flex-col items-center justify-center p-2 text-center border-2 ${badge.unlocked ? 'bg-amber-50 border-amber-200' : 'bg-slate-50 border-slate-100 opacity-50 grayscale'}`}
                            >
                                <div className="text-3xl mb-1">{badge.icon}</div>
                                <div className="text-[10px] font-bold text-slate-600 leading-tight">{badge.name}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Leaderboard */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                    <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <Trophy className="text-indigo-500" /> Leaderboard
                    </h2>
                    <div className="space-y-3">
                        {mockUsers.map((user, idx) => (
                            <div key={idx} className={`flex items-center gap-4 p-3 rounded-xl ${user.name === 'You' ? 'bg-indigo-50 border border-indigo-100' : 'hover:bg-slate-50'}`}>
                                <div className="font-black text-slate-300 w-6 text-center">{idx + 1}</div>
                                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-xl shadow-sm border border-slate-100">
                                    {user.avatar}
                                </div>
                                <div className="flex-1 font-bold text-slate-700">{user.name}</div>
                                <div className="font-mono font-bold text-indigo-600">{user.points} pts</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Leaderboard;
