import { ethers } from 'ethers';
import { ADDRESSES } from '../constants/addresses';

export async function calculatePaymentDetails(amount: number) {
  // Convert POL amount to Wei (MATIC has 18 decimals)
  const amountInWei = ethers.utils.parseEther(amount.toString());
  
  return {
    value: amountInWei,
    // Add some buffer for gas
    estimatedGas: ethers.BigNumber.from('300000'),
  };
}

export function formatPolygonAmount(amount: number): string {
  return `${amount} MATIC`;
}
