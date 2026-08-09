import { useState } from 'react';
import { motion } from 'framer-motion';
import { masters, type Master } from '@/data';
import { pexelsSized } from '@/utils/image';
import MasterModal from './MasterModal';

export default function Masters({ onBook }: { onBook: (masterName?: string) => void }) {
  const [selected, setSelected] = useState<Master | null>(null);

  return (
    <section id="masters" className="relative py-32 md:py-40 bg-cream-200/50 linen-texture">
      <div className="container-luxe">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="section-label justify-center">
            <span className="h-px w-12 bg-gold-400/50" />
            Мастера
            <span className="h-px w-12 bg-gold-400/50" />
          </div>
          <h2 className="section-title">Руки, которые слышат тело</h2>
          <p className="mt-6 text-lg text-chocolate-400 max-w-2xl mx-auto">
            Каждый мастер Soul Touch — это годы практики, тонкое чутьё и глубокое уважение к вашему телу.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {masters.map((master, i) => (
            <motion.div
              key={master.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.1 }}
              className="group"
            >
              <button
                onClick={() => setSelected(master)}
                className="block w-full text-left"
                aria-label={`Читать биографию: ${master.name}`}
              >
                <div className="relative overflow-hidden rounded-3xl mb-5">
                  <img
                    src={pexelsSized(master.photo, 600)}
                    alt={master.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-80 object-cover transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-chocolate-700/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-block rounded-full glass-dark px-4 py-1.5 text-xs uppercase tracking-wider text-gold-300">
                      {master.experience}
                    </span>
                  </div>
                </div>

                <h3 className="font-serif text-2xl text-chocolate-600 mb-1">{master.name}</h3>
                <p className="text-sm text-gold-500 mb-3">{master.specialty}</p>
                <p className="text-sm text-chocolate-400 leading-relaxed mb-5">{master.bio}</p>
              </button>

              <button
                onClick={() => onBook(master.name)}
                className="text-sm uppercase tracking-wider text-chocolate-500 border-b border-gold-400/30 pb-1 transition-all duration-300 hover:text-gold-500 hover:border-gold-400"
              >
                Записаться к мастеру →
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      <MasterModal master={selected} onClose={() => setSelected(null)} onBook={(name) => { setSelected(null); onBook(name); }} />
    </section>
  );
}
