import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Star, Sun, Moon, Cloud, Book, MessageCircle, Sparkles, ArrowRight, X, Volume2, StopCircle, Compass, Atom, Dna, Globe, Leaf, Mountain, Wind, Droplets, Layers } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from 'react-markdown';

const guideCategories = [
    {
        title: "Foundations of Faith",
        icon: <Heart className="text-rose-500" />,
        steps: [
            { title: "The Shahada", subtitle: "The Declaration of Faith", content: "The essential first step is the Shahada: sincerely declaring “There is no god but God, and Muhammad is the Messenger of God.” This statement expresses belief in the oneness of God and acceptance of Prophet Muhammad’s message." },
            { title: "Understanding Tawḥīd", subtitle: "Oneness of God", content: "Tawḥīd is the core theological concept — belief that God is one, unique, without partners or equals. Grasping this idea shapes the Muslim worldview, worship, and ethics." },
            { title: "Belief in the Prophets", subtitle: "and Revelation", content: "Islam teaches a chain of prophets (including Adam, Abraham, Moses, Jesus, and Muhammad) who brought guidance. Accepting that Prophet Muhammad is the final messenger is key." },
            { title: "The Qur’an", subtitle: "Reading and Respecting", content: "The Qur’an is the central scripture. Newcomers should know how it’s organized, the availability of reliable translations, and that respectful reading is encouraged." },
        ]
    },
    {
        title: "Pillars of Action",
        icon: <Sun className="text-amber-500" />,
        steps: [
            { title: "Daily Prayer (Ṣalāh)", subtitle: "Structure & Meaning", content: "Prayer is a five-times-daily practice. Learning the short prayers, their times, and the spiritual purpose behind them (remembrance, discipline, gratitude) makes the ritual approachable." },
            { title: "Wudu", subtitle: "Ritual Purification", content: "Wudu (ablution) is the simple washing routine performed before prayer. It’s both practical hygiene and symbolic purification." },
            { title: "Zakat & Charity", subtitle: "Social Responsibility", content: "Zakat is a prescribed form of charity. Understanding the ethical purpose — supporting the vulnerable — helps converts align values with practical giving." },
            { title: "Fasting in Ramadan", subtitle: "Purpose and Practice", content: "Fasting cultivates empathy and discipline. Guidance on fasting rules and the social aspects like ifṭār helps newcomers participate." },
            { title: "Hajj", subtitle: "Pilgrimage Overview", content: "Hajj is the pilgrimage to Mecca. A high-level explanation of its spiritual significance and basic rites is useful even if Hajj is a distant goal." },
        ]
    },
    {
        title: "Living Islam",
        icon: <Leaf className="text-emerald-500" />,
        steps: [
            { title: "Intention (Niyyah)", subtitle: "Internal Purpose", content: "Making a conscious inner commitment transforms routine actions into spiritual deeds; teaching newcomers to form simple, sincere intentions helps integrate faith." },
            { title: "Ethics & Morality", subtitle: "Daily Conduct", content: "Islam emphasizes compassion, honesty, and justice. Practical examples (kindness, fair dealings) demonstrate how faith translates into everyday behavior." },
            { title: "Lifestyle Adjustments", subtitle: "Food & Habits", content: "Adopting halal dietary guidelines and mindful social habits. Present these as health- and value-based choices with simple, practical tips." },
            { title: "Daily Habits", subtitle: "Mini-Rituals", content: "Simple habits: morning supplications, saying “Bismillah” before meals, and small acts of kindness build spiritual momentum." },
             { title: "Marriage & Family", subtitle: "Guidance", content: "Basic Islamic perspectives on marriage, family responsibilities, and rights, emphasizing mutual respect and care." },
        ]
    },
    {
        title: "Personal Growth",
        icon: <Sparkles className="text-purple-500" />,
        steps: [
            { title: "Repentance (Tawbah)", subtitle: "Returning to God", content: "Repentance is immediate: sincere regret, stopping the action, and asking forgiveness. This comforting process helps understand Islam’s path of moral restoration." },
            { title: "Learning & Study", subtitle: "Start Small", content: "A gradual learning plan prevents overwhelm. Suggest curated beginner lessons and short daily readings." },
            { title: "Handling Doubts", subtitle: "Compassionate Inquiry", content: "Doubt is normal. Encourage honest exploration and critical thinking — reassure users that faith can coexist with sincere inquiry." },
            { title: "Gradual Adoption", subtitle: "Patience", content: "Spiritual journeys are personal. Encourage small steps rather than immediate perfection to avoid burnout." },
            { title: "Mental Health", subtitle: "Pastoral Care", content: "Support spiritual and psychological wellbeing. Faith is a source of strength, but professional help is also encouraged for mental health." },
        ]
    },
    {
        title: "Community & Society",
        icon: <Globe className="text-sky-500" />,
        steps: [
            { title: "Find a Community", subtitle: "Local Mosque", content: "A welcoming local mosque provides practical help and social support. Guidance on what to expect when visiting a mosque reduces anxiety." },
            { title: "Mentorship", subtitle: "Scholar Guidance", content: "Having a trustworthy mentor or qualified scholar to answer questions is invaluable compared to relying solely on internet sources." },
            { title: "Social Dynamics", subtitle: "Family & Friends", content: "Prepare newcomers with communication tips and patience strategies for managing relationships with non-Muslim family and friends." },
            { title: "Community Service", subtitle: "Volunteering", content: "Connecting faith to action through volunteering — practical ways to live values and build a supportive social circle." },
             { title: "Privacy & Safety", subtitle: "Public Identity", content: "Advice on managing online presence and safe ways to share one's journey publicly, especially in sensitive environments." },
        ]
    }
];

