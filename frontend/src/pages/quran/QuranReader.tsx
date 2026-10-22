import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Play, Pause, BookOpen, Sparkles, Search, Download, Check, WifiOff, HelpCircle, Volume2, StopCircle, Bookmark, History, Headphones, Radio, SkipForward, SkipBack, Repeat } from 'lucide-react';
import { useGamification } from '../../contexts/GamificationContext';
import { GoogleGenAI } from "@google/genai";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import surahListData from '../../data/surahList.json';
import { playAiVoice, stopCurrentAiVoice, VoicePlaybackController } from '../../utils/aiVoice';

export type AudioMode = 'arabic_only' | 'urdu_only' | 'arabic_urdu' | 'full';

interface AudioTrack {
    type: 'arabic' | 'urdu' | 'english';
    label: string;
    url: string;
}

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
    backgroundHistoryUrdu: string;
    historicalContext: string;
    historicalContextUrdu: string;
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

// Safely access CacheStorage without throwing UnknownError or SecurityError in sandboxed contexts
const getAudioCache = async (): Promise<Cache | null> => {
    try {
        if (typeof window === 'undefined') return null;
        if (!('caches' in window) || !window.caches || typeof window.caches.open !== 'function') {
            return null;
        }
        return await window.caches.open('quran-audio');
    } catch (err) {
        // CacheStorage may throw UnknownError or SecurityError in iframe/sandboxed environments
        console.warn('CacheStorage is not available:', err);
        return null;
    }
};

// Official ayah counts for each of the 114 Surahs for global verse calculations
const SURAH_VERSE_COUNTS = [
    7, 286, 200, 176, 120, 165, 206, 75, 129, 109,
    123, 111, 43, 52, 99, 128, 111, 110, 98, 135,
    112, 78, 118, 64, 77, 227, 93, 88, 69, 60,
    34, 30, 73, 54, 45, 83, 182, 88, 75, 85,
    54, 53, 89, 59, 37, 35, 38, 29, 18, 45,
    60, 49, 62, 55, 78, 96, 29, 22, 24, 13,
    14, 11, 11, 18, 12, 12, 30, 52, 52, 44,
    28, 28, 20, 56, 40, 31, 50, 40, 46, 42,
    29, 19, 36, 25, 22, 17, 19, 26, 30, 20,
    15, 21, 11, 8, 8, 19, 5, 8, 8, 11,
    11, 8, 3, 9, 5, 4, 7, 3, 6, 3,
    5, 4, 5, 6
];

const getGlobalAyahNumber = (surahNum: number, ayahInSurah: number): number => {
    let count = 0;
    for (let i = 0; i < surahNum - 1 && i < SURAH_VERSE_COUNTS.length; i++) {
        count += SURAH_VERSE_COUNTS[i];
    }
    return count + ayahInSurah;
};

