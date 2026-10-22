import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, Play, Pause, X, Bell, Sparkles, Heart } from 'lucide-react';
import { stopAllAppMedia } from '../utils/audioStopper';

interface AzanOverlayModalProps {
    isOpen: boolean;
    prayerName: string;
    onClose: () => void;
    autoPlay?: boolean;
}

const AZAN_AUDIO_URLS = [
    'https://cdn.islamic.network/audio/athan/makkah.mp3',
    'https://media.blubrry.com/muslim_central_quran/podcasts.qurancentral.com/athan/athan-makkah.mp3'
];

export const AzanOverlayModal: React.FC<AzanOverlayModalProps> = ({
    isOpen,
    prayerName,
    onClose,
    autoPlay = true
}) => {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [isMuted, setIsMuted] = useState<boolean>(false);
    const [volume, setVolume] = useState<number>(0.9);
    const [audioError, setAudioError] = useState<boolean>(false);
    const [audioSourceIdx, setAudioSourceIdx] = useState<number>(0);
    const [showDua, setShowDua] = useState<boolean>(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Stop all other audio across the app when Azan opens
    useEffect(() => {
        if (isOpen) {
            stopAllAppMedia();

            // Setup and start Azan audio
            const audio = new Audio(AZAN_AUDIO_URLS[audioSourceIdx]);
            audio.classList.add('azan-audio-element'); // so audioStopper doesn't accidentally kill this instance
            audio.volume = volume;
            audio.muted = isMuted;

            audio.onplay = () => {
                setIsPlaying(true);
                setAudioError(false);
            };

            audio.onpause = () => {
                setIsPlaying(false);
            };

            audio.onended = () => {
                setIsPlaying(false);
            };

            audio.onerror = () => {
                // Try backup audio source if first one failed
                if (audioSourceIdx < AZAN_AUDIO_URLS.length - 1) {
                    setAudioSourceIdx(prev => prev + 1);
                } else {
                    setAudioError(true);
                    setIsPlaying(false);
                }
            };

            audioRef.current = audio;

            if (autoPlay) {
                audio.play().catch((err) => {
                    console.warn('Autoplay blocked by browser policy:', err);
                    setIsPlaying(false);
                });
            }

            return () => {
                if (audioRef.current) {
                    audioRef.current.pause();
                    audioRef.current.src = '';
                    audioRef.current = null;
                }
            };
        }
    }, [isOpen, audioSourceIdx]);

    // Handle Volume & Mute changes
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
            audioRef.current.muted = isMuted;
        }
    }, [volume, isMuted]);

    const handleTogglePlay = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            stopAllAppMedia();
            audioRef.current.play().catch(() => setAudioError(true));
        }
    };

    const handleToggleMute = () => {
        setIsMuted(prev => !prev);
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
                {/* Backdrop with dark overlay */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
                />

                {/* Main Card */}
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0, y: 30 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 30 }}
                    className="relative z-10 w-full max-w-lg bg-gradient-to-b from-indigo-950 via-slate-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-2xl border-4 border-amber-400 overflow-hidden text-center"
                >
                    {/* Glowing golden background light */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />

                    {/* Close button */}
                    <button 
                        onClick={onClose}
                        className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
                        title="Dismiss Azan"
                    >
                        <X size={20} strokeWidth={3} />
                    </button>

                    {/* Top Mosque / Azan Icon Badge */}
                    <div className="relative inline-block mb-3">
                        <motion.div 
                            animate={{ scale: [1, 1.12, 1], opacity: [0.7, 1, 0.7] }}
                            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                            className="absolute inset-0 bg-amber-400 rounded-3xl blur-md"
                        />
                        <div className="relative w-20 h-20 bg-gradient-to-tr from-amber-400 to-yellow-300 rounded-3xl flex items-center justify-center shadow-lg border-2 border-white text-3xl">
                            🕌
                        </div>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-black uppercase tracking-wider border border-amber-400/30 mb-2">
                        <Bell size={14} className="animate-bounce" />
                        It is Prayer Time!
                    </div>

                    <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                        {prayerName} Azan
                    </h2>

                    {/* Arabic Calligraphy Callout */}
                    <div className="my-4 py-3 px-4 bg-white/5 rounded-2xl border border-white/10">
                        <p className="text-2xl sm:text-3xl font-serif text-amber-300 tracking-wide font-bold" dir="rtl">
                            حَيَّ عَلَى الصَّلَاةِ • حَيَّ عَلَى الْفَلَاحِ
                        </p>
                        <p className="text-xs sm:text-sm text-yellow-100/90 font-medium mt-1">
                            "Come to Prayer • Come to Success"
                        </p>
                    </div>

                    {/* Audio Status Notice */}
                    <div className="bg-emerald-500/20 border border-emerald-400/30 rounded-xl py-2 px-3 text-xs font-bold text-emerald-300 mb-4 inline-flex items-center gap-2">
                        <Sparkles size={14} />
                        All background app audio has paused for the sacred call to prayer
                    </div>

                    {/* Play/Pause & Sound Controls */}
                    <div className="bg-white/10 rounded-2xl p-4 border border-white/15 mb-4">
                        <div className="flex items-center justify-center gap-4">
                            <motion.button
                                whileHover={{ scale: 1.08 }}
                                whileTap={{ scale: 0.92 }}
                                onClick={handleTogglePlay}
                                className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg border-2 border-white cursor-pointer ${
                                    isPlaying 
                                        ? 'bg-amber-400 text-slate-900' 
                                        : 'bg-emerald-500 text-white animate-pulse'
                                }`}
                                title={isPlaying ? "Pause Azan" : "Play Azan"}
                            >
                                {isPlaying ? (
                                    <Pause size={24} strokeWidth={3} />
                                ) : (
                                    <Play size={24} className="ml-0.5 fill-current" strokeWidth={3} />
                                )}
                            </motion.button>

                            <button
                                onClick={handleToggleMute}
                                className="w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-all cursor-pointer"
                                title={isMuted ? "Unmute" : "Mute"}
                            >
                                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                            </button>

                            {/* Volume Slider */}
                            <div className="flex items-center gap-2 max-w-[120px]">
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
                                    className="w-full accent-amber-400 h-2 bg-white/20 rounded-lg cursor-pointer"
                                />
                            </div>
                        </div>

                        <p className="text-xs font-bold text-yellow-200 mt-2">
                            {isPlaying ? "Playing Holy Makkah Azan 🎵" : "Azan Paused / Click Play"}
                        </p>

                        {audioError && (
                            <p className="text-xs text-rose-300 mt-1">
                                Notice: Browser autoplay was prevented. Click Play above to listen.
                            </p>
                        )}
                    </div>

                    {/* Dua after Azan Toggle */}
                    <div className="mb-4">
                        <button
                            onClick={() => setShowDua(prev => !prev)}
                            className="text-xs font-bold text-amber-300 hover:text-amber-200 underline cursor-pointer"
                        >
                            {showDua ? "Hide Dua After Azan" : "🤲 Read Dua After Azan (Supplication)"}
                        </button>

                        {showDua && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="mt-2 text-left bg-black/30 p-3.5 rounded-xl border border-white/10 text-xs text-yellow-100 leading-relaxed font-sans"
                            >
                                <p className="font-serif text-sm text-right text-yellow-200 mb-1" dir="rtl">
                                    اللَّهُمَّ رَبَّ هَذِهِ الدَّعْوَةِ التَّامَّةِ، وَالصَّلَاةِ الْقَائِمَةِ، آتِ مُحَمَّدًا الْوَسِيلَةَ وَالْفَضِيلَةَ، وَابْعَثْهُ مَقَامًا مَحْمُودًا الَّذِي وَعَدْتَهُ
                                </p>
                                <p className="text-white/80 italic text-[11px]">
                                    "O Allah, Lord of this perfect call and established prayer, grant Muhammad the status of intercession and nobility, and resurrect him to the praised station which You have promised."
                                </p>
                            </motion.div>
                        )}
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="flex-1 py-3 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-500 hover:to-yellow-500 text-slate-900 font-black rounded-2xl shadow-md transition-all cursor-pointer"
                        >
                            Dismiss / Ready for Prayer
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default AzanOverlayModal;
