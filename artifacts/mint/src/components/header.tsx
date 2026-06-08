"use client";

import { useState, useEffect, useRef } from "react";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";
import { polygon } from "thirdweb/chains";
import { thirdwebClient } from "@/lib/thirdweb";
import { useSoundAndVibration } from "@/hooks/useSoundAndVibration";

const wallets = [
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
  
  // Hook per suoni e vibrazioni
  const { playConnectionSplash } = useSoundAndVibration();
  
  // Stato per l'overlay esplosivo
  const [showSplash, setShowSplash] = useState(false);
  
  // Ref per tracciare lo stato precedente di isConnected
  const wasConnectedRef = useRef<boolean | null>(null);
  
  // Effetto che rileva quando il wallet viene connesso
  useEffect(() => {
    // Skip first render - solo dopo che wasConnectedRef è stato settato
    if (wasConnectedRef.current === null) {
      wasConnectedRef.current = isConnected;
      return;
    }
    
    // Se prima era disconnesso e ora è connesso = ESPLOSIONE!
    if (wasConnectedRef.current === false && isConnected === true) {
      console.log("🎆 WALLET CONNESSO! Esplosione emozionale!");
      
      // Attiva suono e vibrazione
      playConnectionSplash();
      
      // Mostra overlay visivo
      setShowSplash(true);
      
      // Rimuovi overlay dopo l'animazione
      setTimeout(() => {
        setShowSplash(false);
      }, 2000);
    }
    
    // Aggiorna il ref
    wasConnectedRef.current = isConnected;
  }, [isConnected, playConnectionSplash]);

  return (
    <header className="bg-[#161519] relative overflow-hidden">
      {/* 🎆 OVERLAY ESPLOSIONE EMOZIONALE */}
      {showSplash && (
        <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
          {/* Sfondo flash */}
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/40 via-purple-500/40 to-cyan-500/40 animate-[flash_0.5s_ease-out]" />
          
          {/* Raggi di luce dal centro */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* Cerchio centrale esplosivo */}
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 animate-[explode_1s_ease-out_forwards] opacity-80" />
              
              {/* Anelli che si espandono */}
              <div className="absolute inset-0 rounded-full border-4 border-pink-400 animate-[ring-expand_1s_ease-out_forwards]" />
              <div className="absolute inset-0 rounded-full border-4 border-purple-400 animate-[ring-expand_1s_ease-out_0.2s_forwards]" />
              <div className="absolute inset-0 rounded-full border-4 border-cyan-400 animate-[ring-expand_1s_ease-out_0.4s_forwards]" />
            </div>
          </div>
          
          {/* Particelle/stelle che esplodono */}
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
          
          {/* Testo celebrativo */}
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
        {/* Cerchi neon animati */}
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

      {/* Container per pulsante - CENTRATO nella viewport */}
      <div className={`flex flex-col items-center justify-center relative z-10 ${isConnected ? 'py-4' : 'min-h-[calc(100vh-80px)]'}`}>
        
        {/* Container del pulsante con effetti */}
        <div className="relative">
          {/* Anello neon pulsante intorno al bottone */}
          <div className={`absolute -inset-4 rounded-2xl bg-gradient-to-r ${isConnected ? 'from-green-500 to-emerald-600' : 'from-pink-500 via-purple-500 to-cyan-500'} opacity-30 blur-xl animate-pulse`} />
          <div className={`absolute -inset-2 rounded-xl bg-gradient-to-r ${isConnected ? 'from-green-500 to-emerald-600' : 'from-pink-500 to-purple-600'} opacity-20 blur-md`} />
          
          {/* Pulsante Connect di Thirdweb */}
          <div className="relative z-10">
            <ConnectButton
              client={thirdwebClient}
              chain={polygon}
              wallets={wallets}
              connectButton={{
                label: "Connect Wallet",
                style: {
                  background: "linear-gradient(135deg, #ec4899 0%, #db2777 50%, #9333ea 100%)",
                  color: "white",
                  fontWeight: "700",
                  padding: "16px 32px",
                  fontSize: "16px",
                  borderRadius: "16px",
                  border: "2px solid rgba(255,255,255,0.2)",
                  boxShadow: "0 0 30px rgba(236, 72, 153, 0.5), 0 0 60px rgba(147, 51, 234, 0.3)",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                },
              }}
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
              connectModal={{
                size: "compact",
                title: "Connect Wallet",
                showThirdwebBranding: false,
              }}
            />
          </div>
          
          {/* Freccia laterale SINISTRA */}
          {!isConnected && (
            <div className="absolute -left-12 top-1/2 -translate-y-1/2 text-2xl animate-bounce-right text-pink-400 drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]">
              ➤
            </div>
          )}
          
          {/* Freccia laterale DESTRA - stesso colore rosa */}
          {!isConnected && (
            <div 
              className="absolute -right-12 top-1/2 -translate-y-1/2 text-2xl animate-bounce-horizontal drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]"
              style={{ color: '#f472b6' }}
            >
              ◀
            </div>
          )}
        </div>
        
        {/* Dito SOTTO al pulsante - al centro */}
        {!isConnected && (
          <div className="mt-6 animate-bounce">
            <div className="relative">
              {/* Glow del dito */}
              <div className="absolute inset-0 text-5xl blur-sm text-pink-400 animate-pulse">
                👆
              </div>
              {/* Dito */}
              <span className="text-5xl relative z-10 drop-shadow-[0_0_10px_rgba(236,72,153,0.8)]">
                👆
              </span>
            </div>
          </div>
        )}
        
        {/* Testo call-to-action */}
        {!isConnected && (
          <p className="mt-4 text-center text-sm md:text-base text-white/70 animate-pulse">
            <span className="text-pink-400 font-semibold">Clicca qui</span> per connettere il tuo wallet
          </p>
        )}
        
        {/* Badge connesso */}
        {isConnected && (
          <div className="mt-3 flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-400 text-sm font-medium">Wallet Connesso</span>
          </div>
        )}
      </div>
    </header>
  );
}
