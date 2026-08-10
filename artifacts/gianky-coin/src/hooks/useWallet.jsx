import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';

const POLYGON_CHAIN_ID = '0x89'; // 137

export function useWallet() {
  const [address, setAddress] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState(null);

  const updateFromProvider = useCallback(async (ethersProvider) => {
    const network = await ethersProvider.getNetwork();
    setChainId(network.chainId);
    const s = ethersProvider.getSigner();
    const addr = await s.getAddress();
    setSigner(s);
    setAddress(addr);
    setProvider(ethersProvider);
  }, []);

  // Re-connect silently if already authorized
  useEffect(() => {
    if (!window.ethereum) return;
    window.ethereum.request({ method: 'eth_accounts' }).then((accounts) => {
      if (accounts.length > 0) {
        const p = new ethers.providers.Web3Provider(window.ethereum, 'any');
        updateFromProvider(p).catch(() => {});
      }
    });

    const handleAccountsChanged = (accounts) => {
      if (accounts.length === 0) {
        setAddress(null); setSigner(null); setProvider(null);
      } else {
        const p = new ethers.providers.Web3Provider(window.ethereum, 'any');
        updateFromProvider(p).catch(() => {});
      }
    };
    const handleChainChanged = () => {
      const p = new ethers.providers.Web3Provider(window.ethereum, 'any');
      updateFromProvider(p).catch(() => {});
    };

    window.ethereum.on('accountsChanged', handleAccountsChanged);
    window.ethereum.on('chainChanged', handleChainChanged);
    return () => {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      window.ethereum.removeListener('chainChanged', handleChainChanged);
    };
  }, [updateFromProvider]);

  const connect = useCallback(async () => {
    if (!window.ethereum) {
      setError('MetaMask non trovato. Installa MetaMask per continuare.');
      return;
    }
    setConnecting(true);
    setError(null);
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      // Switch to Polygon
      try {
        await window.ethereum.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: POLYGON_CHAIN_ID }] });
      } catch (switchErr) {
        if (switchErr.code === 4902) {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: POLYGON_CHAIN_ID,
              chainName: 'Polygon Mainnet',
              nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
              rpcUrls: ['https://polygon-rpc.com/'],
              blockExplorerUrls: ['https://polygonscan.com'],
            }],
          });
        }
      }
      const p = new ethers.providers.Web3Provider(window.ethereum, 'any');
      await updateFromProvider(p);
    } catch (e) {
      setError(e.message || 'Connessione fallita');
    } finally {
      setConnecting(false);
    }
  }, [updateFromProvider]);

  const disconnect = useCallback(() => {
    setAddress(null); setSigner(null); setProvider(null); setChainId(null);
  }, []);

  const isPolygon = chainId === 137;

  return { address, provider, signer, chainId, isPolygon, connecting, error, connect, disconnect };
}
