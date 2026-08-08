import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { reviews } from '@/data';
import { pexelsSized } from '@/utils/image';

function AnimatedStars({ rating, size = 18 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <motion.div
          key={n}
          initial={{ scale: 0, rotate: -45 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ delay: n * 0.08, type: 'spring', damping: 12 }}
        >
          <Star
            size={size}
            className={n <= rating ? 'fill-gold-400 text-gold-400' : 'text-gold-400/30'}
          />
        </motion.div>
      ))}
    </div>
  );
}

export default function Reviews() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = (dir: number) => {
    setDirection(dir);
    setIndex((prev) => (prev + dir + reviews.length) % reviews.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % reviews.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const review = reviews[index];

  return (
    <section id="reviews" className="relative py-32 md:py-40 bg-cream-200/50 overflow-hidden">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 h-96 w-96 rounded-full bg-sage-200/20 blur-3xl" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 h-96 w-96 rounded-full bg-gold-400/10 blur-3xl" />

      <div className="container-luxe relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="section-label justify-center">
            <span className="h-px w-12 bg-gold-400/50" />
            Отзывы
            <span className="h-px w-12 bg-gold-400/50" />
          </div>
          <h2 className="section-title">Истории наших гостей</h2>

          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <span className="font-serif text-5xl text-gold-500">4.9</span>
              <span className="text-chocolate-300 text-sm">/ 5.0</span>
            </div>
            <div className="h-12 w-px bg-gold-400/30" />
            <AnimatedStars rating={5} size={22} />
          </div>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          <div className="relative min-h-[340px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={review.id}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 60 : -60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -60 : 60 }}
                transition={{ duration: 0.5 }}
                className="rounded-3xl bg-white/50 border border-gold-400/15 p-8 md:p-12"
              >
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={pexelsSized(review.photo, 128, 128)}
                    alt={review.name}
                    loading="lazy"
                    decoding="async"
                    className="h-16 w-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-serif text-xl text-chocolate-600">{review.name}</h4>
                    <p className="text-sm text-gold-500">{review.service}</p>
                  </div>
                </div>

                <AnimatedStars rating={review.rating} />

                <p className="mt-6 text-lg text-chocolate-400 leading-relaxed italic">
                  «{review.text}»
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={() => paginate(-1)}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-gold-400/30 text-chocolate-400 transition-all hover:bg-gold-400/10 hover:text-gold-500"
              aria-label="Предыдущий"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > index ? 1 : -1);
                    setIndex(i);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === index ? 'w-8 bg-gold-400' : 'w-2 bg-gold-400/30'
                  }`}
                  aria-label={`Отзыв ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => paginate(1)}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-gold-400/30 text-chocolate-400 transition-all hover:bg-gold-400/10 hover:text-gold-500"
              aria-label="Следующий"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
