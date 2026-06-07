import { motion } from 'framer-motion';
import { XCircle, AlertTriangle } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const CosaNonSiamo = () => {
  const { language } = useLanguage();

  const content = {
    it: {
      badge: 'TRASPARENZA',
      title: 'Cosa',
      titleHighlight: 'NON è',
      titleEnd: 'Giankycoin',
      items: [
        'Non promettiamo rendimenti.',
        'Non garantiamo guadagni.',
        'Non è uno schema di investimento.',
        'Non è un sistema di soldi facili.'
      ],
      footer: 'Giankycoin è un progetto di servizi digitali. Chi partecipa lo fa per utilizzare o supportare l\'ecosistema.'
    },
    en: {
      badge: 'TRANSPARENCY',
      title: 'What Giankycoin',
      titleHighlight: 'is NOT',
      titleEnd: '',
      items: [
        'We do not promise returns.',
        'We do not guarantee profits.',
        'It is not an investment scheme.',
        'It is not a get-rich-quick system.'
      ],
      footer: 'Giankycoin is a digital services project. Participants join to use or support the ecosystem.'
    },
    es: {
      badge: 'TRANSPARENCIA',
      title: 'Qué',
      titleHighlight: 'NO es',
      titleEnd: 'Giankycoin',
      items: [
        'No prometemos rendimientos.',
        'No garantizamos ganancias.',
        'No es un esquema de inversión.',
        'No es un sistema de dinero fácil.'
      ],
      footer: 'Giankycoin es un proyecto de servicios digitales. Quien participa lo hace para utilizar o apoyar el ecosistema.'
    },
    fr: {
      badge: 'TRANSPARENCE',
      title: 'Ce que Giankycoin',
      titleHighlight: "N'est PAS",
      titleEnd: '',
      items: [
        'Nous ne promettons pas de rendements.',
        'Nous ne garantissons pas de profits.',
        "Ce n'est pas un schéma d'investissement.",
        "Ce n'est pas un système d'argent facile."
      ],
      footer: 'Giankycoin est un projet de services numériques. Les participants rejoignent pour utiliser ou soutenir l\'écosystème.'
    },
    de: {
      badge: 'TRANSPARENZ',
      title: 'Was Giankycoin',
      titleHighlight: 'NICHT ist',
      titleEnd: '',
      items: [
        'Wir versprechen keine Renditen.',
        'Wir garantieren keine Gewinne.',
        'Es ist kein Investitionsschema.',
        'Es ist kein schnelles Geld System.'
      ],
      footer: 'Giankycoin ist ein digitales Dienstleistungsprojekt. Teilnehmer treten bei, um das Ökosystem zu nutzen oder zu unterstützen.'
    },
    ru: {
      badge: 'ПРОЗРАЧНОСТЬ',
      title: 'Чем Giankycoin',
      titleHighlight: 'НЕ является',
      titleEnd: '',
      items: [
        'Мы не обещаем доходность.',
        'Мы не гарантируем прибыль.',
        'Это не инвестиционная схема.',
        'Это не система быстрых денег.'
      ],
      footer: 'Giankycoin — это проект цифровых услуг. Участники присоединяются, чтобы использовать или поддерживать экосистему.'
    },
    zh: {
      badge: '透明度',
      title: 'Giankycoin',
      titleHighlight: '不是什么',
      titleEnd: '',
      items: [
        '我们不承诺收益。',
        '我们不保证利润。',
        '这不是投资计划。',
        '这不是快速致富系统。'
      ],
      footer: 'Giankycoin是一个数字服务项目。参与者加入是为了使用或支持生态系统。'
    }
  };

  const t = content[language] || content.en;

  return (
    <section id="cosa-non-siamo" className="py-20 md:py-32 relative" data-testid="cosa-non-siamo-section">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-amber-400 text-xs font-mono tracking-widest mb-6">
            <AlertTriangle className="w-4 h-4" />
            {t.badge}
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            <span className="text-white">{t.title} </span>
            <span className="text-red-400">{t.titleHighlight}</span>
            {t.titleEnd && <span className="text-white"> {t.titleEnd}</span>}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-8 border border-red-500/20"
        >
          <ul className="space-y-4 mb-8">
            {t.items.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-3 text-lg text-slate-300"
              >
                <XCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
          
          <div className="pt-6 border-t border-white/10">
            <p className="text-slate-400 text-center leading-relaxed">
              {t.footer}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CosaNonSiamo;
