"use client";

import { createThirdwebClient } from "thirdweb";

const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID;

if (!clientId) {
  console.warn('NEXT_PUBLIC_THIRDWEB_CLIENT_ID is not set');
}

export const thirdwebClient = createThirdwebClient({
  clientId: clientId || "",
});

// Polygon chain configuration
export const polygonChain = {
  id: 137,
  name: "Polygon",
  rpc: "https://polygon-bor-rpc.publicnode.com",
  nativeCurrency: {
    name: "POL",
    symbol: "POL",
    decimals: 18,
  },
  blockExplorers: [
    {
      name: "Polygonscan",
      url: "https://polygonscan.com",
    },
  ],
};
