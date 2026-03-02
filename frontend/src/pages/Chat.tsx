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
            const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
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
        <div className="min-h-screen bg-rose-50 pb-32 pt-4 px-4 flex flex-col">
            <div className="container mx-auto max-w-2xl flex-1 flex flex-col">
                <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-rose-200 rounded-full mx-auto flex items-center justify-center text-rose-600 mb-2 shadow-sm">
                        <Bot size={32} />
                    </div>
                    <h1 className="text-2xl font-black text-rose-600">Ask Noor</h1>
                    <p className="text-rose-400 text-sm">Your AI Islamic Guide</p>
                </div>

                <div className="flex-1 overflow-y-auto space-y-4 mb-4 p-4">
                    {messages.length === 0 && (
                        <div className="text-center text-rose-300 mt-10">
                            <Sparkles className="mx-auto mb-2 opacity-50" size={48} />
                            <p>Salaam! I'm Noor. Ask me anything about Islam! 🕌</p>
                        </div>
                    )}
                    {messages.map((msg, idx) => (
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            key={idx} 
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`max-w-[80%] rounded-2xl p-4 shadow-sm ${msg.role === 'user' ? 'bg-rose-500 text-white rounded-br-none' : 'bg-white text-slate-700 rounded-bl-none border border-rose-100'}`}>
                                {msg.content}
                            </div>
                        </motion.div>
                    ))}
                    {loading && (
                        <div className="flex justify-start">
                            <div className="bg-white text-rose-400 rounded-2xl p-4 rounded-bl-none border border-rose-100 italic text-sm">
                                Noor is thinking... ✨
                            </div>
                        </div>
                    )}
                </div>

                <div className="bg-white p-2 rounded-3xl shadow-lg border border-rose-100 flex gap-2">
                    <input 
                        type="text" 
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Type your question here..."
                        className="flex-1 p-3 rounded-2xl focus:outline-none text-slate-700 placeholder:text-slate-300"
                    />
                    <button 
                        onClick={handleSend}
                        disabled={loading || !query.trim()}
                        className="bg-rose-500 text-white p-3 rounded-2xl hover:bg-rose-600 disabled:opacity-50 transition shadow-md"
                    >
                        <Send size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
