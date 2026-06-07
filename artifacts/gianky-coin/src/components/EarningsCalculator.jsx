import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Coins, TrendingUp, Sparkles, Rocket, Crown, Zap, ArrowRight, RefreshCw } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { usePolPrice } from '@/components/PolPriceContext';

// Prezzo fisso GKY in POL
const GKY_PRICE_POL = 0.005;

// Componente moneta singola per l'esplosione
const CoinParticle = ({ delay, startX, startY, endX, endY, rotation, scale, duration }) => (
  <motion.div
    className="absolute pointer-events-none"
    style={{ left: startX, top: startY }}
    initial={{ opacity: 0, scale: 0, x: 0, y: 0, rotate: 0 }}
    animate={{
      opacity: [0, 1, 1, 1, 0],
      scale: [0, scale, scale, scale * 0.8, 0],
      x: endX,
      y: endY,
      rotate: rotation,
    }}
    transition={{ 
      duration: duration, 
      delay: delay, 
      ease: [0.25, 0.46, 0.45, 0.94]
    }}
  >
    <div className="relative">
      {/* Moneta con effetto 3D */}
      <div 
        className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-amber-300 via-yellow-400 to-amber-500 shadow-lg flex items-center justify-center border-2 border-amber-300"
        style={{ 
          boxShadow: '0 0 20px rgba(251, 191, 36, 0.6), inset 0 2px 4px rgba(255,255,255,0.4)'
        }}
      >
        <span className="text-amber-800 font-black text-xs md:text-sm">G</span>
      </div>
      {/* Sparkle effect */}
      <motion.div
        className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full"
        animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
        transition={{ duration: 0.5, repeat: Infinity, delay: delay }}
      />
    </div>
  </motion.div>
);

// Componente stella/sparkle
const SparkleParticle = ({ delay, x, y, color }) => (
  <motion.div
    className="absolute pointer-events-none"
    style={{ left: x, top: y }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0, 1, 0],
      scale: [0, 1.5, 0],
      rotate: [0, 180],
    }}
    transition={{ duration: 0.8, delay }}
  >
    <Sparkles className={`w-6 h-6 ${color}`} />
  </motion.div>
);

// Componente esplosione di monete SPETTACOLARE
const CoinExplosion = ({ isActive }) => {
  if (!isActive) return null;

  // Genera molte monete con traiettorie diverse
  const coins = Array.from({ length: 50 }, (_, i) => {
    const angle = (i / 50) * 360 + Math.random() * 30;
    const distance = 200 + Math.random() * 400;
    const startX = '50%';
    const startY = '50%';
    
    return {
      id: i,
      delay: Math.random() * 0.3,
      startX,
      startY,
      endX: Math.cos(angle * (Math.PI / 180)) * distance,
      endY: Math.sin(angle * (Math.PI / 180)) * distance - 100, // bias verso l'alto
      rotation: Math.random() * 1080 - 540,
      scale: 0.5 + Math.random() * 1,
      duration: 1.5 + Math.random() * 1,
    };
  });

  // Genera sparkles
  const sparkles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    delay: Math.random() * 0.5,
    x: `${20 + Math.random() * 60}%`,
    y: `${20 + Math.random() * 60}%`,
    color: ['text-cyan-400', 'text-amber-400', 'text-purple-400', 'text-green-400'][Math.floor(Math.random() * 4)],
  }));

  // Coriandoli colorati
  const confetti = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    delay: Math.random() * 0.4,
    x: Math.random() * 100,
    color: ['bg-cyan-400', 'bg-amber-400', 'bg-purple-400', 'bg-green-400', 'bg-pink-400', 'bg-blue-400'][Math.floor(Math.random() * 6)],
    size: 4 + Math.random() * 8,
    duration: 2 + Math.random() * 1,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Sfondo flash */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-amber-500/20 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.5, 0] }}
        transition={{ duration: 0.5 }}
      />

      {/* Monete che esplodono dal centro */}
      {coins.map((coin) => (
        <CoinParticle key={coin.id} {...coin} />
      ))}

      {/* Sparkles */}
      {sparkles.map((sparkle) => (
        <SparkleParticle key={`sparkle-${sparkle.id}`} {...sparkle} />
      ))}

      {/* Coriandoli che cadono */}
      {confetti.map((c) => (
        <motion.div
          key={`confetti-${c.id}`}
          className={`absolute ${c.color} rounded-sm`}
          style={{ 
            left: `${c.x}%`, 
            top: '-20px',
            width: c.size,
            height: c.size * 1.5,
          }}
          initial={{ y: -20, opacity: 0, rotate: 0 }}
          animate={{ 
            y: window.innerHeight + 100,
            opacity: [0, 1, 1, 0],
            rotate: Math.random() * 720 - 360,
            x: Math.sin(c.id) * 100,
          }}
          transition={{ 
            duration: c.duration, 
            delay: c.delay,
            ease: 'easeIn'
          }}
        />
      ))}

      {/* Testo celebrativo */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: [0, 1, 1, 0], scale: [0.5, 1.2, 1, 0.8] }}
        transition={{ duration: 1.5, delay: 0.2 }}
      >
        <div className="text-center">
          <motion.div
            className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400"
            style={{ textShadow: '0 0 40px rgba(251, 191, 36, 0.8)' }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.3, repeat: 3 }}
          >
            🎉 WOW! 🎉
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

