import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, X } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const FloatingWhitepaperBanner = ({ onWhitepaperClick }) => {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const lastScrollY = useRef(0);

  const content = {
    it: 'Leggi come funziona',
    en: 'Read how it works',
    es: 'Lee cómo funciona',
    fr: 'Lire comment ça marche',
    de: 'Lesen Sie wie es funktioniert',
    ru: 'Как это работает',
    zh: '了解如何运作'
  };

  const t = content[language] || content.en;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollThreshold = window.innerHeight * 0.8;
      
      // Determina direzione scroll
      const scrollingDown = currentScrollY > lastScrollY.current;
      setIsScrollingDown(scrollingDown);
      
      // Mostra solo se: oltre threshold, non dismissed, e non sta scrollando giù
      const shouldShow = currentScrollY > scrollThreshold && !isDismissed && !scrollingDown;
      setIsVisible(shouldShow);
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  const handleClick = () => {
    onWhitepaperClick();
  };

  const handleDismiss = (e) => {
    e.stopPropagation();
    setIsDismissed(true);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40"
        >
          <div className="relative">
            {/* Banner Button */}
            <motion.button
              onClick={handleClick}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3 
                         bg-gradient-to-r from-cyan-500/90 to-purple-500/90 
                         backdrop-blur-md rounded-full 
                         text-white font-bold text-xs sm:text-sm uppercase tracking-wider
                         shadow-[0_0_30px_rgba(0,240,255,0.4)]
                         hover:shadow-[0_0_40px_rgba(0,240,255,0.6)]
                         transition-shadow duration-300
                         border border-white/20"
              data-testid="floating-whitepaper-banner"
            >
              <BookOpen className="w-4 h-4" />
              <span>{t}</span>
            </motion.button>

            {/* Close Button */}
            <button
              onClick={handleDismiss}
              className="absolute -top-2 -right-2 w-6 h-6 
                         bg-slate-800 hover:bg-slate-700 
                         rounded-full flex items-center justify-center
                         border border-white/20 transition-colors"
              aria-label="Chiudi"
            >
              <X className="w-3 h-3 text-slate-400" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingWhitepaperBanner;
