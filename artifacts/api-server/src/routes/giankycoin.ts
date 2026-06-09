import { Router } from "express";

const router = Router();

const cache: Record<string, { data: unknown; expires: Date | null }> = {
  pol_price: { data: null, expires: null },
  markets: { data: null, expires: null },
};

const CACHE_DURATION_MS = 10 * 60 * 1000;
const FALLBACK_DURATION_MS = 60 * 60 * 1000;
const DEFAULT_POL_PRICE = { eur: 0.09, usd: 0.11 };

router.get("/pol-price", async (req, res) => {
  const now = new Date();

  if (cache.pol_price.data && cache.pol_price.expires && cache.pol_price.expires > now) {
    return res.json(cache.pol_price.data);
  }

  let eurPrice: number | null = null;
  let usdPrice: number | null = null;

  try {
    const resp = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=polygon-ecosystem-token&vs_currencies=eur,usd",
      { signal: AbortSignal.timeout(10000) }
    );
    if (resp.ok) {
      const data = await resp.json() as Record<string, Record<string, number>>;
      eurPrice = data["polygon-ecosystem-token"]?.eur ?? null;
      usdPrice = data["polygon-ecosystem-token"]?.usd ?? null;
    }
  } catch (_) {}

  if (!eurPrice || !usdPrice) {
    try {
      const resp = await fetch(
        "https://api.coinpaprika.com/v1/tickers/pol-polygon-ecosystem-token?quotes=USD,EUR",
        { signal: AbortSignal.timeout(10000) }
      );
      if (resp.ok) {
        const data = await resp.json() as Record<string, Record<string, Record<string, number>>>;
        eurPrice = data.quotes?.EUR?.price ?? null;
        usdPrice = data.quotes?.USD?.price ?? null;
      }
    } catch (_) {}
  }

  if (eurPrice && usdPrice) {
    const result = { eur: eurPrice, usd: usdPrice, timestamp: now.toISOString() };
    cache.pol_price.data = result;
    cache.pol_price.expires = new Date(now.getTime() + CACHE_DURATION_MS);
    return res.json(result);
  }

  if (cache.pol_price.data) return res.json(cache.pol_price.data);
  return res.json({ ...DEFAULT_POL_PRICE, timestamp: now.toISOString() });
});

router.get("/markets", async (req, res) => {
  const now = new Date();

  if (cache.markets.data && cache.markets.expires && cache.markets.expires > now) {
    return res.json(cache.markets.data);
  }

  let topCryptos: unknown[] = [];
  let polData: unknown = null;

  try {
    const resp = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=polygon-ecosystem-token,bitcoin,ethereum,binancecoin,ripple,solana,cardano,dogecoin,tron,avalanche-2,polkadot&order=market_cap_desc&per_page=11&page=1&sparkline=false&price_change_percentage=24h",
      { signal: AbortSignal.timeout(15000) }
    );
    if (resp.ok) {
      const data = await resp.json() as Array<Record<string, unknown>>;
      const polPriceResp = await fetch("http://localhost:" + (process.env.PORT || 5000) + "/api/pol-price").then(r => r.json()).catch(() => DEFAULT_POL_PRICE) as { eur: number; usd: number };
      const eurUsdRate = polPriceResp.eur / polPriceResp.usd;
      for (const coin of data) {
        const usdPrice = coin.current_price as number;
        const entry = {
          id: coin.id,
          symbol: (coin.symbol as string)?.toUpperCase(),
          name: coin.name,
          current_price_usd: usdPrice,
          current_price_eur: usdPrice ? usdPrice * eurUsdRate : null,
          price_change_24h: coin.price_change_24h,
          price_change_percentage_24h: coin.price_change_percentage_24h,
          market_cap: coin.market_cap,
          image: coin.image,
        };
        if (coin.id === "polygon-ecosystem-token") polData = entry;
        else topCryptos.push(entry);
      }
    }
  } catch (_) {}

  if (!topCryptos.length) {
    try {
      const resp = await fetch("https://api.coinpaprika.com/v1/tickers?quotes=USD", {
        signal: AbortSignal.timeout(15000),
      });
      if (resp.ok) {
        const data = await resp.json() as Array<Record<string, unknown>>;
        const idMap: Record<string, string> = {
          "btc-bitcoin": "bitcoin", "eth-ethereum": "ethereum", "xrp-xrp": "ripple",
          "bnb-binance-coin": "binancecoin", "sol-solana": "solana", "ada-cardano": "cardano",
          "doge-dogecoin": "dogecoin", "trx-tron": "tron", "avax-avalanche": "avalanche-2",
          "dot-polkadot": "polkadot", "pol-polygon-ecosystem-token": "polygon-ecosystem-token",
        };
        const polPriceResp = await fetch("http://localhost:" + (process.env.PORT || 5000) + "/api/pol-price").then(r => r.json()).catch(() => DEFAULT_POL_PRICE) as { eur: number; usd: number };
        const eurUsdRate = polPriceResp.eur / polPriceResp.usd;
        for (const coin of data) {
          const coinId = coin.id as string;
          if (idMap[coinId]) {
            const quotes = (coin.quotes as Record<string, Record<string, number>>)?.USD || {};
            const usdPrice = quotes.price;
            const entry = {
              id: idMap[coinId],
              symbol: (coin.symbol as string)?.toUpperCase(),
              name: coin.name,
              current_price_usd: usdPrice,
              current_price_eur: usdPrice ? usdPrice * eurUsdRate : null,
              price_change_24h: quotes.price_change_24h,
              price_change_percentage_24h: quotes.percent_change_24h,
              market_cap: quotes.market_cap,
              image: null,
            };
            if (idMap[coinId] === "polygon-ecosystem-token") polData = entry;
            else topCryptos.push(entry);
          }
        }
        topCryptos.sort((a: unknown, b: unknown) => ((b as Record<string, number>).market_cap || 0) - ((a as Record<string, number>).market_cap || 0));
      }
    } catch (_) {}
  }

  if (topCryptos.length) {
    const result = { pol: polData, top_cryptos: topCryptos.slice(0, 10), timestamp: now.toISOString() };
    cache.markets.data = result;
    cache.markets.expires = new Date(now.getTime() + CACHE_DURATION_MS);
    return res.json(result);
  }

  if (cache.markets.data) return res.json(cache.markets.data);
  return res.json({ pol: null, top_cryptos: [], timestamp: now.toISOString() });
});

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY || "demo";
const nftCache: Record<string, { data: unknown; expires: Date }> = {};

