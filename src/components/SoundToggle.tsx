import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

const TRACK_SRC = '/audio/ambient.mp3';
const TARGET_VOLUME = 0.35;
const FADE_MS = 1200;

export default function SoundToggle() {
  const [playing, setPlaying] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRef = useRef<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowHint(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  // Lazily create the <audio> element only once the visitor actually wants
  // sound, so the track (a few MB) is never fetched on page load.
  const getAudio = () => {
    if (!audioRef.current) {
      const audio = new Audio(TRACK_SRC);
      audio.loop = true;
      audio.preload = 'none';
      audio.volume = 0;
      audioRef.current = audio;
    }
    return audioRef.current;
  };

  const fadeTo = (target: number, onDone?: () => void) => {
    if (fadeRef.current) cancelAnimationFrame(fadeRef.current);
    const audio = getAudio();
    const start = audio.volume;
    const startTime = performance.now();

    const step = (now: number) => {
      const t = Math.min(1, (now - startTime) / FADE_MS);
      audio.volume = start + (target - start) * t;
      if (t < 1) {
        fadeRef.current = requestAnimationFrame(step);
      } else {
        onDone?.();
      }
    };
    fadeRef.current = requestAnimationFrame(step);
  };

  const toggle = () => {
    const audio = getAudio();
    if (playing) {
      fadeTo(0, () => audio.pause());
      setPlaying(false);
    } else {
      audio.play().catch(() => {
        // Autoplay can be blocked until a user gesture — the click here
        // counts as one, but guard against rejected promises regardless.
      });
      fadeTo(TARGET_VOLUME);
      setPlaying(true);
      setShowHint(false);
    }
  };

  useEffect(() => {
    return () => {
      if (fadeRef.current) cancelAnimationFrame(fadeRef.current);
      audioRef.current?.pause();
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      <AnimatePresence>
        {showHint && !playing && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="glass rounded-full px-4 py-2 text-xs text-chocolate-500 shadow-lg"
          >
            Включить звук релакса?
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={toggle}
        className="flex h-12 w-12 items-center justify-center rounded-full glass border border-gold-400/30 text-chocolate-500 shadow-lg transition-all duration-300 hover:text-gold-500 hover:border-gold-400"
        aria-label={playing ? 'Выключить звук' : 'Включить звук'}
      >
        {playing ? <Volume2 size={20} className="animate-breathe" /> : <VolumeX size={20} />}
      </button>
    </div>
  );
}
