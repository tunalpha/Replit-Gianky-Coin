import { ethers } from 'ethers';
import { getProvider } from "@/lib/ethersProvider";

// ERC721 ABI for basic NFT functions
const ERC721_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function tokenURI(uint256) view returns (string)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address) view returns (uint256)",
  "function ownerOf(uint256) view returns (address)",
  "function safeTransferFrom(address from, address to, uint256 tokenId)",
  "function transferFrom(address from, address to, uint256 tokenId)",
  "function approve(address to, uint256 tokenId)",
  "function getApproved(uint256 tokenId) view returns (address)",
  "function setApprovalForAll(address operator, bool approved)",
  "function isApprovedForAll(address owner, address operator) view returns (bool)"
];

// ERC721 Drop ABI for claim conditions
const ERC721_DROP_ABI = [
  "function claimCondition() view returns (tuple(address currency, uint256 pricePerToken, uint256 availableSupply, uint256 startTimestamp, uint256 endTimestamp, uint256 maxClaimablePerWallet, uint256 maxClaimablePerTransaction, bytes32 merkleRoot, uint256 currentSupplyMinted, bool isClaimPaused))",
  "function getActiveClaimConditionId() view returns (uint256)",
  "function getClaimConditionById(uint256) view returns (tuple(address currency, uint256 pricePerToken, uint256 availableSupply, uint256 startTimestamp, uint256 endTimestamp, uint256 maxClaimablePerWallet, uint256 maxClaimablePerTransaction, bytes32 merkleRoot, uint256 currentSupplyMinted, bool isClaimPaused))"
];

// ERC20 ABI for currency metadata
const ERC20_ABI = [
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)"
];

export async function getERC721Info(contractAddress: string) {
  try {
    const provider = getProvider();
    
    // Create contract instances
    const erc721Contract = new ethers.Contract(contractAddress, ERC721_ABI, provider);
    const dropContract = new ethers.Contract(contractAddress, ERC721_DROP_ABI, provider);
    
    // Get basic NFT info
    const [name, symbol] = await Promise.all([
      erc721Contract.name().catch(() => ""),
      erc721Contract.symbol().catch(() => "")
    ]);

    // Try to get claim condition
    let pricePerToken = null;
    let currencySymbol = "";
    
    try {
      const activeConditionId = await dropContract.getActiveClaimConditionId();
      const claimCondition = await dropContract.getClaimConditionById(activeConditionId);
      
      if (claimCondition && claimCondition.pricePerToken.gt(0)) {
        // Default to 18 decimals for price calculation
        pricePerToken = parseFloat(ethers.utils.formatEther(claimCondition.pricePerToken));
        
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
      description: "", // Would need to fetch from tokenURI for description
      pricePerToken,
      contractImage: "", // Would need to fetch from tokenURI for image
      currencySymbol,
    };
  } catch (error) {
    console.error('Error in getERC721Info:', error);
    return {
      displayName: "",
      description: "",
      pricePerToken: null,
      contractImage: "",
      currencySymbol: "",
    };
  }
}
