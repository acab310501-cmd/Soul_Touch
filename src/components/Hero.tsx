import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import BreathingCanvas from './BreathingCanvas';
import { heroImage } from '@/data';

const VIDEO_URL = 'https://assets.mixkit.co/videos/3461/3461-1080.mp4';

export default function Hero({ onBook }: { onBook: () => void }) {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    // Defer the heavy 1080p video so it never competes with the initial
    // page paint, and skip it entirely on slow connections or when the user
    // prefers reduced motion / has data saver on.
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isSlowConnection = connection?.saveData || (connection?.effectiveType && ['slow-2g', '2g', '3g'].includes(connection.effectiveType));

    if (prefersReducedMotion || isSlowConnection) return;

    const idle = 'requestIdleCallback' in window ? window.requestIdleCallback : (cb: () => void) => setTimeout(cb, 1200);
    const cancelIdle = 'cancelIdleCallback' in window ? window.cancelIdleCallback : clearTimeout;
    const id = idle(() => setShouldLoadVideo(true));
    return () => cancelIdle(id as number);
  }, []);

  const scrollToServices = () => {
    document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-chocolate-700">
      {/* Fallback static image — always present behind video, and the LCP element */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt=""
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover opacity-30"
        />
      </div>

      {/* Video background — deferred until idle, disabled on mobile/slow connections/reduced motion */}
      {!isMobile && shouldLoadVideo && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          onCanPlay={() => setVideoLoaded(true)}
          onError={() => setVideoLoaded(false)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            videoLoaded ? 'opacity-40' : 'opacity-0'
          }`}
        >
          <source src={VIDEO_URL} type="video/mp4" />
        </video>
      )}

      {/* Dark gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-chocolate-700/70 via-chocolate-700/50 to-cream-100" />
      <div className="absolute inset-0 bg-gradient-to-r from-chocolate-700/40 via-transparent to-chocolate-700/40" />

      {/* Animated gradient glow — breathing warmth */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(201,169,110,0.18) 0%, rgba(201,169,110,0.05) 40%, transparent 70%)' }}
      />
      <motion.div
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute top-1/3 left-1/4 h-[400px] w-[400px] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(141,181,169,0.15) 0%, transparent 70%)' }}
      />

      {/* Breathing canvas lines on top */}
      <BreathingCanvas className="absolute inset-0 h-full w-full opacity-50" />

      <div className="absolute inset-0 noise-texture opacity-30 mix-blend-overlay" />

      <div className="container-luxe relative z-10 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="section-label !text-gold-300 justify-center mb-6"
        >
          <span className="h-px w-12 bg-gold-300/50" />
          Студия массажа и восстановления
          <span className="h-px w-12 bg-gold-300/50" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl text-cream-100 leading-[1.05] text-balance"
        >
          Прикоснись к своей
          <br />
          <span className="gold-text italic">тишине</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-8 text-lg md:text-xl text-cream-200/80 font-light max-w-2xl mx-auto leading-relaxed"
        >
          Массаж и восстановление для тех, кто выбирает гармонию
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button onClick={scrollToServices} className="btn-gold">
            Выбрать массаж
          </button>
          <button
            onClick={onBook}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-cream-100/30 px-8 py-4 text-sm font-medium uppercase tracking-widest text-cream-100 transition-all duration-500 hover:border-gold-300 hover:text-gold-300"
          >
            Забронировать
          </button>
        </motion.div>
      </div>

      <motion.button
        onClick={scrollToServices}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cream-200/50"
      >
        <span className="text-xs uppercase tracking-[0.3em]">Листайте вниз</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <ChevronDown size={20} />
        </motion.div>
      </motion.button>
    </section>
  );
}
