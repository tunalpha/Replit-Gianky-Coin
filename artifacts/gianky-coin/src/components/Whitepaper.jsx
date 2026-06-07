import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, ChevronRight, Rocket, Shield, Coins, Users, 
  TrendingUp, Lock, Target, Award, ArrowLeft,
  CheckCircle, Star, Diamond, Gift, Percent, Layers,
  PieChart, Clock, Zap
} from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const Whitepaper = ({ isOpen, onClose }) => {
  const { language } = useLanguage();
  const [activeSection, setActiveSection] = useState(0);

  // Contenuti multilingua
  const translations = {
    it: {
      ui: {
        title: 'WHITEPAPER',
        subtitle: 'Gianky NFT - Uno Sguardo al Futuro',
        version: 'Versione 3.0',
        back: 'Torna al sito',
        prev: 'Precedente',
        next: 'Successivo'
      },
      sections: [
        {
          id: 'intro',
          icon: Rocket,
          title: 'Introduzione',
          color: 'from-cyan-500 to-blue-500',
          heading: 'Cos\'è un NFT?',
          paragraphs: [
            'NFT è l\'acronimo di Non Fungible Token, che significa "gettone non copiabile" - qualcosa di unico che non può essere sostituito. A differenza delle criptovalute tradizionali che sono intercambiabili, ogni NFT è unico come un\'opera d\'arte.',
            'Gianky NFT è un ecosistema costruito sulla blockchain Polygon, che combina la tecnologia NFT con un innovativo sistema di rewards e referral. Il nostro obiettivo è rendere accessibile a tutti l\'opportunità di partecipare alla crescita del mercato crypto.'
          ],
          highlights: [
            { label: 'Blockchain', value: 'Polygon (POL)' },
            { label: 'Token', value: 'GKY' },
            { label: 'Supply Totale', value: '21 Miliardi' },
            { label: 'Prezzo Listing', value: '0.005 POL' }
          ]
        },
        {
          id: 'market',
          icon: TrendingUp,
          title: 'Il Mercato',
          color: 'from-green-500 to-emerald-500',
          heading: 'Un Mercato in Forte Crescita',
          paragraphs: [
            'Nel 2025, il mercato globale NFT ha raggiunto una valutazione di oltre $50 miliardi, con proiezioni che indicano una crescita fino a $65 miliardi entro fine 2026.',
            'Il settore crypto wallet è in forte espansione: $5,4 miliardi nel 2026 con un CAGR del 29,8%. L\'Europa guida la crescita con il 46,8% annuo.',
            'Ethereum domina con il 62% del mercato NFT, seguito da Solana (18%) e Polygon (11%). Il gaming NFT cresce al 31% annuo, raggiungendo il 38% delle transazioni.'
          ],
          stats: [
            { value: '$50B+', label: 'Market Cap NFT 2025' },
            { value: '+34%', label: 'CAGR fino al 2031' },
            { value: '62%', label: 'Quota Ethereum' },
            { value: '$65B', label: 'Previsione 2026' }
          ]
        },
        {
          id: 'plans',
          icon: Diamond,
          title: 'Piani NFT',
          color: 'from-purple-500 to-pink-500',
          heading: 'I Nostri Pacchetti NFT',
          paragraphs: [
            'Ogni NFT Gianky rappresenta un\'opportunità unica di entrare nell\'ecosistema. Scegli il pacchetto più adatto alle tue esigenze e inizia subito a beneficiare dei vantaggi esclusivi.'
          ],
          plans: [
            { name: 'Starter', price: '20', cashback: '2', color: '#00F0FF' },
            { name: 'Basic', price: '50', cashback: '5', color: '#3B82F6' },
            { name: 'Standard', price: '100', cashback: '10', color: '#A855F7' },
            { name: 'VIP', price: '500', cashback: '50', color: '#F59E0B' },
            { name: 'Premium', price: '1.000', cashback: '100', color: '#EC4899' },
            { name: 'Diamond', price: '5.000', cashback: '500', color: '#8B5CF6' }
          ],
          planNote: 'Prezzi in POL (Polygon). Cashback 10% immediato in GKY Token.'
        },
        {
          id: 'cashback',
          icon: Gift,
          title: 'Cashback 10%',
          color: 'from-amber-500 to-orange-500',
          heading: 'Ricevi Subito il 10% di Cashback',
          paragraphs: [
            'Ogni acquisto di NFT Gianky include un cashback immediato del 10% in Gianky Coin (GKY), accreditato automaticamente sul tuo portafoglio insieme all\'NFT.',
            'Se il pool di liquidità è attivo, il cashback viene calcolato acquistando GKY equivalenti dal pool, contribuendo così alla crescita del valore del token.'
          ],
          cashbackTable: [
            { plan: 'Starter', value: '20 POL', cashback: '2 POL in GKY' },
            { plan: 'Basic', value: '50 POL', cashback: '5 POL in GKY' },
            { plan: 'Standard', value: '100 POL', cashback: '10 POL in GKY' },
            { plan: 'VIP', value: '500 POL', cashback: '50 POL in GKY' },
            { plan: 'Premium', value: '1.000 POL', cashback: '100 POL in GKY' },
            { plan: 'Diamond', value: '5.000 POL', cashback: '500 POL in GKY' }
          ]
        },
        {
          id: 'referral',
          icon: Users,
          title: 'Sistema Referral',
          color: 'from-cyan-500 to-blue-600',
          heading: 'Guadagna con i Referral su 4 Livelli',
          paragraphs: [
            'Il nostro sistema referral multi-livello ti permette di ricevere commissioni su 4 livelli di profondità. Ogni volta che qualcuno acquista un NFT usando il tuo codice referral, ricevi una percentuale immediata!',
            'La percentuale viene calcolata sull\'importo totale versato per l\'acquisto dell\'NFT.'
          ],
          levels: [
            { level: 1, percent: '12.5%', desc: 'Referral Diretti', color: '#00F0FF' },
            { level: 2, percent: '8%', desc: 'Secondo Livello', color: '#7000FF' },
            { level: 3, percent: '4%', desc: 'Terzo Livello', color: '#FFB800' },
            { level: 4, percent: '2%', desc: 'Quarto Livello', color: '#FF0080' }
          ],
          totalPercent: '26.5%',
          bonusTitle: 'BONUS: 20 Referral = NFT Gratis!',
          bonusDesc: 'Raggiungi 20 referral dello stesso tipo e ricevi un cashback extra del 100% del prezzo di 1 NFT dello stesso tipo!',
          bonusRules: [
            'Diamond: riceve premi per TUTTI i tipi di referral',
            'Premium: riceve premi per Premium, VIP e Standard',
            'VIP: riceve premi per VIP e Standard',
            'Standard: riceve premi per Standard e Basic',
            'Basic: riceve premi per Basic e Starter',
            'Starter: riceve premi solo per Starter'
          ]
        },
        {
          id: 'royalties',
          icon: Percent,
          title: 'Royalties',
          color: 'from-pink-500 to-rose-500',
          heading: 'Royalties sulle Operazioni NFT',
          paragraphs: [
            'Oltre ai referral, ricevi royalties del 5% su tutte le operazioni NFT della tua rete! Queste royalties vengono distribuite sui 4 livelli con le stesse percentuali del sistema referral.',
            'Le royalties vengono distribuite alle stesse persone che hanno ricevuto i premi sui referral, anche dopo la vendita dell\'NFT.'
          ],
          royaltyLevels: [
            { level: 1, percent: '12.5%', desc: 'del 5% totale' },
            { level: 2, percent: '8%', desc: 'del 5% totale' },
            { level: 3, percent: '4%', desc: 'del 5% totale' },
            { level: 4, percent: '2%', desc: 'del 5% totale' }
          ],
          note: 'I dettagli del referral sono archiviati in base all\'ID del token NFT, garantendo che i premi vengano distribuiti correttamente anche dopo eventuali trasferimenti.'
        },
        {
          id: 'staking',
          icon: Lock,
          title: 'Staking NFT',
          color: 'from-indigo-500 to-purple-500',
          heading: 'Metti in Staking il Tuo NFT',
          paragraphs: [
            'Per chi preferisce non utilizzare il sistema referral, è possibile mettere in STAKING il proprio NFT e ricevere token GKY proporzionalmente al periodo di blocco.',
            'Lo staking è disponibile SOLO per NFT acquistati direttamente dal portafoglio (non trasferiti). Le percentuali sono calcolate su base mensile ma accreditate giornalmente in GKY!'
          ],
          stakingPlans: [
            { duration: '3 Mesi', percent: '10%', desc: 'al mese', color: '#00F0FF' },
            { duration: '6 Mesi', percent: '12%', desc: 'al mese', color: '#A855F7' },
            { duration: '1 Anno', percent: '15%', desc: 'al mese', color: '#FFB800' }
          ],
          networkBonus: '+3% dei guadagni dello staking su tutti i 4 livelli di rete',
          warning: 'Nota: Gli NFT trasferiti (ai vecchi holder, team o promoter) non possono essere messi in staking.'
        },
        {
          id: 'tokenomics',
          icon: PieChart,
          title: 'Tokenomics',
          color: 'from-teal-500 to-cyan-500',
          heading: 'Gianky Coin (GKY)',
          paragraphs: [
            'Il token GKY è il cuore dell\'ecosistema Gianky. Con una supply totale di 21 miliardi di token e un prezzo di listing di 0.005 POL, rappresenta il mezzo di scambio e reward all\'interno della piattaforma.'
          ],
          tokenInfo: [
            { label: 'Nome', value: 'Gianky Coin' },
            { label: 'Simbolo', value: 'GKY' },
            { label: 'Supply Totale', value: '21 Miliardi' },
            { label: 'Blockchain', value: 'Polygon' },
            { label: 'Prezzo Listing', value: '0.005 POL' }
          ],
          distribution: [
            { label: 'Liquidità Pool', percent: 50, color: '#00F0FF' },
            { label: 'Staking Rewards', percent: 26.5, color: '#7000FF' },
            { label: 'Sviluppo Ecosistema', percent: 21.5, color: '#FFB800' },
            { label: 'Riserva', percent: 2, color: '#00FF88' }
          ]
        },
        {
          id: 'contracts',
          icon: Shield,
          title: 'Smart Contract',
          color: 'from-red-500 to-orange-500',
          heading: 'Trasparenza e Sicurezza',
          paragraphs: [
            'Tutti i nostri smart contract sono pubblici e verificabili sulla blockchain Polygon. La trasparenza è fondamentale: chiunque può verificare le operazioni on-chain.',
            'Il contratto NFT gestisce automaticamente la distribuzione dei referral, cashback e royalties in modo trustless e decentralizzato.'
          ],
          contracts: [
            { name: 'NFT Contract', address: '0x106fb804D03D4EA95CaeFA45C3215b57D8E6835D' },
            { name: 'GKY Token', address: '0x64487539aa9d61Bdc652A5755bbe30Ee96cFcEb2' }
          ],
          features: [
            'Referral tracciati tramite ID Token NFT',
            'Distribuzione automatica rewards',
            'Royalties perpetue sulla rete',
            'Pool di liquidità integrato'
          ]
        },
        {
          id: 'team',
          icon: Award,
          title: 'Il Team',
          color: 'from-violet-500 to-purple-500',
          heading: 'Chi Siamo',
          paragraphs: [
            'Il team di Gianky è composto da professionisti con esperienza nel settore blockchain, DeFi e marketing digitale. Il nostro obiettivo è costruire un ecosistema sostenibile e trasparente.'
          ],
          members: [
            { name: 'Alpha', role: 'Owner & Founder', desc: 'Visionario Blockchain' },
            { name: 'Onji', role: 'CTO', desc: 'Esperto DeFi e Smart Contract' },
            { name: 'Giancarlo', role: 'Co-Founder', desc: 'Marketing & Strategia' },
            { name: 'Saad', role: 'Lead Developer', desc: 'Specialista Web3' }
          ]
        }
      ]
    },
    en: {
      ui: {
        title: 'WHITEPAPER',
        subtitle: 'Gianky NFT - A Look at the Future',
        version: 'Version 3.0',
        back: 'Back to site',
        prev: 'Previous',
        next: 'Next'
      },
      sections: [
        {
          id: 'intro',
          icon: Rocket,
          title: 'Introduction',
          color: 'from-cyan-500 to-blue-500',
          heading: 'What is an NFT?',
          paragraphs: [
            'NFT stands for Non Fungible Token - something unique that cannot be replaced. Unlike traditional cryptocurrencies which are interchangeable, each NFT is unique like a work of art.',
            'Gianky NFT is an ecosystem built on the Polygon blockchain, combining NFT technology with an innovative rewards and referral system. Our goal is to make the opportunity to participate in crypto market growth accessible to everyone.'
          ],
          highlights: [
            { label: 'Blockchain', value: 'Polygon (POL)' },
            { label: 'Token', value: 'GKY' },
            { label: 'Total Supply', value: '21 Billion' },
            { label: 'Listing Price', value: '0.005 POL' }
          ]
        },
        {
          id: 'market',
          icon: TrendingUp,
          title: 'The Market',
          color: 'from-green-500 to-emerald-500',
          heading: 'A Fast-Growing Market',
          paragraphs: [
            'In 2025, the global NFT market reached a valuation of over $50 billion, with projections indicating growth to $65 billion by end of 2026.',
            'The crypto wallet sector is booming: $5.4 billion in 2026 with a 29.8% CAGR. Europe leads growth at 46.8% annually.',
            'Ethereum dominates with 62% of the NFT market, followed by Solana (18%) and Polygon (11%). NFT gaming grows at 31% annually, reaching 38% of transactions.'
          ],
          stats: [
            { value: '$50B+', label: 'NFT Market Cap 2025' },
            { value: '+34%', label: 'CAGR to 2031' },
            { value: '62%', label: 'Ethereum Share' },
            { value: '$65B', label: '2026 Forecast' }
          ]
        },
        {
          id: 'plans',
          icon: Diamond,
          title: 'NFT Plans',
          color: 'from-purple-500 to-pink-500',
          heading: 'Our NFT Packages',
          paragraphs: [
            'Each Gianky NFT represents a unique opportunity to enter the ecosystem. Choose the package that best suits your needs and start benefiting from exclusive advantages.'
          ],
          plans: [
            { name: 'Starter', price: '20', cashback: '2', color: '#00F0FF' },
            { name: 'Basic', price: '50', cashback: '5', color: '#3B82F6' },
            { name: 'Standard', price: '100', cashback: '10', color: '#A855F7' },
            { name: 'VIP', price: '500', cashback: '50', color: '#F59E0B' },
            { name: 'Premium', price: '1,000', cashback: '100', color: '#EC4899' },
            { name: 'Diamond', price: '5,000', cashback: '500', color: '#8B5CF6' }
          ],
          planNote: 'Prices in POL (Polygon). Immediate 10% cashback in GKY Token.'
        },
        {
          id: 'cashback',
          icon: Gift,
          title: '10% Cashback',
          color: 'from-amber-500 to-orange-500',
          heading: 'Get 10% Cashback Instantly',
          paragraphs: [
            'Every Gianky NFT purchase includes an immediate 10% cashback in Gianky Coin (GKY), automatically credited to your wallet along with the NFT.',
            'If the liquidity pool is active, the cashback is calculated by purchasing equivalent GKY from the pool, thus contributing to the token value growth.'
          ],
          cashbackTable: [
            { plan: 'Starter', value: '20 POL', cashback: '2 POL in GKY' },
            { plan: 'Basic', value: '50 POL', cashback: '5 POL in GKY' },
            { plan: 'Standard', value: '100 POL', cashback: '10 POL in GKY' },
            { plan: 'VIP', value: '500 POL', cashback: '50 POL in GKY' },
            { plan: 'Premium', value: '1,000 POL', cashback: '100 POL in GKY' },
            { plan: 'Diamond', value: '5,000 POL', cashback: '500 POL in GKY' }
          ]
        },
        {
          id: 'referral',
          icon: Users,
          title: 'Referral System',
          color: 'from-cyan-500 to-blue-600',
          heading: 'Earn with 4-Level Referrals',
          paragraphs: [
            'Our multi-level referral system allows you to receive commissions on 4 levels deep. Every time someone purchases an NFT using your referral code, you receive an immediate percentage!',
            'The percentage is calculated on the total amount paid for the NFT purchase.'
          ],
          levels: [
            { level: 1, percent: '12.5%', desc: 'Direct Referrals', color: '#00F0FF' },
            { level: 2, percent: '8%', desc: 'Second Level', color: '#7000FF' },
            { level: 3, percent: '4%', desc: 'Third Level', color: '#FFB800' },
            { level: 4, percent: '2%', desc: 'Fourth Level', color: '#FF0080' }
          ],
          totalPercent: '26.5%',
          bonusTitle: 'BONUS: 20 Referrals = Free NFT!',
          bonusDesc: 'Reach 20 referrals of the same type and receive an extra 100% cashback of the price of 1 NFT of the same type!',
          bonusRules: [
            'Diamond: receives rewards for ALL referral types',
            'Premium: receives rewards for Premium, VIP and Standard',
            'VIP: receives rewards for VIP and Standard',
            'Standard: receives rewards for Standard and Basic',
            'Basic: receives rewards for Basic and Starter',
            'Starter: receives rewards only for Starter'
          ]
        },
        {
          id: 'royalties',
          icon: Percent,
          title: 'Royalties',
          color: 'from-pink-500 to-rose-500',
          heading: 'Royalties on NFT Operations',
          paragraphs: [
            'In addition to referrals, you receive 5% royalties on all NFT operations in your network! These royalties are distributed across 4 levels with the same percentages as the referral system.',
            'Royalties are distributed to the same people who received referral rewards, even after the NFT is sold.'
          ],
          royaltyLevels: [
            { level: 1, percent: '12.5%', desc: 'of 5% total' },
            { level: 2, percent: '8%', desc: 'of 5% total' },
            { level: 3, percent: '4%', desc: 'of 5% total' },
            { level: 4, percent: '2%', desc: 'of 5% total' }
          ],
          note: 'Referral details are stored based on NFT Token ID, ensuring rewards are distributed correctly even after transfers.'
        },
        {
          id: 'staking',
          icon: Lock,
          title: 'NFT Staking',
          color: 'from-indigo-500 to-purple-500',
          heading: 'Stake Your NFT',
          paragraphs: [
            'For those who prefer not to use the referral system, you can STAKE your NFT and receive GKY tokens proportionally to the lock period.',
            'Staking is available ONLY for NFTs purchased directly from the wallet (not transferred). Percentages are calculated monthly but credited daily in GKY!'
          ],
          stakingPlans: [
            { duration: '3 Months', percent: '10%', desc: 'per month', color: '#00F0FF' },
            { duration: '6 Months', percent: '12%', desc: 'per month', color: '#A855F7' },
            { duration: '1 Year', percent: '15%', desc: 'per month', color: '#FFB800' }
          ],
          networkBonus: '+3% of staking earnings on all 4 network levels',
          warning: 'Note: Transferred NFTs (to old holders, team or promoters) cannot be staked.'
        },
        {
          id: 'tokenomics',
          icon: PieChart,
          title: 'Tokenomics',
          color: 'from-teal-500 to-cyan-500',
          heading: 'Gianky Coin (GKY)',
          paragraphs: [
            'The GKY token is the heart of the Gianky ecosystem. With a total supply of 21 billion tokens and a listing price of 0.005 POL, it represents the medium of exchange and rewards within the platform.'
          ],
          tokenInfo: [
            { label: 'Name', value: 'Gianky Coin' },
            { label: 'Symbol', value: 'GKY' },
            { label: 'Total Supply', value: '21 Billion' },
            { label: 'Blockchain', value: 'Polygon' },
            { label: 'Listing Price', value: '0.005 POL' }
          ],
          distribution: [
            { label: 'Liquidity Pool', percent: 50, color: '#00F0FF' },
            { label: 'Staking Rewards', percent: 26.5, color: '#7000FF' },
            { label: 'Ecosystem Development', percent: 21.5, color: '#FFB800' },
            { label: 'Reserve', percent: 2, color: '#00FF88' }
          ]
        },
        {
          id: 'contracts',
          icon: Shield,
          title: 'Smart Contracts',
          color: 'from-red-500 to-orange-500',
          heading: 'Transparency and Security',
          paragraphs: [
            'All our smart contracts are public and verifiable on the Polygon blockchain. Transparency is fundamental: anyone can verify on-chain operations.',
            'The NFT contract automatically manages the distribution of referrals, cashback and royalties in a trustless and decentralized manner.'
          ],
          contracts: [
            { name: 'NFT Contract', address: '0x106fb804D03D4EA95CaeFA45C3215b57D8E6835D' },
            { name: 'GKY Token', address: '0x64487539aa9d61Bdc652A5755bbe30Ee96cFcEb2' }
          ],
          features: [
            'Referrals tracked via NFT Token ID',
            'Automatic rewards distribution',
            'Perpetual network royalties',
            'Integrated liquidity pool'
          ]
        },
        {
          id: 'team',
          icon: Award,
          title: 'The Team',
          color: 'from-violet-500 to-purple-500',
          heading: 'Who We Are',
          paragraphs: [
            'The Gianky team consists of professionals with experience in blockchain, DeFi and digital marketing. Our goal is to build a sustainable and transparent ecosystem.'
          ],
          members: [
            { name: 'Alpha', role: 'Owner & Founder', desc: 'Blockchain Visionary' },
            { name: 'Onji', role: 'CTO', desc: 'DeFi & Smart Contract Expert' },
            { name: 'Giancarlo', role: 'Co-Founder', desc: 'Marketing & Strategy' },
            { name: 'Saad', role: 'Lead Developer', desc: 'Web3 Specialist' }
          ]
        }
      ]
    }
  };

  // Get current language content with fallback
  const t = translations[language] || translations.en;
  const sections = t.sections;
  const ui = t.ui;

  if (!isOpen) return null;

  const currentSection = sections[activeSection];
  const SectionIcon = currentSection.icon;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-[#050505] overflow-auto"
        data-testid="whitepaper-modal"
      >
        {/* Background effects */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl" />
        </div>

        {/* Header */}
        <motion.header
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          className="sticky top-0 z-50 glass border-b border-white/10"
        >
          <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4 flex items-center justify-between">
            <button
              onClick={onClose}
              className="flex items-center gap-1 sm:gap-2 text-slate-400 hover:text-cyan-400 transition-colors text-sm sm:text-base"
              data-testid="whitepaper-close"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">{ui.back}</span>
            </button>
            <div className="text-center flex-1">
              <h1 className="font-heading text-base sm:text-xl font-bold text-white">{ui.title}</h1>
              <p className="text-[10px] sm:text-xs text-slate-500">{ui.version}</p>
            </div>
            <div className="w-8 sm:w-24" />
          </div>
        </motion.header>

        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8 relative z-10">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-6 sm:mb-8 md:mb-12"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 mx-auto mb-3 sm:mb-4 md:mb-6 rounded-full bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 p-1"
            >
              <div className="w-full h-full rounded-full bg-[#0a0a0a] flex items-center justify-center">
                <FileText className="w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 text-cyan-400" />
              </div>
            </motion.div>
            <h2 className="font-heading text-xl sm:text-2xl md:text-4xl font-bold text-white mb-2 px-2">
              {ui.subtitle}
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm md:text-base">{ui.version}</p>
          </motion.div>

          {/* Navigation Tabs */}
          <div className="overflow-x-auto pb-3 sm:pb-4 mb-6 sm:mb-8 -mx-3 sm:-mx-4 px-3 sm:px-4 scrollbar-hide">
            <div className="flex gap-1.5 sm:gap-2 min-w-max md:flex-wrap md:justify-center">
              {sections.map((section, index) => (
                <motion.button
                  key={section.id}
                  onClick={() => setActiveSection(index)}
                  whileTap={{ scale: 0.95 }}
                  className={`px-2.5 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2 rounded-full text-[10px] sm:text-xs md:text-sm font-medium transition-all whitespace-nowrap ${
                    activeSection === index
                      ? `bg-gradient-to-r ${section.color} text-white shadow-lg`
                      : 'glass text-slate-400 hover:text-white'
                  }`}
                  data-testid={`whitepaper-tab-${section.id}`}
                >
                  <section.icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 inline mr-0.5 sm:mr-1 md:mr-2" />
                  {section.title}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="glass rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-10 mb-8 sm:mb-12"
            >
              {/* Section Header */}
              <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br ${currentSection.color} flex items-center justify-center flex-shrink-0`}>
                  <SectionIcon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-heading text-lg sm:text-2xl md:text-3xl font-bold text-white">{currentSection.heading}</h3>
                </div>
              </div>

              {/* Paragraphs */}
              {currentSection.paragraphs && (
                <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  {currentSection.paragraphs.map((p, i) => (
                    <p key={i} className="text-slate-300 leading-relaxed text-sm sm:text-base">{p}</p>
                  ))}
                </div>
              )}

              {/* Highlights (Intro) */}
              {currentSection.highlights && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
                  {currentSection.highlights.map((h, i) => (
                    <div key={i} className="bg-white/5 rounded-xl p-3 sm:p-4 text-center border border-white/10">
                      <div className="text-slate-500 text-[10px] sm:text-xs uppercase mb-1">{h.label}</div>
                      <div className="text-cyan-400 font-heading text-sm sm:text-lg font-bold">{h.value}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Stats (Market) */}
              {currentSection.stats && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
                  {currentSection.stats.map((s, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-gradient-to-br from-white/5 to-white/0 rounded-xl p-4 text-center border border-white/10"
                    >
                      <div className="text-2xl sm:text-3xl font-heading font-black text-cyan-400">{s.value}</div>
                      <div className="text-slate-500 text-xs mt-1">{s.label}</div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Plans */}
              {currentSection.plans && (
                <>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-4">
                    {currentSection.plans.map((plan, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white/5 rounded-xl p-4 text-center border border-white/10 hover:border-cyan-500/50 transition-colors"
                      >
                        <div className="w-10 h-10 rounded-full mx-auto mb-2" style={{ backgroundColor: plan.color }} />
                        <div className="font-bold text-white">{plan.name}</div>
                        <div className="text-cyan-400 font-mono text-lg font-bold">{plan.price} POL</div>
                        <div className="text-green-400 text-xs mt-1">+{plan.cashback} POL cashback</div>
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-slate-500 text-xs text-center">{currentSection.planNote}</p>
                </>
              )}

              {/* Cashback Table */}
              {currentSection.cashbackTable && (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-3 px-4 text-slate-400 font-medium">Piano</th>
                        <th className="text-center py-3 px-4 text-slate-400 font-medium">Valore NFT</th>
                        <th className="text-right py-3 px-4 text-slate-400 font-medium">Cashback 10%</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentSection.cashbackTable.map((row, i) => (
                        <tr key={i} className="border-b border-white/5">
                          <td className="py-3 px-4 text-white font-medium">{row.plan}</td>
                          <td className="py-3 px-4 text-center text-slate-300">{row.value}</td>
                          <td className="py-3 px-4 text-right text-green-400 font-medium">{row.cashback}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Referral Levels */}
              {currentSection.levels && (
                <>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
                    {currentSection.levels.map((level, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white/5 rounded-xl p-4 text-center border-2 transition-colors"
                        style={{ borderColor: level.color + '50' }}
                      >
                        <div 
                          className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center font-heading font-bold text-xl text-white"
                          style={{ backgroundColor: level.color }}
                        >
                          {level.level}
                        </div>
                        <div className="text-2xl font-heading font-black" style={{ color: level.color }}>{level.percent}</div>
                        <div className="text-slate-500 text-xs">{level.desc}</div>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-xl p-4 mb-6 border border-cyan-500/30">
                    <div className="text-center mb-2">
                      <span className="text-slate-400 text-sm">Totale Commissioni Rete:</span>
                      <span className="text-cyan-400 font-heading text-2xl font-bold ml-2">{currentSection.totalPercent}</span>
                    </div>
                  </div>

                  {/* Bonus Section */}
                  <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-xl p-5 border border-amber-500/30">
                    <div className="flex items-center gap-3 mb-3">
                      <Gift className="w-8 h-8 text-amber-400" />
                      <h4 className="font-heading text-lg font-bold text-amber-400">{currentSection.bonusTitle}</h4>
                    </div>
                    <p className="text-slate-300 mb-4">{currentSection.bonusDesc}</p>
                    <div className="space-y-2">
                      {currentSection.bonusRules.map((rule, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-slate-400">
                          <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                          {rule}
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Royalty Levels */}
              {currentSection.royaltyLevels && (
                <>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                    {currentSection.royaltyLevels.map((level, i) => (
                      <div key={i} className="bg-white/5 rounded-xl p-4 text-center border border-white/10">
                        <div className="text-cyan-400 font-heading text-2xl font-bold">{level.percent}</div>
                        <div className="text-slate-500 text-xs">Livello {level.level}</div>
                        <div className="text-slate-600 text-[10px]">{level.desc}</div>
                      </div>
                    ))}
                  </div>
                  <p className="text-slate-500 text-xs text-center italic">{currentSection.note}</p>
                </>
              )}

              {/* Staking Plans */}
              {currentSection.stakingPlans && (
                <>
                  <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6">
                    {currentSection.stakingPlans.map((plan, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.15 }}
                        className="bg-white/5 rounded-xl p-4 sm:p-6 text-center border-2 transition-colors"
                        style={{ borderColor: plan.color + '50' }}
                      >
                        <Clock className="w-8 h-8 mx-auto mb-2" style={{ color: plan.color }} />
                        <div className="text-white font-bold mb-1">{plan.duration}</div>
                        <div className="text-3xl font-heading font-black" style={{ color: plan.color }}>{plan.percent}</div>
                        <div className="text-slate-500 text-xs">{plan.desc}</div>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl p-4 mb-4 border border-green-500/30 text-center">
                    <Zap className="w-6 h-6 text-green-400 mx-auto mb-2" />
                    <p className="text-green-400 font-medium">{currentSection.networkBonus}</p>
                  </div>
                  
                  <p className="text-amber-400 text-xs text-center bg-amber-500/10 rounded-lg p-3 border border-amber-500/20">
                    {currentSection.warning}
                  </p>
                </>
              )}

              {/* Token Info */}
              {currentSection.tokenInfo && (
                <>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
                    {currentSection.tokenInfo.map((info, i) => (
                      <div key={i} className="bg-white/5 rounded-xl p-3 text-center border border-white/10">
                        <div className="text-slate-500 text-[10px] uppercase">{info.label}</div>
                        <div className="text-cyan-400 font-bold text-sm">{info.value}</div>
                      </div>
                    ))}
                  </div>
                  
                  {currentSection.distribution && (
                    <>
                      <h4 className="text-white font-bold mb-4">Distribuzione Token</h4>
                      <div className="flex flex-wrap gap-3 justify-center mb-4">
                        {currentSection.distribution.map((d, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded" style={{ backgroundColor: d.color }} />
                            <span className="text-slate-400 text-xs">{d.label}: {d.percent}%</span>
                          </div>
                        ))}
                      </div>
                      <div className="h-6 rounded-full overflow-hidden flex">
                        {currentSection.distribution.map((d, i) => (
                          <motion.div
                            key={i}
                            initial={{ width: 0 }}
                            animate={{ width: `${d.percent}%` }}
                            transition={{ duration: 1, delay: i * 0.1 }}
                            style={{ backgroundColor: d.color }}
                            className="h-full"
                          />
                        ))}
                      </div>
                    </>
                  )}
                </>
              )}

              {/* Contracts */}
              {currentSection.contracts && (
                <>
                  <div className="space-y-3 mb-6">
                    {currentSection.contracts.map((c, i) => (
                      <div key={i} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-4 bg-white/5 rounded-xl border border-white/10">
                        <span className="text-slate-400">{c.name}:</span>
                        <a 
                          href={`https://polygonscan.com/address/${c.address}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cyan-400 hover:text-cyan-300 font-mono text-xs sm:text-sm break-all"
                        >
                          {c.address}
                        </a>
                      </div>
                    ))}
                  </div>
                  
                  {currentSection.features && (
                    <div className="grid grid-cols-2 gap-3">
                      {currentSection.features.map((f, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-slate-400">
                          <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                          {f}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {/* Team Members */}
              {currentSection.members && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                  {currentSection.members.map((member, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-white/5 rounded-xl p-4 text-center border border-white/10"
                    >
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 mx-auto mb-3 flex items-center justify-center">
                        <Star className="w-7 h-7 text-white" />
                      </div>
                      <div className="font-bold text-white">{member.name}</div>
                      <div className="text-cyan-400 text-xs mb-1">{member.role}</div>
                      <div className="text-slate-500 text-[10px]">{member.desc}</div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between items-center gap-2">
            <button
              onClick={() => setActiveSection(Math.max(0, activeSection - 1))}
              disabled={activeSection === 0}
              className="flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 glass rounded-full text-slate-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all text-xs sm:text-base"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">{ui.prev}</span>
            </button>
            <div className="flex gap-1.5 sm:gap-2 flex-wrap justify-center">
              {sections.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveSection(i)}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${
                    activeSection === i ? 'bg-cyan-400 scale-125' : 'bg-white/20'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => setActiveSection(Math.min(sections.length - 1, activeSection + 1))}
              disabled={activeSection === sections.length - 1}
              className="flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 glass rounded-full text-slate-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all text-xs sm:text-base"
            >
              <span className="hidden sm:inline">{ui.next}</span>
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Whitepaper;
