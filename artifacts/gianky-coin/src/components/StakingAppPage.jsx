import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';

const STAKING_APP_URL = 'https://gianky-coin-staking-app.vercel.app/staking';

const StakingAppPage = () => {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div 
      data-testid="staking-app-page"
      className="fixed inset-0 w-full h-full bg-black"
    >
      {/* Back Button */}
      <a
        href="/"
        data-testid="back-to-home-btn"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`fixed top-4 left-4 z-50 flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-300 ${
          isHovered 
            ? 'bg-cyan-500 text-white shadow-[0_0_20px_rgba(6,182,212,0.5)]' 
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

      <iframe
        src={STAKING_APP_URL}
        title="GiankyCoin Staking"
        className="w-full h-full border-0"
        allow="clipboard-write"
        allowFullScreen
        data-testid="staking-app-iframe"
      />
    </div>
  );
};

export default StakingAppPage;
