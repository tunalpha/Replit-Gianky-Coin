import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wallet, Send, Download, Copy, Check, ExternalLink, 
  RefreshCw, Lock, ArrowLeft, X, LogOut
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import { ThirdwebProvider, ConnectButton, useActiveAccount, useActiveWallet, useSendTransaction, useDisconnect } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";
import { polygon } from "thirdweb/chains";
import { getContract, prepareContractCall } from "thirdweb";
import ConfettiExplosion from 'react-confetti-explosion';
import { thirdwebClient } from '@/lib/thirdweb';

// API URL
const API_URL = import.meta.env.VITE_API_URL || "";

// Logo
const LOGO_URL = 'https://customer-assets.emergentagent.com/job_coin-overhaul/artifacts/b827bvvg_ea3d65f2-73a1-4e70-b600-dd0364348cf9.jpeg';

// NFT Contract Address su Polygon
const NFT_CONTRACT_ADDRESS = '0x106fb804D03D4EA95CaeFA45C3215b57D8E6835D';

// Wallets supportati
const wallets = [
  createWallet("io.metamask"),
  createWallet("com.trustwallet.app"),
  createWallet("com.safepal"),
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
  createWallet("io.zerion.wallet"),
];

// Traduzioni
const translations = {
  it: {
    title: 'NFT Wallet',
    subtitle: 'Gestisci i tuoi NFT GiankyCoin',
    connectWallet: 'Connetti Wallet',
    disconnect: 'Disconnetti',
    send: 'Invia',
    receive: 'Ricevi',
    yourNfts: 'I tuoi NFT',
    noNfts: 'Nessun NFT trovato',
    loading: 'Caricamento...',
    refresh: 'Aggiorna',
    staked: 'In Staking',
    free: 'Disponibile',
    selected: 'Selezionato',
    receiveNft: 'Ricevi NFT',
    yourAddress: 'Il tuo indirizzo',
    copyAddress: 'Copia indirizzo',
    copied: 'Copiato!',
    scanQr: 'Scansiona il QR code per inviare NFT a questo wallet',
    cancel: 'Annulla',
    close: 'Chiudi',
    polygonNetwork: 'Rete Polygon',
    polygonConnected: 'Polygon Connesso',
    viewOnPolygon: 'Vedi su PolygonScan',
    buyNft: 'Acquista NFT',
    walletInfo: 'Connetti il tuo wallet per visualizzare e gestire i tuoi NFT GiankyCoin sulla rete Polygon.',
    clickAbove: 'Clicca il pulsante in alto a destra',
    selectNft: 'Seleziona NFT',
    sendNft: 'Invia NFT',
    recipientAddress: 'Indirizzo destinatario',
    confirmSend: 'Conferma Invio',
    sending: 'Invio...',
    invalidAddress: 'Indirizzo non valido',
    cantSendToSelf: 'Non puoi inviare a te stesso',
    noAvailableNfts: 'Nessun NFT disponibile per l\'invio',
    sendError: 'Errore durante l\'invio',
    waitingSignature: 'In attesa della firma...',
    checkWallet: 'Controlla il tuo wallet per confermare',
    sendSuccess: 'NFT inviato con successo!',
    sentSuccessfully: 'inviato con successo!'
  },
  en: {
    title: 'NFT Wallet',
    subtitle: 'Manage your GiankyCoin NFTs',
    connectWallet: 'Connect Wallet',
    disconnect: 'Disconnect',
    send: 'Send',
    receive: 'Receive',
    yourNfts: 'Your NFTs',
    noNfts: 'No NFTs found',
    loading: 'Loading...',
    refresh: 'Refresh',
    staked: 'Staked',
    free: 'Available',
    selected: 'Selected',
    receiveNft: 'Receive NFT',
    yourAddress: 'Your address',
    copyAddress: 'Copy address',
    copied: 'Copied!',
    scanQr: 'Scan QR code to send NFT to this wallet',
    cancel: 'Cancel',
    close: 'Close',
    polygonNetwork: 'Polygon Network',
    polygonConnected: 'Polygon Connected',
    viewOnPolygon: 'View on PolygonScan',
    buyNft: 'Buy NFT',
    walletInfo: 'Connect your wallet to view and manage your GiankyCoin NFTs on the Polygon network.',
    clickAbove: 'Click the button in the top right',
    selectNft: 'Select NFT',
    sendNft: 'Send NFT',
    recipientAddress: 'Recipient address',
    confirmSend: 'Confirm Send',
    sending: 'Sending...',
    invalidAddress: 'Invalid address',
    cantSendToSelf: 'Cannot send to yourself',
    noAvailableNfts: 'No NFTs available for sending',
    sendError: 'Error while sending',
    waitingSignature: 'Waiting for signature...',
    checkWallet: 'Check your wallet to confirm',
    sendSuccess: 'NFT sent successfully!',
    sentSuccessfully: 'sent successfully!'
  }
};

