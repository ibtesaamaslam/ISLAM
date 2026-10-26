import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, Play, Pause, X, ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';
import { stopAllAppMedia } from '../utils/audioStopper';

interface AzanOverlayModalProps {
    isOpen: boolean;
    prayerName?: string;
    onClose: () => void;
    autoPlay?: boolean;
}

interface AzanPhrase {
    arabic: string;
    transliteration: string;
    urdu: string;
    english: string;
}

const AZAN_PHRASES: AzanPhrase[] = [
    {
        arabic: "اللَّهُ أَكْبَرُ ، اللَّهُ أَكْبَرُ",
        transliteration: "Allāhu Akbar, Allāhu Akbar",
        urdu: "اللہ سب سے بڑا ہے، اللہ سب سے بڑا ہے",
        english: "Allah is the Greatest, Allah is the Greatest"
    },
    {
        arabic: "اللَّهُ أَكْبَرُ ، اللَّهُ أَكْبَرُ",
        transliteration: "Allāhu Akbar, Allāhu Akbar",
        urdu: "اللہ سب سے بڑا ہے، اللہ سب سے بڑا ہے",
        english: "Allah is the Greatest, Allah is the Greatest"
    },
    {
        arabic: "أَشْهَدُ أَنْ لَا إِلٰهَ إِلَّا اللَّهُ",
        transliteration: "Ash-hadu allā ilāha illallāh",
        urdu: "میں گواہی دیتا ہوں کہ اللہ کے سوا کوئی معبود نہیں",
        english: "I bear witness that there is no deity worthy of worship except Allah"
    },
    {
        arabic: "أَشْهَدُ أَنْ لَا إِلٰهَ إِلَّا اللَّهُ",
        transliteration: "Ash-hadu allā ilāha illallāh",
        urdu: "میں گواہی دیتا ہوں کہ اللہ کے سوا کوئی معبود نہیں",
        english: "I bear witness that there is no deity worthy of worship except Allah"
    },
    {
        arabic: "أَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللَّهِ",
        transliteration: "Ash-hadu anna Muhammadan Rasūlullāh",
        urdu: "میں گواہی دیتا ہوں کہ محمد اللہ کے رسول ہیں",
        english: "I bear witness that Muhammad is the Messenger of Allah"
    },
    {
        arabic: "أَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللَّهِ",
        transliteration: "Ash-hadu anna Muhammadan Rasūlullāh",
        urdu: "میں گواہی دیتا ہوں کہ محمد اللہ کے رسول ہیں",
        english: "I bear witness that Muhammad is the Messenger of Allah"
    },
    {
        arabic: "حَيَّ عَلَى الصَّلَاةِ",
        transliteration: "Ḥayya 'alaṣ-Ṣalāh",
        urdu: "نماز کی طرف آؤ",
        english: "Come to prayer"
    },
    {
        arabic: "حَيَّ عَلَى الصَّلَاةِ",
        transliteration: "Ḥayya 'alaṣ-Ṣalāh",
        urdu: "نماز کی طرف آؤ",
        english: "Come to prayer"
    },
    {
        arabic: "حَيَّ عَلَى الْفَلَاحِ",
        transliteration: "Ḥayya 'alal-Falāḥ",
        urdu: "کامیابی کی طرف آؤ",
        english: "Come to success"
    },
    {
        arabic: "حَيَّ عَلَى الْفَلَاحِ",
        transliteration: "Ḥayya 'alal-Falāḥ",
        urdu: "کامیابی کی طرف آؤ",
        english: "Come to success"
    },
    {
        arabic: "اللَّهُ أَكْبَرُ ، اللَّهُ أَكْبَرُ",
        transliteration: "Allāhu Akbar, Allāhu Akbar",
        urdu: "اللہ سب سے بڑا ہے، اللہ سب سے بڑا ہے",
        english: "Allah is the Greatest, Allah is the Greatest"
    },
    {
        arabic: "لَا إِلٰهَ إِلَّا اللَّهُ",
        transliteration: "Lā ilāha illallāh",
        urdu: "اللہ کے سوا کوئی معبود نہیں",
        english: "There is no deity worthy of worship except Allah"
    }
];

// Authentic Adhan audio sources
const AZAN_AUDIO_URLS = [
    '/audio/makkah_azan.mp3',
    'https://archive.org/download/AthanAlHaram3/AthanAlmaghrib9-11-1436.mp3',
    'https://archive.org/download/AthanAlHaram3/athan_alisha_8-9-1436.mp3'
];

