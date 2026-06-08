import { ethers } from 'ethers';
import {
  ROUTER_ABI,
  ERC20_ABI,
  FACTORY_ABI,
  IPancakeSwapRouter,
  ICustomERC20,
  IPancakeSwapFactory,
} from '../contracts/interfaces';

export class SwapService {
  private router: IPancakeSwapRouter;
  private factory: IPancakeSwapFactory;
  private provider: ethers.providers.Web3Provider;

  constructor(
    routerAddress: string,
    factoryAddress: string,
    provider: ethers.providers.Web3Provider
  ) {
    this.provider = provider;
    this.router = new ethers.Contract(
      routerAddress,
      ROUTER_ABI,
      provider.getSigner()
    ) as unknown as IPancakeSwapRouter;
    
    this.factory = new ethers.Contract(
      factoryAddress,
      FACTORY_ABI,
      provider.getSigner()
    ) as unknown as IPancakeSwapFactory;
  }

  async getAmountOut(
    amountIn: string,
    tokenIn: string,
    tokenOut: string
  ): Promise<string> {
    try {
      const path = [tokenIn, tokenOut];
      const amounts = await this.router.getAmountsOut(
        ethers.utils.parseEther(amountIn),
        path
      );
      return ethers.utils.formatEther(amounts[1]);
    } catch (error) {
      console.error('Error getting amount out:', error);
      throw error;
    }
  }

  async swapWithReferral(
    amountIn: string,
    tokenIn: string,
    tokenOut: string,
    referralCode?: string
  ): Promise<string> {
    try {
      // 1. Approve router to spend tokens
      const tokenContract = new ethers.Contract(
        tokenIn,
        ERC20_ABI,
        this.provider.getSigner()
      ) as unknown as ICustomERC20;

      const amountInWei = ethers.utils.parseEther(amountIn);
      await tokenContract.approve(this.router.address, amountInWei);

      // 2. Calculate minimum amount out (with 0.5% slippage)
      const path = [tokenIn, tokenOut];
      const amounts = await this.router.getAmountsOut(amountInWei, path);
      const amountOutMin = amounts[1].mul(995).div(1000); // 0.5% slippage

      // 3. Set deadline to 20 minutes from now
      const deadline = Math.floor(Date.now() / 1000) + 1200;

      // 4. Get signer address
      const signerAddress = await this.provider.getSigner().getAddress();

      // 5. Execute swap
      const tx = await this.router.swapExactTokensForTokens(
        amountInWei,
        amountOutMin,
        path,
        signerAddress,
        ethers.BigNumber.from(deadline)
      );

      // 6. Wait for transaction confirmation
      const receipt = await tx.wait();

      // 7. If referral code exists, process referral
      if (referralCode) {
        // TODO: Implement referral processing based on your contract's specific requirements
      }

      return receipt.transactionHash;
    } catch (error) {
      console.error('Error executing swap:', error);
      throw error;
    }
  }

  async checkAllowance(
    tokenAddress: string,
    ownerAddress: string
  ): Promise<string> {
    const tokenContract = new ethers.Contract(
      tokenAddress,
      ERC20_ABI,
      this.provider
    ) as unknown as ICustomERC20;

    const allowance = await tokenContract.allowance(
      ownerAddress,
      this.router.address
    );
    return ethers.utils.formatEther(allowance);
  }

  async getBalance(
    tokenAddress: string,
    ownerAddress: string
  ): Promise<string> {
    const tokenContract = new ethers.Contract(
      tokenAddress,
      ERC20_ABI,
      this.provider
    ) as unknown as ICustomERC20;

    const balance = await tokenContract.balanceOf(ownerAddress);
    return ethers.utils.formatEther(balance);
  }
}
