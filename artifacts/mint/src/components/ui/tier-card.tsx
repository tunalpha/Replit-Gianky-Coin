"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Card } from './card';
import { Input } from './input';
import { Button } from './button';
import { TierType } from '@/lib/types/tiers';

interface TierCardProps {
  tier: TierType;
  showReferral: boolean;
  onMint: (amount: number, referralCode?: string) => Promise<void>;
  contractPrice?: string; // Dynamic price from contract
}

export function TierCard({ tier, showReferral, onMint, contractPrice }: TierCardProps) {
  const [referralId, setReferralId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleMint = async () => {
    try {
      setIsLoading(true);
      // Use contract price if available, otherwise fall back to tier price
      const amount = contractPrice ? parseFloat(contractPrice) : tier.price;
      await onMint(amount, showReferral ? referralId : undefined);
    } catch (error) {
      console.error('Minting error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-square">
        <Image
          src={tier.image}
          alt={tier.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4 space-y-4">
        <div className="text-center">
          <h3 className="text-xl font-bold">{tier.name}</h3>
          <p className="text-lg font-semibold">
            ({contractPrice || tier.price} MATIC)
          </p>
        </div>

        {showReferral && (
          <Input
            type="text"
            placeholder="Enter Referral ID"
            value={referralId}
            onChange={(e) => setReferralId(e.target.value)}
            className="w-full"
          />
        )}

        <Button
          onClick={handleMint}
          disabled={isLoading || (showReferral && !referralId)}
          className="w-full bg-pink-600 hover:bg-pink-700 text-white"
        >
          {isLoading ? 'Processing...' : 'Buy Now'}
        </Button>
      </div>
    </Card>
  );
}