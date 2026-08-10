import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { contact } from '@/data';

type Props = {
  open: boolean;
  onClose: () => void;
};

const sections = [
  {
    title: '1. Общие положения',
    body: 'Настоящий документ является публичной офертой Soul Touch (далее — «Студия») и содержит все существенные условия оказания услуг массажа и SPA-программ. В соответствии со ст. 437 Гражданского кодекса РФ, в случае принятия изложенных ниже условий физическое лицо, производящее акцепт оферты, становится Заказчиком. Акцептом оферты считается запись на сеанс через сайт, по телефону или в мессенджере.',
  },
  {
    title: '2. Предмет оферты',
    body: 'Студия обязуется оказать Заказчику услуги массажа и SPA-программ согласно выбранной услуге, длительности и дополнительным опциям, указанным при записи, а Заказчик обязуется оплатить эти услуги по действующим на момент записи ценам, опубликованным в разделе «Цены».',
  },
  {
    title: '3. Порядок записи и оплаты',
    body: 'Запись на сеанс осуществляется через форму на сайте, по телефону или в WhatsApp. Оплата производится в Студии перед началом или после окончания сеанса, наличными или картой. Стоимость сертификатов оплачивается при их покупке.',
  },
  {
    title: '4. Отмена и перенос записи',
    body: 'Заказчик вправе отменить или перенести запись не позднее чем за 4 часа до начала сеанса, уведомив Студию по телефону или в WhatsApp. При отмене менее чем за 4 часа либо неявке без предупреждения Студия оставляет за собой право отказать в записи на удобное для Заказчика время в будущем.',
  },
  {
    title: '5. Противопоказания и ответственность',
    body: 'Заказчик обязан заранее сообщить мастеру о состояниях здоровья, беременности, кожных заболеваниях, аллергиях и иных противопоказаниях к массажу. Студия не несёт ответственности за последствия, вызванные сокрытием Заказчиком информации о состоянии здоровья.',
  },
  {
    title: '6. Подарочные сертификаты',
    body: 'Сертификат действует 6 месяцев с даты покупки и может быть использован на любые услуги Студии в пределах номинала. Сертификат не подлежит возврату в денежном эквиваленте, за исключением случаев, предусмотренных законодательством РФ.',
  },
  {
    title: '7. Срок действия оферты',
    body: 'Оферта действует бессрочно с момента публикации на сайте и может быть изменена Студией в одностороннем порядке. Актуальная редакция всегда доступна на этой странице.',
  },
  {
    title: '8. Реквизиты и контакты',
    body: `По всем вопросам, связанным с исполнением настоящей оферты, обращайтесь по телефону ${contact.phoneDisplay} или на почту ${contact.email}. Адрес студии: ${contact.address}.`,
  },
];

export default function OfferModal({ open, onClose }: Props) {
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
            <h3 className="font-serif text-3xl text-chocolate-600 mb-2">Публичная оферта</h3>
            <p className="text-sm text-chocolate-300 mb-8">Договор оказания услуг Soul Touch</p>

            <div className="space-y-6">
              {sections.map((s) => (
                <div key={s.title}>
                  <h4 className="font-serif text-lg text-chocolate-500 mb-2">{s.title}</h4>
                  <p className="text-chocolate-400 leading-relaxed text-sm">{s.body}</p>
                </div>
              ))}
            </div>

            <p className="mt-8 text-xs text-chocolate-300">
              Последнее обновление: январь 2026. Это типовой шаблон оферты — перед публикацией сайта рекомендуем
              согласовать его с юристом и указать реальные реквизиты (ИП/ООО, ИНН, ОГРНИП).
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
