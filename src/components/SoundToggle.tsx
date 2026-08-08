import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

export default function SoundToggle() {
  const [playing, setPlaying] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const audioRef = useRef<AudioContext | null>(null);
  const noiseRef = useRef<AudioBufferSourceNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowHint(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  const toggle = () => {
    if (playing) {
      stopSound();
      setPlaying(false);
    } else {
      startSound();
      setPlaying(true);
      setShowHint(false);
    }
  };

  const startSound = () => {
    const ctx = new AudioContext();
    audioRef.current = ctx;

    const bufferSize = 2 * ctx.sampleRate;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    let lastOut = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      data[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = data[i];
      data[i] *= 3.5;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const gain = ctx.createGain();
    gain.gain.value = 0;
    gain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 1.5);

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 600;
    filter.Q.value = 0.5;

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start();

    noiseRef.current = noise;
    gainRef.current = gain;
  };

  const stopSound = () => {
    const ctx = audioRef.current;
    const gain = gainRef.current;
    if (ctx && gain) {
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5);
      setTimeout(() => {
        noiseRef.current?.stop();
        ctx.close();
      }, 600);
    }
  };

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
