import { motion } from 'framer-motion';
import { Youtube, ExternalLink, CreditCard } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

// Redot Pay logo URL
const REDOTPAY_LOGO = 'https://www.redotpay.com/_next/image?url=%2Flogo.png&w=256&q=75';

const Partners = () => {
  const { t } = useLanguage();

  return (
    <section id="partners" className="py-20 md:py-32 relative" data-testid="partners-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full glass text-cyan-400 text-xs sm:text-sm font-mono tracking-widest mb-6">
            {t('partners.badge')}
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight uppercase mb-4 md:mb-6">
            {t('partners.title')} <span className="gradient-text">{t('partners.titleHighlight')}</span>
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto px-4">
            {t('partners.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* YouTube */}
          <motion.a
            href="https://www.youtube.com/@GKYWEB3"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, y: -10 }}
            className="glass rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center min-h-[180px] md:min-h-[200px] hover:border-red-500/50 transition-all duration-500 group"
            data-testid="partner-youtube"
          >
            <Youtube className="w-12 h-12 md:w-16 md:h-16 text-red-500 mb-4 group-hover:scale-110 transition-transform" />
            <span className="font-subheading text-lg md:text-xl font-bold text-white uppercase tracking-wider">YouTube</span>
            <span className="text-slate-500 text-xs md:text-sm mt-2 flex items-center gap-2">
              {t('partners.youtube')} <ExternalLink className="w-3 h-3" />
            </span>
          </motion.a>

          {/* Polygon */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.05, y: -10 }}
            className="glass rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center min-h-[180px] md:min-h-[200px] hover:border-purple-500/50 transition-all duration-500"
            data-testid="partner-polygon"
          >
            <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
              <span className="font-heading text-xl md:text-2xl font-black text-white">P</span>
            </div>
            <span className="font-subheading text-lg md:text-xl font-bold text-white uppercase tracking-wider">Polygon</span>
            <span className="text-slate-500 text-xs md:text-sm mt-2">{t('partners.polygon')}</span>
          </motion.div>

          {/* Redot Pay */}
          <motion.a
            href="/redotpay"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.05, y: -10 }}
            className="glass rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center min-h-[180px] md:min-h-[200px] hover:border-green-500/50 transition-all duration-500 group"
            data-testid="partner-redotpay"
          >
            <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <CreditCard className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </div>
            <span className="font-subheading text-lg md:text-xl font-bold text-white uppercase tracking-wider">Redot Pay</span>
            <span className="text-slate-500 text-xs md:text-sm mt-2 flex items-center gap-2">
              Crypto Card Partner <ExternalLink className="w-3 h-3" />
            </span>
          </motion.a>

          {/* DeFi Alliance */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.05, y: -10 }}
            className="glass rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center min-h-[180px] md:min-h-[200px] hover:border-cyan-500/50 transition-all duration-500"
            data-testid="partner-defi"
          >
            <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mb-4">
              <span className="font-heading text-xl md:text-2xl font-black text-white">D</span>
            </div>
            <span className="font-subheading text-lg md:text-xl font-bold text-white uppercase tracking-wider">DeFi Alliance</span>
            <span className="text-slate-500 text-xs md:text-sm mt-2">{t('partners.defi')}</span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12 md:mt-16"
        >
          <p className="text-slate-500 mb-4 text-sm">{t('partners.cta')}</p>
          <a
            href="mailto:giakytoken@gmail.com"
            className="inline-flex items-center gap-2 bg-transparent border border-white/20 hover:border-cyan-500 text-white hover:text-cyan-400 font-bold py-3 px-6 rounded-full transition-all duration-300 uppercase text-xs md:text-sm tracking-wider"
            data-testid="partner-cta"
          >
            {t('partners.contact')} <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Partners;