// QR Code Component
const QRCode = ({ value, size = 200 }) => {
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(value)}&bgcolor=0a0a0a&color=00f0ff`;
  return (
    <div className="bg-[#0a0a0a] p-4 rounded-2xl">
      <img src={qrUrl} alt="QR Code" className="rounded-lg" />
    </div>
  );
};

// NFT Card Component - With floating animated logo effect like homepage
const NFTCard = ({ tokenId, imageUrl, name, isStaked, t, isSelected, onSelect }) => {
  // Determine NFT tier based on token ID range
  const getTierInfo = (id) => {
    const numId = parseInt(id);
    if (numId >= 5000000) return { tier: 'DIAMOND', color: 'from-amber-400 to-yellow-300', borderColor: 'border-amber-400/60', glowColor: 'rgba(251,191,36,0.4)' };
    if (numId >= 4000000) return { tier: 'PREMIUM', color: 'from-cyan-500 to-blue-500', borderColor: 'border-cyan-500/50', glowColor: 'rgba(0,240,255,0.3)' };
    if (numId >= 3000000) return { tier: 'VIP', color: 'from-purple-500 to-pink-500', borderColor: 'border-purple-500/50', glowColor: 'rgba(168,85,247,0.3)' };
    if (numId >= 2000000) return { tier: 'STANDARD', color: 'from-green-500 to-emerald-500', borderColor: 'border-green-500/50', glowColor: 'rgba(34,197,94,0.3)' };
    if (numId >= 1000000) return { tier: 'BASIC', color: 'from-slate-400 to-slate-300', borderColor: 'border-slate-400/50', glowColor: 'rgba(148,163,184,0.3)' };
    return { tier: 'STARTER', color: 'from-orange-500 to-amber-500', borderColor: 'border-orange-500/50', glowColor: 'rgba(249,115,22,0.3)' };
  };
  
  const tierInfo = getTierInfo(tokenId);
  const canSelect = !isStaked && onSelect;
  const isDiamond = parseInt(tokenId) >= 5000000;
  
  return (
    <motion.div 
      className={`relative p-3 rounded-2xl border transition-all cursor-pointer ${
        isSelected 
          ? 'border-green-500 bg-green-500/10 ring-2 ring-green-500/50' 
          : isStaked 
            ? 'border-orange-500/30 bg-orange-500/5' 
            : isDiamond 
              ? 'border-amber-400/30 bg-amber-500/5 hover:border-amber-400/60'
              : 'border-white/10 bg-white/5 hover:border-cyan-500/50'
      }`}
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      onClick={() => canSelect && onSelect()}
    >
      {/* Selection Checkmark */}
      {isSelected && (
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-1 right-1 z-20 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center shadow-[0_0_10px_rgba(34,197,94,0.5)]"
        >
          <Check className="w-4 h-4 text-white" strokeWidth={3} />
        </motion.div>
      )}
      
      {/* Staked Badge */}
      {isStaked && !isSelected && (
        <div className="absolute top-1 right-1 bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded-full text-[10px] flex items-center gap-1 z-10">
          <Lock className="w-2.5 h-2.5" />
          {t.staked}
        </div>
      )}
      
      {/* Animated NFT Logo - Enhanced like Homepage Hero */}
      <motion.div className="relative w-full aspect-square mb-2">
        {/* Outer Glow Ring - pulsing */}
        <motion.div 
          className={`absolute inset-0 rounded-full blur-xl`}
          style={{ background: `radial-gradient(circle, ${tierInfo.glowColor} 0%, transparent 70%)` }}
          animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        
        {/* Outer rotating ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className={`absolute inset-0 rounded-full border ${tierInfo.borderColor}`}
        />
        
        {/* Inner rotating ring (opposite direction) */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className={`absolute inset-2 rounded-full border border-white/10`}
        />
        
        {/* Main Logo - Floating effect */}
        <motion.div
          animate={{ y: [0, -4, 0], rotateY: [0, 5, 0, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className={`absolute inset-4 rounded-full overflow-hidden border-2 ${tierInfo.borderColor}`}
          style={{ boxShadow: `0 0 25px ${tierInfo.glowColor}` }}
        >
          <img 
            src={imageUrl || LOGO_URL} 
            alt={name || `NFT #${tokenId}`} 
            className="w-full h-full object-cover"
            onError={(e) => { e.target.src = LOGO_URL; }}
          />
        </motion.div>
        
        {/* Orbiting dot 1 - cyan */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(0,240,255,0.9)]" />
        </motion.div>
        
        {/* Orbiting dot 2 - purple */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-1"
        >
          <div className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-purple-500 rounded-full shadow-[0_0_8px_rgba(168,85,247,0.9)]" />
        </motion.div>
        
        {/* Orbiting dot 3 - tier color (for diamond = gold) */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-2"
        >
          <div 
            className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full ${isDiamond ? 'bg-amber-400' : 'bg-cyan-300'}`}
            style={{ boxShadow: `0 0 6px ${tierInfo.glowColor}` }}
          />
        </motion.div>
        
        {/* Selection overlay */}
        {isSelected && (
          <div className="absolute inset-4 rounded-full bg-green-500/20 pointer-events-none" />
        )}
      </motion.div>
      
      {/* Tier Badge */}
      <div className="text-center mb-1">
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full bg-gradient-to-r ${tierInfo.color} text-black`}>
          {tierInfo.tier}
        </span>
      </div>
      
      {/* Token ID and Status */}
      <div className="text-center">
        <p className="text-white font-bold text-sm">#{tokenId}</p>
        <p className={`text-[10px] ${isSelected ? 'text-green-400' : isStaked ? 'text-orange-400' : 'text-cyan-400'}`}>
          {isSelected ? (t.selected || 'Selezionato') : isStaked ? t.staked : t.free}
        </p>
      </div>
    </motion.div>
  );
};

