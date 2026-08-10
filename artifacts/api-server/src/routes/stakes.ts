import { Router, type IRouter } from "express";
import { ethers } from "ethers";

const router: IRouter = Router();

const STAKING_ADDRESS = "0xD38A9fF129788ff31B0b050ccBC34016397a10b4";

// Minimal ABI — only the getUserStakes view function needed server-side
const STAKING_ABI_MINIMAL = [
  {
    inputs: [{ internalType: "address", name: "_u", type: "address" }],
    name: "getUserStakes",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "tokenId", type: "uint256" },
          { internalType: "address", name: "owner", type: "address" },
          { internalType: "uint256", name: "lastClaimTime", type: "uint256" },
          { internalType: "uint256", name: "lockEndTime", type: "uint256" },
          { internalType: "uint256", name: "planIndex", type: "uint256" },
          { internalType: "uint256", name: "rewardRate", type: "uint256" },
          { internalType: "uint256", name: "priceUsedAtStake", type: "uint256" },
        ],
        internalType: "struct GiankyStakingV2.StakeInfo[]",
        name: "stakes",
        type: "tuple[]",
      },
      { internalType: "uint256", name: "pending", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
];

router.get("/stakes", async (req, res) => {
  const { address } = req.query;

  if (!address || typeof address !== "string") {
    return res.status(400).json({ error: "Missing address parameter" });
  }

  // Validate address format (accept any 0x + 40 hex chars, regardless of checksum)
  if (!/^0x[0-9a-fA-F]{40}$/.test(address)) {
    return res.status(400).json({ error: "Invalid Ethereum address" });
  }
  // Normalise to lowercase — ethers accepts any valid hex address
  const normalizedAddress = address.toLowerCase();

  const alchemyKey = process.env.ALCHEMY_KEY;
  if (!alchemyKey) {
    return res.status(503).json({ error: "Alchemy key not configured on server" });
  }

  try {
    const provider = new ethers.providers.JsonRpcProvider(
      `https://polygon-mainnet.g.alchemy.com/v2/${alchemyKey}`
    );
    const stakingContract = new ethers.Contract(STAKING_ADDRESS, STAKING_ABI_MINIMAL, provider);
    const result = await stakingContract.getUserStakes(normalizedAddress);

    const stakes = (result[0] ?? []).map((s: any) => ({
      tokenId: s.tokenId.toString(),
      owner: s.owner,
      lastClaimTime: s.lastClaimTime.toString(),
      lockEndTime: s.lockEndTime.toString(),
      planIndex: s.planIndex.toString(),
      rewardRate: s.rewardRate.toString(),
      priceUsedAtStake: s.priceUsedAtStake.toString(),
    }));

    return res.json({
      stakes,
      pending: result[1].toString(),
    });
  } catch (e: any) {
    console.error("getUserStakes error:", e.message);
    return res.status(500).json({ error: "Failed to fetch stakes", detail: e.message });
  }
});

export default router;
