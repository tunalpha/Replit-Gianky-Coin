import { ethers } from 'ethers';
import { getProvider } from "@/lib/ethersProvider";

// ERC20 ABI for basic token functions
const ERC20_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address) view returns (uint256)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function transferFrom(address from, address to, uint256 amount) returns (bool)"
];

// ERC20 Drop ABI for claim conditions
const ERC20_DROP_ABI = [
  "function claimCondition() view returns (tuple(address currency, uint256 pricePerToken, uint256 availableSupply, uint256 startTimestamp, uint256 endTimestamp, uint256 maxClaimablePerWallet, uint256 maxClaimablePerTransaction, bytes32 merkleRoot, uint256 currentSupplyMinted, bool isClaimPaused))",
  "function getActiveClaimConditionId() view returns (uint256)",
  "function getClaimConditionById(uint256) view returns (tuple(address currency, uint256 pricePerToken, uint256 availableSupply, uint256 startTimestamp, uint256 endTimestamp, uint256 maxClaimablePerWallet, uint256 maxClaimablePerTransaction, bytes32 merkleRoot, uint256 currentSupplyMinted, bool isClaimPaused))"
];

export async function getERC20Info(contractAddress: string) {
  try {
    const provider = getProvider();
    
    // Create contract instances
    const erc20Contract = new ethers.Contract(contractAddress, ERC20_ABI, provider);
    const dropContract = new ethers.Contract(contractAddress, ERC20_DROP_ABI, provider);
    
    // Get basic token info
    const [name, symbol, decimals] = await Promise.all([
      erc20Contract.name().catch(() => ""),
      erc20Contract.symbol().catch(() => ""),
      erc20Contract.decimals().catch(() => 18)
    ]);

    // Try to get claim condition
    let pricePerToken = null;
    let currencySymbol = "";
    
    try {
      const activeConditionId = await dropContract.getActiveClaimConditionId();
      const claimCondition = await dropContract.getClaimConditionById(activeConditionId);
      
      if (claimCondition && claimCondition.pricePerToken.gt(0)) {
        pricePerToken = parseFloat(ethers.utils.formatUnits(claimCondition.pricePerToken, decimals));
        
        // If there's a currency other than native token, get its symbol
        if (claimCondition.currency !== ethers.constants.AddressZero) {
          const currencyContract = new ethers.Contract(claimCondition.currency, ERC20_ABI, provider);
          currencySymbol = await currencyContract.symbol().catch(() => "");
        } else {
          currencySymbol = "MATIC"; // Default to MATIC for native currency
        }
      }
    } catch (error) {
      console.log('No claim condition found or error getting claim condition:', error);
    }

    return {
      displayName: name || "",
      description: "", // ERC20 doesn't have description in standard
      pricePerToken,
      contractImage: "", // ERC20 doesn't have image in standard
      currencySymbol,
    };
  } catch (error) {
    console.error('Error in getERC20Info:', error);
    return {
      displayName: "",
      description: "",
      pricePerToken: null,
      contractImage: "",
      currencySymbol: "",
    };
  }
}
