import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, ExternalLink, Mail, X, MapPin, Phone, Building2 } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

// Logo ufficiale GiankyCoin
const LOGO_URL = 'https://customer-assets.emergentagent.com/job_coin-overhaul/artifacts/b827bvvg_ea3d65f2-73a1-4e70-b600-dd0364348cf9.jpeg';

// Social Links
const socials = [
  {
    name: 'YouTube',
    url: 'https://www.youtube.com/@GKYOFFICIAL-r8m',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
    color: 'hover:text-red-500 hover:border-red-500/50'
  },
  {
    name: 'TikTok',
    url: 'https://www.tiktok.com/@gky_official?_r=1&_t=ZN-940V2b7FMHr',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
      </svg>
    ),
    color: 'hover:text-pink-500 hover:border-pink-500/50'
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/giankycoin?igsh=MWJpcWRkcmowamZobA==',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
    color: 'hover:text-purple-500 hover:border-purple-500/50'
  },
  {
    name: 'Telegram',
    url: 'https://t.me/giankycoin',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
      </svg>
    ),
    color: 'hover:text-blue-400 hover:border-blue-400/50'
  },
  {
    name: 'Telegram Gruppo',
    url: 'https://t.me/giankycoin_gruppo',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
      </svg>
    ),
    color: 'hover:text-cyan-400 hover:border-cyan-400/50'
  },
];