const scienceTopics = [
    {
        category: "Astronomy & Physics",
        icon: <Atom className="text-indigo-500" />,
        items: [
            { title: "The Big Bang", reference: "Quran 21:30", content: "“Do not the disbelievers see that the heavens and the earth were a closed-up mass (ratqan), then We opened them out?” This aligns with the Big Bang theory that the universe began from a single singularity." },
            { title: "Expansion of the Universe", reference: "Quran 51:47", content: "“And the heaven We constructed with strength, and indeed, We are [its] expander.” Modern astrophysics confirmed in the 20th century that the universe is continuously expanding." },
            { title: "Orbits of Celestial Bodies", reference: "Quran 21:33", content: "“It is He who created the night and the day and the sun and the moon; all [heavenly bodies] in an orbit are swimming.” This accurately describes the motion of celestial bodies." },
            { title: "The Sun's Trajectory", reference: "Quran 36:38", content: "“And the sun runs [on course] toward its stopping point.” The sun is not stationary; it moves within the Milky Way galaxy." },
            { title: "Iron Sent from Space", reference: "Quran 57:25", content: "“And We sent down iron...” Scientists have discovered that iron cannot be formed within the earth; it originated from supernova explosions and was sent down via meteorites." }
        ]
    },
    {
        category: "Human Biology",
        icon: <Dna className="text-rose-500" />,
        items: [
            { title: "Embryonic Development", reference: "Quran 23:12-14", content: "The Quran describes the stages of the fetus: from a drop (Nutfah) to a clinging clot (Alaqah), to a chewed lump (Mudghah), then bones clothed with flesh. This matches modern embryology." },
            { title: "Creation from Water", reference: "Quran 21:30", content: "“...and made from water every living thing?” Cytoplasm, the basic substance of the cell, is 80% water, and every living organism consists primarily of water." },
            { title: "Pain Receptors", reference: "Quran 4:56", content: "The Quran mentions that skins will be replaced so they may taste the punishment, implying that pain receptors are located in the skin, a fact discovered by modern anatomy." },
            { title: "The Frontal Lobe", reference: "Quran 96:15-16", content: "The Quran refers to the “lying, sinning forelock.” Modern neuroscience identifies the prefrontal cortex (forehead area) as the center for decision-making, planning, and lying." }
        ]
    },
    {
        category: "Geology & Earth",
        icon: <Mountain className="text-stone-500" />,
        items: [
            { title: "Mountains as Pegs", reference: "Quran 78:6-7", content: "“Have We not made the earth a resting place? And the mountains as stakes?” Mountains have deep roots (isostasy) that stabilize the earth's crust, like pegs holding a tent." },
            { title: "The Water Cycle", reference: "Quran 39:21", content: "“Do you not see that Allah sends down rain from the sky and makes it flow as springs in the earth?” This describes the infiltration of groundwater, a key part of the water cycle." },
            { title: "Layers of the Atmosphere", reference: "Quran 67:3", content: "“He who created seven heavens in layers.” The atmosphere is composed of distinct layers (troposphere, stratosphere, etc.), each with specific functions." },
            { title: "Barrier Between Seas", reference: "Quran 55:19-20", content: "“He released the two seas... Between them is a barrier which they do not transgress.” Oceanography confirms that bodies of water with different salinities and densities meet but do not immediately mix." }
        ]
    },
    {
        category: "Nature & Zoology",
        icon: <Leaf className="text-green-500" />,
        items: [
            { title: "Pollinating Winds", reference: "Quran 15:22", content: "“And We have sent the fertilizing winds...” Winds play a crucial role in pollination for many plants, a botanical fact." },
            { title: "Female Bees", reference: "Quran 16:68-69", content: "The Quran addresses the bee using the female grammatical gender when describing its work (building hives, gathering nectar). Science confirms worker bees are female." },
            { title: "Communication of Ants", reference: "Quran 27:18", content: "“An ant said, 'O ants, enter your dwellings...'” Entomologists have discovered that ants have a complex chemical communication system to warn and guide the colony." },
            { title: "The Spider's Web", reference: "Quran 29:41", content: "The Quran compares false reliance to a spider's web, noting it is the “weakest of houses.” It also uses the female gender for the spider building the web; biologically, the female builds the web." }
        ]
    }
];