export const AzanOverlayModal: React.FC<AzanOverlayModalProps> = ({
    isOpen,
    onClose,
    autoPlay = true
}) => {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [isMuted, setIsMuted] = useState<boolean>(false);
    const [volume, setVolume] = useState<number>(0.9);
    const [activePhraseIdx, setActivePhraseIdx] = useState<number>(0);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [duration, setDuration] = useState<number>(210);
    const [audioSourceIdx, setAudioSourceIdx] = useState<number>(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Stop audio
    const stopAudio = () => {
        if (audioRef.current) {
            try {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            } catch {}
            audioRef.current = null;
        }
        setIsPlaying(false);
        setActivePhraseIdx(0);
        setCurrentTime(0);
    };

    // Initialize audio element when modal opens
    useEffect(() => {
        if (!isOpen) {
            stopAudio();
            return;
        }

        stopAllAppMedia();
        const currentUrl = AZAN_AUDIO_URLS[audioSourceIdx % AZAN_AUDIO_URLS.length];
        const audio = new Audio();
        audio.src = currentUrl;
        audio.preload = 'auto';
        audio.volume = volume;
        audio.muted = isMuted;

        audio.onplay = () => {
            setIsPlaying(true);
        };

        audio.onpause = () => {
            setIsPlaying(false);
        };

        audio.onended = () => {
            setIsPlaying(false);
            setActivePhraseIdx(AZAN_PHRASES.length - 1);
        };

        audio.onloadedmetadata = () => {
            if (audio.duration && !isNaN(audio.duration) && audio.duration > 10) {
                setDuration(audio.duration);
            }
        };

        audio.ontimeupdate = () => {
            const current = audio.currentTime;
            setCurrentTime(current);

            const dur = (audio.duration && !isNaN(audio.duration) && audio.duration > 10) 
                ? audio.duration 
                : duration;

            // Proportionally sync the 12 phrases across the Azan duration
            const segmentDuration = dur / AZAN_PHRASES.length;
            const phraseIdx = Math.min(
                AZAN_PHRASES.length - 1,
                Math.floor(current / segmentDuration)
            );
            setActivePhraseIdx(phraseIdx);
        };

        audio.onerror = () => {
            if (audioSourceIdx < AZAN_AUDIO_URLS.length - 1) {
                setAudioSourceIdx(prev => prev + 1);
            } else {
                setIsPlaying(false);
            }
        };

        audioRef.current = audio;

        if (autoPlay) {
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    setIsPlaying(true);
                }).catch(() => {
                    setIsPlaying(false);
                });
            }
        }

        return () => {
            stopAudio();
        };
    }, [isOpen, audioSourceIdx]);

    // Update volume / mute dynamically
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
            audioRef.current.muted = isMuted;
        }
    }, [volume, isMuted]);

    const handleTogglePlay = () => {
        if (isPlaying) {
            if (audioRef.current) audioRef.current.pause();
            setIsPlaying(false);
        } else {
            stopAllAppMedia();
            if (audioRef.current) {
                audioRef.current.play().then(() => {
                    setIsPlaying(true);
                }).catch(() => {
                    setAudioSourceIdx(prev => (prev + 1) % AZAN_AUDIO_URLS.length);
                });
            }
        }
    };

    const handleSeekPhrase = (idx: number) => {
        const targetIdx = Math.max(0, Math.min(AZAN_PHRASES.length - 1, idx));
        setActivePhraseIdx(targetIdx);
        if (audioRef.current && duration > 0) {
            const segmentDuration = duration / AZAN_PHRASES.length;
            audioRef.current.currentTime = targetIdx * segmentDuration;
        }
    };

    if (!isOpen) return null;

    const currentPhrase = AZAN_PHRASES[activePhraseIdx] || AZAN_PHRASES[0];
    const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[85] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
                {/* Serene Dark Backdrop */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 bg-slate-950/90 backdrop-blur-md"
                />

                {/* Pure Azan Card: Minimalist, clean, focused purely on the Azan recitation */}
                <motion.div 
                    initial={{ scale: 0.94, opacity: 0, y: 15 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.94, opacity: 0, y: 15 }}
                    className="relative z-10 w-full max-w-xl bg-gradient-to-b from-indigo-950 via-slate-900 to-slate-950 rounded-[2.5rem] p-6 sm:p-8 text-white shadow-2xl border-4 border-amber-400 text-center overflow-hidden my-auto"
                >
                    {/* Golden Ambient Glow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />

                    {/* Close button */}
                    <button 
                        onClick={onClose}
                        className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
                        title="Dismiss"
                    >
                        <X size={18} strokeWidth={2.5} />
                    </button>

                    {/* Top Simple Azan Indicator */}
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-black uppercase tracking-widest border border-amber-400/30 mb-6">
                        <Sparkles size={14} className="text-amber-400" />
                        <span>The Call to Prayer (الأذان)</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                    </div>

                    {/* Dynamic Synchronized Phrase Display: Previous phrase fades away, active phrase shines */}
                    <div className="min-h-[220px] sm:min-h-[240px] flex flex-col items-center justify-center py-4 px-2">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activePhraseIdx}
                                initial={{ opacity: 0, y: 18, scale: 0.96 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -18, scale: 0.96 }}
                                transition={{ duration: 0.45, ease: "easeOut" }}
                                className="w-full text-center"
                            >
                                {/* 1. Active Arabic Calligraphy Phrase */}
                                <h2 
                                    className="text-3xl sm:text-4xl md:text-5xl font-black text-amber-300 leading-relaxed sm:leading-loose tracking-wide drop-shadow-[0_2px_15px_rgba(251,191,36,0.3)] mb-4"
                                    style={{ fontFamily: 'Amiri, Traditional Arabic, serif' }}
                                    dir="rtl"
                                >
                                    {currentPhrase.arabic}
                                </h2>

                                {/* 2. Transliteration */}
                                <p className="text-xs sm:text-sm font-bold text-amber-100/90 tracking-wide mb-3">
                                    "{currentPhrase.transliteration}"
                                </p>

                                {/* 3. Urdu Translation */}
                                <div className="my-2.5 py-1 px-3 bg-white/5 rounded-xl border border-white/10 max-w-md mx-auto">
                                    <p 
                                        className="text-base sm:text-lg font-bold text-amber-200 leading-relaxed"
                                        style={{ fontFamily: 'Noto Nastaliq Urdu, Traditional Arabic, serif' }}
                                        dir="rtl"
                                    >
                                        {currentPhrase.urdu}
                                    </p>
                                </div>

                                {/* 4. English Translation */}
                                <p className="text-xs sm:text-sm text-slate-300 font-medium italic mt-2 max-w-md mx-auto">
                                    "{currentPhrase.english}"
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Phrase Indicator Dots (1 to 12) */}
                    <div className="flex items-center justify-center gap-1.5 my-4">
                        {AZAN_PHRASES.map((_, i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={() => handleSeekPhrase(i)}
                                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                                    i === activePhraseIdx 
                                        ? 'w-6 bg-amber-400 shadow-sm shadow-amber-400' 
                                        : 'w-1.5 bg-white/20 hover:bg-white/40'
                                }`}
                                title={`Jump to phrase ${i + 1}`}
                            />
                        ))}
                    </div>

                    {/* Audio Progress Bar */}
                    <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mb-5">
                        <div 
                            className="bg-gradient-to-r from-amber-400 to-yellow-300 h-full rounded-full transition-all duration-300"
                            style={{ width: `${Math.min(100, Math.max(0, progressPercent))}%` }}
                        />
                    </div>

                    {/* Clean Audio Controls */}
                    <div className="bg-white/5 rounded-2xl p-3 border border-white/10 flex items-center justify-between gap-3 flex-wrap">
                        {/* Prev phrase */}
                        <button
                            type="button"
                            onClick={() => handleSeekPhrase(activePhraseIdx - 1)}
                            disabled={activePhraseIdx <= 0}
                            className="p-2 rounded-xl text-white/70 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition-all cursor-pointer"
                            title="Previous phrase"
                        >
                            <ChevronLeft size={20} />
                        </button>

                        {/* Main Play/Pause Button */}
                        <div className="flex items-center gap-3">
                            <motion.button
                                whileHover={{ scale: 1.08 }}
                                whileTap={{ scale: 0.94 }}
                                onClick={handleTogglePlay}
                                className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-2 border-white cursor-pointer ${
                                    isPlaying 
                                        ? 'bg-amber-400 text-slate-900' 
                                        : 'bg-emerald-500 text-white animate-pulse'
                                }`}
                                title={isPlaying ? "Pause Azan" : "Play Azan"}
                            >
                                {isPlaying ? (
                                    <Pause size={20} strokeWidth={3} />
                                ) : (
                                    <Play size={20} className="ml-0.5 fill-current" strokeWidth={3} />
                                )}
                            </motion.button>

                            <button
                                onClick={() => setIsMuted(prev => !prev)}
                                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
                                title={isMuted ? "Unmute" : "Mute"}
                            >
                                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                            </button>

                            {/* Volume Slider */}
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.05"
                                value={isMuted ? 0 : volume}
                                onChange={(e) => {
                                    setVolume(parseFloat(e.target.value));
                                    if (isMuted) setIsMuted(false);
                                }}
                                className="w-16 sm:w-24 h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-amber-400"
                                title="Adjust Volume"
                            />
                        </div>

                        {/* Next phrase */}
                        <button
                            type="button"
                            onClick={() => handleSeekPhrase(activePhraseIdx + 1)}
                            disabled={activePhraseIdx >= AZAN_PHRASES.length - 1}
                            className="p-2 rounded-xl text-white/70 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition-all cursor-pointer"
                            title="Next phrase"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>

                    <div className="mt-4">
                        <button
                            onClick={onClose}
                            className="w-full py-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl transition-all cursor-pointer"
                        >
                            Close Azan
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default AzanOverlayModal;