const Footer = ({ onWhitepaperClick }) => {
  const { language } = useLanguage();
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  // Company Info
  const companyInfo = {
    name: 'Gianky Coin, LLC',
    address: '16192 COASTAL HIGHWAY',
    city: 'LEWES, DE 19958 USA',
    county: 'Sussex',
    phone: '+1 (302) 558-3960',
    ein: '37-2162575',
    fileNumber: '10018378'
  };

  const content = {
    it: {
      description: 'Un ecosistema digitale basato su servizi reali. Costruito su blockchain Polygon.',
      tagline: ['Servizi.', 'Trasparenza.', 'Innovazione.'],
      quickLinks: 'Link Rapidi',
      resources: 'Risorse',
      whitepaper: 'Whitepaper',
      vipHolders: 'VIP Holders',
      mintingPlatform: 'Piattaforma Minting',
      contactUs: 'Contattaci',
      followUs: 'Seguici',
      companyInfo: 'Info Società',
      copyright: 'Tutti i diritti riservati.',
      privacy: 'Privacy',
      terms: 'Termini',
      privacyTitle: 'Informativa sulla Privacy',
      termsTitle: 'Termini e Condizioni'
    },
    en: {
      description: 'A digital ecosystem based on real services. Built on Polygon blockchain.',
      tagline: ['Services.', 'Transparency.', 'Innovation.'],
      quickLinks: 'Quick Links',
      resources: 'Resources',
      whitepaper: 'Whitepaper',
      vipHolders: 'VIP Holders',
      mintingPlatform: 'Minting Platform',
      contactUs: 'Contact Us',
      followUs: 'Follow Us',
      companyInfo: 'Company Info',
      copyright: 'All rights reserved.',
      privacy: 'Privacy',
      terms: 'Terms',
      privacyTitle: 'Privacy Policy',
      termsTitle: 'Terms and Conditions'
    },
    es: {
      description: 'Un ecosistema digital basado en servicios reales. Construido en blockchain Polygon.',
      tagline: ['Servicios.', 'Transparencia.', 'Innovación.'],
      quickLinks: 'Enlaces Rápidos',
      resources: 'Recursos',
      whitepaper: 'Whitepaper',
      vipHolders: 'VIP Holders',
      mintingPlatform: 'Plataforma Minting',
      contactUs: 'Contáctanos',
      followUs: 'Síguenos',
      companyInfo: 'Info Empresa',
      copyright: 'Todos los derechos reservados.',
      privacy: 'Privacidad',
      terms: 'Términos',
      privacyTitle: 'Política de Privacidad',
      termsTitle: 'Términos y Condiciones'
    },
    fr: {
      description: "Un écosystème numérique basé sur des services réels. Construit sur la blockchain Polygon.",
      tagline: ['Services.', 'Transparence.', 'Innovation.'],
      quickLinks: 'Liens Rapides',
      resources: 'Ressources',
      whitepaper: 'Whitepaper',
      vipHolders: 'VIP Holders',
      mintingPlatform: 'Plateforme Minting',
      contactUs: 'Contactez-nous',
      followUs: 'Suivez-nous',
      companyInfo: 'Info Société',
      copyright: 'Tous droits réservés.',
      privacy: 'Confidentialité',
      terms: 'Conditions',
      privacyTitle: 'Politique de Confidentialité',
      termsTitle: 'Conditions Générales'
    },
    de: {
      description: 'Ein digitales Ökosystem basierend auf echten Dienstleistungen. Gebaut auf Polygon Blockchain.',
      tagline: ['Dienste.', 'Transparenz.', 'Innovation.'],
      quickLinks: 'Schnelllinks',
      resources: 'Ressourcen',
      whitepaper: 'Whitepaper',
      vipHolders: 'VIP Holders',
      mintingPlatform: 'Minting Plattform',
      contactUs: 'Kontakt',
      followUs: 'Folgen Sie uns',
      companyInfo: 'Firmeninfo',
      copyright: 'Alle Rechte vorbehalten.',
      privacy: 'Datenschutz',
      terms: 'AGB',
      privacyTitle: 'Datenschutzrichtlinie',
      termsTitle: 'Allgemeine Geschäftsbedingungen'
    },
    ru: {
      description: 'Цифровая экосистема, основанная на реальных услугах. Построена на блокчейне Polygon.',
      tagline: ['Услуги.', 'Прозрачность.', 'Инновации.'],
      quickLinks: 'Быстрые Ссылки',
      resources: 'Ресурсы',
      whitepaper: 'Whitepaper',
      vipHolders: 'VIP Holders',
      mintingPlatform: 'Платформа Минтинга',
      contactUs: 'Связаться',
      followUs: 'Подписывайтесь',
      companyInfo: 'О Компании',
      copyright: 'Все права защищены.',
      privacy: 'Конфиденциальность',
      terms: 'Условия',
      privacyTitle: 'Политика Конфиденциальности',
      termsTitle: 'Условия и Положения'
    },
    zh: {
      description: '基于真实服务的数字生态系统。建立在Polygon区块链上。',
      tagline: ['服务。', '透明。', '创新。'],
      quickLinks: '快速链接',
      resources: '资源',
      whitepaper: '白皮书',
      vipHolders: 'VIP持有者',
      mintingPlatform: '铸造平台',
      contactUs: '联系我们',
      followUs: '关注我们',
      companyInfo: '公司信息',
      copyright: '版权所有。',
      privacy: '隐私',
      terms: '条款',
      privacyTitle: '隐私政策',
      termsTitle: '条款和条件'
    }
  };

  const t = content[language] || content.en;

  const navLinksMap = {
    it: ['Piani', 'Staking', 'Roadmap', 'Team', 'FAQ'],
    en: ['Plans', 'Staking', 'Roadmap', 'Team', 'FAQ'],
    es: ['Planes', 'Staking', 'Roadmap', 'Equipo', 'FAQ'],
    fr: ['Plans', 'Staking', 'Roadmap', 'Équipe', 'FAQ'],
    de: ['Pläne', 'Staking', 'Roadmap', 'Team', 'FAQ'],
    ru: ['Планы', 'Стейкинг', 'Дорожная карта', 'Команда', 'FAQ'],
    zh: ['计划', '质押', '路线图', '团队', '常见问题']
  };
  const navLinks = navLinksMap[language] || navLinksMap.en;

  return (
    <footer className="relative pt-16 md:pt-20 pb-8 overflow-hidden" data-testid="footer-section">
      {/* Big Background Text */}
      <div className="footer-big-text">GIANKY</div>
      
      {/* Top Border Gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="sm:col-span-2 lg:col-span-1"
          >
            <a href="#home" className="flex items-center gap-3 mb-4">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-cyan-500/50 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                <img src={LOGO_URL} alt="Gianky Coin" className="w-full h-full object-cover" />
              </div>
              <span className="font-heading font-black text-xl tracking-wider">GIANKY COIN</span>
            </a>
            <p className="text-slate-400 leading-relaxed mb-4 text-sm">
              {t.description}
            </p>
            <div className="flex items-center gap-2 text-xs">
              {t.tagline.map((word, i) => (
                <span key={i} className={i === t.tagline.length - 1 ? 'text-cyan-400' : 'text-slate-500'}>{word}</span>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-subheading text-sm font-bold uppercase tracking-wider mb-4 text-white">{t.quickLinks}</h4>
            <ul className="space-y-2">
              {navLinks.map((item, i) => (
                <li key={i}>
                  <a href={`#${['plans', 'staking', 'roadmap', 'team', 'faq'][i]}`} className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-subheading text-sm font-bold uppercase tracking-wider mb-4 text-white">{t.resources}</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={onWhitepaperClick} className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-2 text-sm">
                  <FileText className="w-4 h-4" /> {t.whitepaper}
                </button>
              </li>
              <li>
                <a href="/piattaforma-minting" className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-2 text-sm">
                  <ExternalLink className="w-4 h-4" /> {t.mintingPlatform}
                </a>
              </li>
              <li>
                <a href="mailto:giakytoken@gmail.com" className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4" /> {t.contactUs}
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Social Links & Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="font-subheading text-sm font-bold uppercase tracking-wider mb-4 text-white">{t.followUs}</h4>
            <div className="flex flex-wrap gap-2 mb-6">
              {socials.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-10 h-10 rounded-xl glass flex items-center justify-center text-slate-400 transition-all ${social.color}`}
                  title={social.name}
                  data-testid={`social-${social.name.toLowerCase().replace(' ', '-')}`}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
            
            {/* Company Info */}
            <div className="space-y-2 text-xs text-slate-500 pt-4 border-t border-white/10">
              <div className="flex items-start gap-2">
                <Building2 className="w-3 h-3 mt-0.5 text-cyan-400/60 flex-shrink-0" />
                <span>{companyInfo.name}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3 h-3 mt-0.5 text-cyan-400/60 flex-shrink-0" />
                <div>
                  <p>{companyInfo.address}</p>
                  <p>{companyInfo.city}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3 h-3 text-cyan-400/60 flex-shrink-0" />
                <a href={`tel:${companyInfo.phone}`} className="hover:text-cyan-400 transition-colors">
                  {companyInfo.phone}
                </a>
              </div>
              <p className="text-slate-600 pt-1">EIN: {companyInfo.ein} | File #: {companyInfo.fileNumber}</p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs text-center md:text-left">
            © {new Date().getFullYear()} Gianky Coin, LLC. {t.copyright}
          </p>
          <div className="flex items-center gap-4 text-xs">
            <button onClick={() => setShowPrivacy(true)} className="text-slate-500 hover:text-slate-300 transition-colors">{t.privacy}</button>
            <button onClick={() => setShowTerms(true)} className="text-slate-500 hover:text-slate-300 transition-colors">{t.terms}</button>
          </div>
        </div>
      </div>

      {/* Privacy Modal */}
      <AnimatePresence>
        {showPrivacy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowPrivacy(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-2xl max-h-[80vh] overflow-y-auto glass rounded-2xl p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowPrivacy(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-2xl font-bold mb-6 text-cyan-400">{t.privacyTitle}</h2>
              <div className="space-y-4 text-slate-300 text-sm">
                <p>
                  {language === 'it' 
                    ? 'La presente informativa sulla privacy descrive come Gianky Coin, LLC raccoglie, utilizza e protegge le informazioni personali degli utenti.'
                    : 'This privacy policy describes how Gianky Coin, LLC collects, uses and protects personal information of users.'}
                </p>
                <h3 className="text-lg font-semibold text-white">{language === 'it' ? 'Raccolta dei Dati' : 'Data Collection'}</h3>
                <p>
                  {language === 'it'
                    ? 'Raccogliamo informazioni quando interagite con la nostra piattaforma, inclusi indirizzi wallet, dati di transazione e informazioni di contatto fornite volontariamente.'
                    : 'We collect information when you interact with our platform, including wallet addresses, transaction data, and contact information voluntarily provided.'}
                </p>
                <h3 className="text-lg font-semibold text-white">{language === 'it' ? 'Utilizzo dei Dati' : 'Data Usage'}</h3>
                <p>
                  {language === 'it'
                    ? 'I dati raccolti vengono utilizzati per fornire i nostri servizi, migliorare l\'esperienza utente e comunicare aggiornamenti importanti.'
                    : 'Collected data is used to provide our services, improve user experience, and communicate important updates.'}
                </p>
                <h3 className="text-lg font-semibold text-white">{language === 'it' ? 'Sicurezza' : 'Security'}</h3>
                <p>
                  {language === 'it'
                    ? 'Implementiamo misure di sicurezza standard del settore per proteggere le informazioni degli utenti.'
                    : 'We implement industry-standard security measures to protect user information.'}
                </p>
                <div className="pt-4 border-t border-white/10 text-slate-500 text-xs">
                  <p>{companyInfo.name}</p>
                  <p>{companyInfo.address}, {companyInfo.city}</p>
                  <p>Email: giakytoken@gmail.com</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Terms Modal */}
      <AnimatePresence>
        {showTerms && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowTerms(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-2xl max-h-[80vh] overflow-y-auto glass rounded-2xl p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowTerms(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-2xl font-bold mb-6 text-cyan-400">{t.termsTitle}</h2>
              <div className="space-y-4 text-slate-300 text-sm">
                <p>
                  {language === 'it'
                    ? 'Utilizzando i servizi di Gianky Coin, LLC, accetti i seguenti termini e condizioni.'
                    : 'By using Gianky Coin, LLC services, you agree to the following terms and conditions.'}
                </p>
                <h3 className="text-lg font-semibold text-white">{language === 'it' ? 'Accettazione dei Termini' : 'Acceptance of Terms'}</h3>
                <p>
                  {language === 'it'
                    ? 'L\'accesso e l\'utilizzo dei nostri servizi implica l\'accettazione completa di questi termini.'
                    : 'Access and use of our services implies full acceptance of these terms.'}
                </p>
                <h3 className="text-lg font-semibold text-white">{language === 'it' ? 'Servizi' : 'Services'}</h3>
                <p>
                  {language === 'it'
                    ? 'Gianky Coin fornisce servizi DeFi inclusi NFT minting, staking e token swap sulla blockchain Polygon.'
                    : 'Gianky Coin provides DeFi services including NFT minting, staking and token swap on the Polygon blockchain.'}
                </p>
                <h3 className="text-lg font-semibold text-white">{language === 'it' ? 'Rischi' : 'Risks'}</h3>
                <p>
                  {language === 'it'
                    ? 'Gli investimenti in criptovalute comportano rischi. Gli utenti sono responsabili delle proprie decisioni di investimento.'
                    : 'Cryptocurrency investments carry risks. Users are responsible for their own investment decisions.'}
                </p>
                <h3 className="text-lg font-semibold text-white">{language === 'it' ? 'Limitazione di Responsabilità' : 'Limitation of Liability'}</h3>
                <p>
                  {language === 'it'
                    ? 'Gianky Coin, LLC non è responsabile per perdite derivanti dall\'uso dei nostri servizi o dalla volatilità del mercato.'
                    : 'Gianky Coin, LLC is not liable for losses resulting from the use of our services or market volatility.'}
                </p>
                <div className="pt-4 border-t border-white/10 text-slate-500 text-xs">
                  <p>{companyInfo.name}</p>
                  <p>{companyInfo.address}, {companyInfo.city}</p>
                  <p>EIN: {companyInfo.ein} | File #: {companyInfo.fileNumber}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;
