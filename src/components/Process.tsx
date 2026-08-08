import { motion } from 'framer-motion';
import { MousePointerClick, CalendarCheck, DoorOpen, Wind } from 'lucide-react';

const steps = [
  { icon: MousePointerClick, title: 'Выбираете', desc: 'услугу и мастера', num: '01' },
  { icon: CalendarCheck, title: 'Записываетесь', desc: 'в удобное время', num: '02' },
  { icon: DoorOpen, title: 'Приходите', desc: 'в нашу студию', num: '03' },
  { icon: Wind, title: 'Уходите', desc: 'с лёгкостью и гармонией', num: '04' },
];

export default function Process() {
  return (
    <section id="process" className="relative py-32 md:py-40 bg-chocolate-700 overflow-hidden">
      <div className="absolute inset-0 noise-texture opacity-20" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-gold-400/10 blur-3xl" />

      <div className="container-luxe relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="section-label !text-gold-300 justify-center mb-6">
            <span className="h-px w-12 bg-gold-300/50" />
            Как мы работаем
            <span className="h-px w-12 bg-gold-300/50" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-cream-100">Путь к гармонии</h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold-400/30 to-transparent hidden md:block" />

          <div className="flex flex-col gap-12 md:gap-20">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.7 }}
                  className={`relative flex items-center gap-6 md:gap-12 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className="flex-1 hidden md:block" />
                  <div className="relative z-10 flex flex-shrink-0 items-center justify-center">
                    <motion.div
                      whileInView={{ scale: [0, 1.1, 1] }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="flex h-20 w-20 items-center justify-center rounded-full border border-gold-400/40 bg-chocolate-600"
                    >
                      <Icon size={28} className="text-gold-400" strokeWidth={1.5} />
                    </motion.div>
                  </div>
                  <div className={`flex-1 ${isLeft ? 'md:text-left' : 'md:text-right'}`}>
                    <span className="font-serif text-6xl text-gold-400/20">{step.num}</span>
                    <h3 className="font-serif text-2xl md:text-3xl text-cream-100 mt-2">{step.title}</h3>
                    <p className="text-cream-200/60 mt-2">{step.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
