import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, RefreshCw, Star, Zap } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const Markets = () => {
  const { language } = useLanguage();
  const [marketData, setMarketData] = useState({ pol: null, top_cryptos: [] });
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(null);

  const content = {
    it: {
      badge: 'MERCATI LIVE',
      title: 'CRYPTO',
      titleHighlight: 'MARKETS',
      subtitle: 'Prezzi in tempo reale delle principali criptovalute',
      polHighlight: 'POLYGON (POL)',
      polSubtitle: 'La blockchain su cui operiamo',
      top10: 'TOP 10 CRYPTO',
      price: 'Prezzo',
      change24h: '24h',
      marketCap: 'Market Cap',
      lastUpdate: 'Ultimo aggiornamento',
      loading: 'Caricamento...',
      gkyBanner: {
        badge: '🚀 LISTING IMMINENTE',
        title: 'GKY TOKEN',
        subtitle: 'Il token ufficiale di GiankyCoin',
        price: 'Prezzo Listing',
        priceValue: '0.005 POL',
        cta: 'SCOPRI DI PIÙ',
        features: ['Cashback 10%', 'Accesso Servizi', 'Staking Rewards']
      }
    },
    en: {
      badge: 'LIVE MARKETS',
      title: 'CRYPTO',
      titleHighlight: 'MARKETS',
      subtitle: 'Real-time prices of major cryptocurrencies',
      polHighlight: 'POLYGON (POL)',
      polSubtitle: 'The blockchain we operate on',
      top10: 'TOP 10 CRYPTO',
      price: 'Price',
      change24h: '24h',
      marketCap: 'Market Cap',
      lastUpdate: 'Last update',
      loading: 'Loading...',
      gkyBanner: {
        badge: '🚀 LISTING SOON',
        title: 'GKY TOKEN',
        subtitle: 'The official GiankyCoin token',
        price: 'Listing Price',
        priceValue: '0.005 POL',
        cta: 'LEARN MORE',
        features: ['10% Cashback', 'Service Access', 'Staking Rewards']
      }
    },
    es: {
      badge: 'MERCADOS EN VIVO',
      title: 'CRYPTO',
      titleHighlight: 'MARKETS',
      subtitle: 'Precios en tiempo real de las principales criptomonedas',
      polHighlight: 'POLYGON (POL)',
      polSubtitle: 'La blockchain en la que operamos',
      top10: 'TOP 10 CRYPTO',
      price: 'Precio',
      change24h: '24h',
      marketCap: 'Cap. Mercado',
      lastUpdate: 'Última actualización',
      loading: 'Cargando...',
      gkyBanner: {
        badge: '🚀 LISTING PRÓXIMO',
        title: 'GKY TOKEN',
        subtitle: 'El token oficial de GiankyCoin',
        price: 'Precio de Listing',
        priceValue: '0.005 POL',
        cta: 'SABER MÁS',
        features: ['10% Cashback', 'Acceso Servicios', 'Staking Rewards']
      }
    },
    fr: {
      badge: 'MARCHÉS EN DIRECT',
      title: 'CRYPTO',
      titleHighlight: 'MARKETS',
      subtitle: 'Prix en temps réel des principales cryptomonnaies',
      polHighlight: 'POLYGON (POL)',
      polSubtitle: 'La blockchain sur laquelle nous opérons',
      top10: 'TOP 10 CRYPTO',
      price: 'Prix',
      change24h: '24h',
      marketCap: 'Cap. Marché',
      lastUpdate: 'Dernière mise à jour',
      loading: 'Chargement...',
      gkyBanner: {
        badge: '🚀 LISTING IMMINENT',
        title: 'GKY TOKEN',
        subtitle: 'Le token officiel de GiankyCoin',
        price: 'Prix de Listing',
        priceValue: '0.005 POL',
        cta: 'EN SAVOIR PLUS',
        features: ['10% Cashback', 'Accès Services', 'Staking Rewards']
      }
    },
    de: {
      badge: 'LIVE MÄRKTE',
      title: 'CRYPTO',
      titleHighlight: 'MARKETS',
      subtitle: 'Echtzeit-Preise der wichtigsten Kryptowährungen',
      polHighlight: 'POLYGON (POL)',
      polSubtitle: 'Die Blockchain, auf der wir arbeiten',
      top10: 'TOP 10 CRYPTO',
      price: 'Preis',
      change24h: '24h',
      marketCap: 'Marktkapital.',
      lastUpdate: 'Letztes Update',
      loading: 'Laden...',
      gkyBanner: {
        badge: '🚀 LISTING BALD',
        title: 'GKY TOKEN',
        subtitle: 'Der offizielle GiankyCoin Token',
        price: 'Listing Preis',
        priceValue: '0.005 POL',
        cta: 'MEHR ERFAHREN',
        features: ['10% Cashback', 'Service-Zugang', 'Staking Rewards']
      }
    },
    ru: {
      badge: 'РЫНКИ ОНЛАЙН',
      title: 'КРИПТО',
      titleHighlight: 'РЫНКИ',
      subtitle: 'Цены в реальном времени на основные криптовалюты',
      polHighlight: 'POLYGON (POL)',
      polSubtitle: 'Блокчейн, на котором мы работаем',
      top10: 'ТОП 10 КРИПТО',
      price: 'Цена',
      change24h: '24ч',
      marketCap: 'Капитализация',
      lastUpdate: 'Последнее обновление',
      loading: 'Загрузка...',
      gkyBanner: {
        badge: '🚀 СКОРО ЛИСТИНГ',
        title: 'GKY TOKEN',
        subtitle: 'Официальный токен GiankyCoin',
        price: 'Цена Листинга',
        priceValue: '0.005 POL',
        cta: 'УЗНАТЬ БОЛЬШЕ',
        features: ['10% Кэшбэк', 'Доступ к Услугам', 'Награды за Стейкинг']
      }
    },
    zh: {
      badge: '实时市场',
      title: '加密',
      titleHighlight: '市场',
      subtitle: '主要加密货币的实时价格',
      polHighlight: 'POLYGON (POL)',
      polSubtitle: '我们运营的区块链',
      top10: '前10名加密货币',
      price: '价格',
      change24h: '24小时',
      marketCap: '市值',
      lastUpdate: '最后更新',
      loading: '加载中...',
      gkyBanner: {
        badge: '🚀 即将上市',
        title: 'GKY TOKEN',
        subtitle: 'GiankyCoin官方代币',
        price: '上市价格',
        priceValue: '0.005 POL',
        cta: '了解更多',
        features: ['10%返现', '服务访问', '质押奖励']
      }
    }
  };

  const t = content[language] || content.en;

  // Fallback static data when API fails
  const fallbackCryptos = [
    { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin', current_price_usd: 67500, price_change_percentage_24h: -1.05, market_cap: 1350000000000, image: 'https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png' },
    { id: 'ethereum', symbol: 'ETH', name: 'Ethereum', current_price_usd: 1950, price_change_percentage_24h: -1.96, market_cap: 235000000000, image: 'https://coin-images.coingecko.com/coins/images/279/large/ethereum.png' },
    { id: 'ripple', symbol: 'XRP', name: 'XRP', current_price_usd: 1.39, price_change_percentage_24h: -3.5, market_cap: 84600000000, image: 'https://coin-images.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png' },
    { id: 'binancecoin', symbol: 'BNB', name: 'BNB', current_price_usd: 611, price_change_percentage_24h: -2.27, market_cap: 83400000000, image: 'https://coin-images.coingecko.com/coins/images/825/large/bnb-icon2_2x.png' },
    { id: 'solana', symbol: 'SOL', name: 'Solana', current_price_usd: 83.3, price_change_percentage_24h: -3.15, market_cap: 47400000000, image: 'https://coin-images.coingecko.com/coins/images/4128/large/solana.png' },
    { id: 'tron', symbol: 'TRX', name: 'TRON', current_price_usd: 0.29, price_change_percentage_24h: 0.82, market_cap: 27500000000, image: 'https://coin-images.coingecko.com/coins/images/1094/large/tron-logo.png' },
    { id: 'dogecoin', symbol: 'DOGE', name: 'Dogecoin', current_price_usd: 0.095, price_change_percentage_24h: -3.97, market_cap: 16100000000, image: 'https://coin-images.coingecko.com/coins/images/5/large/dogecoin.png' },
    { id: 'cardano', symbol: 'ADA', name: 'Cardano', current_price_usd: 0.27, price_change_percentage_24h: -3.5, market_cap: 9950000000, image: 'https://coin-images.coingecko.com/coins/images/975/large/cardano.png' },
    { id: 'avalanche-2', symbol: 'AVAX', name: 'Avalanche', current_price_usd: 8.84, price_change_percentage_24h: -4.13, market_cap: 3820000000, image: 'https://coin-images.coingecko.com/coins/images/12559/large/Avalanche_Circle_RedWhite_Trans.png' },
    { id: 'polkadot', symbol: 'DOT', name: 'Polkadot', current_price_usd: 1.32, price_change_percentage_24h: -3.18, market_cap: 2200000000, image: 'https://coin-images.coingecko.com/coins/images/12171/large/polkadot.jpg' }
  ];

  const fallbackPol = {
    id: 'polygon-ecosystem-token', symbol: 'POL', name: 'POL (ex-MATIC)', 
    current_price_usd: 0.106, current_price_eur: 0.09, 
    price_change_percentage_24h: -4.76, market_cap: 1120000000,
    image: 'https://coin-images.coingecko.com/coins/images/32440/large/pol.png'
  };

  const fetchMarketData = async () => {
    try {
      const backendUrl = import.meta.env.VITE_API_URL || "";
      const response = await fetch(`${backendUrl}/api/markets`);
      const data = await response.json();
      
      // Check if we got valid data
      if (data && data.top_cryptos && data.top_cryptos.length > 0) {
        setMarketData(data);
      } else {
        // Use fallback data
        console.log('Using fallback market data');
        setMarketData({ pol: fallbackPol, top_cryptos: fallbackCryptos });
      }
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Error fetching market data:', error);
      // Use fallback data on error
      setMarketData({ pol: fallbackPol, top_cryptos: fallbackCryptos });
      setLastUpdate(new Date());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketData();
    const interval = setInterval(fetchMarketData, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const formatPrice = (price, isUsd = true) => {
    if (!price) return '-';
    if (price >= 1000) {
      return isUsd ? `$${price.toLocaleString('en-US', { maximumFractionDigits: 2 })}` : `€${price.toLocaleString('de-DE', { maximumFractionDigits: 2 })}`;
    }
    return isUsd ? `$${price.toFixed(4)}` : `€${price.toFixed(4)}`;
  };

  const formatMarketCap = (cap) => {
    if (!cap) return '-';
    if (cap >= 1e12) return `$${(cap / 1e12).toFixed(2)}T`;
    if (cap >= 1e9) return `$${(cap / 1e9).toFixed(2)}B`;
    if (cap >= 1e6) return `$${(cap / 1e6).toFixed(2)}M`;
    return `$${cap.toLocaleString()}`;
  };

  const formatChange = (change) => {
    if (!change) return { text: '0.00%', isPositive: true };
    const isPositive = change >= 0;
    return {
      text: `${isPositive ? '+' : ''}${change.toFixed(2)}%`,
      isPositive
    };
  };

  return (
    <section id="markets" className="py-20 md:py-32 relative overflow-hidden" data-testid="markets-section">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.span 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-cyan-400 text-xs font-mono tracking-widest mb-4"
          >
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            {t.badge}
          </motion.span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight uppercase mb-4">
            {t.title} <span className="gradient-text">{t.titleHighlight}</span>
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center py-20">
            <RefreshCw className="w-8 h-8 text-cyan-400 animate-spin mx-auto mb-4" />
            <p className="text-slate-400">{t.loading}</p>
          </div>
        ) : (
          <>
            {/* GKY TOKEN BANNER - Accattivante! */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="mb-8 relative"
            >
              <div className="relative overflow-hidden rounded-3xl">
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 animate-gradient-x" />
                
                {/* Sparkle effects */}
                <div className="absolute inset-0 overflow-hidden">
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-white rounded-full"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1.5, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                      }}
                    />
                  ))}
                </div>

                {/* Content */}
                <div className="relative z-10 p-6 md:p-8">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    {/* GKY Logo/Icon */}
                    <motion.div
                      animate={{ 
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="relative"
                    >
                      <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-yellow-300 to-amber-600 p-1 shadow-[0_0_40px_rgba(251,191,36,0.6)]">
                        <div className="w-full h-full rounded-full bg-[#1a1a1a] flex items-center justify-center">
                          <span className="font-heading text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-500">
                            GKY
                          </span>
                        </div>
                      </div>
                      {/* Pulsing ring */}
                      <motion.div
                        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 rounded-full border-4 border-yellow-400"
                      />
                    </motion.div>

                    {/* Info */}
                    <div className="flex-1 text-center md:text-left">
                      <motion.div
                        animate={{ x: [-2, 2, -2] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                        className="inline-block px-4 py-1 bg-black/30 rounded-full text-xs font-bold uppercase tracking-wider text-white mb-2"
                      >
                        {t.gkyBanner.badge}
                      </motion.div>
                      <h3 className="font-heading text-3xl md:text-5xl font-black text-white drop-shadow-lg mb-1">
                        {t.gkyBanner.title}
                      </h3>
                      <p className="text-amber-100 text-sm md:text-base mb-4">{t.gkyBanner.subtitle}</p>
                      
                      {/* Price */}
                      <div className="inline-block bg-black/40 backdrop-blur-sm rounded-2xl px-6 py-3 mb-4">
                        <div className="text-amber-200 text-xs uppercase tracking-wider mb-1">{t.gkyBanner.price}</div>
                        <div className="font-heading text-3xl md:text-4xl font-black text-white">
                          {t.gkyBanner.priceValue}
                        </div>
                      </div>

                      {/* Features */}
                      <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                        {t.gkyBanner.features.map((feature, i) => (
                          <span key={i} className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium text-white">
                            ✨ {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <motion.a
                      href="/piattaforma-minting"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 bg-black text-amber-400 font-bold uppercase tracking-wider rounded-full shadow-lg hover:shadow-[0_0_30px_rgba(0,0,0,0.5)] transition-shadow flex items-center gap-2"
                    >
                      <Zap className="w-5 h-5" />
                      {t.gkyBanner.cta}
                    </motion.a>
                  </div>
                </div>

                {/* Scrolling text ticker */}
                <div className="bg-black/50 py-2 overflow-hidden">
                  <motion.div
                    animate={{ x: ['100%', '-100%'] }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    className="whitespace-nowrap text-amber-300 font-mono text-sm"
                  >
                    🔥 GKY TOKEN - IL TOKEN DEL FUTURO 🔥 LISTING PRICE: 0.005 POL 🔥 CASHBACK 10% 🔥 ACCESSO SERVIZI 🔥 STAKING REWARDS 🔥 GKY TOKEN - IL TOKEN DEL FUTURO 🔥 LISTING PRICE: 0.005 POL 🔥 CASHBACK 10% 🔥 ACCESSO SERVIZI 🔥 STAKING REWARDS 🔥
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* POL Highlight Card */}
            {marketData.pol && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <div className="relative glass rounded-3xl p-6 md:p-8 overflow-hidden border border-purple-500/30">
                  {/* Animated gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-cyan-500/10 to-purple-600/20 animate-gradient" />
                  
                  {/* Star badge */}
                  <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full text-xs font-bold uppercase">
                    <Star className="w-3 h-3" /> Featured
                  </div>

                  <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-8">
                    {/* POL Logo */}
                    <div className="relative">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                        className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-purple-500 to-cyan-400 p-1"
                      >
                        <div className="w-full h-full rounded-full bg-[#0a0a0a] flex items-center justify-center overflow-hidden">
                          {marketData.pol.image ? (
                            <img src={marketData.pol.image} alt="POL" className="w-16 h-16 md:w-20 md:h-20" />
                          ) : (
                            <Zap className="w-12 h-12 text-purple-400" />
                          )}
                        </div>
                      </motion.div>
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-white rounded-full animate-ping" />
                      </div>
                    </div>

                    {/* POL Info */}
                    <div className="flex-1 text-center md:text-left">
                      <div className="text-purple-400 text-sm font-mono mb-1">{t.polSubtitle}</div>
                      <h3 className="font-heading text-2xl md:text-4xl font-black uppercase text-white mb-2">
                        {t.polHighlight}
                      </h3>
                      <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-8">
                        <div>
                          <div className="text-slate-500 text-xs uppercase mb-1">{t.price} (USD)</div>
                          <div className="font-heading text-3xl md:text-5xl font-black text-white">
                            {formatPrice(marketData.pol.current_price_usd)}
                          </div>
                        </div>
                        <div>
                          <div className="text-slate-500 text-xs uppercase mb-1">{t.price} (EUR)</div>
                          <div className="font-heading text-2xl md:text-3xl font-bold text-cyan-400">
                            {formatPrice(marketData.pol.current_price_eur, false)}
                          </div>
                        </div>
                        <div>
                          <div className="text-slate-500 text-xs uppercase mb-1">{t.change24h}</div>
                          <div className={`flex items-center gap-1 font-heading text-2xl md:text-3xl font-bold ${formatChange(marketData.pol.price_change_percentage_24h).isPositive ? 'text-green-400' : 'text-red-400'}`}>
                            {formatChange(marketData.pol.price_change_percentage_24h).isPositive ? (
                              <TrendingUp className="w-6 h-6" />
                            ) : (
                              <TrendingDown className="w-6 h-6" />
                            )}
                            {formatChange(marketData.pol.price_change_percentage_24h).text}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Top 10 Cryptos Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <h3 className="font-heading text-xl md:text-2xl font-bold uppercase text-white mb-6 text-center md:text-left">
                {t.top10}
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {marketData.top_cryptos.map((crypto, index) => {
                  const change = formatChange(crypto.price_change_percentage_24h);
                  return (
                    <motion.div
                      key={crypto.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ y: -5, scale: 1.02 }}
                      className="glass rounded-2xl p-4 hover:border-cyan-500/30 transition-all group"
                    >
                      {/* Rank badge */}
                      <div className="absolute -top-2 -left-2 w-6 h-6 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-full flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </div>

                      <div className="flex items-center gap-3 mb-3">
                        {crypto.image ? (
                          <img src={crypto.image} alt={crypto.name} className="w-10 h-10 rounded-full" />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500" />
                        )}
                        <div>
                          <div className="font-bold text-white text-sm">{crypto.symbol}</div>
                          <div className="text-slate-500 text-xs truncate max-w-[80px]">{crypto.name}</div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-slate-500 text-xs">{t.price}</span>
                          <span className="text-white font-bold text-sm">{formatPrice(crypto.current_price_usd)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-500 text-xs">{t.change24h}</span>
                          <span className={`flex items-center gap-1 text-sm font-bold ${change.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                            {change.isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                            {change.text}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-500 text-xs">{t.marketCap}</span>
                          <span className="text-cyan-400 text-xs font-medium">{formatMarketCap(crypto.market_cap)}</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Last Update */}
            {lastUpdate && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center mt-8 text-slate-500 text-sm flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                {t.lastUpdate}: {lastUpdate.toLocaleTimeString()}
              </motion.div>
            )}
          </>
        )}
      </div>

      {/* CSS for gradient animation */}
      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 5s ease infinite;
        }
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 100%;
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default Markets;
