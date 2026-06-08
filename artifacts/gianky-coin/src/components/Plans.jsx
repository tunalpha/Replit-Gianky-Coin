import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, Zap, Star, Crown, Diamond, Gem, Sparkles, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { usePolPrice } from '@/components/PolPriceContext';

// Video NFT per ogni piano
const nftVideos = {
  starter: 'https://customer-assets.emergentagent.com/job_gky-crypto/artifacts/tbvfngzj_121238905977770762.mp4',
  basic: 'https://customer-assets.emergentagent.com/job_gky-crypto/artifacts/tbvfngzj_121238905977770762.mp4',
  standard: 'https://customer-assets.emergentagent.com/job_gky-crypto/artifacts/ht0ulmxg_618031375706676201.mp4',
  vip: 'https://customer-assets.emergentagent.com/job_gky-crypto/artifacts/wiu2wvv8_-4358462022762962354.mp4',
  premium: 'https://customer-assets.emergentagent.com/job_gky-crypto/artifacts/if58ddk6_7659601308957236212.mp4',
  diamond: 'https://customer-assets.emergentagent.com/job_gky-crypto/artifacts/5z9wo0a3_-5652636414198735992.mp4',
};

const plans = [
  { name: 'Starter', key: 'starter', price: '20', icon: Rocket, color: 'from-cyan-500 to-blue-500', glow: 'rgba(0, 240, 255, 0.3)' },
  { name: 'Basic', key: 'basic', price: '50', icon: Zap, color: 'from-blue-500 to-indigo-500', glow: 'rgba(59, 130, 246, 0.3)' },
  { name: 'Standard', key: 'standard', price: '100', icon: Star, color: 'from-purple-500 to-pink-500', glow: 'rgba(168, 85, 247, 0.3)', popular: true },
  { name: 'VIP', key: 'vip', price: '500', icon: Crown, color: 'from-amber-500 to-orange-500', glow: 'rgba(245, 158, 11, 0.3)' },
  { name: 'Premium', key: 'premium', price: '1000', icon: Diamond, color: 'from-pink-500 to-rose-500', glow: 'rgba(236, 72, 153, 0.3)' },
  { name: 'Diamond', key: 'diamond', price: '5000', icon: Gem, color: 'from-cyan-400 to-purple-600', glow: 'rgba(139, 92, 246, 0.4)' },
];

