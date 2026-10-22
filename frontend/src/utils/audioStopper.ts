// Global Audio Stopper Utility
// Halts all active audio across the app (Quran audio, TTS, AI Voice, Tasbeeh audio, etc.)

import { stopCurrentAiVoice } from './aiVoice';

export function stopAllAppMedia(): void {
    // 1. Stop AI TTS & Web Speech Synthesis
    try {
        stopCurrentAiVoice();
    } catch (e) {
        console.warn('Error stopping AI voice:', e);
    }

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        try {
            window.speechSynthesis.cancel();
        } catch (e) {
            console.warn('Error cancelling speech synthesis:', e);
        }
    }

    // 2. Query and pause all DOM audio and video elements (excluding the Azan player itself)
    if (typeof document !== 'undefined') {
        const audioElements = document.querySelectorAll('audio');
        audioElements.forEach((el) => {
            try {
                if (!el.classList.contains('azan-audio-element')) {
                    el.pause();
                }
            } catch {}
        });

        const videoElements = document.querySelectorAll('video');
        videoElements.forEach((el) => {
            try {
                el.pause();
            } catch {}
        });
    }

    // 3. Dispatch global custom event for any React state listeners
    if (typeof window !== 'undefined') {
        try {
            window.dispatchEvent(new CustomEvent('app:stop_all_audio'));
        } catch {}
    }
}
