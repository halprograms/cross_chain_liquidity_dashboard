
import { AssetData } from "@/types/dashboard";

export const mockAssets: AssetData[] = [
  {
    id: "asset1",
    name: "CL200-WETH/dogimme",
    icon: "/lovable-uploads/c783d402-9e8b-40fb-b102-159b2931a720.png",
    secondaryIcon: "/lovable-uploads/c783d402-9e8b-40fb-b102-159b2931a720.png",
    deposit: 126.79,
    dailyRewards: 77.57,
    earned: 0.35,
    apr: 22330.32,
    status: 2
  },
  {
    id: "asset2",
    name: "CL200-WETH/SKI",
    icon: "/lovable-uploads/c783d402-9e8b-40fb-b102-159b2931a720.png",
    secondaryIcon: "/lovable-uploads/c783d402-9e8b-40fb-b102-159b2931a720.png",
    deposit: 114.68,
    dailyRewards: 96.22,
    earned: 0.37,
    apr: 30623.18,
    status: 2
  },
  {
    id: "asset3",
    name: "CL100-WETH/Anon",
    icon: "/lovable-uploads/c783d402-9e8b-40fb-b102-159b2931a720.png",
    secondaryIcon: "/lovable-uploads/c783d402-9e8b-40fb-b102-159b2931a720.png",
    deposit: 101.54,
    dailyRewards: 29.49,
    earned: 0.67,
    apr: 10602.35,
    status: 1
  },
  {
    id: "asset4",
    name: "CL200-WBTC/USDC",
    icon: "/lovable-uploads/c783d402-9e8b-40fb-b102-159b2931a720.png",
    secondaryIcon: "/lovable-uploads/c783d402-9e8b-40fb-b102-159b2931a720.png",
    deposit: 98.42,
    dailyRewards: 14.35,
    earned: 0.12,
    apr: 5362.41,
    status: 3
  },
  {
    id: "asset5",
    name: "CL300-SOL/USDT",
    icon: "/lovable-uploads/c783d402-9e8b-40fb-b102-159b2931a720.png",
    secondaryIcon: "/lovable-uploads/c783d402-9e8b-40fb-b102-159b2931a720.png",
    deposit: 84.21,
    dailyRewards: 21.86,
    earned: 0.24,
    apr: 9482.76,
    status: 2
  }
];

export const getAssetsTotalData = () => {
  const totalDeposits = mockAssets.reduce((acc, asset) => acc + asset.deposit, 0);
  const totalDailyRewards = mockAssets.reduce((acc, asset) => acc + asset.dailyRewards, 0);
  const totalEarned = mockAssets.reduce((acc, asset) => acc + asset.earned, 0);
  
  // Calculate weighted average APR
  const totalWeight = totalDeposits;
  const weightedApr = mockAssets.reduce((acc, asset) => 
    acc + (asset.apr * asset.deposit) / totalWeight, 0);
  
  return {
    totalDeposits,
    totalDailyRewards,
    totalEarned,
    averageApr: weightedApr
  };
};
