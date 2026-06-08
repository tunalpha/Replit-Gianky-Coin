import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { ADDRESSES, NETWORK_CONFIG } from '@/lib/constants/addresses';
import ContractABI from '@/lib/contracts/abi.json';
import { CASHBACK_CONTRACT_ABI } from '@/lib/contracts/abi';
import { switchToPolygon, validateNetwork } from '@/lib/utils/network';
import { 
  showSuccessAlert, 
  showErrorAlert, 
  showConfirmAlert, 
  showLoadingAlert, 
  showWalletErrorAlert 
} from '@/components/ui/sweet-alert';

// Using existing global type declarations from src/lib/types/

export function useNftMint(isConnected?: boolean, address?: string, getProvider?: () => any) {
  const [isLoading, setIsLoading] = useState(false);
  const [isCorrectNetwork, setIsCorrectNetwork] = useState(false);

  // Debug logging for useNftMint parameters
  console.log('useNftMint hook - Parameters:', { isConnected, address });

  // Check and handle network changes - silently, without popup
  useEffect(() => {
    const checkNetwork = async () => {
      try {
        const isValid = await validateNetwork();
        setIsCorrectNetwork(isValid);
        // Removed automatic "Wrong Network" popup - network will be checked when user tries to mint
      } catch (error) {
        console.error('Network check failed:', error);
        setIsCorrectNetwork(false);
      }
    };

    checkNetwork();

    if ((window as any).ethereum) {
      const handleChainChanged = () => {
        checkNetwork();
      };

      const handleAccountsChanged = () => {
        checkNetwork();
      };

      const ethereum = (window as any).ethereum as any;
      if (ethereum) {
        (ethereum as any).on('chainChanged', handleChainChanged);
        (ethereum as any).on('accountsChanged', handleAccountsChanged);
      
      return () => {
          (ethereum as any).removeListener('chainChanged', handleChainChanged);
          (ethereum as any).removeListener('accountsChanged', handleAccountsChanged);
      };
      }
    }
  }, []);

  const handleNetworkSwitch = useCallback(async () => {
    try {
      await switchToPolygon();
      setIsCorrectNetwork(true);
    } catch (error) {
      console.error('Failed to switch network:', error);
      showErrorAlert(
        'Network Switch Failed',
        'Please manually switch to Polygon network in your wallet.'
      );
    }
  }, []);

  const calculateGasCost = useCallback(async (
    amount: number,
    referralCode: string = '',
    recipientAddress?: string
  ) => {
    if (typeof window === 'undefined' || !(window as any).ethereum) return null;
    
    const provider = new ethers.providers.Web3Provider((window as any).ethereum);
    const signer = provider.getSigner();
    const nftContract = new ethers.Contract(
      ADDRESSES.NFT_CONTRACT,
      ['function mint(string memory referralCode, address recipient) payable'],
      signer
    );

    const paymentAmount = ethers.utils.parseEther(amount.toString());
    const gasPrice = await provider.getGasPrice();
    const signerAddress = await signer.getAddress();
    
    const estimatedGas = await nftContract.estimateGas.mint(
      referralCode,
      recipientAddress || signerAddress,
      { value: paymentAmount }
    );

    const gasCost = gasPrice.mul(estimatedGas);
    return {
      estimatedGas,
      gasPrice,
      totalGasCost: ethers.utils.formatEther(gasCost),
      maxGasCost: ethers.utils.formatEther(gasCost.mul(120).div(100)) // with 20% buffer
    };
  }, []); // Empty dependency array since it only uses (window as any).ethereum and constants

  const checkContractPrices = useCallback(async () => {
    if (typeof window === 'undefined' || !isConnected || !address || !(window as any).ethereum) return null;
    const provider = new ethers.providers.Web3Provider((window as any).ethereum);
    const contract = new ethers.Contract(ADDRESSES.NFT_CONTRACT, ContractABI, provider);
    
    try {
      console.log('🔍 Fetching real-time prices from contract:', ADDRESSES.NFT_CONTRACT);
      
      // First, let's check if the contract exists by trying to get the code
      const code = await provider.getCode(ADDRESSES.NFT_CONTRACT);
      if (code === '0x') {
        console.warn('No contract found at address:', ADDRESSES.NFT_CONTRACT);
        return null;
      }
      
      // Try to get prices from contract
      const starterPrice = await contract.STARTER_PRICE();
      const basicPrice = await contract.BASIC_PRICE();
      const standardPrice = await contract.STANDARD_PRICE();
      const vipPrice = await contract.VIP_PRICE();
      const premiumPrice = await contract.PREMIUM_PRICE();
      const diamondPrice = await contract.DIAMOND_PRICE();

      // Log raw values for debugging
      console.log('🔍 Raw Contract Prices (wei):');
      console.log('STARTER:', starterPrice.toString());
      console.log('BASIC:', basicPrice.toString());
      console.log('STANDARD:', standardPrice.toString());
      console.log('VIP:', vipPrice.toString());
      console.log('PREMIUM:', premiumPrice.toString());
      console.log('DIAMOND:', diamondPrice.toString());
      
      // Check if values match expected wei values
      const expectedWei = {
        STARTER: '20000000000000000000', // 20 ether in wei
        BASIC: '50000000000000000000',   // 50 ether in wei
        STANDARD: '100000000000000000000', // 100 ether in wei
        VIP: '500000000000000000000',    // 500 ether in wei
        PREMIUM: '1000000000000000000000', // 1000 ether in wei
        DIAMOND: '5000000000000000000000'  // 5000 ether in wei
      };
      
      console.log('🔍 Expected vs Actual (wei):');
      console.log('STARTER: Expected', expectedWei.STARTER, 'Got', starterPrice.toString(), starterPrice.toString() === expectedWei.STARTER ? '✅' : '❌');
      console.log('BASIC: Expected', expectedWei.BASIC, 'Got', basicPrice.toString(), basicPrice.toString() === expectedWei.BASIC ? '✅' : '❌');
      console.log('STANDARD: Expected', expectedWei.STANDARD, 'Got', standardPrice.toString(), standardPrice.toString() === expectedWei.STANDARD ? '✅' : '❌');
      console.log('VIP: Expected', expectedWei.VIP, 'Got', vipPrice.toString(), vipPrice.toString() === expectedWei.VIP ? '✅' : '❌');
      console.log('PREMIUM: Expected', expectedWei.PREMIUM, 'Got', premiumPrice.toString(), premiumPrice.toString() === expectedWei.PREMIUM ? '✅' : '❌');
      console.log('DIAMOND: Expected', expectedWei.DIAMOND, 'Got', diamondPrice.toString(), diamondPrice.toString() === expectedWei.DIAMOND ? '✅' : '❌');

      const prices = {
        STARTER: ethers.utils.formatEther(starterPrice),
        BASIC: ethers.utils.formatEther(basicPrice),
        STANDARD: ethers.utils.formatEther(standardPrice),
        VIP: ethers.utils.formatEther(vipPrice),
        PREMIUM: ethers.utils.formatEther(premiumPrice),
        DIAMOND: ethers.utils.formatEther(diamondPrice)
      };

      console.log('💰 Real-time Contract Prices (MATIC):');
      console.log('STARTER:', prices.STARTER, 'MATIC');
      console.log('BASIC:', prices.BASIC, 'MATIC');
      console.log('STANDARD:', prices.STANDARD, 'MATIC');
      console.log('VIP:', prices.VIP, 'MATIC');
      console.log('PREMIUM:', prices.PREMIUM, 'MATIC');
      console.log('DIAMOND:', prices.DIAMOND, 'MATIC');

      return prices;
    } catch (error) {
      console.error('Failed to fetch contract prices:', error);
      return null;
    }
  }, [isConnected, address]); // Depends on connection status

  const mintNft = useCallback(async (
    amount: number,
    referralCode?: string,
    recipientAddress?: string
  ) => {
    try {
      setIsLoading(true);

      try {
        console.log('Starting minting process...');
        
        // AppKit handles mobile wallet detection and connection
        console.log('Using AppKit for wallet connection');
        
        // Check if we're on the client side
        if (typeof window === 'undefined') {
          console.log('Running on server side, skipping wallet checks');
          showErrorAlert(
            'Server Side Error',
            'Please refresh the page and try again'
          );
          setIsLoading(false);
          return;
        }

        // Check if wallet is connected via AppKit
        console.log('AppKit connection status:', { isConnected, address });
        console.log('(window as any).ethereum available:', !!(window as any).ethereum);
        console.log('(window as any).ethereum type:', typeof (window as any).ethereum);

        // Get provider from AppKit/Wagmi
        let provider: any;
        let walletConnected: boolean = !!(isConnected && address);
        
        console.log('🔍 Getting provider from AppKit...');
        console.log('AppKit connection status:', { isConnected, address });
        
        // Try to get provider from AppKit/Wagmi
        if (getProvider) {
          provider = getProvider();
          console.log('Provider from getProvider:', provider);
        }
        
        if (!provider) {
          console.error('❌ No provider available from AppKit');
          showErrorAlert(
            'Wallet Provider Not Found',
            'Please refresh the page and try again. Make sure your wallet is properly connected.'
          );
          setIsLoading(false);
          return;
        }
        
        console.log('✅ Using provider:', provider);

        // Now check wallet connection with the provider
        console.log('🔍 Checking wallet connection with provider...');
        console.log('Initial walletConnected status:', walletConnected);
        
        if (!walletConnected) {
          console.log('AppKit shows not connected, checking with provider...');
          try {
            let accounts: string[] = [];
            
            if ((provider as any).chain?.id) {
              // Wagmi walletClient - use the address directly
              accounts = address ? [address] : [];
            } else {
              // (window as any).ethereum - request accounts
              accounts = await (provider as any).request({ method: 'eth_accounts' }) as string[];
            }
            
            walletConnected = !!(accounts && accounts.length > 0);
            console.log('Provider accounts check:', { accounts, walletConnected });
          } catch (error) {
            console.log('Provider accounts check failed:', error);
          }
        }
        
        if (!walletConnected) {
          console.log('❌ Wallet not connected after all checks');
          showErrorAlert(
          'Wallet Not Found',
            'Please connect your Web3 wallet to continue'
          );
          setIsLoading(false);
          return;
        }
        
        console.log('✅ Wallet connection verified');

        // Verify we're on Polygon network first
        let chainId: string;
        let chainIdDecimal: number;
        
        // Handle different provider types
        if ((provider as any).chain?.id) {
          // This is a Wagmi walletClient
          console.log('Using Wagmi walletClient provider');
          chainIdDecimal = (provider as any).chain.id;
          chainId = '0x' + chainIdDecimal.toString(16);
        } else {
          // This is (window as any).ethereum
          console.log('Using (window as any).ethereum provider');
          chainId = await (provider as any).request({ method: 'eth_chainId' });
          chainIdDecimal = parseInt(chainId as string, 16);
        }
        
        console.log('Current network chainId:', chainId, 'Decimal:', chainIdDecimal);
        
        if (chainIdDecimal !== 137) { // Polygon Mainnet
          showErrorAlert(
            'Wrong Network',
            'Please switch to Polygon Mainnet in your wallet'
          );
          setIsLoading(false);
          return;
        }

        // Set the provider for future use
        (window as any).ethereum = provider;
        
        // Initialize ethers provider to check connection
        const ethersProvider = new ethers.providers.Web3Provider(provider);

        // Request accounts to ensure connection and permissions
        const accounts = await (provider as any).request({
          method: 'eth_requestAccounts'  // This will prompt if not connected
        }) as string[];
        
        if (!accounts || accounts.length === 0) {
          showErrorAlert(
            'Wallet Not Connected',
            'Please connect your wallet first'
          );
          setIsLoading(false);
          return;
        }

        console.log('Connected account:', accounts[0]);
      } catch (error: any) {
        console.error('Wallet connection error:', error);
        showErrorAlert(
          'Wallet Connection Error',
          error.message || 'Please ensure your wallet is properly connected'
        );
        setIsLoading(false);
        return;
      }

      // Check if we're on the correct network first
      const networkValid = await validateNetwork();
      if (!networkValid) {
        await handleNetworkSwitch();
      }

      // Ensure correct network
      if (!isCorrectNetwork) {
        await handleNetworkSwitch();
      }

      // Get signer
      if (!(window as any).ethereum) {
        throw new Error('No Web3 provider found');
      }
      const provider = new ethers.providers.Web3Provider((window as any).ethereum);
      const signer = provider.getSigner();

      // Create contract instance with the full ABI
      const nftContract = new ethers.Contract(
        ADDRESSES.NFT_CONTRACT,
        ContractABI,
        signer
      );

      // Convert amount to MATIC wei
      const paymentAmount = ethers.utils.parseUnits(amount.toString(), 18);
      console.log('Payment amount in MATIC wei:', paymentAmount.toString());

      // Check MATIC balance
      const maticBalance = await provider.getBalance(await signer.getAddress());
      if (maticBalance.lt(paymentAmount)) {
        throw new Error(`Insufficient MATIC balance. You need ${ethers.utils.formatEther(paymentAmount)} MATIC but have ${ethers.utils.formatEther(maticBalance)} MATIC`);
      }

      let mintTransaction: ethers.ContractTransaction;
      let tier: string = ''; // Declare tier at function scope to use later for cashback check

      try {
        // Simple transaction options - we'll include these directly in the mint call
        const txOptions = {
          value: paymentAmount,
          gasLimit: ethers.BigNumber.from("1000000")
        };

        console.log('Attempting to mint with options:', {
          value: ethers.utils.formatUnits(paymentAmount, 18),
          gasLimit: txOptions.gasLimit.toString()
        });

        // Get the tier name and tokenType from the amount
        console.log('Debug - Amount received:', amount);
        console.log('Debug - Amount type:', typeof amount);
        console.log('Debug - Amount exact value:', amount);
        
        const getTierAndTokenType = async (amount: number) => {
          // Get contract prices to determine tier
          const contractPrices = await checkContractPrices();
          
          if (contractPrices) {
            // Find tier by matching amount with contract prices
            for (const [tierName, priceStr] of Object.entries(contractPrices)) {
              const price = parseFloat(priceStr);
              if (Math.abs(amount - price) < 0.001) { // Allow small floating point differences
                return { tier: tierName, tokenType: getTokenTypeFromTier(tierName) };
              }
            }
            // If no match found with contract prices, try fallback prices
            console.warn('Amount does not match contract prices, trying fallback prices');
          }
          
          // Fallback to hardcoded mapping if contract prices unavailable or no match
          switch(amount) {
            case 20: return { tier: 'STARTER', tokenType: 0 };
            case 50: return { tier: 'BASIC', tokenType: 1 };
            case 100: return { tier: 'STANDARD', tokenType: 2 };
            case 500: return { tier: 'VIP', tokenType: 3 };
            case 1000: return { tier: 'PREMIUM', tokenType: 4 };
            case 5000: return { tier: 'DIAMOND', tokenType: 5 };
            default: throw new Error(`Invalid amount for tier. Amount ${amount} does not match any expected price. Expected: 20, 50, 100, 500, 1000, 5000 POL`);
          }
        };

        // Helper function to convert tier name to tokenType
        const getTokenTypeFromTier = (tier: string): number => {
          switch(tier) {
            case 'STARTER': return 0;
            case 'BASIC': return 1;
            case 'STANDARD': return 2;
            case 'VIP': return 3;
            case 'PREMIUM': return 4;
            case 'DIAMOND': return 5;
            default: throw new Error(`Invalid tier: ${tier}`);
          }
        };

        const tierAndTokenType = await getTierAndTokenType(amount);
        tier = tierAndTokenType.tier; // Store tier in outer scope for cashback check later
        const tokenType = tierAndTokenType.tokenType;
        
        // Convert tier name to proper case for function names that match the ABI exactly
        const getTierCase = (tier: string) => {
          switch(tier) {
            case 'VIP': return 'VIP';
            case 'PREMIUM': return 'Premium';
            case 'STARTER': return 'Starter';
            case 'BASIC': return 'Basic';
            case 'STANDARD': return 'Standard';
            case 'DIAMOND': return 'Diamond';
            default: return tier.charAt(0) + tier.slice(1).toLowerCase();
          }
        };
        const tierProperCase = getTierCase(tier);
        
        // Determine which function to call based on referral
        const mintFunctionName = referralCode 
          ? `mint${tierProperCase}`  // e.g., mintStarter, mintVIP
          : 'mintNFTWithoutId'; // Use the new contract function

        console.log(`Minting ${tier} tier ${referralCode ? 'with' : 'without'} referral`);
        console.log('Function name:', mintFunctionName);
        console.log('Token type:', tokenType);
        console.log('Tier proper case:', tierProperCase);
        
        // Call the appropriate mint function
        try {
          // Get the signer for direct transaction using the signer property
          const signer = nftContract.signer;
          
          // Get gas price
          const gasPrice = await provider.getGasPrice();
          console.log(`Current gas price: ${ethers.utils.formatUnits(gasPrice, 'gwei')} gwei`);

          // Set a reasonable gas limit for NFT minting
          const gasLimit = ethers.BigNumber.from('1000000'); // Increase gas limit for Polygon network
          console.log(`Using gas limit: ${gasLimit.toString()}`);

          // Get signer's address and balance
          const signerAddress = await signer.getAddress();
          const balance = await provider.getBalance(signerAddress);
          console.log('Wallet balance:', ethers.utils.formatEther(balance), 'MATIC');
          console.log('Required payment:', ethers.utils.formatEther(paymentAmount), 'MATIC');

          if (balance.lt(paymentAmount)) {
            throw new Error(`Insufficient balance. You need ${ethers.utils.formatEther(paymentAmount)} MATIC but have ${ethers.utils.formatEther(balance)} MATIC`);
          }
          
          if (referralCode) {
            console.log(`Calling function with referral:`, referralCode);
            // Convert referral code to BigNumber
            const referralId = ethers.BigNumber.from(referralCode);
            
            // For referral minting, use the tier-specific function (e.g., mintStarter, mintVIP)
            mintTransaction = await nftContract[mintFunctionName](referralId, {
              value: paymentAmount,
              gasLimit: gasLimit,
              gasPrice: gasPrice
            });
          } else {
            console.log(`Calling mintNFTWithoutId with tokenType:`, tokenType);
            
            // For non-referral minting, use mintNFTWithoutId with tokenType parameter
            mintTransaction = await nftContract.mintNFTWithoutId(tokenType, {
              value: paymentAmount,
              gasLimit: gasLimit,
              gasPrice: gasPrice
            });
          }
        } catch (error: any) {
          console.error('Contract call error:', error);
          
          // Try to get a more detailed error message
          let errorMessage = 'Unknown error occurred';
          
          if (error.error?.data?.message) {
            // Get revert reason from contract
            errorMessage = error.error.data.message;
          } else if (error.message) {
            errorMessage = error.message;
          }
          
          // Log any additional error details
          if (error.transaction) {
            console.log('Failed transaction details:', {
              to: error.transaction.to,
              value: error.transaction.value?.toString(),
              data: error.transaction.data
            });
          }
          
          throw new Error(`Failed to mint: ${errorMessage}`);
        }

        console.log('Transaction sent:', mintTransaction.hash);
      } catch (mintError: unknown) {
        console.error('Mint transaction error:', mintError);
        throw mintError;
      }

      // Wait for transaction confirmation
      const receipt = await mintTransaction.wait();

      // Get the token ID and GKY rewards from the transaction receipt
      let referralId: string | undefined;
      let tokenId: string | undefined;
      let gkyRewards: string | undefined;
      try {
        // Parse the transaction receipt to find events
        const iface = new ethers.utils.Interface(ContractABI);
        const logs = receipt.logs;
        
        console.log('Total logs found:', logs.length);
        
        for (const log of logs) {
          try {
            const parsedLog = iface.parseLog(log);
            console.log('Parsed log:', parsedLog.name, parsedLog.args);
            
            if (parsedLog.name === 'NFTMinted') {
              // args[0] = id (tokenId), args[1] = owner, args[2] = referralId
              tokenId = parsedLog.args[0].toString();
              referralId = parsedLog.args[2]?.toString(); // The referral ID used for minting
              console.log('Token ID found:', tokenId);
              console.log('Referral ID found:', referralId);
            } else if (parsedLog.name === 'LogRewardDetails') {
              // Extract GKY rewards from LogRewardDetails event
              const rewardAmount = parsedLog.args[1]; // rewardAmount is the second parameter
              gkyRewards = ethers.utils.formatUnits(rewardAmount, 18); // Assuming 18 decimals
              console.log('GKY Rewards found:', gkyRewards, 'Raw amount:', rewardAmount.toString());
            }
          } catch (e) {
            console.log('Could not parse log:', e);
            // Skip logs that can't be parsed
            continue;
          }
        }
        
        console.log('Final values - Token ID:', tokenId, 'Referral ID:', referralId, 'GKY Rewards:', gkyRewards);
      } catch (error) {
        console.log('Could not parse events from transaction:', error);
      }

      // If no GKY rewards found in events, calculate them based on the transaction
      if (!gkyRewards && referralId) {
        try {
          console.log('Calculating GKY rewards based on transaction value...');
          
          // Get the transaction value (amount paid in MATIC)
          const transaction = await provider.getTransaction(receipt.transactionHash);
          const maticValue = parseFloat(ethers.utils.formatEther(transaction.value));
          
          // Calculate 10% cashback in POL (as per contract logic)
          const cashbackInPOL = maticValue * 0.1; // 10% of the transaction value
          
          // Get the reverse price (GKY per POL) from the contract
          const reversePrice = await nftContract.getReversePrice();
          const gkyPerPOL = parseFloat(ethers.utils.formatEther(reversePrice));
          
          // Calculate GKY rewards: (cashbackInPOL * gkyPerPOL) / 1e18
          const calculatedGKYRewards = (cashbackInPOL * gkyPerPOL);
          
          gkyRewards = calculatedGKYRewards.toFixed(6); // Round to 6 decimal places
          console.log('Calculated GKY rewards:', gkyRewards, 'MATIC value:', maticValue, 'Cashback POL:', cashbackInPOL, 'GKY per POL:', gkyPerPOL);
        } catch (error) {
          console.log('Could not calculate GKY rewards:', error);
        }
      }

      // If no GKY rewards found in events, they might not be emitted
      if (!gkyRewards) {
        console.log('No GKY rewards found in events - contract may not be emitting LogRewardDetails event');
      }

      // Call giveDiamondCashback if this is a Diamond NFT minted with referral
      if (tier === 'DIAMOND' && referralCode && tokenId) {
        try {
          console.log('Diamond NFT minted with referral - calling giveDiamondCashback for tokenId:', tokenId);
          
          // Create cashback contract instance
          const cashbackContract = new ethers.Contract(
            ADDRESSES.CASHBACK_CONTRACT,
            CASHBACK_CONTRACT_ABI,
            signer
          );

          // Call giveDiamondCashback
          const cashbackTx = await cashbackContract.giveDiamondCashback(tokenId, {
            gasLimit: ethers.BigNumber.from('500000'), // Reasonable gas limit for cashback
            gasPrice: await provider.getGasPrice()
          });

          console.log('Cashback transaction sent:', cashbackTx.hash);
          
          // Wait for cashback transaction confirmation
          const cashbackReceipt = await cashbackTx.wait();
          console.log('Cashback transaction confirmed:', cashbackReceipt.transactionHash);

          // Parse CashbackGiven event to get the cashback amount
          const cashbackIface = new ethers.utils.Interface(CASHBACK_CONTRACT_ABI);
          for (const log of cashbackReceipt.logs) {
            try {
              const parsedLog = cashbackIface.parseLog(log);
              if (parsedLog.name === 'CashbackGiven') {
                const cashbackAmount = ethers.utils.formatUnits(parsedLog.args[1], 18);
                console.log('Cashback amount received:', cashbackAmount, 'GKY');
                // You can show this in the success message if needed
              }
            } catch (e) {
              // Skip logs that can't be parsed
              continue;
            }
          }
        } catch (cashbackError: any) {
          console.error('Cashback error:', cashbackError);
          // Don't fail the entire mint if cashback fails - just log it
          // The user can manually claim cashback later if needed
          console.warn('Cashback failed, but mint was successful. User can claim cashback manually later.');
        }
      }

      console.log('Calling showSuccessAlert with GKY rewards:', gkyRewards);
      
      // Add a small delay to ensure the loading state is cleared first
      // Use longer delay for mobile devices
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const delay = isMobile ? 300 : 100;
      
      setTimeout(() => {
        showSuccessAlert(
          'NFT Minted Successfully! 🎉',
          'Your NFT has been minted successfully!',
          receipt.transactionHash,
          referralId,
          gkyRewards,
          tokenId // Pass the new token ID
        );
      }, delay);

      return receipt.transactionHash;
    } catch (error: any) {
      console.error('Minting error:', error);
      showErrorAlert(
        'Minting Failed',
        error.message || 'Failed to mint NFT. Please try again.'
      );
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [isCorrectNetwork, handleNetworkSwitch]);

  return {
    mintNft,
    isLoading,
    isCorrectNetwork,
    handleNetworkSwitch,
    calculateGasCost,
    checkContractPrices,
  };
}
