import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

// Logo ufficiale GiankyCoin
const LOGO_URL = 'https://customer-assets.emergentagent.com/job_coin-overhaul/artifacts/b827bvvg_ea3d65f2-73a1-4e70-b600-dd0364348cf9.jpeg';

const Hero = ({ onWhitepaperClick }) => {
  const { language } = useLanguage();

  const content = {
    it: {
      // Mobile motto - accattivante e curioso
      mobileTagline: 'Il futuro è adesso.',
      mobileCta: 'Scopri di più',
      // Desktop content
      badge: 'ECOSISTEMA DIGITALE',
      title: 'Giankycoin è un ecosistema digitale basato su servizi reali.',
      subtitle: 'NFT e token sono strumenti di accesso a servizi concreti per imprese e professionisti.',
      ctaPrimary: 'Scopri i servizi',
      ctaSecondary: 'Leggi come funziona'
    },
    en: {
      mobileTagline: 'The future is now.',
      mobileCta: 'Discover more',
      badge: 'DIGITAL ECOSYSTEM',
      title: 'Giankycoin is a digital ecosystem based on real services.',
      subtitle: 'NFTs and tokens are tools for accessing concrete services for businesses and professionals.',
      ctaPrimary: 'Discover services',
      ctaSecondary: 'Read how it works'
    },
    es: {
      mobileTagline: 'El futuro es ahora.',
      mobileCta: 'Descubre más',
      badge: 'ECOSISTEMA DIGITAL',
      title: 'Giankycoin es un ecosistema digital basado en servicios reales.',
      subtitle: 'Los NFT y tokens son herramientas de acceso a servicios concretos para empresas y profesionales.',
      ctaPrimary: 'Descubre los servicios',
      ctaSecondary: 'Lee cómo funciona'
    },
    fr: {
      mobileTagline: 'Le futur c\'est maintenant.',
      mobileCta: 'En savoir plus',
      badge: 'ÉCOSYSTÈME NUMÉRIQUE',
      title: 'Giankycoin est un écosystème numérique basé sur des services réels.',
      subtitle: 'Les NFT et tokens sont des outils d\'accès à des services concrets pour les entreprises et professionnels.',
      ctaPrimary: 'Découvrir les services',
      ctaSecondary: 'Lire comment ça marche'
    },
    de: {
      mobileTagline: 'Die Zukunft ist jetzt.',
      mobileCta: 'Mehr erfahren',
      badge: 'DIGITALES ÖKOSYSTEM',
      title: 'Giankycoin ist ein digitales Ökosystem basierend auf echten Dienstleistungen.',
      subtitle: 'NFTs und Token sind Werkzeuge für den Zugang zu konkreten Dienstleistungen für Unternehmen und Fachleute.',
      ctaPrimary: 'Dienste entdecken',
      ctaSecondary: 'Lesen Sie wie es funktioniert'
    },
    ru: {
      mobileTagline: 'Будущее уже здесь.',
      mobileCta: 'Узнать больше',
      badge: 'ЦИФРОВАЯ ЭКОСИСТЕМА',
      title: 'Giankycoin — это цифровая экосистема, основанная на реальных услугах.',
      subtitle: 'NFT и токены — это инструменты доступа к конкретным услугам для бизнеса и профессионалов.',
      ctaPrimary: 'Узнать об услугах',
      ctaSecondary: 'Как это работает'
    },
    zh: {
      mobileTagline: '未来就是现在。',
      mobileCta: '了解更多',
      badge: '数字生态系统',
      title: 'Giankycoin 是一个基于真实服务的数字生态系统。',
      subtitle: 'NFT和代币是企业和专业人士获取具体服务的工具。',
      ctaPrimary: '发现服务',
      ctaSecondary: '了解如何运作'
    }
  };

  const t = content[language] || content.en;

  return (
    <section id="home" className="min-h-screen relative flex items-center pt-16 pb-8" data-testid="hero-section">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5" />
      <div className="bg-grid absolute inset-0" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-24 h-24 md:w-32 md:h-32 bg-cyan-500/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-32 h-32 md:w-40 md:h-40 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* ========== MOBILE VIEW - Solo Logo + Motto ========== */}
        <div className="lg:hidden flex flex-col items-center min-h-[80vh] justify-between py-4">
          {/* Logo - in alto */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="relative w-28 h-28 sm:w-32 sm:h-32"
          >
            {/* Glow Ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-xl animate-pulse" />
            
            {/* Single Animated Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-1 rounded-full border border-cyan-500/30"
            />
            
            {/* Main Logo */}
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-4 rounded-full overflow-hidden shadow-[0_0_30px_rgba(0,240,255,0.4)] border-2 border-cyan-500/50"
            >
              <img src={LOGO_URL} alt="Gianky Coin" className="w-full h-full object-cover" />
            </motion.div>
            
            {/* Orbiting dots */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(0,240,255,0.8)]" />
            </motion.div>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-2"
            >
              <div className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-purple-500 rounded-full shadow-[0_0_10px_rgba(112,0,255,0.8)]" />
            </motion.div>
          </motion.div>

          {/* Testo centrale - più in basso */}
          <div className="flex flex-col items-center mt-auto mb-8">
            {/* Motto Accattivante */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="font-heading text-2xl sm:text-3xl font-black text-center mb-3"
            >
              <span className="text-white">GIANKY </span>
              <span className="gradient-text">COIN</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-lg sm:text-xl text-cyan-400 font-light text-center mb-6"
            >
              {t.mobileTagline}
            </motion.p>
          </div>

          {/* Scroll indicator - in basso */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ delay: 1.2, duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-slate-500"
          >
            <span className="text-xs uppercase tracking-widest">{t.mobileCta}</span>
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </div>

        {/* ========== DESKTOP VIEW - Layout Completo ========== */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-cyan-400 text-[10px] sm:text-xs font-mono tracking-widest mb-6"
            >
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
              {t.badge}
            </motion.div>
            
            <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[1.2] mb-4 md:mb-6 text-white">
              {t.title}
            </h1>
            
            <p className="text-sm sm:text-base md:text-lg text-slate-400 leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
              {t.subtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <motion.a
                href="#plans"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 text-black font-bold py-3 px-6 rounded-full transition-all duration-300 shadow-[0_0_25px_rgba(0,240,255,0.4)] hover:shadow-[0_0_40px_rgba(0,240,255,0.6)] uppercase tracking-wider text-center flex items-center justify-center gap-2 text-xs sm:text-sm"
                data-testid="hero-cta-primary"
              >
                {t.ctaPrimary} <ArrowRight className="w-4 h-4" />
              </motion.a>
              <motion.button
                onClick={onWhitepaperClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent border border-white/20 hover:border-cyan-500 text-white hover:text-cyan-400 font-bold py-3 px-6 rounded-full transition-all duration-300 uppercase tracking-wider text-center text-xs sm:text-sm flex items-center justify-center gap-2"
                data-testid="hero-cta-secondary"
              >
                <BookOpen className="w-4 h-4" />
                {t.ctaSecondary}
              </motion.button>
            </div>
          </motion.div>
          
          {/* Right - Logo/Coin Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="relative flex items-center justify-center order-first lg:order-last"
          >
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80">
              {/* Glow Ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/30 to-purple-500/30 blur-3xl animate-pulse" />
              
              {/* Animated Rings */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-4 rounded-full border border-cyan-500/30"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-8 rounded-full border border-purple-500/20"
              />
              
              {/* Main Logo */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-10 sm:inset-12 md:inset-14 rounded-full overflow-hidden shadow-[0_0_50px_rgba(0,240,255,0.5)] border-4 border-cyan-500/50"
              >
                <img src={LOGO_URL} alt="Gianky Coin" className="w-full h-full object-cover" />
              </motion.div>
              
              {/* Orbiting Elements */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_15px_rgba(0,240,255,0.8)]" />
              </motion.div>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-4"
              >
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-purple-500 rounded-full shadow-[0_0_15px_rgba(112,0,255,0.8)]" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
