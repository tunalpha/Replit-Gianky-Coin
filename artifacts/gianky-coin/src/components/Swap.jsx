import { motion } from 'framer-motion';
import { ArrowRightLeft, CreditCard, Shield, Zap, Globe, ExternalLink, Sparkles, RefreshCw, Coins } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const Swap = () => {
  const { language } = useLanguage();

  const content = {
    it: {
      badge: 'ACQUISTA CRYPTO',
      title: 'Compra',
      titleHighlight: 'POL',
      subtitle: 'Acquista POL (Polygon) istantaneamente con carta di credito, debito o bonifico bancario. Sicuro, veloce e conveniente.',
      features: [
        { icon: CreditCard, title: 'Carta di Credito/Debito', desc: 'Paga con Visa, Mastercard e altro' },
        { icon: Zap, title: 'Istantaneo', desc: 'Ricevi POL in pochi minuti' },
        { icon: Shield, title: 'Sicuro', desc: 'Provider verificati e affidabili' },
        { icon: Globe, title: 'Globale', desc: 'Disponibile in oltre 150 paesi' }
      ],
      widgetTitle: 'Acquista POL Ora',
      widgetSubtitle: 'Con carta di credito o bonifico',
      buyButton: 'COMPRA POL',
      poweredBy: 'Powered by Onramper',
      minAmount: 'Min. €20',
      providers: 'Visa, Mastercard, Apple Pay',
      swapBadge: 'SCAMBIA CRYPTO',
      swapTitle: 'Swap in',
      swapTitleHighlight: 'POL',
      swapSubtitle: 'Scambia le tue crypto in POL istantaneamente. Oltre 900 asset supportati, tassi competitivi e nessuna registrazione.',
      swapFeatures: [
        { icon: RefreshCw, title: '900+ Crypto', desc: 'Bitcoin, Ethereum, USDT e altri' },
        { icon: Zap, title: 'Veloce', desc: 'Scambio in pochi minuti' },
        { icon: Shield, title: 'No KYC', desc: 'Nessuna registrazione' },
        { icon: Coins, title: 'Tassi Ottimi', desc: 'I migliori dal mercato' }
      ],
      swapWidgetTitle: 'Scambia in POL',
      swapWidgetSubtitle: 'Da qualsiasi crypto',
      swapButton: 'SWAP ORA',
      swapPoweredBy: 'Powered by FixedFloat'
    },
    en: {
      badge: 'BUY CRYPTO',
      title: 'Buy',
      titleHighlight: 'POL',
      subtitle: 'Buy POL (Polygon) instantly with credit card, debit card or bank transfer. Secure, fast and convenient.',
      features: [
        { icon: CreditCard, title: 'Credit/Debit Card', desc: 'Pay with Visa, Mastercard and more' },
        { icon: Zap, title: 'Instant', desc: 'Receive POL in minutes' },
        { icon: Shield, title: 'Secure', desc: 'Verified and trusted providers' },
        { icon: Globe, title: 'Global', desc: 'Available in 150+ countries' }
      ],
      widgetTitle: 'Buy POL Now',
      widgetSubtitle: 'With credit card or bank transfer',
      buyButton: 'BUY POL',
      poweredBy: 'Powered by Onramper',
      minAmount: 'Min. €20',
      providers: 'Visa, Mastercard, Apple Pay',
      swapBadge: 'SWAP CRYPTO',
      swapTitle: 'Swap to',
      swapTitleHighlight: 'POL',
      swapSubtitle: 'Swap your crypto to POL instantly. Over 900 assets supported, competitive rates and no registration.',
      swapFeatures: [
        { icon: RefreshCw, title: '900+ Crypto', desc: 'Bitcoin, Ethereum, USDT and more' },
        { icon: Zap, title: 'Fast', desc: 'Swap in minutes' },
        { icon: Shield, title: 'No KYC', desc: 'No registration' },
        { icon: Coins, title: 'Best Rates', desc: 'Top market rates' }
      ],
      swapWidgetTitle: 'Swap to POL',
      swapWidgetSubtitle: 'From any crypto',
      swapButton: 'SWAP NOW',
      swapPoweredBy: 'Powered by FixedFloat'
    },
    es: {
      badge: 'COMPRAR CRYPTO',
      title: 'Compra',
      titleHighlight: 'POL',
      subtitle: 'Compra POL (Polygon) instantáneamente con tarjeta de crédito, débito o transferencia bancaria. Seguro, rápido y conveniente.',
      features: [
        { icon: CreditCard, title: 'Tarjeta Crédito/Débito', desc: 'Paga con Visa, Mastercard y más' },
        { icon: Zap, title: 'Instantáneo', desc: 'Recibe POL en minutos' },
        { icon: Shield, title: 'Seguro', desc: 'Proveedores verificados' },
        { icon: Globe, title: 'Global', desc: 'Disponible en 150+ países' }
      ],
      widgetTitle: 'Compra POL Ahora',
      widgetSubtitle: 'Con tarjeta o transferencia',
      buyButton: 'COMPRAR POL',
      poweredBy: 'Powered by Onramper',
      minAmount: 'Mín. €20',
      providers: 'Visa, Mastercard, Apple Pay',
      swapBadge: 'INTERCAMBIAR CRYPTO',
      swapTitle: 'Swap a',
      swapTitleHighlight: 'POL',
      swapSubtitle: 'Intercambia tus crypto a POL instantáneamente. Más de 900 activos, tasas competitivas y sin registro.',
      swapFeatures: [
        { icon: RefreshCw, title: '900+ Crypto', desc: 'Bitcoin, Ethereum, USDT y más' },
        { icon: Zap, title: 'Rápido', desc: 'Swap en minutos' },
        { icon: Shield, title: 'Sin KYC', desc: 'Sin registro' },
        { icon: Coins, title: 'Mejores Tasas', desc: 'Tasas top del mercado' }
      ],
      swapWidgetTitle: 'Swap a POL',
      swapWidgetSubtitle: 'Desde cualquier crypto',
      swapButton: 'SWAP AHORA',
      swapPoweredBy: 'Powered by FixedFloat'
    },
    fr: {
      badge: 'ACHETER CRYPTO',
      title: 'Acheter',
      titleHighlight: 'POL',
      subtitle: 'Achetez POL (Polygon) instantanément par carte de crédit, débit ou virement bancaire. Sécurisé, rapide et pratique.',
      features: [
        { icon: CreditCard, title: 'Carte Crédit/Débit', desc: 'Payez avec Visa, Mastercard et plus' },
        { icon: Zap, title: 'Instantané', desc: 'Recevez POL en minutes' },
        { icon: Shield, title: 'Sécurisé', desc: 'Fournisseurs vérifiés' },
        { icon: Globe, title: 'Global', desc: 'Disponible dans 150+ pays' }
      ],
      widgetTitle: 'Acheter POL Maintenant',
      widgetSubtitle: 'Par carte ou virement',
      buyButton: 'ACHETER POL',
      poweredBy: 'Powered by Onramper',
      minAmount: 'Min. €20',
      providers: 'Visa, Mastercard, Apple Pay',
      swapBadge: 'ÉCHANGER CRYPTO',
      swapTitle: 'Swap vers',
      swapTitleHighlight: 'POL',
      swapSubtitle: 'Échangez vos crypto vers POL instantanément. Plus de 900 actifs, taux compétitifs et sans inscription.',
      swapFeatures: [
        { icon: RefreshCw, title: '900+ Crypto', desc: 'Bitcoin, Ethereum, USDT et plus' },
        { icon: Zap, title: 'Rapide', desc: 'Swap en minutes' },
        { icon: Shield, title: 'Sans KYC', desc: 'Sans inscription' },
        { icon: Coins, title: 'Meilleurs Taux', desc: 'Meilleurs taux du marché' }
      ],
      swapWidgetTitle: 'Swap vers POL',
      swapWidgetSubtitle: 'Depuis n\'importe quelle crypto',
      swapButton: 'SWAP MAINTENANT',
      swapPoweredBy: 'Powered by FixedFloat'
    },
    de: {
      badge: 'CRYPTO KAUFEN',
      title: 'Kaufen',
      titleHighlight: 'POL',
      subtitle: 'Kaufen Sie POL (Polygon) sofort mit Kredit-, Debitkarte oder Überweisung. Sicher, schnell und bequem.',
      features: [
        { icon: CreditCard, title: 'Kredit-/Debitkarte', desc: 'Zahlen mit Visa, Mastercard und mehr' },
        { icon: Zap, title: 'Sofort', desc: 'POL in Minuten erhalten' },
        { icon: Shield, title: 'Sicher', desc: 'Verifizierte Anbieter' },
        { icon: Globe, title: 'Global', desc: 'Verfügbar in 150+ Ländern' }
      ],
      widgetTitle: 'POL Jetzt Kaufen',
      widgetSubtitle: 'Mit Karte oder Überweisung',
      buyButton: 'POL KAUFEN',
      poweredBy: 'Powered by Onramper',
      minAmount: 'Min. €20',
      providers: 'Visa, Mastercard, Apple Pay',
      swapBadge: 'CRYPTO TAUSCHEN',
      swapTitle: 'Swap zu',
      swapTitleHighlight: 'POL',
      swapSubtitle: 'Tauschen Sie Ihre Crypto sofort in POL. Über 900 Assets, wettbewerbsfähige Kurse und keine Registrierung.',
      swapFeatures: [
        { icon: RefreshCw, title: '900+ Crypto', desc: 'Bitcoin, Ethereum, USDT und mehr' },
        { icon: Zap, title: 'Schnell', desc: 'Swap in Minuten' },
        { icon: Shield, title: 'Kein KYC', desc: 'Keine Registrierung' },
        { icon: Coins, title: 'Beste Kurse', desc: 'Top Marktkurse' }
      ],
      swapWidgetTitle: 'Swap zu POL',
      swapWidgetSubtitle: 'Von jeder Crypto',
      swapButton: 'JETZT TAUSCHEN',
      swapPoweredBy: 'Powered by FixedFloat'
    },
    ru: {
      badge: 'КУПИТЬ КРИПТО',
      title: 'Купить',
      titleHighlight: 'POL',
      subtitle: 'Купите POL (Polygon) мгновенно картой или банковским переводом. Безопасно, быстро и удобно.',
      features: [
        { icon: CreditCard, title: 'Кредитная/Дебетовая Карта', desc: 'Оплата Visa, Mastercard и др.' },
        { icon: Zap, title: 'Мгновенно', desc: 'Получите POL за минуты' },
        { icon: Shield, title: 'Безопасно', desc: 'Проверенные провайдеры' },
        { icon: Globe, title: 'Глобально', desc: 'Доступно в 150+ странах' }
      ],
      widgetTitle: 'Купить POL Сейчас',
      widgetSubtitle: 'Картой или переводом',
      buyButton: 'КУПИТЬ POL',
      poweredBy: 'Powered by Onramper',
      minAmount: 'Мин. €20',
      providers: 'Visa, Mastercard, Apple Pay',
      swapBadge: 'ОБМЕН КРИПТО',
      swapTitle: 'Swap в',
      swapTitleHighlight: 'POL',
      swapSubtitle: 'Обменяйте крипто на POL мгновенно. Более 900 активов, конкурентные курсы, без регистрации.',
      swapFeatures: [
        { icon: RefreshCw, title: '900+ Крипто', desc: 'Bitcoin, Ethereum, USDT и др.' },
        { icon: Zap, title: 'Быстро', desc: 'Swap за минуты' },
        { icon: Shield, title: 'Без KYC', desc: 'Без регистрации' },
        { icon: Coins, title: 'Лучшие Курсы', desc: 'Топ курсы рынка' }
      ],
      swapWidgetTitle: 'Swap в POL',
      swapWidgetSubtitle: 'С любой крипто',
      swapButton: 'SWAP СЕЙЧАС',
      swapPoweredBy: 'Powered by FixedFloat'
    },
    zh: {
      badge: '购买加密货币',
      title: '购买',
      titleHighlight: 'POL',
      subtitle: '使用信用卡、借记卡或银行转账即时购买POL (Polygon)。安全、快速、便捷。',
      features: [
        { icon: CreditCard, title: '信用卡/借记卡', desc: '使用Visa、Mastercard等支付' },
        { icon: Zap, title: '即时', desc: '几分钟内收到POL' },
        { icon: Shield, title: '安全', desc: '经过验证的供应商' },
        { icon: Globe, title: '全球', desc: '覆盖150+国家' }
      ],
      widgetTitle: '立即购买POL',
      widgetSubtitle: '使用银行卡或转账',
      buyButton: '购买POL',
      poweredBy: 'Powered by Onramper',
      minAmount: '最低 €20',
      providers: 'Visa, Mastercard, Apple Pay',
      swapBadge: '兑换加密货币',
      swapTitle: 'Swap到',
      swapTitleHighlight: 'POL',
      swapSubtitle: '即时将您的加密货币兑换为POL。支持900+资产，竞争性汇率，无需注册。',
      swapFeatures: [
        { icon: RefreshCw, title: '900+加密货币', desc: 'Bitcoin, Ethereum, USDT等' },
        { icon: Zap, title: '快速', desc: '几分钟完成Swap' },
        { icon: Shield, title: '无KYC', desc: '无需注册' },
        { icon: Coins, title: '最佳汇率', desc: '市场顶级汇率' }
      ],
      swapWidgetTitle: 'Swap到POL',
      swapWidgetSubtitle: '从任何加密货币',
      swapButton: '立即SWAP',
      swapPoweredBy: 'Powered by FixedFloat'
    }
  };

  const t = content[language] || content.it;

  const handleBuyClick = () => {
    window.location.href = '/acquista-pol';
  };

  const handleSwapClick = () => {
    window.location.href = '/swap-crypto';
  };

  return (
    <section id="swap" className="py-20 md:py-32 relative overflow-hidden" data-testid="swap-section">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl" />
      </div>

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
            <ArrowRightLeft className="w-4 h-4 inline mr-2" />
            {t.badge}
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight uppercase mb-4 md:mb-6">
            {t.title} <span className="gradient-text">{t.titleHighlight}</span>
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto px-4">
            {t.subtitle}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Features */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4 md:space-y-6"
          >
            {t.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-2xl p-5 md:p-6 flex items-start gap-4 hover:border-cyan-500/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="font-subheading text-lg font-bold text-white mb-1">{feature.title}</h3>
                  <p className="text-slate-400 text-sm">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Buy Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <div className="glass rounded-3xl p-8 md:p-10 relative overflow-hidden">
              {/* Decorative gradient */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-cyan-500/20 via-purple-500/10 to-transparent rounded-full blur-3xl" />
              
              {/* POL Icon */}
              <div className="relative mb-8">
                <motion.div
                  animate={{ 
                    boxShadow: ['0 0 20px rgba(0,240,255,0.3)', '0 0 40px rgba(0,240,255,0.5)', '0 0 20px rgba(0,240,255,0.3)']
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-20 h-20 md:w-24 md:h-24 mx-auto rounded-2xl bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center"
                >
                  <span className="font-heading text-3xl md:text-4xl font-black text-white">P</span>
                </motion.div>
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, type: 'spring' }}
                  className="absolute -top-2 -right-2 md:right-1/4 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center"
                >
                  <Sparkles className="w-4 h-4 text-white" />
                </motion.div>
              </div>

              {/* Title */}
              <div className="text-center mb-8 relative">
                <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-2">
                  {t.widgetTitle}
                </h3>
                <p className="text-slate-400">{t.widgetSubtitle}</p>
              </div>

              {/* Info */}
              <div className="flex justify-center gap-6 mb-8">
                <div className="text-center">
                  <div className="text-cyan-400 font-mono text-sm">{t.minAmount}</div>
                </div>
                <div className="w-px bg-white/10" />
                <div className="text-center">
                  <div className="text-slate-400 text-sm">{t.providers}</div>
                </div>
              </div>

              {/* Buy Button */}
              <motion.button
                onClick={handleBuyClick}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 md:py-5 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-heading font-bold text-lg md:text-xl tracking-wider flex items-center justify-center gap-3 hover:shadow-[0_0_30px_rgba(0,240,255,0.4)] transition-all duration-300"
              >
                {t.buyButton}
                <ExternalLink className="w-5 h-5" />
              </motion.button>

              {/* Powered by */}
              <div className="flex items-center justify-center gap-2 mt-6">
                <Shield className="w-4 h-4 text-green-400" />
                <span className="text-slate-500 text-sm">{t.poweredBy}</span>
              </div>
            </div>

            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20 rounded-3xl blur-xl opacity-50 -z-10" />
          </motion.div>
        </div>

        {/* Divider */}
        <div className="my-20 md:my-32 flex items-center justify-center">
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
          <div className="mx-4 w-3 h-3 rounded-full bg-cyan-500/50" />
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
        </div>

        {/* SWAP SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full glass text-purple-400 text-xs sm:text-sm font-mono tracking-widest mb-6">
            <RefreshCw className="w-4 h-4 inline mr-2" />
            {t.swapBadge}
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight uppercase mb-4 md:mb-6">
            {t.swapTitle} <span className="gradient-text">{t.swapTitleHighlight}</span>
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto px-4">
            {t.swapSubtitle}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Swap Features */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4 md:space-y-6 order-2 lg:order-1"
          >
            {t.swapFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-2xl p-5 md:p-6 flex items-start gap-4 hover:border-purple-500/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="font-subheading text-lg font-bold text-white mb-1">{feature.title}</h3>
                  <p className="text-slate-400 text-sm">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Swap Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative order-1 lg:order-2"
          >
            <div className="glass rounded-3xl p-8 md:p-10 relative overflow-hidden">
              {/* Decorative gradient */}
              <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-purple-500/20 via-pink-500/10 to-transparent rounded-full blur-3xl" />
              
              {/* Swap Icons */}
              <div className="relative mb-8 flex items-center justify-center gap-4">
                <motion.div
                  animate={{ x: [-5, 5, -5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center"
                >
                  <span className="font-heading text-2xl md:text-3xl font-black text-white">₿</span>
                </motion.div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center"
                >
                  <RefreshCw className="w-5 h-5 text-white" />
                </motion.div>
                <motion.div
                  animate={{ 
                    boxShadow: ['0 0 20px rgba(168,85,247,0.3)', '0 0 40px rgba(168,85,247,0.5)', '0 0 20px rgba(168,85,247,0.3)']
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center"
                >
                  <span className="font-heading text-2xl md:text-3xl font-black text-white">P</span>
                </motion.div>
              </div>

              {/* Title */}
              <div className="text-center mb-8 relative">
                <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-2">
                  {t.swapWidgetTitle}
                </h3>
                <p className="text-slate-400">{t.swapWidgetSubtitle}</p>
              </div>

              {/* Popular pairs */}
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {['BTC', 'ETH', 'USDT', 'SOL', 'BNB'].map((coin) => (
                  <span key={coin} className="px-3 py-1 rounded-full bg-white/5 text-slate-400 text-xs border border-white/10">
                    {coin} → POL
                  </span>
                ))}
              </div>

              {/* Swap Button */}
              <motion.button
                onClick={handleSwapClick}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 md:py-5 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-heading font-bold text-lg md:text-xl tracking-wider flex items-center justify-center gap-3 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all duration-300"
              >
                {t.swapButton}
                <ExternalLink className="w-5 h-5" />
              </motion.button>

              {/* Powered by */}
              <div className="flex items-center justify-center gap-2 mt-6">
                <Shield className="w-4 h-4 text-green-400" />
                <span className="text-slate-500 text-sm">{t.swapPoweredBy}</span>
              </div>
            </div>

            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 rounded-3xl blur-xl opacity-50 -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Swap;
