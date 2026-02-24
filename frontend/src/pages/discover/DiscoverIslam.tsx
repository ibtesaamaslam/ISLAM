import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Star, Sun, Moon, Cloud, Book, MessageCircle, Sparkles, ArrowRight, X, Volume2, StopCircle } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from 'react-markdown';

const DiscoverIslam = () => {
    const [activeTab, setActiveTab] = useState('basics');
    const [chatInput, setChatInput] = useState('');
    const [chatResponse, setChatResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [showShahada, setShowShahada] = useState(false);
    
    // Shahada Audio State
    const [isShahadaPlaying, setIsShahadaPlaying] = useState(false);
    const shahadaAudioRef = useRef<HTMLAudioElement | null>(null);
    const playingRef = useRef(false);

    const stopShahadaAudio = () => {
        playingRef.current = false;
        if (shahadaAudioRef.current) {
            shahadaAudioRef.current.pause();
            shahadaAudioRef.current = null;
        }
        setIsShahadaPlaying(false);
    };

    const speak = async (text: string): Promise<void> => {
        try {
            if (shahadaAudioRef.current) {
                shahadaAudioRef.current.pause();
            }

            const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash-preview-tts",
                contents: [{ parts: [{ text }] }],
                config: {
                    responseModalities: ["AUDIO"],
                    speechConfig: {
                        voiceConfig: {
                            prebuiltVoiceConfig: { voiceName: "Fenrir" },
                        },
                    },
                },
            });

            const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
            if (!base64Audio) throw new Error("No audio");

            return new Promise((resolve) => {
                const audio = new Audio(`data:audio/wav;base64,${base64Audio}`);
                shahadaAudioRef.current = audio;
                audio.onended = () => resolve();
                audio.onerror = () => resolve();
                audio.play().catch(() => resolve());
            });
        } catch (e) {
            console.error(e);
            // Fallback to browser TTS
             return new Promise((resolve) => {
                const u = new SpeechSynthesisUtterance(text);
                u.onend = () => resolve();
                u.onerror = () => resolve();
                window.speechSynthesis.speak(u);
            });
        }
    };

    const playShahadaSequence = async () => {
        if (isShahadaPlaying) {
            stopShahadaAudio();
            return;
        }
        
        setIsShahadaPlaying(true);
        playingRef.current = true;

        // Arabic
        await speak("Ash-hadu an la ilaha illa Allah, wa ash-hadu anna Muhammadan Rasul Allah");
        if (!playingRef.current) return;

        // Urdu
        await speak("میں گواہی دیتا ہوں کہ اللہ کے سوا کوئی معبود نہیں اور میں گواہی دیتا ہوں کہ محمد اللہ کے رسول ہیں");
        if (!playingRef.current) return;

        // English
        await speak("I bear witness that there is no god but Allah, and I bear witness that Muhammad is the Messenger of Allah.");
        
        setIsShahadaPlaying(false);
        playingRef.current = false;
    };

    const handleAskQuestion = async () => {
        if (!chatInput.trim()) return;
        setLoading(true);
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
            const prompt = `You are a friendly, welcoming, and wise Muslim friend talking to a non-Muslim child who is curious about Islam. 
            Answer their question simply, gently, and with love. Use analogies suitable for kids.
            
            Format your answer using Markdown:
            - Use **Bold** for key terms.
            - Use ### Headings for different parts of the answer.
            - Use bullet points for lists.
            - Keep paragraphs short and easy to read.
            
            Question: ${chatInput}`;
            
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: prompt,
            });
            setChatResponse(response.text);
        } catch (error) {
            console.error(error);
            setChatResponse("Oops! I couldn't think of an answer right now. Try asking again!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-sky-100 to-emerald-50 pb-32">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-emerald-600 text-white p-8 rounded-b-[3rem] shadow-xl">
                <div className="absolute top-0 left-0 w-full h-full opacity-10">
                    <Cloud size={300} className="absolute -top-10 -left-10" />
                    <Star size={100} className="absolute top-20 right-20" />
                    <Moon size={150} className="absolute bottom-0 right-0" />
                </div>
                <div className="relative z-10 text-center mt-8">
                    <motion.h1 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-bold mb-4 font-serif"
                    >
                        Discover Peace
                    </motion.h1>
                    <p className="text-xl md:text-2xl text-emerald-100 max-w-2xl mx-auto">
                        Welcome to a journey of love, kindness, and understanding. 
                        Let's explore the beautiful world of Islam together!
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-8 max-w-5xl">
                {/* Navigation Tabs */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {['basics', 'beliefs', 'science', 'ask'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-3 rounded-full font-bold text-lg transition-all transform hover:scale-105 ${
                                activeTab === tab 
                                    ? 'bg-emerald-500 text-white shadow-lg ring-4 ring-emerald-200' 
                                    : 'bg-white text-emerald-600 hover:bg-emerald-50 shadow-md'
                            }`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <motion.div 
                    key={activeTab}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-3xl p-8 shadow-xl border-2 border-emerald-100"
                >
                    {activeTab === 'basics' && (
                        <div className="space-y-8">
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-bold text-emerald-800 mb-4">The 5 Pillars of Islam</h2>
                                <p className="text-slate-600 text-lg">Just like a house needs strong pillars to stand, Islam is built on 5 beautiful actions.</p>
                            </div>
                            <div className="grid md:grid-cols-5 gap-4">
                                {[
                                    { title: "Shahada", desc: "Belief in One God", icon: <Heart className="text-rose-500" /> },
                                    { title: "Salah", desc: "Prayer 5 times a day", icon: <Sun className="text-amber-500" /> },
                                    { title: "Zakat", desc: "Giving to the poor", icon: <Sparkles className="text-purple-500" /> },
                                    { title: "Sawm", desc: "Fasting in Ramadan", icon: <Moon className="text-indigo-500" /> },
                                    { title: "Hajj", desc: "Pilgrimage to Makkah", icon: <Book className="text-emerald-500" /> }
                                ].map((pillar, idx) => (
                                    <motion.div 
                                        key={idx}
                                        whileHover={{ y: -5 }}
                                        className="bg-slate-50 p-4 rounded-2xl text-center border border-slate-100 hover:border-emerald-200 transition-colors"
                                    >
                                        <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm text-2xl">
                                            {pillar.icon}
                                        </div>
                                        <h3 className="font-bold text-emerald-700 mb-1">{pillar.title}</h3>
                                        <p className="text-sm text-slate-500">{pillar.desc}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'beliefs' && (
                        <div className="grid md:grid-cols-2 gap-8 items-center">
                            <div>
                                <h2 className="text-3xl font-bold text-emerald-800 mb-6">What do Muslims Believe?</h2>
                                <ul className="space-y-4">
                                    {[
                                        "We believe in One God (Allah), who created everything with love.",
                                        "We believe in Angels made of light who help Allah.",
                                        "We believe in Holy Books like the Quran, Gospel, and Torah.",
                                        "We believe in Prophets like Adam, Noah, Abraham, Moses, Jesus, and Muhammad (Peace be upon them all).",
                                        "We believe that one day, we will return to Allah.",
                                        "We believe that Allah knows everything that will happen."
                                    ].map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-lg text-slate-700">
                                            <Star className="text-amber-400 mt-1 flex-shrink-0" size={20} />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="bg-emerald-100 rounded-3xl p-8 text-center">
                                <h3 className="text-2xl font-bold text-emerald-800 mb-4">Who is Allah?</h3>
                                <p className="text-emerald-900 text-lg leading-relaxed">
                                    Allah is the Arabic word for God. He is the Creator of the stars, the oceans, the animals, and you! He is not a man or a woman, and He has no partners. He is the Most Merciful and the Most Kind.
                                </p>
                            </div>
                        </div>
                    )}

                    {activeTab === 'science' && (
                        <div className="text-center">
                            <h2 className="text-3xl font-bold text-emerald-800 mb-8">Islam & Science</h2>
                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="bg-sky-50 p-6 rounded-2xl">
                                    <h3 className="font-bold text-sky-800 text-xl mb-2">The Big Bang</h3>
                                    <p className="text-sky-900">The Quran mentioned the universe expanding 1,400 years before scientists discovered it!</p>
                                </div>
                                <div className="bg-indigo-50 p-6 rounded-2xl">
                                    <h3 className="font-bold text-indigo-800 text-xl mb-2">Embryology</h3>
                                    <p className="text-indigo-900">The Quran accurately describes how a baby grows inside the mother's womb.</p>
                                </div>
                                <div className="bg-rose-50 p-6 rounded-2xl">
                                    <h3 className="font-bold text-rose-800 text-xl mb-2">Water of Life</h3>
                                    <p className="text-rose-900">"We made from water every living thing." (Quran 21:30) - Science confirms all life needs water!</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'ask' && (
                        <div className="max-w-2xl mx-auto">
                            <h2 className="text-3xl font-bold text-emerald-800 mb-6 text-center">Ask a Friend</h2>
                            <p className="text-center text-slate-600 mb-8">Curious about something? Ask anything! No question is too silly.</p>
                            
                            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 mb-6 min-h-[200px]">
                                {chatResponse ? (
                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 mt-1">AI</div>
                                        <div className="text-slate-700 text-lg leading-relaxed prose prose-emerald max-w-none">
                                            <ReactMarkdown>{chatResponse}</ReactMarkdown>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center text-slate-400 mt-10">
                                        <MessageCircle size={48} className="mx-auto mb-2 opacity-50" />
                                        <p>Your answer will appear here...</p>
                                    </div>
                                )}
                            </div>

                            <div className="flex gap-2">
                                <input 
                                    type="text" 
                                    value={chatInput}
                                    onChange={(e) => setChatInput(e.target.value)}
                                    placeholder="e.g., Why do Muslims fast?"
                                    className="flex-1 p-4 rounded-xl border-2 border-emerald-100 focus:border-emerald-400 focus:outline-none text-lg"
                                    onKeyPress={(e) => e.key === 'Enter' && handleAskQuestion()}
                                />
                                <button 
                                    onClick={handleAskQuestion}
                                    disabled={loading}
                                    className="bg-emerald-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-emerald-600 disabled:opacity-50 transition-colors"
                                >
                                    {loading ? 'Thinking...' : 'Ask'}
                                </button>
                            </div>
                        </div>
                    )}
                </motion.div>

                {/* Revert Section */}
                <div className="mt-12 bg-gradient-to-r from-amber-100 to-orange-100 rounded-3xl p-8 text-center border-2 border-amber-200">
                    <h2 className="text-2xl font-bold text-amber-900 mb-4">Feeling a Connection?</h2>
                    <p className="text-amber-800 mb-6 max-w-2xl mx-auto">
                        If you feel peace in your heart and believe that there is only One God and Muhammad is His messenger, you are already a Muslim in your heart!
                    </p>
                    <button 
                        onClick={() => setShowShahada(true)}
                        className="bg-amber-500 text-white px-8 py-3 rounded-full font-bold hover:bg-amber-600 transition-colors shadow-lg flex items-center gap-2 mx-auto"
                    >
                        Learn about the Shahada <ArrowRight size={20} />
                    </button>
                </div>
            </div>

            {/* Shahada Modal */}
            <AnimatePresence>
                {showShahada && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
                        onClick={() => {
                            setShowShahada(false);
                            stopShahadaAudio();
                        }}
                    >
                        <motion.div 
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl relative overflow-hidden max-h-[90vh] overflow-y-auto"
                            onClick={e => e.stopPropagation()}
                        >
                            <button 
                                onClick={() => {
                                    setShowShahada(false);
                                    stopShahadaAudio();
                                }}
                                className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-full transition-colors z-10"
                            >
                                <X size={24} className="text-slate-500" />
                            </button>
                            
                            <div className="text-center">
                                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                                    <Heart size={40} className="text-emerald-600" />
                                    <button 
                                        onClick={playShahadaSequence}
                                        className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-3 rounded-full shadow-lg hover:bg-emerald-600 transition-transform hover:scale-110"
                                    >
                                        {isShahadaPlaying ? <StopCircle size={20} /> : <Volume2 size={20} />}
                                    </button>
                                </div>
                                <h2 className="text-3xl font-bold text-emerald-800 mb-2">The Shahada</h2>
                                <p className="text-slate-500 mb-8">The Declaration of Faith</p>
                                
                                <div className="bg-emerald-50 rounded-2xl p-8 mb-8 border border-emerald-100">
                                    <p className="text-3xl font-serif text-emerald-900 mb-4 leading-relaxed" dir="rtl">
                                        أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا ٱللَّٰهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ ٱللَّٰهِ
                                    </p>
                                    <p className="text-lg font-medium text-emerald-800 mb-2">
                                        Ash-hadu an la ilaha illa Allah, wa ash-hadu anna Muhammadan Rasul Allah
                                    </p>
                                    <p className="text-slate-600 italic">
                                        "I bear witness that there is no god but Allah, and I bear witness that Muhammad is the Messenger of Allah."
                                    </p>
                                </div>

                                <div className="space-y-4 text-left bg-slate-50 p-6 rounded-2xl">
                                    <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                        <Star size={20} className="text-amber-500" />
                                        What does this mean?
                                    </h3>
                                    <ul className="space-y-3 text-slate-600">
                                        <li className="flex gap-2">
                                            <span className="text-emerald-500">•</span>
                                            You believe that Allah is the only God who created and loves us.
                                        </li>
                                        <li className="flex gap-2">
                                            <span className="text-emerald-500">•</span>
                                            You believe that Muhammad (peace be upon him) is His final messenger who taught us how to be good.
                                        </li>
                                        <li className="flex gap-2">
                                            <span className="text-emerald-500">•</span>
                                            Saying this with your heart makes you a Muslim!
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default DiscoverIslam;
