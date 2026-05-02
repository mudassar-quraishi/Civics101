import { useState, useCallback } from 'react';

/**
 * Hook for Google-style Text-to-Speech
 * Uses Web Speech API but prioritizes Google voices if available.
 */
export function useTTS() {
  const [isPlaying, setIsPlaying] = useState(false);

  const stop = useCallback(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  }, []);

  const speak = useCallback((text: string, lang: 'en' | 'hi' = 'en') => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    const synth = window.speechSynthesis;
    
    // Stop any current speech
    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set language
    utterance.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';

    // Try to find a "Google" voice or a nice sounding one
    const voices = synth.getVoices();
    const googleVoice = voices.find(v => 
      v.name.includes('Google') && v.lang.startsWith(lang === 'hi' ? 'hi' : 'en')
    );

    if (googleVoice) {
      utterance.voice = googleVoice;
    }

    utterance.rate = 0.9; // Slightly slower for better clarity
    utterance.pitch = 1;

    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);
    utterance.onstart = () => setIsPlaying(true);

    synth.speak(utterance);
  }, []);

  return { speak, stop, isPlaying };
}
