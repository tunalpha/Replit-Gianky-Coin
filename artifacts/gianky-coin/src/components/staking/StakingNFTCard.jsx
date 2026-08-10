import { useState, useMemo } from 'react';
import { ethers } from 'ethers';
import confetti from 'canvas-confetti';
import { toast } from 'react-toastify';
import STAKING_POOL_ABI from '@/lib/StakingPool.json';
import { Lock, Zap, Clock, TrendingUp } from 'lucide-react';

const STAKING_ADDRESS = '0xD38A9fF129788ff31B0b050ccBC34016397a10b4';
const NFT_COLLECTION = '0x106fb804D03D4EA95CaeFA45C3215b57D8E6835D';

const NFT_APPROVAL_ABI = [
  'function setApprovalForAll(address operator, bool approved) external',
  'function isApprovedForAll(address owner, address operator) external view returns (bool)',
];

const PLANS = [
  { label: '3 Mesi — 10% Yield', value: 0 },
  { label: '6 Mesi — 12% Yield', value: 1 },
  { label: '12 Mesi — 15% Yield', value: 2 },
];

const getTierInfo = (id) => {
  if (id >= 1 && id <= 1000000) return { name: 'STARTER', video: '/NFT/Starter_NFT.mp4', color: 'from-cyan-500 to-cyan-400' };
  if (id >= 1000001 && id <= 2000000) return { name: 'BASIC', video: '/NFT/Basic_NFT.mp4', color: 'from-blue-500 to-cyan-400' };
  if (id >= 2000001 && id <= 3000000) return { name: 'STANDARD', video: '/NFT/Standard_NFT.mp4', color: 'from-purple-500 to-cyan-400' };
  if (id >= 3000001 && id <= 4000000) return { name: 'VIP', video: '/NFT/VIP_NFT.mp4', color: 'from-amber-500 to-orange-400' };
  if (id >= 4000001 && id <= 5000000) return { name: 'PREMIUM', video: '/NFT/Premium_NFT.mp4', color: 'from-pink-500 to-purple-400' };
  return { name: 'DIAMOND', video: '/NFT/Diamond_NFT.mp4', color: 'from-cyan-400 to-purple-500' };
};

const formatTimeLeft = (endTime) => {
  const diff = endTime - Math.floor(Date.now() / 1000);
  if (diff <= 0) return 'Pronto per Unstake';
  const days = Math.floor(diff / 86400);
  const hours = Math.floor((diff % 86400) / 3600);
  return `${days}g ${hours}h rimasti`;
};