const basicsContent = [
    {
        title: "Shahada",
        subtitle: "Faith",
        icon: <Heart className="text-rose-500" />,
        description: "The declaration of faith: 'There is no god but Allah, and Muhammad is the Messenger of Allah.' It is the key to entering Islam.",
        details: "This simple statement is the foundation of all Islamic beliefs. It affirms Monotheism (Tawhid) and the Prophethood of Muhammad (PBUH)."
    },
    {
        title: "Salah",
        subtitle: "Prayer",
        icon: <Sun className="text-amber-500" />,
        description: "Performing the five daily prayers to maintain a spiritual connection with God.",
        details: "Fajr (Dawn), Dhuhr (Noon), Asr (Afternoon), Maghrib (Sunset), and Isha (Night). Prayer keeps us grounded and grateful."
    },
    {
        title: "Zakat",
        subtitle: "Charity",
        icon: <Sparkles className="text-purple-500" />,
        description: "Giving a fixed portion (2.5%) of one's wealth to help the poor and needy.",
        details: "Zakat purifies wealth and fosters empathy. It ensures that the community looks after its most vulnerable members."
    },
    {
        title: "Sawm",
        subtitle: "Fasting",
        icon: <Moon className="text-indigo-500" />,
        description: "Fasting during the holy month of Ramadan from dawn until sunset.",
        details: "Fasting teaches self-discipline, patience, and compassion for the hungry. It is a time for spiritual recharge and Quran recitation."
    },
    {
        title: "Hajj",
        subtitle: "Pilgrimage",
        icon: <Book className="text-emerald-500" />,
        description: "The pilgrimage to the holy city of Makkah, required once in a lifetime for those who are able.",
        details: "Hajj unites Muslims from all over the world, dressed in simple white cloth, symbolizing equality before God."
    }
];

