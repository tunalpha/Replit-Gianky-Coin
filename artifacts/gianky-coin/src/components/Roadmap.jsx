import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Rocket, Code, Globe, Trophy } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const icons = [Rocket, Code, Globe, Trophy];

const Roadmap = () => {
  const { language } = useLanguage();

  const content = {
    it: {
      badge: 'SVILUPPO',
      title: 'Fasi di',
      titleHighlight: 'sviluppo',
      phases: [
        { phase: 'Fase 1', title: 'Attivazione', status: 'current', items: ['Attivazione servizi digitali base', 'Lancio piattaforma NFT', 'Setup infrastruttura'] },
        { phase: 'Fase 2', title: 'Marketplace', status: 'upcoming', items: ['Marketplace interno', 'Integrazione servizi avanzati', 'Dashboard utente'] },
        { phase: 'Fase 3', title: 'Espansione', status: 'upcoming', items: ['Espansione rete commerciale', 'Partnership strategiche', 'Nuovi servizi'] },
        { phase: 'Fase 4', title: 'Listing', status: 'upcoming', items: ['Eventuale listing del token', 'Solo quando ecosistema stabile', 'Basato su crescita reale'] },
      ],
      disclaimer: 'Il listing non è garantito e dipende dalla crescita reale dell\'ecosistema.'
    },
    en: {
      badge: 'DEVELOPMENT',
      title: 'Development',
      titleHighlight: 'phases',
      phases: [
        { phase: 'Phase 1', title: 'Activation', status: 'current', items: ['Basic digital services activation', 'NFT platform launch', 'Infrastructure setup'] },
        { phase: 'Phase 2', title: 'Marketplace', status: 'upcoming', items: ['Internal marketplace', 'Advanced services integration', 'User dashboard'] },
        { phase: 'Phase 3', title: 'Expansion', status: 'upcoming', items: ['Commercial network expansion', 'Strategic partnerships', 'New services'] },
        { phase: 'Phase 4', title: 'Listing', status: 'upcoming', items: ['Potential token listing', 'Only when ecosystem is stable', 'Based on real growth'] },
      ],
      disclaimer: 'Listing is not guaranteed and depends on real ecosystem growth.'
    },
    es: {
      badge: 'DESARROLLO',
      title: 'Fases de',
      titleHighlight: 'desarrollo',
      phases: [
        { phase: 'Fase 1', title: 'Activación', status: 'current', items: ['Activación servicios digitales básicos', 'Lanzamiento plataforma NFT', 'Configuración infraestructura'] },
        { phase: 'Fase 2', title: 'Marketplace', status: 'upcoming', items: ['Marketplace interno', 'Integración servicios avanzados', 'Panel de usuario'] },
        { phase: 'Fase 3', title: 'Expansión', status: 'upcoming', items: ['Expansión red comercial', 'Alianzas estratégicas', 'Nuevos servicios'] },
        { phase: 'Fase 4', title: 'Listing', status: 'upcoming', items: ['Posible listing del token', 'Solo cuando ecosistema estable', 'Basado en crecimiento real'] },
      ],
      disclaimer: 'El listing no está garantizado y depende del crecimiento real del ecosistema.'
    },
    fr: {
      badge: 'DÉVELOPPEMENT',
      title: 'Phases de',
      titleHighlight: 'développement',
      phases: [
        { phase: 'Phase 1', title: 'Activation', status: 'current', items: ['Activation services numériques de base', 'Lancement plateforme NFT', 'Configuration infrastructure'] },
        { phase: 'Phase 2', title: 'Marketplace', status: 'upcoming', items: ['Marketplace interne', 'Intégration services avancés', 'Tableau de bord utilisateur'] },
        { phase: 'Phase 3', title: 'Expansion', status: 'upcoming', items: ['Expansion réseau commercial', 'Partenariats stratégiques', 'Nouveaux services'] },
        { phase: 'Phase 4', title: 'Listing', status: 'upcoming', items: ['Listing potentiel du token', "Seulement quand l'écosystème est stable", 'Basé sur une croissance réelle'] },
      ],
      disclaimer: "Le listing n'est pas garanti et dépend de la croissance réelle de l'écosystème."
    },
    de: {
      badge: 'ENTWICKLUNG',
      title: 'Entwicklungs',
      titleHighlight: 'phasen',
      phases: [
        { phase: 'Phase 1', title: 'Aktivierung', status: 'current', items: ['Aktivierung grundlegender digitaler Dienste', 'NFT-Plattform Start', 'Infrastruktur-Setup'] },
        { phase: 'Phase 2', title: 'Marketplace', status: 'upcoming', items: ['Interner Marketplace', 'Integration erweiterter Dienste', 'Benutzer-Dashboard'] },
        { phase: 'Phase 3', title: 'Expansion', status: 'upcoming', items: ['Expansion des Handelsnetzwerks', 'Strategische Partnerschaften', 'Neue Dienste'] },
        { phase: 'Phase 4', title: 'Listing', status: 'upcoming', items: ['Mögliches Token-Listing', 'Nur wenn Ökosystem stabil', 'Basierend auf echtem Wachstum'] },
      ],
      disclaimer: 'Das Listing ist nicht garantiert und hängt vom realen Wachstum des Ökosystems ab.'
    },
    ru: {
      badge: 'РАЗРАБОТКА',
      title: 'Фазы',
      titleHighlight: 'развития',
      phases: [
        { phase: 'Фаза 1', title: 'Активация', status: 'current', items: ['Активация базовых цифровых услуг', 'Запуск NFT платформы', 'Настройка инфраструктуры'] },
        { phase: 'Фаза 2', title: 'Маркетплейс', status: 'upcoming', items: ['Внутренний маркетплейс', 'Интеграция продвинутых услуг', 'Панель пользователя'] },
        { phase: 'Фаза 3', title: 'Расширение', status: 'upcoming', items: ['Расширение коммерческой сети', 'Стратегические партнёрства', 'Новые услуги'] },
        { phase: 'Фаза 4', title: 'Листинг', status: 'upcoming', items: ['Возможный листинг токена', 'Только при стабильной экосистеме', 'На основе реального роста'] },
      ],
      disclaimer: 'Листинг не гарантирован и зависит от реального роста экосистемы.'
    },
    zh: {
      badge: '开发',
      title: '开发',
      titleHighlight: '阶段',
      phases: [
        { phase: '阶段1', title: '激活', status: 'current', items: ['激活基础数字服务', '启动NFT平台', '基础设施设置'] },
        { phase: '阶段2', title: '市场', status: 'upcoming', items: ['内部市场', '高级服务集成', '用户仪表板'] },
        { phase: '阶段3', title: '扩展', status: 'upcoming', items: ['商业网络扩展', '战略合作伙伴关系', '新服务'] },
        { phase: '阶段4', title: '上市', status: 'upcoming', items: ['可能的代币上市', '仅当生态系统稳定时', '基于实际增长'] },
      ],
      disclaimer: '上市不能保证，取决于生态系统的实际增长。'
    }
  };

  const t = content[language] || content.en;

  return (
    <section id="roadmap" className="py-20 md:py-32 relative overflow-hidden" data-testid="roadmap-section">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full glass text-cyan-400 text-xs sm:text-sm font-mono tracking-widest mb-6">
            {t.badge}
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight uppercase mb-4 md:mb-6">
            {t.title} <span className="gradient-text">{t.titleHighlight}</span>
          </h2>
        </motion.div>

        <div className="relative">
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-purple-500/50 to-cyan-500/50" />
          
          {t.phases.map((phase, index) => {
            const Icon = icons[index];
            return (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`relative flex flex-col lg:flex-row items-center gap-6 md:gap-8 mb-12 md:mb-16 last:mb-0 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right lg:pr-12 xl:pr-16' : 'lg:text-left lg:pl-12 xl:pl-16'}`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={`glass rounded-2xl p-6 md:p-8 inline-block w-full max-w-lg transition-all ${phase.status === 'current' ? 'ring-2 ring-cyan-500 shadow-[0_0_30px_rgba(0,240,255,0.2)]' : ''}`}
                    data-testid={`roadmap-phase-${index + 1}`}
                  >
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-wider mb-4 ${phase.status === 'current' ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-500/20 text-slate-400'}`}>
                      {phase.status === 'current' ? <CheckCircle2 className="w-3 h-3" /> : <Circle className="w-3 h-3" />}
                      {phase.phase}
                    </div>
                    <h3 className="font-heading text-xl md:text-2xl font-bold uppercase tracking-wide mb-4 text-white">{phase.title}</h3>
                    <ul className={`space-y-2 md:space-y-3 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                      {phase.items.map((item, i) => (
                        <li key={i} className={`flex items-center gap-3 text-slate-400 text-sm ${index % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}>
                          <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${phase.status === 'current' ? 'bg-cyan-400' : 'bg-slate-600'}`} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
                <div className="relative z-10 flex-shrink-0">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center transition-all ${phase.status === 'current' ? 'bg-gradient-to-br from-cyan-500 to-purple-500 shadow-[0_0_30px_rgba(0,240,255,0.5)] neon-pulse' : 'bg-slate-800 border border-slate-700'}`}
                  >
                    <Icon className="w-7 h-7 md:w-8 md:h-8 text-white" />
                  </motion.div>
                </div>
                <div className="flex-1 hidden lg:block" />
              </motion.div>
            );
          })}
        </div>

        {/* Disclaimer */}
        {t.disclaimer && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <div className="inline-block glass rounded-xl px-6 py-4 border border-amber-500/30">
              <p className="text-amber-400 text-sm">{t.disclaimer}</p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Roadmap;
