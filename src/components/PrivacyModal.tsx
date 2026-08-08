import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

type Props = {
  open: boolean;
  onClose: () => void;
};

const sections = [
  {
    title: '1. Общие положения',
    body: 'Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных пользователей сайта Soul Touch. Используя сайт, вы даёте согласие на обработку персональных данных в соответствии с данной политикой.',
  },
  {
    title: '2. Какие данные мы собираем',
    body: 'Мы собираем данные, которые вы предоставляете добровольно при записи на сеанс: имя, номер телефона, email, выбранную услугу, мастера, дату и время визита, а также комментарии и пожелания.',
  },
  {
    title: '3. Как мы используем данные',
    body: 'Ваши данные используются исключительно для записи на массаж, подтверждения визита, напоминаний о сеансах и информирования об акциях студии. Мы не передаём ваши данные третьим лицам.',
  },
  {
    title: '4. Хранение данных',
    body: 'Персональные данные хранятся в течение срока, необходимого для оказания услуг, и удаляются по вашему запросу. Вы можете в любой момент отказаться от рассылок и попросить удалить ваши данные.',
  },
  {
    title: '5. Безопасность',
    body: 'Мы принимаем все необходимые технические и организационные меры для защиты ваших персональных данных от несанкционированного доступа, изменения или уничтожения.',
  },
  {
    title: '6. Контакты',
    body: 'По вопросам обработки персональных данных пишите на hello@soultouch.ru или звоните по телефону +7 (495) 123-45-67. Мы ответим в течение 24 часов.',
  },
];

export default function PrivacyModal({ open, onClose }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

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
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl bg-cream-100 shadow-2xl p-8 md:p-12"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full border border-gold-400/30 text-chocolate-400 transition-colors hover:bg-gold-400/10 hover:text-gold-500"
              aria-label="Закрыть"
            >
              <X size={18} />
            </button>

            <div className="section-label mb-4">
              <span className="h-px w-12 bg-gold-400/50" />
              Документ
            </div>
            <h3 className="font-serif text-3xl text-chocolate-600 mb-8">Политика конфиденциальности</h3>

            <div className="space-y-6">
              {sections.map((s) => (
                <div key={s.title}>
                  <h4 className="font-serif text-lg text-chocolate-500 mb-2">{s.title}</h4>
                  <p className="text-chocolate-400 leading-relaxed text-sm">{s.body}</p>
                </div>
              ))}
            </div>

            <p className="mt-8 text-xs text-chocolate-300">Последнее обновление: январь 2026</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
