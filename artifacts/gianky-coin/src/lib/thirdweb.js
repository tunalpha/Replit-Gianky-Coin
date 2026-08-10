import { createThirdwebClient } from "thirdweb";
import { defineChain } from "thirdweb/chains";

const clientId = import.meta.env.VITE_THIRDWEB_CLIENT_ID || "232af3b32b075da4510f105786f571fe";

export const thirdwebClient = createThirdwebClient({ clientId });

// Polygon Mainnet
export const polygonChain = defineChain(137);
