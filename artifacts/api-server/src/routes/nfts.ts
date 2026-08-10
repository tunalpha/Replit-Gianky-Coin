import { Router, type IRouter } from "express";

const router: IRouter = Router();

router.get("/nfts", async (req, res) => {
  const { owner, contract } = req.query;

  if (!owner || typeof owner !== "string") {
    return res.status(400).json({ error: "Missing owner parameter" });
  }

  const alchemyKey = process.env.ALCHEMY_KEY;
  if (!alchemyKey) {
    return res.status(503).json({ error: "Alchemy key not configured on server" });
  }

  try {
    const contractParam =
      contract && typeof contract === "string"
        ? `&contractAddresses[]=${encodeURIComponent(contract)}`
        : "";
    const url = `https://polygon-mainnet.g.alchemy.com/v2/${alchemyKey}/getNFTs/?owner=${encodeURIComponent(owner)}${contractParam}&withMetadata=false`;

    const response = await fetch(url);
    if (!response.ok) {
      return res.status(response.status).json({ error: "Alchemy API error", status: response.status });
    }

    const data = await response.json();
    return res.json(data);
  } catch (e) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
