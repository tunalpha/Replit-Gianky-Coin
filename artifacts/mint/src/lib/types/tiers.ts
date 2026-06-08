export type TierType = {
  name: string;
  price: number;
  image: string;
};

export const TIERS: TierType[] = [
  {
    name: 'STARTER',
    price: 20,
    image: '/tiers/starter.gif'
  },
  {
    name: 'BASIC',
    price: 50,
    image: '/tiers/basic.gif'
  },
  {
    name: 'STANDARD',
    price: 100,
    image: '/tiers/standard.gif'
  },
  {
    name: 'VIP',
    price: 500,
    image: '/tiers/vip.gif'
  },
  {
    name: 'PREMIUM',
    price: 1000,
    image: '/tiers/premium.gif'
  },
  {
    name: 'DIAMOND',
    price: 5000,
    image: '/tiers/diamond.gif'
  }
];
