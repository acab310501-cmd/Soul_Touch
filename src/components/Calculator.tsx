import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { services } from '@/data';

type Addon = {
  id: string;
  label: string;
  price: number;
};

const addons: Addon[] = [
  { id: 'aroma', label: 'Ароматерапия', price: 500 },
  { id: 'wrap', label: 'Обёртывание', price: 1000 },
];

const durations = [
  { mins: 60, label: '60 мин' },
  { mins: 90, label: '90 мин' },
  { mins: 120, label: '120 мин' },
];

const basePrices: Record<string, Record<number, number>> = {
  classic: { 60: 3500, 90: 4900, 120: 6300 },
  thai: { 60: 4500, 90: 5500, 120: 7000 },
  stone: { 60: 5000, 90: 6000, 120: 7500 },
  lymph: { 60: 3500, 90: 4500, 120: 5800 },
  'anti-cellulite': { 60: 3800, 90: 4800, 120: 6100 },
  'spa-ritual': { 60: 5500, 90: 7000, 120: 8500 },
};

function AnimatedPrice({ value }: { value: number }) {
  const [display, setDisplay] = useState(value);
  const prevRef = useRef(value);

  useEffect(() => {
    const start = prevRef.current;
    const end = value;
    const duration = 500;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (end - start) * eased);
      setDisplay(current);
      if (progress < 1) requestAnimationFrame(tick);
      else prevRef.current = end;
    };

    requestAnimationFrame(tick);
  }, [value]);

  return (
    <span className="tabular-nums">
      {display.toLocaleString('ru-RU')} <span className="text-3xl text-gold-300">₽</span>
    </span>
  );
}

export default function Calculator({ onBook }: { onBook: (serviceId?: string) => void }) {
  const [serviceId, setServiceId] = useState('classic');
  const [duration, setDuration] = useState(60);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  const basePrice = basePrices[serviceId]?.[duration] ?? 3500;
  const addonsTotal = selectedAddons.reduce((sum, id) => sum + (addons.find((a) => a.id === id)?.price ?? 0), 0);
  const total = basePrice + addonsTotal;

  const toggleAddon = (id: string) =>
    setSelectedAddons((prev) => (prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]));

  return (
    <section id="calculator" className="relative py-32 md:py-40 bg-cream-100 linen-texture overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-64 w-[600px] rounded-full bg-gold-400/8 blur-3xl" />

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
            Калькулятор
            <span className="h-px w-12 bg-gold-400/50" />
          </div>
          <h2 className="section-title">Соберите свой ритуал</h2>
          <p className="mt-6 text-lg text-chocolate-400 max-w-2xl mx-auto">
            Выберите услугу, длительность и дополнения — и увидите итоговую стоимость в реальном времени.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_400px] gap-8">
          <div className="space-y-10">
            <div>
              <h3 className="text-xs uppercase tracking-[0.2em] text-gold-500 mb-5">Шаг 1 — Услуга</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {services.map((s) => {
                  const Icon = s.icon;
                  const active = serviceId === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setServiceId(s.id)}
                      className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition-all duration-300 ${
                        active
                          ? 'border-gold-400 bg-gold-400/10 shadow-[0_0_30px_-10px_rgba(201,169,110,0.5)]'
                          : 'border-gold-400/15 bg-white/30 hover:border-gold-400/40 hover:bg-white/50'
                      }`}
                    >
                      <Icon size={22} className={active ? 'text-gold-500' : 'text-chocolate-400'} strokeWidth={1.5} />
                      <span className={`text-sm ${active ? 'text-chocolate-600' : 'text-chocolate-400'}`}>
                        {s.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-[0.2em] text-gold-500 mb-5">Шаг 2 — Длительность</h3>
              <div className="flex flex-wrap gap-3">
                {durations.map((d) => {
                  const active = duration === d.mins;
                  return (
                    <button
                      key={d.mins}
                      onClick={() => setDuration(d.mins)}
                      className={`rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 ${
                        active
                          ? 'bg-gold-400 text-chocolate-700'
                          : 'border border-gold-400/25 text-chocolate-400 hover:border-gold-400 hover:text-gold-500'
                      }`}
                    >
                      {d.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-[0.2em] text-gold-500 mb-5">Шаг 3 — Дополнения</h3>
              <div className="flex flex-wrap gap-3">
                {addons.map((a) => {
                  const active = selectedAddons.includes(a.id);
                  return (
                    <button
                      key={a.id}
                      onClick={() => toggleAddon(a.id)}
                      className={`flex items-center gap-3 rounded-2xl border px-5 py-4 transition-all duration-300 ${
                        active
                          ? 'border-gold-400 bg-gold-400/10'
                          : 'border-gold-400/15 bg-white/30 hover:border-gold-400/40'
                      }`}
                    >
                      <span
                        className={`flex h-5 w-5 items-center justify-center rounded-md border transition-all ${
                          active ? 'border-gold-400 bg-gold-400 text-chocolate-700' : 'border-gold-400/30'
                        }`}
                      >
                        {active && <Check size={12} />}
                      </span>
                      <span className="text-sm text-chocolate-500">{a.label}</span>
                      <span className="text-xs text-gold-500">+{a.price.toLocaleString('ru-RU')} ₽</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative flex flex-col justify-between rounded-3xl border border-gold-400/20 bg-gradient-to-br from-chocolate-600 to-chocolate-700 p-8 lg:sticky lg:top-28"
          >
            <div className="absolute inset-0 noise-texture opacity-20 rounded-3xl" />
            <div className="absolute -top-6 -right-6 h-32 w-32 rounded-full bg-gold-400/15 blur-3xl" />

            <div className="relative">
              <p className="text-xs uppercase tracking-[0.2em] text-gold-300 mb-2">Итоговая стоимость</p>
              <motion.div
                key={total}
                initial={{ opacity: 0.6, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="font-serif text-5xl lg:text-6xl text-cream-100"
              >
                <AnimatedPrice value={total} />
              </motion.div>

              <div className="mt-8 space-y-3 text-sm">
                <div className="flex items-center justify-between text-cream-200/60">
                  <span>{services.find((s) => s.id === serviceId)?.title}</span>
                  <span>{basePrice.toLocaleString('ru-RU')} ₽</span>
                </div>
                <div className="flex items-center justify-between text-cream-200/60">
                  <span>{duration} минут</span>
                  <span>включено</span>
                </div>
                {selectedAddons.map((id) => {
                  const a = addons.find((x) => x.id === id);
                  if (!a) return null;
                  return (
                    <div key={id} className="flex items-center justify-between text-cream-200/60">
                      <span>{a.label}</span>
                      <span>+{a.price.toLocaleString('ru-RU')} ₽</span>
                    </div>
                  );
                })}
              </div>

              <div className="my-6 h-px bg-gold-400/20" />
              <p className="text-sm text-cream-200/50 italic">
                В стоимость входят масла, ароматы и забота мастера
              </p>
            </div>

            <button onClick={() => onBook(serviceId)} className="btn-gold w-full mt-8">
              Записаться сейчас
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
