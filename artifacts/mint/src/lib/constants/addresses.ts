export const ADDRESSES = {
  NFT_CONTRACT: '0x106fb804D03D4EA95CaeFA45C3215b57D8E6835D', // New NFT contract address
  WMATIC: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270', // Wrapped MATIC on Polygon
  POL_TOKEN: '0x455E5AA18469bC6ccEF49594645666C587A3a71B', // POL token on Polygon
  GKY_TOKEN: '0x64487539aa9d61Bdc652A5755bbe30Ee96cFcEb2', // Gianky token on Polygon
  CASHBACK_CONTRACT: '0xb089992769fd155aECD82415Bb2d464B9Db2175B' // Diamond cashback contract
} as const;

// Network-specific constants
export const NETWORK_CONFIG = {
  requiredChainId: 137,
  nativeCurrency: {
    name: 'MATIC',
    symbol: 'MATIC',
    decimals: 18,
  },
  rpcUrls: ['https://polygon-rpc.com/'],
  blockExplorerUrls: ['https://polygonscan.com'],
} as const;
