import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StakingApp from '@/components/staking/StakingApp';

const StakingAppPage = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div data-testid="staking-app-page" className="min-h-screen bg-[#050505]">
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
        <span
          className={`text-xs font-medium uppercase tracking-wider transition-all duration-300 ${
            isHovered ? 'max-w-[80px] opacity-100' : 'max-w-0 opacity-0 overflow-hidden'
          }`}
        >
          Home
        </span>
      </a>

      {/* Native Staking App */}
      <div className="pt-12">
        <StakingApp />
      </div>

      {/* Toast notifications */}
      <ToastContainer position="bottom-right" theme="dark" />
    </div>
  );
};

export default StakingAppPage;
