import { motion } from 'framer-motion';
import { CheckCircle, Layers, Coins, Cpu } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const CosaE = () => {
  const { language } = useLanguage();

  const content = {
    it: {
      badge: 'IL PROGETTO',
      title: "Cos'è",
      titleHighlight: 'Giankycoin',
      subtitle: 'Giankycoin è un ecosistema costruito su:',
      items: [
        { icon: Layers, text: 'NFT con accesso a servizi digitali' },
        { icon: Coins, text: 'Token GKY utilizzato per mantenere e utilizzare i servizi' },
        { icon: Cpu, text: 'Strumenti di automazione per imprese' }
      ],
      footer: 'Il valore nasce dall\'uso reale dei servizi, non da promesse speculative.'
    },
    en: {
      badge: 'THE PROJECT',
      title: 'What is',
      titleHighlight: 'Giankycoin',
      subtitle: 'Giankycoin is an ecosystem built on:',
      items: [
        { icon: Layers, text: 'NFTs with access to digital services' },
        { icon: Coins, text: 'GKY Token used to maintain and use services' },
        { icon: Cpu, text: 'Automation tools for businesses' }
      ],
      footer: 'Value comes from real service usage, not speculative promises.'
    },
    es: {
      badge: 'EL PROYECTO',
      title: 'Qué es',
      titleHighlight: 'Giankycoin',
      subtitle: 'Giankycoin es un ecosistema construido sobre:',
      items: [
        { icon: Layers, text: 'NFT con acceso a servicios digitales' },
        { icon: Coins, text: 'Token GKY utilizado para mantener y usar los servicios' },
        { icon: Cpu, text: 'Herramientas de automatización para empresas' }
      ],
      footer: 'El valor nace del uso real de los servicios, no de promesas especulativas.'
    },
    fr: {
      badge: 'LE PROJET',
      title: "Qu'est-ce que",
      titleHighlight: 'Giankycoin',
      subtitle: 'Giankycoin est un écosystème construit sur:',
      items: [
        { icon: Layers, text: 'NFT avec accès aux services numériques' },
        { icon: Coins, text: 'Token GKY utilisé pour maintenir et utiliser les services' },
        { icon: Cpu, text: "Outils d'automatisation pour les entreprises" }
      ],
      footer: 'La valeur vient de l\'utilisation réelle des services, pas de promesses spéculatives.'
    },
    de: {
      badge: 'DAS PROJEKT',
      title: 'Was ist',
      titleHighlight: 'Giankycoin',
      subtitle: 'Giankycoin ist ein Ökosystem aufgebaut auf:',
      items: [
        { icon: Layers, text: 'NFTs mit Zugang zu digitalen Diensten' },
        { icon: Coins, text: 'GKY Token zur Wartung und Nutzung der Dienste' },
        { icon: Cpu, text: 'Automatisierungstools für Unternehmen' }
      ],
      footer: 'Der Wert entsteht aus der realen Nutzung der Dienste, nicht aus spekulativen Versprechen.'
    },
    ru: {
      badge: 'ПРОЕКТ',
      title: 'Что такое',
      titleHighlight: 'Giankycoin',
      subtitle: 'Giankycoin — это экосистема, построенная на:',
      items: [
        { icon: Layers, text: 'NFT с доступом к цифровым услугам' },
        { icon: Coins, text: 'Токен GKY используется для поддержания и использования услуг' },
        { icon: Cpu, text: 'Инструменты автоматизации для бизнеса' }
      ],
      footer: 'Ценность возникает из реального использования услуг, а не из спекулятивных обещаний.'
    },
    zh: {
      badge: '项目介绍',
      title: '什么是',
      titleHighlight: 'Giankycoin',
      subtitle: 'Giankycoin是一个建立在以下基础上的生态系统：',
      items: [
        { icon: Layers, text: '具有数字服务访问权限的NFT' },
        { icon: Coins, text: 'GKY代币用于维护和使用服务' },
        { icon: Cpu, text: '企业自动化工具' }
      ],
      footer: '价值来自服务的实际使用，而非投机性承诺。'
    }
  };

  const t = content[language] || content.en;

  return (
    <section id="cosa-e" className="py-20 md:py-32 relative" data-testid="cosa-e-section">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-cyan-400 text-xs font-mono tracking-widest mb-6">
            <CheckCircle className="w-4 h-4" />
            {t.badge}
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            <span className="text-white">{t.title} </span>
            <span className="gradient-text">{t.titleHighlight}</span>
          </h2>
          <p className="text-slate-400 text-lg">
            {t.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-8 border border-cyan-500/20"
        >
          <div className="space-y-6 mb-8">
            {t.items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-cyan-400" />
                </div>
                <span className="text-lg text-white">{item.text}</span>
              </motion.div>
            ))}
          </div>
          
          <div className="pt-6 border-t border-white/10">
            <p className="text-cyan-400 text-center text-lg font-medium">
              {t.footer}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CosaE;
