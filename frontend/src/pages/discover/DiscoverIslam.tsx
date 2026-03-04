import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Star, Sun, Moon, Cloud, Book, MessageCircle, Sparkles, ArrowRight, X, Volume2, StopCircle, Compass, Atom, Dna, Globe, Leaf, Mountain, Wind, Droplets, Layers, Fingerprint, Target, Users, BookOpen, Clock, Coins, Utensils, MapPin, Scale, Coffee, Calendar, HeartHandshake, Undo, GraduationCap, HelpCircle, TrendingUp, Brain, Building, UserCheck, MessageSquare, Shield, Zap, Maximize, Orbit, Hammer, Baby, Thermometer, CloudRain, Waves, Hexagon, Bug, Network, Trophy, CheckCircle, XCircle, RotateCcw, Play, Loader2, Award, Lock } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from 'react-markdown';
import { Achievement } from '../../data/achievements';
import { useGamification } from '../../contexts/GamificationContext';

interface QuizQuestion {
    question: string;
    options: string[];
    correct: number;
}

const guideCategories = [
    {
        title: "Foundations of Faith",
        icon: <Heart className="text-rose-500" />,
        steps: [
            { title: "The Shahada", subtitle: "The Declaration of Faith", icon: <Fingerprint className="text-rose-500" />, content: "The essential first step is the Shahada: sincerely declaring “There is no god but God, and Muhammad is the Messenger of God.” This statement expresses belief in the oneness of God and acceptance of Prophet Muhammad’s message." },
            { title: "Understanding Tawḥīd", subtitle: "Oneness of God", icon: <Target className="text-rose-500" />, content: "Tawḥīd is the core theological concept — belief that God is one, unique, without partners or equals. Grasping this idea shapes the Muslim worldview, worship, and ethics." },
            { title: "Belief in the Prophets", subtitle: "and Revelation", icon: <Users className="text-rose-500" />, content: "Islam teaches a chain of prophets (including Adam, Abraham, Moses, Jesus, and Muhammad) who brought guidance. Accepting that Prophet Muhammad is the final messenger is key." },
            { title: "The Qur’an", subtitle: "Reading and Respecting", icon: <BookOpen className="text-rose-500" />, content: "The Qur’an is the central scripture. Newcomers should know how it’s organized, the availability of reliable translations, and that respectful reading is encouraged." },
        ]
    },
    {
        title: "Pillars of Action",
        icon: <Sun className="text-amber-500" />,
        steps: [
            { title: "Daily Prayer (Ṣalāh)", subtitle: "Structure & Meaning", icon: <Clock className="text-amber-500" />, content: "Prayer is a five-times-daily practice. Learning the short prayers, their times, and the spiritual purpose behind them (remembrance, discipline, gratitude) makes the ritual approachable." },
            { title: "Wudu", subtitle: "Ritual Purification", icon: <Droplets className="text-amber-500" />, content: "Wudu (ablution) is the simple washing routine performed before prayer. It’s both practical hygiene and symbolic purification." },
            { title: "Zakat & Charity", subtitle: "Social Responsibility", icon: <Coins className="text-amber-500" />, content: "Zakat is a prescribed form of charity. Understanding the ethical purpose — supporting the vulnerable — helps converts align values with practical giving." },
            { title: "Fasting in Ramadan", subtitle: "Purpose and Practice", icon: <Utensils className="text-amber-500" />, content: "Fasting cultivates empathy and discipline. Guidance on fasting rules and the social aspects like ifṭār helps newcomers participate." },
            { title: "Hajj", subtitle: "Pilgrimage Overview", icon: <MapPin className="text-amber-500" />, content: "Hajj is the pilgrimage to Mecca. A high-level explanation of its spiritual significance and basic rites is useful even if Hajj is a distant goal." },
        ]
    },
    {
        title: "Living Islam",
        icon: <Leaf className="text-emerald-500" />,
        steps: [
            { title: "Intention (Niyyah)", subtitle: "Internal Purpose", icon: <Compass className="text-emerald-500" />, content: "Making a conscious inner commitment transforms routine actions into spiritual deeds; teaching newcomers to form simple, sincere intentions helps integrate faith." },
            { title: "Ethics & Morality", subtitle: "Daily Conduct", icon: <Scale className="text-emerald-500" />, content: "Islam emphasizes compassion, honesty, and justice. Practical examples (kindness, fair dealings) demonstrate how faith translates into everyday behavior." },
            { title: "Lifestyle Adjustments", subtitle: "Food & Habits", icon: <Coffee className="text-emerald-500" />, content: "Adopting halal dietary guidelines and mindful social habits. Present these as health- and value-based choices with simple, practical tips." },
            { title: "Daily Habits", subtitle: "Mini-Rituals", icon: <Calendar className="text-emerald-500" />, content: "Simple habits: morning supplications, saying “Bismillah” before meals, and small acts of kindness build spiritual momentum." },
             { title: "Marriage & Family", subtitle: "Guidance", icon: <HeartHandshake className="text-emerald-500" />, content: "Basic Islamic perspectives on marriage, family responsibilities, and rights, emphasizing mutual respect and care." },
        ]
    },
    {
        title: "Personal Growth",
        icon: <Sparkles className="text-purple-500" />,
        steps: [
            { title: "Repentance (Tawbah)", subtitle: "Returning to God", icon: <Undo className="text-purple-500" />, content: "Repentance is immediate: sincere regret, stopping the action, and asking forgiveness. This comforting process helps understand Islam’s path of moral restoration." },
            { title: "Learning & Study", subtitle: "Start Small", icon: <GraduationCap className="text-purple-500" />, content: "A gradual learning plan prevents overwhelm. Suggest curated beginner lessons and short daily readings." },
            { title: "Handling Doubts", subtitle: "Compassionate Inquiry", icon: <HelpCircle className="text-purple-500" />, content: "Doubt is normal. Encourage honest exploration and critical thinking — reassure users that faith can coexist with sincere inquiry." },
            { title: "Gradual Adoption", subtitle: "Patience", icon: <TrendingUp className="text-purple-500" />, content: "Spiritual journeys are personal. Encourage small steps rather than immediate perfection to avoid burnout." },
            { title: "Mental Health", subtitle: "Pastoral Care", icon: <Brain className="text-purple-500" />, content: "Support spiritual and psychological wellbeing. Faith is a source of strength, but professional help is also encouraged for mental health." },
        ]
    },
    {
        title: "Community & Society",
        icon: <Globe className="text-sky-500" />,
        steps: [
            { title: "Find a Community", subtitle: "Local Mosque", icon: <Building className="text-sky-500" />, content: "A welcoming local mosque provides practical help and social support. Guidance on what to expect when visiting a mosque reduces anxiety." },
            { title: "Mentorship", subtitle: "Scholar Guidance", icon: <UserCheck className="text-sky-500" />, content: "Having a trustworthy mentor or qualified scholar to answer questions is invaluable compared to relying solely on internet sources." },
            { title: "Social Dynamics", subtitle: "Family & Friends", icon: <MessageSquare className="text-sky-500" />, content: "Prepare newcomers with communication tips and patience strategies for managing relationships with non-Muslim family and friends." },
            { title: "Community Service", subtitle: "Volunteering", icon: <Heart className="text-sky-500" />, content: "Connecting faith to action through volunteering — practical ways to live values and build a supportive social circle." },
             { title: "Privacy & Safety", subtitle: "Public Identity", icon: <Shield className="text-sky-500" />, content: "Advice on managing online presence and safe ways to share one's journey publicly, especially in sensitive environments." },
        ]
    }
];

