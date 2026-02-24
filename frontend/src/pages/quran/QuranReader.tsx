import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Play, Pause, BookOpen, Sparkles, Search, Download, Check, WifiOff, HelpCircle, Volume2, StopCircle } from 'lucide-react';
import { useGamification } from '../../contexts/GamificationContext';
import { GoogleGenAI } from "@google/genai";

interface Aya {
    number: number;
    text: string;
    translation: string;
    urduTranslation: string;
    audio: string;
    urduAudio: string;
    englishAudio: string;
}

interface SurahInfo {
    number: number;
    name: string;
    englishName: string;
    englishNameTranslation: string;
    numberOfAyahs: number;
    revelationType: string;
}

interface TafseerData {
    explanation: string;
    englishExplanation: string;
    didYouKnow: string;
    quiz: {
        question: string;
        options: string[];
        correctIndex: number;
    };
}

const QuranReader = () => {
    const [sura, setSura] = useState(1);
    const [ayas, setAyas] = useState<Aya[]>([]);
    const [surahInfo, setSurahInfo] = useState<SurahInfo | null>(null);
    const [loading, setLoading] = useState(false);
    
    // Audio State
    const [playingAya, setPlayingAya] = useState<number | null>(null);
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const currentUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
    const [audioQueue, setAudioQueue] = useState<string[]>([]);
    const [currentQueueIndex, setCurrentQueueIndex] = useState(0);
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    
    // Tafseer State
    const [tafseerOpen, setTafseerOpen] = useState<number | null>(null);
    const [tafseerData, setTafseerData] = useState<TafseerData | null>(null);
    const [tafseerLoading, setTafseerLoading] = useState(false);
    const [quizAnswered, setQuizAnswered] = useState(false);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isCorrect, setIsCorrect] = useState(false);
    const [isTafseerPlaying, setIsTafseerPlaying] = useState(false);

    // Search State
    const [allSurahs, setAllSurahs] = useState<SurahInfo[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    // Offline State
    const [isOffline, setIsOffline] = useState(!navigator.onLine);
    const [downloading, setDownloading] = useState(false);
    const [isDownloaded, setIsDownloaded] = useState(false);

    const { addPoints, unlockBadge } = useGamification();

    // Load voices
    useEffect(() => {
        const loadVoices = () => {
            const availableVoices = window.speechSynthesis.getVoices();
            setVoices(availableVoices);
        };

        loadVoices();
        if (window.speechSynthesis.onvoiceschanged !== undefined) {
            window.speechSynthesis.onvoiceschanged = loadVoices;
        }
    }, []);

    // Check online status
    useEffect(() => {
        const handleOnline = () => setIsOffline(false);
        const handleOffline = () => setIsOffline(true);
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    // Fetch list of all Surahs for search
    useEffect(() => {
        const fetchAllSurahs = async () => {
            try {
                const res = await axios.get('https://api.alquran.cloud/v1/surah');
                setAllSurahs(res.data.data);
            } catch (err) {
                console.error("Failed to fetch surah list", err);
            }
        };
        fetchAllSurahs();
    }, []);

    // Check if Surah is downloaded
    useEffect(() => {
        const checkDownloadStatus = async () => {
            if ('caches' in window) {
                const cache = await caches.open('quran-audio');
                if (ayas.length > 0) {
                    const match = await cache.match(ayas[0].audio);
                    setIsDownloaded(!!match);
                }
            }
        };
        checkDownloadStatus();
    }, [sura, ayas]);

    useEffect(() => {
        const fetchSura = async () => {
            setLoading(true);
            setTafseerOpen(null);
            stopAudio();
            stopTafseerAudio();
            try {
                // Fetch Arabic Text
                const arabicRes = await axios.get(`https://api.alquran.cloud/v1/surah/${sura}`);
                // Fetch English Translation
                const transRes = await axios.get(`https://api.alquran.cloud/v1/surah/${sura}/en.sahih`);
                // Fetch Urdu Translation
                const urduRes = await axios.get(`https://api.alquran.cloud/v1/surah/${sura}/ur.jalandhry`);
                // Fetch Arabic Audio
                const audioRes = await axios.get(`https://api.alquran.cloud/v1/surah/${sura}/ar.alafasy`);
                // Fetch Urdu Audio
                const urduAudioRes = await axios.get(`https://api.alquran.cloud/v1/surah/${sura}/ur.khan`);
                // Fetch English Audio
                const englishAudioRes = await axios.get(`https://api.alquran.cloud/v1/surah/${sura}/en.walk`);

                setSurahInfo(arabicRes.data.data);

                const arabicAyahs = arabicRes.data.data.ayahs;
                const transAyahs = transRes.data.data.ayahs;
                const urduAyahs = urduRes.data.data.ayahs;
                const audioAyahs = audioRes.data.data.ayahs;
                const urduAudioAyahs = urduAudioRes.data.data.ayahs;
                const englishAudioAyahs = englishAudioRes.data.data.ayahs;

                let processedAyahs: Aya[] = [];

                if (sura === 1) {
                    // Special handling for Fatiha
                    processedAyahs = arabicAyahs.slice(1).map((aya: any, idx: number) => ({
                        number: idx + 1,
                        text: aya.text,
                        translation: transAyahs[idx + 1].text,
                        urduTranslation: urduAyahs[idx + 1].text,
                        audio: audioAyahs[idx + 1].audio,
                        urduAudio: urduAudioAyahs[idx + 1].audio,
                        englishAudio: englishAudioAyahs[idx + 1].audio
                    }));
                } else {
                    processedAyahs = arabicAyahs.map((aya: any, idx: number) => {
                        let text = aya.text;
                        if (sura !== 9 && idx === 0) {
                            const bismillahVariations = [
                                "بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ",
                                "بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ"
                            ];
                            for (const b of bismillahVariations) {
                                if (text.startsWith(b)) {
                                    text = text.replace(b, '').trim();
                                }
                            }
                        }

                        return {
                            number: aya.numberInSurah,
                            text: text,
                            translation: transAyahs[idx].text,
                            urduTranslation: urduAyahs[idx].text,
                            audio: audioAyahs[idx].audio,
                            urduAudio: urduAudioAyahs[idx].audio,
                            englishAudio: englishAudioAyahs[idx].audio
                        };
                    });
                }

                if (sura !== 9) {
                    const bismillahAyah: Aya = {
                        number: 0,
                        text: "بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ",
                        translation: "In the name of Allah, the Entirely Merciful, the Especially Merciful.",
                        urduTranslation: "شروع اللہ کے نام سے جو بڑا مہربان نہایت رحم والا ہے",
                        audio: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/1.mp3",
                        urduAudio: "https://cdn.islamic.network/quran/audio/64/ur.khan/1.mp3",
                        englishAudio: "https://cdn.islamic.network/quran/audio/192/en.walk/1.mp3"
                    };
                    processedAyahs.unshift(bismillahAyah);
                }

                setAyas(processedAyahs);
                addPoints(10);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchSura();
    }, [sura]);

    const downloadSurahAudio = async () => {
        if (!('caches' in window)) return;
        setDownloading(true);
        try {
            const cache = await caches.open('quran-audio');
            // Download all audio versions
            const promises = ayas.flatMap(aya => [
                cache.add(aya.audio),
                cache.add(aya.urduAudio),
                cache.add(aya.englishAudio)
            ]);
            await Promise.all(promises);
            setIsDownloaded(true);
            addPoints(50);
            alert("Surah downloaded for offline listening!");
        } catch (err) {
            console.error("Download failed", err);
            alert("Failed to download. Please check your connection.");
        } finally {
            setDownloading(false);
        }
    };

    const playNextInQueue = async (queue: string[], index: number) => {
        if (index >= queue.length) {
            setPlayingAya(null);
            setAudioQueue([]);
            setCurrentQueueIndex(0);
            addPoints(5);
            unlockBadge('first_step');
            return;
        }

        let playUrl = queue[index];
        if ('caches' in window) {
            const cache = await caches.open('quran-audio');
            const response = await cache.match(playUrl);
            if (response) {
                const blob = await response.blob();
                playUrl = URL.createObjectURL(blob);
            }
        }

        const newAudio = new Audio(playUrl);
        newAudio.play();
        setAudio(newAudio);
        audioRef.current = newAudio;
        
        newAudio.onended = () => {
            setCurrentQueueIndex(index + 1);
            playNextInQueue(queue, index + 1);
        };
    };

    const playAudioSequence = (aya: Aya) => {
        if (playingAya === aya.number) {
            stopAudio();
            return;
        }

        stopAudio();
        stopTafseerAudio();
        setPlayingAya(aya.number);
        const queue = [aya.audio, aya.urduAudio, aya.englishAudio];
        setAudioQueue(queue);
        setCurrentQueueIndex(0);
        playNextInQueue(queue, 0);
    };

    const stopAudio = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current = null;
        }
        setAudio(null);
        setPlayingAya(null);
        setAudioQueue([]);
        setCurrentQueueIndex(0);
    };

    // Tafseer Audio Logic
    const speak = (text: string, lang: string): Promise<void> => {
        return new Promise((resolve) => {
            if (!window.speechSynthesis) {
                console.error("Speech Synthesis not supported");
                resolve();
                return;
            }

            const safeText = text || "";
            if (safeText.trim().length === 0) {
                console.warn("Empty text for TTS");
                resolve();
                return;
            }
            
            const utterance = new SpeechSynthesisUtterance(safeText);
            utterance.lang = lang;
            utterance.rate = 0.9; 
            
            // Try to find a matching voice
            if (voices.length > 0) {
                let voice = voices.find(v => v.lang === lang);
                if (!voice) {
                    voice = voices.find(v => v.lang.startsWith(lang.split('-')[0]));
                }
                if (voice) {
                    utterance.voice = voice;
                    console.log(`Using voice: ${voice.name} for ${lang}`);
                } else {
                    console.warn(`No voice found for ${lang}, using default`);
                }
            }

            // Keep reference to prevent garbage collection
            currentUtteranceRef.current = utterance;

            const timeoutId = setTimeout(() => {
                console.warn("TTS timed out");
                resolve();
            }, Math.max(2000, safeText.length * 100)); // Dynamic timeout

            utterance.onend = () => {
                clearTimeout(timeoutId);
                currentUtteranceRef.current = null;
                resolve();
            };
            
            utterance.onerror = (e) => {
                console.error("TTS Error:", e);
                clearTimeout(timeoutId);
                currentUtteranceRef.current = null;
                resolve(); 
            };

            console.log(`Speaking (${lang}): ${safeText.substring(0, 50)}...`);
            window.speechSynthesis.speak(utterance);
        });
    };

    const playTafseerSequence = async () => {
        if (!tafseerData) {
            console.warn("No Tafseer data to play");
            return;
        }
        
        if (isTafseerPlaying) {
            stopTafseerAudio();
            return;
        }

        console.log("Starting Tafseer sequence");
        setIsTafseerPlaying(true);
        stopAudio(); 

        window.speechSynthesis.cancel();

        // 1. Urdu Explanation
        console.log("Step 1: Urdu");
        await new Promise(r => setTimeout(r, 100));
        await speak(tafseerData.explanation, 'ur');
        
        if (!isTafseerPlaying) return; 

        // 2. English Explanation
        console.log("Step 2: English");
        await new Promise(r => setTimeout(r, 500));
        await speak(tafseerData.englishExplanation, 'en-US');

        if (!isTafseerPlaying) return;

        // 3. Did You Know
        console.log("Step 3: Did You Know");
        await new Promise(r => setTimeout(r, 500));
        await speak("Did you know? " + tafseerData.didYouKnow, 'en-US');

        if (!isTafseerPlaying) return;

        // 4. Quiz Question
        console.log("Step 4: Quiz");
        await new Promise(r => setTimeout(r, 500));
        await speak("Quiz time! " + tafseerData.quiz.question, 'en-US');

        console.log("Tafseer sequence finished");
        setIsTafseerPlaying(false);
    };

    const stopTafseerAudio = () => {
        if (window.speechSynthesis) {
            window.speechSynthesis.cancel();
        }
        setIsTafseerPlaying(false);
        currentUtteranceRef.current = null;
    };

    const fetchTafseer = async (aya: Aya) => {
        if (tafseerOpen === aya.number) {
            setTafseerOpen(null);
            stopTafseerAudio();
            return;
        }

        stopTafseerAudio();
        setTafseerOpen(aya.number);
        setTafseerData(null);
        setQuizAnswered(false);
        setSelectedOption(null);
        setIsCorrect(false);
        setTafseerLoading(true);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
            const prompt = `
            You are an Islamic teacher for kids. Provide a JSON response with:
            1. "explanation": A very simple, kid-friendly Tafseer (explanation) in Urdu for the following Quran Ayah.
            2. "englishExplanation": A very simple, kid-friendly Tafseer (explanation) in English for the following Quran Ayah.
            3. "didYouKnow": A fun fact related to this Ayah or Surah in English.
            4. "quiz": A simple multiple choice question object with "question" (string), "options" (array of 3 strings), and "correctIndex" (number 0-2).

            Surah: ${surahInfo?.englishName} (${sura}), Ayah: ${aya.number}
            Arabic: ${aya.text}
            Urdu Translation: ${aya.urduTranslation}
            English Translation: ${aya.translation}
            
            Format: JSON only. No markdown.
            `;

            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: prompt,
                config: { responseMimeType: "application/json" }
            });

            const data = JSON.parse(response.text);
            setTafseerData(data);
            
            addPoints(20);
            unlockBadge('scholar_junior');
        } catch (err) {
            console.error(err);
            setTafseerData({
                explanation: "معاف کیجئے، ابھی تفسیر دستیاب نہیں ہے۔",
                englishExplanation: "Sorry, I couldn't load the full interactive Tafseer right now.",
                didYouKnow: "The Quran is full of wisdom!",
                quiz: { question: "Who revealed the Quran?", options: ["Allah", "Angels", "Humans"], correctIndex: 0 }
            });
        } finally {
            setTafseerLoading(false);
        }
    };

    const handleQuizAnswer = (index: number) => {
        if (quizAnswered || !tafseerData) return;
        setSelectedOption(index);
        setQuizAnswered(true);
        if (index === tafseerData.quiz.correctIndex) {
            setIsCorrect(true);
            addPoints(30);
            // Play Ma Sha Allah sound
            speak("Ma Sha Allah! Correct Answer!", "en-US");
        } else {
            setIsCorrect(false);
            speak("Try again!", "en-US");
        }
    };

    const filteredSurahs = allSurahs.filter(s => 
        s.englishName.toLowerCase().includes(searchQuery.toLowerCase()) || 
        s.name.includes(searchQuery) ||
        s.number.toString() === searchQuery
    );

    return (
        <div className="min-h-screen bg-emerald-50 pb-32 pt-10 px-4">
            <div className="container mx-auto max-w-3xl">
                
                {/* Search & Navigation Header */}
                <div className="bg-white p-4 rounded-2xl shadow-lg border-b-4 border-emerald-200 sticky top-4 z-40 mb-8">
                    <div className="flex flex-col gap-4">
                        {/* Search Bar */}
                        <div className="relative">
                            <Search className="absolute left-3 top-3 text-emerald-400" size={20} />
                            <input 
                                type="text" 
                                placeholder="Search Surah (e.g. Yasin, 36)..." 
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setIsSearchOpen(true);
                                }}
                                onFocus={() => setIsSearchOpen(true)}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-emerald-100 focus:border-emerald-400 focus:outline-none text-slate-700 font-medium placeholder:text-emerald-300/70 bg-emerald-50/50"
                            />
                            {isSearchOpen && searchQuery && (
                                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-emerald-100 max-h-60 overflow-y-auto z-50">
                                    {filteredSurahs.map(s => (
                                        <div 
                                            key={s.number}
                                            onClick={() => {
                                                setSura(s.number);
                                                setIsSearchOpen(false);
                                                setSearchQuery('');
                                            }}
                                            className="p-3 hover:bg-emerald-50 cursor-pointer flex justify-between items-center border-b border-slate-50 last:border-0"
                                        >
                                            <span className="font-bold text-slate-700">{s.number}. {s.englishName}</span>
                                            <span className="font-serif text-emerald-600">{s.name}</span>
                                        </div>
                                    ))}
                                    {filteredSurahs.length === 0 && (
                                        <div className="p-4 text-center text-slate-400">No Surah found</div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Navigation & Controls */}
                        <div className="flex justify-between items-center">
                            <button 
                                onClick={() => setSura(Math.max(1, sura - 1))}
                                disabled={sura === 1}
                                className="p-2 bg-emerald-100 text-emerald-700 rounded-xl hover:bg-emerald-200 disabled:opacity-50 transition"
                            >
                                <ChevronLeft />
                            </button>
                            
                            <div className="text-center">
                                <h1 className="text-xl sm:text-2xl font-bold text-emerald-800">
                                    {surahInfo ? `${surahInfo.englishName}` : `Surah ${sura}`}
                                </h1>
                                {surahInfo && (
                                    <div className="flex flex-col items-center">
                                        <p className="text-sm text-emerald-600 font-serif mt-1">
                                            {surahInfo.name}
                                        </p>
                                        <div className="flex items-center gap-2 mt-2">
                                            {isDownloaded ? (
                                                <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                                                    <Check size={10} /> Offline Ready
                                                </span>
                                            ) : (
                                                <button 
                                                    onClick={downloadSurahAudio}
                                                    disabled={downloading || isOffline}
                                                    className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full flex items-center gap-1 hover:bg-slate-200 disabled:opacity-50"
                                                >
                                                    {downloading ? 'Downloading...' : <><Download size={10} /> Download Audio</>}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <button 
                                onClick={() => setSura(Math.min(114, sura + 1))}
                                disabled={sura === 114}
                                className="p-2 bg-emerald-100 text-emerald-700 rounded-xl hover:bg-emerald-200 disabled:opacity-50 transition"
                            >
                                <ChevronRight />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Ayas List */}
                {loading ? (
                    <div className="text-center py-20 text-emerald-600 font-medium animate-pulse">Loading Surah...</div>
                ) : (
                    <div className="space-y-6">
                        {ayas.map((aya) => (
                            <motion.div 
                                key={aya.number}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`rounded-3xl p-6 shadow-sm border-2 transition-all duration-300 ${
                                    playingAya === aya.number 
                                        ? 'bg-emerald-50 border-emerald-500 ring-4 ring-emerald-100 scale-[1.01]' 
                                        : 'bg-white border-transparent'
                                }`}
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">
                                        {aya.number === 0 ? "Bismillah" : `Ayah ${aya.number}`}
                                    </span>
                                    <div className="flex gap-2">
                                        <button 
                                            onClick={() => fetchTafseer(aya)}
                                            className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 transition ${tafseerOpen === aya.number ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                                        >
                                            <BookOpen size={14} /> Tafseer
                                        </button>
                                        <button 
                                            onClick={() => playAudioSequence(aya)}
                                            className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center hover:bg-indigo-200 transition"
                                        >
                                            {playingAya === aya.number ? <Pause size={14} /> : <Play size={14} />}
                                        </button>
                                    </div>
                                </div>
                                
                                {/* Arabic Text */}
                                <div className="text-right mb-6" dir="rtl">
                                    <p className={`text-3xl font-serif leading-[2.5] transition-colors duration-300 ${playingAya === aya.number && currentQueueIndex === 0 ? 'text-emerald-600' : 'text-slate-800'}`} style={{ fontFamily: 'Traditional Arabic, serif' }}>
                                        {aya.text}
                                    </p>
                                </div>
                                
                                {/* Urdu Translation */}
                                <p className={`text-xl text-right mb-4 leading-relaxed font-medium transition-colors duration-300 ${playingAya === aya.number && currentQueueIndex === 1 ? 'text-emerald-600' : 'text-emerald-800'}`} dir="rtl" style={{ fontFamily: 'Noto Nastaliq Urdu, serif' }}>
                                    {aya.urduTranslation}
                                </p>

                                {/* English Translation */}
                                <p className={`text-sm leading-relaxed transition-colors duration-300 ${playingAya === aya.number && currentQueueIndex === 2 ? 'text-emerald-600 font-medium' : 'text-slate-500'}`}>
                                    {aya.translation}
                                </p>

                                {/* Tafseer & Quiz Section */}
                                <AnimatePresence>
                                    {tafseerOpen === aya.number && (
                                        <motion.div 
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="mt-6 bg-amber-50 rounded-2xl p-4 border border-amber-100">
                                                <div className="flex justify-between items-center mb-4">
                                                    <h4 className="text-amber-800 font-bold flex items-center gap-2">
                                                        <Sparkles size={16} /> Tafseer (Explanation)
                                                    </h4>
                                                    {tafseerData && (
                                                        <button 
                                                            onClick={playTafseerSequence}
                                                            className={`p-2 rounded-full transition ${isTafseerPlaying ? 'bg-rose-100 text-rose-600' : 'bg-amber-100 text-amber-600'}`}
                                                            title={isTafseerPlaying ? "Stop Reading" : "Read Aloud"}
                                                        >
                                                            {isTafseerPlaying ? <StopCircle size={18} /> : <Volume2 size={18} />}
                                                        </button>
                                                    )}
                                                </div>
                                                
                                                {tafseerLoading ? (
                                                    <div className="text-amber-600 text-sm animate-pulse">Asking the scholar...</div>
                                                ) : tafseerData ? (
                                                    <div className="space-y-4">
                                                        {/* Urdu Explanation */}
                                                        <div className="bg-white/60 p-3 rounded-xl">
                                                            <span className="text-[10px] bg-amber-200 text-amber-800 px-2 py-0.5 rounded-full mb-2 inline-block">Urdu</span>
                                                            <p className="text-amber-900 text-right leading-relaxed whitespace-pre-wrap" dir="rtl">
                                                                {tafseerData.explanation}
                                                            </p>
                                                        </div>

                                                        {/* English Explanation */}
                                                        <div className="bg-white/60 p-3 rounded-xl">
                                                            <span className="text-[10px] bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full mb-2 inline-block">English</span>
                                                            <p className="text-amber-900 leading-relaxed whitespace-pre-wrap">
                                                                {tafseerData.englishExplanation}
                                                            </p>
                                                        </div>
                                                        
                                                        {/* Did You Know */}
                                                        <div className="bg-white/50 p-3 rounded-xl border border-amber-200/50">
                                                            <h5 className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-1 flex items-center gap-1">
                                                                <HelpCircle size={12} /> Did You Know?
                                                            </h5>
                                                            <p className="text-sm text-amber-900">{tafseerData.didYouKnow}</p>
                                                        </div>

                                                        {/* Quiz */}
                                                        <div className="bg-white p-4 rounded-xl border border-amber-200 shadow-sm">
                                                            <h5 className="font-bold text-amber-800 mb-3">Quick Quiz!</h5>
                                                            <p className="text-sm text-slate-700 mb-3 font-medium">{tafseerData.quiz.question}</p>
                                                            <div className="space-y-2">
                                                                {tafseerData.quiz.options.map((option, idx) => (
                                                                    <button
                                                                        key={idx}
                                                                        onClick={() => handleQuizAnswer(idx)}
                                                                        disabled={quizAnswered}
                                                                        className={`w-full text-left p-2 rounded-lg text-sm transition ${
                                                                            quizAnswered 
                                                                                ? idx === tafseerData.quiz.correctIndex 
                                                                                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                                                                    : idx === selectedOption 
                                                                                        ? 'bg-rose-100 text-rose-800 border border-rose-200'
                                                                                        : 'bg-slate-50 text-slate-400'
                                                                                : 'bg-slate-50 hover:bg-amber-100 text-slate-700'
                                                                        }`}
                                                                    >
                                                                        {option}
                                                                        {quizAnswered && idx === tafseerData.quiz.correctIndex && <Check size={14} className="inline ml-2" />}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                            {quizAnswered && (
                                                                <div className={`mt-3 text-xs font-bold text-center ${isCorrect ? 'text-emerald-600' : 'text-rose-600'}`}>
                                                                    {isCorrect ? '🎉 Correct! +30 Points' : 'Try again next time!'}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <p className="text-amber-900">Failed to load content.</p>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuranReader;
