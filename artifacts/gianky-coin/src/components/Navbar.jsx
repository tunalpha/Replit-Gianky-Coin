import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

// Logo ufficiale GiankyCoin
const LOGO_URL = 'https://customer-assets.emergentagent.com/job_coin-overhaul/artifacts/b827bvvg_ea3d65f2-73a1-4e70-b600-dd0364348cf9.jpeg';

const Navbar = ({ onWhitepaperClick }) => {
  const { language } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const labels = {
    it: { home: 'Home', plans: 'Piani', markets: 'Mercati', staking: 'Staking', swap: 'Swap', roadmap: 'Roadmap', team: 'Team', faq: 'FAQ', whitepaper: 'Whitepaper', wallet: 'Wallet', cta: 'Unisciti' },
    en: { home: 'Home', plans: 'Plans', markets: 'Markets', staking: 'Staking', swap: 'Swap', roadmap: 'Roadmap', team: 'Team', faq: 'FAQ', whitepaper: 'Whitepaper', wallet: 'Wallet', cta: 'Join Us' },
    es: { home: 'Inicio', plans: 'Planes', markets: 'Mercados', staking: 'Staking', swap: 'Swap', roadmap: 'Roadmap', team: 'Equipo', faq: 'FAQ', whitepaper: 'Whitepaper', wallet: 'Wallet', cta: 'Únete' },
    fr: { home: 'Accueil', plans: 'Plans', markets: 'Marchés', staking: 'Staking', swap: 'Swap', roadmap: 'Roadmap', team: 'Équipe', faq: 'FAQ', whitepaper: 'Whitepaper', wallet: 'Portefeuille', cta: 'Rejoindre' },
    de: { home: 'Start', plans: 'Pläne', markets: 'Märkte', staking: 'Staking', swap: 'Swap', roadmap: 'Roadmap', team: 'Team', faq: 'FAQ', whitepaper: 'Whitepaper', wallet: 'Wallet', cta: 'Beitreten' },
    ru: { home: 'Главная', plans: 'Планы', markets: 'Рынки', staking: 'Стейкинг', swap: 'Обмен', roadmap: 'Дорожная карта', team: 'Команда', faq: 'FAQ', whitepaper: 'Whitepaper', wallet: 'Кошелек', cta: 'Вступить' },
    zh: { home: '首页', plans: '计划', markets: '市场', staking: '质押', swap: '兑换', roadmap: '路线图', team: '团队', faq: '常见问题', whitepaper: '白皮书', wallet: '钱包', cta: '加入' }
  };
  const t = labels[language] || labels.en;

  const navItems = [
    { label: t.home, href: '#home' },
    { label: t.plans, href: '#plans' },
    { label: t.markets, href: '#markets' },
    { label: t.swap, href: '#swap' },
    { label: t.staking, href: '#staking' },
    { label: t.wallet, href: '/nft-wallet' },
    { label: t.roadmap, href: '#roadmap' },
    { label: t.team, href: '#team' },
    { label: t.faq, href: '#faq' },
    { label: t.whitepaper, onClick: onWhitepaperClick },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <motion.nav
        data-testid="navbar"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass py-2' : 'py-3'}`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#home" className="flex items-center gap-2 group flex-shrink-0" data-testid="nav-logo">
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-cyan-500/50 group-hover:border-cyan-400 transition-colors shadow-[0_0_10px_rgba(0,240,255,0.3)]">
                <img src={LOGO_URL} alt="Gianky Coin" className="w-full h-full object-cover" />
              </div>
              <span className="font-heading font-bold text-base sm:text-lg tracking-wider hidden sm:block">GIANKY</span>
            </a>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-3 xl:gap-5">
              {navItems.map((item, idx) => (
                item.onClick ? (
                  <button
                    key={idx}
                    onClick={item.onClick}
                    className="nav-link text-[11px] font-medium uppercase tracking-widest"
                  >
                    {item.label}
                  </button>
                ) : item.external ? (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nav-link text-[11px] font-medium uppercase tracking-widest"
                  >
                    {item.label}
                  </a>
                ) : (
                  <a
                    key={item.href}
                    href={item.href}
                    className="nav-link text-[11px] font-medium uppercase tracking-widest"
                  >
                    {item.label}
                  </a>
                )
              ))}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              
              {/* CTA Button */}
              <a
                href="/piattaforma-minting"
                className="hidden sm:block bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-2 px-4 rounded-full transition-all uppercase text-xs tracking-wider"
              >
                {t.cta}
              </a>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden text-white p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                data-testid="mobile-menu-btn"
                aria-label="Menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[280px] bg-[#0a0a0a] border-l border-white/10 z-50 lg:hidden"
              data-testid="mobile-menu"
            >
              {/* Close Button */}
              <div className="flex justify-end p-4">
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {/* Menu Items */}
              <div className="px-6 py-4 flex flex-col gap-1">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href || index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {item.onClick ? (
                      <button
                        onClick={() => {
                          item.onClick();
                          setIsMobileMenuOpen(false);
                        }}
                        className="block w-full text-left py-3 px-4 text-slate-300 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-xl text-sm font-medium uppercase tracking-widest transition-all"
                      >
                        {item.label}
                      </button>
                    ) : item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block py-3 px-4 text-slate-300 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-xl text-sm font-medium uppercase tracking-widest transition-all"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <a
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block py-3 px-4 text-slate-300 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-xl text-sm font-medium uppercase tracking-widest transition-all"
                      >
                        {item.label}
                      </a>
                    )}
                  </motion.div>
                ))}
                
                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-6"
                >
                  <a
                    href="/piattaforma-minting"
                    className="block bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold py-3.5 px-6 rounded-full text-center uppercase text-sm tracking-wider shadow-[0_0_20px_rgba(0,240,255,0.3)]"
                  >
                    {t.cta}
                  </a>
                </motion.div>
                
                {/* Bottom Info */}
                <div className="mt-6 pt-6 pb-24 border-t border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-cyan-500/30">
                      <img src={LOGO_URL} alt="Gianky" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="font-heading font-bold text-sm">GIANKY COIN</div>
                      <div className="text-cyan-400 text-xs">Live su Polygon</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
