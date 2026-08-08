import { motion } from 'framer-motion';
import { prices } from '@/data';

export default function Prices({ onBook }: { onBook: () => void }) {
  return (
    <section id="prices" className="relative py-32 md:py-40 bg-cream-100 linen-texture">
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
            Цены
            <span className="h-px w-12 bg-gold-400/50" />
          </div>
          <h2 className="section-title">Прозрачные тарифы</h2>
          <p className="mt-6 text-lg text-chocolate-400 max-w-2xl mx-auto">
            Без скрытых платежей. Стоимость сеанса включает всё: масла, ароматы и заботу мастера.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <div className="rounded-3xl bg-white/40 border border-gold-400/15 overflow-hidden">
            <div className="grid grid-cols-12 px-6 md:px-10 py-4 border-b border-gold-400/15 text-xs uppercase tracking-wider text-chocolate-300">
              <div className="col-span-6">Услуга</div>
              <div className="col-span-3 text-center">Время</div>
              <div className="col-span-3 text-right">Цена</div>
            </div>

            {prices.map((row, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group grid grid-cols-12 items-center px-6 md:px-10 py-5 border-b border-gold-400/10 last:border-0 transition-all duration-300 hover:bg-gold-400/8 cursor-default"
              >
                <div className="col-span-6 font-serif text-lg text-chocolate-500 group-hover:text-gold-500 transition-colors">
                  {row.service}
                </div>
                <div className="col-span-3 text-center text-chocolate-400 text-sm">{row.duration}</div>
                <div className="col-span-3 text-right text-gold-500 font-medium">{row.price}</div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 text-center"
          >
            <p className="text-sm text-chocolate-300 mb-4">
              Первичная консультация мастера — бесплатно
            </p>
            <button onClick={onBook} className="btn-gold">
              Записаться на сеанс
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
