import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';
import { services, type Service } from '@/data';

export default function Services({ onBook }: { onBook: (serviceId?: string) => void }) {
  const [selected, setSelected] = useState<Service | null>(null);

  useEffect(() => {
    if (!selected) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selected]);

  return (
    <section id="services" className="relative py-32 md:py-40 bg-cream-100">
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
            Услуги
            <span className="h-px w-12 bg-gold-400/50" />
          </div>
          <h2 className="section-title">Ритуалы восстановления</h2>
          <p className="mt-6 text-lg text-chocolate-400 max-w-2xl mx-auto">
            Каждый массаж — это персональный путь к гармонии. Выберите свой ритуал.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                onClick={() => setSelected(service)}
                className="group relative cursor-pointer rounded-3xl bg-white/40 border border-gold-400/15 p-8 transition-all duration-500 hover:bg-white/70 hover:-translate-y-2 hover:shadow-[0_20px_60px_-20px_rgba(201,169,110,0.4)] hover:border-gold-400/40"
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-gold-400/0 to-gold-400/0 group-hover:from-gold-400/5 group-hover:to-gold-400/10 transition-all duration-500" />

                <div className="relative">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cream-200/60 mb-6 transition-all duration-500 group-hover:bg-gold-400/15">
                    <Icon
                      size={28}
                      className="text-gold-500 animate-breathe"
                      strokeWidth={1.5}
                    />
                  </div>

                  <h3 className="font-serif text-2xl text-chocolate-600 mb-3">{service.title}</h3>
                  <p className="text-chocolate-400 leading-relaxed text-sm">{service.short}</p>

                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-gold-500 font-medium">{service.price}</span>
                    <span className="text-xs uppercase tracking-wider text-chocolate-300">{service.duration}</span>
                  </div>

                  <div className="mt-6 flex items-center gap-2 text-sm text-chocolate-400 group-hover:text-gold-500 transition-colors duration-300">
                    Подробнее
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          >
            <div className="absolute inset-0 bg-chocolate-700/70 backdrop-blur-md" />
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 24, stiffness: 280 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-cream-100 p-8 md:p-12 shadow-2xl"
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full border border-gold-400/30 text-chocolate-400 transition-colors hover:bg-gold-400/10 hover:text-gold-500"
                aria-label="Закрыть"
              >
                <X size={18} />
              </button>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-400/15 mb-6">
                {(() => {
                  const Icon = selected.icon;
                  return <Icon size={26} className="text-gold-500" strokeWidth={1.5} />;
                })()}
              </div>

              <h3 className="font-serif text-3xl md:text-4xl text-chocolate-600 mb-2">{selected.title}</h3>
              <div className="flex items-center gap-4 text-sm text-chocolate-300 mb-6">
                <span>{selected.duration}</span>
                <span className="h-3 w-px bg-gold-400/30" />
                <span className="text-gold-500 font-medium">{selected.price}</span>
              </div>

              <p className="text-chocolate-400 leading-relaxed mb-8">{selected.full}</p>

              <div className="mb-8">
                <h4 className="text-xs uppercase tracking-[0.2em] text-gold-500 mb-4">Что вы получите</h4>
                <div className="grid sm:grid-cols-2 gap-3">
                  {selected.benefits.map((b) => (
                    <div key={b} className="flex items-center gap-3 text-chocolate-400">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold-400/15">
                        <Check size={12} className="text-gold-500" />
                      </span>
                      {b}
                    </div>
                  ))}
                </div>
              </div>

              <button onClick={() => { onBook(selected.id); setSelected(null); }} className="btn-gold w-full">
                Записаться
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
