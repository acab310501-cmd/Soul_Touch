import { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, Check } from 'lucide-react';

const denominations = [3000, 5000, 8500, 12000];

export default function Certificate({ onBook }: { onBook: () => void }) {
  const [selected, setSelected] = useState(5000);

  return (
    <section id="certificate" className="relative py-32 md:py-40 bg-chocolate-700 overflow-hidden">
      <div className="absolute inset-0 noise-texture opacity-20" />
      <div className="absolute -top-20 -right-20 h-96 w-96 rounded-full bg-gold-400/10 blur-3xl" />

      <div className="container-luxe relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <div className="section-label !text-gold-300 mb-6">
              <span className="h-px w-12 bg-gold-300/50" />
              Подарочный сертификат
            </div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-cream-100 leading-tight text-balance">
              Подарите близким <span className="gold-text italic">тишину</span>
            </h2>
            <p className="mt-6 text-lg text-cream-200/70 leading-relaxed max-w-md">
              Сертификат Soul Touch — это не просто подарок. Это приглашение замедлиться, выдохнуть и
              вернуться к себе. Идеально для тех, кто забывает заботиться о себе сам.
            </p>

            <div className="mt-10">
              <p className="text-xs uppercase tracking-[0.2em] text-gold-300 mb-4">Выберите номинал</p>
              <div className="flex flex-wrap gap-3">
                {denominations.map((nom) => (
                  <button
                    key={nom}
                    onClick={() => setSelected(nom)}
                    className={`rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 ${
                      selected === nom
                        ? 'bg-gold-400 text-chocolate-700'
                        : 'border border-gold-400/30 text-cream-200/70 hover:border-gold-400 hover:text-gold-300'
                    }`}
                  >
                    {nom.toLocaleString('ru-RU')} ₽
                  </button>
                ))}
              </div>
            </div>

            <button onClick={onBook} className="btn-gold mt-8">
              <Gift size={18} />
              Купить сертификат
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="relative aspect-[4/3] rounded-3xl border border-gold-400/30 bg-gradient-to-br from-chocolate-600 to-chocolate-700 p-8 md:p-10 overflow-hidden"
            >
              <div className="absolute inset-0 noise-texture opacity-30" />
              <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-gold-400/10 blur-3xl" />

              <div className="relative flex flex-col h-full justify-between">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold-400/50">
                      <span className="h-3 w-3 rounded-full bg-gold-400 animate-breathe" />
                    </span>
                    <span className="font-serif text-lg text-cream-100">Soul Touch</span>
                  </div>
                  <Gift size={28} className="text-gold-400/60" strokeWidth={1.5} />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-gold-300 mb-2">Подарочный сертификат</p>
                  <p className="font-serif text-5xl md:text-6xl text-cream-100">
                    {selected.toLocaleString('ru-RU')} <span className="text-3xl text-gold-300">₽</span>
                  </p>
                  <p className="mt-3 text-cream-200/50 text-sm italic">
                    На пути к внутренней тишине
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs text-cream-200/40">
                  <Check size={14} className="text-gold-400" />
                  Действует 6 месяцев · Можно отправить на почту
                </div>
              </div>
            </motion.div>

            <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-gold-400/20 blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
