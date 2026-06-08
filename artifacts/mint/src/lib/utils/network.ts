import { NETWORK_CONFIG } from '../constants/addresses';
import { ethers } from 'ethers';

export async function switchToPolygon() {
  const provider = (window as any).ethereum;
  if (!provider) {
    throw new Error('Please connect your wallet to continue');
  }

  try {
    console.log('Checking current network...');
    const currentChainId = await (provider as any).request({ method: 'eth_chainId' }) as string;
    console.log('Current chainId:', currentChainId);

    // Polygon Mainnet chainId
    const POLYGON_CHAIN_ID = 137;
    const polygonChainId = `0x${POLYGON_CHAIN_ID.toString(16)}`; // Convert to hex

    if (currentChainId === polygonChainId) {
      console.log('Already on Polygon network');
      return;
    }

    console.log('Attempting to switch to Polygon...');

    try {
      // Try to switch to Polygon
      await (provider as any).request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: polygonChainId }],
      });
      console.log('Successfully switched to Polygon');
    } catch (switchError: any) {
      console.log('Switch failed, error code:', switchError.code);
      
      // Add the network if it doesn't exist
      if (switchError.code === 4902 || switchError.code === -32603) {
        console.log('Attempting to add Polygon network...');
        try {
          await (provider as any).request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: polygonChainId,
              chainName: 'Polygon Mainnet',
              nativeCurrency: {
                name: 'MATIC',
                symbol: 'MATIC',
                decimals: 18
              },
              rpcUrls: ['https://polygon-rpc.com/'],
              blockExplorerUrls: ['https://polygonscan.com/']
            }]
          });
          console.log('Successfully added Polygon network');
          
          // Try switching again after adding
          await (provider as any).request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: polygonChainId }],
          });
          console.log('Successfully switched to Polygon after adding');
        } catch (addError: any) {
          console.error('Failed to add Polygon:', addError);
          throw new Error('Please open your wallet app and switch to the Polygon network');
        }
      } else {
        console.error('Failed to switch to Polygon:', switchError);
        throw new Error('Please open your wallet app and switch to the Polygon network');
      }
    }

    // Verify the switch was successful
    const newChainId = await (provider as any).request({ method: 'eth_chainId' });
    if (newChainId !== polygonChainId) {
      throw new Error('Failed to switch to Polygon network. Please try manually switching in your wallet.');
    }
  } catch (error: any) {
    console.error('Network switch error:', error);
    throw error;
  }
}

export async function validateNetwork(): Promise<boolean> {
  try {
    // First try to get chain ID from connected wallet
    if ((window as any).ethereum) {
      try {
        // Get accounts to check if wallet is connected
        const accounts = await ((window as any).ethereum as any).request({ method: 'eth_accounts' }) as string[];
        if (accounts && accounts.length > 0) {
          // Wallet is connected, get chain ID
          const chainId = await ((window as any).ethereum as any).request({ method: 'eth_chainId' }) as string;
          const currentChainId = parseInt(chainId, 16);
          console.log('Current chain ID:', currentChainId);
          
          // Check if we're on Polygon (137)
          if (currentChainId === 137) {
            console.log('Already on Polygon network');
            return true;
          }
        } else {
          console.log('No accounts found - wallet not connected');
        }
      } catch (walletError) {
        console.error('Wallet chain ID check failed:', walletError);
      }
    }

    // Fallback to RPC provider check
    try {
      const provider = new ethers.providers.JsonRpcProvider(NETWORK_CONFIG.rpcUrls[0]);
      const network = await provider.getNetwork();
      const isPolygon = network.chainId === NETWORK_CONFIG.requiredChainId;
      console.log('RPC network check:', isPolygon ? 'Polygon detected' : 'Not on Polygon');
      return isPolygon;
    } catch (rpcError) {
      console.error('RPC provider check failed:', rpcError);
    }

    return false;
  } catch (error) {
    console.error('Failed to validate network:', error);
    return false;
  }
}

// Types are imported from src/lib/types/window.d.ts

