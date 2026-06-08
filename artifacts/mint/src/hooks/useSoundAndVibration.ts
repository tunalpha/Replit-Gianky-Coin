"use client";

import { useCallback, useRef } from 'react';

interface SoundOptions {
  frequency?: number;
  duration?: number;
  volume?: number;
  type?: OscillatorType;
}

export function useSoundAndVibration() {
  const audioContextRef = useRef<AudioContext | null>(null);

  // Inizializza AudioContext
  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        audioContextRef.current = new AudioContextClass();
      }
    }
    return audioContextRef.current;
  }, []);

  // Suono singolo
  const playTone = useCallback((options: SoundOptions = {}) => {
    const {
      frequency = 800,
      duration = 0.2,
      volume = 0.5,
      type = 'sine'
    } = options;

    try {
      const audioContext = getAudioContext();
      if (!audioContext) return;

      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      oscillator.type = type;

      gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
    } catch (e) {
      console.log('Audio non disponibile:', e);
    }
  }, [getAudioContext]);

  // Vibrazione
  const vibrate = useCallback((pattern: number | number[] = 100) => {
    if (navigator.vibrate) {
      navigator.vibrate(pattern);
    }
  }, []);

  // 🎆 ESPLOSIONE EMOZIONALE - Suono e vibrazione drammatici!
  const playConnectionSplash = useCallback(() => {
    try {
      const audioContext = getAudioContext();
      if (!audioContext) {
        // Fallback: solo vibrazione
        vibrate([50, 50, 100, 50, 200]);
        return;
      }

      // Pattern di vibrazione epico: breve-pausa-lungo
      vibrate([50, 30, 100, 30, 50, 30, 200]);

      // Accordo ascendente trionfale
      const notes = [
        { freq: 523.25, delay: 0, duration: 0.3 },      // C5
        { freq: 659.25, delay: 0.1, duration: 0.3 },    // E5
        { freq: 783.99, delay: 0.2, duration: 0.3 },    // G5
        { freq: 1046.50, delay: 0.3, duration: 0.5 },   // C6 (finale lungo)
      ];

      notes.forEach(({ freq, delay, duration }) => {
        setTimeout(() => {
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();

          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);

          oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
          oscillator.type = 'sine';

          // Inizio morbido, picco, e fade
          gainNode.gain.setValueAtTime(0, audioContext.currentTime);
          gainNode.gain.linearRampToValueAtTime(0.4, audioContext.currentTime + 0.05);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + duration);
        }, delay * 1000);
      });

      // Effetto shimmer/sparkle aggiuntivo
      setTimeout(() => {
        const sparkleFreqs = [1200, 1400, 1600, 1800, 2000];
        sparkleFreqs.forEach((freq, i) => {
          setTimeout(() => {
            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();
            
            osc.connect(gain);
            gain.connect(audioContext.destination);
            
            osc.frequency.setValueAtTime(freq, audioContext.currentTime);
            osc.type = 'sine';
            
            gain.gain.setValueAtTime(0.15, audioContext.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
            
            osc.start(audioContext.currentTime);
            osc.stop(audioContext.currentTime + 0.15);
          }, i * 60);
        });
      }, 400);

    } catch (e) {
      console.log('Errore audio esplosione:', e);
      // Fallback solo vibrazione
      vibrate([100, 50, 200]);
    }
  }, [getAudioContext, vibrate]);

  // Click feedback semplice
  const playClickFeedback = useCallback(() => {
    vibrate(50);
    playTone({ frequency: 1200, duration: 0.08, volume: 0.3 });
    setTimeout(() => {
      playTone({ frequency: 800, duration: 0.08, volume: 0.2 });
    }, 50);
  }, [vibrate, playTone]);

  return {
    playTone,
    vibrate,
    playConnectionSplash,
    playClickFeedback,
  };
}
