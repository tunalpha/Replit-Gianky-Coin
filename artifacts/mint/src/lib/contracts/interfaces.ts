import { ethers } from 'ethers';

export interface IPancakeSwapRouter {
  address: string;

  getAmountsOut(
    amountIn: ethers.BigNumber,
    path: string[]
  ): Promise<ethers.BigNumber[]>;

  swapExactTokensForTokens(
    amountIn: ethers.BigNumber,
    amountOutMin: ethers.BigNumber,
    path: string[],
    to: string,
    deadline: ethers.BigNumber
  ): Promise<ethers.ContractTransaction>;
}

export interface ICustomERC20 {
  transferFrom(
    recipient: string,
    amount: ethers.BigNumber
  ): Promise<boolean>;

  balanceOf(account: string): Promise<ethers.BigNumber>;

  approve(
    spender: string,
    amount: ethers.BigNumber
  ): Promise<boolean>;

  allowance(
    owner: string,
    spender: string
  ): Promise<ethers.BigNumber>;
}

export interface IPancakeSwapFactory {
  getPair(tokenA: string, tokenB: string): Promise<string>;
}

// Contract ABI fragments
export const ROUTER_ABI = [
  'function getAmountsOut(uint256 amountIn, address[] memory path) external view returns (uint256[] memory amounts)',
  'function swapExactTokensForTokens(uint256 amountIn, uint256 amountOutMin, address[] calldata path, address to, uint256 deadline) external returns (uint256[] memory amounts)',
];

export const ERC20_ABI = [
  'function transferFrom(address recipient, uint256 amount) external returns (bool)',
  'function balanceOf(address account) external view returns (uint256)',
  'function approve(address spender, uint256 amount) external returns (bool)',
];

export const FACTORY_ABI = [
  'function getPair(address tokenA, address tokenB) external view returns (address pair)',
];
