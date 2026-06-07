import { useState } from 'react';
import { ArrowLeft, ExternalLink, AlertTriangle, TrendingUp, Shield, Coins } from 'lucide-react';
import { motion } from 'framer-motion';

// URL per acquisto POL
const TRANSAK_URL = 'https://global.transak.com/?defaultCryptoCurrency=POL&network=polygon&defaultFiatCurrency=EUR&defaultFiatAmount=50&themeColor=00f0ff&colorMode=DARK&defaultPaymentMethod=credit_debit_card';
const BINANCE_URL = 'https://www.binance.com/it/price/polygon';

const AcquistaPolPage = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleContinue = () => {
    window.open(TRANSAK_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      data-testid="acquista-pol-page"
      className="min-h-screen bg-gradient-to-b from-[#050505] via-[#0a0a0a] to-[#050505] text-white"
    >
      {/* Back Button */}
      <a
        href="/"
        data-testid="back-to-home-btn"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`fixed top-4 left-4 z-50 flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-300 ${
          isHovered 
            ? 'bg-cyan-500 text-black shadow-[0_0_20px_rgba(0,240,255,0.5)]' 
            : 'bg-black/60 text-white/70 backdrop-blur-sm border border-white/20'
        }`}
      >
        <ArrowLeft className="w-4 h-4" />
        <span className={`text-xs font-medium uppercase tracking-wider transition-all duration-300 ${
          isHovered ? 'max-w-[80px] opacity-100' : 'max-w-0 opacity-0 overflow-hidden'
        }`}>
          Home
        </span>
      </a>

      <div className="container mx-auto px-4 py-20 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-6">
            <Coins className="w-5 h-5 text-cyan-400" />
            <span className="text-cyan-400 text-sm font-medium uppercase tracking-wider">Acquista POL</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Stai per essere reindirizzato
          </h1>
          <p className="text-slate-400 text-lg">
            Verrai indirizzato a un servizio esterno per completare l'acquisto
          </p>
        </motion.div>

        {/* Warning Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-6 mb-8"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-amber-500/20 rounded-xl">
              <AlertTriangle className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h3 className="text-amber-400 font-bold text-lg mb-2">Nota sulle Commissioni</h3>
              <p className="text-slate-300 leading-relaxed">
                I servizi di acquisto diretto con carta applicano commissioni che possono variare 
                dal <span className="text-amber-400 font-semibold">3% al 7%</span> sull'importo totale. 
                Questi costi sono standard per tutti gli intermediari di pagamento crypto.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Binance Recommendation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-[#F0B90B]/10 to-[#F0B90B]/5 border border-[#F0B90B]/30 rounded-2xl p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Logos Partnership */}
            <div className="flex items-center gap-4">
              {/* Binance Logo */}
              <div className="w-16 h-16 bg-[#F0B90B] rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(240,185,11,0.3)]">
                <svg viewBox="0 0 126.61 126.61" className="w-10 h-10">
                  <g fill="#1E2026">
                    <path d="M38.73 53.2L63.3 28.63l24.57 24.57 14.3-14.3L63.3 0 24.43 38.9z"/>
                    <path d="M0 63.3l14.3-14.3L28.6 63.3l-14.3 14.3z"/>
                    <path d="M38.73 73.41L63.3 97.98l24.57-24.57 14.31 14.29-.01.01L63.3 126.61l-38.87-38.9-.01-.01z"/>
                    <path d="M98.01 63.31l14.3-14.3 14.3 14.3-14.3 14.3z"/>
                    <path d="M77.83 63.3L63.3 48.77 52.22 59.85l-1.22 1.22-2.23 2.23L63.3 77.83l14.53-14.53z"/>
                  </g>
                </svg>
              </div>
              
              {/* X symbol */}
              <span className="text-2xl text-slate-500">×</span>
              
              {/* GiankyCoin Logo */}
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(0,240,255,0.3)]">
                <span className="text-2xl font-bold text-white">GKY</span>
              </div>
            </div>

            {/* Text */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-[#F0B90B]" />
                <h3 className="text-[#F0B90B] font-bold text-lg">Consiglio per Acquisti Importanti</h3>
              </div>
              <p className="text-slate-300 leading-relaxed mb-4">
                Per acquisti superiori a <span className="text-white font-semibold">€500</span>, 
                ti consigliamo di utilizzare <span className="text-[#F0B90B] font-semibold">Binance</span> direttamente. 
                Le commissioni sono significativamente più basse (<span className="text-green-400">0.1%</span>) 
                e avrai accesso a strumenti di trading professionali.
              </p>
              <a
                href={BINANCE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#F0B90B] hover:bg-[#F0B90B]/90 text-black font-bold rounded-full transition-all text-sm uppercase tracking-wider"
              >
                <Shield className="w-4 h-4" />
                Vai su Binance
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <p className="text-slate-500 text-sm mb-4">
            Per piccoli acquisti rapidi con carta di credito/debito:
          </p>
          <button
            onClick={handleContinue}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 text-black font-bold rounded-full transition-all text-sm uppercase tracking-wider shadow-[0_0_30px_rgba(0,240,255,0.4)] hover:shadow-[0_0_50px_rgba(0,240,255,0.6)]"
            data-testid="continue-to-transak-btn"
          >
            Continua con l'Acquisto
            <ExternalLink className="w-5 h-5" />
          </button>
          <p className="text-slate-600 text-xs mt-4">
            Verrai reindirizzato a Transak in una nuova finestra
          </p>
        </motion.div>

        {/* Security Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 text-slate-500 text-xs">
            <Shield className="w-4 h-4" />
            <span>Tutti i servizi esterni sono verificati e sicuri</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AcquistaPolPage;
