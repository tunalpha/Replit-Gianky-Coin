import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '@/App.css';
import { LanguageProvider } from '@/i18n/LanguageContext';
import { PolPriceProvider } from '@/components/PolPriceContext';
import ParticleBackground from '@/components/ParticleBackground';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import CosaNonSiamo from '@/components/CosaNonSiamo';
import CosaE from '@/components/CosaE';
import ComeFunziona from '@/components/ComeFunziona';
import Plans from '@/components/Plans';
import DistribuzioneFondi from '@/components/DistribuzioneFondi';
import Trasparenza from '@/components/Trasparenza';
import Markets from '@/components/Markets';
import Swap from '@/components/Swap';
import Staking from '@/components/Staking';
import Roadmap from '@/components/Roadmap';
import Team from '@/components/Team';
import Partners from '@/components/Partners';
import FAQ from '@/components/FAQ';
import SezioneFinale from '@/components/SezioneFinale';
import Footer from '@/components/Footer';
import Whitepaper from '@/components/Whitepaper';
import ComeFunzionaModal from '@/components/ComeFunzionaModal';
import FloatingWhitepaperBanner from '@/components/FloatingWhitepaperBanner';
import MintingPage from '@/components/MintingPage';
import FixedFloatPage from '@/components/FixedFloatPage';
import RedotPayPage from '@/components/RedotPayPage';
import AcquistaPolPage from '@/components/AcquistaPolPage';
import StakingAppPage from '@/components/StakingAppPage';
import NftWalletPage from '@/components/NftWalletV2';

function HomePage() {
  const [showWhitepaper, setShowWhitepaper] = useState(false);
  const [showComeFunziona, setShowComeFunziona] = useState(false);

  return (
    <div className="App relative min-h-screen bg-[#050505]">
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Navigation */}
      <Navbar onWhitepaperClick={() => setShowWhitepaper(true)} />
      
      {/* Main Content */}
      <main className="relative z-10">
        <Hero onWhitepaperClick={() => setShowWhitepaper(true)} />
        <CosaE />
        <ComeFunziona />
        <CosaNonSiamo />
        <Plans />
        <DistribuzioneFondi />
        <Trasparenza />
        <Roadmap />
        <Markets />
        <Swap />
        <Staking />
        <Team />
        <Partners />
        <FAQ />
        <SezioneFinale />
      </main>
      
      {/* Footer */}
      <Footer onWhitepaperClick={() => setShowWhitepaper(true)} />
      
      {/* Floating Banner - appare dopo lo scroll */}
      <FloatingWhitepaperBanner onWhitepaperClick={() => setShowComeFunziona(true)} />
      
      {/* Come Funziona Modal (Referral + Cashback) */}
      <ComeFunzionaModal isOpen={showComeFunziona} onClose={() => setShowComeFunziona(false)} />
      
      {/* Whitepaper Modal */}
      <Whitepaper isOpen={showWhitepaper} onClose={() => setShowWhitepaper(false)} />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <PolPriceProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/piattaforma-minting" element={<MintingPage />} />
            <Route path="/acquista-pol" element={<AcquistaPolPage />} />
            <Route path="/swap-crypto" element={<FixedFloatPage />} />
            <Route path="/redotpay" element={<RedotPayPage />} />
            <Route path="/staking-app" element={<StakingAppPage />} />
            <Route path="/nft-wallet" element={<NftWalletPage />} />
          </Routes>
        </BrowserRouter>
      </PolPriceProvider>
    </LanguageProvider>
  );
}

export default App;
