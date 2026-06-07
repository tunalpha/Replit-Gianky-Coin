import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, ShoppingCart, Coins, Gift, Users, Percent, Sparkles } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

// Hook per rilevare mobile
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  return isMobile;
};

// Explosion particles component
const ExplosionParticles = ({ isExploding }) => {
  const particles = Array.from({ length: 12 });
  
  return (
    <AnimatePresence>
      {isExploding && (
        <>
          {particles.map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
              animate={{
                scale: [0, 1, 0],
                x: Math.cos((i * 30 * Math.PI) / 180) * 100,
                y: Math.sin((i * 30 * Math.PI) / 180) * 100,
                opacity: [1, 1, 0],
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="absolute w-3 h-3 rounded-full"
              style={{
                background: i % 2 === 0 ? '#00F0FF' : '#7000FF',
                boxShadow: i % 2 === 0 ? '0 0 10px #00F0FF' : '0 0 10px #7000FF',
              }}
            />
          ))}
          {/* Ring explosion */}
          <motion.div
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 3, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute w-20 h-20 rounded-full border-4 border-cyan-400"
          />
        </>
      )}
    </AnimatePresence>
  );
};

// Exploding Button Component
const ExplodingButton = ({ children, href, className }) => {
  const [isExploding, setIsExploding] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setIsExploding(true);
    setTimeout(() => {
      setIsExploding(false);
      window.location.href = href;
    }, 400);
  };

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative overflow-visible ${className}`}
    >
      <ExplosionParticles isExploding={isExploding} />
      <motion.span
        animate={isExploding ? { scale: [1, 1.2, 1] } : {}}
        className="relative z-10 flex items-center justify-center gap-2"
      >
        {children}
      </motion.span>
    </motion.button>
  );
};

const HowItWorks = () => {
  const { language } = useLanguage();
  const isMobile = useIsMobile();

  const content = {
    it: {
      badge: 'COME FUNZIONA',
      title: 'INIZIA A',
      titleHighlight: 'GUADAGNARE',
      buyNow: 'ACQUISTA ORA',
      steps: [
        { icon: Wallet, title: 'Connetti il Tuo Wallet', desc: 'Collega MetaMask, Trust Wallet o qualsiasi wallet compatibile con Polygon.', color: 'from-cyan-500 to-blue-500', glow: 'rgba(0, 240, 255, 0.3)' },
        { icon: ShoppingCart, title: 'Scegli il Tuo Piano NFT', desc: 'Seleziona il pacchetto che preferisci: da Starter (20 POL) fino a Diamond (5000 POL).', color: 'from-purple-500 to-pink-500', glow: 'rgba(112, 0, 255, 0.3)' },
        { icon: Coins, title: 'Ricevi 10% Cashback Istantaneo', desc: 'Appena completi l\'acquisto, ricevi il 10% del valore in token GKY!', color: 'from-amber-500 to-orange-500', glow: 'rgba(255, 184, 0, 0.3)' },
        { icon: Gift, title: 'Guadagna 15% Ogni Mese', desc: 'Ogni mese ricevi automaticamente il 15% di rendimento in token GKY.', color: 'from-green-500 to-emerald-500', glow: 'rgba(0, 255, 136, 0.3)' },
      ],
      referral: { title: 'SISTEMA REFERRAL', subtitle: 'Guadagna invitando amici', levels: [{ level: 1, percent: '12.5%', desc: 'Referral Diretti' }, { level: 2, percent: '8%', desc: 'Secondo Livello' }, { level: 3, percent: '4%', desc: 'Terzo Livello' }, { level: 4, percent: '2%', desc: 'Quarto Livello' }], bonus: '🎁 BONUS: 20 referral = 100% cashback di 1 NFT!' }
    },
    en: {
      badge: 'HOW IT WORKS',
      title: 'START',
      titleHighlight: 'EARNING',
      buyNow: 'BUY NOW',
      steps: [
        { icon: Wallet, title: 'Connect Your Wallet', desc: 'Link MetaMask, Trust Wallet or any Polygon-compatible wallet.', color: 'from-cyan-500 to-blue-500', glow: 'rgba(0, 240, 255, 0.3)' },
        { icon: ShoppingCart, title: 'Choose Your NFT Plan', desc: 'Select your package: from Starter (20 POL) to Diamond (5000 POL).', color: 'from-purple-500 to-pink-500', glow: 'rgba(112, 0, 255, 0.3)' },
        { icon: Coins, title: 'Get 10% Instant Cashback', desc: 'Complete your purchase and receive 10% of the value in GKY tokens!', color: 'from-amber-500 to-orange-500', glow: 'rgba(255, 184, 0, 0.3)' },
        { icon: Gift, title: 'Earn 15% Every Month', desc: 'Every month you automatically receive 15% returns in GKY tokens.', color: 'from-green-500 to-emerald-500', glow: 'rgba(0, 255, 136, 0.3)' },
      ],
      referral: { title: 'REFERRAL SYSTEM', subtitle: 'Earn by inviting friends', levels: [{ level: 1, percent: '12.5%', desc: 'Direct Referrals' }, { level: 2, percent: '8%', desc: 'Second Level' }, { level: 3, percent: '4%', desc: 'Third Level' }, { level: 4, percent: '2%', desc: 'Fourth Level' }], bonus: '🎁 BONUS: 20 referrals = 100% cashback of 1 NFT!' }
    },
    es: {
      badge: 'CÓMO FUNCIONA',
      title: 'EMPIEZA A',
      titleHighlight: 'GANAR',
      buyNow: 'COMPRAR AHORA',
      steps: [
        { icon: Wallet, title: 'Conecta Tu Wallet', desc: 'Vincula MetaMask, Trust Wallet o cualquier wallet compatible con Polygon.', color: 'from-cyan-500 to-blue-500', glow: 'rgba(0, 240, 255, 0.3)' },
        { icon: ShoppingCart, title: 'Elige Tu Plan NFT', desc: 'Selecciona tu paquete: desde Starter (20 POL) hasta Diamond (5000 POL).', color: 'from-purple-500 to-pink-500', glow: 'rgba(112, 0, 255, 0.3)' },
        { icon: Coins, title: 'Recibe 10% Cashback Instantáneo', desc: 'Al completar tu compra, recibes el 10% del valor en tokens GKY!', color: 'from-amber-500 to-orange-500', glow: 'rgba(255, 184, 0, 0.3)' },
        { icon: Gift, title: 'Gana 15% Cada Mes', desc: 'Cada mes recibes automáticamente el 15% de rendimiento en tokens GKY.', color: 'from-green-500 to-emerald-500', glow: 'rgba(0, 255, 136, 0.3)' },
      ],
      referral: { title: 'SISTEMA REFERIDOS', subtitle: 'Gana invitando amigos', levels: [{ level: 1, percent: '12.5%', desc: 'Referidos Directos' }, { level: 2, percent: '8%', desc: 'Segundo Nivel' }, { level: 3, percent: '4%', desc: 'Tercer Nivel' }, { level: 4, percent: '2%', desc: 'Cuarto Nivel' }], bonus: '🎁 BONUS: 20 referidos = 100% cashback de 1 NFT!' }
    },
    fr: {
      badge: 'COMMENT ÇA MARCHE',
      title: 'COMMENCEZ À',
      titleHighlight: 'GAGNER',
      buyNow: 'ACHETER',
      steps: [
        { icon: Wallet, title: 'Connectez Votre Wallet', desc: 'Liez MetaMask, Trust Wallet ou tout wallet compatible Polygon.', color: 'from-cyan-500 to-blue-500', glow: 'rgba(0, 240, 255, 0.3)' },
        { icon: ShoppingCart, title: 'Choisissez Votre Plan NFT', desc: 'Sélectionnez votre forfait: de Starter (20 POL) à Diamond (5000 POL).', color: 'from-purple-500 to-pink-500', glow: 'rgba(112, 0, 255, 0.3)' },
        { icon: Coins, title: 'Recevez 10% Cashback Instantané', desc: 'À l\'achat, recevez 10% de la valeur en tokens GKY!', color: 'from-amber-500 to-orange-500', glow: 'rgba(255, 184, 0, 0.3)' },
        { icon: Gift, title: 'Gagnez 15% Chaque Mois', desc: 'Chaque mois vous recevez automatiquement 15% de rendement en tokens GKY.', color: 'from-green-500 to-emerald-500', glow: 'rgba(0, 255, 136, 0.3)' },
      ],
      referral: { title: 'SYSTÈME PARRAINAGE', subtitle: 'Gagnez en invitant des amis', levels: [{ level: 1, percent: '12.5%', desc: 'Parrainages Directs' }, { level: 2, percent: '8%', desc: 'Deuxième Niveau' }, { level: 3, percent: '4%', desc: 'Troisième Niveau' }, { level: 4, percent: '2%', desc: 'Quatrième Niveau' }], bonus: '🎁 BONUS: 20 parrainages = 100% cashback de 1 NFT!' }
    },
    de: {
      badge: 'SO FUNKTIONIERT ES',
      title: 'STARTEN SIE ZU',
      titleHighlight: 'VERDIENEN',
      buyNow: 'JETZT KAUFEN',
      steps: [
        { icon: Wallet, title: 'Verbinden Sie Ihr Wallet', desc: 'Verbinden Sie MetaMask, Trust Wallet oder ein Polygon-kompatibles Wallet.', color: 'from-cyan-500 to-blue-500', glow: 'rgba(0, 240, 255, 0.3)' },
        { icon: ShoppingCart, title: 'Wählen Sie Ihren NFT-Plan', desc: 'Wählen Sie Ihr Paket: von Starter (20 POL) bis Diamond (5000 POL).', color: 'from-purple-500 to-pink-500', glow: 'rgba(112, 0, 255, 0.3)' },
        { icon: Coins, title: '10% Sofort-Cashback erhalten', desc: 'Nach dem Kauf erhalten Sie 10% des Wertes in GKY Tokens!', color: 'from-amber-500 to-orange-500', glow: 'rgba(255, 184, 0, 0.3)' },
        { icon: Gift, title: '15% jeden Monat verdienen', desc: 'Jeden Monat erhalten Sie automatisch 15% Rendite in GKY Tokens.', color: 'from-green-500 to-emerald-500', glow: 'rgba(0, 255, 136, 0.3)' },
      ],
      referral: { title: 'EMPFEHLUNGSSYSTEM', subtitle: 'Verdienen Sie durch Einladungen', levels: [{ level: 1, percent: '12.5%', desc: 'Direkte Empfehlungen' }, { level: 2, percent: '8%', desc: 'Zweite Ebene' }, { level: 3, percent: '4%', desc: 'Dritte Ebene' }, { level: 4, percent: '2%', desc: 'Vierte Ebene' }], bonus: '🎁 BONUS: 20 Empfehlungen = 100% Cashback von 1 NFT!' }
    },
    ru: {
      badge: 'КАК ЭТО РАБОТАЕТ',
      title: 'НАЧНИТЕ',
      titleHighlight: 'ЗАРАБАТЫВАТЬ',
      buyNow: 'КУПИТЬ',
      steps: [
        { icon: Wallet, title: 'Подключите Кошелек', desc: 'Подключите MetaMask, Trust Wallet или любой Polygon-совместимый кошелек.', color: 'from-cyan-500 to-blue-500', glow: 'rgba(0, 240, 255, 0.3)' },
        { icon: ShoppingCart, title: 'Выберите NFT План', desc: 'Выберите пакет: от Starter (20 POL) до Diamond (5000 POL).', color: 'from-purple-500 to-pink-500', glow: 'rgba(112, 0, 255, 0.3)' },
        { icon: Coins, title: 'Получите 10% Кэшбэк', desc: 'После покупки получите 10% стоимости в токенах GKY!', color: 'from-amber-500 to-orange-500', glow: 'rgba(255, 184, 0, 0.3)' },
        { icon: Gift, title: 'Зарабатывайте 15% Ежемесячно', desc: 'Каждый месяц автоматически получайте 15% дохода в токенах GKY.', color: 'from-green-500 to-emerald-500', glow: 'rgba(0, 255, 136, 0.3)' },
      ],
      referral: { title: 'РЕФЕРАЛЬНАЯ СИСТЕМА', subtitle: 'Зарабатывайте приглашая друзей', levels: [{ level: 1, percent: '12.5%', desc: 'Прямые Рефералы' }, { level: 2, percent: '8%', desc: 'Второй Уровень' }, { level: 3, percent: '4%', desc: 'Третий Уровень' }, { level: 4, percent: '2%', desc: 'Четвертый Уровень' }], bonus: '🎁 БОНУС: 20 рефералов = 100% кэшбэк 1 NFT!' }
    },
    zh: {
      badge: '如何运作',
      title: '开始',
      titleHighlight: '赚钱',
      buyNow: '立即购买',
      steps: [
        { icon: Wallet, title: '连接您的钱包', desc: '连接 MetaMask、Trust Wallet 或任何 Polygon 兼容钱包。', color: 'from-cyan-500 to-blue-500', glow: 'rgba(0, 240, 255, 0.3)' },
        { icon: ShoppingCart, title: '选择您的 NFT 计划', desc: '选择您的套餐：从 Starter (20 POL) 到 Diamond (5000 POL)。', color: 'from-purple-500 to-pink-500', glow: 'rgba(112, 0, 255, 0.3)' },
        { icon: Coins, title: '获得 10% 即时返现', desc: '完成购买后，立即获得 10% 的 GKY 代币价值！', color: 'from-amber-500 to-orange-500', glow: 'rgba(255, 184, 0, 0.3)' },
        { icon: Gift, title: '每月赚取 15%', desc: '每月自动获得 15% 的 GKY 代币回报。', color: 'from-green-500 to-emerald-500', glow: 'rgba(0, 255, 136, 0.3)' },
      ],
      referral: { title: '推荐系统', subtitle: '邀请朋友赚钱', levels: [{ level: 1, percent: '12.5%', desc: '直接推荐' }, { level: 2, percent: '8%', desc: '第二级' }, { level: 3, percent: '4%', desc: '第三级' }, { level: 4, percent: '2%', desc: '第四级' }], bonus: '🎁 奖励：20 个推荐 = 1 个 NFT 100% 返现！' }
    }
  };

  const t = content[language] || content.en;

  return (
    <section id="how-it-works" className="py-12 md:py-24 relative overflow-hidden" data-testid="how-it-works-section">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent" />
      
      <div className="max-w-4xl mx-auto px-3 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-8 md:mb-16"
        >
          <span className="inline-block px-3 py-1.5 rounded-full glass text-cyan-400 text-xs font-mono tracking-widest mb-3">
            {t.badge}
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight uppercase mb-3">
            {t.title} <span className="gradient-text">{t.titleHighlight}</span>
          </h2>
        </motion.div>

        {/* Steps - Compact on Mobile */}
        <div className="space-y-4 md:space-y-8 mb-12 md:mb-16">
          {t.steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: isMobile ? 15 : 0, x: isMobile ? 0 : (index % 2 === 0 ? -50 : 50) }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: isMobile ? 0.3 : 0.6, delay: isMobile ? 0 : index * 0.1 }}
            >
              <div
                className="relative glass rounded-2xl md:rounded-3xl p-4 md:p-8 overflow-hidden group"
                style={{ boxShadow: isMobile ? `0 0 15px ${step.glow}` : `0 0 40px ${step.glow}` }}
              >
                {/* Background Glow - solo su desktop */}
                {!isMobile && (
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `radial-gradient(circle at center, ${step.glow}, transparent 70%)` }}
                  />
                )}
                
                {/* Step Number */}
                <div
                  className={`absolute -top-2 -left-2 md:-top-4 md:-left-4 w-10 h-10 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center font-heading text-xl md:text-3xl font-black text-white shadow-lg z-20`}
                >
                  {index + 1}
                </div>

                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 relative z-10 pt-6 md:pt-0 md:pl-16">
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 md:w-24 md:h-24 rounded-xl md:rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center flex-shrink-0 shadow-xl`}
                  >
                    <step.icon className="w-7 h-7 md:w-12 md:h-12 text-white" />
                  </div>

                  {/* Content */}
                  <div className="text-center md:text-left flex-1">
                    <h3 className="font-heading text-base md:text-2xl font-bold uppercase text-white mb-1 md:mb-2">
                      {step.title}
                    </h3>
                    <p className="text-slate-400 text-xs md:text-base leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  {/* CTA Button - più piccolo su mobile */}
                  <ExplodingButton
                    href="/piattaforma-minting"
                    className={`bg-gradient-to-r ${step.color} text-white font-bold py-2 px-4 md:py-3 md:px-6 rounded-full uppercase text-[10px] md:text-xs tracking-wider shadow-lg flex-shrink-0`}
                  >
                    <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
                    {t.buyNow}
                  </ExplodingButton>
                </div>

                {/* Animated Border - solo su desktop */}
                {!isMobile && (
                  <motion.div
                    className="absolute inset-0 rounded-3xl pointer-events-none"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${step.glow}, transparent)`,
                      backgroundSize: '200% 100%',
                    }}
                    animate={{
                      backgroundPosition: ['0% 0%', '200% 0%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Referral System - Compact on Mobile */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="glass rounded-2xl md:rounded-3xl p-4 md:p-8 overflow-hidden relative"
        >
          {/* Header */}
          <div className="text-center mb-6 md:mb-8">
            <div className="inline-flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
              <Users className="w-6 h-6 md:w-8 md:h-8 text-cyan-400" />
              <h3 className="font-heading text-lg md:text-3xl font-bold uppercase text-white">
                {t.referral.title}
              </h3>
            </div>
            <p className="text-slate-400 text-sm">{t.referral.subtitle}</p>
          </div>

          {/* Levels */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mb-6 md:mb-8">
            {t.referral.levels.map((level, index) => (
              <motion.div
                key={level.level}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: isMobile ? 0 : index * 0.1, duration: 0.3 }}
                className="bg-gradient-to-br from-white/5 to-white/0 rounded-xl md:rounded-2xl p-3 md:p-4 text-center border border-white/10"
              >
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center font-heading font-bold text-sm md:text-lg mx-auto mb-1 md:mb-2">
                  {level.level}
                </div>
                <div className="text-cyan-400 font-heading text-lg md:text-2xl font-bold mb-0.5 md:mb-1">{level.percent}</div>
                <div className="text-slate-500 text-[10px] md:text-xs uppercase tracking-wider">{level.desc}</div>
              </motion.div>
            ))}
          </div>

          {/* Bonus Card */}
          <div className="flex justify-center">
            <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-xl md:rounded-2xl p-3 md:p-4 border border-amber-500/30 max-w-md">
              <p className="text-amber-300 font-medium text-center text-xs md:text-base">{t.referral.bonus}</p>
            </div>
          </div>

          {/* Final CTA */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-6 md:mt-8"
          >
            <ExplodingButton
              href="/piattaforma-minting"
              className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold py-3 px-8 md:py-4 md:px-10 rounded-full uppercase tracking-wider text-xs md:text-sm shadow-[0_0_20px_rgba(0,240,255,0.3)] md:shadow-[0_0_30px_rgba(0,240,255,0.4)]"
            >
              <Sparkles className="w-4 h-4 md:w-5 md:h-5" />
              {t.buyNow}
              <Sparkles className="w-4 h-4 md:w-5 md:h-5" />
            </ExplodingButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