// Componente numero animato che conta
const AnimatedNumber = ({ value, prefix = '', suffix = '', decimals = 2, duration = 1 }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const prevValue = useRef(0);

  useEffect(() => {
    const startValue = prevValue.current;
    const endValue = value;
    const startTime = Date.now();
    const durationMs = duration * 1000;

    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / durationMs, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      const currentValue = startValue + (endValue - startValue) * easeProgress;
      
      setDisplayValue(currentValue);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        prevValue.current = endValue;
      }
    };

    requestAnimationFrame(animate);
  }, [value, duration]);

  return (
    <span>
      {prefix}{displayValue.toLocaleString('it-IT', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}{suffix}
    </span>
  );
};

// Componente card risultato con glow
const ResultCard = ({ icon: Icon, label, value, prefix, suffix, color, delay, decimals = 2 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.5, delay }}
    className={`relative p-4 rounded-2xl bg-gradient-to-br ${color} overflow-hidden`}
  >
    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
    <div className="relative z-10">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-5 h-5 text-white/80" />
        <span className="text-white/70 text-xs uppercase tracking-wider">{label}</span>
      </div>
      <div className="text-2xl md:text-3xl font-black text-white">
        <AnimatedNumber value={value} prefix={prefix} suffix={suffix} decimals={decimals} />
      </div>
    </div>
  </motion.div>
);

