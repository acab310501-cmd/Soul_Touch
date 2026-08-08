import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Услуги', href: '#services' },
  { label: 'Мастера', href: '#masters' },
  { label: 'Как мы работаем', href: '#process' },
  { label: 'Атмосфера', href: '#gallery' },
  { label: 'Отзывы', href: '#reviews' },
  { label: 'Цены', href: '#prices' },
  { label: 'Сертификат', href: '#certificate' },
];

export default function Navbar({ onBook }: { onBook: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass shadow-[0_1px_30px_-10px_rgba(61,43,31,0.15)] py-3' : 'py-6'
        }`}
      >
        <nav className="container-luxe flex items-center justify-between">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold-400/60">
              <span className="h-3 w-3 rounded-full bg-gold-400 animate-breathe" />
            </span>
            <span className="font-serif text-xl tracking-wide text-chocolate-600">
              Soul <span className="gold-text">Touch</span>
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleClick(link.href)}
                className="text-sm text-chocolate-400 transition-colors duration-300 hover:text-gold-500"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button onClick={onBook} className="hidden sm:inline-flex btn-gold !px-6 !py-3 !text-xs">
              Забронировать
            </button>
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden flex h-10 w-10 items-center justify-center rounded-full border border-gold-400/40 text-chocolate-500"
              aria-label="Меню"
            >
              <Menu size={18} />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] lg:hidden"
          >
            <div className="absolute inset-0 bg-chocolate-700/95 backdrop-blur-xl" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="absolute right-0 top-0 h-full w-80 max-w-[85%] bg-cream-100 p-8 flex flex-col"
            >
              <div className="flex items-center justify-between mb-12">
                <span className="font-serif text-lg text-chocolate-600">Soul Touch</span>
                <button
                  onClick={() => setOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gold-400/40 text-chocolate-500"
                  aria-label="Закрыть"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.href}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    onClick={() => handleClick(link.href)}
                    className="py-3 text-left font-serif text-2xl text-chocolate-500 transition-colors hover:text-gold-500"
                  >
                    {link.label}
                  </motion.button>
                ))}
              </div>
              <button
                onClick={() => {
                  setOpen(false);
                  onBook();
                }}
                className="btn-gold mt-auto"
              >
                Забронировать
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
