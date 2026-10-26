// High-Fidelity Voice Agent Synthesizer
// Connects to the voice agent endpoint with intelligent audio caching and speech synthesis fallback

export interface PlayVoiceOptions {
    lang?: string;
    onStart?: () => void;
    onEnd?: () => void;
    onError?: (err: any) => void;
}

export interface VoicePlaybackController {
    stop: () => void;
    promise: Promise<void>;
}

// Global active audio reference so only one voice plays at a time
let currentActiveAudio: HTMLAudioElement | null = null;
let currentUtterancesQueue: SpeechSynthesisUtterance[] = [];
let isCurrentPlaybackStopped = false;

export function stopCurrentAiVoice(): void {
    isCurrentPlaybackStopped = true;
    if (currentActiveAudio) {
        try {
            currentActiveAudio.pause();
            currentActiveAudio.currentTime = 0;
            currentActiveAudio.onended = null;
            currentActiveAudio.onerror = null;
            currentActiveAudio.src = '';
        } catch {}
        currentActiveAudio = null;
    }

    currentUtterancesQueue = [];

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        try {
            window.speechSynthesis.cancel();
        } catch {}
    }
}

export function playAiVoice(text: string, options: PlayVoiceOptions = {}): VoicePlaybackController {
    stopCurrentAiVoice();
    isCurrentPlaybackStopped = false;

    let isCancelled = false;
    let activeAudioEl: HTMLAudioElement | null = null;

    const stop = () => {
        isCancelled = true;
        isCurrentPlaybackStopped = true;
        if (activeAudioEl) {
            try {
                activeAudioEl.pause();
                activeAudioEl.currentTime = 0;
                activeAudioEl.onended = null;
                activeAudioEl.onerror = null;
                activeAudioEl.src = '';
            } catch {}
            activeAudioEl = null;
        }
        stopCurrentAiVoice();
    };

    const promise = new Promise<void>(async (resolve, reject) => {
        if (!text || !text.trim()) {
            resolve();
            return;
        }

        const safeText = text.trim();

        // 1. First attempt: Query the voice agent via /api/tts
        try {
            const response = await fetch('/api/tts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    text: safeText.slice(0, 450), 
                    lang: options.lang || 'auto' 
                }),
            });

            if (isCancelled || isCurrentPlaybackStopped) {
                resolve();
                return;
            }

            if (response.ok) {
                const data = await response.json();
                if (isCancelled || isCurrentPlaybackStopped) {
                    resolve();
                    return;
                }

                if (data && data.audioBase64) {
                    const mime = data.mimeType || 'audio/wav';
                    const audioSrc = `data:${mime};base64,${data.audioBase64}`;
                    const audio = new Audio(audioSrc);
                    activeAudioEl = audio;
                    currentActiveAudio = audio;

                    audio.onplay = () => {
                        options.onStart?.();
                    };

                    audio.onended = () => {
                        currentActiveAudio = null;
                        activeAudioEl = null;
                        options.onEnd?.();
                        resolve();
                    };

                    audio.onerror = (e) => {
                        console.warn("AI Audio playback notice, falling back to speech synthesis:", e);
                        activeAudioEl = null;
                        currentActiveAudio = null;
                        playBrowserFallback(safeText, options, resolve, reject);
                    };

                    try {
                        await audio.play();
                        return;
                    } catch (playErr) {
                        console.warn("Audio.play rejected, switching to browser voice:", playErr);
                        playBrowserFallback(safeText, options, resolve, reject);
                        return;
                    }
                }
            }

            // Fall back to browser speech synthesis
            playBrowserFallback(safeText, options, resolve, reject);
        } catch (fetchErr) {
            if (isCancelled || isCurrentPlaybackStopped) {
                resolve();
                return;
            }
            console.warn("Voice agent endpoint notice, falling back to browser speech:", fetchErr);
            playBrowserFallback(safeText, options, resolve, reject);
        }
    });

    return { stop, promise };
}

function playBrowserFallback(
    text: string, 
    options: PlayVoiceOptions, 
    resolve: () => void, 
    reject: (err: any) => void
) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
        options.onEnd?.();
        resolve();
        return;
    }

    try {
        window.speechSynthesis.cancel();

        const lang = options.lang || 'en-US';
        const isUrdu = lang.startsWith('ur') || /[\u0600-\u06FF]/.test(text) && lang !== 'ar' && !lang.startsWith('ar');
        const isArabic = lang.startsWith('ar');

        // Split longer text into sentences so browser speech synthesis never freezes
        const sentences = text
            .split(/(?<=[.?!؟۔\n])\s+/)
            .map(s => s.trim())
            .filter(s => s.length > 0);

        if (sentences.length === 0) {
            options.onEnd?.();
            resolve();
            return;
        }

        const voices = window.speechSynthesis.getVoices();
        let targetVoice: SpeechSynthesisVoice | undefined;

        if (voices && voices.length > 0) {
            if (isArabic) {
                targetVoice = voices.find(v => v.lang.toLowerCase().startsWith('ar'));
            } else if (isUrdu) {
                targetVoice = voices.find(v => v.lang.toLowerCase().startsWith('ur') || v.lang.toLowerCase().startsWith('hi'));
            } else {
                targetVoice = voices.find(v => 
                    /female|woman|samantha|victoria|zira|karen|serena|moira|helena|susan|natural/i.test(v.name)
                ) || voices.find(v => v.lang.toLowerCase().startsWith('en'));
            }
        }

        let currentIndex = 0;
        let isStarted = false;

        const speakNextSentence = () => {
            if (isCurrentPlaybackStopped) {
                resolve();
                return;
            }

            if (currentIndex >= sentences.length) {
                options.onEnd?.();
                resolve();
                return;
            }

            const sentenceText = sentences[currentIndex];
            const utter = new SpeechSynthesisUtterance(sentenceText);

            if (isArabic) {
                utter.lang = 'ar-SA';
                utter.rate = 0.88;
                utter.pitch = 1.0;
            } else if (isUrdu) {
                utter.lang = 'ur-PK';
                utter.rate = 0.90;
                utter.pitch = 1.02;
            } else {
                utter.lang = 'en-US';
                utter.rate = 0.88;
                utter.pitch = 1.08;
            }

            if (targetVoice) {
                utter.voice = targetVoice;
            }

            utter.onstart = () => {
                if (!isStarted) {
                    isStarted = true;
                    options.onStart?.();
                }
            };

            utter.onend = () => {
                currentIndex++;
                speakNextSentence();
            };

            utter.onerror = () => {
                currentIndex++;
                speakNextSentence();
            };

            window.speechSynthesis.speak(utter);
        };

        speakNextSentence();
    } catch {
        options.onEnd?.();
        resolve();
    }
}
