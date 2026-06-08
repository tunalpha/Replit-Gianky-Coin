"use client";

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { TIERS } from '@/lib/types/tiers';
import { useNftMint } from '@/hooks/useNftMint';
import { showConfirmAlert, showLoadingAlert, showErrorAlert, showSuccessAlert } from '@/components/ui/sweet-alert';
import Swal from 'sweetalert2';
import { toast } from 'sonner';
import { useActiveAccount, ConnectButton } from "thirdweb/react";
import { thirdwebClient } from "@/lib/thirdweb";
import { createWallet } from "thirdweb/wallets";
import { polygon } from "thirdweb/chains";

// Thirdweb Connect Button Component
function ThirdwebConnectButton() {
  const wallets = [
    createWallet("io.metamask"),
    createWallet("com.trustwallet.app"),
    createWallet("com.safepal"),
    createWallet("com.coinbase.wallet"),
    createWallet("me.rainbow"),
    createWallet("io.zerion.wallet"),
  ];

  return (
    <ConnectButton
      client={thirdwebClient}
      chain={polygon}
      wallets={wallets}
      connectButton={{
        label: "Connect Wallet",
        style: {
          background: "linear-gradient(to right, #ec4899, #db2777)",
          color: "white",
          fontWeight: "600",
          padding: "16px 40px",
          fontSize: "18px",
          borderRadius: "12px",
          border: "none",
          cursor: "pointer",
          boxShadow: "0 10px 25px -5px rgba(236, 72, 153, 0.3)",
        },
      }}
      detailsButton={{
        style: {
          background: "rgba(31, 41, 55, 0.3)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(75, 85, 99, 0.3)",
          borderRadius: "16px",
          padding: "12px 16px",
          color: "white",
        },
      }}
      theme="dark"
      connectModal={{
        size: "compact",
        title: "Connect Wallet",
        showThirdwebBranding: false,
      }}
    />
  );
}

// Using existing global type declarations from src/lib/types/

type PaymentMethod = 'with-referral' | 'without-referral' | 'check-referral-tree' | 'claim-diamond-cashback';

