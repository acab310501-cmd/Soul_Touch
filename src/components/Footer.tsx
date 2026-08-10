import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Instagram, Youtube, Send, MessageCircle } from 'lucide-react';
import PrivacyModal from './PrivacyModal';
import OfferModal from './OfferModal';
import { contact } from '@/data';

const socials = [
  { icon: Instagram, label: 'Instagram', href: contact.instagram },
  { icon: Send, label: 'Telegram', href: contact.telegram },
  { icon: MessageCircle, label: 'WhatsApp', href: contact.whatsapp },
  { icon: Youtube, label: 'YouTube', href: contact.youtube },
];

export default function Footer() {
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [offerOpen, setOfferOpen] = useState(false);

  return (
    <footer className="relative bg-chocolate-700 text-cream-200 overflow-hidden">
      <div className="absolute inset-0 noise-texture opacity-20" />

      <div className="container-luxe relative pt-24 pb-12">
        <div className="grid lg:grid-cols-3 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold-400/50">
                <span className="h-3 w-3 rounded-full bg-gold-400 animate-breathe" />
              </span>
              <span className="font-serif text-2xl text-cream-100">
                Soul <span className="gold-text">Touch</span>
              </span>
            </div>
            <p className="text-cream-200/60 leading-relaxed max-w-xs">
              Территория гармонии — где массаж превращается в ритуал заботы о себе.
            </p>

            <div className="mt-8 flex gap-3">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-gold-400/25 text-cream-200/70 transition-all duration-300 hover:border-gold-400 hover:bg-gold-400/10 hover:text-gold-300 hover:scale-110"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-xs uppercase tracking-[0.2em] text-gold-300 mb-6">Контакты</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-gold-400 mt-0.5 flex-shrink-0" />
                <a href={`tel:+${contact.phoneDigits}`} className="text-cream-200/80 hover:text-gold-300 transition-colors">
                  {contact.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-gold-400 mt-0.5 flex-shrink-0" />
                <a href={`mailto:${contact.email}`} className="text-cream-200/80 hover:text-gold-300 transition-colors">
                  {contact.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-gold-400 mt-0.5 flex-shrink-0" />
                <span className="text-cream-200/80">{contact.address}</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={18} className="text-gold-400 mt-0.5 flex-shrink-0" />
                <span className="text-cream-200/80">{contact.hours}</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-xs uppercase tracking-[0.2em] text-gold-300 mb-6">Мы на карте</h4>
            <div className="overflow-hidden rounded-2xl border border-gold-400/20 h-64">
              <iframe
                title="Карта Soul Touch"
                src="https://yandex.ru/map-widget/v1/?ll=37.611820%2C55.761240&z=15"
                className="h-full w-full"
                style={{ border: 0, filter: 'grayscale(0.3) sepia(0.2)' }}
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>

        <div className="border-t border-gold-400/15 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-cream-200/50">© 2026 Soul Touch — Территория гармонии</p>
          <div className="flex gap-6 text-sm text-cream-200/50">
            <button
              onClick={() => setPrivacyOpen(true)}
              className="hover:text-gold-300 transition-colors"
            >
              Политика конфиденциальности
            </button>
            <button
              onClick={() => setOfferOpen(true)}
              className="hover:text-gold-300 transition-colors"
            >
              Оферта
            </button>
          </div>
        </div>
      </div>

      <PrivacyModal open={privacyOpen} onClose={() => setPrivacyOpen(false)} />
      <OfferModal open={offerOpen} onClose={() => setOfferOpen(false)} />
    </footer>
  );
}