export default function StakingNFTCard({ tokenId, isStaked, stakeInfo, signer, onTxSuccess }) {
  const [plan, setPlan] = useState(0);
  const [loading, setLoading] = useState(false);

  const tier = getTierInfo(tokenId);
  const now = Math.floor(Date.now() / 1000);
  const isLocked = isStaked && stakeInfo ? now < stakeInfo.lockEndTime.toNumber() : false;
  const hasExpired = isStaked && stakeInfo ? now >= stakeInfo.lockEndTime.toNumber() : false;

  const dailyEarnings = useMemo(() => {
    if (!isStaked || !stakeInfo) return '0.00';
    if (now >= stakeInfo.lockEndTime.toNumber()) return '0.00';
    return parseFloat(ethers.utils.formatEther(stakeInfo.rewardRate.mul(86400))).toFixed(4);
  }, [isStaked, stakeInfo, now]);

  const handleApprove = async () => {
    if (!signer) return;
    setLoading(true);
    try {
      const nftContract = new ethers.Contract(NFT_COLLECTION, NFT_APPROVAL_ABI, signer);
      const tx = await nftContract.setApprovalForAll(STAKING_ADDRESS, true);
      toast.info('Approvazione in corso…');
      await tx.wait();
      toast.success('Approvazione confermata!');
      onTxSuccess(tx.hash);
    } catch (e) {
      toast.error(e?.reason || e?.message || 'Transazione fallita');
    } finally {
      setLoading(false);
    }
  };

  const handleStake = async () => {
    if (!signer) return;
    setLoading(true);
    try {
      // Check approval first
      const nftContract = new ethers.Contract(NFT_COLLECTION, NFT_APPROVAL_ABI, signer);
      const address = await signer.getAddress();
      const approved = await nftContract.isApprovedForAll(address, STAKING_ADDRESS);
      if (!approved) {
        toast.error('Prima approva il contratto NFT');
        setLoading(false);
        return;
      }
      const stakingContract = new ethers.Contract(STAKING_ADDRESS, STAKING_POOL_ABI, signer);
      const tx = await stakingContract.stake([tokenId], plan);
      toast.info('Staking in corso…');
      await tx.wait();
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
      toast.success('NFT messo in staking!');
      onTxSuccess(tx.hash);
    } catch (e) {
      toast.error(e?.reason || e?.message || 'Transazione fallita');
    } finally {
      setLoading(false);
    }
  };

  const handleUnstake = async () => {
    if (!signer || isLocked) return;
    setLoading(true);
    try {
      const stakingContract = new ethers.Contract(STAKING_ADDRESS, STAKING_POOL_ABI, signer);
      const tx = await stakingContract.unstake([tokenId]);
      toast.info('Unstake in corso…');
      await tx.wait();
      toast.success('NFT sbloccato con successo!');
      onTxSuccess(tx.hash);
    } catch (e) {
      toast.error(e?.reason || e?.message || 'Transazione fallita');
    } finally {
      setLoading(false);
    }
  };

  const handleClaimSingle = async () => {
    if (!signer) return;
    setLoading(true);
    try {
      const stakingContract = new ethers.Contract(STAKING_ADDRESS, STAKING_POOL_ABI, signer);
      const tx = await stakingContract.claim([tokenId]);
      toast.info('Claim in corso…');
      await tx.wait();
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
      toast.success('Rewards reclamati!');
      onTxSuccess(tx.hash);
    } catch (e) {
      toast.error(e?.reason || e?.message || 'Transazione fallita');
    } finally {
      setLoading(false);
    }
  };

  const [isApproved, setIsApproved] = useState(null);

  // Check approval status once for unstaked cards
  useMemo(() => {
    if (isStaked || !signer) return;
    (async () => {
      try {
        const nftContract = new ethers.Contract(NFT_COLLECTION, NFT_APPROVAL_ABI, signer);
        const address = await signer.getAddress();
        const approved = await nftContract.isApprovedForAll(address, STAKING_ADDRESS);
        setIsApproved(approved);
      } catch {}
    })();
  }, [isStaked, signer]);

  return (
    <div className="glass rounded-2xl p-5 flex flex-col hover:border-cyan-500/40 transition-all group">
      {/* Video */}
      <div className="relative rounded-xl overflow-hidden mb-4 aspect-square bg-black/40">
        <video
          src={tier.video}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
        <div className={`absolute top-3 right-3 bg-gradient-to-r ${tier.color} text-black text-xs font-black px-3 py-1 rounded-lg uppercase tracking-wider`}>
          {tier.name}
        </div>
        <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white text-xs font-mono px-2 py-1 rounded-lg">
          #{tokenId}
        </div>
      </div>

      {/* Stats */}
      {isStaked && stakeInfo && (
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400 flex items-center gap-1"><TrendingUp className="w-3 h-3" /> Guadagno/giorno</span>
            <span className="text-green-400 font-bold">{dailyEarnings} GKY</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400 flex items-center gap-1"><Clock className="w-3 h-3" /> Lock</span>
            <span className={`font-bold text-xs ${isLocked ? 'text-amber-400' : 'text-green-400'}`}>
              {formatTimeLeft(stakeInfo.lockEndTime.toNumber())}
            </span>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="mt-auto space-y-2">
        {isStaked ? (
          <>
            <button
              onClick={handleClaimSingle}
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 font-bold text-sm uppercase tracking-wider hover:bg-green-500/20 hover:border-green-500 transition-all disabled:opacity-50"
            >
              {loading ? 'In corso…' : 'Claim Rewards'}
            </button>
            <button
              onClick={handleUnstake}
              disabled={loading || isLocked}
              className={`w-full py-2.5 rounded-xl border font-bold text-sm uppercase tracking-wider transition-all disabled:opacity-40 ${
                isLocked
                  ? 'bg-white/5 border-white/10 text-slate-600 cursor-not-allowed'
                  : 'bg-white/5 border-white/20 text-white hover:border-cyan-500 hover:text-cyan-400'
              }`}
            >
              <Lock className="w-3.5 h-3.5 inline mr-1" />
              {isLocked ? 'LOCKED' : 'UNSTAKE'}
            </button>
          </>
        ) : (
          <>
            <select
              value={plan}
              onChange={(e) => setPlan(Number(e.target.value))}
              className="w-full bg-white/5 border border-white/10 text-white text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-cyan-500/50 mb-1"
            >
              {PLANS.map((p) => (
                <option key={p.value} value={p.value} className="bg-[#0d0d0d]">{p.label}</option>
              ))}
            </select>
            {isApproved === false ? (
              <button
                onClick={handleApprove}
                disabled={loading}
                className="w-full py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold text-sm uppercase tracking-wider hover:bg-amber-500/20 transition-all disabled:opacity-50"
              >
                {loading ? 'In corso…' : 'APPROVA'}
              </button>
            ) : (
              <button
                onClick={handleStake}
                disabled={loading || isApproved === null}
                className="w-full py-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold text-sm uppercase tracking-wider hover:bg-cyan-500/20 hover:border-cyan-500 transition-all disabled:opacity-50"
              >
                {loading ? 'In corso…' : <><Zap className="w-3.5 h-3.5 inline mr-1" />STAKE NOW</>}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
