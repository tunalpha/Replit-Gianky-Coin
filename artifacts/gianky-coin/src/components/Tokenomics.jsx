import { motion } from 'framer-motion';
import { Wallet, Users, TrendingUp, Lock, Droplets, Building2, Megaphone, Settings, Shield } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const tokenomicsData = [
  { key: 'liquidity', value: 50, color: '#FFCC00', icon: Droplets },
  { key: 'network', value: 26.5, color: '#FF7700', icon: Building2 },
  { key: 'marketing', value: 11.5, color: '#AA00FF', icon: Megaphone },
  { key: 'maintenance', value: 10, color: '#00FFFF', icon: Settings },
  { key: 'protection', value: 2, color: '#00FF99', icon: Shield },
];

const Tokenomics = () => {
  const { t, language } = useLanguage();

  const itemLabels = {
    it: {
      liquidity: 'Liquidità',
      network: 'Rete commerciale & Holder wallet',
      marketing: 'Marketing & Sviluppo',
      maintenance: 'Manutenzione sistema',
      protection: 'Fondo di Protezione'
    },
    en: {
      liquidity: 'Liquidity',
      network: 'Commercial Network & Holder wallet',
      marketing: 'Marketing & Development',
      maintenance: 'System Maintenance',
      protection: 'Protection Fund'
    }
  };
  const labels = itemLabels[language] || itemLabels.en;

  const statsLabels = {
    it: { supply: 'Supply Totale', holders: 'Holders Previsti', apy: 'APY', tvl: 'TVL' },
    en: { supply: 'Total Supply', holders: 'Target Holders', apy: 'APY', tvl: 'TVL' }
  };
  const statsL = statsLabels[language] || statsLabels.en;

  const stats = [
    { icon: Wallet, label: statsL.supply, value: '21B GKY' },
    { icon: Users, label: statsL.holders, value: '10,000+' },
    { icon: TrendingUp, label: statsL.apy, value: '180%' },
    { icon: Lock, label: statsL.tvl, value: '$2M+' },
  ];

  return (
    <section id="tokenomics" className="py-20 md:py-32 relative overflow-hidden" data-testid="tokenomics-section">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-900/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full glass text-cyan-400 text-xs sm:text-sm font-mono tracking-widest mb-6">
            {t('tokenomics.badge')}
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight uppercase mb-4 md:mb-6">
            {t('tokenomics.title')} <span className="gradient-text">{t('tokenomics.titleHighlight')}</span>
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto px-4">
            {t('tokenomics.subtitle')}
          </p>
        </motion.div>

        {/* Distribution Cards */}
        <div className="max-w-3xl mx-auto mb-12">
          {/* Main Liquidity Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4"
          >
            <div 
              className="p-6 md:p-8 rounded-2xl text-center relative overflow-hidden"
              style={{ backgroundColor: '#FFCC00' }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <Droplets className="w-10 h-10 text-black/70 mx-auto mb-3" />
              <div className="font-heading text-5xl md:text-6xl font-black text-black mb-2">50%</div>
              <div className="text-black/80 font-semibold text-lg md:text-xl">{labels.liquidity}</div>
            </div>
          </motion.div>

          {/* Grid of other distributions */}
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            {tokenomicsData.slice(1).map((item, index) => {
              const ItemIcon = item.icon;
              return (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-5 md:p-6 rounded-xl text-center relative overflow-hidden"
                  style={{ backgroundColor: item.color }}
                >
                  <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                  <ItemIcon className="w-6 h-6 text-black/60 mx-auto mb-2" />
                  <div className="font-heading text-3xl md:text-4xl font-black text-black mb-1">{item.value}%</div>
                  <div className="text-black/80 font-medium text-xs md:text-sm leading-tight">{labels[item.key]}</div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="p-4 md:p-6 glass rounded-xl text-center hover:border-cyan-500/30 transition-colors"
            >
              <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-cyan-400 mx-auto mb-2 md:mb-3" />
              <div className="font-heading text-lg md:text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-slate-500 text-[10px] md:text-xs uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Tokenomics;