// Componente proiezione guadagni
const EarningsProjection = ({ months, multiplier, gkyAmount, polValue, eurPrice, usdPrice, delay, t }) => {
  const futureGKY = gkyAmount * multiplier;
  const futurePOL = futureGKY * GKY_PRICE_POL;
  const futureEUR = futurePOL * eurPrice;
  const profit = futureGKY - gkyAmount;
  const profitPercent = ((multiplier - 1) * 100).toFixed(0);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
      className="relative p-4 rounded-2xl bg-white/5 border border-white/10 overflow-hidden group hover:border-cyan-500/50 transition-all"
    >
      <div className="absolute top-0 right-0 px-3 py-1 bg-green-500/20 rounded-bl-xl">
        <span className="text-green-400 text-xs font-bold">+{profitPercent}%</span>
      </div>
      
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
          <span className="text-white font-bold text-sm">{months}M</span>
        </div>
        <div>
          <h4 className="text-white font-bold">{t.after} {months} {months === 1 ? t.month : t.months}</h4>
          <p className="text-slate-500 text-xs">{t.compoundReturn}</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-slate-400 text-sm">{t.tokenGKY}:</span>
          <span className="text-white font-bold">
            <AnimatedNumber value={futureGKY} decimals={0} duration={0.8} />
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-400 text-sm">{t.valuePOL}:</span>
          <span className="text-cyan-400 font-bold">
            <AnimatedNumber value={futurePOL} decimals={2} duration={0.8} />
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-400 text-sm">{t.valueEUR}:</span>
          <span className="text-green-400 font-bold">
            €<AnimatedNumber value={futureEUR} decimals={2} duration={0.8} />
          </span>
        </div>
        <div className="flex justify-between items-center pt-2 border-t border-white/10">
          <span className="text-amber-400 text-sm font-medium">{t.profit}:</span>
          <span className="text-amber-400 font-black">
            +<AnimatedNumber value={profit} decimals={0} duration={0.8} /> GKY
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const EarningsCalculator = () => {
  const { language } = useLanguage();
  const { eurPrice, usdPrice, loading, refreshing, refreshPrice } = usePolPrice();
  const [gkyAmount, setGkyAmount] = useState('');
  const [isCalculating, setIsCalculating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [explosion, setExplosion] = useState(false);

  const content = {
    it: {
      badge: 'CALCOLATORE',
      title: 'CALCOLA I TUOI',
      titleHighlight: 'GUADAGNI',
      subtitle: 'Scopri quanto puoi guadagnare con GiankyCoin. Inserisci l\'importo e lasciati sorprendere!',
      inputLabel: 'Inserisci importo GKY',
      inputPlaceholder: '10000',
      calculate: 'CALCOLA GUADAGNI',
      recalculate: 'RICALCOLA',
      fixedPrice: 'Prezzo Fisso',
      yourInvestment: 'Il Tuo Investimento',
      liveConversion: 'Conversione Live',
      projections: 'Proiezioni Guadagni',
      projectionsSubtitle: 'Con rendimento fisso del 15% mensile',
      polValue: 'Valore in POL',
      eurValue: 'Valore in EUR',
      usdValue: 'Valore in USD',
      disclaimer: '* Le proiezioni sono basate sul rendimento del 15% mensile. I risultati passati non garantiscono rendimenti futuri.',
      startEarning: 'INIZIA A GUADAGNARE ORA',
      refreshQuote: 'Aggiorna quotazione',
      livePrice: 'Prezzo Live POL',
      after: 'Dopo',
      month: 'Mese',
      months: 'Mesi',
      compoundReturn: 'Rendimento 15% mensile',
      tokenGKY: 'Token GKY',
      valuePOL: 'Valore POL',
      valueEUR: 'Valore EUR',
      profit: 'Profitto',
    },
    en: {
      badge: 'CALCULATOR',
      title: 'CALCULATE YOUR',
      titleHighlight: 'EARNINGS',
      subtitle: 'Discover how much you can earn with GiankyCoin. Enter the amount and be amazed!',
      inputLabel: 'Enter GKY amount',
      inputPlaceholder: '10000',
      calculate: 'CALCULATE EARNINGS',
      recalculate: 'RECALCULATE',
      fixedPrice: 'Fixed Price',
      yourInvestment: 'Your Investment',
      liveConversion: 'Live Conversion',
      projections: 'Earnings Projections',
      projectionsSubtitle: 'With fixed 15% monthly returns',
      polValue: 'Value in POL',
      eurValue: 'Value in EUR',
      usdValue: 'Value in USD',
      disclaimer: '* Projections are based on 15% monthly returns. Past results do not guarantee future returns.',
      startEarning: 'START EARNING NOW',
      refreshQuote: 'Refresh quote',
      livePrice: 'Live POL Price',
      after: 'After',
      month: 'Month',
      months: 'Months',
      compoundReturn: '15% monthly return',
      tokenGKY: 'GKY Tokens',
      valuePOL: 'POL Value',
      valueEUR: 'EUR Value',
      profit: 'Profit',
    },
    es: {
      badge: 'CALCULADORA',
      title: 'CALCULA TUS',
      titleHighlight: 'GANANCIAS',
      subtitle: 'Descubre cuánto puedes ganar con GiankyCoin. ¡Introduce el importe y sorpréndete!',
      inputLabel: 'Introduce cantidad GKY',
      inputPlaceholder: '10000',
      calculate: 'CALCULAR GANANCIAS',
      recalculate: 'RECALCULAR',
      fixedPrice: 'Precio Fijo',
      yourInvestment: 'Tu Inversión',
      liveConversion: 'Conversión en Vivo',
      projections: 'Proyecciones de Ganancias',
      projectionsSubtitle: 'Con rendimiento fijo del 15% mensual',
      polValue: 'Valor en POL',
      eurValue: 'Valor en EUR',
      usdValue: 'Valor en USD',
      disclaimer: '* Las proyecciones se basan en un rendimiento mensual del 15%. Los resultados pasados no garantizan rendimientos futuros.',
      startEarning: 'EMPIEZA A GANAR AHORA',
      refreshQuote: 'Actualizar cotización',
      livePrice: 'Precio POL en Vivo',
      after: 'Después de',
      month: 'Mes',
      months: 'Meses',
      compoundReturn: 'Rendimiento 15% mensual',
      tokenGKY: 'Tokens GKY',
      valuePOL: 'Valor POL',
      valueEUR: 'Valor EUR',
      profit: 'Ganancia',
    },
    fr: {
      badge: 'CALCULATEUR',
      title: 'CALCULEZ VOS',
      titleHighlight: 'GAINS',
      subtitle: 'Découvrez combien vous pouvez gagner avec GiankyCoin. Entrez le montant et laissez-vous surprendre!',
      inputLabel: 'Entrez le montant GKY',
      inputPlaceholder: '10000',
      calculate: 'CALCULER LES GAINS',
      recalculate: 'RECALCULER',
      fixedPrice: 'Prix Fixe',
      yourInvestment: 'Votre Investissement',
      liveConversion: 'Conversion en Direct',
      projections: 'Projections des Gains',
      projectionsSubtitle: 'Avec un rendement fixe de 15% mensuel',
      polValue: 'Valeur en POL',
      eurValue: 'Valeur en EUR',
      usdValue: 'Valeur en USD',
      disclaimer: '* Les projections sont basées sur un rendement mensuel de 15%. Les résultats passés ne garantissent pas les rendements futurs.',
      startEarning: 'COMMENCEZ À GAGNER',
      refreshQuote: 'Actualiser le cours',
      livePrice: 'Prix POL en Direct',
      after: 'Après',
      month: 'Mois',
      months: 'Mois',
      compoundReturn: 'Rendement 15% mensuel',
      tokenGKY: 'Tokens GKY',
      valuePOL: 'Valeur POL',
      valueEUR: 'Valeur EUR',
      profit: 'Profit',
    },
    de: {
      badge: 'RECHNER',
      title: 'BERECHNEN SIE IHRE',
      titleHighlight: 'GEWINNE',
      subtitle: 'Entdecken Sie, wie viel Sie mit GiankyCoin verdienen können. Geben Sie den Betrag ein und lassen Sie sich überraschen!',
      inputLabel: 'GKY Betrag eingeben',
      inputPlaceholder: '10000',
      calculate: 'GEWINNE BERECHNEN',
      recalculate: 'NEU BERECHNEN',
      fixedPrice: 'Festpreis',
      yourInvestment: 'Ihre Investition',
      liveConversion: 'Live Umrechnung',
      projections: 'Gewinnprognosen',
      projectionsSubtitle: 'Mit fester monatlicher Rendite von 15%',
      polValue: 'Wert in POL',
      eurValue: 'Wert in EUR',
      usdValue: 'Wert in USD',
      disclaimer: '* Die Prognosen basieren auf einer monatlichen Rendite von 15%. Vergangene Ergebnisse garantieren keine zukünftigen Renditen.',
      startEarning: 'JETZT VERDIENEN',
      refreshQuote: 'Kurs aktualisieren',
      livePrice: 'Live POL Preis',
      after: 'Nach',
      month: 'Monat',
      months: 'Monaten',
      compoundReturn: '15% monatliche Rendite',
      tokenGKY: 'GKY Tokens',
      valuePOL: 'POL Wert',
      valueEUR: 'EUR Wert',
      profit: 'Gewinn',
    },
    ru: {
      badge: 'КАЛЬКУЛЯТОР',
      title: 'РАССЧИТАЙТЕ СВОЙ',
      titleHighlight: 'ДОХОД',
      subtitle: 'Узнайте, сколько вы можете заработать с GiankyCoin. Введите сумму и удивитесь!',
      inputLabel: 'Введите количество GKY',
      inputPlaceholder: '10000',
      calculate: 'РАССЧИТАТЬ ДОХОД',
      recalculate: 'ПЕРЕСЧИТАТЬ',
      fixedPrice: 'Фиксированная Цена',
      yourInvestment: 'Ваша Инвестиция',
      liveConversion: 'Конвертация в Реальном Времени',
      projections: 'Прогноз Доходов',
      projectionsSubtitle: 'С фиксированной доходностью 15% в месяц',
      polValue: 'Стоимость в POL',
      eurValue: 'Стоимость в EUR',
      usdValue: 'Стоимость в USD',
      disclaimer: '* Прогнозы основаны на ежемесячной доходности 15%. Прошлые результаты не гарантируют будущую доходность.',
      startEarning: 'НАЧАТЬ ЗАРАБАТЫВАТЬ',
      refreshQuote: 'Обновить курс',
      livePrice: 'Курс POL',
      after: 'Через',
      month: 'Месяц',
      months: 'Месяцев',
      compoundReturn: '15% месячная доходность',
      tokenGKY: 'Токены GKY',
      valuePOL: 'Стоимость POL',
      valueEUR: 'Стоимость EUR',
      profit: 'Прибыль',
    },
    zh: {
      badge: '计算器',
      title: '计算您的',
      titleHighlight: '收益',
      subtitle: '了解您可以通过 GiankyCoin 赚取多少。输入金额，惊喜等待着您！',
      inputLabel: '输入 GKY 数量',
      inputPlaceholder: '10000',
      calculate: '计算收益',
      recalculate: '重新计算',
      fixedPrice: '固定价格',
      yourInvestment: '您的投资',
      liveConversion: '实时转换',
      projections: '收益预测',
      projectionsSubtitle: '每月固定 15% 回报',
      polValue: 'POL 价值',
      eurValue: 'EUR 价值',
      usdValue: 'USD 价值',
      disclaimer: '* 预测基于每月 15% 的回报率。过去的结果不保证未来的回报。',
      startEarning: '立即开始赚钱',
      refreshQuote: '刷新报价',
      livePrice: 'POL 实时价格',
      after: '',
      month: '个月后',
      months: '个月后',
      compoundReturn: '每月 15% 回报',
      tokenGKY: 'GKY 代币',
      valuePOL: 'POL 价值',
      valueEUR: 'EUR 价值',
      profit: '利润',
    }
  };

  const t = content[language] || content.it;

  const handleCalculate = () => {
    if (!gkyAmount || isNaN(Number(gkyAmount)) || Number(gkyAmount) <= 0) return;
    
    setIsCalculating(true);
    setExplosion(true);
    
    setTimeout(() => {
      setShowResults(true);
      setIsCalculating(false);
    }, 800);

    // Esplosione dura 3 secondi
    setTimeout(() => setExplosion(false), 3000);
  };

  const handleReset = () => {
    setShowResults(false);
    setGkyAmount('');
  };

  const numGKY = Number(gkyAmount) || 0;
  const polValue = numGKY * GKY_PRICE_POL;
  const eurValue = polValue * (eurPrice || 0);
  const usdValue = polValue * (usdPrice || 0);

  // Multipliers per mese (15% semplice - NON composto)
  // Dopo N mesi: capitale + (capitale * 0.15 * N) = capitale * (1 + 0.15 * N)
  const month1 = 1 + (0.15 * 1);   // 1.15 = +15%
  const month6 = 1 + (0.15 * 6);   // 1.90 = +90%
  const month12 = 1 + (0.15 * 12); // 2.80 = +180%

  return (
    <section id="calculator" className="py-16 md:py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-cyan-400 text-xs font-mono tracking-widest mb-4">
            <Calculator className="w-4 h-4" />
            {t.badge}
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight uppercase mb-3">
            {t.title} <span className="gradient-text">{t.titleHighlight}</span>
          </h2>
          <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Fixed Price Badge + Live POL Price */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8"
        >
          {/* GKY Fixed Price */}
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30">
            <Coins className="w-6 h-6 text-amber-400" />
            <div>
              <span className="text-slate-400 text-xs uppercase block">{t.fixedPrice}</span>
              <span className="text-amber-400 font-black text-xl">1 GKY = 0.005 POL</span>
            </div>
          </div>

          {/* Live POL Price with Refresh */}
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30">
            <TrendingUp className="w-5 h-5 text-cyan-400" />
            <div>
              <span className="text-slate-400 text-xs uppercase block">{t.livePrice}</span>
              <span className="text-cyan-400 font-black text-lg">
                {loading ? '...' : `€${eurPrice?.toFixed(4) || '0'} / $${usdPrice?.toFixed(4) || '0'}`}
              </span>
            </div>
            <button
              onClick={refreshPrice}
              disabled={refreshing}
              className="p-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 transition-colors disabled:opacity-50"
              title={t.refreshQuote}
            >
              <RefreshCw className={`w-4 h-4 text-cyan-400 ${refreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </motion.div>

        {/* Calculator Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mb-8"
        >
          <div className="glass rounded-3xl p-6 md:p-8">
            <label className="block text-slate-400 text-sm mb-3 uppercase tracking-wider">
              {t.inputLabel}
            </label>
            <div className="relative">
              <input
                type="number"
                value={gkyAmount}
                onChange={(e) => {
                  setGkyAmount(e.target.value);
                  setShowResults(false);
                }}
                placeholder={t.inputPlaceholder}
                className="w-full bg-white/5 border border-white/20 rounded-2xl px-6 py-5 text-3xl md:text-4xl font-black text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                data-testid="gky-input"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-cyan-400 font-bold text-xl">
                GKY
              </div>
            </div>

            {/* Calculate Button */}
            <div className="relative mt-6">
              <motion.button
                onClick={showResults ? handleReset : handleCalculate}
                disabled={!gkyAmount || isCalculating}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 rounded-2xl font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-3 transition-all ${
                  showResults
                    ? 'bg-white/10 text-white border border-white/20 hover:border-cyan-500/50'
                    : 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-[0_0_30px_rgba(0,240,255,0.3)] hover:shadow-[0_0_50px_rgba(0,240,255,0.5)]'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
                data-testid="calculate-btn"
              >
                {isCalculating ? (
                  <RefreshCw className="w-5 h-5 animate-spin" />
                ) : showResults ? (
                  <>
                    <RefreshCw className="w-5 h-5" />
                    {t.recalculate}
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    {t.calculate}
                    <Rocket className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* COIN EXPLOSION - Full Screen */}
        <CoinExplosion isActive={explosion} />

        {/* Results Section */}
        <AnimatePresence>
          {showResults && numGKY > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-8"
            >
              {/* Investment Summary */}
              <div>
                <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-cyan-400" />
                  {t.yourInvestment}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <ResultCard
                    icon={Coins}
                    label={t.polValue}
                    value={polValue}
                    suffix=" POL"
                    color="from-cyan-500/30 to-blue-500/30"
                    delay={0}
                  />
                  <ResultCard
                    icon={TrendingUp}
                    label={t.eurValue}
                    value={eurValue}
                    prefix="€"
                    color="from-green-500/30 to-emerald-500/30"
                    delay={0.1}
                  />
                  <ResultCard
                    icon={Crown}
                    label={t.usdValue}
                    value={usdValue}
                    prefix="$"
                    color="from-amber-500/30 to-orange-500/30"
                    delay={0.2}
                  />
                </div>
              </div>

              {/* Earnings Projections */}
              <div>
                <h3 className="text-white font-bold text-lg mb-2 flex items-center gap-2">
                  <Rocket className="w-5 h-5 text-purple-400" />
                  {t.projections}
                </h3>
                <p className="text-slate-500 text-sm mb-4">{t.projectionsSubtitle}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <EarningsProjection
                    months={1}
                    multiplier={month1}
                    gkyAmount={numGKY}
                    polValue={polValue}
                    eurPrice={eurPrice || 0}
                    usdPrice={usdPrice || 0}
                    delay={0.3}
                    t={t}
                  />
                  <EarningsProjection
                    months={6}
                    multiplier={month6}
                    gkyAmount={numGKY}
                    polValue={polValue}
                    eurPrice={eurPrice || 0}
                    usdPrice={usdPrice || 0}
                    delay={0.4}
                    t={t}
                  />
                  <EarningsProjection
                    months={12}
                    multiplier={month12}
                    gkyAmount={numGKY}
                    polValue={polValue}
                    eurPrice={eurPrice || 0}
                    usdPrice={usdPrice || 0}
                    delay={0.5}
                    t={t}
                  />
                </div>
              </div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-center pt-4"
              >
                <a
                  href="/piattaforma-minting"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-full uppercase tracking-wider text-sm shadow-[0_0_30px_rgba(0,240,255,0.4)] hover:shadow-[0_0_50px_rgba(0,240,255,0.6)] transition-all"
                >
                  <Sparkles className="w-5 h-5" />
                  {t.startEarning}
                  <ArrowRight className="w-5 h-5" />
                </a>
              </motion.div>

              {/* Disclaimer */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-slate-600 text-xs text-center"
              >
                {t.disclaimer}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default EarningsCalculator;
