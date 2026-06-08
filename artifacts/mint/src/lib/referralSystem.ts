import { ethers } from 'ethers';
import { ReferralInfo, CommissionConfig } from './types';
import { ADDRESSES } from './constants/addresses';

// Default commission configuration - matches contract values [0, 1250, 800, 400, 200] in basis points
const DEFAULT_COMMISSION_CONFIG: CommissionConfig = {
  percentage: 12.5, // 12.5% commission (1250 basis points) - Level 1
  minAmount: 0.01, // Minimum 0.01 MATIC
};

// Contract referral percentages mapping (basis points)
const CONTRACT_REFERRAL_PERCENTAGES = [0, 1250, 800, 400, 200]; // [0%, 12.5%, 8%, 4%, 2%]

export class ReferralSystem {
  private static generateReferralId(address: string): string {
    // Generate a unique referral ID based on address and timestamp
    const timestamp = Date.now();
    const hash = ethers.utils.keccak256(
      ethers.utils.toUtf8Bytes(`${address}-${timestamp}`)
    );
    return hash.slice(2, 10); // Take first 8 characters after '0x'
  }

  // Get real-time referral percentage from contract
  private static async getReferralPercentage(level: number): Promise<number> {
    try {
      // Import contract ABI dynamically
      const ContractABI = await import('./contracts/abi.json');
      
      const provider = new ethers.providers.Web3Provider((window as any).ethereum as any);
      const contract = new ethers.Contract(ADDRESSES.NFT_CONTRACT, ContractABI.default, provider);
      
      // Call referralPercentages with the level number
      const percentage = await contract.referralPercentages(level);
      
      // Convert from basis points to percentage
      const percentageValue = parseInt(percentage.toString()) / 100;
      
      return percentageValue;
    } catch (error) {
      console.error('Error fetching referral percentage from contract:', error);
      // Fallback to hardcoded values
      return CONTRACT_REFERRAL_PERCENTAGES[level] / 100;
    }
  }

  // Get all referral percentages from contract with mobile support
  static async getAllReferralPercentages(): Promise<number[]> {
    try {
      // Import contract ABI dynamically
      const ContractABI = await import('./contracts/abi.json');
      
      const provider = new ethers.providers.Web3Provider((window as any).ethereum as any);
      const contract = new ethers.Contract(ADDRESSES.NFT_CONTRACT, ContractABI.default, provider);
      
      // Fetch all levels (0-4)
      const percentages = await Promise.all([
        contract.referralPercentages(0),
        contract.referralPercentages(1),
        contract.referralPercentages(2),
        contract.referralPercentages(3),
        contract.referralPercentages(4),
      ]);
      
      // Convert from basis points to percentages
      return percentages.map(p => parseInt(p.toString()) / 100);
    } catch (error) {
      console.error('Error fetching all referral percentages from contract:', error);
      // Fallback to hardcoded values
      return CONTRACT_REFERRAL_PERCENTAGES.map(p => p / 100);
    }
  }

  // Get referral percentage for a specific level (public method)
  static async getReferralPercentageForLevel(level: number): Promise<number> {
    return await this.getReferralPercentage(level);
  }

  static async createReferralCode(address: string): Promise<string> {
    const referralId = this.generateReferralId(address);
    // Here you would typically save this to your database
    // For now, we'll use localStorage as a simple example
    const referrals = JSON.parse(localStorage.getItem('referrals') || '{}');
    referrals[referralId] = {
      referrerAddress: address,
      createdAt: Date.now(),
      totalCommission: 0,
    };
    localStorage.setItem('referrals', JSON.stringify(referrals));
    return referralId;
  }

  static async validateReferralCode(code: string, level: number = 1): Promise<ReferralInfo | null> {
    // Here you would typically check against your database
    const referrals = JSON.parse(localStorage.getItem('referrals') || '{}');
    const referral = referrals[code];
    
    if (!referral) return null;

    // Get real-time commission percentage from contract
    const commission = await this.getReferralPercentage(level);

    return {
      referralId: code,
      referrerAddress: referral.referrerAddress,
      commission: commission,
    };
  }

  static async calculateCommission(
    amount: number,
    referralInfo: ReferralInfo
  ): Promise<number> {
    // Use the real-time commission from ReferralInfo (fetched from contract)
    const commission = (amount * referralInfo.commission) / 100;
    return Math.max(commission, DEFAULT_COMMISSION_CONFIG.minAmount);
  }

  static async processReferralCommission(
    amount: number,
    referralInfo: ReferralInfo
  ): Promise<boolean> {
    try {
      const commission = await this.calculateCommission(amount, referralInfo);
      
      // Here you would typically:
      // 1. Transfer commission to referrer
      // 2. Update commission records in database
      // 3. Emit events or notifications
      
      // For now, we'll just update our local storage
      const referrals = JSON.parse(localStorage.getItem('referrals') || '{}');
      if (referrals[referralInfo.referralId]) {
        referrals[referralInfo.referralId].totalCommission += commission;
        localStorage.setItem('referrals', JSON.stringify(referrals));
      }

      return true;
    } catch (error) {
      console.error('Failed to process commission:', error);
      return false;
    }
  }
}
