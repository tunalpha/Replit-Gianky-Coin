import { motion } from 'framer-motion';
import { Shield, Eye, Code, Lock } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const Trasparenza = () => {
  const { language } = useLanguage();

  const content = {
    it: {
      badge: 'VERIFICABILE',
      title: 'Trasparenza',
      items: [
        { icon: Code, text: 'Smart contract pubblico' },
        { icon: Eye, text: 'Codice verificabile' },
        { icon: Lock, text: 'Nessuna modifica nascosta' },
        { icon: Shield, text: 'Tutte le operazioni visibili on-chain' }
      ],
      footer: 'Invitiamo tutti a verificare autonomamente.'
    },
    en: {
      badge: 'VERIFIABLE',
      title: 'Transparency',
      items: [
        { icon: Code, text: 'Public smart contract' },
        { icon: Eye, text: 'Verifiable code' },
        { icon: Lock, text: 'No hidden modifications' },
        { icon: Shield, text: 'All operations visible on-chain' }
      ],
      footer: 'We invite everyone to verify independently.'
    },
    es: {
      badge: 'VERIFICABLE',
      title: 'Transparencia',
      items: [
        { icon: Code, text: 'Smart contract público' },
        { icon: Eye, text: 'Código verificable' },
        { icon: Lock, text: 'Sin modificaciones ocultas' },
        { icon: Shield, text: 'Todas las operaciones visibles on-chain' }
      ],
      footer: 'Invitamos a todos a verificar de forma independiente.'
    },
    fr: {
      badge: 'VÉRIFIABLE',
      title: 'Transparence',
      items: [
        { icon: Code, text: 'Smart contract public' },
        { icon: Eye, text: 'Code vérifiable' },
        { icon: Lock, text: 'Aucune modification cachée' },
        { icon: Shield, text: 'Toutes les opérations visibles on-chain' }
      ],
      footer: 'Nous invitons tout le monde à vérifier de manière indépendante.'
    },
    de: {
      badge: 'VERIFIZIERBAR',
      title: 'Transparenz',
      items: [
        { icon: Code, text: 'Öffentlicher Smart Contract' },
        { icon: Eye, text: 'Verifizierbarer Code' },
        { icon: Lock, text: 'Keine versteckten Änderungen' },
        { icon: Shield, text: 'Alle Operationen on-chain sichtbar' }
      ],
      footer: 'Wir laden alle ein, eigenständig zu überprüfen.'
    },
    ru: {
      badge: 'ПРОВЕРЯЕМО',
      title: 'Прозрачность',
      items: [
        { icon: Code, text: 'Публичный смарт-контракт' },
        { icon: Eye, text: 'Проверяемый код' },
        { icon: Lock, text: 'Никаких скрытых изменений' },
        { icon: Shield, text: 'Все операции видны в блокчейне' }
      ],
      footer: 'Мы приглашаем всех проверить самостоятельно.'
    },
    zh: {
      badge: '可验证',
      title: '透明度',
      items: [
        { icon: Code, text: '公开智能合约' },
        { icon: Eye, text: '可验证代码' },
        { icon: Lock, text: '无隐藏修改' },
        { icon: Shield, text: '所有操作在链上可见' }
      ],
      footer: '我们邀请所有人独立验证。'
    }
  };

  const t = content[language] || content.en;

  return (
    <section id="trasparenza" className="py-20 md:py-32 relative" data-testid="trasparenza-section">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-green-400 text-xs font-mono tracking-widest mb-6">
            <Shield className="w-4 h-4" />
            {t.badge}
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            {t.title}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-8 border border-green-500/20"
        >
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {t.items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10"
              >
                <item.icon className="w-6 h-6 text-green-400 flex-shrink-0" />
                <span className="text-white">{item.text}</span>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center">
            <p className="text-green-400 font-medium">{t.footer}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Trasparenza;