const Plans = () => {
  const { language } = useLanguage();
  const { eurPrice, usdPrice, loading } = usePolPrice();

  const content = {
    it: {
      badge: 'PIANI NFT',
      title: 'SCEGLI IL TUO',
      titleHighlight: 'LIVELLO',
      subtitle: 'Ogni NFT offre accesso a servizi digitali di diverso livello',
      serviceLevel: 'LIVELLO SERVIZIO',
      investment: 'VALORE NFT',
      pol: 'POL',
      buyNow: 'ACQUISTA ORA',
      popular: 'PIÙ SCELTO',
      features: ['Accesso servizi digitali', 'Dashboard Personale', 'Supporto dedicato', 'Pagamento in GKY'],
      vipHolders: 'Visualizza VIP Holders'
    },
    en: {
      badge: 'NFT PLANS',
      title: 'CHOOSE YOUR',
      titleHighlight: 'LEVEL',
      subtitle: 'Each NFT provides access to digital services at different levels',
      serviceLevel: 'SERVICE LEVEL',
      investment: 'NFT VALUE',
      pol: 'POL',
      buyNow: 'BUY NOW',
      popular: 'MOST CHOSEN',
      features: ['Digital service access', 'Personal Dashboard', 'Dedicated support', 'Pay with GKY'],
      vipHolders: 'View VIP Holders'
    },
    es: {
      badge: 'PLANES NFT',
      title: 'ELIGE TU',
      titleHighlight: 'NIVEL',
      subtitle: 'Cada NFT proporciona acceso a servicios digitales de diferentes niveles',
      serviceLevel: 'NIVEL SERVICIO',
      investment: 'VALOR NFT',
      pol: 'POL',
      buyNow: 'COMPRAR AHORA',
      popular: 'MÁS ELEGIDO',
      features: ['Acceso servicios digitales', 'Panel Personal', 'Soporte dedicado', 'Pago en GKY'],
      vipHolders: 'Ver Holders VIP'
    },
    fr: {
      badge: 'PLANS NFT',
      title: 'CHOISISSEZ VOTRE',
      titleHighlight: 'NIVEAU',
      subtitle: 'Chaque NFT offre un accès aux services numériques à différents niveaux',
      serviceLevel: 'NIVEAU SERVICE',
      investment: 'VALEUR NFT',
      pol: 'POL',
      buyNow: 'ACHETER',
      popular: 'PLUS CHOISI',
      features: ['Accès services numériques', 'Tableau de Bord', 'Support dédié', 'Paiement en GKY'],
      vipHolders: 'Voir les Holders VIP'
    },
    de: {
      badge: 'NFT PLÄNE',
      title: 'WÄHLEN SIE IHR',
      titleHighlight: 'LEVEL',
      subtitle: 'Jedes NFT bietet Zugang zu digitalen Diensten auf verschiedenen Ebenen',
      serviceLevel: 'SERVICE-LEVEL',
      investment: 'NFT-WERT',
      pol: 'POL',
      buyNow: 'JETZT KAUFEN',
      popular: 'MEISTGEWÄHLT',
      features: ['Digitaler Dienstzugang', 'Persönliches Dashboard', 'Dedizierter Support', 'Zahlung in GKY'],
      vipHolders: 'VIP Holders anzeigen'
    },
    ru: {
      badge: 'NFT ПЛАНЫ',
      title: 'ВЫБЕРИТЕ СВОЙ',
      titleHighlight: 'УРОВЕНЬ',
      subtitle: 'Каждый NFT предоставляет доступ к цифровым услугам разного уровня',
      serviceLevel: 'УРОВЕНЬ СЕРВИСА',
      investment: 'СТОИМОСТЬ NFT',
      pol: 'POL',
      buyNow: 'КУПИТЬ',
      popular: 'ПОПУЛЯРНЫЙ',
      features: ['Доступ к цифровым услугам', 'Личный кабинет', 'Выделенная поддержка', 'Оплата в GKY'],
      vipHolders: 'Смотреть VIP Holders'
    },
    zh: {
      badge: 'NFT 计划',
      title: '选择您的',
      titleHighlight: '级别',
      subtitle: '每个NFT提供不同级别的数字服务访问权限',
      serviceLevel: '服务级别',
      investment: 'NFT价值',
      pol: 'POL',
      buyNow: '立即购买',
      popular: '最受欢迎',
      features: ['数字服务访问', '个人仪表板', '专属支持', 'GKY支付'],
      vipHolders: '查看VIP持有者'
    }
  };

  const t = content[language] || content.en;

  return (
    <section id="plans" className="py-16 md:py-24 relative overflow-hidden" data-testid="plans-section">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/5 via-transparent to-cyan-900/5" />
      
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 rounded-full glass text-cyan-400 text-xs font-mono tracking-widest mb-4">
            {t.badge}
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight uppercase mb-3">
            {t.title} <span className="gradient-text">{t.titleHighlight}</span>
          </h2>
          <p className="text-slate-400 text-sm md:text-base">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Plans - Simple Single Column */}
        <div className="space-y-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative glass rounded-3xl overflow-hidden ${plan.popular ? 'ring-2 ring-cyan-500' : ''}`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute top-4 left-4 z-20 px-4 py-1.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full text-xs font-bold uppercase tracking-wider">
                  ⭐ {t.popular}
                </div>
              )}

              {/* Video/Icon Area - leggermente più alto per mostrare nome NFT */}
              <div className={`w-full aspect-[16/11] bg-gradient-to-br ${plan.color} relative`}>
                {nftVideos[plan.key] ? (
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    webkit-playsinline="true"
                    className="w-full h-full object-cover"
                  >
                    <source 
                      src={nftVideos[plan.key]} 
                      type="video/mp4" 
                    />
                    {/* Fallback for .mov files */}
                    <source 
                      src={nftVideos[plan.key]} 
                      type="video/quicktime" 
                    />
                  </video>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <plan.icon className="w-24 h-24 md:w-32 md:h-32 text-white/80" />
                  </div>
                )}
              </div>

              {/* Content - bilanciato per mobile */}
              <div className="p-5">
                {/* Plan Name */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center`}>
                    <plan.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-black uppercase text-white">
                      {plan.name}
                    </h3>
                    <span className="text-slate-500 text-[11px] uppercase">{t.serviceLevel || 'SERVICE LEVEL'}</span>
                  </div>
                </div>

                {/* Investment Amount */}
                <div className="mb-4 p-3.5 bg-white/5 rounded-xl border border-white/10">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-xs uppercase">{t.investment}</span>
                    <div className="text-right">
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-heading text-3xl font-black text-white">{plan.price}</span>
                        <span className="text-cyan-400 font-bold text-sm">{t.pol}</span>
                      </div>
                      {/* Real-time EUR/USD conversion */}
                      {!loading && eurPrice && usdPrice && (
                        <div className="text-[11px] text-green-400 mt-0.5">
                          <span className="text-slate-500">live:</span> €{(Number(plan.price) * eurPrice).toFixed(2)} / ${(Number(plan.price) * usdPrice).toFixed(2)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {t.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-slate-400 text-xs">
                      <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${plan.color}`} />
                      {feature}
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <a
                  href="/piattaforma-minting"
                  className={`w-full py-3.5 rounded-full bg-gradient-to-r ${plan.color} text-white font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 hover:shadow-lg transition-shadow`}
                  data-testid={`mint-btn-${plan.key}`}
                >
                  <Sparkles className="w-4 h-4" />
                  {t.buyNow}
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Plans;
