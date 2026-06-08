type EthereumRequestArguments = {
  method: string;
  params?: unknown[] | object;
};

export interface EthereumProvider {
  request(args: EthereumRequestArguments): Promise<unknown>;
  on(eventName: string | symbol, listener: (...args: any[]) => void): void;
  removeListener(eventName: string | symbol, listener: (...args: any[]) => void): void;
  isMetaMask?: boolean;
  isConnected?: () => boolean;
  selectedAddress?: string;
  chainId?: string;
}