const beliefsContent = [
    {
        title: "Belief in Allah",
        icon: <Heart className="text-rose-500" />,
        content: "Believing that God is One, Unique, and has no partners or children. He is the Creator and Sustainer of everything."
    },
    {
        title: "Belief in Angels",
        icon: <Sparkles className="text-sky-400" />,
        content: "Angels are beings made of light who obey God's commands. They record deeds and protect humans (e.g., Gabriel/Jibreel)."
    },
    {
        title: "Belief in Books",
        icon: <Book className="text-emerald-500" />,
        content: "God sent books to guide humanity, including the Torah (Moses), Psalms (David), Gospel (Jesus), and the Quran (Muhammad)."
    },
    {
        title: "Belief in Prophets",
        icon: <Star className="text-amber-400" />,
        content: "God sent messengers to every nation, starting with Adam and ending with Muhammad (Peace Be Upon Him), to teach the truth."
    },
    {
        title: "Belief in the Last Day",
        icon: <Compass className="text-indigo-500" />,
        content: "One day, all life will end, and everyone will be resurrected to be judged for their deeds. It is a day of absolute justice."
    },
    {
        title: "Divine Decree (Qadr)",
        icon: <Cloud className="text-slate-500" />,
        content: "Everything happens by the will and knowledge of God. We have free will to choose, but God knows all outcomes."
    }
];

