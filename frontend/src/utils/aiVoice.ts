// AI Voice Synthesizer utility leveraging Gemini Flash Lite TTS model
// with seamless fallback to client-side SpeechSynthesis

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

export function stopCurrentAiVoice(): void {
    if (currentActiveAudio) {
        try {
            currentActiveAudio.pause();
            currentActiveAudio.currentTime = 0;
        } catch {}
        currentActiveAudio = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        try {
            window.speechSynthesis.cancel();
        } catch {}
    }
}

export function playAiVoice(text: string, options: PlayVoiceOptions = {}): VoicePlaybackController {
    stopCurrentAiVoice();

    let isCancelled = false;
    let fallbackUtterance: SpeechSynthesisUtterance | null = null;
    let activeAudioEl: HTMLAudioElement | null = null;

    const stop = () => {
        isCancelled = true;
        if (activeAudioEl) {
            try {
                activeAudioEl.pause();
                activeAudioEl.currentTime = 0;
            } catch {}
            activeAudioEl = null;
        }
        if (fallbackUtterance && typeof window !== 'undefined' && 'speechSynthesis' in window) {
            try {
                window.speechSynthesis.cancel();
            } catch {}
            fallbackUtterance = null;
        }
    };

    const promise = new Promise<void>(async (resolve, reject) => {
        if (!text || !text.trim()) {
            resolve();
            return;
        }

        const safeText = text.trim();

        try {
            // 1. Try Gemini AI Text-To-Speech endpoint first
            const response = await fetch('/api/tts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: safeText, lang: options.lang || 'auto' }),
            });

            if (isCancelled) {
                resolve();
                return;
            }

            if (response.ok) {
                const data = await response.json();
                if (isCancelled) {
                    resolve();
                    return;
                }

                if (data.audioBase64) {
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
                        options.onEnd?.();
                        resolve();
                    };

                    audio.onerror = (e) => {
                        console.warn("AI Audio playback error, falling back to speech synthesis:", e);
                        activeAudioEl = null;
                        currentActiveAudio = null;
                        playBrowserFallback(safeText, options, resolve, reject);
                    };

                    await audio.play();
                    return;
                }
            }

            // If response not ok or no audio data, fall back to browser speech synthesis
            playBrowserFallback(safeText, options, resolve, reject);
        } catch (err) {
            console.warn("AI TTS network notice, falling back to browser speech:", err);
            if (isCancelled) {
                resolve();
                return;
            }
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
        const utter = new SpeechSynthesisUtterance(text);
        const lang = options.lang || 'ur-PK';
        utter.lang = lang;
        utter.rate = 0.9;

        // Try to match appropriate voice
        const voices = window.speechSynthesis.getVoices();
        if (voices && voices.length > 0) {
            const normalized = lang.toLowerCase();
            const prefix = normalized.split('-')[0];
            const matched = voices.find(v => v.lang.toLowerCase() === normalized)
                || voices.find(v => v.lang.toLowerCase().startsWith(prefix));
            if (matched) utter.voice = matched;
        }

        utter.onstart = () => {
            options.onStart?.();
        };

        utter.onend = () => {
            options.onEnd?.();
            resolve();
        };

        utter.onerror = (err) => {
            options.onError?.(err);
            options.onEnd?.();
            resolve();
        };

        window.speechSynthesis.speak(utter);
    } catch (err) {
        options.onError?.(err);
        options.onEnd?.();
        resolve();
    }
}
