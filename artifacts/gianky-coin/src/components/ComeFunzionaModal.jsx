import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Gift, X, ChevronRight, CheckCircle, Percent
} from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const ComeFunzionaModal = ({ isOpen, onClose }) => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState('referral');

  const content = {
    it: {
      title: 'Come Funziona',
      tabs: {
        referral: 'Sistema Referral',
        cashback: 'Cashback 10%'
      },
      referral: {
        heading: 'Guadagna con i Referral su 4 Livelli',
        desc: 'Ogni volta che qualcuno acquista un NFT usando il tuo codice referral, ricevi una percentuale immediata!',
        levels: [
          { level: 1, percent: '12.5%', pol: '12.5 POL', desc: 'Referral Diretti', color: '#00F0FF' },
          { level: 2, percent: '8%', pol: '8 POL', desc: 'Secondo Livello', color: '#7000FF' },
          { level: 3, percent: '4%', pol: '4 POL', desc: 'Terzo Livello', color: '#FFB800' },
          { level: 4, percent: '2%', pol: '2 POL', desc: 'Quarto Livello', color: '#FF0080' }
        ],
        total: '26.5%',
        totalPol: '26.5 POL',
        totalLabel: 'Totale Commissioni Rete',
        exampleNote: 'Esempio su NFT da 100 POL',
        bonusTitle: 'BONUS: 20 Referral = NFT Gratis!',
        bonusDesc: 'Raggiungi 20 referral dello stesso tipo e ricevi un cashback extra del 100%!',
        rules: [
          'Diamond: premi per TUTTI i tipi',
          'Premium: premi per Premium, VIP, Standard',
          'VIP: premi per VIP e Standard',
          'Standard: premi per Standard e Basic',
          'Basic: premi per Basic e Starter',
          'Starter: premi solo per Starter'
        ]
      },
      cashback: {
        heading: 'Ricevi Subito il 10% di Cashback',
        desc: 'Ogni acquisto di NFT include un cashback immediato del 10% in Gianky Coin (GKY), accreditato automaticamente sul tuo portafoglio.',
        table: [
          { plan: 'Starter', price: '20 POL', cashback: '2 POL' },
          { plan: 'Basic', price: '50 POL', cashback: '5 POL' },
          { plan: 'Standard', price: '100 POL', cashback: '10 POL' },
          { plan: 'VIP', price: '500 POL', cashback: '50 POL' },
          { plan: 'Premium', price: '1.000 POL', cashback: '100 POL' },
          { plan: 'Diamond', price: '5.000 POL', cashback: '500 POL' }
        ],
        note: 'Il cashback viene accreditato in GKY Token'
      },
      close: 'Chiudi'
    },
    en: {
      title: 'How It Works',
      tabs: {
        referral: 'Referral System',
        cashback: '10% Cashback'
      },
      referral: {
        heading: 'Earn with 4-Level Referrals',
        desc: 'Every time someone purchases an NFT using your referral code, you receive an immediate percentage!',
        levels: [
          { level: 1, percent: '12.5%', pol: '12.5 POL', desc: 'Direct Referrals', color: '#00F0FF' },
          { level: 2, percent: '8%', pol: '8 POL', desc: 'Second Level', color: '#7000FF' },
          { level: 3, percent: '4%', pol: '4 POL', desc: 'Third Level', color: '#FFB800' },
          { level: 4, percent: '2%', pol: '2 POL', desc: 'Fourth Level', color: '#FF0080' }
        ],
        total: '26.5%',
        totalPol: '26.5 POL',
        totalLabel: 'Total Network Commissions',
        exampleNote: 'Example on 100 POL NFT',
        bonusTitle: 'BONUS: 20 Referrals = Free NFT!',
        bonusDesc: 'Reach 20 referrals of the same type and receive an extra 100% cashback!',
        rules: [
          'Diamond: rewards for ALL types',
          'Premium: rewards for Premium, VIP, Standard',
          'VIP: rewards for VIP and Standard',
          'Standard: rewards for Standard and Basic',
          'Basic: rewards for Basic and Starter',
          'Starter: rewards only for Starter'
        ]
      },
      cashback: {
        heading: 'Get 10% Cashback Instantly',
        desc: 'Every NFT purchase includes an immediate 10% cashback in Gianky Coin (GKY), automatically credited to your wallet.',
        table: [
          { plan: 'Starter', price: '20 POL', cashback: '2 POL' },
          { plan: 'Basic', price: '50 POL', cashback: '5 POL' },
          { plan: 'Standard', price: '100 POL', cashback: '10 POL' },
          { plan: 'VIP', price: '500 POL', cashback: '50 POL' },
          { plan: 'Premium', price: '1,000 POL', cashback: '100 POL' },
          { plan: 'Diamond', price: '5,000 POL', cashback: '500 POL' }
        ],
        note: 'Cashback is credited in GKY Token'
      },
      close: 'Close'
    }
  };

  const t = content[language] || content.en;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full sm:max-w-lg max-h-[85vh] overflow-hidden bg-[#0a0a0a] sm:rounded-2xl rounded-t-3xl border-t sm:border border-white/10"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Handle bar for mobile */}
          <div className="sm:hidden flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 bg-white/20 rounded-full" />
          </div>

          {/* Header */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-white/10">
            <h2 className="font-heading text-lg sm:text-xl font-bold text-white">{t.title}</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-white/10">
            <button
              onClick={() => setActiveTab('referral')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors ${
                activeTab === 'referral' 
                  ? 'text-cyan-400 border-b-2 border-cyan-400' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Users className="w-4 h-4" />
              {t.tabs.referral}
            </button>
            <button
              onClick={() => setActiveTab('cashback')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors ${
                activeTab === 'cashback' 
                  ? 'text-cyan-400 border-b-2 border-cyan-400' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Gift className="w-4 h-4" />
              {t.tabs.cashback}
            </button>
          </div>

          {/* Content */}
          <div className="overflow-y-auto max-h-[60vh] p-4 sm:p-6">
            {activeTab === 'referral' ? (
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-white text-base mb-2">{t.referral.heading}</h3>
                  <p className="text-slate-400 text-sm">{t.referral.desc}</p>
                </div>

                {/* Levels Grid */}
                <div className="grid grid-cols-4 gap-2">
                  {t.referral.levels.map((level) => (
                    <div 
                      key={level.level}
                      className="bg-white/5 rounded-xl p-2 sm:p-3 text-center border border-white/10"
                    >
                      <div 
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full mx-auto mb-1 flex items-center justify-center font-bold text-white text-sm"
                        style={{ backgroundColor: level.color }}
                      >
                        {level.level}
                      </div>
                      <div className="text-base sm:text-lg font-bold" style={{ color: level.color }}>
                        {level.percent}
                      </div>
                      <div className="text-green-400 text-[10px] sm:text-xs font-semibold">
                        = {level.pol}
                      </div>
                      <div className="text-slate-500 text-[9px] sm:text-[10px] leading-tight mt-1">{level.desc}</div>
                    </div>
                  ))}
                </div>

                {/* Example note */}
                <p className="text-center text-slate-500 text-[10px] italic">*{t.referral.exampleNote}</p>

                {/* Total */}
                <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-xl p-3 text-center border border-cyan-500/30">
                  <span className="text-slate-400 text-xs">{t.referral.totalLabel}:</span>
                  <span className="text-cyan-400 font-heading text-2xl font-bold ml-2">{t.referral.total}</span>
                  <span className="text-green-400 font-bold ml-2">= {t.referral.totalPol}</span>
                </div>

                {/* Bonus */}
                <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-xl p-3 border border-amber-500/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Gift className="w-5 h-5 text-amber-400" />
                    <span className="font-bold text-amber-400 text-sm">{t.referral.bonusTitle}</span>
                  </div>
                  <p className="text-slate-300 text-xs mb-2">{t.referral.bonusDesc}</p>
                  <div className="space-y-1">
                    {t.referral.rules.map((rule, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-[10px] text-slate-400">
                        <CheckCircle className="w-3 h-3 text-green-400 flex-shrink-0" />
                        {rule}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-white text-base mb-2">{t.cashback.heading}</h3>
                  <p className="text-slate-400 text-sm">{t.cashback.desc}</p>
                </div>

                {/* Cashback Table */}
                <div className="space-y-2">
                  {t.cashback.table.map((row, i) => (
                    <div 
                      key={i}
                      className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10"
                    >
                      <div>
                        <span className="font-bold text-white text-sm">{row.plan}</span>
                        <span className="text-slate-500 text-xs ml-2">{row.price}</span>
                      </div>
                      <div className="text-green-400 font-bold text-sm">
                        +{row.cashback}
                      </div>
                    </div>
                  ))}
                </div>

                <p className="text-slate-500 text-xs text-center italic">{t.cashback.note}</p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ComeFunzionaModal;
