import { EthereumProvider } from '@walletconnect/ethereum-provider';

// WalletConnect configuration for Polygon mainnet
export const walletConnectConfig = {
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'f3b56a114e34a6b111ac8e6367c0733c', // Replace with your actual Project ID
  chains: [137], // Polygon mainnet
  optionalChains: [137], // Same as chains for optionalChains and chains
  showQrModal: true,
  metadata: {
    name: 'Gianky Minting',
    description: 'NFT Minting Platform on Polygon',
    url: typeof window !== 'undefined' ? window.location.origin : 'https://your-domain.com',
    icons: ['https://your-domain.com/icon.png']
  }
};

// Create WalletConnect provider
export const createWalletConnectProvider = async () => {
  const provider = await EthereumProvider.init({
    projectId: walletConnectConfig.projectId,
    chains: walletConnectConfig.chains,
    optionalChains: walletConnectConfig.optionalChains as [number, ...number[]],
    showQrModal: walletConnectConfig.showQrModal,
    metadata: walletConnectConfig.metadata,
  });

  return provider;
};

// Check if WalletConnect is available
export const isWalletConnectAvailable = () => {
  return typeof window !== 'undefined' && (window as any).ethereum;
};