// Receive Modal
const ReceiveModal = ({ isOpen, onClose, address, t }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-6 max-w-md w-full"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Download className="w-5 h-5 text-cyan-400" />
            {t.receiveNft}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex justify-center mb-6">
          <QRCode value={address} size={200} />
        </div>

        <p className="text-center text-slate-400 text-sm mb-4">{t.scanQr}</p>

        <div className="mb-6">
          <label className="block text-sm text-slate-400 mb-2">{t.yourAddress}</label>
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
            <span className="text-white text-sm flex-1 truncate font-mono">{address}</span>
            <button onClick={copyToClipboard} className="text-cyan-400 hover:text-cyan-300">
              {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 px-4 rounded-xl border border-white/10 text-slate-400 hover:text-white transition-colors"
        >
          {t.cancel}
        </button>
      </motion.div>
    </motion.div>
  );
};

// Send Modal - Real NFT transfer with wallet signature
const SendModal = ({ isOpen, onClose, nfts, preSelectedNft, t, walletAddress, onSendSuccess, onTransactionSuccess }) => {
  const [selectedNft, setSelectedNft] = useState(preSelectedNft);
  const [recipientAddress, setRecipientAddress] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');
  const [txStatus, setTxStatus] = useState(null); // 'pending' | 'success' | 'error'
  const [txHash, setTxHash] = useState('');
  
  // Thirdweb send transaction hook
  const { mutateAsync: sendTransaction, isPending } = useSendTransaction();

  // Update selected when preSelectedNft changes
  useEffect(() => {
    if (preSelectedNft) {
      setSelectedNft(preSelectedNft);
    }
  }, [preSelectedNft]);

  const handleSend = async () => {
    if (!selectedNft || !recipientAddress || !walletAddress) return;
    
    // Validate address format
    if (!recipientAddress.match(/^0x[a-fA-F0-9]{40}$/)) {
      setError(t.invalidAddress || 'Indirizzo non valido');
      return;
    }
    
    // Prevent sending to self
    if (recipientAddress.toLowerCase() === walletAddress.toLowerCase()) {
      setError(t.cantSendToSelf || 'Non puoi inviare a te stesso');
      return;
    }
    
    setError('');
    setIsSending(true);
    setTxStatus('pending');
    
    try {
      // Get NFT contract
      const nftContract = getContract({
        client: thirdwebClient,
        chain: polygon,
        address: NFT_CONTRACT_ADDRESS,
      });
      
      // Prepare safeTransferFrom transaction for ERC721
      const transaction = prepareContractCall({
        contract: nftContract,
        method: "function safeTransferFrom(address from, address to, uint256 tokenId)",
        params: [walletAddress, recipientAddress, BigInt(selectedNft.tokenId)],
      });
      
      // Send transaction - this will prompt wallet signature
      const result = await sendTransaction(transaction);
      
      setTxHash(result.transactionHash);
      setTxStatus('success');
      
      // Trigger confetti explosion in parent component AND remove NFT from list
      if (onTransactionSuccess) {
        onTransactionSuccess(String(selectedNft.tokenId));
      }
      
      // DON'T call onSendSuccess here - it would overwrite the locally filtered list
      // The API is rate-limited anyway, so local removal is the reliable method
      
    } catch (err) {
      console.error('Send NFT error:', err);
      setTxStatus('error');
      setError(err.message || t.sendError || 'Errore durante l\'invio');
    } finally {
      setIsSending(false);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Send className="w-5 h-5 text-cyan-400" />
            {t.sendNft || 'Invia NFT'}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Select NFT - Selected one has animated logo */}
        <div className="mb-6">
          <label className="block text-sm text-slate-400 mb-3">{t.selectNft || 'Seleziona NFT'}</label>
          
          {/* Selected NFT Preview - EXACT same animation as main page */}
          {selectedNft && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-4 p-4 bg-green-500/5 border border-green-500/30 rounded-2xl"
            >
              <div className="flex items-center gap-4">
                {/* Animated Logo - EXACT copy from NFTCard */}
                <motion.div className="relative w-24 h-24 flex-shrink-0">
                  {/* Outer Glow Ring - pulsing */}
                  <motion.div 
                    className="absolute inset-0 rounded-full blur-xl"
                    style={{ background: 'radial-gradient(circle, rgba(34,197,94,0.4) 0%, transparent 70%)' }}
                    animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  
                  {/* Outer rotating ring */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0 rounded-full border border-green-500/50"
                  />
                  
                  {/* Inner rotating ring (opposite direction) */}
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-2 rounded-full border border-white/10"
                  />
                  
                  {/* Main Logo - Floating effect with rotateY */}
                  <motion.div
                    animate={{ y: [0, -4, 0], rotateY: [0, 5, 0, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute inset-4 rounded-full overflow-hidden border-2 border-green-500/50"
                    style={{ boxShadow: '0 0 25px rgba(34,197,94,0.4)' }}
                  >
                    <img 
                      src={selectedNft.imageUrl || LOGO_URL} 
                      alt={`NFT #${selectedNft.tokenId}`} 
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  
                  {/* Orbiting dot 1 - cyan */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0"
                  >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(0,240,255,0.9)]" />
                  </motion.div>
                  
                  {/* Orbiting dot 2 - purple */}
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-1"
                  >
                    <div className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-purple-500 rounded-full shadow-[0_0_8px_rgba(168,85,247,0.9)]" />
                  </motion.div>
                  
                  {/* Orbiting dot 3 - green */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-2"
                  >
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-green-400 shadow-[0_0_6px_rgba(34,197,94,0.8)]" />
                  </motion.div>
                </motion.div>
                
                {/* NFT Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Check className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 text-sm font-medium">{t.selected || 'Selezionato'}</span>
                  </div>
                  <p className="text-white font-bold text-lg">NFT #{selectedNft.tokenId}</p>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* NFT Grid - Round thumbnails like main page */}
          <div className="grid grid-cols-4 gap-2 max-h-32 overflow-y-auto p-1">
            {nfts.filter(n => !n.isStaked).map(nft => (
              <button
                key={nft.tokenId}
                onClick={() => setSelectedNft(nft)}
                className={`relative p-1.5 rounded-xl border transition-all ${
                  selectedNft?.tokenId === nft.tokenId
                    ? 'border-green-500 bg-green-500/20'
                    : 'border-white/10 bg-white/5 hover:border-white/30'
                }`}
              >
                {selectedNft?.tokenId === nft.tokenId && (
                  <div className="absolute -top-1 -right-1 z-10 w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                  </div>
                )}
                {/* Round image like main page */}
                <div className="relative w-full aspect-square">
                  <div className={`absolute inset-0 rounded-full ${selectedNft?.tokenId === nft.tokenId ? 'border-2 border-green-500/50 shadow-[0_0_10px_rgba(34,197,94,0.3)]' : 'border border-white/20'}`}>
                    <img 
                      src={nft.imageUrl || LOGO_URL} 
                      alt={`NFT #${nft.tokenId}`}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>
                <p className={`text-[10px] text-center mt-1 ${selectedNft?.tokenId === nft.tokenId ? 'text-green-400' : 'text-slate-400'}`}>
                  #{nft.tokenId}
                </p>
              </button>
            ))}
          </div>
          {nfts.filter(n => !n.isStaked).length === 0 && (
            <p className="text-slate-500 text-sm text-center py-4">{t.noAvailableNfts || 'Nessun NFT disponibile per l\'invio'}</p>
          )}
        </div>

        {/* Recipient Address */}
        <div className="mb-6">
          <label className="block text-sm text-slate-400 mb-2">{t.recipientAddress || 'Indirizzo destinatario'}</label>
          <input
            type="text"
            value={recipientAddress}
            onChange={(e) => setRecipientAddress(e.target.value)}
            placeholder="0x..."
            disabled={txStatus === 'success'}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-mono text-sm focus:border-cyan-500 focus:outline-none transition-colors disabled:opacity-50"
          />
          {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
        </div>

        {/* Transaction Status */}
        {txStatus === 'pending' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full"
              />
              <span className="text-cyan-400 font-medium">{t.waitingSignature || 'In attesa della firma...'}</span>
            </div>
            <p className="text-slate-400 text-xs">{t.checkWallet || 'Controlla il tuo wallet per confermare la transazione'}</p>
          </motion.div>
        )}

        {txStatus === 'success' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-4 p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.5)]"
              >
                <Check className="w-6 h-6 text-white" />
              </motion.div>
            </div>
            <p className="text-green-400 font-bold text-lg mb-1">
              NFT ID {selectedNft?.tokenId} {t.sentSuccessfully || 'inviato con successo!'}
            </p>
            {txHash && (
              <a 
                href={`https://polygonscan.com/tx/${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 text-sm hover:underline inline-flex items-center gap-1"
              >
                {t.viewOnPolygon || 'Vedi su PolygonScan'} →
              </a>
            )}
          </motion.div>
        )}

        {/* Send Button */}
        {txStatus !== 'success' && (
          <button
            onClick={handleSend}
            disabled={!selectedNft || !recipientAddress || isSending || isPending}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-400 text-black font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-[0_0_20px_rgba(0,240,255,0.3)]"
          >
            {isSending || isPending ? (t.sending || 'Invio...') : (t.confirmSend || 'Conferma Invio')}
          </button>
        )}

        <button
          onClick={() => {
            setTxStatus(null);
            setTxHash('');
            setError('');
            onClose();
          }}
          className="w-full mt-3 py-3 px-4 rounded-xl border border-white/10 text-slate-400 hover:text-white transition-colors"
        >
          {txStatus === 'success' ? (t.close || 'Chiudi') : t.cancel}
        </button>
      </motion.div>
    </motion.div>
  );
};

// Inner Wallet Component (usa hooks Thirdweb)
const NftWalletInner = () => {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;
  
  // Thirdweb hooks
  const activeAccount = useActiveAccount();
  const activeWallet = useActiveWallet();
  const { disconnect } = useDisconnect();
  
  const isConnected = !!activeAccount;
  const walletAddress = activeAccount?.address;
  
  const [showReceiveModal, setShowReceiveModal] = useState(false);
  const [showSendModal, setShowSendModal] = useState(false);
  const [nfts, setNfts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedNftForSend, setSelectedNftForSend] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [sentNftId, setSentNftId] = useState(null);

  // Tier order map for sorting: Starter → BASIC → Standard → VIP → Premium → Diamond
  const TIER_ORDER = {
    'STARTER': 0,
    'BASIC': 1,
    'STANDARD': 2,
    'VIP': 3,
    'PREMIUM': 4,
    'DIAMOND': 5
  };

  // Get tier from token ID - shared logic
  const getTierFromTokenId = (tokenId) => {
    const numId = parseInt(tokenId);
    if (numId >= 5000000) return 'DIAMOND';
    if (numId >= 4000000) return 'PREMIUM';
    if (numId >= 3000000) return 'VIP';
    if (numId >= 2000000) return 'STANDARD';
    if (numId >= 1000000) return 'BASIC';
    return 'STARTER';
  };

  // Sort NFTs by tier (ascending: Starter → Diamond)
  const sortedNfts = useMemo(() => {
    return [...nfts].sort((a, b) => {
      const tierA = getTierFromTokenId(a.tokenId);
      const tierB = getTierFromTokenId(b.tokenId);
      return TIER_ORDER[tierA] - TIER_ORDER[tierB];
    });
  }, [nfts]);

  // Logout function
  const handleLogout = () => {
    if (activeWallet) {
      disconnect(activeWallet);
    }
  };

  // Fetch NFTs - wrapped in useCallback for stable reference
  const fetchNFTs = useCallback(async () => {
    if (!walletAddress) return;
    
    setIsLoading(true);
    try {
      // Add cache-busting timestamp to force fresh data
      const timestamp = Date.now();
      const base = import.meta.env.BASE_URL?.replace(/\/$/, '') || '';
      const response = await fetch(
        `${base}/api/nfts?owner=${encodeURIComponent(walletAddress)}&contract=${encodeURIComponent(NFT_CONTRACT_ADDRESS)}&withMetadata=true&t=${timestamp}`
      );
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();

      if (data.ownedNfts) {
        setNfts(data.ownedNfts.map(nft => {
          const tokenId = parseInt(nft.id.tokenId, 10);
          const image = nft.metadata?.image || nft.media?.[0]?.gateway || LOGO_URL;
          return {
            tokenId,
            imageUrl: image,
            name: nft.title || nft.metadata?.name || `GiankyCoin #${tokenId}`,
            isStaked: false,
          };
        }));
      }
    } catch (error) {
      console.error('Error fetching NFTs:', error);
    } finally {
      setIsLoading(false);
    }
  }, [walletAddress]);

  // Fetch NFTs quando connesso
  useEffect(() => {
    if (walletAddress) {
      fetchNFTs();
    } else {
      setNfts([]);
    }
  }, [walletAddress, fetchNFTs]);

  // Handle successful transaction - trigger confetti and remove NFT from local list
  const handleTransactionSuccess = useCallback((tokenId) => {
    const nftId = String(tokenId);
    setSentNftId(nftId);
    
    // Small delay to ensure state is set before showing confetti
    setTimeout(() => {
      setShowConfetti(true);
    }, 50);
    
    // Remove sent NFT from local list immediately
    setNfts(prevNfts => prevNfts.filter(nft => String(nft.tokenId) !== nftId));
    
    // Clear selection
    setSelectedNftForSend(null);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] relative">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 pointer-events-none" />
      
      {/* Full Screen Celebration - Confetti + Animated Send Icon */}
      {showConfetti && (
        <>
          {/* Animated "Sent" Icon - Flying coin with arrow */}
          <motion.div 
            className="fixed inset-0 pointer-events-none z-[10000] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Large animated coin flying upward */}
            <motion.div
              initial={{ y: 0, scale: 1, opacity: 1 }}
              animate={{ 
                y: [-50, -300], 
                scale: [1, 1.5, 0.8],
                opacity: [1, 1, 0]
              }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="relative"
            >
              {/* Coin with glow */}
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center shadow-[0_0_60px_rgba(251,191,36,0.8)]">
                <img src={LOGO_URL} alt="Sent" className="w-20 h-20 rounded-full object-cover" />
              </div>
              {/* Arrow indicating sent */}
              <motion.div 
                className="absolute -top-8 left-1/2 -translate-x-1/2"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 0.5, repeat: 3 }}
              >
                <Send className="w-8 h-8 text-cyan-400 rotate-[-45deg]" />
              </motion.div>
            </motion.div>
            
            {/* "NFT Inviato!" text */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: [0, 1, 1, 0], y: [50, 0, 0, -20] }}
              transition={{ duration: 3, times: [0, 0.2, 0.8, 1] }}
              className="absolute top-1/2 mt-20 text-center"
            >
              <p className="text-3xl font-bold text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]">
                NFT ID {sentNftId}
              </p>
              <p className="text-xl text-green-400 font-medium mt-1">
                Inviato con successo! ✓
              </p>
            </motion.div>
          </motion.div>
          
          {/* Multiple Confetti Explosions - Longer duration */}
          {/* Center explosion - Main burst */}
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[9999]">
            <ConfettiExplosion
              key={`center-${sentNftId}`}
              force={1}
              duration={6000}
              particleCount={400}
              width={3000}
              zIndex={9999}
              colors={['#fbbf24', '#f59e0b', '#d97706', '#fcd34d', '#00f0ff', '#a855f7', '#22c55e']}
            />
          </div>
          
          {/* Top left explosion */}
          <div className="fixed top-1/4 left-1/4 pointer-events-none z-[9999]">
            <ConfettiExplosion
              key={`tl-${sentNftId}`}
              force={0.9}
              duration={5500}
              particleCount={200}
              width={2000}
              zIndex={9999}
              colors={['#fbbf24', '#f59e0b', '#eab308', '#fcd34d']}
            />
          </div>
          
          {/* Top right explosion */}
          <div className="fixed top-1/4 right-1/4 pointer-events-none z-[9999]">
            <ConfettiExplosion
              key={`tr-${sentNftId}`}
              force={0.9}
              duration={5500}
              particleCount={200}
              width={2000}
              zIndex={9999}
              colors={['#00f0ff', '#22d3ee', '#06b6d4', '#a855f7']}
            />
          </div>
          
          {/* Bottom explosion */}
          <div className="fixed bottom-1/4 left-1/2 -translate-x-1/2 pointer-events-none z-[9999]">
            <ConfettiExplosion
              key={`bottom-${sentNftId}`}
              force={1}
              duration={6000}
              particleCount={300}
              width={2500}
              zIndex={9999}
              colors={['#22c55e', '#4ade80', '#fbbf24', '#f59e0b']}
              onComplete={() => {
                setTimeout(() => {
                  setShowConfetti(false);
                  setSentNftId(null);
                }, 1000);
              }}
            />
          </div>
        </>
      )}
      
      {/* Header */}
      <header className="relative z-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <ArrowLeft className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 transition-colors" />
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-cyan-500/50">
              <img src={LOGO_URL} alt="GiankyCoin" className="w-full h-full object-cover" />
            </div>
            <span className="font-heading font-bold text-white hidden sm:block">GIANKY COIN</span>
          </Link>
          
          {/* Wallet Connection / Logout */}
          {isConnected ? (
            <div className="flex items-center gap-2">
              {/* Wallet Address */}
              <div className="hidden sm:flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-white text-sm font-mono">
                  {walletAddress?.slice(0, 6)}...{walletAddress?.slice(-4)}
                </span>
              </div>
              
              {/* Logout Button - Visible and easy to tap */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 hover:text-red-300 px-3 py-2 rounded-xl transition-all"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm font-medium">{t.disconnect}</span>
              </button>
            </div>
          ) : (
            <ConnectButton
              client={thirdwebClient}
              chain={polygon}
              wallets={wallets}
              connectButton={{
                label: t.connectWallet,
                style: {
                  background: "linear-gradient(to right, #06b6d4, #22d3ee)",
                  color: "#000",
                  fontWeight: "bold",
                  padding: "10px 20px",
                  borderRadius: "12px",
                  fontSize: "14px",
                }
              }}
              theme="dark"
              connectModal={{
                size: "compact",
                title: t.connectWallet,
                showThirdwebBranding: false
              }}
            />
          )}
        </div>
      </header>

      <main className="relative z-20 max-w-4xl mx-auto px-4 py-8 sm:py-12">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-2">
            {t.title}
          </h1>
          <p className="text-slate-400">{t.subtitle}</p>
          
          <div className={`inline-flex items-center gap-2 mt-4 px-3 py-1 rounded-full text-xs ${
            isConnected 
              ? 'bg-green-500/10 border border-green-500/30 text-green-400'
              : 'bg-purple-500/10 border border-purple-500/30 text-purple-400'
          }`}>
            <span className={`w-2 h-2 rounded-full animate-pulse ${isConnected ? 'bg-green-400' : 'bg-purple-400'}`} />
            {isConnected ? t.polygonConnected : t.polygonNetwork}
          </div>
        </motion.div>

        {/* Not Connected State - Animated Logo like Homepage */}
        {!isConnected && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 sm:p-12 text-center"
          >
            {/* Animated Logo - Same as Homepage Hero */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="relative w-32 h-32 mx-auto mb-8"
            >
              {/* Glow Ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-xl animate-pulse" />
              
              {/* Single Animated Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-1 rounded-full border border-cyan-500/30"
              />
              
              {/* Main Logo */}
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-4 rounded-full overflow-hidden shadow-[0_0_30px_rgba(0,240,255,0.4)] border-2 border-cyan-500/50"
              >
                <img src={LOGO_URL} alt="Gianky Coin" className="w-full h-full object-cover" />
              </motion.div>
              
              {/* Orbiting dots */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(0,240,255,0.8)]" />
              </motion.div>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-2"
              >
                <div className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-purple-500 rounded-full shadow-[0_0_10px_rgba(112,0,255,0.8)]" />
              </motion.div>
            </motion.div>
            
            <h2 className="text-xl font-bold text-white mb-3">{t.connectWallet}</h2>
            <p className="text-slate-400 text-sm mb-4 max-w-md mx-auto">{t.walletInfo}</p>
            
            {/* Arrow pointing to header button */}
            <motion.div 
              className="flex items-center justify-center gap-2 text-cyan-400 text-sm"
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <span>👆</span>
              <span>{t.clickAbove || 'Clicca il pulsante in alto a destra'}</span>
            </motion.div>
          </motion.div>
        )}

        {/* Connected State */}
        {isConnected && walletAddress && (
          <>
            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-2 gap-4 mb-8"
            >
              <button
                onClick={() => setShowSendModal(true)}
                className="flex items-center justify-center gap-3 py-4 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 to-cyan-400 text-black font-bold active:scale-95 transition-all shadow-[0_0_30px_rgba(0,240,255,0.3)]"
              >
                <Send className="w-5 h-5" />
                {t.send}
              </button>
              
              <button
                onClick={() => setShowReceiveModal(true)}
                className="flex items-center justify-center gap-3 py-4 px-6 rounded-2xl bg-white/5 border border-white/20 text-white font-bold hover:bg-white/10 active:scale-95 transition-all"
              >
                <Download className="w-5 h-5" />
                {t.receive}
              </button>
            </motion.div>

            {/* NFT Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-white">{t.yourNfts}</h2>
                <button
                  onClick={fetchNFTs}
                  disabled={isLoading}
                  className="flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 disabled:opacity-50"
                >
                  <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                  {t.refresh}
                </button>
              </div>

              {isLoading ? (
                <div className="text-center py-12">
                  <RefreshCw className="w-8 h-8 text-cyan-400 animate-spin mx-auto mb-3" />
                  <p className="text-slate-400">{t.loading}</p>
                </div>
              ) : nfts.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                    <Wallet className="w-8 h-8 text-slate-500" />
                  </div>
                  <p className="text-slate-400 mb-4">{t.noNfts}</p>
                  <Link to="/piattaforma-minting" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm">
                    {t.buyNft} <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>
              ) : (
                <>
                  {/* Selection hint when NFT is selected */}
                  {selectedNftForSend && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-4 p-3 rounded-xl bg-green-500/10 border border-green-500/30 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-green-400" />
                        <span className="text-green-400 text-sm">
                          NFT #{selectedNftForSend.tokenId} {t.selected || 'selezionato'}
                        </span>
                      </div>
                      <button 
                        onClick={() => setSelectedNftForSend(null)}
                        className="text-slate-400 hover:text-white"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </motion.div>
                  )}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {sortedNfts.map(nft => (
                      <NFTCard 
                        key={nft.tokenId}
                        tokenId={nft.tokenId}
                        imageUrl={nft.imageUrl}
                        name={nft.name}
                        isStaked={nft.isStaked}
                        isSelected={selectedNftForSend?.tokenId === nft.tokenId}
                        onSelect={!nft.isStaked ? () => {
                          setSelectedNftForSend(
                            selectedNftForSend?.tokenId === nft.tokenId ? null : nft
                          );
                        } : null}
                        t={t}
                      />
                    ))}
                  </div>
                </>
              )}
            </motion.div>

            {/* Contract Info */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 text-center">
              <a
                href={`https://polygonscan.com/address/${NFT_CONTRACT_ADDRESS}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-cyan-400 transition-colors"
              >
                {t.viewOnPolygon}
                <ExternalLink className="w-4 h-4" />
              </a>
            </motion.div>
          </>
        )}
      </main>

      {/* Receive Modal */}
      <AnimatePresence>
        {showReceiveModal && walletAddress && (
          <ReceiveModal 
            isOpen={showReceiveModal}
            onClose={() => setShowReceiveModal(false)}
            address={walletAddress}
            t={t}
          />
        )}
      </AnimatePresence>

      {/* Send Modal */}
      <AnimatePresence>
        {showSendModal && walletAddress && (
          <SendModal 
            isOpen={showSendModal}
            onClose={() => {
              setShowSendModal(false);
              setSelectedNftForSend(null);
            }}
            nfts={nfts}
            preSelectedNft={selectedNftForSend}
            walletAddress={walletAddress}
            onSendSuccess={fetchNFTs}
            onTransactionSuccess={handleTransactionSuccess}
            t={t}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// Main Component con ThirdwebProvider
const NftWalletV2 = () => {
  return (
    <ThirdwebProvider>
      <NftWalletInner />
    </ThirdwebProvider>
  );
};

export default NftWalletV2;
