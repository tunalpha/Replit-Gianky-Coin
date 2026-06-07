import { motion } from 'framer-motion';
import { PieChart, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const DistribuzioneFondi = () => {
  const { language } = useLanguage();

  const content = {
    it: {
      badge: 'FONDI NFT',
      title: 'Come vengono',
      titleHighlight: 'utilizzati i fondi',
      items: [
        { percent: '50%', width: 50, label: 'Liquidità', color: 'from-cyan-500 to-blue-500' },
        { percent: '26,5%', width: 26.5, label: 'Sviluppo rete commerciale', color: 'from-purple-500 to-pink-500' },
        { percent: '21,5%', width: 21.5, label: 'Sviluppo e struttura ecosistema', color: 'from-amber-500 to-orange-500' },
        { percent: '2%', width: 2, label: 'Fondo di protezione', color: 'from-green-500 to-emerald-500' }
      ],
      footer: 'Tutto è gestito tramite smart contract verificabile su blockchain.',
      cta: 'Visualizza contratto su Polygonscan',
      contractUrl: 'https://polygonscan.com/address/0x0000000000000000000000000000000000000000'
    },
    en: {
      badge: 'NFT FUNDS',
      title: 'How funds',
      titleHighlight: 'are used',
      items: [
        { percent: '50%', width: 50, label: 'Liquidity', color: 'from-cyan-500 to-blue-500' },
        { percent: '26.5%', width: 26.5, label: 'Commercial network development', color: 'from-purple-500 to-pink-500' },
        { percent: '21.5%', width: 21.5, label: 'Ecosystem development & structure', color: 'from-amber-500 to-orange-500' },
        { percent: '2%', width: 2, label: 'Protection fund', color: 'from-green-500 to-emerald-500' }
      ],
      footer: 'Everything is managed through verifiable smart contracts on the blockchain.',
      cta: 'View contract on Polygonscan',
      contractUrl: 'https://polygonscan.com/address/0x0000000000000000000000000000000000000000'
    },
    es: {
      badge: 'FONDOS NFT',
      title: 'Cómo se',
      titleHighlight: 'utilizan los fondos',
      items: [
        { percent: '50%', width: 50, label: 'Liquidez', color: 'from-cyan-500 to-blue-500' },
        { percent: '26,5%', width: 26.5, label: 'Desarrollo red comercial', color: 'from-purple-500 to-pink-500' },
        { percent: '21,5%', width: 21.5, label: 'Desarrollo y estructura ecosistema', color: 'from-amber-500 to-orange-500' },
        { percent: '2%', width: 2, label: 'Fondo de protección', color: 'from-green-500 to-emerald-500' }
      ],
      footer: 'Todo está gestionado mediante smart contracts verificables en blockchain.',
      cta: 'Ver contrato en Polygonscan',
      contractUrl: 'https://polygonscan.com/address/0x0000000000000000000000000000000000000000'
    },
    fr: {
      badge: 'FONDS NFT',
      title: 'Comment les fonds',
      titleHighlight: 'sont utilisés',
      items: [
        { percent: '50%', width: 50, label: 'Liquidité', color: 'from-cyan-500 to-blue-500' },
        { percent: '26,5%', width: 26.5, label: 'Développement réseau commercial', color: 'from-purple-500 to-pink-500' },
        { percent: '21,5%', width: 21.5, label: "Développement et structure de l'écosystème", color: 'from-amber-500 to-orange-500' },
        { percent: '2%', width: 2, label: 'Fonds de protection', color: 'from-green-500 to-emerald-500' }
      ],
      footer: 'Tout est géré via des smart contracts vérifiables sur la blockchain.',
      cta: 'Voir le contrat sur Polygonscan',
      contractUrl: 'https://polygonscan.com/address/0x0000000000000000000000000000000000000000'
    },
    de: {
      badge: 'NFT MITTEL',
      title: 'Wie die Mittel',
      titleHighlight: 'verwendet werden',
      items: [
        { percent: '50%', width: 50, label: 'Liquidität', color: 'from-cyan-500 to-blue-500' },
        { percent: '26,5%', width: 26.5, label: 'Entwicklung Handelsnetzwerk', color: 'from-purple-500 to-pink-500' },
        { percent: '21,5%', width: 21.5, label: 'Ökosystem-Entwicklung & Struktur', color: 'from-amber-500 to-orange-500' },
        { percent: '2%', width: 2, label: 'Schutzfonds', color: 'from-green-500 to-emerald-500' }
      ],
      footer: 'Alles wird über verifizierbare Smart Contracts auf der Blockchain verwaltet.',
      cta: 'Vertrag auf Polygonscan ansehen',
      contractUrl: 'https://polygonscan.com/address/0x0000000000000000000000000000000000000000'
    },
    ru: {
      badge: 'ФОНДЫ NFT',
      title: 'Как используются',
      titleHighlight: 'средства',
      items: [
        { percent: '50%', width: 50, label: 'Ликвидность', color: 'from-cyan-500 to-blue-500' },
        { percent: '26,5%', width: 26.5, label: 'Развитие коммерческой сети', color: 'from-purple-500 to-pink-500' },
        { percent: '21,5%', width: 21.5, label: 'Развитие и структура экосистемы', color: 'from-amber-500 to-orange-500' },
        { percent: '2%', width: 2, label: 'Защитный фонд', color: 'from-green-500 to-emerald-500' }
      ],
      footer: 'Всё управляется через проверяемые смарт-контракты на блокчейне.',
      cta: 'Посмотреть контракт на Polygonscan',
      contractUrl: 'https://polygonscan.com/address/0x0000000000000000000000000000000000000000'
    },
    zh: {
      badge: 'NFT资金',
      title: '资金',
      titleHighlight: '如何使用',
      items: [
        { percent: '50%', width: 50, label: '流动性', color: 'from-cyan-500 to-blue-500' },
        { percent: '26.5%', width: 26.5, label: '商业网络发展', color: 'from-purple-500 to-pink-500' },
        { percent: '21.5%', width: 21.5, label: '生态系统开发与结构', color: 'from-amber-500 to-orange-500' },
        { percent: '2%', width: 2, label: '保护基金', color: 'from-green-500 to-emerald-500' }
      ],
      footer: '一切都通过区块链上可验证的智能合约进行管理。',
      cta: '在Polygonscan上查看合约',
      contractUrl: 'https://polygonscan.com/address/0x0000000000000000000000000000000000000000'
    }
  };

  const t = content[language] || content.en;

  return (
    <section id="distribuzione-fondi" className="py-20 md:py-32 relative" data-testid="distribuzione-fondi-section">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-cyan-400 text-xs font-mono tracking-widest mb-6">
            <PieChart className="w-4 h-4" />
            {t.badge}
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            <span className="text-white">{t.title} </span>
            <span className="gradient-text">{t.titleHighlight}</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-8 border border-white/10"
        >
          {/* Distribution Items */}
          <div className="space-y-4 mb-8">
            {t.items.map((item, index) => {
              // Separa il numero dalla percentuale
              const numValue = item.percent.replace('%', '').replace(',', '.');
              const displayNum = item.percent.replace('%', '');
              const isLongNum = displayNum.includes(',') || displayNum.includes('.');
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className={`w-18 h-18 min-w-[72px] min-h-[72px] rounded-xl bg-gradient-to-br ${item.color} flex flex-col items-center justify-center flex-shrink-0 p-2`}>
                    <span className={`font-heading font-bold text-white leading-none ${isLongNum ? 'text-lg' : 'text-2xl'}`}>
                      {displayNum}
                    </span>
                    <span className={`text-white font-bold ${isLongNum ? 'text-sm' : 'text-base'}`}>%</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="text-white font-medium">{item.label}</span>
                    </div>
                    <div className="mt-2 h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.width}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className={`h-full bg-gradient-to-r ${item.color} rounded-full`}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          
          {/* Footer */}
          <div className="pt-6 border-t border-white/10 text-center">
            <p className="text-slate-400 mb-4">{t.footer}</p>
            <a
              href={t.contractUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              {t.cta}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DistribuzioneFondi;
