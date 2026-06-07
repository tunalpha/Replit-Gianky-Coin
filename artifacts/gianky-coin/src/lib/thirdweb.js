import { createThirdwebClient } from "thirdweb";

// Client ID da Thirdweb Dashboard
const clientId = import.meta.env.VITE_THIRDWEB_CLIENT_ID || "701cc72c7c405d65d9eedc7db4c742d2";

export const thirdwebClient = createThirdwebClient({
  clientId: clientId
});
