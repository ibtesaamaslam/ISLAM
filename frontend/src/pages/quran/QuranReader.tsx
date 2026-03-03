import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Play, Pause, BookOpen, Sparkles, Search, Download, Check, WifiOff, HelpCircle, Volume2, StopCircle, Bookmark, History } from 'lucide-react';
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
    backgroundHistory: string;
    didYouKnow: string;
    quiz: {
        question: string;
        options: string[];
        correctIndex: number;
    };
}

interface LastRead {
    surah: number;
    ayah: number;
    surahName: string;
    timestamp: number;
}

const QuranReader = () => {
    const [sura, setSura] = useState(1);
    const [ayas, setAyas] = useState<Aya[]>([]);
    const [surahInfo, setSurahInfo] = useState<SurahInfo | null>(null);
    const [loading, setLoading] = useState(false);
    
    // User Preferences State
    const [bookmarks, setBookmarks] = useState<string[]>(() => {
        const saved = localStorage.getItem('quran_bookmarks');
        return saved ? JSON.parse(saved) : [];
    });
    const [lastRead, setLastRead] = useState<LastRead | null>(() => {
        const saved = localStorage.getItem('quran_last_read');
        return saved ? JSON.parse(saved) : null;
    });

    // Audio State
    const [playingAya, setPlayingAya] = useState<number | null>(null);
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const currentUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
    const tafseerAudioRef = useRef<HTMLAudioElement | null>(null);
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

    const { addPoints, unlockAchievement } = useGamification();

    // Save bookmarks to localStorage
    useEffect(() => {
        localStorage.setItem('quran_bookmarks', JSON.stringify(bookmarks));
    }, [bookmarks]);

    // Save last read to localStorage
    useEffect(() => {
        if (lastRead) {
            localStorage.setItem('quran_last_read', JSON.stringify(lastRead));
        }
    }, [lastRead]);

    // Scroll to last read ayah when surah loads if applicable
    useEffect(() => {
        if (lastRead && lastRead.surah === sura && !loading && ayas.length > 0) {
            const element = document.getElementById(`ayah-${lastRead.ayah}`);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }, [sura, loading, ayas, lastRead]);

    const toggleBookmark = (ayahNumber: number) => {
        const bookmarkId = `${sura}:${ayahNumber}`;
        setBookmarks(prev => {
            if (prev.includes(bookmarkId)) {
                return prev.filter(id => id !== bookmarkId);
            } else {
                return [...prev, bookmarkId];
            }
        });
    };

    const updateLastRead = (ayahNumber: number) => {
        if (surahInfo) {
            setLastRead({
                surah: sura,
                ayah: ayahNumber,
                surahName: surahInfo.englishName,
                timestamp: Date.now()
            });
        }
    };

    const handleContinueReading = () => {
        if (lastRead) {
            if (sura === lastRead.surah) {
                // Already on the surah, just scroll
                const element = document.getElementById(`ayah-${lastRead.ayah}`);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            } else {
                setSura(lastRead.surah);
            }
        }
    };

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

                const ensureHttps = (url: string) => url?.replace(/^http:/, 'https:');

                if (sura === 1) {
                    // Special handling for Fatiha
                    processedAyahs = arabicAyahs.slice(1).map((aya: any, idx: number) => ({
                        number: idx + 1,
                        text: aya.text,
                        translation: transAyahs[idx + 1].text,
                        urduTranslation: urduAyahs[idx + 1].text,
                        audio: ensureHttps(audioAyahs[idx + 1].audio),
                        urduAudio: ensureHttps(urduAudioAyahs[idx + 1].audio),
                        englishAudio: ensureHttps(englishAudioAyahs[idx + 1].audio)
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
                            audio: ensureHttps(audioAyahs[idx].audio),
                            urduAudio: ensureHttps(urduAudioAyahs[idx].audio),
                            englishAudio: ensureHttps(englishAudioAyahs[idx].audio)
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
            
            // Collect all unique URLs
            const urls = Array.from(new Set(ayas.flatMap(aya => [
                aya.audio,
                aya.urduAudio,
                aya.englishAudio
            ]).filter(Boolean)));

            // Process in batches to avoid network congestion
            const BATCH_SIZE = 5;
            let successCount = 0;

            for (let i = 0; i < urls.length; i += BATCH_SIZE) {
                const batch = urls.slice(i, i + BATCH_SIZE);
                await Promise.all(batch.map(async (url) => {
                    try {
                        const match = await cache.match(url);
                        if (!match) {
                            await cache.add(url);
                        }
                        successCount++;
                    } catch (e) {
                        console.warn(`Failed to cache ${url}`, e);
                    }
                }));
                // Small delay to be nice to the network
                await new Promise(resolve => setTimeout(resolve, 50));
            }

            if (successCount > 0) {
                setIsDownloaded(true);
                addPoints(50);
                alert(`Downloaded ${successCount} audio files for offline listening!`);
            } else {
                throw new Error("No files could be downloaded");
            }
        } catch (err) {
            console.error("Download failed", err);
            alert("Failed to download. Please check your connection.");
        } finally {
            setDownloading(false);
        }
    };

    const deleteSurahAudio = async () => {
        if (!('caches' in window)) return;
        try {
            const cache = await caches.open('quran-audio');
            
            // Collect all unique URLs
            const urls = Array.from(new Set(ayas.flatMap(aya => [
                aya.audio,
                aya.urduAudio,
                aya.englishAudio
            ]).filter(Boolean)));

            await Promise.all(urls.map(url => cache.delete(url)));
            setIsDownloaded(false);
            alert("Surah removed from offline storage.");
        } catch (err) {
            console.error("Delete failed", err);
        }
    };

    const playNextInQueue = async (queue: string[], index: number) => {
        if (index >= queue.length) {
            setPlayingAya(null);
            setAudioQueue([]);
            setCurrentQueueIndex(0);
            addPoints(5);
            unlockAchievement('first_step');
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
        
        newAudio.onended = () => {
            setCurrentQueueIndex(index + 1);
            playNextInQueue(queue, index + 1);
        };

        newAudio.onerror = (e) => {
            console.error("Audio playback failed for URL:", playUrl, e);
            // Skip to next track on error
            setCurrentQueueIndex(index + 1);
            playNextInQueue(queue, index + 1);
        };

        newAudio.play().catch(e => {
            console.error("Play failed:", e);
            // Skip to next track on play error
            setCurrentQueueIndex(index + 1);
            playNextInQueue(queue, index + 1);
        });

        setAudio(newAudio);
        audioRef.current = newAudio;
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
    const speak = async (text: string, lang: string): Promise<void> => {
        // 1. Try Gemini TTS (High Quality)
        try {
            const safeText = text || "";
            if (safeText.trim().length === 0) return;

            // Stop any existing audio
            if (tafseerAudioRef.current) {
                tafseerAudioRef.current.pause();
                tafseerAudioRef.current = null;
            }

            const apiKey = process.env.GEMINI_API_KEY || import.meta.env.VITE_GEMINI_API_KEY;
            if (!apiKey) throw new Error("API Key missing");

            const ai = new GoogleGenAI({ apiKey });
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash-preview-tts",
                contents: [{ parts: [{ text: safeText }] }],
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
            
            if (!base64Audio) throw new Error("No audio returned from Gemini");

            return new Promise((resolve) => {
                try {
                    // Convert base64 to blob for better browser compatibility
                    const binaryString = window.atob(base64Audio);
                    const bytes = new Uint8Array(binaryString.length);
                    for (let i = 0; i < binaryString.length; i++) {
                        bytes[i] = binaryString.charCodeAt(i);
                    }
                    const blob = new Blob([bytes], { type: 'audio/mp3' });
                    const url = URL.createObjectURL(blob);

                    const audio = new Audio(url);
                    tafseerAudioRef.current = audio;
                    
                    audio.onended = () => {
                        tafseerAudioRef.current = null;
                        URL.revokeObjectURL(url); // Clean up
                        resolve();
                    };
                    
                    audio.onerror = (e) => {
                        console.error("Audio playback error", e);
                        URL.revokeObjectURL(url);
                        resolve();
                    };
                    
                    audio.play().catch(e => {
                        console.error("Play error", e);
                        URL.revokeObjectURL(url);
                        resolve();
                    });
                } catch (err) {
                    console.error("Error creating audio blob", err);
                    resolve();
                }
            });

        } catch (error) {
            console.warn("Gemini TTS failed, falling back to browser TTS", error);
            
            // 2. Fallback to Browser TTS
            return new Promise((resolve) => {
                if (!window.speechSynthesis) {
                    resolve();
                    return;
                }
                
                const utterance = new SpeechSynthesisUtterance(text);
                utterance.lang = lang;
                utterance.rate = 0.9;
                
                // Try to match voice for fallback
                if (voices.length > 0) {
                    let voice = voices.find(v => v.lang === lang);
                    if (!voice) voice = voices.find(v => v.lang.startsWith(lang.split('-')[0]));
                    if (voice) utterance.voice = voice;
                }

                utterance.onend = () => resolve();
                utterance.onerror = () => resolve();
                
                window.speechSynthesis.cancel();
                window.speechSynthesis.speak(utterance);
            });
        }
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

        console.log("Starting Tafseer sequence (AI Voice)");
        setIsTafseerPlaying(true);
        stopAudio(); 

        // 1. Urdu Explanation
        console.log("Step 1: Urdu");
        await speak(tafseerData.explanation, 'ur');
        
        if (!isTafseerPlaying) return; 

        // 2. English Explanation
        console.log("Step 2: English");
        await speak(tafseerData.englishExplanation, 'en-US');

        if (!isTafseerPlaying) return;

        // 3. Background History
        console.log("Step 3: Background History");
        await speak("Background History: " + tafseerData.backgroundHistory, 'en-US');

        if (!isTafseerPlaying) return;

        // 4. Did You Know
        console.log("Step 4: Did You Know");
        await speak("Did you know? " + tafseerData.didYouKnow, 'en-US');

        if (!isTafseerPlaying) return;

        // 5. Quiz Question
        console.log("Step 5: Quiz");
        await speak("Quiz time! " + tafseerData.quiz.question, 'en-US');

        console.log("Tafseer sequence finished");
        setIsTafseerPlaying(false);
    };

    const stopTafseerAudio = () => {
        if (tafseerAudioRef.current) {
            tafseerAudioRef.current.pause();
            tafseerAudioRef.current = null;
        }
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
            const apiKey = process.env.GEMINI_API_KEY || import.meta.env.VITE_GEMINI_API_KEY;
            if (!apiKey) {
                throw new Error("API Key is missing. Please set GEMINI_API_KEY in your environment variables.");
            }
            const ai = new GoogleGenAI({ apiKey });
            const prompt = `
            You are an Islamic scholar. Provide a JSON response with:
            1. "explanation": A clear, general Tafseer (explanation) in Urdu for the following Quran Ayah.
            2. "englishExplanation": A clear, general Tafseer (explanation) in English for the following Quran Ayah.
            3. "backgroundHistory": A detailed "Asbab al-Nuzul" (Background History) explaining when this Ayah was revealed and the story behind it.
            4. "didYouKnow": A fun fact related to this Ayah or Surah in English.
            5. "quiz": A simple multiple choice question object with "question" (string), "options" (array of 3 strings), and "correctIndex" (number 0-2).

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
            unlockAchievement('scholar_junior');
        } catch (err) {
            console.error(err);
            setTafseerData({
                explanation: "معاف کیجئے، ابھی تفسیر دستیاب نہیں ہے۔",
                englishExplanation: "Sorry, I couldn't load the full interactive Tafseer right now. Please ensure your API key is configured correctly.",
                backgroundHistory: "Background history is unavailable at the moment.",
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
                        {/* Recently Read Banner */}
                        {lastRead && (
                            <motion.button
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                onClick={handleContinueReading}
                                className="bg-emerald-50 text-emerald-800 p-3 rounded-xl flex items-center justify-between w-full border border-emerald-100 hover:bg-emerald-100 transition-colors"
                            >
                                <div className="flex items-center gap-2">
                                    <History size={18} className="text-emerald-600" />
                                    <div className="text-left">
                                        <p className="text-xs font-bold uppercase tracking-wider text-emerald-500">Continue Reading</p>
                                        <p className="font-bold text-sm">{lastRead.surahName} - Ayah {lastRead.ayah}</p>
                                    </div>
                                </div>
                                <ChevronRight size={18} />
                            </motion.button>
                        )}

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
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                                                        <Check size={10} /> Offline Ready
                                                    </span>
                                                    <button 
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            if(confirm('Remove this Surah from offline storage?')) {
                                                                deleteSurahAudio();
                                                            }
                                                        }}
                                                        className="text-[10px] bg-rose-50 text-rose-500 px-2 py-0.5 rounded-full hover:bg-rose-100 transition-colors"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
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
                        {ayas.map((aya) => {
                            const isBookmarked = bookmarks.includes(`${sura}:${aya.number}`);
                            return (
                                <motion.div 
                                    key={aya.number}
                                    id={`ayah-${aya.number}`}
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
                                                onClick={() => toggleBookmark(aya.number)}
                                                className={`p-2 rounded-full transition-colors ${isBookmarked ? 'text-amber-500 bg-amber-50' : 'text-slate-400 hover:bg-slate-100'}`}
                                                title={isBookmarked ? "Remove Bookmark" : "Bookmark Ayah"}
                                            >
                                                <Bookmark size={18} fill={isBookmarked ? "currentColor" : "none"} />
                                            </button>
                                            <button 
                                                onClick={() => {
                                                    fetchTafseer(aya);
                                                    updateLastRead(aya.number);
                                                }}
                                                className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 transition ${tafseerOpen === aya.number ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                                            >
                                                <BookOpen size={14} /> Tafseer
                                            </button>
                                            <button 
                                                onClick={() => {
                                                    playAudioSequence(aya);
                                                    updateLastRead(aya.number);
                                                }}
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
                                                                onClick={() => {
                                                                    playTafseerSequence();
                                                                    updateLastRead(aya.number);
                                                                }}
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

                                                        {/* Background History */}
                                                        <div className="bg-white/60 p-3 rounded-xl border-l-4 border-indigo-300">
                                                            <h5 className="text-xs font-bold text-indigo-800 uppercase tracking-wider mb-2 flex items-center gap-1">
                                                                <BookOpen size={12} /> Background History (Asbab al-Nuzul)
                                                            </h5>
                                                            <p className="text-indigo-900 leading-relaxed text-sm whitespace-pre-wrap">
                                                                {tafseerData.backgroundHistory}
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
                        );
                    })}
                </div>
            )}
            </div>
        </div>
    );
};

export default QuranReader;