export function PaymentOptions() {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('without-referral');
  const [referralId, setReferralId] = useState('');
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isWalletConnectConnecting, setIsWalletConnectConnecting] = useState(false);
  const [isInWalletApp, setIsInWalletApp] = useState(false);
  
  // Thirdweb hook for account
  const activeAccount = useActiveAccount();
  
  // Derived values
  const isConnected = !!activeAccount;
  const account = activeAccount?.address;
  const isCorrectNetwork = true; // Thirdweb handles network automatically
  const isConnecting = false;
  
  // Get provider for ethers.js
  const getProvider = () => {
    if (typeof window !== 'undefined' && (window as any).ethereum) {
      return new ethers.providers.Web3Provider((window as any).ethereum);
    }
    return new ethers.providers.JsonRpcProvider('https://polygon-bor-rpc.publicnode.com');
  };
  
  // Debug logging
  console.log('PaymentOptions - Thirdweb values:', { isConnected, account, isConnecting });
  
  const { mintNft, isLoading, handleNetworkSwitch, checkContractPrices } = useNftMint(isConnected, account, getProvider);
  
  // Visual debugging for mobile
  const debugInfo = {
    isConnected: isConnected ? '✅ Connected' : '❌ Not Connected',
    address: account ? `${account.slice(0, 6)}...${account.slice(-4)}` : 'No Address',
    isConnecting: isConnecting ? '🔄 Connecting' : '⏸️ Not Connecting',
    isCorrectNetwork: isCorrectNetwork ? '✅ Polygon' : '❌ Wrong Network',
    mintNftType: typeof mintNft,
    isLoading: isLoading ? '🔄 Loading' : '⏸️ Not Loading',
    ethereumProvider: typeof window !== 'undefined' && (window as any).ethereum ? '✅ Available' : '❌ Not Available'
  };

  // Check if mobile on component mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const userAgent = navigator.userAgent;
    const mobile = /iPhone|iPad|iPod|Android/i.test(userAgent);
    setIsMobile(mobile);
    
    // Enhanced wallet detection - check for specific wallet patterns
    const userAgentLower = userAgent.toLowerCase();
    const userAgentDetection = userAgentLower.includes('trust') ||
                              userAgentLower.includes('metamask') ||
                              userAgentLower.includes('coinbase') ||
                              userAgentLower.includes('rainbow') ||
                              userAgentLower.includes('safepal') ||
                              userAgentLower.includes('wallet') ||
                              // Additional patterns for better detection
                              userAgentLower.includes('trustwallet') ||
                              userAgentLower.includes('metamaskmobile') ||
                              userAgentLower.includes('coinbasewallet') ||
                              userAgentLower.includes('rainbowwallet') ||
                              userAgentLower.includes('safepalwallet') ||
                              // Check for wallet app package names
                              userAgentLower.includes('com.wallet.crypto.trustapp') ||
                              userAgentLower.includes('io.metamask') ||
                              userAgentLower.includes('org.toshi') ||
                              userAgentLower.includes('me.rainbow') ||
                              userAgentLower.includes('io.safepal.wallet');
    
    // Additional detection: check for wallet-specific objects
    const walletObjectDetection = !!(window as any).ethereum || 
                                 !!(window as any).trustwallet || 
                                 !!(window as any).coinbase || 
                                 !!(window as any).rainbow || 
                                 !!(window as any).safepal ||
                                 !!(window as any).web3;
    
    const inWalletApp = userAgentDetection || walletObjectDetection;
    
    console.log('=== WALLET DETECTION DEBUG ===');
    console.log('User Agent:', userAgent);
    console.log('User Agent (lower):', userAgentLower);
    console.log('User Agent Detection:', userAgentDetection);
    console.log('Wallet Object Detection:', walletObjectDetection);
    console.log('(window as any).ethereum:', typeof window !== 'undefined' && !!(window as any).ethereum);
    console.log('window.trustwallet:', typeof window !== 'undefined' && !!(window as any).trustwallet);
    console.log('window.coinbase:', typeof window !== 'undefined' && !!(window as any).coinbase);
    console.log('window.rainbow:', typeof window !== 'undefined' && !!(window as any).rainbow);
    console.log('window.safepal:', typeof window !== 'undefined' && !!(window as any).safepal);
    console.log('window.web3:', typeof window !== 'undefined' && !!(window as any).web3);
    console.log('Is in wallet app:', inWalletApp);
    console.log('================================');
    setIsInWalletApp(inWalletApp);
  }, []);

  // DISABLED: Auto-switch to Polygon when in wallet app - CAUSES REFRESHING
  // useEffect(() => {
  //   const autoSwitchToPolygon = async () => {
  //     if (isInWalletApp && (window as any).ethereum) {
  //       try {
  //         console.log('In wallet app, checking network...');
  //         
  //         // Check current network first
  //         const chainId = await ((window as any).ethereum as any).request({ method: 'eth_chainId' }) as string;
  //         const currentChainId = parseInt(chainId as string, 16);
  //         
  //         // Only switch if not already on Polygon
  //         if (currentChainId !== 137) {
  //           console.log('Not on Polygon, attempting gentle switch...');
  //           await switchToPolygon();
  //         } else {
  //           console.log('Already on Polygon, no need to switch');
  //         }
  //       } catch (error) {
  //         console.error('Failed to auto-switch to Polygon:', error);
  //         // Don't show alert immediately, let user try minting first
  //       }
  //     }
  //   };

  //   // Longer delay to ensure wallet is fully loaded and stable
  //   const timer = setTimeout(autoSwitchToPolygon, 3000);
  //   return () => clearTimeout(timer);
  // }, [isInWalletApp]);

  // Mobile wallet connection is now handled by AppKit
  // AppKit automatically provides mobile-friendly wallet connection options
  // including WalletConnect, deep linking, and QR code scanning

  // Function to automatically switch to Polygon network - GENTLE VERSION
  const switchToPolygon = async () => {
    try {
      if (typeof window === 'undefined' || !(window as any).ethereum) {
        throw new Error('No wallet provider found');
      }

      const chainId = await ((window as any).ethereum as any).request({ method: 'eth_chainId' }) as string;
      const currentChainId = parseInt(chainId as string, 16);
      
      console.log('Current chain ID:', currentChainId);
      
      // If already on Polygon, no need to switch
      if (currentChainId === 137) {
        console.log('Already on Polygon network');
        return true;
      }

      console.log('Switching to Polygon network...');
      
      // Add a small delay to prevent rapid switching
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Try to switch to Polygon
      await ((window as any).ethereum as any).request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x89' }], // 137 in hex
      });
      
      // Wait a moment for the switch to complete
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Successfully switched to Polygon');
      return true;
      
    } catch (switchError: any) {
      console.log('Switch failed, trying to add Polygon network...', switchError);
      
      // If the network doesn't exist, add it
      if ((switchError as any).code === 4902) {
        try {
          await ((window as any).ethereum as any)!.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: '0x89', // 137 in hex
              chainName: 'Polygon Mainnet',
              nativeCurrency: {
                name: 'MATIC',
                symbol: 'MATIC',
                decimals: 18,
              },
              rpcUrls: ['https://polygon-rpc.com/'],
              blockExplorerUrls: ['https://polygonscan.com/'],
            }],
          });
          
          // Wait for the network to be added
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          console.log('Successfully added and switched to Polygon');
          return true;
        } catch (addError) {
          console.error('Failed to add Polygon network:', addError);
          throw new Error('Failed to add Polygon network. Please add it manually in your wallet.');
        }
      } else {
        console.error('Failed to switch to Polygon:', switchError);
        throw new Error('Failed to switch to Polygon network. Please switch manually.');
      }
    }
  };

  // Initialize with fallback prices to prevent blinking
  const [contractPrices, setContractPrices] = useState<Record<string, string>>(() => {
    const fallbackPrices: Record<string, string> = {};
    TIERS.forEach(tier => {
      fallbackPrices[tier.name] = tier.price.toString();
    });
    return fallbackPrices;
  });
  const [isLoadingPrices, setIsLoadingPrices] = useState(false);
  const [referralTreeId, setReferralTreeId] = useState('');
  const [referralTreeData, setReferralTreeData] = useState<any>(null);
  const [isLoadingTree, setIsLoadingTree] = useState(false);
  const [referrerAddress, setReferrerAddress] = useState('');
  const [referrerEarnings, setReferrerEarnings] = useState<any>(null);
  const [isLoadingEarnings, setIsLoadingEarnings] = useState(false);
  const [levelNumber, setLevelNumber] = useState('');
  const [referralPercentage, setReferralPercentage] = useState<any>(null);
  const [isLoadingPercentage, setIsLoadingPercentage] = useState(false);
  const [completeTreeTokenId, setCompleteTreeTokenId] = useState('');
  const [completeTreeData, setCompleteTreeData] = useState<any>(null);
  const [isLoadingCompleteTree, setIsLoadingCompleteTree] = useState(false);
  const [cashbackTokenId, setCashbackTokenId] = useState('');
  const [isLoadingCashback, setIsLoadingCashback] = useState(false);

  // Use hardcoded prices for testing - no contract fetching
  useEffect(() => {
          const fallbackPrices: Record<string, string> = {};
          TIERS.forEach(tier => {
            fallbackPrices[tier.name] = tier.price.toString();
          });
          setContractPrices(fallbackPrices);
    console.log('Using hardcoded testing prices:', fallbackPrices);
  }, []);

  const checkReferralTree = async () => {
    if (!referralTreeId.trim()) {
      showErrorAlert('Error', 'Please enter a referral ID');
      return;
    }

    if (!isCorrectNetwork) {
      await handleNetworkSwitch();
      return;
    }

    setIsLoadingTree(true);
    try {
      // Import ethers for contract interaction
      const { ethers } = await import('ethers');
      const { ADDRESSES } = await import('@/lib/constants/addresses');
      const ContractABI = await import('@/lib/contracts/abi.json');

      const provider = new ethers.providers.Web3Provider((window as any).ethereum as any);
      const contract = new ethers.Contract(ADDRESSES.NFT_CONTRACT, ContractABI.default, provider);

      // Call getReferralTree with depth 4
      const treeData = await contract.getReferralTree(referralTreeId, 4);

      // Convert BigNumber objects to strings for React rendering
      setReferralTreeData({
        addresses: treeData[0].map((addr: any) => addr.toString()),
        referralIds: treeData[1].map((id: any) => id.toString()),
        amounts: treeData[2].map((amount: any) => amount.toString())
      });

      // No popup needed - results will be displayed directly below

    } catch (error) {
      console.error('Error checking referral tree:', error);
      showErrorAlert('Error', 'Failed to fetch referral tree. Please check the referral ID and try again.');
    } finally {
      setIsLoadingTree(false);
    }
  };

  const checkReferrerEarnings = async () => {
    if (!referrerAddress.trim()) {
      showErrorAlert('Error', 'Please enter a wallet address');
      return;
    }

    if (!isCorrectNetwork) {
      await handleNetworkSwitch();
      return;
    }

    setIsLoadingEarnings(true);
    try {
      // Import ethers for contract interaction
      const { ethers } = await import('ethers');
      const { ADDRESSES } = await import('@/lib/constants/addresses');
      const ContractABI = await import('@/lib/contracts/abi.json');

      const provider = new ethers.providers.Web3Provider((window as any).ethereum as any);
      const contract = new ethers.Contract(ADDRESSES.NFT_CONTRACT, ContractABI.default, provider);

      // Call getReferrerEarnings
      const earnings = await contract.getReferrerEarnings(referrerAddress);

      // Convert BigNumber objects to strings and format as MATIC
      const formattedEarnings = {
        level1: ethers.utils.formatEther(earnings[0].toString()),
        level2: ethers.utils.formatEther(earnings[1].toString()),
        level3: ethers.utils.formatEther(earnings[2].toString()),
        level4: ethers.utils.formatEther(earnings[3].toString())
      };

      setReferrerEarnings(formattedEarnings);

    } catch (error) {
      console.error('Error checking referrer earnings:', error);
      showErrorAlert('Error', 'Failed to fetch referrer earnings. Please check the wallet address and try again.');
    } finally {
      setIsLoadingEarnings(false);
    }
  };

  const checkReferralPercentage = async () => {
    if (!levelNumber.trim()) {
      showErrorAlert('Error', 'Please enter a level number (1, 2, 3, or 4)');
      return;
    }

    const level = parseInt(levelNumber);
    if (level < 1 || level > 4) {
      showErrorAlert('Error', 'Level number must be between 1 and 4');
      return;
    }

    if (!isCorrectNetwork) {
      await handleNetworkSwitch();
      return;
    }

    setIsLoadingPercentage(true);
    try {
      // Import ethers for contract interaction
      const { ethers } = await import('ethers');
      const { ADDRESSES } = await import('@/lib/constants/addresses');
      const ContractABI = await import('@/lib/contracts/abi.json');

      const provider = new ethers.providers.Web3Provider((window as any).ethereum as any);
      const contract = new ethers.Contract(ADDRESSES.NFT_CONTRACT, ContractABI.default, provider);

      // Call referralPercentages with the level number
      const percentage = await contract.referralPercentages(level);

      // Convert BigNumber to number and format as percentage
      const percentageValue = percentage.toString();
      const percentageFormatted = (parseInt(percentageValue) / 100).toFixed(2); // Convert from basis points to percentage

      setReferralPercentage({
        level: level,
        rawValue: percentageValue,
        percentage: percentageFormatted
      });

    } catch (error) {
      console.error('Error checking referral percentage:', error);
      showErrorAlert('Error', 'Failed to fetch referral percentage. Please check the level number and try again.');
    } finally {
      setIsLoadingPercentage(false);
    }
  };

  const getCompleteTree = async () => {
    if (!completeTreeTokenId.trim()) {
      showErrorAlert('Error', 'Please enter a token ID');
      return;
    }

    const tokenId = parseInt(completeTreeTokenId);
    if (isNaN(tokenId) || tokenId <= 0) {
      showErrorAlert('Error', 'Please enter a valid token ID (positive number)');
      return;
    }

    if (!isCorrectNetwork) {
      await handleNetworkSwitch();
      return;
    }

    setIsLoadingCompleteTree(true);
    try {
      // Import ethers for contract interaction
      const { ethers } = await import('ethers');
      const { ADDRESSES } = await import('@/lib/constants/addresses');
      const ContractABI = await import('@/lib/contracts/abi.json');

      const provider = new ethers.providers.Web3Provider((window as any).ethereum as any);
      const contract = new ethers.Contract(ADDRESSES.NFT_CONTRACT, ContractABI.default, provider);

      // Call getCompleteTreeWithLevels with the token ID
      const result = await contract.getCompleteTreeWithLevels(tokenId);

      // Process the result - getCompleteTreeWithLevels returns 6 arrays
      const [ancestors, ancestorOwners, ancestorLevels, descendants, descendantOwners, descendantLevels] = result;

      setCompleteTreeData({
        tokenId: tokenId,
        ancestors: ancestors.map((id: any) => id.toString()),
        ancestorOwners: ancestorOwners,
        ancestorLevels: ancestorLevels.map((level: any) => level.toString()),
        descendants: descendants.map((id: any) => id.toString()),
        descendantOwners: descendantOwners,
        descendantLevels: descendantLevels.map((level: any) => level.toString())
      });

    } catch (error) {
      console.error('Error getting complete tree:', error);
      showErrorAlert('Error', 'Failed to fetch complete tree. Please check the token ID and try again.');
    } finally {
      setIsLoadingCompleteTree(false);
    }
  };

  const claimDiamondCashback = async () => {
    if (!cashbackTokenId.trim()) {
      showErrorAlert('Error', 'Please enter a token ID');
      return;
    }

    const tokenId = parseInt(cashbackTokenId);
    if (isNaN(tokenId) || tokenId <= 0) {
      showErrorAlert('Error', 'Please enter a valid token ID (positive number)');
      return;
    }

    if (!isCorrectNetwork) {
      await handleNetworkSwitch();
      return;
    }

    if (!isConnected || !account) {
      showErrorAlert('Error', 'Please connect your wallet first');
      return;
    }

    setIsLoadingCashback(true);
    showLoadingAlert('Processing', 'Claiming Diamond cashback...');

    try {
      // Import ethers and contract addresses/ABIs
      const { ethers } = await import('ethers');
      const { ADDRESSES } = await import('@/lib/constants/addresses');
      const { CASHBACK_CONTRACT_ABI } = await import('@/lib/contracts/abi');

      const provider = new ethers.providers.Web3Provider((window as any).ethereum as any);
      const signer = provider.getSigner();

      // Create cashback contract instance
      const cashbackContract = new ethers.Contract(
        ADDRESSES.CASHBACK_CONTRACT,
        CASHBACK_CONTRACT_ABI,
        signer
      );

      // Call giveDiamondCashback
      const tx = await cashbackContract.giveDiamondCashback(tokenId, {
        gasLimit: ethers.BigNumber.from('500000'),
        gasPrice: await provider.getGasPrice()
      });

      console.log('Cashback transaction sent:', tx.hash);

      // Wait for transaction confirmation
      const receipt = await tx.wait();
      console.log('Cashback transaction confirmed:', receipt.transactionHash);

      // Parse CashbackGiven event to get the cashback amount
      const cashbackIface = new ethers.utils.Interface(CASHBACK_CONTRACT_ABI);
      let cashbackAmount = '0';
      
      for (const log of receipt.logs) {
        try {
          const parsedLog = cashbackIface.parseLog(log);
          if (parsedLog.name === 'CashbackGiven') {
            cashbackAmount = ethers.utils.formatUnits(parsedLog.args[1], 18);
            console.log('Cashback amount received:', cashbackAmount, 'GKY');
            break;
          }
        } catch (e) {
          // Skip logs that can't be parsed
          continue;
        }
      }

      // Show success message using the standard success alert
      showSuccessAlert(
        'Cashback Claimed Successfully! 🎉',
        `Your Diamond NFT cashback has been claimed! You received ${cashbackAmount} GKY tokens.`,
        receipt.transactionHash,
        undefined, // No referral ID for cashback claim
        cashbackAmount // GKY rewards amount
      );

      // Clear the input
      setCashbackTokenId('');

    } catch (error: any) {
      console.error('Error claiming cashback:', error);
      
      let errorMessage = 'Failed to claim cashback. Please try again.';
      if (error.message) {
        if (error.message.includes('Invalid token ID range')) {
          errorMessage = 'Invalid token ID range. This token ID is not a Diamond NFT.';
        } else if (error.message.includes('not the owner')) {
          errorMessage = 'You are not the owner of this NFT.';
        } else if (error.message.includes('already claimed')) {
          errorMessage = 'Cashback has already been claimed for this token.';
        } else if (error.message.includes('Insufficient GKY balance')) {
          errorMessage = 'Contract has insufficient GKY balance. Please contact support.';
        } else {
          errorMessage = error.message;
        }
      }

      showErrorAlert('Claim Failed', errorMessage);
    } finally {
      setIsLoadingCashback(false);
      Swal.close();
    }
  };

  // Check wallet connection status
  useEffect(() => {
    const checkConnection = async () => {
      try {
        console.log('Checking wallet connection in component...');

        // Simple provider check
        const provider = (window as any).ethereum as any;

        if (provider) {
          console.log('Found wallet provider');

          // Check current accounts
          try {
            const accounts = await (provider as any).request({ method: 'eth_accounts' }) as string[];
            const connected = accounts && accounts.length > 0;
            console.log(`Connected account: ${accounts[0]?.slice(0, 6)}...${accounts[0]?.slice(-4)}`);
            console.log(`Wallet ${connected ? 'connected' : 'not connected'}`);
          } catch (error: any) {
            console.log(`Connection check error: ${error.message || 'Unknown error'}`);
          }

          // Listen for account changes
          provider.on('accountsChanged', (accounts: string[]) => {
            console.log(`Account changed: ${accounts[0]?.slice(0, 6)}...${accounts[0]?.slice(-4)}`);
          });

          // Listen for chain changes - GENTLE VERSION
          provider.on('chainChanged', (chainId: string) => {
            const newChainId = parseInt(chainId, 16);
            console.log(`Network changed to chain ID: ${newChainId}`);
            
            // Only reload if it's a significant change (not just switching to Polygon)
            if (newChainId !== 137) {
              console.log('Switched away from Polygon, reloading page...');
              window.location.reload();
            } else {
              console.log('Switched to Polygon, no need to reload');
            }
          });

          // Listen for connect
          provider.on('connect', () => {
            console.log('Wallet connected');
          });

          // Listen for disconnect
          provider.on('disconnect', () => {
            console.log('Wallet disconnected');
          });
        } else {
          console.log('No wallet provider found');
        }
      } catch (error: any) {
        console.log(`Connection error: ${error.message || 'Unknown error'}`);
      }
    };

    checkConnection();

    // Cleanup event listeners
    return () => {
      if (typeof window !== 'undefined' && (window as any).ethereum) {
        ((window as any).ethereum as any).removeListener('accountsChanged', () => { });
        ((window as any).ethereum as any).removeListener('chainChanged', () => { });
        ((window as any).ethereum as any).removeListener('connect', () => { });
        ((window as any).ethereum as any).removeListener('disconnect', () => { });
      }
    };
  }, []);

  // Prices are now hardcoded - no need to fetch from contract

  const handleMint = async () => {
    try {
      console.log('handleMint called - AppKit status:', { isConnected, account });
      console.log('handleMint called - mintNft function:', typeof mintNft);

      // Use AppKit connection status instead of manual wallet detection
      if (!isConnected || !account) {
        console.log('Wallet not connected via AppKit');
        showErrorAlert(
          'Wallet Not Connected',
          'Please connect your wallet first using the Connect button above'
        );
        return;
      }

      console.log('Wallet is connected via AppKit, proceeding with mint...');

      // AppKit handles network checking, no need for manual network check

      console.log('Ready to mint on Polygon network');

      if (!isCorrectNetwork) {
        await handleNetworkSwitch();
      }
      if (!selectedTier) return;

      if (!selectedTier) return;
      const price = contractPrices[selectedTier];

      // Show beautiful confirmation dialog with SweetAlert
      const confirmed = await showConfirmAlert(
        'Confirm NFT Minting',
        'Are you sure you want to mint this NFT?',
        `${price} POL`
      );

      if (!confirmed.isConfirmed) return;

      // Show loading alert
      showLoadingAlert(
        'Minting NFT...',
        'Please wait while we process your transaction'
      );

      try {
        // Call the mint function with the tier price
        console.log('Debug - Selected tier:', selectedTier);
        console.log('Debug - Contract price:', price);
        console.log('Debug - Price type:', typeof price);
        console.log('Debug - Price exact value:', price);

        await mintNft(
          parseFloat(price),
          selectedMethod === 'with-referral' ? referralId : undefined
        );

        // Loading alert will be automatically closed when success/error shows
      } catch (error) {
        // Loading alert will be automatically closed when error shows
        throw error;
      }
    } catch (error) {
      console.error('Minting error:', error);
      // SweetAlert error handling is now in useNftMint hook
    }
  };

  // Tier color mapping for gradients
  const getTierGradient = (tierName: string) => {
    const gradients = {
      STARTER: 'from-gray-400 to-gray-600',
      BASIC: 'from-white to-gray-300',
      STANDARD: 'from-blue-400 to-blue-600',
      VIP: 'from-cyan-400 to-cyan-600',
      PREMIUM: 'from-indigo-500 to-indigo-700',
      DIAMOND: 'from-yellow-400 to-yellow-600'
    };
    return gradients[tierName as keyof typeof gradients] || 'from-gray-400 to-gray-600';
  };

  // Tier video file mapping
  const getTierVideoPath = (tierName: string) => {
    const videoMap = {
      STARTER: 'Starter_NFT.mp4',
      BASIC: 'Basic_NFT.mp4',
      STANDARD: 'Standard_NFT.mp4',
      VIP: 'VIP_NFT.mp4',
      PREMIUM: 'Premium_NFT.mp4',
      DIAMOND: 'Diamond_NFT.mp4'
    };
    return videoMap[tierName as keyof typeof videoMap] || `${tierName}_NFT.mp4`;
  };

  return (
    <div className="min-h-screen text-white py-2 px-4 relative overflow-hidden" style={{ backgroundColor: '#161519' }}>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center">

          {/* Check Referral Tree Section - COMMENTED OUT */}
          {/* 
            {selectedMethod === 'check-referral-tree' && (
              <div className="mb-10 max-w-2xl mx-auto">
                <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-600/30 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Check Referral Tree
                  </h3>
                  
                  <div className="mb-6">
                    <p className="text-white/80 text-center mb-4">
                      Enter a referral ID to check their referral tree and see the network of referrers.
                    </p>
                    <p className="text-sm text-gray-400 text-center">
                      This will show you the referral chain up to 4 levels deep for any referral ID.
                    </p>
                  </div>

                  <div className="mb-6">
                    <Input
                      type="text"
                      placeholder="Enter Referral ID"
                      value={referralTreeId}
                      onChange={(e) => setReferralTreeId(e.target.value)}
                      className="w-full bg-gray-800/50 text-white border-gray-600/30 rounded-xl py-4 px-6 text-lg backdrop-blur-sm focus:border-pink-500/50 focus:ring-pink-500/20 transition-all duration-300"
                    />
                  </div>

                  <div className="flex justify-center">
                    <Button
                      onClick={checkReferralTree}
                      disabled={isLoadingTree || !referralTreeId.trim()}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {isLoadingTree ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Checking...</span>
                        </div>
                      ) : (
                        'Check Referral Tree'
                      )}
                    </Button>
                  </div>

                  {referralTreeData && (
                    <div className="mt-8 p-6 bg-gray-900/50 rounded-xl border border-gray-600/30">
                      <h4 className="text-xl font-bold mb-4 text-center text-green-400">Referral Tree Results</h4>
                      <div className="space-y-3">
                        {referralTreeData.addresses.map((address: string, index: number) => (
                          <div key={index} className="bg-gray-800/50 p-4 rounded-lg">
                            <p className="text-sm text-gray-400 mb-2">Level {index + 1}:</p>
                            <div className="space-y-1">
                              <div>
                                <span className="text-xs text-gray-500">Referrer Address:</span>
                                <p className="font-mono text-white break-all text-sm">
                                  {address === '0x0000000000000000000000000000000000000000' ? 'No referrer' : address}
                                </p>
                              </div>
                              <div>
                                <span className="text-xs text-gray-500">Referral ID:</span>
                                <p className="font-mono text-yellow-400 text-sm">
                                  {referralTreeData.referralIds[index] === '0' ? 'No referral ID' : referralTreeData.referralIds[index]}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            */}

          {/* Check Referrer Earnings Section - Hidden on mobile when not connected */}
          {selectedMethod === 'check-referral-tree' && (!isMobile || isConnected) && (
            <div className="mb-10 max-w-2xl mx-auto">
              <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-600/30 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Check Referrer Earnings
                </h3>

                <div className="mb-6">
                  <p className="text-white/80 text-center mb-4">
                    Enter a wallet address to check their referral earnings across all levels.
                  </p>
                  <p className="text-sm text-gray-400 text-center">
                    This will show you the total earnings for Level 1, Level 2, Level 3, and Level 4 referrals.
                  </p>
                </div>

                <div className="mb-6">
                  <Input
                    type="text"
                    placeholder="Enter wallet address (0x...)"
                    value={referrerAddress}
                    onChange={(e) => setReferrerAddress(e.target.value)}
                    className="w-full bg-gray-800/50 text-white border-gray-600/30 rounded-xl py-4 px-6 text-lg backdrop-blur-sm focus:border-pink-500/50 focus:ring-pink-500/20 transition-all duration-300"
                  />
                </div>

                <div className="flex justify-center">
                  <Button
                    onClick={checkReferrerEarnings}
                    disabled={isLoadingEarnings || !referrerAddress.trim()}
                    className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg shadow-green-500/25 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isLoadingEarnings ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Checking...</span>
                      </div>
                    ) : (
                      'Check Referrer Earnings'
                    )}
                  </Button>
                </div>

                {/* Display Referrer Earnings Results */}
                {referrerEarnings && (
                  <div className="mt-8 p-6 bg-gray-900/50 rounded-xl border border-gray-600/30">
                    <h4 className="text-xl font-bold mb-4 text-center text-green-400">Referrer Earnings Results</h4>
                    <div className="space-y-3">
                      <div className="bg-gray-800/50 p-4 rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="text-white font-semibold">Level 1 Earnings:</span>
                          <span className="text-green-400 font-mono text-lg">{referrerEarnings.level1} MATIC</span>
                        </div>
                      </div>
                      <div className="bg-gray-800/50 p-4 rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="text-white font-semibold">Level 2 Earnings:</span>
                          <span className="text-green-400 font-mono text-lg">{referrerEarnings.level2} MATIC</span>
                        </div>
                      </div>
                      <div className="bg-gray-800/50 p-4 rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="text-white font-semibold">Level 3 Earnings:</span>
                          <span className="text-green-400 font-mono text-lg">{referrerEarnings.level3} MATIC</span>
                        </div>
                      </div>
                      <div className="bg-gray-800/50 p-4 rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="text-white font-semibold">Level 4 Earnings:</span>
                          <span className="text-green-400 font-mono text-lg">{referrerEarnings.level4} MATIC</span>
                        </div>
                      </div>
                      <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 p-4 rounded-lg border border-green-500/30">
                        <div className="flex justify-between items-center">
                          <span className="text-white font-bold text-lg">Total Earnings:</span>
                          <span className="text-green-400 font-mono text-xl font-bold">
                            {(parseFloat(referrerEarnings.level1) + parseFloat(referrerEarnings.level2) + parseFloat(referrerEarnings.level3) + parseFloat(referrerEarnings.level4)).toFixed(6)} MATIC
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Check Referral Percentage Section - Hidden on mobile when not connected */}
          {selectedMethod === 'check-referral-tree' && (!isMobile || isConnected) && (
            <div className="mb-10 max-w-2xl mx-auto">
              <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-600/30 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Check Referral Percentage
                </h3>

                <div className="mb-6">
                  <p className="text-white/80 text-center mb-4">
                    Enter a level number (1, 2, 3, or 4) to check the referral percentage for that level.
                  </p>
                  <p className="text-sm text-gray-400 text-center">
                    This will show you the percentage of earnings that referrers get at each level.
                  </p>
                </div>

                <div className="mb-6">
                  <Input
                    type="number"
                    placeholder="Enter level number (1-4)"
                    value={levelNumber}
                    onChange={(e) => setLevelNumber(e.target.value)}
                    min="1"
                    max="4"
                    className="w-full bg-gray-800/50 text-white border-gray-600/30 rounded-xl py-4 px-6 text-lg backdrop-blur-sm focus:border-pink-500/50 focus:ring-pink-500/20 transition-all duration-300"
                  />
                </div>

                <div className="flex justify-center">
                  <Button
                    onClick={checkReferralPercentage}
                    disabled={isLoadingPercentage || !levelNumber.trim()}
                    className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isLoadingPercentage ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Checking...</span>
                      </div>
                    ) : (
                      'Check Referral Percentage'
                    )}
                  </Button>
                </div>

                {/* Display Referral Percentage Results */}
                {referralPercentage && (
                  <div className="mt-8 p-6 bg-gray-900/50 rounded-xl border border-gray-600/30">
                    <h4 className="text-xl font-bold mb-4 text-center text-purple-400">Referral Percentage Results</h4>
                    <div className="space-y-3">
                      <div className="bg-gray-800/50 p-4 rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="text-white font-semibold">Level {referralPercentage.level} Percentage:</span>
                          <span className="text-purple-400 font-mono text-lg">{referralPercentage.percentage}%</span>
                        </div>
                      </div>
                      {/* <div className="bg-gray-800/50 p-4 rounded-lg">
                         <div className="flex justify-between items-center">
                           <span className="text-white font-semibold">Raw Value (Basis Points):</span>
                           <span className="text-gray-400 font-mono text-sm">{referralPercentage.rawValue}</span>
                         </div>
                       </div> */}
                      {/* <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 p-4 rounded-lg border border-purple-500/30">
                         <div className="text-center">
                           <span className="text-white font-semibold text-sm">Note: Percentages are stored as basis points (1% = 100 basis points)</span>
                         </div>
                       </div> */}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Get Complete Tree Section - Hidden on mobile when not connected */}
          {selectedMethod === 'check-referral-tree' && (!isMobile || isConnected) && (
            <div className="mb-10 max-w-2xl mx-auto">
              <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-600/30 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Get Complete Tree
                </h3>

                <div className="mb-6">
                  <p className="text-white/80 text-center mb-4">
                    Enter a token ID to get the complete referral tree (ancestors and descendants).
                  </p>
                  <p className="text-sm text-gray-400 text-center">
                    This will show you the full referral chain for any NFT token.
                  </p>
                </div>

                <div className="mb-6">
                  <Input
                    type="number"
                    placeholder="Enter Token ID (e.g., 1, 2, 3...)"
                    value={completeTreeTokenId}
                    onChange={(e) => setCompleteTreeTokenId(e.target.value)}
                    className="w-full bg-gray-800/50 text-white border-gray-600/30 rounded-xl py-4 px-6 text-lg backdrop-blur-sm focus:border-pink-500/50 focus:ring-pink-500/20 transition-all duration-300"
                  />
                </div>

                <div className="flex justify-center">
                  <Button
                    onClick={getCompleteTree}
                    disabled={isLoadingCompleteTree || !completeTreeTokenId.trim()}
                    className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isLoadingCompleteTree ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Loading...</span>
                      </div>
                    ) : (
                      'Get Complete Tree'
                    )}
                  </Button>
                </div>

                {/* Display Complete Tree Results */}
                {completeTreeData && (
                  <div className="mt-8 p-6 bg-gray-900/50 rounded-xl border border-gray-600/30">
                    <h4 className="text-xl font-bold mb-4 text-center text-purple-400">Complete Tree for Token #{completeTreeData.tokenId}</h4>

                    {/* Ancestors Section */}
                    <div className="mb-6">
                      <h5 className="text-lg font-semibold mb-3 text-blue-400">Ancestors (Upward Chain)</h5>
                      {completeTreeData.ancestors.length > 0 ? (
                        <div className="space-y-2">
                          {completeTreeData.ancestors.map((ancestorId: string, index: number) => (
                            <div key={index} className="bg-gray-800/50 p-3 rounded-lg">
                              <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-3">
                                  <span className="text-white font-semibold">Token #{ancestorId}</span>
                                  <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded text-xs font-semibold">
                                    Level {completeTreeData.ancestorLevels[index]}
                                  </span>
                                </div>
                                <span className="text-gray-400 text-sm font-mono">
                                  {completeTreeData.ancestorOwners[index]}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="bg-gray-800/50 p-4 rounded-lg text-center">
                          <span className="text-gray-400">No ancestors found</span>
                        </div>
                      )}
                    </div>

                    {/* Descendants Section */}
                    <div>
                      <h5 className="text-lg font-semibold mb-3 text-green-400">Descendants (Downward Chain)</h5>
                      {completeTreeData.descendants.length > 0 ? (
                        <div className="space-y-2">
                          {completeTreeData.descendants.map((descendantId: string, index: number) => (
                            <div key={index} className="bg-gray-800/50 p-3 rounded-lg">
                              <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-3">
                                  <span className="text-white font-semibold">Token #{descendantId}</span>
                                  <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded text-xs font-semibold">
                                    Level {completeTreeData.descendantLevels[index]}
                                  </span>
                                </div>
                                <span className="text-gray-400 text-sm font-mono">
                                  {completeTreeData.descendantOwners[index]}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="bg-gray-800/50 p-4 rounded-lg text-center">
                          <span className="text-gray-400">No descendants found</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Claim Diamond Cashback Section - Hidden on mobile when not connected */}
          {selectedMethod === 'claim-diamond-cashback' && (!isMobile || isConnected) && (
            <div className="mb-10 max-w-2xl mx-auto">
              <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-600/30 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Claim Diamond Cashback 💎
                </h3>

                <div className="mb-6">
                  <p className="text-white/80 text-center mb-4">
                    Claim your 10% cashback in GKY tokens for your Diamond NFT.
                  </p>
                  <p className="text-sm text-gray-400 text-center mb-2">
                    Enter the token ID of your Diamond NFT to claim the cashback.
                  </p>
                  <p className="text-xs text-yellow-400 text-center">
                    ⚠️ Only Diamond NFTs minted with a referral ID are eligible for cashback.
                  </p>
                </div>

                <div className="mb-6">
                  <Input
                    type="number"
                    placeholder="Enter Diamond NFT Token ID"
                    value={cashbackTokenId}
                    onChange={(e) => setCashbackTokenId(e.target.value)}
                    className="w-full bg-gray-800/50 text-white border-gray-600/30 rounded-xl py-4 px-6 text-lg backdrop-blur-sm focus:border-pink-500/50 focus:ring-pink-500/20 transition-all duration-300"
                  />
                </div>

                <div className="flex justify-center">
                  <Button
                    onClick={claimDiamondCashback}
                    disabled={isLoadingCashback || !cashbackTokenId.trim() || !isConnected}
                    className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg shadow-yellow-500/25 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isLoadingCashback ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Claiming Cashback...</span>
                      </div>
                    ) : (
                      'Claim Cashback'
                    )}
                  </Button>
                </div>

                {!isConnected && (
                  <div className="mt-4 text-center">
                    <p className="text-yellow-400 text-sm">
                      Please connect your wallet to claim cashback
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tier Selection - EXPLOSIVE NEON DESIGN */}
          {selectedMethod && selectedMethod !== 'check-referral-tree' && selectedMethod !== 'claim-diamond-cashback' && (!isMobile || isConnected) && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 mb-6 px-2">
              {TIERS.map((tier, index) => {
                const tierGradients: Record<string, string> = {
                  'STARTER': 'from-emerald-500 via-green-400 to-teal-500',
                  'BASIC': 'from-blue-500 via-cyan-400 to-blue-600',
                  'STANDARD': 'from-violet-500 via-purple-400 to-indigo-600',
                  'VIP': 'from-amber-500 via-yellow-400 to-orange-500',
                  'PREMIUM': 'from-rose-500 via-pink-400 to-red-500',
                  'DIAMOND': 'from-cyan-400 via-blue-300 to-purple-500',
                };
                const gradient = tierGradients[tier.name] || 'from-pink-500 to-purple-600';
                const isSelected = selectedTier === tier.name;
                
                // Play click sound and vibrate
                const playClickFeedback = () => {
                  // Vibrate phone (if supported)
                  if (navigator.vibrate) {
                    navigator.vibrate(50);
                  }
                  
                  // Play sound
                  try {
                    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
                    if (AudioContextClass) {
                      const audioContext = new AudioContextClass();
                      const oscillator = audioContext.createOscillator();
                      const gainNode = audioContext.createGain();
                      
                      oscillator.connect(gainNode);
                      gainNode.connect(audioContext.destination);
                      
                      // Nice click sound - two tones
                      oscillator.frequency.setValueAtTime(1200, audioContext.currentTime);
                      oscillator.frequency.setValueAtTime(800, audioContext.currentTime + 0.05);
                      oscillator.type = 'sine';
                      
                      gainNode.gain.setValueAtTime(0.4, audioContext.currentTime);
                      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
                      
                      oscillator.start(audioContext.currentTime);
                      oscillator.stop(audioContext.currentTime + 0.15);
                    }
                  } catch (e) {
                    console.log('Audio feedback not available');
                  }
                };
                
                return (
                  <div
                    key={tier.name}
                    onClick={() => {
                      playClickFeedback();
                      setSelectedTier(tier.name);
                    }}
                    className={`relative cursor-pointer group`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Animated glow border */}
                    <div className={`absolute -inset-0.5 bg-gradient-to-r ${gradient} rounded-2xl blur-sm opacity-75 group-hover:opacity-100 transition-all duration-500 ${isSelected ? 'animate-pulse' : ''}`}></div>
                    
                    {/* Card content */}
                    <div className={`relative bg-gray-900/95 backdrop-blur-xl rounded-2xl p-3 md:p-6 border ${isSelected ? 'border-white/50' : 'border-transparent'} transition-all duration-300`}>
                      
                      {/* Selection checkmark */}
                      {isSelected && (
                        <div className={`absolute -top-2 -right-2 w-6 h-6 md:w-7 md:h-7 bg-gradient-to-r ${gradient} rounded-full flex items-center justify-center shadow-lg z-10`}>
                          <svg className="w-3 h-3 md:w-4 md:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                      
                      {/* NFT Video/Image */}
                      <div className={`w-14 h-14 md:w-20 md:h-20 mx-auto mb-2 md:mb-4 rounded-full overflow-hidden ring-2 ring-offset-2 ring-offset-gray-900 bg-gradient-to-r ${gradient} p-0.5`}>
                        <video
                          className="w-full h-full object-cover rounded-full"
                          autoPlay
                          loop
                          muted
                          playsInline
                        >
                          <source src={`/NFT/${getTierVideoPath(tier.name)}`} type="video/mp4" />
                        </video>
                      </div>
                      
                      {/* Tier Name - Gradient text */}
                      <h3 className={`text-base md:text-2xl font-black mb-1 md:mb-2 text-center bg-gradient-to-r ${gradient} bg-clip-text text-transparent tracking-tight`}>
                        {tier.name}
                      </h3>
                      
                      {/* Price with glow effect */}
                      <div className="text-center">
                        <span className="text-lg md:text-2xl font-bold text-white">
                          {contractPrices?.[tier.name] || tier.price}
                        </span>
                        <span className={`ml-1 text-xs md:text-base font-semibold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
                          POL
                        </span>
                      </div>
                      
                      {/* Hover shine effect */}
                      <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Payment Method Selection - After cards, before Buy Now */}
          {(!isMobile || isConnected) && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8 max-w-4xl mx-auto px-2">
              <Button
                onClick={() => {
                  setSelectedMethod('without-referral');
                  setReferralId('');
                }}
                className={`py-3 px-4 text-xs md:text-sm font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 ${selectedMethod === 'without-referral'
                    ? 'bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 shadow-lg shadow-pink-500/25'
                    : 'bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600/30 backdrop-blur-sm'
                  }`}
              >
                Without Referral
              </Button>
              <Button
                onClick={() => setSelectedMethod('with-referral')}
                className={`py-3 px-4 text-xs md:text-sm font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 ${selectedMethod === 'with-referral'
                    ? 'bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 shadow-lg shadow-pink-500/25'
                    : 'bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600/30 backdrop-blur-sm'
                  }`}
              >
                With Referral
              </Button>
              <Button
                onClick={() => setSelectedMethod('check-referral-tree')}
                className={`py-3 px-4 text-xs md:text-sm font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 ${selectedMethod === 'check-referral-tree'
                    ? 'bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 shadow-lg shadow-pink-500/25'
                    : 'bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600/30 backdrop-blur-sm'
                  }`}
              >
                Check Referral Tree
              </Button>
              <Button
                onClick={() => setSelectedMethod('claim-diamond-cashback')}
                className={`py-3 px-4 text-xs md:text-sm font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 ${selectedMethod === 'claim-diamond-cashback'
                    ? 'bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 shadow-lg shadow-pink-500/25'
                    : 'bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600/30 backdrop-blur-sm'
                  }`}
              >
                Claim Diamond Cashback
              </Button>
            </div>
          )}

          {/* Referral Input - shows when With Referral is selected */}
          {selectedMethod === 'with-referral' && (!isMobile || isConnected) && (
            <div className="mb-8 max-w-md mx-auto px-2">
              <Input
                type="text"
                placeholder="Enter Referral ID"
                value={referralId}
                onChange={(e) => setReferralId(e.target.value)}
                className="w-full bg-gray-800/50 text-white border-gray-600/30 rounded-xl py-4 px-6 text-lg backdrop-blur-sm focus:border-pink-500/50 focus:ring-pink-500/20 transition-all duration-300"
              />
            </div>
          )}

          {/* Mint Button with improved styling */}
          {selectedMethod && selectedTier && selectedMethod !== 'check-referral-tree' && selectedMethod !== 'claim-diamond-cashback' && (!isMobile || isConnected) && (
            <div className="flex justify-center">
              <Button
                onClick={handleMint}
                disabled={isLoading || (selectedMethod === 'with-referral' && !referralId)}
                className="bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 hover:from-red-600 hover:via-pink-600 hover:to-purple-700 px-16 py-6 text-2xl font-bold rounded-2xl shadow-2xl shadow-pink-500/30 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  'Buy Now'
                )}
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Floating Help Button - Hidden on mobile when not connected */}
      <div className={`fixed bottom-6 right-6 z-50 ${isMobile && !isConnected ? 'hidden' : ''}`}>
        <Button
          className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg shadow-blue-500/25 transform hover:scale-110 transition-all duration-300 flex items-center justify-center"
          onClick={() => {
            Swal.fire({
              title: '<span class="text-2xl font-bold text-white">Gianky NFT Platform</span>',
              html: `
                  <div class="text-left text-gray-300 space-y-2 w-full">
                   <div class="bg-gray-800/50 p-3 rounded-lg border border-gray-600/30">
  <h3 class="text-2xl font-semibold text-blue-400 mb-1 text-center">🎯 Overview</h3>
  <p class="text-lg text-center">Gianky is an ERC721-based NFT contract that allows minting of multiple NFT tiers, integrates a referral system, provides cashback in <strong>GKY tokens (Token Name: Gianky, Symbol: GKY)</strong>, and interacts with liquidity pools to determine token price. The NFTs minted on this contract represent unique assets and are identified by the <strong>NFT Token Name: Gianky NFT, Symbol: GK</strong>.</p>
</div>


                    
                                         <div class="bg-gray-800/50 p-3 rounded-lg border border-gray-600/30">
                       <h3 class="text-2xl font-semibold text-green-400 mb-3">🏆 NFT Tiers</h3>
                       <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                         <div class="bg-gray-700/50 p-2 rounded-lg border border-yellow-400/30">
                           <div class="text-yellow-400 font-semibold text-sm">Starter</div>
                           <div class="text-gray-300 text-xs">Entry level tier</div>
                         </div>
                         <div class="bg-gray-700/50 p-2 rounded-lg border border-white/30">
                           <div class="text-white font-semibold text-sm">Basic</div>
                           <div class="text-gray-300 text-xs">Standard tier</div>
                         </div>
                         <div class="bg-gray-700/50 p-2 rounded-lg border border-blue-400/30">
                           <div class="text-blue-400 font-semibold text-sm">Standard</div>
                           <div class="text-gray-300 text-xs">Popular choice</div>
                         </div>
                         <div class="bg-gray-700/50 p-2 rounded-lg border border-cyan-400/30">
                           <div class="text-cyan-400 font-semibold text-sm">VIP</div>
                           <div class="text-gray-300 text-xs">Premium tier</div>
                         </div>
                         <div class="bg-gray-700/50 p-2 rounded-lg border border-indigo-400/30">
                           <div class="text-indigo-400 font-semibold text-sm">Premium</div>
                           <div class="text-gray-300 text-xs">High-end tier</div>
                         </div>
                         <div class="bg-gray-700/50 p-2 rounded-lg border border-yellow-500/30">
                           <div class="text-yellow-500 font-semibold text-sm">Diamond</div>
                           <div class="text-gray-300 text-xs">Ultimate tier</div>
                         </div>
                       </div>
                     </div>
                    
                                         <div class="bg-gray-800/50 p-3 rounded-lg border border-gray-600/30">
                       <h3 class="text-2xl font-semibold text-purple-400 mb-3">🔗 Referral System</h3>
                       <p class="text-pink-400 font-semibold mb-3 text-sm">Generate your own ID by using mint with refer function to create your own referral system and earn rewards!</p>
                       <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                         <div class="bg-gray-700/50 p-2 rounded-lg border border-yellow-400/30">
                           <div class="text-yellow-400 font-semibold text-sm">Starter</div>
                           <div class="text-gray-300 text-xs">refers to Starter and Basic</div>
                         </div>
                         <div class="bg-gray-700/50 p-2 rounded-lg border border-white/30">
                           <div class="text-white font-semibold text-sm">Basic</div>
                           <div class="text-gray-300 text-xs">refers to Starter, Basic, Standard</div>
                         </div>
                         <div class="bg-gray-700/50 p-2 rounded-lg border border-blue-400/30">
                           <div class="text-blue-400 font-semibold text-sm">Standard</div>
                           <div class="text-gray-300 text-xs">refers to Starter, Basic, Standard</div>
                         </div>
                         <div class="bg-gray-700/50 p-2 rounded-lg border border-cyan-400/30">
                           <div class="text-cyan-400 font-semibold text-sm">VIP</div>
                           <div class="text-gray-300 text-xs">refers to Starter, Basic, Standard, VIP</div>
                         </div>
                         <div class="bg-gray-700/50 p-2 rounded-lg border border-indigo-400/30">
                           <div class="text-indigo-400 font-semibold text-sm">Premium</div>
                           <div class="text-gray-300 text-xs">refers to Starter → VIP tiers</div>
                         </div>
                         <div class="bg-gray-700/50 p-2 rounded-lg border border-yellow-500/30">
                           <div class="text-yellow-500 font-semibold text-sm">Diamond</div>
                           <div class="text-gray-300 text-xs">refers to VIP, Premium, Diamond, Standard</div>
                         </div>
                       </div>
                     </div>
                    
                                         <div class="bg-gray-800/50 p-3 rounded-lg border border-gray-600/30">
                       <h3 class="text-2xl font-semibold text-orange-400 mb-3">💰 Key Features</h3>
                       <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                         <div class="bg-gray-700/50 p-2 rounded-lg border border-orange-400/30">
                           <div class="text-orange-400 font-semibold text-sm">Multi-level Rewards</div>
                           <div class="text-gray-300 text-xs">Up to 4 levels of referral rewards</div>
                         </div>
                         <div class="bg-gray-700/50 p-2 rounded-lg border border-green-400/30">
                           <div class="text-green-400 font-semibold text-sm">GKY Cashback</div>
                           <div class="text-gray-300 text-xs">Cashback in GKY tokens after minting</div>
                         </div>
                         <div class="bg-gray-700/50 p-2 rounded-lg border border-blue-400/30">
                           <div class="text-blue-400 font-semibold text-sm">Tier-based Eligibility</div>
                           <div class="text-gray-300 text-xs">Referral eligibility depends on tiers</div>
                         </div>
                         <div class="bg-gray-700/50 p-2 rounded-lg border border-purple-400/30">
                           <div class="text-purple-400 font-semibold text-sm">Auto Distribution</div>
                           <div class="text-gray-300 text-xs">Automatic reward distribution</div>
                         </div>
                       </div>
                     </div>
                    
                    <div class="bg-gradient-to-r from-gray-800/50 to-gray-700/50 p-3 rounded-lg border border-blue-500/30">
                      <p class="text-center text-lg text-blue-300">
                        💡 <strong>Tip:</strong> Start with any tier to generate your referral ID, then share it with others to earn rewards!
                      </p>
                    </div>
                  </div>
                `,
              showConfirmButton: true,
              confirmButtonText: 'Got it!',
              confirmButtonColor: '#3b82f6',
              customClass: {
                popup: 'rounded-2xl border border-gray-600/30 bg-gradient-to-br from-gray-800 to-gray-900 w-10/12 max-w-2xl',
                confirmButton: 'px-6 py-2 rounded-lg font-semibold',
                htmlContainer: 'text-white'
              }
            });
          }}
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </Button>
      </div>
    </div>
  );
}