router.get("/nfts/:walletAddress", async (req, res) => {
  const { walletAddress } = req.params;
  const contractAddress = (req.query.contract_address as string) || "0x106fb804D03D4EA95CaeFA45C3215b57D8E6835D";
  const cacheKey = `${walletAddress}_${contractAddress}`.toLowerCase();
  const now = new Date();

  if (nftCache[cacheKey] && nftCache[cacheKey].expires > now) {
    return res.json({ success: true, ...(nftCache[cacheKey].data as object), cached: true });
  }

  try {
    const alchemyUrl = `https://polygon-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`;
    const receivedTokens = new Set<number>();
    const sentTokens = new Set<number>();

    const [receivedResp, sentResp] = await Promise.all([
      fetch(alchemyUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0", method: "alchemy_getAssetTransfers",
          params: [{ fromBlock: "0x0", toBlock: "latest", toAddress: walletAddress, category: ["erc721"], contractAddresses: [contractAddress], maxCount: "0x3e8" }],
          id: 1,
        }),
        signal: AbortSignal.timeout(30000),
      }),
      fetch(alchemyUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0", method: "alchemy_getAssetTransfers",
          params: [{ fromBlock: "0x0", toBlock: "latest", fromAddress: walletAddress, category: ["erc721"], contractAddresses: [contractAddress], maxCount: "0x3e8" }],
          id: 2,
        }),
        signal: AbortSignal.timeout(30000),
      }),
    ]);

    if (receivedResp.ok) {
      const data = await receivedResp.json() as Record<string, Record<string, Array<Record<string, string>>>>;
      for (const t of data?.result?.transfers || []) {
        const hex = t.erc721TokenId || t.tokenId;
        if (hex) receivedTokens.add(parseInt(hex, 16));
      }
    }
    if (sentResp.ok) {
      const data = await sentResp.json() as Record<string, Record<string, Array<Record<string, string>>>>;
      for (const t of data?.result?.transfers || []) {
        const hex = t.erc721TokenId || t.tokenId;
        if (hex) sentTokens.add(parseInt(hex, 16));
      }
    }

    const owned = [...receivedTokens].filter(id => !sentTokens.has(id));
    const nfts = owned.slice(0, 100).map(id => ({
      tokenId: String(id),
      name: `GiankyCoin #${id}`,
      imageUrl: "",
      contractAddress,
    }));

    const result = { nfts, count: nfts.length };
    nftCache[cacheKey] = { data: result, expires: new Date(now.getTime() + 5 * 60 * 1000) };
    return res.json({ success: true, ...result });
  } catch (err) {
    return res.json({ success: false, nfts: [], count: 0, error: String(err) });
  }
});

export default router;
