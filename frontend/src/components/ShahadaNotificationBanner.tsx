import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, Volume2, CheckCircle2, X, ChevronRight, Award, Compass, ArrowRight } from 'lucide-react';
import { playAiVoice, stopCurrentAiVoice } from '../utils/aiVoice';
import { useGamification } from '../contexts/GamificationContext';

export const ShahadaNotificationBanner: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(() => {
        try {
            return localStorage.getItem('shahada_banner_minimized') === 'true';
        } catch {
            return false;
        }
    });
    const [hasTakenShahadah, setHasTakenShahadah] = useState(() => {
        try {
            return localStorage.getItem('user_taken_shahada') === 'true';
        } catch {
            return false;
        }
    });
    const [celebrated, setCelebrated] = useState(false);
    const [isPlayingAudio, setIsPlayingAudio] = useState(false);
    const [playingLanguage, setPlayingLanguage] = useState<'ar' | 'ur' | 'en' | null>(null);
    const { addPoints } = useGamification();

    useEffect(() => {
        try {
            localStorage.setItem('shahada_banner_minimized', isMinimized ? 'true' : 'false');
        } catch {}
    }, [isMinimized]);

    const modalRef = useRef<HTMLDivElement | null>(null);

    // Party popper fireworks bursting from the left & right green borders of the box OUTWARDS
    const triggerCelebrationConfetti = async () => {
        try {
            const confetti = (await import('canvas-confetti')).default;
            const end = Date.now() + 2800;
            const colors = ['#10b981', '#34d399', '#fbbf24', '#f59e0b', '#38bdf8', '#a855f7'];

            (function frame() {
                const rect = modalRef.current?.getBoundingClientRect();
                const originY = rect ? Math.max(0.2, Math.min(0.8, (rect.top + rect.height * 0.4) / window.innerHeight)) : 0.5;
                const originLeftX = rect ? Math.max(0.05, Math.min(0.45, (rect.left + 5) / window.innerWidth)) : 0.25;
                const originRightX = rect ? Math.max(0.55, Math.min(0.95, (rect.right - 5) / window.innerWidth)) : 0.75;

                // Burst outward to the left from the left green border
                confetti({
                    particleCount: 6,
                    angle: 140,
                    spread: 75,
                    startVelocity: 35,
                    origin: { x: originLeftX, y: originY },
                    colors: colors,
                    disableForReducedMotion: true
                });

                // Burst outward to the right from the right green border
                confetti({
                    particleCount: 6,
                    angle: 40,
                    spread: 75,
                    startVelocity: 35,
                    origin: { x: originRightX, y: originY },
                    colors: colors,
                    disableForReducedMotion: true
                });

                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            })();
        } catch (e) {
            console.error('Confetti load error', e);
        }
    };

    // Sequential audio: Arabic -> Urdu -> English with natural, calm female voice
    const playSequentialAudio = () => {
        if (isPlayingAudio) {
            stopCurrentAiVoice();
            if ('speechSynthesis' in window) window.speechSynthesis.cancel();
            setIsPlayingAudio(false);
            setPlayingLanguage(null);
            return;
        }

        setIsPlayingAudio(true);
        setPlayingLanguage('ar');

        // 1. Play Arabic recitation smoothly
        playAiVoice("أَشْهَدُ أَنْ لَا إِلٰهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللَّهِ", {
            lang: 'ar-SA',
            onEnd: () => {
                // 2. Play Urdu translation with gentle pacing
                setPlayingLanguage('ur');
                playAiVoice("میں گواہی دیتا ہوں کہ اللہ کے سوا کوئی معبود نہیں، اور میں گواہی دیتا ہوں کہ محمد اللہ کے رسول ہیں۔", {
                    lang: 'ur-PK',
                    onEnd: () => {
                        // 3. Play English translation with calm, gentle, natural female voice
                        setPlayingLanguage('en');
                        playAiVoice("I bear witness that there is no deity worthy of worship except Allah, and I bear witness that Muhammad is the Messenger of Allah.", {
                            lang: 'en-US',
                            onEnd: () => {
                                setIsPlayingAudio(false);
                                setPlayingLanguage(null);
                            },
                            onError: () => {
                                setIsPlayingAudio(false);
                                setPlayingLanguage(null);
                            }
                        });
                    },
                    onError: () => {
                        setIsPlayingAudio(false);
                        setPlayingLanguage(null);
                    }
                });
            },
            onError: () => {
                setIsPlayingAudio(false);
                setPlayingLanguage(null);
            }
        });
    };

    const confirmShahadah = () => {
        setCelebrated(true);
        setHasTakenShahadah(true);
        addPoints(50);
        try {
            localStorage.setItem('user_taken_shahada', 'true');
        } catch {}

        // Trigger Left and Right party poppers bursting inside-out from the borders
        triggerCelebrationConfetti();

        // Speak soothing congratulation: "Mā Shā' Allāh! Takbeer! Allāhu Akbar!"
        try {
            playAiVoice("Mā Shā' Allāh! Takbeer! Allāhu Akbar! Welcome to Islam!", {
                lang: 'en-US'
            });
        } catch {}
    };

    return (
        <>
            {/* Always-on-Screen Floating Notification Widget */}
            <div className="fixed top-20 right-4 sm:right-6 z-40 max-w-sm sm:max-w-md pointer-events-auto">
                <AnimatePresence mode="wait">
                    {isMinimized ? (
                        <motion.button
                            key="minimized-pill"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center gap-2.5 px-4 py-2 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white rounded-full shadow-xl border-2 border-emerald-300 font-black text-xs sm:text-sm cursor-pointer hover:shadow-2xl transition-all"
                            title="Open Shahadah (Declaration of Faith)"
                        >
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-300 animate-ping" />
                            <Sparkles size={16} className="text-yellow-300" />
                            <span>{hasTakenShahadah ? "My Shahadah • Faith" : "Take the Shahadah 🤲"}</span>
                            <span 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsMinimized(false);
                                }}
                                className="text-white/60 hover:text-white ml-1 p-0.5 rounded-full"
                                title="Expand notification"
                            >
                                ＋
                            </span>
                        </motion.button>
                    ) : (
                        <motion.div
                            key="expanded-card"
                            initial={{ x: 50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 50, opacity: 0 }}
                            className="bg-white/95 backdrop-blur-md rounded-2xl p-3.5 sm:p-4 shadow-2xl border-2 border-emerald-400/80 text-slate-800 relative overflow-hidden"
                        >
                            {/* Ambient glow accent */}
                            <div className="absolute top-0 right-0 w-28 h-28 bg-emerald-400/15 rounded-full blur-2xl pointer-events-none" />

                            <div className="flex items-start justify-between gap-3">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white flex items-center justify-center shrink-0 shadow-sm">
                                        <Sparkles size={18} />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                                                Declaration of Faith
                                            </span>
                                        </div>
                                        <h4 className="text-xs sm:text-sm font-black text-slate-900 mt-0.5">
                                            {hasTakenShahadah ? "Welcome to Islam! 🌟" : "Thinking of Becoming Muslim?"}
                                        </h4>
                                    </div>
                                </div>

                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={() => setIsMinimized(true)}
                                        className="text-slate-400 hover:text-slate-600 p-1 rounded-lg text-xs font-bold"
                                        title="Minimize banner"
                                    >
                                        <X size={15} />
                                    </button>
                                </div>
                            </div>

                            <p className="text-[11px] sm:text-xs text-slate-600 font-medium mt-2 leading-relaxed">
                                {hasTakenShahadah 
                                    ? "May Allah bless your journey in faith! Recite your Shahadah anytime to refresh your heart."
                                    : "Anyone can become Muslim anytime. Sincerely declaring the Shahadah enters you into the peaceful fold of Islam with all past mistakes forgiven."
                                }
                            </p>

                            <div className="mt-3 flex items-center gap-2">
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="flex-1 py-1.5 px-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                                >
                                    <span>{hasTakenShahadah ? "View Shahadah & Meaning" : "🤲 Recite the Shahadah Now"}</span>
                                    <ChevronRight size={14} />
                                </button>
                                <button
                                    onClick={() => setIsMinimized(true)}
                                    className="px-2 py-1.5 text-[11px] font-bold text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg"
                                >
                                    Minimize
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Interactive Guided Shahadah Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[85] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
                        />

                        {/* Modal Card - Perfectly centered */}
                        <motion.div
                            ref={modalRef}
                            initial={{ scale: 0.94, opacity: 0, y: 15 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.94, opacity: 0, y: 15 }}
                            className="relative z-10 w-full max-w-lg bg-gradient-to-b from-white via-slate-50 to-emerald-50 rounded-3xl p-5 sm:p-6 text-slate-800 shadow-2xl border-4 border-emerald-400 overflow-visible my-auto"
                        >
                            {/* Celebratory party popper effects bursting inside-out from left and right green lines */}
                            {celebrated && (
                                <>
                                    <motion.div 
                                        initial={{ scale: 0, x: 0 }}
                                        animate={{ scale: [0, 1.3, 1], x: -28, rotate: -35 }}
                                        transition={{ duration: 0.6 }}
                                        className="absolute -left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-emerald-500 rounded-full border-2 border-white shadow-xl flex items-center justify-center text-2xl pointer-events-none"
                                        title="Left Popper"
                                    >
                                        🎉
                                    </motion.div>
                                    <motion.div 
                                        initial={{ scale: 0, x: 0 }}
                                        animate={{ scale: [0, 1.3, 1], x: 28, rotate: 35 }}
                                        transition={{ duration: 0.6 }}
                                        className="absolute -right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-emerald-500 rounded-full border-2 border-white shadow-xl flex items-center justify-center text-2xl pointer-events-none"
                                        title="Right Popper"
                                    >
                                        🎊
                                    </motion.div>
                                </>
                            )}
                            {/* Close button */}
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-3.5 right-3.5 z-20 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-all cursor-pointer"
                            >
                                <X size={18} strokeWidth={2.5} />
                            </button>

                            {!celebrated ? (
                                <div>
                                    <div className="text-center mb-3">
                                        <div className="w-12 h-12 bg-gradient-to-tr from-emerald-500 to-teal-400 rounded-xl mx-auto flex items-center justify-center text-white shadow-md mb-2 border-2 border-white">
                                            <Sparkles size={24} />
                                        </div>
                                        <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                                            The Declaration of Faith
                                        </span>
                                        <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                                            Taking the Shahadah
                                        </h2>
                                        <p className="text-xs text-slate-600 font-medium max-w-sm mx-auto">
                                            When spoken with sincere conviction from your heart, you immediately become Muslim.
                                        </p>
                                    </div>

                                    {/* The Sacred Words in Arabic, Urdu, and English */}
                                    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-emerald-200 shadow-xs text-center mb-3">
                                        {/* 1. Arabic Text */}
                                        <p 
                                            className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 leading-relaxed mb-2"
                                            style={{ fontFamily: 'Amiri, Traditional Arabic, serif' }}
                                            dir="rtl"
                                        >
                                            أَشْهَدُ أَنْ لَا إِلٰهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللَّهِ
                                        </p>
                                        
                                        <p className="text-xs sm:text-sm font-bold text-emerald-800 mb-2">
                                            "Ash-hadu an la ilaha illallah, wa ash-hadu anna Muhammadan rasulullah"
                                        </p>

                                        {/* 2. Urdu Translation in Between Arabic and English */}
                                        <div className="my-2.5 py-2 px-3 bg-amber-50/70 border-y border-amber-200/80 rounded-lg">
                                            <p 
                                                className="text-sm sm:text-base font-bold text-amber-950 leading-relaxed"
                                                dir="rtl"
                                                style={{ fontFamily: 'Noto Nastaliq Urdu, Jameel Noori Nastaleeq, serif' }}
                                            >
                                                "میں گواہی دیتا ہوں کہ اللہ کے سوا کوئی معبود نہیں، اور میں گواہی دیتا ہوں کہ محمد اللہ کے رسول ہیں۔"
                                            </p>
                                        </div>

                                        {/* 3. English Translation */}
                                        <p className="text-xs sm:text-sm font-medium text-slate-700 italic pt-1">
                                            "I bear witness that there is no deity worthy of worship except Allah, and I bear witness that Muhammad is the Messenger of Allah."
                                        </p>

                                        {/* Audio playback button: Simply labeled LISTEN as requested */}
                                        <div className="mt-3 flex justify-center items-center gap-2">
                                            <button
                                                type="button"
                                                onClick={playSequentialAudio}
                                                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer shadow-xs ${
                                                    isPlayingAudio
                                                        ? 'bg-rose-500 text-white animate-pulse'
                                                        : 'bg-emerald-100 text-emerald-900 hover:bg-emerald-200 border-2 border-emerald-300'
                                                }`}
                                            >
                                                <Volume2 size={16} />
                                                <span>
                                                    {isPlayingAudio 
                                                        ? `PLAYING (${playingLanguage === 'ar' ? 'ARABIC' : playingLanguage === 'ur' ? 'URDU' : 'ENGLISH'})...`
                                                        : 'LISTEN'
                                                    }
                                                </span>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Compact meaning explanation */}
                                    <div className="bg-emerald-50/80 p-2.5 rounded-xl border border-emerald-200/80 mb-3 text-xs text-slate-700 text-center font-medium">
                                        ☝️ <strong>Tawhid & Prophethood:</strong> Affirming Allah as the Sole Creator and accepting Prophet Muhammad ﷺ as the final moral guide.
                                    </div>

                                    {/* Declaration Confirmation Button */}
                                    <div className="text-center">
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={confirmShahadah}
                                            className="w-full py-3 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-800 text-white font-black text-sm rounded-xl shadow-lg border-2 border-emerald-300 transition-all cursor-pointer flex items-center justify-center gap-2"
                                        >
                                            <CheckCircle2 size={18} />
                                            <span>I Sincerely Recite & Believe This in My Heart</span>
                                        </motion.button>
                                    </div>
                                </div>
                            ) : (
                                /* Celebration Screen with Congratulations Party Bloopers */
                                <div className="text-center py-4">
                                    <div className="flex justify-center items-center gap-2 mb-3">
                                        <span className="text-3xl animate-bounce">🎉</span>
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring", bounce: 0.5 }}
                                            className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-xl text-3xl"
                                        >
                                            🤲
                                        </motion.div>
                                        <span className="text-3xl animate-bounce">🎊</span>
                                    </div>

                                    <h3 className="text-2xl sm:text-3xl font-black text-emerald-800 mb-1">
                                        Mā Shā' Allāh! Takbeer!
                                    </h3>
                                    <p className="text-lg font-black text-emerald-700 mb-2">
                                        Allāhu Akbar!
                                    </p>
                                    <h4 className="text-base sm:text-lg font-black text-slate-800 mb-3">
                                        Welcome to the Global Family of Islam! ❤️
                                    </h4>

                                    <div className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-emerald-200 text-xs sm:text-sm text-slate-700 leading-relaxed max-w-md mx-auto mb-4 shadow-xs">
                                        <p className="font-bold text-emerald-900 mb-1.5">
                                            "Islam wipes away everything that came before it."
                                        </p>
                                        <p>
                                            By accepting faith today, your slate is clean and all past mistakes are completely forgiven. You are embarking on a beautiful journey of peace, purpose, and connection with your Creator.
                                        </p>
                                    </div>

                                    {/* Helpful next steps with Quran Quest and Daily Duas as normal text on a line and bold */}
                                    <div className="text-left bg-emerald-50/90 p-4 rounded-2xl border border-emerald-200 text-xs space-y-2 mb-5">
                                        <span className="font-black text-emerald-900 block uppercase tracking-wider text-[11px]">
                                            Helpful Next Steps:
                                        </span>
                                        <p className="text-slate-700 leading-normal">
                                            <span className="text-emerald-600 font-bold mr-1.5">1.</span>
                                            Take a shower (Ghusl) symbolizing spiritual and physical renewal.
                                        </p>
                                        <p className="text-slate-700 leading-normal">
                                            <span className="text-emerald-600 font-bold mr-1.5">2.</span>
                                            Explore the <strong>Quran Quest</strong> & <strong>Daily Duas</strong> sections at your own gentle pace.
                                        </p>
                                        <p className="text-slate-700 leading-normal">
                                            <span className="text-emerald-600 font-bold mr-1.5">3.</span>
                                            Reach out to a friendly local Islamic center or use our AI Guide anytime.
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => {
                                            setIsModalOpen(false);
                                            setCelebrated(false);
                                        }}
                                        className="py-3 px-8 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm rounded-xl shadow-md transition-all cursor-pointer"
                                    >
                                        Continue Exploring App
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ShahadaNotificationBanner;