const DiscoverIslam = () => {
    const [activeSection, setActiveSection] = useState('basics');
    const [chatInput, setChatInput] = useState('');
    const [chatResponse, setChatResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [showShahada, setShowShahada] = useState(false);
    
    // Shahada Audio State
    const [isShahadaPlaying, setIsShahadaPlaying] = useState(false);
    const shahadaAudioRef = useRef<HTMLAudioElement | null>(null);
    const playingRef = useRef(false);

    const navItems = [
        { id: 'basics', title: 'The 5 Pillars', icon: <Star className="text-amber-500" />, isGuide: false, guideIndex: -1 },
        { id: 'beliefs', title: 'Articles of Faith', icon: <Heart className="text-rose-500" />, isGuide: false, guideIndex: -1 },
        ...guideCategories.map((cat, idx) => ({
            id: `guide-${idx}`,
            title: cat.title,
            icon: cat.icon,
            isGuide: true,
            guideIndex: idx
        })),
        { id: 'science', title: 'Islam & Science', icon: <Atom className="text-indigo-500" />, isGuide: false, guideIndex: -1 },
        { id: 'ask', title: 'Ask a Friend', icon: <MessageCircle className="text-emerald-500" />, isGuide: false, guideIndex: -1 }
    ];

    const stopShahadaAudio = () => {
        playingRef.current = false;
        if (shahadaAudioRef.current) {
            shahadaAudioRef.current.pause();
            shahadaAudioRef.current = null;
        }
        setIsShahadaPlaying(false);
    };

    const speak = async (text: string, lang: string = 'en-US'): Promise<void> => {
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
                try {
                    const binaryString = window.atob(base64Audio);
                    const bytes = new Uint8Array(binaryString.length);
                    for (let i = 0; i < binaryString.length; i++) {
                        bytes[i] = binaryString.charCodeAt(i);
                    }
                    const blob = new Blob([bytes], { type: 'audio/mp3' });
                    const url = URL.createObjectURL(blob);

                    const audio = new Audio(url);
                    shahadaAudioRef.current = audio;
                    
                    audio.onended = () => {
                        shahadaAudioRef.current = null;
                        URL.revokeObjectURL(url);
                        resolve();
                    };
                    
                    audio.onerror = (e) => {
                        console.error("Audio playback error", e);
                        URL.revokeObjectURL(url);
                        resolve();
                    };
                    
                    audio.play().catch((e) => {
                        console.error("Audio play failed", e);
                        URL.revokeObjectURL(url);
                        resolve();
                    });
                } catch (err) {
                    console.error("Error creating audio blob", err);
                    resolve();
                }
            });
        } catch (e) {
            console.error("Gemini TTS failed, fallback to browser", e);
             return new Promise((resolve) => {
                if (!window.speechSynthesis) {
                    resolve();
                    return;
                }
                const u = new SpeechSynthesisUtterance(text);
                u.lang = lang;
                u.onend = () => resolve();
                u.onerror = () => resolve();
                window.speechSynthesis.cancel();
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
        await speak("Ash-hadu an la ilaha illa Allah, wa ash-hadu anna Muhammadan Rasul Allah", "ar-SA");
        if (!playingRef.current) return;

        // Urdu
        await speak("میں گواہی دیتا ہوں کہ اللہ کے سوا کوئی معبود نہیں اور میں گواہی دیتا ہوں کہ محمد اللہ کے رسول ہیں", "ur-PK");
        if (!playingRef.current) return;

        // English
        await speak("I bear witness that there is no god but Allah, and I bear witness that Muhammad is the Messenger of Allah.", "en-US");
        
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

    const activeGuideCategory = navItems.find(item => item.id === activeSection)?.guideIndex;

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

            <div className="container mx-auto px-4 mt-8 max-w-6xl">
                <div className="grid md:grid-cols-4 gap-8">
                    {/* Sidebar Navigation */}
                    <div className="md:col-span-1 space-y-2">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveSection(item.id)}
                                className={`w-full text-left p-4 rounded-xl transition-all flex items-center gap-3 ${
                                    activeSection === item.id
                                        ? 'bg-emerald-500 text-white shadow-md'
                                        : 'bg-white text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 shadow-sm'
                                }`}
                            >
                                <div className={`p-2 rounded-full ${activeSection === item.id ? 'bg-white/20' : 'bg-emerald-50'}`}>
                                    {React.cloneElement(item.icon as any, { 
                                        size: 18,
                                        className: activeSection === item.id ? 'text-white' : '' 
                                    })}
                                </div>
                                <span className="font-bold text-sm">{item.title}</span>
                            </button>
                        ))}
                    </div>

                    {/* Content Area */}
                    <motion.div 
                        key={activeSection}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:col-span-3 bg-white rounded-3xl p-8 shadow-xl border-2 border-emerald-100"
                    >
                        {activeSection === 'basics' && (
                            <div className="space-y-12">
                                <div className="text-center mb-8">
                                    <h2 className="text-3xl font-bold text-emerald-800 mb-4">The 5 Pillars of Islam</h2>
                                    <p className="text-slate-600 text-lg">Just like a house needs strong pillars to stand, Islam is built on 5 beautiful actions.</p>
                                </div>
                                <div className="grid md:grid-cols-3 gap-6">
                                    {basicsContent.map((pillar, idx) => (
                                        <motion.div 
                                            key={idx}
                                            whileHover={{ y: -5 }}
                                            className="bg-slate-50 p-6 rounded-3xl text-center border border-slate-100 hover:border-emerald-200 transition-all shadow-sm hover:shadow-md"
                                        >
                                            <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-3xl">
                                                {pillar.icon}
                                            </div>
                                            <h3 className="text-xl font-bold text-emerald-800 mb-1">{pillar.title}</h3>
                                            <p className="text-emerald-600 text-xs font-bold uppercase tracking-wider mb-3">{pillar.subtitle}</p>
                                            <p className="text-slate-700 font-medium mb-3">{pillar.description}</p>
                                            <p className="text-slate-500 text-sm leading-relaxed">{pillar.details}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeSection === 'beliefs' && (
                            <div className="space-y-12">
                                <div className="text-center mb-8">
                                    <h2 className="text-3xl font-bold text-emerald-800 mb-4">The 6 Articles of Faith</h2>
                                    <p className="text-slate-600 text-lg">The core beliefs that every Muslim holds in their heart.</p>
                                </div>
                                <div className="grid md:grid-cols-2 gap-6">
                                    {beliefsContent.map((item, idx) => (
                                        <motion.div 
                                            key={idx}
                                            whileHover={{ scale: 1.02 }}
                                            className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-50 flex items-start gap-4 hover:shadow-md transition-all"
                                        >
                                            <div className="bg-emerald-50 p-3 rounded-full flex-shrink-0">
                                                {item.icon}
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-emerald-800 mb-2">{item.title}</h3>
                                                <p className="text-slate-600 leading-relaxed text-lg">{item.content}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                                
                                <div className="bg-emerald-100 rounded-3xl p-8 text-center mt-8 border border-emerald-200">
                                    <h3 className="text-2xl font-bold text-emerald-800 mb-4">Who is Allah?</h3>
                                    <p className="text-emerald-900 text-lg leading-relaxed max-w-3xl mx-auto">
                                        Allah is the Arabic word for God. He is the Creator of the stars, the oceans, the animals, and you! He is not a man or a woman, and He has no partners. He is the Most Merciful and the Most Kind.
                                    </p>
                                </div>
                            </div>
                        )}

                        {activeGuideCategory !== undefined && activeGuideCategory >= 0 && (
                            <div className="space-y-8">
                                <div className="flex items-center gap-4 mb-8 border-b border-slate-200 pb-6">
                                    <div className="bg-white p-4 rounded-2xl shadow-sm">
                                        {React.cloneElement(guideCategories[activeGuideCategory].icon as any, { size: 32 })}
                                    </div>
                                    <div>
                                        <h3 className="text-3xl font-bold text-slate-800">{guideCategories[activeGuideCategory].title}</h3>
                                        <p className="text-emerald-600 font-medium">Step-by-step guidance</p>
                                    </div>
                                </div>
                                
                                <div className="grid gap-6">
                                    {guideCategories[activeGuideCategory].steps.map((step, stepIdx) => (
                                        <motion.div
                                            key={stepIdx}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: stepIdx * 0.1 }}
                                            className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-50 hover:shadow-md transition-all hover:border-emerald-200"
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className="bg-emerald-100 text-emerald-700 w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0 mt-1">
                                                    {stepIdx + 1}
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-emerald-800 text-lg mb-1">{step.title}</h4>
                                                    <p className="text-emerald-600 text-xs font-bold uppercase tracking-wider mb-2">{step.subtitle}</p>
                                                    <p className="text-slate-600 leading-relaxed">{step.content}</p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeSection === 'science' && (
                            <div className="space-y-12">
                                <div className="text-center mb-8">
                                    <h2 className="text-3xl font-bold text-emerald-800 mb-4">Islam & Science</h2>
                                    <p className="text-slate-600 text-lg">Exploring the scientific miracles mentioned in the Quran centuries ago.</p>
                                </div>

                                {scienceTopics.map((topic, idx) => (
                                    <div key={idx} className="bg-white rounded-3xl p-8 shadow-lg border border-emerald-100">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="bg-emerald-50 p-3 rounded-full">
                                                {topic.icon}
                                            </div>
                                            <h3 className="text-2xl font-bold text-emerald-900">{topic.category}</h3>
                                        </div>
                                        
                                        <div className="grid md:grid-cols-2 gap-6">
                                            {topic.items.map((item, itemIdx) => (
                                                <motion.div 
                                                    key={itemIdx}
                                                    whileHover={{ scale: 1.01 }}
                                                    className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:border-emerald-200 transition-colors"
                                                >
                                                    <div className="flex justify-between items-start mb-3">
                                                        <h4 className="font-bold text-slate-800 text-lg">{item.title}</h4>
                                                        <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded-full whitespace-nowrap">
                                                            {item.reference}
                                                        </span>
                                                    </div>
                                                    <p className="text-slate-600 leading-relaxed">{item.content}</p>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeSection === 'ask' && (
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
                </div>

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
                                    <p className="text-xl font-serif text-emerald-800 mb-4 leading-relaxed" dir="rtl">
                                        میں گواہی دیتا ہوں کہ اللہ کے سوا کوئی معبود نہیں اور میں گواہی دیتا ہوں کہ محمد اللہ کے رسول ہیں
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
