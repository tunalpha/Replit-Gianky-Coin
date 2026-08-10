import { useEffect, useMemo, useState, useCallback } from 'react';
import { ethers } from 'ethers';
import confetti from 'canvas-confetti';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useWallet } from '@/hooks/useWallet';
import StakingNFTCard from './StakingNFTCard';
import STAKING_POOL_ABI from '@/lib/StakingPool.json';
import { Wallet, TrendingUp, Coins, ExternalLink, RefreshCw, AlertTriangle } from 'lucide-react';

const STAKING_ADDRESS = '0xD38A9fF129788ff31B0b050ccBC34016397a10b4';
const NFT_COLLECTION = '0x106fb804D03D4EA95CaeFA45C3215b57D8E6835D';

export default function StakingApp() {
  const { address, signer, isPolygon, connecting, error: walletError, connect, disconnect } = useWallet();

  const [walletNfts, setWalletNfts] = useState([]);
  const [stakedItems, setStakedItems] = useState([]);
  const [liveReward, setLiveReward] = useState('0.000000');
  const [txHash, setTxHash] = useState('');
  const [loadingData, setLoadingData] = useState(false);

  // Fetch staked items from contract
  const fetchStakes = useCallback(async () => {
    if (!signer || !address || !isPolygon) return;
    try {
      const stakingContract = new ethers.Contract(STAKING_ADDRESS, STAKING_POOL_ABI, signer);
      const result = await stakingContract.getUserStakes(address);
      setStakedItems(result[0] || []);
    } catch (e) {
      console.error('fetchStakes error', e);
    }
  }, [signer, address, isPolygon]);

  // Fetch wallet NFTs via backend proxy (keeps Alchemy key server-side)
  const fetchWalletNfts = useCallback(async () => {
    if (!address) return;
    try {
      const base = import.meta.env.BASE_URL?.replace(/\/$/, '') || '';
      const url = `${base}/api/nfts?owner=${address}&contract=${NFT_COLLECTION}`;
      const res = await fetch(url);
      const data = await res.json();
      setWalletNfts(data.ownedNfts || []);
    } catch (e) {
      console.error('fetchWalletNfts error', e);
    }
  }, [address]);

  // Load all data
  const loadData = useCallback(async () => {
    if (!address || !isPolygon) return;
    setLoadingData(true);
    await Promise.all([fetchStakes(), fetchWalletNfts()]);
    setLoadingData(false);
  }, [address, isPolygon, fetchStakes, fetchWalletNfts]);

  useEffect(() => { loadData(); }, [loadData, txHash]);

  // Live reward ticker
  useEffect(() => {
    if (!stakedItems.length) { setLiveReward('0.000000'); return; }
    const interval = setInterval(() => {
      const now = Math.floor(Date.now() / 1000);
      let accumulated = ethers.BigNumber.from(0);
      stakedItems.forEach((s) => {
        const cap = Math.min(now, s.lockEndTime.toNumber());
        const lastClaim = s.lastClaimTime.toNumber();
        if (cap > lastClaim) {
          accumulated = accumulated.add(ethers.BigNumber.from(cap - lastClaim).mul(s.rewardRate));
        }
      });
      setLiveReward(parseFloat(ethers.utils.formatEther(accumulated)).toFixed(6));
    }, 1000);
    return () => clearInterval(interval);
  }, [stakedItems]);

  // Total daily GKY
  const totalDailyGky = useMemo(() => {
    if (!stakedItems.length) return '0.00';
    const now = Math.floor(Date.now() / 1000);
    const total = stakedItems.reduce((acc, item) => {
      if (now >= item.lockEndTime.toNumber()) return acc;
      return acc.add(item.rewardRate);
    }, ethers.BigNumber.from(0));
    return parseFloat(ethers.utils.formatEther(total.mul(86400))).toFixed(2);
  }, [stakedItems]);

  const handleTxSuccess = (hash) => {
    setTxHash(hash);
  };

  // Claim all rewards
  const handleClaimAll = async () => {
    if (!signer || !stakedItems.length) return;
    try {
      const stakingContract = new ethers.Contract(STAKING_ADDRESS, STAKING_POOL_ABI, signer);
      const tokenIds = stakedItems.map((s) => s.tokenId.toString());
      const tx = await stakingContract.claim(tokenIds);
      toast.info('Claim in corso…');
      await tx.wait();
      confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } });
      toast.success('Rewards reclamati con successo!');
      handleTxSuccess(tx.hash);
    } catch (e) {
      toast.error(e?.reason || e?.message || 'Transazione fallita');
    }
  };

  // ── NOT CONNECTED ──
  if (!address) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#050505] px-4">
        <div className="glass rounded-3xl p-10 text-center max-w-sm w-full">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center mx-auto mb-6">
            <Wallet className="w-8 h-8 text-white" />
          </div>
          <h2 className="font-heading text-2xl font-bold text-white uppercase mb-3">
            Staking <span className="gradient-text">GiankyCoin</span>
          </h2>
          <p className="text-slate-400 text-sm mb-8 leading-relaxed">
            Connetti il tuo wallet MetaMask su rete Polygon per accedere allo staking.
          </p>
          {walletError && (
            <div className="flex items-start gap-2 bg-red-500/10 border border-red-500/20 rounded-xl p-3 mb-4 text-left">
              <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
              <p className="text-red-400 text-xs">{walletError}</p>
            </div>
          )}
          <button
            onClick={connect}
            disabled={connecting}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold uppercase tracking-wider text-sm hover:opacity-90 transition-opacity disabled:opacity-60"
          >
            {connecting ? 'Connessione…' : 'Connetti Wallet'}
          </button>
          {!window.ethereum && (
            <a
              href="https://metamask.io/download/"
              target="_blank"
              rel="noreferrer"
              className="mt-4 block text-xs text-cyan-400 hover:underline"
            >
              Non hai MetaMask? Scaricalo qui →
            </a>
          )}
        </div>
      </div>
    );
  }

  // ── WRONG NETWORK ──
  if (!isPolygon) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#050505] px-4">
        <div className="glass rounded-3xl p-10 text-center max-w-sm w-full">
          <AlertTriangle className="w-12 h-12 text-amber-400 mx-auto mb-4" />
          <h2 className="font-heading text-xl font-bold text-white uppercase mb-3">Rete Errata</h2>
          <p className="text-slate-400 text-sm mb-6">Devi essere su <span className="text-white font-bold">Polygon Mainnet</span> per usare lo staking.</p>
          <button
            onClick={connect}
            className="w-full py-3.5 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 font-bold uppercase tracking-wider text-sm hover:bg-amber-500/30 transition-all"
          >
            Passa a Polygon
          </button>
        </div>
      </div>
    );
  }

  // ── MAIN STAKING UI ──
  return (
    <div className="min-h-screen bg-[#050505] pt-6 pb-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
          <div>
            <h1 className="font-heading text-2xl sm:text-3xl font-black uppercase text-white">
              NFT <span className="gradient-text">Staking</span>
            </h1>
            <p className="text-slate-500 text-xs mt-1 font-mono">
              {address.slice(0, 6)}…{address.slice(-4)}
              <span className="ml-2 text-green-400">● Polygon</span>
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={loadData}
              disabled={loadingData}
              className="flex items-center gap-1.5 px-3 py-2 glass rounded-xl text-slate-400 hover:text-white text-xs transition-all"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loadingData ? 'animate-spin' : ''}`} />
              Aggiorna
            </button>
            <button
              onClick={disconnect}
              className="px-3 py-2 glass rounded-xl text-slate-400 hover:text-white text-xs transition-all"
            >
              Disconnetti
            </button>
          </div>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {/* Live rewards */}
          <div className="glass rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/10 rounded-full blur-2xl" />
            <p className="text-slate-400 text-xs font-mono uppercase tracking-widest mb-2">Rewards Disponibili</p>
            <p className="text-3xl font-black text-white tabular-nums">
              {liveReward}
              <span className="text-green-400 text-lg ml-2">GKY</span>
            </p>
          </div>

          {/* Daily */}
          <div className="glass rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl" />
            <p className="text-slate-400 text-xs font-mono uppercase tracking-widest mb-2">Entrate / Giorno</p>
            <p className="text-3xl font-black text-white tabular-nums">
              {totalDailyGky}
              <span className="text-cyan-400 text-lg ml-2">GKY</span>
            </p>
          </div>

          {/* Claim All */}
          <button
            onClick={handleClaimAll}
            disabled={parseFloat(liveReward) <= 0.000001}
            className="glass rounded-2xl p-6 flex flex-col items-center justify-center gap-2 border hover:border-green-500/40 hover:bg-green-500/5 transition-all disabled:opacity-40 disabled:cursor-not-allowed group"
          >
            <Coins className="w-7 h-7 text-green-400 group-hover:scale-110 transition-transform" />
            <span className="font-heading font-bold uppercase text-white tracking-wider">Claim All Rewards</span>
          </button>
        </div>

        {/* Staked NFTs */}
        <div className="mb-10">
          <h2 className="font-heading text-xl font-bold uppercase text-white mb-5 flex items-center gap-3">
            NFT in Staking
            <span className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-bold px-3 py-0.5 rounded-full">
              {stakedItems.length}
            </span>
          </h2>
          {loadingData ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {[1, 2].map((i) => (
                <div key={i} className="glass rounded-2xl h-64 animate-pulse" />
              ))}
            </div>
          ) : stakedItems.length === 0 ? (
            <div className="glass rounded-2xl p-10 text-center">
              <TrendingUp className="w-10 h-10 text-slate-600 mx-auto mb-3" />
              <p className="text-slate-500">Nessun NFT in staking al momento.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {stakedItems.map((s) => (
                <StakingNFTCard
                  key={s.tokenId.toString()}
                  tokenId={s.tokenId.toNumber()}
                  isStaked
                  stakeInfo={s}
                  signer={signer}
                  onTxSuccess={handleTxSuccess}
                />
              ))}
            </div>
          )}
        </div>

        {/* Wallet NFTs */}
        <div>
          <h2 className="font-heading text-xl font-bold uppercase text-white mb-5 flex items-center gap-3">
            NFT nel Wallet
            <span className="bg-purple-500/10 border border-purple-500/30 text-purple-400 text-sm font-bold px-3 py-0.5 rounded-full">
              {walletNfts.length}
            </span>
          </h2>
          {loadingData ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="glass rounded-2xl h-64 animate-pulse" />
              ))}
            </div>
          ) : walletNfts.length === 0 ? (
            <div className="glass rounded-2xl p-10 text-center">
              <Wallet className="w-10 h-10 text-slate-600 mx-auto mb-3" />
              <p className="text-slate-400 text-sm mb-6">Nessun NFT GiankyCoin trovato in questo wallet.</p>
              <a
                href="/piattaforma-minting"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold text-sm uppercase tracking-wider hover:opacity-90 transition-opacity"
              >
                <ExternalLink className="w-4 h-4" /> Mint Gianky NFT
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {walletNfts.map((n) => (
                <StakingNFTCard
                  key={n.id.tokenId}
                  tokenId={parseInt(n.id.tokenId, 16)}
                  isStaked={false}
                  signer={signer}
                  onTxSuccess={handleTxSuccess}
                />
              ))}
            </div>
          )}
        </div>

        {/* Tx confirmation banner */}
        {txHash && (
          <div className="fixed bottom-6 right-6 glass border border-green-500/30 rounded-2xl p-5 z-50 min-w-[280px] shadow-xl">
            <p className="text-white font-bold text-sm mb-1">✅ Transazione confermata!</p>
            <a
              href={`https://polygonscan.com/tx/${txHash}`}
              target="_blank"
              rel="noreferrer"
              className="text-green-400 text-xs hover:underline flex items-center gap-1"
            >
              <ExternalLink className="w-3 h-3" /> Vedi su PolygonScan
            </a>
            <button onClick={() => setTxHash('')} className="absolute top-3 right-3 text-slate-500 hover:text-white text-sm">✕</button>
          </div>
        )}
      </div>
    </div>
  );
}
