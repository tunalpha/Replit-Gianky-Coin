import { useState } from 'react';
import { motion } from 'framer-motion';
import { Coins, Lock, TrendingUp, Clock, Copy, Check } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const NFT_CONTRACT = '0x106fb804D03D4EA95CaeFA45C3215b57D8E6835D';
const STAKING_CONTRACT = '0xD38A9fF129788ff31B0b050ccBC34016397a10b4';
const GKY_TOKEN_CONTRACT = '0x64487539aa9d61Bdc652A5755bbe30Ee96cFcEb2';

// Piani reali dal contratto di staking on-chain (Polygon)
const stakingPlans = [
  { name: 'Bronze', lockDays: 90,  apy: 10, color: 'from-cyan-500 to-cyan-400' },
  { name: 'Silver', lockDays: 180, apy: 12, color: 'from-purple-500 to-cyan-400' },
  { name: 'Gold',   lockDays: 365, apy: 15, color: 'from-amber-500 to-orange-400' },
];

const CopyButton = ({ text, label }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Tronca l'indirizzo per mobile: 0x106f...b57D
  const truncateAddress = (addr) => {
    if (!addr || addr.length < 20) return addr;
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <div className="flex items-center gap-2 p-3 glass rounded-xl">
      <span className="text-slate-400 text-xs whitespace-nowrap">{label}:</span>
      <code className="text-cyan-400 text-xs font-mono flex-1">
        <span className="hidden sm:inline">{text}</span>
        <span className="sm:hidden">{truncateAddress(text)}</span>
      </code>
      <button
        onClick={handleCopy}
        className="p-2 hover:bg-cyan-500/20 rounded-lg transition-colors flex-shrink-0"
        data-testid={`copy-${label.toLowerCase().replace(' ', '-')}`}
      >
        {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
      </button>
    </div>
  );
};

const Staking = () => {
  const { t, language } = useLanguage();

  const texts = {
    it: {
      badge: 'STAKING NFT',
      title: 'METTI IN',
      titleHighlight: 'STAKING',
      subtitle: 'Blocca il tuo NFT e ricevi ricompense proporzionali al periodo di staking. Più tempo blocchi, più guadagni!',
      apy: 'Rendimento',
      lockPeriod: 'Durata Lock',
      days: 'giorni',
      stakeNow: 'Stake Now',
      contracts: 'SMART CONTRACTS',
      nftContract: 'Contratto NFT',
      stakingContract: 'Contratto Staking',
      tokenContract: 'Contratto GKY',
      features: [
        { icon: Coins, title: 'Token GKY', desc: 'Pagamento servizi in token GKY' },
        { icon: Lock, title: 'Sicuro', desc: 'Smart contract verificato e auditato' },
        { icon: TrendingUp, title: 'Servizi', desc: 'Accesso a servizi digitali esclusivi' },
        { icon: Clock, title: 'Flessibile', desc: 'Scegli il piano adatto a te' },
      ]
    },
    en: {
      badge: 'NFT STAKING',
      title: 'START',
      titleHighlight: 'STAKING',
      subtitle: 'Lock your NFT and receive rewards proportional to the staking period. The longer you lock, the more you earn!',
      apy: 'Yield',
      lockPeriod: 'Lock Period',
      days: 'days',
      stakeNow: 'Stake Now',
      contracts: 'SMART CONTRACTS',
      nftContract: 'NFT Contract',
      stakingContract: 'Staking Contract',
      tokenContract: 'GKY Contract',
      features: [
        { icon: Coins, title: 'GKY Token', desc: 'Service payments in GKY tokens' },
        { icon: Lock, title: 'Secure', desc: 'Verified and audited smart contract' },
        { icon: TrendingUp, title: 'Services', desc: 'Access to exclusive digital services' },
        { icon: Clock, title: 'Flexible', desc: 'Choose the plan that suits you' },
      ]
    },
    es: {
      badge: 'STAKING NFT',
      title: 'INICIA',
      titleHighlight: 'STAKING',
      subtitle: 'Bloquea tu NFT y recibe recompensas proporcionales al período de staking. ¡Más tiempo bloqueas, más ganas!',
      apy: 'Rendimiento',
      lockPeriod: 'Período Lock',
      days: 'días',
      stakeNow: 'Stake Ahora',
      contracts: 'SMART CONTRACTS',
      nftContract: 'Contrato NFT',
      stakingContract: 'Contrato Staking',
      tokenContract: 'Contrato GKY',
      features: [
        { icon: Coins, title: 'Token GKY', desc: 'Pago de servicios en tokens GKY' },
        { icon: Lock, title: 'Seguro', desc: 'Smart contract verificado y auditado' },
        { icon: TrendingUp, title: 'Servicios', desc: 'Acceso a servicios digitales exclusivos' },
        { icon: Clock, title: 'Flexible', desc: 'Elige el plan que te conviene' },
      ]
    },
    fr: {
      badge: 'STAKING NFT',
      title: 'COMMENCER LE',
      titleHighlight: 'STAKING',
      subtitle: 'Bloquez votre NFT et recevez des récompenses proportionnelles à la période de staking. Plus vous bloquez, plus vous gagnez!',
      apy: 'Rendement',
      lockPeriod: 'Période Lock',
      days: 'jours',
      stakeNow: 'Stake Maintenant',
      contracts: 'SMART CONTRACTS',
      nftContract: 'Contrat NFT',
      stakingContract: 'Contrat Staking',
      tokenContract: 'Contrat GKY',
      features: [
        { icon: Coins, title: 'Token GKY', desc: 'Paiement services en tokens GKY' },
        { icon: Lock, title: 'Sécurisé', desc: 'Smart contract vérifié et audité' },
        { icon: TrendingUp, title: 'Services', desc: 'Accès aux services numériques exclusifs' },
        { icon: Clock, title: 'Flexible', desc: 'Choisissez le plan qui vous convient' },
      ]
    },
    de: {
      badge: 'NFT STAKING',
      title: 'STARTEN SIE',
      titleHighlight: 'STAKING',
      subtitle: 'Sperren Sie Ihr NFT und erhalten Sie Belohnungen proportional zur Staking-Periode. Je länger Sie sperren, desto mehr verdienen Sie!',
      apy: 'Rendite',
      lockPeriod: 'Lock-Periode',
      days: 'Tage',
      stakeNow: 'Jetzt Staken',
      contracts: 'SMART CONTRACTS',
      nftContract: 'NFT Vertrag',
      stakingContract: 'Staking Vertrag',
      tokenContract: 'GKY Vertrag',
      features: [
        { icon: Coins, title: 'GKY Token', desc: 'Servicezahlung in GKY Tokens' },
        { icon: Lock, title: 'Sicher', desc: 'Verifizierter und geprüfter Smart Contract' },
        { icon: TrendingUp, title: 'Dienste', desc: 'Zugang zu exklusiven digitalen Diensten' },
        { icon: Clock, title: 'Flexibel', desc: 'Wählen Sie den passenden Plan' },
      ]
    },
    ru: {
      badge: 'СТЕЙКИНГ NFT',
      title: 'НАЧНИТЕ',
      titleHighlight: 'СТЕЙКИНГ',
      subtitle: 'Заблокируйте NFT и получайте награды пропорционально периоду стейкинга. Чем дольше блокируете, тем больше зарабатываете!',
      apy: 'Доходность',
      lockPeriod: 'Период Блокировки',
      days: 'дней',
      stakeNow: 'Стейкать Сейчас',
      contracts: 'СМАРТ КОНТРАКТЫ',
      nftContract: 'Контракт NFT',
      stakingContract: 'Контракт Стейкинга',
      tokenContract: 'Контракт GKY',
      features: [
        { icon: Coins, title: 'Токен GKY', desc: 'Оплата услуг в токенах GKY' },
        { icon: Lock, title: 'Безопасно', desc: 'Проверенный и аудированный смарт-контракт' },
        { icon: TrendingUp, title: 'Услуги', desc: 'Доступ к эксклюзивным цифровым услугам' },
        { icon: Clock, title: 'Гибко', desc: 'Выберите подходящий план' },
      ]
    },
    zh: {
      badge: 'NFT质押',
      title: '开始',
      titleHighlight: '质押',
      subtitle: '锁定您的NFT并获得与质押期成比例的奖励。锁定时间越长，收益越多！',
      apy: '收益率',
      lockPeriod: '锁定期',
      days: '天',
      stakeNow: '立即质押',
      contracts: '智能合约',
      nftContract: 'NFT合约',
      stakingContract: '质押合约',
      tokenContract: 'GKY合约',
      features: [
        { icon: Coins, title: 'GKY代币', desc: '用GKY代币支付服务费' },
        { icon: Lock, title: '安全', desc: '经过验证和审计的智能合约' },
        { icon: TrendingUp, title: '服务', desc: '访问独家数字服务' },
        { icon: Clock, title: '灵活', desc: '选择适合您的计划' },
      ]
    }
  };

  const content = texts[language] || texts.en;

  return (
    <section id="staking" className="py-20 md:py-32 relative overflow-hidden" data-testid="staking-section">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full glass text-cyan-400 text-xs sm:text-sm font-mono tracking-widest mb-6">
            {content.badge}
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight uppercase mb-4 md:mb-6">
            {content.title} <span className="gradient-text">{content.titleHighlight}</span>
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto px-4">
            {content.subtitle}
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {content.features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-2xl p-4 md:p-6 text-center hover:border-cyan-500/30 transition-colors"
            >
              <feature.icon className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
              <h4 className="font-subheading font-bold text-white mb-1">{feature.title}</h4>
              <p className="text-slate-500 text-xs">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Staking Plans */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-12">
          {stakingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="glass rounded-2xl p-6 hover:border-cyan-500/30 transition-all group"
              data-testid={`staking-plan-${plan.name.toLowerCase()}`}
            >
              {/* Plan Header */}
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-4`}>
                <Coins className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="font-heading text-xl font-bold uppercase text-white mb-2">{plan.name}</h3>
              
              {/* APY */}
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-cyan-400 text-3xl font-heading font-black">{plan.apy}%</span>
                <span className="text-slate-500 text-sm">{content.apy}</span>
              </div>
              
              {/* Details */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">{content.lockPeriod}</span>
                  <span className="text-white font-bold">{plan.lockDays} {content.days}</span>
                </div>
              </div>
              
              {/* CTA */}
              <a
                href="/staking-app"
                className="w-full py-3 rounded-full bg-white/5 border border-white/20 text-white font-bold uppercase text-sm tracking-wider flex items-center justify-center gap-2 hover:border-cyan-500 hover:text-cyan-400 transition-all"
              >
                {content.stakeNow}
              </a>
            </motion.div>
          ))}
        </div>

        {/* Smart Contracts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-6 md:p-8"
        >
          <h3 className="font-subheading text-lg font-bold uppercase tracking-wider text-white mb-6 text-center">
            {content.contracts}
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <CopyButton text={NFT_CONTRACT} label={content.nftContract} />
            <CopyButton text={STAKING_CONTRACT} label={content.stakingContract} />
            <CopyButton text={GKY_TOKEN_CONTRACT} label={content.tokenContract} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Staking;
