import { useEffect } from 'react';

const MintingPage = () => {
  useEffect(() => {
    window.location.replace('/mint/');
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-white/70 text-sm">Caricamento piattaforma minting...</p>
      </div>
    </div>
  );
};

export default MintingPage;