const scienceTopics = [
    {
        category: "Astronomy & Physics",
        icon: <Atom className="text-indigo-500" />,
        items: [
            { title: "The Big Bang", reference: "Quran 21:30", icon: <Zap className="text-indigo-500" />, content: "“Do not the disbelievers see that the heavens and the earth were a closed-up mass (ratqan), then We opened them out?” This aligns with the Big Bang theory that the universe began from a single singularity." },
            { title: "Expansion of the Universe", reference: "Quran 51:47", icon: <Maximize className="text-indigo-500" />, content: "“And the heaven We constructed with strength, and indeed, We are [its] expander.” Modern astrophysics confirmed in the 20th century that the universe is continuously expanding." },
            { title: "Orbits of Celestial Bodies", reference: "Quran 21:33", icon: <Orbit className="text-indigo-500" />, content: "“It is He who created the night and the day and the sun and the moon; all [heavenly bodies] in an orbit are swimming.” This accurately describes the motion of celestial bodies." },
            { title: "The Sun's Trajectory", reference: "Quran 36:38", icon: <Sun className="text-indigo-500" />, content: "“And the sun runs [on course] toward its stopping point.” The sun is not stationary; it moves within the Milky Way galaxy." },
            { title: "Iron Sent from Space", reference: "Quran 57:25", icon: <Hammer className="text-indigo-500" />, content: "“And We sent down iron...” Scientists have discovered that iron cannot be formed within the earth; it originated from supernova explosions and was sent down via meteorites." }
        ]
    },
    {
        category: "Human Biology",
        icon: <Dna className="text-rose-500" />,
        items: [
            { title: "Embryonic Development", reference: "Quran 23:12-14", icon: <Baby className="text-rose-500" />, content: "The Quran describes the stages of the fetus: from a drop (Nutfah) to a clinging clot (Alaqah), to a chewed lump (Mudghah), then bones clothed with flesh. This matches modern embryology." },
            { title: "Creation from Water", reference: "Quran 21:30", icon: <Droplets className="text-rose-500" />, content: "“...and made from water every living thing?” Cytoplasm, the basic substance of the cell, is 80% water, and every living organism consists primarily of water." },
            { title: "Pain Receptors", reference: "Quran 4:56", icon: <Thermometer className="text-rose-500" />, content: "The Quran mentions that skins will be replaced so they may taste the punishment, implying that pain receptors are located in the skin, a fact discovered by modern anatomy." },
            { title: "The Frontal Lobe", reference: "Quran 96:15-16", icon: <Brain className="text-rose-500" />, content: "The Quran refers to the “lying, sinning forelock.” Modern neuroscience identifies the prefrontal cortex (forehead area) as the center for decision-making, planning, and lying." }
        ]
    },
    {
        category: "Geology & Earth",
        icon: <Mountain className="text-stone-500" />,
        items: [
            { title: "Mountains as Pegs", reference: "Quran 78:6-7", icon: <Mountain className="text-stone-500" />, content: "“Have We not made the earth a resting place? And the mountains as stakes?” Mountains have deep roots (isostasy) that stabilize the earth's crust, like pegs holding a tent." },
            { title: "The Water Cycle", reference: "Quran 39:21", icon: <CloudRain className="text-stone-500" />, content: "“Do you not see that Allah sends down rain from the sky and makes it flow as springs in the earth?” This describes the infiltration of groundwater, a key part of the water cycle." },
            { title: "Layers of the Atmosphere", reference: "Quran 67:3", icon: <Layers className="text-stone-500" />, content: "“He who created seven heavens in layers.” The atmosphere is composed of distinct layers (troposphere, stratosphere, etc.), each with specific functions." },
            { title: "Barrier Between Seas", reference: "Quran 55:19-20", icon: <Waves className="text-stone-500" />, content: "“He released the two seas... Between them is a barrier which they do not transgress.” Oceanography confirms that bodies of water with different salinities and densities meet but do not immediately mix." }
        ]
    },
    {
        category: "Nature & Zoology",
        icon: <Leaf className="text-green-500" />,
        items: [
            { title: "Pollinating Winds", reference: "Quran 15:22", icon: <Wind className="text-green-500" />, content: "“And We have sent the fertilizing winds...” Winds play a crucial role in pollination for many plants, a botanical fact." },
            { title: "Female Bees", reference: "Quran 16:68-69", icon: <Hexagon className="text-green-500" />, content: "The Quran addresses the bee using the female grammatical gender when describing its work (building hives, gathering nectar). Science confirms worker bees are female." },
            { title: "Communication of Ants", reference: "Quran 27:18", icon: <Bug className="text-green-500" />, content: "“An ant said, 'O ants, enter your dwellings...'” Entomologists have discovered that ants have a complex chemical communication system to warn and guide the colony." },
            { title: "The Spider's Web", reference: "Quran 29:41", icon: <Network className="text-green-500" />, content: "The Quran compares false reliance to a spider's web, noting it is the “weakest of houses.” It also uses the female gender for the spider building the web; biologically, the female builds the web." }
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

    // Quiz State
    const [quizState, setQuizState] = useState<'start' | 'loading' | 'playing' | 'result'>('start');
    const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showExplanation, setShowExplanation] = useState(false);
    const [quizTopic, setQuizTopic] = useState<string>('');
    
    // Achievements State
    const { unlockedAchievements, unlockAchievement, achievements } = useGamification();
    const [showAchievement, setShowAchievement] = useState<Achievement | null>(null);
    const prevUnlockedCount = useRef(unlockedAchievements.length);

    useEffect(() => {
        if (unlockedAchievements.length > prevUnlockedCount.current) {
            const lastId = unlockedAchievements[unlockedAchievements.length - 1];
            const achievement = achievements.find(a => a.id === lastId);
            if (achievement) {
                setShowAchievement(achievement);
                setTimeout(() => setShowAchievement(null), 3000);
            }
        }
        prevUnlockedCount.current = unlockedAchievements.length;
    }, [unlockedAchievements, achievements]);

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
        { id: 'achievements', title: 'Achievements', icon: <Trophy className="text-yellow-500" />, isGuide: false, guideIndex: -1 },
        { id: 'ask', title: 'Ask a Friend', icon: <MessageCircle className="text-emerald-500" />, isGuide: false, guideIndex: -1 }
    ];

    const generateQuiz = async (topic: string) => {
        setQuizTopic(topic);
        setQuizState('loading');
        setActiveSection('quiz');
        
        try {
            const apiKey = import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
            if (!apiKey) throw new Error("API Key missing");
            const ai = new GoogleGenAI({ apiKey });
            const prompt = `Generate 10 multiple-choice questions about "${topic}" in Islam suitable for children. 
            Return ONLY a JSON array with this structure: 
            [{ "question": "string", "options": ["string", "string", "string", "string"], "correct": number (0-3) }]`;
            
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: prompt,
                config: { responseMimeType: "application/json" }
            });
            
            const questions = JSON.parse(response.text);
            setQuizQuestions(questions);
            setQuizState('playing');
            setCurrentQuestion(0);
            setScore(0);
            setSelectedAnswer(null);
            setShowExplanation(false);
        } catch (error) {
            console.error("Quiz generation failed", error);
            setQuizState('start'); // Or show error
        }
    };

    const handleAnswer = (index: number) => {
        if (selectedAnswer !== null) return;
        setSelectedAnswer(index);
        setShowExplanation(true);
        
        let newScore = score;
        if (index === quizQuestions[currentQuestion].correct) {
            newScore = score + 1;
            setScore(newScore);
        }
        
        setTimeout(() => {
            if (currentQuestion < quizQuestions.length - 1) {
                setCurrentQuestion(currentQuestion + 1);
                setSelectedAnswer(null);
                setShowExplanation(false);
            } else {
                setQuizState('result');
                // Check achievements
                achievements.forEach(achievement => {
                    if (achievement.condition(newScore, quizTopic)) {
                        unlockAchievement(achievement.id);
                    }
                });
            }
        }, 1500);
    };

    const resetQuiz = () => {
        setQuizState('start');
        setCurrentQuestion(0);
        setScore(0);
        setSelectedAnswer(null);
        setShowExplanation(false);
    };

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

            const apiKey = import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
            if (!apiKey) throw new Error("API Key missing");

            const ai = new GoogleGenAI({ apiKey });
            
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
            if (!base64Audio) throw new Error("No audio data received");

            return new Promise((resolve) => {
                try {
                    const binaryString = window.atob(base64Audio);
                    const bytes = new Uint8Array(binaryString.length);
                    for (let i = 0; i < binaryString.length; i++) {
                        bytes[i] = binaryString.charCodeAt(i);
                    }
                    
                    if (bytes.length === 0) {
                        throw new Error("Empty audio buffer");
                    }

                    const blob = new Blob([bytes], { type: 'audio/mpeg' }); // Changed to audio/mpeg
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
                        // Fallback to browser TTS if audio element fails
                        fallbackToBrowserTTS(text, lang).then(resolve);
                    };
                    
                    audio.play().catch((e) => {
                        console.error("Audio play failed", e);
                        URL.revokeObjectURL(url);
                        fallbackToBrowserTTS(text, lang).then(resolve);
                    });
                } catch (err) {
                    console.error("Error creating audio blob", err);
                    fallbackToBrowserTTS(text, lang).then(resolve);
                }
            });
        } catch (e) {
            console.error("Gemini TTS failed, fallback to browser", e);
            return fallbackToBrowserTTS(text, lang);
        }
    };

    const fallbackToBrowserTTS = (text: string, lang: string): Promise<void> => {
        return new Promise((resolve) => {
            if (!window.speechSynthesis) {
                resolve();
                return;
            }
            
            // Cancel any ongoing speech
            window.speechSynthesis.cancel();

            const u = new SpeechSynthesisUtterance(text);
            u.lang = lang;
            
            // Handle end and error events
            u.onend = () => resolve();
            u.onerror = (e) => {
                console.error("Browser TTS error", e);
                resolve();
            };
            
            window.speechSynthesis.speak(u);
        });
    };

    const playShahadaSequence = async () => {
        if (isShahadaPlaying) {
            stopShahadaAudio();
            return;
        }
        
        setIsShahadaPlaying(true);
        playingRef.current = true;

        const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

        // 1. Arabic Segments
        const arabicSegments = [
            "Ash-hadu",
            "an la ilaha",
            "illa Allah,",
            "wa ash-hadu",
            "anna",
            "Muhammadan",
            "Rasul Allah"
        ];

        for (const segment of arabicSegments) {
            if (!playingRef.current) return;
            await speak(segment, "ar-SA");
            await delay(1000);
        }

        if (!playingRef.current) return;

        // 2. Urdu Segments
        const urduSegments = [
            "میں گواہی دیتا ہوں کہ",
            "اللہ کے سوا کوئی معبود نہیں",
            "اور میں گواہی دیتا ہوں",
            "کہ محمد اللہ کے رسول ہیں"
        ];

        for (const segment of urduSegments) {
            if (!playingRef.current) return;
            await speak(segment, "ur-PK");
            await delay(1000);
        }

        if (!playingRef.current) return;

        // 3. English Segments
        const englishSegments = [
            "I bear witness",
            "that there is no god",
            "but Allah,",
            "and I bear witness",
            "that Muhammad",
            "is the Messenger of Allah"
        ];

        for (const segment of englishSegments) {
            if (!playingRef.current) return;
            await speak(segment, "en-US");
            await delay(1000);
        }

        if (!playingRef.current) return;

        // 4. Explanation
        await speak("What does this mean?", "en-US");
        await delay(1000);

        const explanations = [
            "You believe that Allah is the only God who created and loves us.",
            "You believe that Muhammad (peace be upon him) is His final messenger who taught us how to be good.",
            "Saying this with your heart makes you a Muslim!"
        ];

        for (const explanation of explanations) {
            if (!playingRef.current) return;
            await speak(explanation, "en-US");
            await delay(1000);
        }
        
        setIsShahadaPlaying(false);
        playingRef.current = false;
    };

    const handleAskQuestion = async () => {
        if (!chatInput.trim()) return;
        setLoading(true);
        try {
            const apiKey = import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
            if (!apiKey) throw new Error("API Key missing");
            const ai = new GoogleGenAI({ apiKey });
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
        <div className="min-h-screen bg-gradient-to-b from-sky-100 to-emerald-50 pb-32 font-sans selection:bg-yellow-200 selection:text-emerald-900">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-emerald-500 text-white p-8 md:p-12 rounded-b-[3rem] shadow-xl border-b-8 border-emerald-600">
                <div className="absolute top-0 left-0 w-full h-full opacity-20">
                    <Cloud size={300} className="absolute -top-10 -left-10 text-white animate-pulse" />
                    <Star size={100} className="absolute top-20 right-20 text-yellow-300" />
                    <Moon size={150} className="absolute bottom-0 right-0 text-white" />
                </div>
                <div className="relative z-10 text-center mt-8">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="inline-block bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full mb-4 border-2 border-white/30"
                    >
                        <span className="font-black uppercase tracking-widest text-sm text-yellow-300 drop-shadow-md">Adventure Time! 🌍</span>
                    </motion.div>
                    <motion.h1 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-black mb-6 drop-shadow-lg"
                    >
                        Discover Peace
                    </motion.h1>
                    <p className="text-xl md:text-2xl text-emerald-50 max-w-2xl mx-auto font-bold leading-relaxed">
                        Welcome to a journey of love, kindness, and understanding. 
                        Let's explore the beautiful world of Islam together! 🚀
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-12 max-w-6xl">
                <div className="grid md:grid-cols-4 gap-8">
                    {/* Sidebar Navigation */}
                    <div className="md:col-span-1 space-y-3">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveSection(item.id)}
                                className={`w-full text-left p-4 rounded-2xl transition-all flex items-center gap-3 font-bold border-2 shadow-sm active:scale-95 ${
                                    activeSection === item.id
                                        ? 'bg-emerald-500 text-white border-emerald-600 shadow-emerald-200'
                                        : 'bg-white text-slate-600 border-slate-100 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-600'
                                }`}
                            >
                                <div className={`p-2 rounded-xl ${activeSection === item.id ? 'bg-white/20' : 'bg-emerald-50'}`}>
                                    {React.cloneElement(item.icon as any, { 
                                        size: 20,
                                        strokeWidth: 3,
                                        className: activeSection === item.id ? 'text-white' : '' 
                                    })}
                                </div>
                                <span className="text-sm">{item.title}</span>
                            </button>
                        ))}
                    </div>

                    {/* Content Area */}
                    <motion.div 
                        key={activeSection}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:col-span-3 bg-white rounded-[2.5rem] p-8 md:p-10 shadow-2xl border-4 border-emerald-100 relative overflow-hidden"
                    >
                        {/* Decorative background blob */}
                        <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-50 rounded-full opacity-50 blur-3xl pointer-events-none" />

                        {activeSection === 'basics' && (
                            <div className="space-y-12 relative z-10">
                                <div className="text-center mb-10">
                                    <h2 className="text-4xl font-black text-emerald-600 mb-4 flex items-center justify-center gap-3">
                                        <Star className="text-yellow-400 fill-yellow-400" size={40} />
                                        The 5 Pillars of Islam
                                    </h2>
                                    <p className="text-slate-500 text-lg font-bold">Just like a house needs strong pillars to stand, Islam is built on 5 beautiful actions! 🏠</p>
                                </div>
                                <div className="grid grid-cols-1 gap-6">
                                    {basicsContent.map((pillar, idx) => (
                                        <motion.div 
                                            key={idx}
                                            whileHover={{ y: -8 }}
                                            className="bg-white p-6 rounded-[2rem] border-4 border-slate-100 hover:border-emerald-300 transition-all shadow-sm hover:shadow-xl group flex items-start gap-6 text-left"
                                        >
                                            <div className="bg-emerald-50 w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-inner group-hover:scale-110 transition-transform duration-300">
                                                {React.cloneElement(pillar.icon as any, { size: 40, strokeWidth: 2.5 })}
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-black text-emerald-700 mb-2">{pillar.title}</h3>
                                                <p className="text-emerald-500 text-xs font-black uppercase tracking-widest mb-2 bg-emerald-50 py-1 px-3 rounded-full inline-block">{pillar.subtitle}</p>
                                                <p className="text-slate-700 font-bold mb-2 text-lg">{pillar.description}</p>
                                                <p className="text-slate-500 text-sm leading-relaxed font-medium">{pillar.details}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                                <div className="text-center mt-10">
                                    <button 
                                        onClick={() => generateQuiz('basics')}
                                        className="bg-emerald-500 text-white px-10 py-4 rounded-2xl font-black hover:bg-emerald-600 transition-all shadow-[0_6px_0_#059669] active:shadow-none active:translate-y-[6px] flex items-center gap-3 mx-auto text-lg"
                                    >
                                        <Play size={24} fill="currentColor" /> Take a Fun Quiz!
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeSection === 'beliefs' && (
                            <div className="space-y-12 relative z-10">
                                <div className="text-center mb-10">
                                    <h2 className="text-4xl font-black text-emerald-600 mb-4 flex items-center justify-center gap-3">
                                        <Heart className="text-rose-400 fill-rose-400" size={40} />
                                        The 6 Articles of Faith
                                    </h2>
                                    <p className="text-slate-500 text-lg font-bold">The core beliefs that every Muslim holds in their heart. ❤️</p>
                                </div>
                                <div className="grid md:grid-cols-2 gap-6">
                                    {beliefsContent.map((item, idx) => (
                                        <motion.div 
                                            key={idx}
                                            whileHover={{ scale: 1.02 }}
                                            className="bg-white p-6 rounded-[2rem] shadow-sm border-4 border-emerald-50 flex items-start gap-5 hover:shadow-lg transition-all hover:border-emerald-200"
                                        >
                                            <div className="bg-emerald-100 p-4 rounded-2xl flex-shrink-0 text-emerald-600">
                                                {React.cloneElement(item.icon as any, { size: 28, strokeWidth: 3 })}
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-black text-emerald-800 mb-2">{item.title}</h3>
                                                <p className="text-slate-600 leading-relaxed text-lg font-medium">{item.content}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                                
                                <div className="bg-emerald-50 rounded-[2.5rem] p-10 text-center mt-10 border-4 border-emerald-100 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-200 rounded-full -mr-10 -mt-10 opacity-20" />
                                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-yellow-200 rounded-full -ml-10 -mb-10 opacity-30" />
                                    
                                    <h3 className="text-3xl font-black text-emerald-800 mb-4 relative z-10">Who is Allah?</h3>
                                    <p className="text-emerald-900 text-xl leading-relaxed max-w-3xl mx-auto font-medium relative z-10">
                                        Allah is the Arabic word for God. He is the Creator of the stars, the oceans, the animals, and you! He is not a man or a woman, and He has no partners. He is the Most Merciful and the Most Kind. 🌟
                                    </p>
                                </div>
                                <div className="text-center mt-10">
                                    <button 
                                        onClick={() => generateQuiz('beliefs')}
                                        className="bg-emerald-500 text-white px-10 py-4 rounded-2xl font-black hover:bg-emerald-600 transition-all shadow-[0_6px_0_#059669] active:shadow-none active:translate-y-[6px] flex items-center gap-3 mx-auto text-lg"
                                    >
                                        <Play size={24} fill="currentColor" /> Take a Quiz on Faith
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeGuideCategory !== undefined && activeGuideCategory >= 0 && (
                            <div className="space-y-8 relative z-10">
                                <div className="flex items-center gap-6 mb-10 border-b-4 border-slate-100 pb-8">
                                    <div className="bg-emerald-100 p-6 rounded-[2rem] shadow-sm text-emerald-600">
                                        {React.cloneElement(guideCategories[activeGuideCategory].icon as any, { size: 48, strokeWidth: 2.5 })}
                                    </div>
                                    <div>
                                        <h3 className="text-4xl font-black text-slate-800 mb-2">{guideCategories[activeGuideCategory].title}</h3>
                                        <p className="text-emerald-500 font-bold text-lg uppercase tracking-wider bg-emerald-50 px-4 py-1 rounded-full inline-block">Step-by-step guidance</p>
                                    </div>
                                </div>
                                
                                <div className="grid gap-6">
                                    {guideCategories[activeGuideCategory].steps.map((step, stepIdx) => (
                                        <motion.div
                                            key={stepIdx}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: stepIdx * 0.1 }}
                                            className="bg-white p-8 rounded-[2rem] shadow-sm border-4 border-emerald-50 hover:shadow-lg transition-all hover:border-emerald-200 group"
                                        >
                                            <div className="flex items-start gap-6">
                                                <div className="bg-emerald-100 text-emerald-700 w-16 h-16 rounded-2xl flex items-center justify-center font-black text-xl flex-shrink-0 mt-1 shadow-inner group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300">
                                                    {step.icon ? React.cloneElement(step.icon as any, { size: 28, strokeWidth: 2.5 }) : stepIdx + 1}
                                                </div>
                                                <div>
                                                    <h4 className="font-black text-emerald-800 text-2xl mb-2">{step.title}</h4>
                                                    <p className="text-emerald-500 text-xs font-black uppercase tracking-widest mb-3 bg-emerald-50 px-3 py-1 rounded-full inline-block">{step.subtitle}</p>
                                                    <p className="text-slate-600 leading-relaxed text-lg font-medium">{step.content}</p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                                <div className="text-center mt-10">
                                    <button 
                                        onClick={() => generateQuiz(`guide-${guideCategories[activeGuideCategory].title}`)}
                                        className="bg-emerald-500 text-white px-10 py-4 rounded-2xl font-black hover:bg-emerald-600 transition-all shadow-[0_6px_0_#059669] active:shadow-none active:translate-y-[6px] flex items-center gap-3 mx-auto text-lg"
                                    >
                                        <Play size={24} fill="currentColor" /> Quiz Time! 🧠
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeSection === 'science' && (
                            <div className="space-y-12 relative z-10">
                                <div className="text-center mb-10">
                                    <h2 className="text-4xl font-black text-emerald-600 mb-4 flex items-center justify-center gap-3">
                                        <Atom className="text-indigo-500" size={40} />
                                        Islam & Science
                                    </h2>
                                    <p className="text-slate-600 text-lg font-bold">Exploring the scientific miracles mentioned in the Quran centuries ago! 🧪</p>
                                </div>

                                {scienceTopics.map((topic, idx) => (
                                    <div key={idx} className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-lg border-4 border-emerald-100 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-50 rounded-bl-full -mr-10 -mt-10 opacity-50" />
                                        
                                        <div className="flex items-center gap-4 mb-8 relative z-10">
                                            <div className="bg-emerald-100 p-4 rounded-2xl text-emerald-600">
                                                {React.cloneElement(topic.icon as any, { size: 32, strokeWidth: 2.5 })}
                                            </div>
                                            <h3 className="text-3xl font-black text-emerald-900">{topic.category}</h3>
                                        </div>
                                        
                                        <div className="grid md:grid-cols-2 gap-6 relative z-10">
                                            {topic.items.map((item, itemIdx) => (
                                                <motion.div 
                                                    key={itemIdx}
                                                    whileHover={{ scale: 1.02 }}
                                                    className="bg-slate-50 p-6 rounded-[2rem] border-2 border-slate-100 hover:border-emerald-300 transition-all hover:bg-white hover:shadow-md"
                                                >
                                                    <div className="flex justify-between items-start mb-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="bg-white p-3 rounded-xl shadow-sm text-emerald-600">
                                                                {item.icon && React.cloneElement(item.icon as any, { size: 20, strokeWidth: 2.5 })}
                                                            </div>
                                                            <h4 className="font-black text-slate-800 text-lg">{item.title}</h4>
                                                        </div>
                                                        <span className="bg-emerald-100 text-emerald-700 text-[10px] font-black px-3 py-1 rounded-full whitespace-nowrap uppercase tracking-wider">
                                                            {item.reference}
                                                        </span>
                                                    </div>
                                                    <p className="text-slate-600 leading-relaxed font-medium">{item.content}</p>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                                <div className="text-center mt-10">
                                    <button 
                                        onClick={() => generateQuiz('science')}
                                        className="bg-emerald-500 text-white px-10 py-4 rounded-2xl font-black hover:bg-emerald-600 transition-all shadow-[0_6px_0_#059669] active:shadow-none active:translate-y-[6px] flex items-center gap-3 mx-auto text-lg"
                                    >
                                        <Play size={24} fill="currentColor" /> Take a Science Quiz!
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeSection === 'achievements' && (
                            <div className="max-w-5xl mx-auto relative z-10">
                                <div className="text-center mb-10">
                                    <h2 className="text-4xl font-black text-emerald-800 mb-4 flex items-center justify-center gap-3">
                                        <Trophy className="text-yellow-500 fill-yellow-500" size={40} />
                                        Your Achievements
                                    </h2>
                                    <p className="text-slate-600 text-lg font-bold">Collect badges as you learn! Can you get them all? 🏆</p>
                                </div>
                                
                                <div className="grid grid-cols-1 gap-6">
                                    {achievements.map((achievement) => {
                                        const isUnlocked = unlockedAchievements.includes(achievement.id);
                                        return (
                                            <motion.div 
                                                key={achievement.id}
                                                whileHover={{ scale: 1.02 }}
                                                className={`p-6 rounded-[2rem] border-4 transition-all relative overflow-hidden flex items-center gap-6 text-left ${
                                                    isUnlocked 
                                                        ? 'bg-white border-emerald-200 shadow-lg' 
                                                        : 'bg-slate-50 border-slate-100 opacity-70 grayscale'
                                                }`}
                                            >
                                                {isUnlocked && <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-100 rounded-bl-full -mr-8 -mt-8 opacity-50" />}
                                                
                                                <div className="text-5xl transform transition-transform hover:scale-110 duration-300 flex-shrink-0">{achievement.icon}</div>
                                                <div>
                                                    <h3 className="font-black text-slate-800 text-lg mb-1 uppercase tracking-wide">{achievement.title}</h3>
                                                    <p className="text-sm text-slate-500 font-bold leading-relaxed">{achievement.description}</p>
                                                    {!isUnlocked && (
                                                        <div className="mt-2 bg-slate-200 text-slate-500 text-[10px] font-black uppercase tracking-widest py-1 px-3 rounded-full inline-flex items-center gap-1">
                                                            <Lock size={10} /> Locked
                                                        </div>
                                                    )}
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {activeSection === 'quiz' && (
                            <div className="max-w-3xl mx-auto relative z-10">
                                {quizState === 'loading' && (
                                    <div className="text-center py-20 flex flex-col items-center gap-6">
                                        <div className="w-20 h-20 border-8 border-emerald-100 border-t-emerald-500 rounded-full animate-spin" />
                                        <h3 className="text-2xl font-black text-slate-700 animate-pulse">Cooking up a fun quiz... 🍳</h3>
                                    </div>
                                )}

                                {quizState === 'playing' && (
                                    <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border-4 border-emerald-100 relative overflow-hidden">
                                        <div className="absolute top-0 left-0 w-full h-2 bg-slate-100">
                                            <div 
                                                className="h-full bg-emerald-500 transition-all duration-500 ease-out"
                                                style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                                            />
                                        </div>

                                        <div className="flex justify-between items-center mb-10 mt-4">
                                            <span className="font-black text-slate-400 uppercase tracking-widest text-sm bg-slate-100 px-4 py-2 rounded-full">
                                                Question {currentQuestion + 1} / {quizQuestions.length}
                                            </span>
                                            <span className="font-black text-emerald-600 uppercase tracking-widest text-sm bg-emerald-100 px-4 py-2 rounded-full flex items-center gap-2">
                                                <Star size={14} fill="currentColor" /> Score: {score}
                                            </span>
                                        </div>

                                        <h3 className="text-3xl font-black text-slate-800 mb-10 leading-relaxed">
                                            {quizQuestions[currentQuestion].question}
                                        </h3>

                                        <div className="space-y-4">
                                            {quizQuestions[currentQuestion].options.map((option, idx) => {
                                                const isSelected = selectedAnswer === idx;
                                                const isCorrect = idx === quizQuestions[currentQuestion].correct;
                                                const showResult = selectedAnswer !== null;
                                                
                                                let buttonClass = "w-full p-5 rounded-2xl text-left font-bold text-lg transition-all border-4 shadow-sm ";
                                                if (showResult) {
                                                    if (isCorrect) buttonClass += "bg-emerald-100 border-emerald-500 text-emerald-800";
                                                    else if (isSelected) buttonClass += "bg-rose-100 border-rose-500 text-rose-800";
                                                    else buttonClass += "bg-slate-50 border-slate-100 text-slate-400 opacity-50";
                                                } else {
                                                    buttonClass += "bg-white border-slate-100 hover:border-emerald-300 hover:bg-emerald-50 text-slate-700 hover:shadow-md active:scale-[0.99]";
                                                }

                                                return (
                                                    <button
                                                        key={idx}
                                                        onClick={() => handleAnswer(idx)}
                                                        disabled={selectedAnswer !== null}
                                                        className={buttonClass}
                                                    >
                                                        <div className="flex justify-between items-center">
                                                            <span>{option}</span>
                                                            {showResult && isCorrect && <CheckCircle className="text-emerald-600" size={28} strokeWidth={3} />}
                                                            {showResult && isSelected && !isCorrect && <XCircle className="text-rose-600" size={28} strokeWidth={3} />}
                                                        </div>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                {quizState === 'result' && (
                                    <div className="text-center bg-white rounded-[3rem] p-12 shadow-2xl border-8 border-emerald-100 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-50 rounded-full -mr-20 -mt-20 opacity-50" />
                                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-50 rounded-full -ml-20 -mb-20 opacity-50" />
                                        
                                        <div className="mb-8 relative z-10">
                                            {score === quizQuestions.length ? (
                                                <motion.div 
                                                    initial={{ scale: 0, rotate: -180 }}
                                                    animate={{ scale: 1, rotate: 0 }}
                                                    className="w-32 h-32 bg-yellow-100 rounded-full flex items-center justify-center mx-auto text-yellow-500 shadow-lg border-4 border-yellow-200"
                                                >
                                                    <Trophy size={64} strokeWidth={2.5} />
                                                </motion.div>
                                            ) : score > quizQuestions.length / 2 ? (
                                                <motion.div 
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    className="w-32 h-32 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-500 shadow-lg border-4 border-emerald-200"
                                                >
                                                    <Star size={64} strokeWidth={2.5} />
                                                </motion.div>
                                            ) : (
                                                <motion.div 
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    className="w-32 h-32 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400 shadow-lg border-4 border-slate-200"
                                                >
                                                    <RotateCcw size={64} strokeWidth={2.5} />
                                                </motion.div>
                                            )}
                                        </div>
                                        
                                        <h3 className="text-4xl font-black text-slate-800 mb-4 relative z-10">Quiz Complete! 🎉</h3>
                                        <p className="text-2xl text-slate-600 mb-10 font-medium relative z-10">
                                            You scored <span className="font-black text-emerald-500 text-3xl">{score}</span> out of <span className="font-black text-slate-800 text-3xl">{quizQuestions.length}</span>
                                        </p>

                                        <div className="flex flex-col md:flex-row gap-4 justify-center relative z-10">
                                            <button 
                                                onClick={() => setActiveSection('achievements')}
                                                className="bg-slate-100 text-slate-700 px-8 py-4 rounded-2xl font-black hover:bg-slate-200 transition-colors flex items-center justify-center gap-3 shadow-sm border-2 border-slate-200"
                                            >
                                                <Award size={24} /> View Achievements
                                            </button>
                                            <button 
                                                onClick={() => generateQuiz(quizTopic)}
                                                className="bg-emerald-500 text-white px-8 py-4 rounded-2xl font-black hover:bg-emerald-600 transition-all shadow-[0_6px_0_#059669] active:shadow-none active:translate-y-[6px] flex items-center justify-center gap-3"
                                            >
                                                <RotateCcw size={24} /> Try Another Quiz
                                            </button>
                                        </div>
                                    </div>
                                )}
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
