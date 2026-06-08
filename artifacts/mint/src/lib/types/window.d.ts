interface RequestArguments {
  method: string;
  params?: unknown[] | object;
}

interface Ethereum {
  request(args: RequestArguments): Promise<unknown>;
  on(eventName: string | symbol, listener: (...args: any[]) => void): void;
  removeListener(eventName: string | symbol, listener: (...args: any[]) => void): void;
  isMetaMask?: boolean;
  isConnected?: () => boolean;
  selectedAddress?: string;
  chainId?: string;
}

declare global {
  interface Window {
    ethereum?: Ethereum;
  }
}
