import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';

// FixedFloat URL - no registration swap with POL
const FIXEDFLOAT_URL = 'https://ff.io/en/exchange/btc-to-pol';

const FixedFloatPage = () => {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div 
      data-testid="fixedfloat-page"
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
            ? 'bg-purple-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.5)]' 
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
        src={FIXEDFLOAT_URL}
        title="Swap Crypto - FixedFloat"
        className="w-full h-full border-0"
        allow="clipboard-write"
        allowFullScreen
        data-testid="fixedfloat-iframe"
      />
    </div>
  );
};

export default FixedFloatPage;
