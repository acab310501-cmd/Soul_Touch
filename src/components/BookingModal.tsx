import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Send } from 'lucide-react';
import { services, masters, contact } from '@/data';

type Props = {
  open: boolean;
  onClose: () => void;
  preselectService?: string;
  preselectMaster?: string;
};

function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '').replace(/^8/, '7').replace(/^7+/, '7').slice(0, 11);
  let d = digits;
  if (!d) return '';
  if (d[0] !== '7') d = '7' + d;
  const p = d.slice(1);
  let out = '+7';
  if (p.length > 0) out += ' (' + p.slice(0, 3);
  if (p.length >= 3) out += ') ' + p.slice(3, 6);
  if (p.length >= 6) out += '-' + p.slice(6, 8);
  if (p.length >= 8) out += '-' + p.slice(8, 10);
  return out;
}

export default function BookingModal({ open, onClose, preselectService, preselectMaster }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    master: '',
    date: '',
    time: '',
    comment: '',
  });

  useEffect(() => {
    if (open) {
      setSubmitted(false);
      setForm((prev) => ({
        ...prev,
        service: preselectService || prev.service,
        master: preselectMaster || prev.master,
      }));
    }
  }, [open, preselectService, preselectMaster]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Build a pre-filled WhatsApp message so the request actually reaches
    // the studio — the form has no backend, so this is the delivery channel.
    const lines = [
      `Новая заявка на сеанс — Soul Touch`,
      `Имя: ${form.name}`,
      `Телефон: ${form.phone}`,
      form.email && `Email: ${form.email}`,
      `Услуга: ${form.service || 'не выбрана'}`,
      form.master && `Мастер: ${form.master}`,
      `Дата: ${form.date || 'не указана'}`,
      `Время: ${form.time || 'не указано'}`,
      form.comment && `Комментарий: ${form.comment}`,
    ].filter(Boolean);

    const waUrl = `${contact.whatsapp}?text=${encodeURIComponent(lines.join('\n'))}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');

    setSubmitted(true);
  };

  const update = (key: string, value: string) => setForm((prev) => ({ ...prev, [key]: value }));

  const today = new Date().toISOString().split('T')[0];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
        >
          <div className="absolute inset-0 bg-chocolate-700/70 backdrop-blur-md" />

          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 24, stiffness: 280 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-cream-100 shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-gold-400/30 text-chocolate-400 transition-colors hover:bg-gold-400/10 hover:text-gold-500"
              aria-label="Закрыть"
            >
              <X size={18} />
            </button>

            {submitted ? (
              <div className="flex flex-col items-center justify-center p-12 md:p-16 text-center min-h-[400px]">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 12 }}
                  className="flex h-20 w-20 items-center justify-center rounded-full bg-gold-400/15 mb-6"
                >
                  <Check size={36} className="text-gold-500" />
                </motion.div>
                <h3 className="font-serif text-3xl text-chocolate-600 mb-4">Спасибо!</h3>
                <p className="text-chocolate-400 text-lg max-w-md">
                  Мы открыли WhatsApp с вашей заявкой — просто нажмите «Отправить» в приложении, и
                  мы подтвердим запись в течение 15 минут.
                </p>
                <button onClick={onClose} className="btn-outline mt-8">
                  Закрыть
                </button>
              </div>
            ) : (
              <div className="p-8 md:p-12">
                <div className="section-label mb-4">
                  <span className="h-px w-12 bg-gold-400/50" />
                  Запись на сеанс
                </div>
                <h3 className="font-serif text-3xl text-chocolate-600 mb-2">Путь начинается здесь</h3>
                <p className="text-chocolate-400 mb-8">Заполните форму — и мы свяжемся с вами для подтверждения.</p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label="Имя" required>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => update('name', e.target.value)}
                        placeholder="Как к вам обращаться"
                        className={inputClass}
                      />
                    </Field>
                    <Field label="Телефон" required>
                      <input
                        type="tel"
                        required
                        minLength={18}
                        title="Введите номер телефона полностью"
                        value={form.phone}
                        onChange={(e) => update('phone', formatPhone(e.target.value))}
                        placeholder="+7 (___) ___-__-__"
                        className={inputClass}
                      />
                    </Field>
                  </div>

                  <Field label="Email">
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => update('email', e.target.value)}
                      placeholder="your@email.com"
                      className={inputClass}
                    />
                  </Field>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label="Услуга" required>
                      <select
                        required
                        value={form.service}
                        onChange={(e) => update('service', e.target.value)}
                        className={inputClass}
                      >
                        <option value="">Выберите услугу</option>
                        {services.map((s) => (
                          <option key={s.id} value={s.title}>
                            {s.title}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Мастер">
                      <select
                        value={form.master}
                        onChange={(e) => update('master', e.target.value)}
                        className={inputClass}
                      >
                        <option value="">Любой мастер</option>
                        {masters.map((m) => (
                          <option key={m.id} value={m.name}>
                            {m.name}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label="Дата" required>
                      <input
                        type="date"
                        required
                        min={today}
                        value={form.date}
                        onChange={(e) => update('date', e.target.value)}
                        className={inputClass}
                      />
                    </Field>
                    <Field label="Время" required>
                      <input
                        type="time"
                        required
                        value={form.time}
                        onChange={(e) => update('time', e.target.value)}
                        className={inputClass}
                      />
                    </Field>
                  </div>

                  <Field label="Комментарий">
                    <textarea
                      value={form.comment}
                      onChange={(e) => update('comment', e.target.value)}
                      placeholder="Особые пожелания, проблемные зоны, противопоказания..."
                      rows={3}
                      className={`${inputClass} resize-none`}
                    />
                  </Field>

                  <button type="submit" className="btn-gold w-full">
                    <Send size={16} />
                    Отправить заявку
                  </button>

                  <p className="text-xs text-chocolate-300 text-center">
                    Нажимая «Отправить», вы соглашаетесь с политикой конфиденциальности
                  </p>
                </form>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const inputClass =
  'w-full rounded-xl border border-gold-400/20 bg-white/50 px-4 py-3 text-chocolate-500 placeholder:text-chocolate-300 outline-none transition-all duration-300 focus:border-gold-400 focus:bg-white focus:ring-2 focus:ring-gold-400/20';

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs uppercase tracking-wider text-chocolate-400">
        {label} {required && <span className="text-gold-500">*</span>}
      </span>
      {children}
    </label>
  );
}
