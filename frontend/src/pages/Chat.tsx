import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Send, Bot, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { useGamification } from '../contexts/GamificationContext';

const Chat = () => {
    const [query, setQuery] = useState('');
    const [messages, setMessages] = useState<{role: 'user' | 'model', content: string}[]>([]);
    const [loading, setLoading] = useState(false);
    const { addPoints, unlockAchievement } = useGamification();

    const handleSend = async () => {
        if (!query.trim()) return;

        const userMsg = { role: 'user' as const, content: query };
        setMessages(prev => [...prev, userMsg]);
        setQuery('');
        setLoading(true);

        try {
            const apiKey = import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
            if (!apiKey) throw new Error("API Key missing");
            const ai = new GoogleGenAI({ apiKey });
            const prompt = `You are a friendly, wise, and gentle Islamic teacher for kids. 
            Your name is "Noor". 
            Answer the following question about Islam, Quran, or Hadith in a simple, encouraging, and kid-friendly way. 
            Use emojis. Keep it short (under 100 words). 
            Question: ${userMsg.content}`;

            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: prompt
            });

            setMessages(prev => [...prev, { role: 'model', content: response.text }]);
            addPoints(10);
            unlockAchievement('ai_friend');
        } catch (err) {
            console.error(err);
            setMessages(prev => [...prev, { role: 'model', content: "Oops! I'm having trouble connecting to my knowledge base right now. Try again later! 🌙" }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-rose-50 pb-32 pt-6 px-4 flex flex-col font-sans selection:bg-rose-200 selection:text-rose-900">
            <div className="container mx-auto max-w-2xl flex-1 flex flex-col h-full">
                <motion.div 
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-center mb-8"
                >
                    <div className="w-24 h-24 bg-white rounded-full mx-auto flex items-center justify-center text-rose-500 mb-4 shadow-lg border-4 border-rose-200 relative">
                        <div className="absolute top-0 right-0 w-6 h-6 bg-green-400 rounded-full border-2 border-white animate-pulse" />
                        <Bot size={48} strokeWidth={2.5} />
                    </div>
                    <h1 className="text-4xl font-black text-rose-500 mb-1 drop-shadow-sm">Ask Noor 🤖</h1>
                    <p className="text-rose-400 font-bold text-lg">Your Friendly AI Islamic Guide</p>
                </motion.div>

                <div className="flex-1 overflow-y-auto space-y-6 mb-6 p-4 scrollbar-hide">
                    {messages.length === 0 && (
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-center text-rose-300 mt-10 flex flex-col items-center gap-4"
                        >
                            <div className="p-6 bg-white rounded-[2rem] shadow-sm border-2 border-rose-100 rotate-3">
                                <Sparkles className="text-rose-400 animate-pulse" size={64} />
                            </div>
                            <p className="font-black text-xl max-w-xs">Salaam! I'm Noor. Ask me anything about Islam! 🕌✨</p>
                        </motion.div>
                    )}
                    {messages.map((msg, idx) => (
                        <motion.div 
                            initial={{ opacity: 0, y: 20, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            key={idx} 
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`max-w-[85%] rounded-3xl p-5 shadow-sm font-medium text-lg leading-relaxed ${
                                msg.role === 'user' 
                                ? 'bg-rose-500 text-white rounded-br-none shadow-rose-200' 
                                : 'bg-white text-slate-700 rounded-bl-none border-2 border-rose-100 shadow-sm'
                            }`}>
                                {msg.content}
                            </div>
                        </motion.div>
                    ))}
                    {loading && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex justify-start"
                        >
                            <div className="bg-white text-rose-400 rounded-3xl p-5 rounded-bl-none border-2 border-rose-100 italic font-bold text-sm flex items-center gap-2 shadow-sm">
                                <div className="flex gap-1">
                                    <div className="w-2 h-2 bg-rose-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                    <div className="w-2 h-2 bg-rose-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                    <div className="w-2 h-2 bg-rose-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                </div>
                                Noor is thinking... ✨
                            </div>
                        </motion.div>
                    )}
                </div>

                <div className="bg-white p-3 rounded-[2rem] shadow-xl border-4 border-rose-100 flex gap-3 sticky bottom-4">
                    <input 
                        type="text" 
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Type your question here..."
                        className="flex-1 p-4 rounded-2xl focus:outline-none text-slate-700 placeholder:text-rose-300 font-bold text-lg bg-rose-50/50 focus:bg-rose-50 transition-colors"
                    />
                    <button 
                        onClick={handleSend}
                        disabled={loading || !query.trim()}
                        className="bg-rose-500 text-white p-4 rounded-2xl hover:bg-rose-600 disabled:opacity-50 disabled:hover:bg-rose-500 transition-all shadow-[0_4px_0_#be123c] active:shadow-none active:translate-y-[4px] active:bg-rose-600"
                    >
                        <Send size={24} strokeWidth={3} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
