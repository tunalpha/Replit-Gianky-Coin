import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Loader2, ExternalLink } from 'lucide-react';

const MintingFrame = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black"
    >
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 h-14 bg-[#0a0a0a] border-b border-white/10 flex items-center justify-between px-4 z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
            <span className="font-bold text-white text-sm">G</span>
          </div>
          <span className="font-heading font-bold text-white">GiankyCoin Minting</span>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-white/10 transition-colors text-white"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0a] z-5 pt-14">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-12 h-12 text-cyan-500 animate-spin" />
            <p className="text-slate-400">Caricamento piattaforma...</p>
          </div>
        </div>
      )}

      {/* Iframe */}
      <iframe
        src="https://gianky-minting.vercel.app/"
        title="GiankyCoin Minting Platform"
        className="w-full h-full pt-14"
        style={{ border: 'none' }}
        onLoad={() => setIsLoading(false)}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals"
      />
    </motion.div>
  );
};

export default MintingFrame;