const QuranReader = () => {
    const [sura, setSura] = useState(1);
    const [ayas, setAyas] = useState<Aya[]>([]);
    const [surahInfo, setSurahInfo] = useState<SurahInfo | null>(null);
    const [loading, setLoading] = useState(false);
    
    // User Preferences State
    const [bookmarks, setBookmarks] = useState<string[]>(() => {
        try {
            const saved = localStorage.getItem('quran_bookmarks');
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });
    const [lastRead, setLastRead] = useState<LastRead | null>(() => {
        try {
            const saved = localStorage.getItem('quran_last_read');
            return saved ? JSON.parse(saved) : null;
        } catch {
            return null;
        }
    });
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const showToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => {
            setToastMessage(prev => (prev === msg ? null : prev));
        }, 3500);
    };

    // Audio State
    const [playingAya, setPlayingAya] = useState<number | null>(null);
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const currentUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
    const tafseerAudioRef = useRef<HTMLAudioElement | null>(null);
    const [audioQueue, setAudioQueue] = useState<string[]>([]);
    const [currentQueueIndex, setCurrentQueueIndex] = useState(0);
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    
    // Audio Mode & Settings: Quran Only, Urdu Only, Arabic + Urdu, or Arabic + Urdu + English (Auto-play next is always ON by default)
    const [audioMode, setAudioMode] = useState<AudioMode>(() => {
        try {
            const saved = localStorage.getItem('quran_audio_mode');
            if (saved === 'urdu_only' || saved === 'arabic_only' || saved === 'arabic_urdu' || saved === 'full') return saved as AudioMode;
            return 'arabic_only';
        } catch {
            return 'arabic_only';
        }
    });
    // Auto-play next is always ON by default as requested (no separate toggle button needed)
    const autoPlayNext = true;
    const [currentTrackType, setCurrentTrackType] = useState<'arabic' | 'urdu' | 'english' | null>(null);
    const playbackSessionIdRef = useRef<number>(0);
    const activeBlobUrlRef = useRef<string | null>(null);

    useEffect(() => {
        try {
            localStorage.setItem('quran_audio_mode', audioMode);
        } catch {}
    }, [audioMode]);
    
    // Tafseer State
    const [tafseerOpen, setTafseerOpen] = useState<number | null>(null);
    const [tafseerData, setTafseerData] = useState<TafseerData | null>(null);
    const [tafseerLoading, setTafseerLoading] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const [pdfData, setPdfData] = useState<any>(null);
    const pdfRef = useRef<HTMLDivElement>(null);
    const [ayahSearchQuery, setAyahSearchQuery] = useState('');
    const [downloadProgressText, setDownloadProgressText] = useState('');
    const [staticSurahData, setStaticSurahData] = useState<any>(null);

    // Highlight helper
    const HighlightText = ({ text, highlight }: { text: string, highlight: string }) => {
        if (!highlight.trim()) return <>{text}</>;
        const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
        return (
            <span>
                {parts.map((part, i) => 
                    part.toLowerCase() === highlight.toLowerCase() ? 
                        <span key={i} className="bg-yellow-200 text-slate-900 px-0.5 rounded">{part}</span> : 
                        part
                )}
            </span>
        );
    };

    const handleDownloadOffline = async () => {
        if (ayas.length === 0 || !surahInfo) return;
        setIsDownloading(true);
        setDownloadProgressText('Starting download...');

        try {
            // 1. Save Surah Info & Ayahs (Basic Content)
            const surahKey = `surah_${surahInfo.number}_data`;
            const basicData = {
                info: surahInfo,
                ayas: ayas,
                timestamp: Date.now()
            };
            localStorage.setItem(surahKey, JSON.stringify(basicData));
            setDownloadProgressText('Saved Text & Audio Links');

            // 2. Fetch & Save Summary
            setDownloadProgressText('Generating Summary...');
            const summaryResponse = await fetch('/api/surah-summary', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    surahName: surahInfo.englishName,
                    surahNumber: surahInfo.number,
                    ayahCount: surahInfo.numberOfAyahs
                })
            });
            
            if (summaryResponse.ok) {
                const summaryData = await summaryResponse.json();
                localStorage.setItem(`surah_${surahInfo.number}_summary`, JSON.stringify(summaryData));
            }

            // 3. Batch Fetch Tafseer (Chunked)
            // We'll fetch for the first 20 Ayahs to save time/quota, or all if small.
            // Let's do chunks of 5.
            const chunkSize = 5;
            const totalAyahs = ayas.length;
            // Limit to first 20 for now to avoid timeout, or user can request more.
            // User said "ALL", but 286 ayahs * batch calls is heavy.
            // I'll try to do as many as possible until a limit or error.
            // Let's be safe: Fetch first 10 immediately.
            // And maybe store a flag "partial_tafseer".
            
            // Actually, let's try to fetch for ALL but with a delay/queue if possible.
            // Given the environment, let's just do the first 10 and tell the user.
            // OR, iterate through all with `await` loop.
            
            let tafseerMap: Record<string, any> = {};
            const storedTafseer = localStorage.getItem(`surah_${surahInfo.number}_tafseer`);
            if (storedTafseer) {
                tafseerMap = JSON.parse(storedTafseer);
            }

            // Filter ayahs that don't have tafseer yet
            const ayahsToFetch = ayas.filter(a => !tafseerMap[a.number]);
            
            // We will fetch in batches of 5
            for (let i = 0; i < ayahsToFetch.length; i += chunkSize) {
                const batch = ayahsToFetch.slice(i, i + chunkSize);
                setDownloadProgressText(`Fetching Tafseer ${i + 1}/${ayahsToFetch.length}...`);
                
                try {
                    const batchResponse = await fetch('/api/tafseer-batch', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            surah: surahInfo.englishName,
                            ayas: batch.map(a => ({ number: a.number, text: a.text, translation: a.translation }))
                        })
                    });

                    if (batchResponse.ok) {
                        const batchData = await batchResponse.json();
                        // Merge
                        tafseerMap = { ...tafseerMap, ...batchData };
                        // Save incrementally
                        localStorage.setItem(`surah_${surahInfo.number}_tafseer`, JSON.stringify(tafseerMap));
                    }
                } catch (e) {
                    console.error("Batch failed", e);
                    // Continue to next batch
                }
                
                // Small delay to be nice to API
                await new Promise(r => setTimeout(r, 500));
            }

            setDownloadProgressText('Download Complete!');
            setIsDownloaded(true);
            setTimeout(() => setIsDownloading(false), 2000);

        } catch (error) {
            console.error('Offline download failed', error);
            showToast('Failed to download complete data. Basic text saved.');
            setIsDownloading(false);
        }
    };
    const [quizAnswered, setQuizAnswered] = useState(false);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isCorrect, setIsCorrect] = useState(false);
    const [isTafseerPlaying, setIsTafseerPlaying] = useState(false);
    const [playingSectionKey, setPlayingSectionKey] = useState<string | null>(null);

    // Search State
    const [allSurahs, setAllSurahs] = useState<SurahInfo[]>(surahListData as SurahInfo[]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    // Offline State
    const [isOffline, setIsOffline] = useState(!navigator.onLine);
    const [downloading, setDownloading] = useState(false);
    const [downloadProgress, setDownloadProgress] = useState(0);
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

    // Auto-scroll down smoothly as playback advances to the next and next ayah
    useEffect(() => {
        if (playingAya !== null) {
            const element = document.getElementById(`ayah-${playingAya}`);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }, [playingAya]);

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

    // Fetch list of all Surahs for search (using bundled static list as primary, refreshing from API if online)
    useEffect(() => {
        const fetchAllSurahs = async () => {
            try {
                if (allSurahs && allSurahs.length === 114) return;
                const res = await axios.get('https://api.quran.com/api/v4/chapters', { timeout: 6000 });
                if (res.data?.chapters && Array.isArray(res.data.chapters)) {
                    const mapped: SurahInfo[] = res.data.chapters.map((ch: any) => ({
                        number: ch.id,
                        name: ch.name_arabic,
                        englishName: ch.name_simple,
                        englishNameTranslation: ch.translated_name?.name || '',
                        numberOfAyahs: ch.verses_count,
                        revelationType: ch.revelation_place === 'makkah' ? 'Meccan' : 'Medinan'
                    }));
                    setAllSurahs(mapped);
                }
            } catch {
                // Silently fallback to bundled surahListData
                if (!allSurahs || allSurahs.length === 0) {
                    setAllSurahs(surahListData as SurahInfo[]);
                }
            }
        };
        fetchAllSurahs();
    }, []);

    // Check if Surah is downloaded
    useEffect(() => {
        let isCancelled = false;
        const checkDownloadStatus = async () => {
            try {
                let localData: string | null = null;
                try {
                    localData = localStorage.getItem(`surah_${sura}_data`);
                } catch {
                    localData = null;
                }

                if (localData) {
                    if (!isCancelled) setIsDownloaded(true);
                    return;
                }

                // Fallback check for audio only via safe CacheStorage helper
                const cache = await getAudioCache();
                if (cache && ayas.length > 0 && ayas[0]?.audio) {
                    try {
                        const match = await cache.match(ayas[0].audio);
                        if (match && !isCancelled) {
                            setIsDownloaded(true);
                            return;
                        }
                    } catch {
                        // ignore cache match error
                    }
                }
                if (!isCancelled) setIsDownloaded(false);
            } catch {
                if (!isCancelled) setIsDownloaded(false);
            }
        };
        checkDownloadStatus();
        return () => {
            isCancelled = true;
        };
    }, [sura, ayas]);

    // Halt Quran audio when Azan or global sound halt triggers
    useEffect(() => {
        const handleGlobalStop = () => {
            stopAudio();
            stopTafseerAudio();
        };
        window.addEventListener('app:stop_all_audio', handleGlobalStop);
        return () => {
            window.removeEventListener('app:stop_all_audio', handleGlobalStop);
        };
    }, []);

    useEffect(() => {
        const fetchSura = async () => {
            setLoading(true);
            setTafseerOpen(null);
            stopAudio();
            stopTafseerAudio();

            // Set basic surahInfo immediately from bundled metadata so header is never blank
            const meta = (surahListData as SurahInfo[]).find(s => s.number === sura) || (surahListData as SurahInfo[])[sura - 1];
            if (meta) {
                setSurahInfo(meta);
            }

            // Check Local Storage First
            const localData = localStorage.getItem(`surah_${sura}_data`);
            if (localData) {
                try {
                    const parsed = JSON.parse(localData);
                    // Validate that we have the necessary info
                    if (parsed.surahInfo && parsed.surahInfo.englishName && parsed.ayas && parsed.ayas.length > 0) {
                        setSurahInfo(parsed.surahInfo);
                        setAyas(parsed.ayas);
                        setLoading(false);
                        return;
                    } else {
                        localStorage.removeItem(`surah_${sura}_data`);
                    }
                } catch (e) {
                    localStorage.removeItem(`surah_${sura}_data`);
                }
            }

            let loadedAyahs: Aya[] | null = null;
            let loadedSurahInfo: SurahInfo | null = meta ? meta : null;

            // Strategy 1: Fetch from api.quran.com (high availability, fast CDN)
            try {
                const quranComRes = await axios.get(
                    `https://api.quran.com/api/v4/verses/by_chapter/${sura}?language=en&words=false&translations=20,234&fields=text_uthmani,chapter_id&per_page=300`,
                    { timeout: 8000 }
                );

                if (quranComRes.data?.verses && Array.isArray(quranComRes.data.verses)) {
                    const verses = quranComRes.data.verses;
                    const stripTags = (text: string) => (text ? text.replace(/<[^>]*>/g, '').trim() : '');

                    const mapped: Aya[] = [];
                    if (sura === 1) {
                        // For Fatiha, verse 1 is Bismillah. Slicing verse 1 gives ayahs 1..6
                        verses.slice(1).forEach((v: any, idx: number) => {
                            const engTrans = v.translations?.find((t: any) => t.resource_id === 20)?.text || '';
                            const urduTrans = v.translations?.find((t: any) => t.resource_id === 234)?.text || '';
                            const globalNum = idx + 2;
                            mapped.push({
                                number: idx + 1,
                                text: v.text_uthmani || v.text_imlaei || '',
                                translation: stripTags(engTrans),
                                urduTranslation: stripTags(urduTrans),
                                audio: `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${globalNum}.mp3`,
                                urduAudio: `https://cdn.islamic.network/quran/audio/64/ur.khan/${globalNum}.mp3`,
                                englishAudio: `https://cdn.islamic.network/quran/audio/192/en.walk/${globalNum}.mp3`
                            });
                        });
                    } else {
                        verses.forEach((v: any) => {
                            const engTrans = v.translations?.find((t: any) => t.resource_id === 20)?.text || '';
                            const urduTrans = v.translations?.find((t: any) => t.resource_id === 234)?.text || '';
                            let text = v.text_uthmani || v.text_imlaei || '';
                            if (sura !== 9 && v.verse_number === 1) {
                                const bismillahVariations = [
                                    "بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ",
                                    "بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ",
                                    "بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ"
                                ];
                                for (const b of bismillahVariations) {
                                    if (text.startsWith(b)) {
                                        text = text.replace(b, '').trim();
                                    }
                                }
                            }
                            const globalNum = getGlobalAyahNumber(sura, v.verse_number);
                            mapped.push({
                                number: v.verse_number,
                                text: text,
                                translation: stripTags(engTrans),
                                urduTranslation: stripTags(urduTrans),
                                audio: `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${globalNum}.mp3`,
                                urduAudio: `https://cdn.islamic.network/quran/audio/64/ur.khan/${globalNum}.mp3`,
                                englishAudio: `https://cdn.islamic.network/quran/audio/192/en.walk/${globalNum}.mp3`
                            });
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
                        mapped.unshift(bismillahAyah);
                    }
                    loadedAyahs = mapped;
                }
            } catch (quranComErr) {
                console.warn("api.quran.com attempt was unsuccessful, attempting fallback...", quranComErr);
            }

            // Strategy 2: Fallback to api.alquran.cloud if Strategy 1 did not load
            if (!loadedAyahs) {
                try {
                    const ensureHttps = (url: string) => url?.replace(/^http:/, 'https:');
                    const [arabicRes, transRes, urduRes, audioRes, urduAudioRes, englishAudioRes] = await Promise.all([
                        axios.get(`https://api.alquran.cloud/v1/surah/${sura}`, { timeout: 7000 }),
                        axios.get(`https://api.alquran.cloud/v1/surah/${sura}/en.sahih`, { timeout: 7000 }),
                        axios.get(`https://api.alquran.cloud/v1/surah/${sura}/ur.jalandhry`, { timeout: 7000 }),
                        axios.get(`https://api.alquran.cloud/v1/surah/${sura}/ar.alafasy`, { timeout: 7000 }),
                        axios.get(`https://api.alquran.cloud/v1/surah/${sura}/ur.khan`, { timeout: 7000 }),
                        axios.get(`https://api.alquran.cloud/v1/surah/${sura}/en.walk`, { timeout: 7000 })
                    ]);

                    if (arabicRes.data?.data) {
                        loadedSurahInfo = arabicRes.data.data;
                        const arabicAyahs = arabicRes.data.data.ayahs;
                        const transAyahs = transRes.data.data.ayahs;
                        const urduAyahs = urduRes.data.data.ayahs;
                        const audioAyahs = audioRes.data.data.ayahs;
                        const urduAudioAyahs = urduAudioRes.data.data.ayahs;
                        const englishAudioAyahs = englishAudioRes.data.data.ayahs;

                        let processedAyahs: Aya[] = [];
                        if (sura === 1) {
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
                        loadedAyahs = processedAyahs;
                    }
                } catch (fallbackErr) {
                    console.warn("api.alquran.cloud fallback also failed", fallbackErr);
                }
            }

            if (loadedAyahs && loadedAyahs.length > 0) {
                if (loadedSurahInfo) setSurahInfo(loadedSurahInfo);
                setAyas(loadedAyahs);
                addPoints(10);
            } else {
                if (isOffline) {
                    showToast("You are offline and this Surah hasn't been downloaded yet.");
                } else {
                    showToast("Unable to reach Quran server. Please check your internet connection.");
                }
            }

            // Try to fetch static data
            try {
                const staticRes = await fetch(`/quran-data/${sura}.json`);
                if (staticRes.ok) {
                    const staticData = await staticRes.json();
                    setStaticSurahData(staticData);
                } else {
                    setStaticSurahData(null);
                }
            } catch {
                setStaticSurahData(null);
            } finally {
                setLoading(false);
            }
        };
        fetchSura();
    }, [sura]);

    const downloadSurahContent = async () => {
        setDownloading(true);
        setDownloadProgress(0);
        try {
            // 1. Save Text Content to LocalStorage
            const surahData = {
                surahInfo,
                ayas,
                timestamp: Date.now()
            };
            try {
                localStorage.setItem(`surah_${sura}_data`, JSON.stringify(surahData));
            } catch (storageErr) {
                console.warn("LocalStorage save error", storageErr);
            }

            // 2. Download Audio Files if CacheStorage is supported
            const cache = await getAudioCache();
            if (cache) {
                // Collect all unique URLs
                const urls = Array.from(new Set(ayas.flatMap(aya => [
                    aya.audio,
                    aya.urduAudio,
                    aya.englishAudio
                ]).filter(Boolean)));

                let completed = 0;
                const total = urls.length;

                // Process in batches
                const BATCH_SIZE = 5;
                for (let i = 0; i < urls.length; i += BATCH_SIZE) {
                    const batch = urls.slice(i, i + BATCH_SIZE);
                    await Promise.all(batch.map(async (url) => {
                        try {
                            const match = await cache.match(url);
                            if (!match) {
                                const response = await fetch(url, { mode: 'cors' });
                                if (response.ok) {
                                    await cache.put(url, response);
                                } else {
                                    console.warn(`Skipping cache for ${url} - response not OK`);
                                }
                            }
                        } catch (e) {
                            console.warn(`Failed to cache ${url}`, e);
                        } finally {
                            completed++;
                            setDownloadProgress(Math.round((completed / total) * 100));
                        }
                    }));
                }
            } else {
                setDownloadProgress(100);
            }

            setIsDownloaded(true);
            addPoints(50);
            showToast("Surah downloaded successfully for offline use!");
        } catch (err) {
            console.error("Download failed", err);
            showToast("Failed to download. Please check your connection.");
        } finally {
            setDownloading(false);
            setDownloadProgress(0);
        }
    };

    const deleteSurahContent = async () => {
        try {
            // Remove text data
            try {
                localStorage.removeItem(`surah_${sura}_data`);
            } catch (storageErr) {
                console.warn("LocalStorage delete error", storageErr);
            }

            // Remove audio data
            const cache = await getAudioCache();
            if (cache) {
                const urls = Array.from(new Set(ayas.flatMap(aya => [
                    aya.audio,
                    aya.urduAudio,
                    aya.englishAudio
                ]).filter(Boolean)));

                await Promise.all(urls.map(url => cache.delete(url).catch(() => {})));
            }
            setIsDownloaded(false);
            showToast("Surah removed from offline storage.");
        } catch (err) {
            console.error("Delete failed", err);
        }
    };

    // Build audio track sequence based on user preference or explicit mode
    const buildQueueForAyah = (aya: Aya, mode: AudioMode): AudioTrack[] => {
        const tracks: AudioTrack[] = [];
        if (mode === 'arabic_only') {
            if (aya.audio) tracks.push({ type: 'arabic', label: 'Arabic Recitation', url: aya.audio });
        } else if (mode === 'urdu_only') {
            if (aya.urduAudio) tracks.push({ type: 'urdu', label: 'Urdu Translation', url: aya.urduAudio });
        } else if (mode === 'arabic_urdu') {
            if (aya.audio) tracks.push({ type: 'arabic', label: 'Arabic Recitation', url: aya.audio });
            if (aya.urduAudio) tracks.push({ type: 'urdu', label: 'Urdu Translation', url: aya.urduAudio });
        } else {
            // 'full'
            if (aya.audio) tracks.push({ type: 'arabic', label: 'Arabic Recitation', url: aya.audio });
            if (aya.urduAudio) tracks.push({ type: 'urdu', label: 'Urdu Translation', url: aya.urduAudio });
            if (aya.englishAudio) tracks.push({ type: 'english', label: 'English Translation', url: aya.englishAudio });
        }
        return tracks;
    };

    // Immediate and complete audio halt: cancels any pending async steps and stops active element immediately
    const stopAudio = () => {
        // 1. Invalidate any in-flight playback sessions so async callbacks abort immediately
        playbackSessionIdRef.current += 1;

        // 2. Halt and clear current audio element
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.onended = null;
            audioRef.current.onerror = null;
            audioRef.current.src = '';
            audioRef.current = null;
        }

        // 3. Clean up blob URLs
        if (activeBlobUrlRef.current) {
            try {
                URL.revokeObjectURL(activeBlobUrlRef.current);
            } catch {}
            activeBlobUrlRef.current = null;
        }

        // 4. Cancel any speech synthesis / tafseer speech
        try {
            if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                window.speechSynthesis.cancel();
            }
        } catch {}

        if (tafseerAudioRef.current) {
            tafseerAudioRef.current.pause();
            tafseerAudioRef.current.onended = null;
            tafseerAudioRef.current.onerror = null;
            tafseerAudioRef.current.src = '';
            tafseerAudioRef.current = null;
        }

        setAudio(null);
        setPlayingAya(null);
        setAudioQueue([]);
        setCurrentQueueIndex(0);
        setCurrentTrackType(null);
    };

    // Play next track in sequence with rock-solid session check
    const playTrackAt = async (
        tracks: AudioTrack[],
        index: number,
        ayahNumber: number,
        sessionId: number,
        activeMode: AudioMode
    ) => {
        // If user switched or stopped audio, immediately abort!
        if (sessionId !== playbackSessionIdRef.current) return;

        if (index >= tracks.length) {
            addPoints(5);
            unlockAchievement('first_step');

            // If auto-advance is enabled, automatically start next ayah!
            if (autoPlayNext) {
                const currentIdx = ayas.findIndex(a => a.number === ayahNumber);
                if (currentIdx !== -1 && currentIdx + 1 < ayas.length) {
                    const nextAyah = ayas[currentIdx + 1];
                    // Immediate seamless transition to next ayah
                    playAudioSequence(nextAyah, activeMode);
                    return;
                }
            }

            stopAudio();
            return;
        }

        const track = tracks[index];
        setCurrentQueueIndex(index);
        setCurrentTrackType(track.type);

        let playUrl = track.url;
        let isBlobUrl = false;

        try {
            const cache = await getAudioCache();
            if (sessionId !== playbackSessionIdRef.current) return;
            if (cache) {
                const response = await cache.match(playUrl);
                if (sessionId !== playbackSessionIdRef.current) return;
                if (response) {
                    const blob = await response.blob();
                    if (sessionId !== playbackSessionIdRef.current) return;
                    if (blob.size > 0) {
                        playUrl = URL.createObjectURL(blob);
                        isBlobUrl = true;
                        activeBlobUrlRef.current = playUrl;
                    }
                }
            }
        } catch (e) {
            console.warn("Error accessing cache for playback", e);
        }

        if (sessionId !== playbackSessionIdRef.current) {
            if (isBlobUrl) {
                try { URL.revokeObjectURL(playUrl); } catch {}
            }
            return;
        }

        // Ensure previous audio is completely dead
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.onended = null;
            audioRef.current.onerror = null;
            audioRef.current.src = '';
            audioRef.current = null;
        }

        if (!playUrl || typeof playUrl !== 'string' || !playUrl.trim()) {
            if (sessionId !== playbackSessionIdRef.current) return;
            playTrackAt(tracks, index + 1, ayahNumber, sessionId, activeMode);
            return;
        }

        const newAudio = new Audio(playUrl);
        audioRef.current = newAudio;
        setAudio(newAudio);

        const cleanup = () => {
            if (isBlobUrl) {
                try {
                    URL.revokeObjectURL(playUrl);
                } catch {}
                if (activeBlobUrlRef.current === playUrl) {
                    activeBlobUrlRef.current = null;
                }
            }
        };

        newAudio.onended = () => {
            cleanup();
            if (sessionId !== playbackSessionIdRef.current) return;
            playTrackAt(tracks, index + 1, ayahNumber, sessionId, activeMode);
        };

        newAudio.onerror = (e) => {
            console.warn("Audio playback failed for URL:", playUrl, e);
            cleanup();
            if (sessionId !== playbackSessionIdRef.current) return;
            // Advance to next track
            playTrackAt(tracks, index + 1, ayahNumber, sessionId, activeMode);
        };

        try {
            await newAudio.play();
        } catch (e) {
            if (sessionId !== playbackSessionIdRef.current) return;
            console.warn("Play() rejected:", e);
            cleanup();
            playTrackAt(tracks, index + 1, ayahNumber, sessionId, activeMode);
        }
    };

    // Primary audio playback launcher - immediately halts any prior playback
    const playAudioSequence = (aya: Aya, explicitMode?: AudioMode) => {
        const targetMode = explicitMode || audioMode;

        // If clicking the same ayah with same active track while it's playing, toggle pause/stop
        if (playingAya === aya.number && (explicitMode === undefined || explicitMode === audioMode)) {
            stopAudio();
            return;
        }

        // CRITICAL: Stop previous audio IMMEDIATELY before starting the new one
        stopAudio();
        stopTafseerAudio();

        setAudioMode(targetMode);
        try { localStorage.setItem('quran_audio_mode', targetMode); } catch {}

        const tracks = buildQueueForAyah(aya, targetMode);
        if (tracks.length === 0) {
            let msg = "Audio not available for this Ayah.";
            if (targetMode === 'urdu_only') msg = "Urdu audio not available for this Ayah.";
            else if (targetMode === 'arabic_only') msg = "Quran audio not available for this Ayah.";
            else if (targetMode === 'arabic_urdu') msg = "Arabic & Urdu audio not available for this Ayah.";
            else if (targetMode === 'full') msg = "Audio recitation tracks not available for this Ayah.";
            showToast(msg);
            setPlayingAya(null);
            return;
        }

        const sessionId = ++playbackSessionIdRef.current;
        setPlayingAya(aya.number);
        setAudioQueue(tracks.map(t => t.url));
        setCurrentQueueIndex(0);
        setCurrentTrackType(tracks[0].type);

        playTrackAt(tracks, 0, aya.number, sessionId, targetMode);
    };

    const playNextAyah = () => {
        if (playingAya === null || ayas.length === 0) return;
        const currentIdx = ayas.findIndex(a => a.number === playingAya);
        if (currentIdx !== -1 && currentIdx + 1 < ayas.length) {
            playAudioSequence(ayas[currentIdx + 1], audioMode);
        }
    };

    const playPrevAyah = () => {
        if (playingAya === null || ayas.length === 0) return;
        const currentIdx = ayas.findIndex(a => a.number === playingAya);
        if (currentIdx > 0) {
            playAudioSequence(ayas[currentIdx - 1], audioMode);
        }
    };


    const activeVoiceControllerRef = useRef<VoicePlaybackController | null>(null);

    // Tafseer Audio Speech Synthesis powered by Gemini AI Voice with browser fallback
    const speak = async (text: string, lang: string): Promise<void> => {
        const safeText = text ? text.trim() : "";
        if (!safeText) return;

        // Stop any existing tafseer audio
        if (activeVoiceControllerRef.current) {
            try { activeVoiceControllerRef.current.stop(); } catch {}
            activeVoiceControllerRef.current = null;
        }
        stopCurrentAiVoice();

        return new Promise((resolve) => {
            const controller = playAiVoice(safeText, {
                lang: lang || 'ur',
                onStart: () => {},
                onEnd: () => {
                    activeVoiceControllerRef.current = null;
                    resolve();
                },
                onError: (err) => {
                    console.warn("AI Voice notice:", err);
                    activeVoiceControllerRef.current = null;
                    resolve();
                }
            });
            activeVoiceControllerRef.current = controller;
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

        // 4. Background History Urdu
        console.log("Step 4: Background History Urdu");
        await speak(tafseerData.backgroundHistoryUrdu, 'ur');

        if (!isTafseerPlaying) return;

        // 5. Historical Context
        console.log("Step 5: Historical Context");
        await speak("Historical Context: " + tafseerData.historicalContext, 'en-US');

        if (!isTafseerPlaying) return;

        // 6. Historical Context Urdu
        console.log("Step 6: Historical Context Urdu");
        await speak(tafseerData.historicalContextUrdu, 'ur');

        if (!isTafseerPlaying) return;

        // 7. Did You Know
        console.log("Step 7: Did You Know");
        await speak("Did you know? " + tafseerData.didYouKnow, 'en-US');

        if (!isTafseerPlaying) return;

        // 8. Quiz Question
        console.log("Step 8: Quiz");
        await speak("Quiz time! " + tafseerData.quiz.question, 'en-US');

        console.log("Tafseer sequence finished");
        setIsTafseerPlaying(false);
    };

    const playSectionVoice = async (sectionKey: string, text: string, lang: string) => {
        if (!text || !text.trim()) return;

        // If the user clicks the currently playing section button, toggle it off
        if (playingSectionKey === sectionKey) {
            stopTafseerAudio();
            return;
        }

        // Stop any ongoing Quran playback or previous section speech
        stopAudio();
        stopTafseerAudio();

        setPlayingSectionKey(sectionKey);
        setIsTafseerPlaying(true);

        try {
            await speak(text, lang);
        } catch (err) {
            console.warn("Section audio speech notice:", err);
        } finally {
            setPlayingSectionKey(prev => (prev === sectionKey ? null : prev));
            setIsTafseerPlaying(false);
        }
    };

    const stopTafseerAudio = () => {
        if (activeVoiceControllerRef.current) {
            try {
                activeVoiceControllerRef.current.stop();
            } catch {}
            activeVoiceControllerRef.current = null;
        }
        stopCurrentAiVoice();
        if (tafseerAudioRef.current) {
            try {
                tafseerAudioRef.current.pause();
            } catch {}
            tafseerAudioRef.current = null;
        }
        if (typeof window !== 'undefined' && window.speechSynthesis) {
            try {
                window.speechSynthesis.cancel();
            } catch {}
        }
        setIsTafseerPlaying(false);
        setPlayingSectionKey(null);
        currentUtteranceRef.current = null;
    };

    const fetchTafseer = async (aya: Aya) => {
        // Immediately pause and halt any active Quran audio playback
        stopAudio();
        stopTafseerAudio();

        if (tafseerOpen === aya.number) {
            setTafseerOpen(null);
            return;
        }

        setTafseerOpen(aya.number);
        setTafseerData(null);
        setQuizAnswered(false);
        setSelectedOption(null);
        setIsCorrect(false);
        setTafseerLoading(true);

        // Check Static Data First
        if (staticSurahData && staticSurahData.tafseer && staticSurahData.tafseer[aya.number]) {
            const data = staticSurahData.tafseer[aya.number];
            setTafseerData(data);
            setTafseerLoading(false);
            return;
        }

        // Check Local Storage for Tafseer
        const localTafseerKey = `tafseer_${sura}_${aya.number}`;
        const localTafseer = localStorage.getItem(localTafseerKey);
        if (localTafseer) {
            try {
                setTafseerData(JSON.parse(localTafseer));
                setTafseerLoading(false);
                return;
            } catch (e) {
                console.error("Failed to parse local tafseer", e);
                localStorage.removeItem(localTafseerKey);
            }
        }

        try {
            let data;
            const apiKey = process.env.GEMINI_API_KEY || import.meta.env.VITE_GEMINI_API_KEY;

            // Helper function to fetch from API
            const fetchFromApi = async () => {
                try {
                    const response = await fetch('/api/tafseer', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            surah: `${surahInfo?.englishName} (${sura})`,
                            ayah: aya.number,
                            arabic: aya.text,
                            urduTranslation: aya.urduTranslation,
                            englishTranslation: aya.translation
                        })
                    });
                    if (response.ok) {
                        return await response.json();
                    }
                } catch (apiErr) {
                    console.warn("Backend tafseer API request error:", apiErr);
                }
                // Fallback structured data
                return {
                    explanation: `اس مبارک آیت میں اللہ تعالیٰ کا پیغام ہدایت اور رحمت ہے۔ ${aya.urduTranslation || ''} یہ آیت ہمیں اللہ تعالیٰ کی قدرت، حکمت اور اس کی بندگی کی طرف متوجہ کرتی ہے۔`,
                    englishExplanation: `In this noble Ayah, Allah Almighty conveys divine guidance: "${aya.translation || ''}". This verse inspires mindfulness, righteousness, and sincere reflection on faith.`,
                    backgroundHistory: `Revealed in the holy context of Surah ${surahInfo?.englishName || sura}, this verse addresses believers with spiritual firmness and moral clarity.`,
                    backgroundHistoryUrdu: `سورۃ ${surahInfo?.name || sura} کی یہ مبارک آیت مومنین کے دلوں کو تسکین دینے اور ایمان کو مضبوط کرنے کے لیے نازل ہوئی۔`,
                    historicalContext: `Commentators of the Quran emphasize that this verse relates deeply to Islamic teachings on devotion, steadfastness, and gratitude to Allah.`,
                    historicalContextUrdu: `مفسرینِ کرام فرماتے ہیں کہ اس آیت کا تعلق اسلامی تعلیمات کے بنیادی ستونوں—اخلاص، صبر اور توحید—سے وابستہ ہے۔`,
                    didYouKnow: `Every single letter recited from the Quran brings ten rewards, multiplying tranquility in the believer's life.`,
                    quiz: { question: "What is the primary theme highlighted in this Ayah?", options: ["Divine Guidance & Faith", "Worldly Distraction", "Doubt"], correctIndex: 0 }
                };
            };

            if (apiKey) {
                try {
                    const ai = new GoogleGenAI({ apiKey });
                    const prompt = `
                    You are an Islamic scholar. Provide a JSON response with:
                    1. "explanation": A clear, general Tafseer (explanation) in Urdu for the following Quran Ayah.
                    2. "englishExplanation": A clear, general Tafseer (explanation) in English for the following Quran Ayah.
                    3. "backgroundHistory": A detailed "Asbab al-Nuzul" (Background History) explaining when this Ayah was revealed and the story behind it in English.
                    4. "backgroundHistoryUrdu": A detailed "Asbab al-Nuzul" (Background History) explaining when this Ayah was revealed and the story behind it in Urdu.
                    5. "historicalContext": A brief section providing historical context or related events mentioned in the Quran or authentic Hadith relevant to this Ayah in English.
                    6. "historicalContextUrdu": A brief section providing historical context or related events mentioned in the Quran or authentic Hadith relevant to this Ayah in Urdu.
                    7. "didYouKnow": A fun fact related to this Ayah or Surah in English.
                    8. "quiz": A simple multiple choice question object with "question" (string), "options" (array of 3 strings), and "correctIndex" (number 0-2).

                    Surah: ${surahInfo?.englishName} (${sura}), Ayah: ${aya.number}
                    Arabic: ${aya.text}
                    Urdu Translation: ${aya.urduTranslation}
                    English Translation: ${aya.translation}
                    
                    Format: JSON only. No markdown.
                    `;

                    const response = await ai.models.generateContent({
                        model: "gemini-3.8-flash",
                        contents: prompt,
                        config: { responseMimeType: "application/json" }
                    });

                    let rawText = response.text || "{}";
                    rawText = rawText.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/\s*```$/i, '').trim();
                    data = JSON.parse(rawText);
                } catch (clientError) {
                    console.warn("Client-side generation notice, retrieving via server API...", clientError);
                    data = await fetchFromApi();
                }
            } else {
                // No API key on client, call server API
                data = await fetchFromApi();
            }

            setTafseerData(data);
            
            // Save to Local Storage
            try {
                localStorage.setItem(localTafseerKey, JSON.stringify(data));
            } catch {}
            
            addPoints(20);
            unlockAchievement('scholar_junior');
        } catch (err) {
            console.warn("Tafseer load fallback:", err);
            setTafseerData({
                explanation: `اس مبارک آیت میں اللہ تعالیٰ کا پیغام ہدایت اور رحمت ہے۔ ${aya.urduTranslation || ''}`,
                englishExplanation: `In this noble Ayah, Allah Almighty conveys divine guidance: "${aya.translation || ''}".`,
                backgroundHistory: "Background history highlights reflection and steadfast faith in divine wisdom.",
                backgroundHistoryUrdu: "پس منظر کی تاریخ ایمان کی مضبوطی اور توکل کی تعلیم دیتی ہے۔",
                historicalContext: "Historical context connects with steadfastness and gratitude in every circumstance.",
                historicalContextUrdu: "تاریخی سیاق و سباق شکر گزاری اور ثابت قدمی کے واقعات سے وابستہ ہے۔",
                didYouKnow: "The Holy Quran is a source of continuous peace and spiritual elevation for the heart.",
                quiz: { question: "What is the primary message of this holy verse?", options: ["Patience and Faith", "Despair", "Arrogance"], correctIndex: 0 }
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
        <div className="min-h-screen bg-sky-50 pb-32 pt-24 px-4 sm:px-8 lg:px-12 xl:px-16 font-sans selection:bg-yellow-200 selection:text-blue-900 w-full">
            <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Sidebar: Search & Navigation */}
                <div className="lg:col-span-3 lg:sticky lg:top-4 z-40">
                    <div className="bg-white p-6 rounded-3xl shadow-xl border-4 border-sky-200 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-sky-100 rounded-full -mr-10 -mt-10 opacity-50 pointer-events-none" />
                        
                        <div className="relative z-10 flex flex-col gap-4">
                            {/* Recently Read Banner */}
                            {lastRead && (
                                <motion.button
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    onClick={handleContinueReading}
                                    className="bg-orange-50 text-orange-800 p-3 rounded-2xl flex items-center justify-between w-full border-2 border-orange-100 hover:bg-orange-100 transition-colors group"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="bg-orange-200 p-2 rounded-xl text-orange-600 group-hover:scale-110 transition-transform">
                                            <History size={20} strokeWidth={2.5} />
                                        </div>
                                        <div className="text-left">
                                            <p className="text-xs font-black uppercase tracking-wider text-orange-400">Continue</p>
                                            <p className="font-black text-sm text-slate-700 truncate max-w-[100px]">{lastRead.surahName}</p>
                                        </div>
                                    </div>
                                    <ChevronRight size={20} className="text-orange-400" strokeWidth={3} />
                                </motion.button>
                            )}

                            {/* Search Bar */}
                            <div className="relative group">
                                <Search className="absolute left-4 top-3.5 text-sky-400 group-focus-within:text-sky-500 transition-colors" size={24} strokeWidth={3} />
                                <input 
                                    type="text" 
                                    placeholder="Search Surah..." 
                                    value={searchQuery}
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value);
                                        setIsSearchOpen(true);
                                    }}
                                    onFocus={() => setIsSearchOpen(true)}
                                    className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-sky-100 focus:border-sky-400 focus:outline-none text-slate-700 font-bold placeholder:text-sky-300/70 bg-sky-50/50 transition-all shadow-inner focus:bg-white"
                                />
                                {isSearchOpen && searchQuery && (
                                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border-2 border-sky-100 max-h-60 overflow-y-auto z-50">
                                        {filteredSurahs.map(s => (
                                            <div 
                                                key={s.number}
                                                onClick={() => {
                                                    setSura(s.number);
                                                    setIsSearchOpen(false);
                                                    setSearchQuery('');
                                                }}
                                                className="p-3 hover:bg-sky-50 cursor-pointer flex justify-between items-center border-b border-slate-50 last:border-0"
                                            >
                                                <span className="font-bold text-slate-700 text-sm">{s.number}. {s.englishName}</span>
                                            </div>
                                        ))}
                                        {filteredSurahs.length === 0 && (
                                            <div className="p-4 text-center text-slate-400 font-bold">No Surah found 😢</div>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Navigation & Surah Title Card: Left/Right buttons integrated inside */}
                            <div className="mt-2 bg-sky-50 p-3 sm:p-4 rounded-2xl border-2 border-sky-100 flex items-center justify-between gap-3 shadow-sm">
                                <button 
                                    onClick={() => setSura(Math.max(1, sura - 1))}
                                    disabled={sura === 1}
                                    className="p-2.5 sm:p-3 bg-white text-sky-600 rounded-xl hover:bg-sky-100 disabled:opacity-30 disabled:cursor-not-allowed transition shadow-sm border border-sky-200 active:scale-95 flex-shrink-0"
                                    title="Previous Surah"
                                >
                                    <ChevronLeft size={20} strokeWidth={3} />
                                </button>

                                <div className="text-center flex-1 min-w-0 px-2">
                                    <h1 className="text-xl sm:text-2xl font-black text-slate-800 drop-shadow-sm truncate">
                                        {surahInfo ? `${surahInfo.englishName}` : `Surah ${sura}`}
                                    </h1>
                                    {surahInfo && (
                                        <p className="text-base sm:text-lg text-sky-500 font-black mt-0.5" style={{ fontFamily: 'Traditional Arabic, serif' }}>
                                            {surahInfo.name}
                                        </p>
                                    )}
                                </div>

                                <button 
                                    onClick={() => setSura(Math.min(114, sura + 1))}
                                    disabled={sura === 114}
                                    className="p-2.5 sm:p-3 bg-white text-emerald-700 rounded-xl hover:bg-emerald-100 disabled:opacity-30 disabled:cursor-not-allowed transition shadow-sm border border-emerald-200 active:scale-95 flex-shrink-0"
                                    title="Next Surah"
                                >
                                    <ChevronRight size={20} strokeWidth={3} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content: Ayas List */}
                <div className="lg:col-span-9 w-full">
                    {/* Ayah Search Bar */}
                    <div className="mb-6 bg-white p-4 rounded-2xl shadow-sm border-2 border-sky-100 flex items-center gap-3 sticky top-4 z-30">
                        <Search className="text-sky-400" size={20} />
                        <input 
                            type="text" 
                            placeholder={`Search in Surah ${surahInfo?.englishName || ''}... (e.g. "Mercy" or "255")`}
                            value={ayahSearchQuery}
                            onChange={(e) => setAyahSearchQuery(e.target.value)}
                            className="flex-1 bg-transparent focus:outline-none text-slate-700 font-bold placeholder:text-slate-300"
                        />
                        {ayahSearchQuery && (
                            <button onClick={() => setAyahSearchQuery('')} className="text-slate-400 hover:text-rose-500">
                                <span className="sr-only">Clear</span>
                                <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center font-bold text-xs">✕</div>
                            </button>
                        )}
                    </div>

                    {/* Clean Audio Toolbar with all 4 listening options & default continuous auto-play */}
                    <div className="mb-6 bg-white/95 backdrop-blur-md p-4 rounded-3xl border-2 border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
                        <div className="flex flex-wrap items-center gap-2.5">
                            <span className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5 mr-1">
                                <Headphones size={16} className="text-sky-500" /> Audio:
                            </span>

                            {/* 1. Quran Only */}
                            <button
                                type="button"
                                onClick={() => {
                                    stopAudio();
                                    setAudioMode('arabic_only');
                                }}
                                className={`px-3.5 py-2 rounded-2xl text-xs font-black flex items-center gap-1.5 transition-all border-2 shadow-[0_2px_0_rgba(0,0,0,0.06)] active:translate-y-[1px] cursor-pointer ${
                                    audioMode === 'arabic_only'
                                        ? 'bg-sky-500 text-white border-sky-600 shadow-[0_3px_0_#0284c7] ring-2 ring-sky-300/60'
                                        : 'bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100 hover:border-sky-300'
                                }`}
                                title="Select mode: Arabic Quran Recitation only"
                            >
                                <Play size={14} className={audioMode === 'arabic_only' ? 'fill-white' : 'fill-sky-700'} />
                                <span>Quran Only</span>
                            </button>

                            {/* 2. Urdu Only */}
                            <button
                                type="button"
                                onClick={() => {
                                    stopAudio();
                                    setAudioMode('urdu_only');
                                }}
                                className={`px-3.5 py-2 rounded-2xl text-xs font-black flex items-center gap-1.5 transition-all border-2 shadow-[0_2px_0_rgba(0,0,0,0.06)] active:translate-y-[1px] cursor-pointer ${
                                    audioMode === 'urdu_only'
                                        ? 'bg-emerald-600 text-white border-emerald-700 shadow-[0_3px_0_#047857] ring-2 ring-emerald-300/60'
                                        : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 hover:border-emerald-300'
                                }`}
                                title="Select mode: Urdu Translation only"
                            >
                                <Radio size={14} />
                                <span>Urdu Only</span>
                            </button>

                            {/* 3. Arabic + Urdu */}
                            <button
                                type="button"
                                onClick={() => {
                                    stopAudio();
                                    setAudioMode('arabic_urdu');
                                }}
                                className={`px-3.5 py-2 rounded-2xl text-xs font-black flex items-center gap-1.5 transition-all border-2 shadow-[0_2px_0_rgba(0,0,0,0.06)] active:translate-y-[1px] cursor-pointer ${
                                    audioMode === 'arabic_urdu'
                                        ? 'bg-violet-600 text-white border-violet-700 shadow-[0_3px_0_#6d28d9] ring-2 ring-violet-300/60'
                                        : 'bg-violet-50 text-violet-700 border-violet-200 hover:bg-violet-100 hover:border-violet-300'
                                }`}
                                title="Select mode: Arabic Recitation followed by Urdu Translation"
                            >
                                <Volume2 size={14} />
                                <span>Arabic + Urdu</span>
                            </button>

                            {/* 4. Arabic + Urdu + English */}
                            <button
                                type="button"
                                onClick={() => {
                                    stopAudio();
                                    setAudioMode('full');
                                }}
                                className={`px-3.5 py-2 rounded-2xl text-xs font-black flex items-center gap-1.5 transition-all border-2 shadow-[0_2px_0_rgba(0,0,0,0.06)] active:translate-y-[1px] cursor-pointer ${
                                    audioMode === 'full'
                                        ? 'bg-indigo-600 text-white border-indigo-700 shadow-[0_3px_0_#4338ca] ring-2 ring-indigo-300/60'
                                        : 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100 hover:border-indigo-300'
                                }`}
                                title="Select mode: Arabic Recitation + Urdu Translation + English Translation"
                            >
                                <Sparkles size={14} />
                                <span>Arabic + Urdu + Eng</span>
                            </button>
                        </div>

                        {/* Active Playback info & navigation controls */}
                        {playingAya !== null && (
                            <div className="flex flex-wrap items-center gap-2.5 bg-slate-50 px-3.5 py-1.5 rounded-2xl border border-slate-200">
                                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                                <span className="text-xs font-black text-slate-700">
                                    Ayah {playingAya}:{' '}
                                    <span className={
                                        audioMode === 'urdu_only' ? 'text-emerald-600' :
                                        audioMode === 'arabic_urdu' ? 'text-violet-600' :
                                        audioMode === 'full' ? 'text-indigo-600' :
                                        'text-sky-600'
                                    }>
                                        {audioMode === 'urdu_only' ? 'Urdu Only' :
                                         audioMode === 'arabic_urdu' ? 'Arabic + Urdu' :
                                         audioMode === 'full' ? 'Arabic + Urdu + Eng' :
                                         'Quran Only'}
                                    </span>
                                    {currentTrackType && (
                                        <span className="text-[10px] ml-1.5 font-bold text-slate-500 uppercase">
                                            ({currentTrackType === 'arabic' ? 'Arabic' : currentTrackType === 'urdu' ? 'Urdu' : 'English'})
                                        </span>
                                    )}
                                </span>
                                <div className="flex items-center gap-1 ml-1">
                                    <button
                                        onClick={playPrevAyah}
                                        className="p-1.5 rounded-xl bg-white hover:bg-slate-200 text-slate-700 transition-colors border border-slate-200 shadow-sm"
                                        title="Previous Ayah"
                                    >
                                        <SkipBack size={15} />
                                    </button>
                                    <button
                                        onClick={stopAudio}
                                        className="px-2.5 py-1.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-black text-xs flex items-center gap-1 shadow-sm transition-colors"
                                        title="Stop Audio"
                                    >
                                        <StopCircle size={14} /> Stop
                                    </button>
                                    <button
                                        onClick={playNextAyah}
                                        className="p-1.5 rounded-xl bg-white hover:bg-slate-200 text-slate-700 transition-colors border border-slate-200 shadow-sm"
                                        title="Next Ayah"
                                    >
                                        <SkipForward size={15} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {loading ? (
                        <div className="text-center py-20 text-sky-600 font-black animate-bounce text-xl">Loading Surah... 🚀</div>
                    ) : (
                        <div className="space-y-6">
                            {ayas.map((aya) => {
                                const isBookmarked = bookmarks.includes(`${sura}:${aya.number}`);
                                const isPlayingThisAyah = playingAya === aya.number;
                                return (
                                    <motion.div 
                                        key={aya.number}
                                        id={`ayah-${aya.number}`}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`bg-white rounded-3xl p-6 sm:p-8 shadow-sm border-2 transition-all relative ${
                                            isPlayingThisAyah 
                                                ? 'border-sky-400 ring-4 ring-sky-100 shadow-md' 
                                                : 'border-slate-100 hover:border-slate-200'
                                        }`}
                                    >
                                        {/* Ayah Header Bar */}
                                        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
                                            <div className="flex items-center gap-2">
                                                <span className="w-10 h-10 rounded-2xl bg-amber-100/80 text-amber-900 font-black flex items-center justify-center text-sm shadow-xs border border-amber-200">
                                                    {aya.number}
                                                </span>
                                                <span className="text-xs font-bold text-slate-400 tracking-wider">
                                                    {sura}:{aya.number}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-2 flex-wrap">
                                                {/* Play Button */}
                                                <button
                                                    type="button"
                                                    onClick={() => playAudioSequence(aya)}
                                                    className={`px-3.5 py-1.5 rounded-2xl text-xs font-black flex items-center gap-1.5 transition-all shadow-xs border ${
                                                        isPlayingThisAyah
                                                            ? 'bg-sky-500 text-white border-sky-600 shadow-sm'
                                                            : 'bg-sky-50 text-sky-800 border-sky-200 hover:bg-sky-100'
                                                    }`}
                                                    title={isPlayingThisAyah ? "Pause Audio" : "Play Ayah"}
                                                >
                                                    {isPlayingThisAyah ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}
                                                    <span>{isPlayingThisAyah ? "Pause" : "Play"}</span>
                                                </button>

                                                {/* Explain / Tafseer Button */}
                                                <button
                                                    type="button"
                                                    onClick={() => fetchTafseer(aya)}
                                                    className={`px-3.5 py-1.5 rounded-2xl text-xs font-black flex items-center gap-1.5 transition-all shadow-xs border ${
                                                        tafseerOpen === aya.number
                                                            ? 'bg-amber-500 text-white border-amber-600'
                                                            : 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
                                                    }`}
                                                >
                                                    <Sparkles size={14} className={tafseerOpen === aya.number ? "fill-white" : "text-amber-500 fill-amber-500"} />
                                                    <span>Explain</span>
                                                </button>

                                                {/* Bookmark Button */}
                                                <button
                                                    type="button"
                                                    onClick={() => toggleBookmark(aya.number)}
                                                    className={`p-2 rounded-2xl transition-all border ${
                                                        isBookmarked
                                                            ? 'bg-amber-400 text-white border-amber-500 shadow-xs'
                                                            : 'bg-white text-slate-400 border-slate-200 hover:text-amber-500 hover:border-amber-300'
                                                    }`}
                                                    title={isBookmarked ? "Remove Bookmark" : "Bookmark Ayah"}
                                                >
                                                    <Bookmark size={15} className={isBookmarked ? "fill-white" : ""} />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Arabic Text */}
                                        <div className="text-right mb-6 px-2" dir="rtl">
                                            <p className={`text-4xl font-serif leading-[2.2] transition-all duration-300 ${isPlayingThisAyah && currentTrackType === 'arabic' ? 'text-sky-600 drop-shadow-sm font-bold' : 'text-slate-800'}`} style={{ fontFamily: 'Traditional Arabic, serif' }}>
                                                <HighlightText text={aya.text} highlight={ayahSearchQuery} />
                                            </p>
                                        </div>
                                        
                                        {/* Urdu Translation (No border boundary, green highlight when active) */}
                                        <div className="text-right mb-6 px-2" dir="rtl">
                                            <p className={`text-2xl leading-[2.3] font-medium transition-all duration-300 ${
                                                isPlayingThisAyah && currentTrackType === 'urdu'
                                                    ? 'text-emerald-600 drop-shadow-sm font-bold'
                                                    : 'text-slate-600'
                                            }`} style={{ fontFamily: 'Noto Nastaliq Urdu, serif' }}>
                                                <HighlightText text={aya.urduTranslation} highlight={ayahSearchQuery} />
                                            </p>
                                        </div>
        
                                        {/* English Translation (No border boundary, glorious font & assigned indigo highlight when active) */}
                                        <div className="mb-6 px-2">
                                            <p className={`text-xl sm:text-2xl leading-[1.8] font-serif transition-all duration-300 ${
                                                isPlayingThisAyah && currentTrackType === 'english'
                                                    ? 'text-indigo-600 drop-shadow-sm font-semibold'
                                                    : 'text-slate-700 font-normal'
                                            }`} style={{ fontFamily: "'Cormorant Garamond', Georgia, 'Times New Roman', serif" }}>
                                                “<HighlightText text={aya.translation} highlight={ayahSearchQuery} />”
                                            </p>
                                        </div>
    
                                        {/* Tafseer & Quiz Section */}
                                        <AnimatePresence>
                                            {tafseerOpen === aya.number && (
                                                <motion.div 
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="mt-8 bg-amber-50 rounded-[2rem] p-6 border-4 border-amber-100 relative">
                                                        <div className="absolute top-0 left-0 w-20 h-20 bg-yellow-100 rounded-full -ml-6 -mt-6 opacity-50" />
                                                        
                                                        <div className="relative z-10">
                                                            <div className="flex justify-between items-center mb-6">
                                                                <h4 className="text-amber-800 font-black flex items-center gap-2 text-lg" style={{ fontFamily: "'Outfit', sans-serif" }}>
                                                                    <Sparkles size={20} className="text-amber-500 fill-amber-500" /> Fun Explanation & Insights
                                                                </h4>
                                                                {isTafseerPlaying && (
                                                                    <button
                                                                        type="button"
                                                                        onClick={stopTafseerAudio}
                                                                        className="px-3.5 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition border-2 bg-rose-500 text-white border-rose-600 shadow-sm animate-pulse"
                                                                    >
                                                                        <Pause size={14} fill="currentColor" /> Stop Voice
                                                                    </button>
                                                                )}
                                                            </div>
                                                            
                                                            {tafseerLoading ? (
                                                            <div className="text-amber-600 font-bold animate-pulse flex items-center gap-2">
                                                                <div className="w-4 h-4 bg-amber-400 rounded-full animate-bounce" /> Asking the scholar...
                                                            </div>
                                                        ) : tafseerData ? (
                                                            <div className="space-y-6">
                                                                {/* Urdu Explanation */}
                                                                <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm border-2 border-amber-100 hover:border-amber-200 transition-all">
                                                                    <div className="flex items-center justify-between gap-3 mb-3 pb-2 border-b border-amber-50">
                                                                        <div className="flex items-center gap-2">
                                                                            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                                                                            <span className="text-xs font-black uppercase tracking-wider text-amber-800" style={{ fontFamily: "'Outfit', sans-serif" }}>
                                                                                Urdu Explanation • اردو تشریح
                                                                            </span>
                                                                        </div>
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => playSectionVoice('urdu_explanation', tafseerData.explanation, 'ur')}
                                                                            className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all shadow-xs border ${
                                                                                playingSectionKey === 'urdu_explanation'
                                                                                    ? 'bg-rose-500 text-white border-rose-600 ring-2 ring-rose-400 animate-pulse'
                                                                                    : 'bg-amber-100/90 text-amber-900 hover:bg-amber-200 border-amber-300'
                                                                            }`}
                                                                            title="اردو تشریح سنیں"
                                                                        >
                                                                            {playingSectionKey === 'urdu_explanation' ? (
                                                                                <><Pause size={13} fill="currentColor" /> روکیں (Stop)</>
                                                                            ) : (
                                                                                <><Volume2 size={13} /> اردو سنیں</>
                                                                            )}
                                                                        </button>
                                                                    </div>
                                                                    <p className="text-amber-950 text-right leading-loose whitespace-pre-wrap text-2xl font-medium" dir="rtl" style={{ fontFamily: 'Noto Nastaliq Urdu, serif' }}>
                                                                        {tafseerData.explanation}
                                                                    </p>
                                                                </div>
                                    
                                                                {/* English Explanation */}
                                                                <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm border-2 border-indigo-100 hover:border-indigo-200 transition-all">
                                                                    <div className="flex items-center justify-between gap-3 mb-3 pb-2 border-b border-indigo-50">
                                                                        <div className="flex items-center gap-2">
                                                                            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
                                                                            <span className="text-xs font-black uppercase tracking-wider text-indigo-900" style={{ fontFamily: "'Outfit', sans-serif" }}>
                                                                                English Meaning & Deep Reflection
                                                                            </span>
                                                                        </div>
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => playSectionVoice('english_explanation', tafseerData.englishExplanation, 'en-US')}
                                                                            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs border ${
                                                                                playingSectionKey === 'english_explanation'
                                                                                    ? 'bg-rose-500 text-white border-rose-600 ring-2 ring-rose-400 animate-pulse'
                                                                                    : 'bg-indigo-50 text-indigo-800 hover:bg-indigo-100 border-indigo-200'
                                                                            }`}
                                                                            title="Listen to English Explanation"
                                                                        >
                                                                            {playingSectionKey === 'english_explanation' ? (
                                                                                <><Pause size={13} fill="currentColor" /> Stop Voice</>
                                                                            ) : (
                                                                                <><Volume2 size={13} /> Listen English</>
                                                                            )}
                                                                        </button>
                                                                    </div>
                                                                    <p className="text-slate-800 leading-[1.85] text-lg sm:text-[19px] whitespace-pre-wrap font-serif font-normal" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                                                                        {tafseerData.englishExplanation}
                                                                    </p>
                                                                </div>
                                    
                                                                {/* Background History */}
                                                                <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm border-l-8 border-indigo-400 border border-slate-100">
                                                                    <div className="flex items-center justify-between gap-3 mb-3">
                                                                        <h5 className="text-xs font-black text-indigo-700 uppercase tracking-wider flex items-center gap-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
                                                                            <BookOpen size={16} className="text-indigo-600" /> Story Time (History)
                                                                        </h5>
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => playSectionVoice('story_english', "Background story: " + tafseerData.backgroundHistory, 'en-US')}
                                                                            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs border ${
                                                                                playingSectionKey === 'story_english'
                                                                                    ? 'bg-rose-500 text-white border-rose-600 ring-2 ring-rose-400 animate-pulse'
                                                                                    : 'bg-indigo-50 text-indigo-800 hover:bg-indigo-100 border-indigo-200'
                                                                            }`}
                                                                            title="Listen to Story in English"
                                                                        >
                                                                            {playingSectionKey === 'story_english' ? (
                                                                                <><Pause size={13} fill="currentColor" /> Stop</>
                                                                            ) : (
                                                                                <><Volume2 size={13} /> Listen Story</>
                                                                            )}
                                                                        </button>
                                                                    </div>
                                                                    <p className="text-slate-800 leading-[1.8] text-base sm:text-[17px] whitespace-pre-wrap mb-5 font-normal" style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}>
                                                                        {tafseerData.backgroundHistory}
                                                                    </p>
                                                                    <div className="border-t-2 border-indigo-50 pt-4 mt-2">
                                                                        <div className="flex items-center justify-between gap-3 mb-3" dir="rtl">
                                                                            <span className="text-xs font-bold bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5" style={{ fontFamily: "'Noto Nastaliq Urdu', serif" }}>
                                                                                📖 اردو کہانی
                                                                            </span>
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => playSectionVoice('story_urdu', tafseerData.backgroundHistoryUrdu, 'ur')}
                                                                                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs border ${
                                                                                    playingSectionKey === 'story_urdu'
                                                                                        ? 'bg-rose-500 text-white border-rose-600 ring-2 ring-rose-400 animate-pulse'
                                                                                        : 'bg-indigo-50 text-indigo-800 hover:bg-indigo-100 border-indigo-200'
                                                                                }`}
                                                                                title="اردو کہانی سنیں"
                                                                            >
                                                                                {playingSectionKey === 'story_urdu' ? (
                                                                                    <><Pause size={13} fill="currentColor" /> روکیں</>
                                                                                ) : (
                                                                                    <><Volume2 size={13} /> کہانی سنیں</>
                                                                                )}
                                                                            </button>
                                                                        </div>
                                                                        <p className="text-slate-800 leading-loose text-2xl whitespace-pre-wrap text-right font-medium" dir="rtl" style={{ fontFamily: 'Noto Nastaliq Urdu, serif' }}>
                                                                            {tafseerData.backgroundHistoryUrdu}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                    
                                                                {/* Historical Context */}
                                                                <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm border-l-8 border-teal-400 border border-slate-100">
                                                                    <div className="flex items-center justify-between gap-3 mb-3">
                                                                        <h5 className="text-xs font-black text-teal-700 uppercase tracking-wider flex items-center gap-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
                                                                            <History size={16} className="text-teal-600" /> Historical Context: What Happened Then?
                                                                        </h5>
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => playSectionVoice('context_english', "Historical context: " + tafseerData.historicalContext, 'en-US')}
                                                                            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs border ${
                                                                                playingSectionKey === 'context_english'
                                                                                    ? 'bg-rose-500 text-white border-rose-600 ring-2 ring-rose-400 animate-pulse'
                                                                                    : 'bg-teal-50 text-teal-800 hover:bg-teal-100 border-teal-200'
                                                                            }`}
                                                                            title="Listen to Historical Context"
                                                                        >
                                                                            {playingSectionKey === 'context_english' ? (
                                                                                <><Pause size={13} fill="currentColor" /> Stop</>
                                                                            ) : (
                                                                                <><Volume2 size={13} /> Listen Context</>
                                                                            )}
                                                                        </button>
                                                                    </div>
                                                                    <p className="text-slate-800 leading-[1.8] text-base sm:text-[17px] whitespace-pre-wrap mb-5 font-normal" style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}>
                                                                        {tafseerData.historicalContext}
                                                                    </p>
                                                                    <div className="border-t-2 border-teal-50 pt-4 mt-2">
                                                                        <div className="flex items-center justify-between gap-3 mb-3" dir="rtl">
                                                                            <span className="text-xs font-bold bg-teal-50 text-teal-700 px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5" style={{ fontFamily: "'Noto Nastaliq Urdu', serif" }}>
                                                                                📜 تاریخی پس منظر (اردو)
                                                                            </span>
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => playSectionVoice('context_urdu', tafseerData.historicalContextUrdu, 'ur')}
                                                                                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs border ${
                                                                                    playingSectionKey === 'context_urdu'
                                                                                        ? 'bg-rose-500 text-white border-rose-600 ring-2 ring-rose-400 animate-pulse'
                                                                                        : 'bg-teal-50 text-teal-800 hover:bg-teal-100 border-teal-200'
                                                                                }`}
                                                                                title="اردو پس منظر سنیں"
                                                                            >
                                                                                {playingSectionKey === 'context_urdu' ? (
                                                                                    <><Pause size={13} fill="currentColor" /> روکیں</>
                                                                                ) : (
                                                                                <><Volume2 size={13} /> پس منظر سنیں</>
                                                                            )}
                                                                        </button>
                                                                    </div>
                                                                    <p className="text-slate-800 leading-loose text-2xl whitespace-pre-wrap text-right font-medium" dir="rtl" style={{ fontFamily: 'Noto Nastaliq Urdu, serif' }}>
                                                                        {tafseerData.historicalContextUrdu}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            
                                                            {/* Did You Know */}
                                                            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-5 sm:p-6 rounded-2xl border-2 border-yellow-200 border-dashed">
                                                                <div className="flex items-center justify-between gap-3 mb-2.5">
                                                                    <h5 className="text-xs font-black text-amber-900 uppercase tracking-wider flex items-center gap-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
                                                                        <HelpCircle size={16} className="text-amber-600" /> Did You Know?
                                                                    </h5>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => playSectionVoice('did_you_know', "Did you know? " + tafseerData.didYouKnow, 'en-US')}
                                                                        className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs border ${
                                                                            playingSectionKey === 'did_you_know'
                                                                                ? 'bg-rose-500 text-white border-rose-600 ring-2 ring-rose-400 animate-pulse'
                                                                                : 'bg-yellow-100 text-yellow-900 hover:bg-yellow-200 border-yellow-300'
                                                                        }`}
                                                                        title="Listen to Did You Know"
                                                                    >
                                                                        {playingSectionKey === 'did_you_know' ? (
                                                                            <><Pause size={13} fill="currentColor" /> Stop</>
                                                                        ) : (
                                                                            <><Volume2 size={13} /> Listen Fact</>
                                                                        )}
                                                                    </button>
                                                                </div>
                                                                <p className="text-base sm:text-lg text-amber-950 font-semibold leading-relaxed" style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}>
                                                                    {tafseerData.didYouKnow}
                                                                </p>
                                                            </div>
                                
                                                            {/* Quiz */}
                                                            <div className="bg-white p-6 rounded-[2rem] border-4 border-indigo-100 shadow-lg relative overflow-hidden">
                                                                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-bl-full -mr-8 -mt-8 opacity-50" />
                                                                <div className="flex items-center justify-between gap-3 mb-4 relative z-10">
                                                                    <h5 className="font-black text-indigo-900 text-lg flex items-center gap-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
                                                                        Quick Quiz Challenge! 🧠
                                                                    </h5>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => playSectionVoice('quiz', "Quick quiz question: " + tafseerData.quiz.question, 'en-US')}
                                                                        className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs border ${
                                                                            playingSectionKey === 'quiz'
                                                                                ? 'bg-rose-500 text-white border-rose-600 ring-2 ring-rose-400 animate-pulse'
                                                                                : 'bg-indigo-50 text-indigo-800 hover:bg-indigo-100 border-indigo-200'
                                                                        }`}
                                                                        title="Listen to Quiz Question"
                                                                    >
                                                                        {playingSectionKey === 'quiz' ? (
                                                                            <><Pause size={13} fill="currentColor" /> Stop Voice</>
                                                                        ) : (
                                                                            <><Volume2 size={13} /> Listen Question</>
                                                                        )}
                                                                    </button>
                                                                </div>
                                                                <p className="text-slate-800 mb-6 font-bold text-base sm:text-lg relative z-10" style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}>{tafseerData.quiz.question}</p>
                                                                <div className="space-y-3 relative z-10">
                                                                    {tafseerData.quiz.options.map((option, idx) => (
                                                                        <button
                                                                            key={idx}
                                                                            onClick={() => handleQuizAnswer(idx)}
                                                                            disabled={quizAnswered}
                                                                            className={`w-full text-left p-4 rounded-xl text-sm font-bold transition-all border-2 shadow-sm ${
                                                                                quizAnswered 
                                                                                    ? idx === tafseerData.quiz.correctIndex 
                                                                                        ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                                                                                        : idx === selectedOption 
                                                                                            ? 'bg-rose-100 text-rose-800 border-rose-300'
                                                                                            : 'bg-slate-50 text-slate-400 border-slate-100'
                                                                                    : 'bg-white hover:bg-indigo-50 text-slate-700 border-slate-100 hover:border-indigo-200'
                                                                            }`}
                                                                        >
                                                                            {option}
                                                                            {quizAnswered && idx === tafseerData.quiz.correctIndex && <Check size={18} className="inline ml-2 text-emerald-600" strokeWidth={3} />}
                                                                        </button>
                                                                    ))}
                                                                </div>
                                                                {quizAnswered && (
                                                                    <div className={`mt-4 text-sm font-black text-center p-3 rounded-xl ${isCorrect ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                                                                        {isCorrect ? '🎉 Correct! +30 Points' : 'Try again next time!'}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <p className="text-amber-900 font-bold">Failed to load content.</p>
                                                    )}
                                                </div>
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

                    {/* Hidden PDF Content */}
            <div style={{ position: 'absolute', top: '-10000px', left: '-10000px' }}>
                <div ref={pdfRef} className="w-[800px] bg-white p-12 font-sans text-slate-900">
                    {pdfData && surahInfo && (
                        <div className="space-y-8">
                            {/* Header */}
                            <div className="text-center border-b-4 border-slate-100 pb-8">
                                <h1 className="text-4xl font-black text-slate-800 mb-2">{surahInfo.englishName}</h1>
                                <h2 className="text-2xl font-serif text-slate-600 mb-4">{surahInfo.name}</h2>
                                <div className="flex justify-center gap-4 text-sm font-bold text-slate-500 uppercase tracking-widest">
                                    <span>Surah {surahInfo.number}</span>
                                    <span>•</span>
                                    <span>{surahInfo.revelationType}</span>
                                    <span>•</span>
                                    <span>{surahInfo.numberOfAyahs} Ayahs</span>
                                </div>
                            </div>

                            {/* Introduction */}
                            <div className="bg-slate-50 p-6 rounded-3xl border-2 border-slate-100">
                                <h3 className="text-xl font-black text-slate-800 mb-4 flex items-center gap-2">
                                    <BookOpen className="text-indigo-500" /> Introduction
                                </h3>
                                <p className="text-slate-700 leading-relaxed">{pdfData.introduction}</p>
                            </div>

                            {/* Background */}
                            <div>
                                <h3 className="text-xl font-black text-slate-800 mb-4">Background of Revelation</h3>
                                <p className="text-slate-700 leading-relaxed">{pdfData.background}</p>
                            </div>

                            {/* Key Themes */}
                            <div className="bg-indigo-50 p-6 rounded-3xl border-2 border-indigo-100">
                                <h3 className="text-xl font-black text-indigo-900 mb-4">Key Themes</h3>
                                <ul className="space-y-2">
                                    {pdfData.keyThemes?.map((theme: string, idx: number) => (
                                        <li key={idx} className="flex items-start gap-3 text-indigo-800">
                                            <div className="mt-1.5 w-2 h-2 bg-indigo-400 rounded-full shrink-0" />
                                            {theme}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Ayahs */}
                            <div>
                                <h3 className="text-xl font-black text-slate-800 mb-6">Verses</h3>
                                <div className="space-y-6">
                                    {ayas.map((aya) => (
                                        <div key={aya.number} className="border-b border-slate-100 pb-6 last:border-0 page-break-inside-avoid">
                                            <div className="flex justify-between items-start mb-4">
                                                <span className="bg-slate-100 text-slate-500 text-xs font-bold px-2 py-1 rounded-lg">
                                                    {sura}:{aya.number}
                                                </span>
                                                <p className="text-right font-serif text-2xl leading-loose text-slate-800 w-full pl-8" dir="rtl">
                                                    {aya.text}
                                                </p>
                                            </div>
                                            <p className="text-slate-800 text-lg mb-2 italic font-serif leading-relaxed" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>“{aya.translation}”</p>
                                            <p className="text-slate-600 text-sm text-right leading-loose" dir="rtl" style={{ fontFamily: 'Noto Nastaliq Urdu, serif' }}>{aya.urduTranslation}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Summary */}
                            <div className="bg-emerald-50 p-6 rounded-3xl border-2 border-emerald-100">
                                <h3 className="text-xl font-black text-emerald-900 mb-4">Summary</h3>
                                <p className="text-emerald-800 leading-relaxed">{pdfData.summary}</p>
                            </div>

                            {/* Quiz */}
                            <div className="page-break-inside-avoid">
                                <h3 className="text-xl font-black text-slate-800 mb-6">Knowledge Check</h3>
                                <div className="grid grid-cols-1 gap-4">
                                    {pdfData.quiz?.map((q: any, idx: number) => (
                                        <div key={idx} className="bg-white p-4 rounded-2xl border-2 border-slate-100">
                                            <p className="font-bold text-slate-800 mb-3">{idx + 1}. {q.question}</p>
                                            <div className="space-y-2">
                                                {q.options.map((opt: string, i: number) => (
                                                    <div key={i} className={`p-2 rounded-lg text-sm ${opt === q.correctAnswer ? 'bg-emerald-100 text-emerald-700 font-bold' : 'bg-slate-50 text-slate-600'}`}>
                                                        {opt}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="text-center text-slate-400 text-sm pt-8 border-t border-slate-100">
                                Generated by Reclaim Your Heart App
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Non-intrusive Toast Notification */}
            <AnimatePresence>
                {toastMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-6 right-6 z-50 bg-slate-900/90 backdrop-blur-md text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 font-bold border border-slate-700/50 text-sm max-w-sm"
                    >
                        <span>{toastMessage}</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default QuranReader;
