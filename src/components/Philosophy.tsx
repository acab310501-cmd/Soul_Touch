import { motion } from 'framer-motion';
import { philosophyGallery } from '@/data';

export default function Philosophy() {
  const [main, ...rest] = philosophyGallery;

  return (
    <section id="philosophy" className="relative py-32 md:py-48 overflow-hidden bg-cream-100 linen-texture">
      <div className="container-luxe">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1 }}
          >
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl border border-gold-400/20" />
              <div className="grid grid-cols-3 grid-rows-3 gap-3 h-[560px]">
                <div className="relative col-span-2 row-span-2 overflow-hidden rounded-3xl">
                  <img
                    src={main.src}
                    alt={main.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-chocolate-700/40 to-transparent" />
                </div>
                {rest.map((img) => (
                  <div key={img.src} className="relative overflow-hidden rounded-2xl">
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                  </div>
                ))}
              </div>
              <motion.div
                animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-gold-400/20 blur-3xl -z-10"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="section-label">
              <span className="h-px w-12 bg-gold-400/50" />
              Философия
            </div>

            <motion.blockquote
              animate={{ opacity: [0.85, 1, 0.85] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight text-chocolate-600 italic text-balance"
            >
              «Тишина начинается там, где тело перестаёт сопротивляться»
            </motion.blockquote>

            <p className="mt-10 text-lg text-chocolate-400 leading-relaxed max-w-lg">
              Soul Touch — это пространство, где массаж превращается в ритуал заботы о себе. Мы не просто снимаем
              напряжение — мы возвращаем телу способность дышать и чувствовать.
            </p>

            <p className="mt-4 text-lg text-chocolate-400 leading-relaxed max-w-lg">
              Каждый сеанс — это диалог между руками мастера и вашим телом, в котором рождается гармония.
            </p>

            <div className="mt-10 flex items-center gap-8">
              <div>
                <div className="font-serif text-4xl text-gold-500">8</div>
                <div className="text-sm text-chocolate-300 uppercase tracking-wider mt-1">лет заботы</div>
              </div>
              <div className="h-12 w-px bg-gold-400/30" />
              <div>
                <div className="font-serif text-4xl text-gold-500">12K+</div>
                <div className="text-sm text-chocolate-300 uppercase tracking-wider mt-1">сеансов</div>
              </div>
              <div className="h-12 w-px bg-gold-400/30" />
              <div>
                <div className="font-serif text-4xl text-gold-500">4.9</div>
                <div className="text-sm text-chocolate-300 uppercase tracking-wider mt-1">рейтинг</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
