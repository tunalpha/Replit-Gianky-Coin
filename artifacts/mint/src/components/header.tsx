"use client";

import { useState, useEffect, useRef } from "react";
import { ConnectButton, ConnectEmbed, useActiveAccount } from "thirdweb/react";
import { createWallet, inAppWallet } from "thirdweb/wallets";
import { polygon } from "thirdweb/chains";
import { thirdwebClient } from "@/lib/thirdweb";
import { useSoundAndVibration } from "@/hooks/useSoundAndVibration";

const wallets = [
  inAppWallet({
    auth: {
      options: ["email", "google", "apple", "facebook"],
    },
  }),
  createWallet("io.metamask"),
  createWallet("com.trustwallet.app"),
  createWallet("com.safepal"),
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
  createWallet("io.zerion.wallet"),
];

export function Header() {
  const activeAccount = useActiveAccount();
  const isConnected = !!activeAccount;
  
  const { playConnectionSplash } = useSoundAndVibration();
  
  const [showSplash, setShowSplash] = useState(false);
  
  const wasConnectedRef = useRef<boolean | null>(null);
  
  useEffect(() => {
    if (wasConnectedRef.current === null) {
      wasConnectedRef.current = isConnected;
      return;
    }
    
    if (wasConnectedRef.current === false && isConnected === true) {
      console.log("🎆 WALLET CONNESSO! Esplosione emozionale!");
      
      playConnectionSplash();
      
      setShowSplash(true);
      
      setTimeout(() => {
        setShowSplash(false);
      }, 2000);
    }
    
    wasConnectedRef.current = isConnected;
  }, [isConnected, playConnectionSplash]);

  return (
    <header className="bg-[#161519] relative overflow-hidden">
      {/* 🎆 OVERLAY ESPLOSIONE EMOZIONALE */}
      {showSplash && (
        <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/40 via-purple-500/40 to-cyan-500/40 animate-[flash_0.5s_ease-out]" />
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 animate-[explode_1s_ease-out_forwards] opacity-80" />
              
              <div className="absolute inset-0 rounded-full border-4 border-pink-400 animate-[ring-expand_1s_ease-out_forwards]" />
              <div className="absolute inset-0 rounded-full border-4 border-purple-400 animate-[ring-expand_1s_ease-out_0.2s_forwards]" />
              <div className="absolute inset-0 rounded-full border-4 border-cyan-400 animate-[ring-expand_1s_ease-out_0.4s_forwards]" />
            </div>
          </div>
          
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute left-1/2 top-1/2 w-3 h-3 rounded-full bg-white animate-[particle_1s_ease-out_forwards]"
              style={{
                transform: `rotate(${i * 30}deg) translateY(-50px)`,
                animationDelay: `${i * 0.05}s`,
                boxShadow: '0 0 10px #fff, 0 0 20px #ec4899',
              }}
            />
          ))}
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-4xl md:text-6xl font-black text-white animate-[bounce-in_0.5s_ease-out_0.3s_forwards] opacity-0 text-center px-4">
              <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(236,72,153,0.8)]">
                CONNESSO! 🎉
              </span>
            </div>
          </div>
        </div>
      )}
      
      {/* Effetti neon di sfondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-pink-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-24 bg-purple-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Titolo GIANKY NFT in alto */}
      <div className="pt-6 pb-2 text-center relative z-10">
        <h1 className="text-2xl md:text-3xl font-black">
          <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(236,72,153,0.5)]">
            GIANKY NFT
          </span>
        </h1>
      </div>

      {/* Container pulsante / embed */}
      <div className={`flex flex-col items-center justify-center relative z-10 ${isConnected ? 'py-4' : 'min-h-[calc(100vh-80px)]'}`}>
        
        {isConnected ? (
          /* Stato connesso: bottone dettagli */
          <div className="flex flex-col items-center gap-3">
            <ConnectButton
              client={thirdwebClient}
              chain={polygon}
              wallets={wallets}
              detailsButton={{
                style: {
                  background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                  border: "2px solid rgba(255,255,255,0.2)",
                  borderRadius: "16px",
                  padding: "12px 20px",
                  color: "white",
                  fontWeight: "600",
                  boxShadow: "0 0 20px rgba(34, 197, 94, 0.5)",
                },
              }}
              theme="dark"
            />
            <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-400 text-sm font-medium">Wallet Connesso</span>
            </div>
          </div>
        ) : (
          /* Stato non connesso: ConnectEmbed inline (nessun portal/modal) */
          <div className="flex flex-col items-center gap-4 w-full max-w-sm px-4">
            <p className="text-white/70 text-sm animate-pulse">
              <span className="text-pink-400 font-semibold">Connetti il tuo wallet</span> per iniziare
            </p>
            
            {/* Glow ring attorno all'embed */}
            <div className="relative w-full">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 opacity-40 blur-md animate-pulse" />
              <div className="relative">
                <ConnectEmbed
                  client={thirdwebClient}
                  chain={polygon}
                  wallets={wallets}
                  theme="dark"
                  showThirdwebBranding={false}
                  modalSize="compact"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
