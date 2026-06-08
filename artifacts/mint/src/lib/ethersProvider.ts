import { ethers } from 'ethers';

// Provider configuration for ethers.js
export const getProvider = () => {
  if (typeof window !== 'undefined' && (window as any).ethereum) {
    return new ethers.providers.Web3Provider((window as any).ethereum);
  }
  // Fallback to public RPC for server-side or when no wallet is available
  // Using Polygon's official RPC endpoints with fallbacks
  const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL || 'https://polygon-bor-rpc.publicnode.com';
  return new ethers.providers.JsonRpcProvider(rpcUrl);
};

export const getSigner = () => {
  const provider = getProvider();
  if (typeof window !== 'undefined' && (window as any).ethereum) {
    return provider.getSigner();
  }
  return null;
};

// Chain configuration
export const CHAIN_CONFIG = {
  chainId: 137, // Polygon Mainnet
  name: 'Polygon',
  rpcUrls: ['https://polygon-bor-rpc.publicnode.com', 'https://polygon.llamarpc.com'],
  nativeCurrency: {
    name: 'POL',
    symbol: 'POL',
    decimals: 18,
  },
  blockExplorerUrls: ['https://polygonscan.com'],
};
