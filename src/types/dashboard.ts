
export interface AssetData {
  id: string;
  name: string;
  icon: string;
  secondaryIcon?: string;
  deposit: number;
  dailyRewards: number;
  earned: number;
  apr: number;
  crossChainLiquidity?: {
    sourceChain: string;
    sourceChainIcon: string;
    targetChain: string;
    amount: number;
    percentage: number;
  }[];
}

export interface StatCardProps {
  title: string;
  value: string;
  valueType?: "currency" | "percentage" | "text";
  subtitle?: string | React.ReactNode;
  icon?: React.ReactNode;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  className?: string;
}

export interface TabsConfig {
  id: string;
  label: string;
  count?: number;
  active?: boolean;
}

export interface FilterOption {
  id: string;
  label: string;
}
