import { ethers } from 'ethers';
import { getProvider } from "@/lib/ethersProvider";

const defaultTokenId = BigInt(0);

// ERC1155 ABI for basic NFT functions
const ERC1155_ABI = [
  "function uri(uint256) view returns (string)",
  "function balanceOf(address, uint256) view returns (uint256)",
  "function balanceOfBatch(address[], uint256[]) view returns (uint256[])",
  "function setApprovalForAll(address operator, bool approved)",
  "function isApprovedForAll(address owner, address operator) view returns (bool)",
  "function safeTransferFrom(address from, address to, uint256 id, uint256 amount, bytes data)",
  "function safeBatchTransferFrom(address from, address to, uint256[] ids, uint256[] amounts, bytes data)"
];

// ERC1155 Drop ABI for claim conditions
const ERC1155_DROP_ABI = [
  "function getActiveClaimConditionId(uint256) view returns (uint256)",
  "function getClaimConditionById(uint256, uint256) view returns (tuple(address currency, uint256 pricePerToken, uint256 availableSupply, uint256 startTimestamp, uint256 endTimestamp, uint256 maxClaimablePerWallet, uint256 maxClaimablePerTransaction, bytes32 merkleRoot, uint256 currentSupplyMinted, bool isClaimPaused))"
];

// ERC20 ABI for currency metadata
const ERC20_ABI = [
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)"
];

export async function getERC1155Info(contractAddress: string, tokenId: bigint = defaultTokenId) {
  try {
    const provider = getProvider();
    
    // Create contract instances
    const erc1155Contract = new ethers.Contract(contractAddress, ERC1155_ABI, provider);
    const dropContract = new ethers.Contract(contractAddress, ERC1155_DROP_ABI, provider);
    
    // Get NFT metadata from URI
    let displayName = "";
    let description = "";
    let contractImage = "";
    
    try {
      const tokenURI = await erc1155Contract.uri(tokenId);
      if (tokenURI) {
        // If it's an IPFS URI, convert to HTTP
        const httpURI = tokenURI.startsWith('ipfs://') 
          ? `https://ipfs.io/ipfs/${tokenURI.slice(7)}`
          : tokenURI;
        
        const response = await fetch(httpURI);
        if (response.ok) {
          const metadata = await response.json();
          displayName = metadata.name || "";
          description = metadata.description || "";
          contractImage = metadata.image || "";
        }
      }
    } catch (error) {
      console.log('Failed to fetch NFT metadata:', error);
    }

    // Try to get claim condition
    let pricePerToken = null;
    let currencySymbol = "";
    
    try {
      const activeConditionId = await dropContract.getActiveClaimConditionId(tokenId);
      const claimCondition = await dropContract.getClaimConditionById(tokenId, activeConditionId);
      
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
      displayName,
      description,
      pricePerToken,
      contractImage,
      currencySymbol,
    };
  } catch (error) {
    console.error('Error in getERC1155Info:', error);
    return {
      displayName: "",
      description: "",
      pricePerToken: null,
      contractImage: "",
      currencySymbol: "",
    };
  }
}
