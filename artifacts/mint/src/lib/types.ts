export interface ReferralInfo {
  referralId: string;
  referrerAddress: string;
  commission: number;
}

export interface MintingOptions {
  useReferral: boolean;
  referralCode?: string;
  paymentMethod: 'MATIC';
}

export interface CommissionConfig {
  percentage: number;  // Commission percentage for referrers
  minAmount: number;   // Minimum amount for commission
}
