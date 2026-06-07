import { motion } from 'framer-motion';
import { ShoppingCart, Layers, Coins, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const ComeFunziona = () => {
  const { language } = useLanguage();

  const content = {
    it: {
      badge: 'IL PROCESSO',
      title: 'Come funziona',
      titleHighlight: "l'ecosistema",
      steps: [
        { num: '1', icon: ShoppingCart, title: 'Acquisti un NFT', desc: 'Scegli il livello di servizio che preferisci.' },
        { num: '2', icon: Layers, title: 'Accedi ai servizi', desc: 'Accedi a servizi digitali in base al livello scelto.' },
        { num: '3', icon: Coins, title: 'Mantieni i servizi', desc: 'Puoi mantenere i servizi pagando in GKY.' },
        { num: '4', icon: TrendingUp, title: 'Crescita reale', desc: "L'ecosistema cresce attraverso l'utilizzo reale." }
      ],
      note1: 'Nessun obbligo di reclutamento.',
      note2: 'Nessun obbligo di investimento aggiuntivo.'
    },
    en: {
      badge: 'THE PROCESS',
      title: 'How the',
      titleHighlight: 'ecosystem works',
      steps: [
        { num: '1', icon: ShoppingCart, title: 'Purchase an NFT', desc: 'Choose the service level you prefer.' },
        { num: '2', icon: Layers, title: 'Access services', desc: 'Access digital services based on your chosen level.' },
        { num: '3', icon: Coins, title: 'Maintain services', desc: 'You can maintain services by paying in GKY.' },
        { num: '4', icon: TrendingUp, title: 'Real growth', desc: 'The ecosystem grows through real usage.' }
      ],
      note1: 'No recruitment obligations.',
      note2: 'No additional investment required.'
    },
    es: {
      badge: 'EL PROCESO',
      title: 'Cómo funciona',
      titleHighlight: 'el ecosistema',
      steps: [
        { num: '1', icon: ShoppingCart, title: 'Compra un NFT', desc: 'Elige el nivel de servicio que prefieras.' },
        { num: '2', icon: Layers, title: 'Accede a los servicios', desc: 'Accede a servicios digitales según el nivel elegido.' },
        { num: '3', icon: Coins, title: 'Mantén los servicios', desc: 'Puedes mantener los servicios pagando en GKY.' },
        { num: '4', icon: TrendingUp, title: 'Crecimiento real', desc: 'El ecosistema crece a través del uso real.' }
      ],
      note1: 'Sin obligación de reclutamiento.',
      note2: 'Sin inversión adicional requerida.'
    },
    fr: {
      badge: 'LE PROCESSUS',
      title: 'Comment fonctionne',
      titleHighlight: "l'écosystème",
      steps: [
        { num: '1', icon: ShoppingCart, title: 'Achetez un NFT', desc: 'Choisissez le niveau de service que vous préférez.' },
        { num: '2', icon: Layers, title: 'Accédez aux services', desc: 'Accédez aux services numériques selon le niveau choisi.' },
        { num: '3', icon: Coins, title: 'Maintenez les services', desc: 'Vous pouvez maintenir les services en payant en GKY.' },
        { num: '4', icon: TrendingUp, title: 'Croissance réelle', desc: "L'écosystème croît grâce à une utilisation réelle." }
      ],
      note1: 'Aucune obligation de recrutement.',
      note2: "Aucun investissement supplémentaire requis."
    },
    de: {
      badge: 'DER PROZESS',
      title: 'Wie das',
      titleHighlight: 'Ökosystem funktioniert',
      steps: [
        { num: '1', icon: ShoppingCart, title: 'Kaufen Sie ein NFT', desc: 'Wählen Sie das gewünschte Servicelevel.' },
        { num: '2', icon: Layers, title: 'Zugang zu Diensten', desc: 'Greifen Sie auf digitale Dienste basierend auf Ihrem Level zu.' },
        { num: '3', icon: Coins, title: 'Dienste aufrechterhalten', desc: 'Sie können Dienste durch Zahlung in GKY aufrechterhalten.' },
        { num: '4', icon: TrendingUp, title: 'Echtes Wachstum', desc: 'Das Ökosystem wächst durch echte Nutzung.' }
      ],
      note1: 'Keine Rekrutierungspflicht.',
      note2: 'Keine zusätzliche Investition erforderlich.'
    },
    ru: {
      badge: 'ПРОЦЕСС',
      title: 'Как работает',
      titleHighlight: 'экосистема',
      steps: [
        { num: '1', icon: ShoppingCart, title: 'Купите NFT', desc: 'Выберите предпочитаемый уровень сервиса.' },
        { num: '2', icon: Layers, title: 'Получите доступ к услугам', desc: 'Получите доступ к цифровым услугам в зависимости от выбранного уровня.' },
        { num: '3', icon: Coins, title: 'Поддерживайте услуги', desc: 'Вы можете поддерживать услуги, оплачивая в GKY.' },
        { num: '4', icon: TrendingUp, title: 'Реальный рост', desc: 'Экосистема растёт благодаря реальному использованию.' }
      ],
      note1: 'Нет обязательств по привлечению.',
      note2: 'Никаких дополнительных инвестиций не требуется.'
    },
    zh: {
      badge: '流程',
      title: '生态系统',
      titleHighlight: '如何运作',
      steps: [
        { num: '1', icon: ShoppingCart, title: '购买NFT', desc: '选择您喜欢的服务级别。' },
        { num: '2', icon: Layers, title: '访问服务', desc: '根据所选级别访问数字服务。' },
        { num: '3', icon: Coins, title: '维护服务', desc: '您可以通过支付GKY来维护服务。' },
        { num: '4', icon: TrendingUp, title: '真实增长', desc: '生态系统通过实际使用而增长。' }
      ],
      note1: '无招募义务。',
      note2: '无需额外投资。'
    }
  };

  const t = content[language] || content.en;

  return (
    <section id="come-funziona" className="py-20 md:py-32 relative" data-testid="come-funziona-section">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 rounded-full glass text-cyan-400 text-xs font-mono tracking-widest mb-6">
            {t.badge}
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            <span className="text-white">{t.title} </span>
            <span className="gradient-text">{t.titleHighlight}</span>
          </h2>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {t.steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-2xl p-6 border border-white/10 hover:border-cyan-500/30 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                  <span className="font-heading text-xl font-bold text-white">{step.num}</span>
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Notes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-block glass rounded-2xl p-6 border border-green-500/20">
            <p className="text-green-400 font-medium mb-2">{t.note1}</p>
            <p className="text-green-400 font-medium">{t.note2}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ComeFunziona;
