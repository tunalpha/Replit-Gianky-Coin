import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const FAQ = () => {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState(null);
  const questions = t('faq.questions');

  return (
    <section id="faq" className="py-20 md:py-32 relative" data-testid="faq-section">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full glass text-cyan-400 text-xs sm:text-sm font-mono tracking-widest mb-6">
            {t('faq.badge')}
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight uppercase mb-4 md:mb-6">
            {t('faq.title')} <span className="gradient-text">{t('faq.titleHighlight')}</span>
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto px-4">
            {t('faq.subtitle')}
          </p>
        </motion.div>

        <div className="space-y-3 md:space-y-4">
          {Array.isArray(questions) && questions.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="faq-item"
              data-testid={`faq-item-${index}`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="faq-question w-full text-left"
                data-testid={`faq-question-${index}`}
              >
                <div className="flex items-center gap-3 md:gap-4">
                  <HelpCircle className={`w-4 h-4 md:w-5 md:h-5 flex-shrink-0 transition-colors ${openIndex === index ? 'text-cyan-400' : 'text-slate-500'}`} />
                  <span className={`text-sm md:text-base transition-colors ${openIndex === index ? 'text-cyan-400' : 'text-white'}`}>
                    {faq.q}
                  </span>
                </div>
                <ChevronDown className={`w-4 h-4 md:w-5 md:h-5 flex-shrink-0 transition-all duration-300 ${openIndex === index ? 'rotate-180 text-cyan-400' : 'text-slate-500'}`} />
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="faq-answer text-sm md:text-base" data-testid={`faq-answer-${index}`}>
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-10 md:mt-12 p-6 md:p-8 glass rounded-2xl"
        >
          <p className="text-slate-400 mb-4 text-sm">{t('faq.notFound')}</p>
          <a
            href="mailto:support@giankycoin.com"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium transition-colors text-sm"
            data-testid="faq-contact"
          >
            {t('faq.contactSupport')}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
