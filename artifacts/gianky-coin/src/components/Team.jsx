import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const teamImages = [
  'https://images.unsplash.com/photo-1650781663514-4900925787a8?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1625314887424-9f190599bd56?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1656761185428-951b06621492?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1656229181541-a42184b5625c?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1770249196589-36453bf42a4b?w=400&h=400&fit=crop',
];

const Team = () => {
  const { language } = useLanguage();

  const content = {
    it: {
      badge: 'IL TEAM',
      title: 'MENTI',
      titleHighlight: 'BRILLANTI',
      subtitle: 'Un team di esperti dedicati a costruire il futuro della finanza decentralizzata.',
      members: [
        { name: 'Alpha', role: 'Owner & Founder', desc: 'Visionario blockchain con 10+ anni di esperienza in fintech. Il genio digitale.', showBrain: true },
        { name: 'Onji', role: 'Chief Technical Officer', desc: 'Ex-Google, esperto in smart contracts e architetture DeFi.' },
        { name: 'Giancarlo', role: 'Co-Fondatore & Marketing', desc: 'Stratega digitale e co-fondatore con track record in lancio progetti crypto.' },
        { name: 'Saad', role: 'Lead Developer', desc: 'Full-stack developer specializzato in Web3 e dApps.' },
        { name: 'Monirul', role: 'Blockchain Engineer', desc: 'Esperto in smart contracts sicuri e protocolli di staking per Web3.' }
      ]
    },
    en: {
      badge: 'THE TEAM',
      title: 'BRILLIANT',
      titleHighlight: 'MINDS',
      subtitle: 'A team of experts dedicated to building the future of decentralized finance.',
      members: [
        { name: 'Alpha', role: 'Owner & Founder', desc: 'Blockchain visionary with 10+ years of fintech experience. The digital genius.', showBrain: true },
        { name: 'Onji', role: 'Chief Technical Officer', desc: 'Ex-Google, expert in smart contracts and DeFi architectures.' },
        { name: 'Giancarlo', role: 'Co-Founder & Marketing', desc: 'Digital strategist and co-founder with track record in crypto project launches.' },
        { name: 'Saad', role: 'Lead Developer', desc: 'Full-stack developer specialized in Web3 and dApps.' },
        { name: 'Monirul', role: 'Blockchain Engineer', desc: 'Expert in secure smart contracts and staking protocols for Web3.' }
      ]
    },
    es: {
      badge: 'EL EQUIPO',
      title: 'MENTES',
      titleHighlight: 'BRILLANTES',
      subtitle: 'Un equipo de expertos dedicados a construir el futuro de las finanzas descentralizadas.',
      members: [
        { name: 'Alpha', role: 'Propietario y Fundador', desc: 'Visionario blockchain con 10+ años de experiencia en fintech. El genio digital.', showBrain: true },
        { name: 'Onji', role: 'Director Técnico', desc: 'Ex-Google, experto en smart contracts y arquitecturas DeFi.' },
        { name: 'Giancarlo', role: 'Co-Fundador & Marketing', desc: 'Estratega digital y co-fundador con historial en lanzamientos crypto.' },
        { name: 'Saad', role: 'Desarrollador Principal', desc: 'Desarrollador full-stack especializado en Web3 y dApps.' },
        { name: 'Monirul', role: 'Ingeniero Blockchain', desc: 'Experto en smart contracts seguros y protocolos de staking para Web3.' }
      ]
    },
    fr: {
      badge: "L'ÉQUIPE",
      title: 'ESPRITS',
      titleHighlight: 'BRILLANTS',
      subtitle: "Une équipe d'experts dédiés à construire l'avenir de la finance décentralisée.",
      members: [
        { name: 'Alpha', role: 'Propriétaire & Fondateur', desc: "Visionnaire blockchain avec 10+ ans d'expérience fintech. Le génie numérique.", showBrain: true },
        { name: 'Onji', role: 'Directeur Technique', desc: 'Ex-Google, expert en smart contracts et architectures DeFi.' },
        { name: 'Giancarlo', role: 'Co-Fondateur & Marketing', desc: 'Stratège digital et co-fondateur avec un historique de lancements crypto.' },
        { name: 'Saad', role: 'Développeur Principal', desc: 'Développeur full-stack spécialisé en Web3 et dApps.' },
        { name: 'Monirul', role: 'Ingénieur Blockchain', desc: 'Expert en smart contracts sécurisés et protocoles de staking pour Web3.' }
      ]
    },
    de: {
      badge: 'DAS TEAM',
      title: 'BRILLANTE',
      titleHighlight: 'KÖPFE',
      subtitle: 'Ein Team von Experten, die sich dem Aufbau der Zukunft der dezentralen Finanzen widmen.',
      members: [
        { name: 'Alpha', role: 'Eigentümer & Gründer', desc: 'Blockchain-Visionär mit 10+ Jahren Fintech-Erfahrung. Das digitale Genie.', showBrain: true },
        { name: 'Onji', role: 'Technischer Direktor', desc: 'Ex-Google, Experte für Smart Contracts und DeFi-Architekturen.' },
        { name: 'Giancarlo', role: 'Co-Gründer & Marketing', desc: 'Digitaler Stratege und Co-Gründer mit Erfolgsbilanz bei Crypto-Projekten.' },
        { name: 'Saad', role: 'Lead Entwickler', desc: 'Full-Stack-Entwickler spezialisiert auf Web3 und dApps.' },
        { name: 'Monirul', role: 'Blockchain-Ingenieur', desc: 'Experte für sichere Smart Contracts und Staking-Protokolle für Web3.' }
      ]
    },
    ru: {
      badge: 'КОМАНДА',
      title: 'БЛЕСТЯЩИЕ',
      titleHighlight: 'УМЫ',
      subtitle: 'Команда экспертов, посвятивших себя построению будущего децентрализованных финансов.',
      members: [
        { name: 'Alpha', role: 'Владелец и Основатель', desc: 'Блокчейн-визионер с 10+ летним опытом в финтехе. Цифровой гений.', showBrain: true },
        { name: 'Onji', role: 'Технический Директор', desc: 'Бывший Google, эксперт по смарт-контрактам и DeFi архитектурам.' },
        { name: 'Giancarlo', role: 'Со-основатель и Маркетинг', desc: 'Цифровой стратег и со-основатель с опытом запуска крипто-проектов.' },
        { name: 'Saad', role: 'Ведущий Разработчик', desc: 'Full-stack разработчик, специализирующийся на Web3 и dApps.' },
        { name: 'Monirul', role: 'Блокчейн-инженер', desc: 'Эксперт по безопасным смарт-контрактам и протоколам стейкинга для Web3.' }
      ]
    },
    zh: {
      badge: '团队',
      title: '杰出的',
      titleHighlight: '人才',
      subtitle: '一支致力于构建去中心化金融未来的专家团队。',
      members: [
        { name: 'Alpha', role: '所有者和创始人', desc: '拥有10年以上金融科技经验的区块链愿景家。数字天才。', showBrain: true },
        { name: 'Onji', role: '首席技术官', desc: '前谷歌员工，智能合约和DeFi架构专家。' },
        { name: 'Giancarlo', role: '联合创始人和市场营销', desc: '数字策略师和联合创始人，在加密项目启动方面有成功记录。' },
        { name: 'Saad', role: '首席开发者', desc: '专注于Web3和dApps的全栈开发者。' },
        { name: 'Monirul', role: '区块链工程师', desc: 'Web3安全智能合约和质押协议专家。' }
      ]
    }
  };

  const t = content[language] || content.en;

  return (
    <section id="team" className="py-20 md:py-32 relative" data-testid="team-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full glass text-cyan-400 text-xs sm:text-sm font-mono tracking-widest mb-6">
            {t.badge}
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight uppercase mb-4">
            {t.title} <span className="gradient-text">{t.titleHighlight}</span>
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8"
        >
          {t.members.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ y: -10 }}
              className="team-card group"
              data-testid={`team-member-${member.name.toLowerCase()}`}
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                <img src={teamImages[index]} alt={member.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="overlay" />
                <div className="info">
                  <div className="text-cyan-400 text-xs font-mono tracking-widest mb-2">{member.role}</div>
                  <h3 className="font-heading text-xl md:text-2xl font-bold uppercase tracking-wide text-white mb-2 md:mb-3 flex items-center gap-2">
                    {member.name}
                    {member.showBrain && <Brain className="w-5 h-5 text-cyan-400" />}
                  </h3>
                  <p className="text-slate-400 text-xs md:text-sm line-clamp-2">{member.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Team;
