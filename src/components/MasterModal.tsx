import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import type { Master } from '@/data';

type Props = {
  master: Master | null;
  onClose: () => void;
  onBook: (masterName: string) => void;
};

export default function MasterModal({ master, onClose, onBook }: Props) {
  useEffect(() => {
    if (!master) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [master, onClose]);

  return (
    <AnimatePresence>
      {master && (
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
            className="relative grid w-full max-w-3xl max-h-[90vh] grid-cols-1 overflow-y-auto rounded-3xl bg-cream-100 shadow-2xl md:grid-cols-[280px_1fr]"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-gold-400/30 bg-cream-100/80 text-chocolate-400 backdrop-blur transition-colors hover:bg-gold-400/10 hover:text-gold-500"
              aria-label="Закрыть"
            >
              <X size={18} />
            </button>

            <div className="h-64 md:h-full">
              <img
                src={master.photo}
                alt={master.name}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="p-8 md:p-10">
              <div className="section-label mb-3">
                <span className="h-px w-12 bg-gold-400/50" />
                {master.experience}
              </div>
              <h3 className="font-serif text-3xl text-chocolate-600 mb-1">{master.name}</h3>
              <p className="text-sm text-gold-500 mb-6">{master.specialty}</p>
              <p className="text-chocolate-400 leading-relaxed whitespace-pre-line">{master.fullBio}</p>

              <button onClick={() => onBook(master.name)} className="btn-gold mt-8">
                Записаться к мастеру
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
