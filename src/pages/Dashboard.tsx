import { useEffect, useState } from "react";
import { TabNavigation } from "@/components/dashboard/TabNavigation";
import { StatCard } from "@/components/dashboard/StatCard";
import { AssetTable } from "@/components/dashboard/AssetTable";
import { FilterChips } from "@/components/dashboard/FilterChips";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import { TabsConfig, FilterOption, AssetData } from "@/types/dashboard";
import { mockAssets, getAssetsTotalData } from "@/lib/mockData";
import { ChevronDownIcon, TrendingUpIcon, CoinsIcon, CalendarIcon } from "lucide-react";
import { motion } from "framer-motion";

const Dashboard = () => {
  // State management
  const [currentTab, setCurrentTab] = useState("deposits");
  const [filterOption, setFilterOption] = useState("all");
  const [assets, setAssets] = useState<AssetData[]>([]);
  const [summary, setSummary] = useState({
    totalDeposits: 0,
    totalDailyRewards: 0,
    totalEarned: 0,
    averageApr: 0
  });

  // Filter assets based on selected filter
  useEffect(() => {
    let filteredAssets = [...mockAssets];
    if (filterOption !== "all") {
      // In a real app, you would filter based on chain or other criteria
    }
    setAssets(filteredAssets);
    
    // Update summary data
    setSummary(getAssetsTotalData());
  }, [filterOption]);

  // Tab configuration
  const tabs: TabsConfig[] = [
    { id: "farms", label: "Farms" },
    { id: "pools", label: "Pools" },
    { id: "deposits", label: "Deposits", count: 3, active: true }
  ];

  // Filter options
  const filterOptions: FilterOption[] = [
    { id: "all", label: "All" },
    { id: "chains", label: "Chains" }
  ];

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="dashboard-container py-8">
      {/* Tab Navigation */}
      <TabNavigation 
        tabs={tabs} 
        onTabChange={setCurrentTab} 
        currentTab={currentTab}
      />
      
      {/* Summary Cards */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item}>
          <StatCard
            title="Total Deposits"
            value={formatCurrency(summary.totalDeposits)}
            valueType="currency"
            icon={<CoinsIcon className="h-5 w-5" />}
          />
        </motion.div>
        
        <motion.div variants={item}>
          <StatCard
            title="Earned"
            value={formatCurrency(summary.totalEarned)}
            valueType="currency"
            trend="up"
            trendValue="2.5% from yesterday"
          />
        </motion.div>
        
        <motion.div variants={item}>
          <StatCard
            title="Daily Rewards"
            value={formatCurrency(summary.totalDailyRewards)}
            valueType="currency"
            icon={<CalendarIcon className="h-5 w-5" />}
          />
        </motion.div>
        
        <motion.div variants={item}>
          <StatCard
            title="APR"
            icon={<TrendingUpIcon className="h-5 w-5" />}
            value={`${formatNumber(summary.averageApr, 2)}%`}
            valueType="percentage"
            subtitle="APR"
            trend="up"
            trendValue="Highest in market"
          />
        </motion.div>
      </motion.div>
      
      {/* Filters */}
      <FilterChips 
        options={filterOptions}
        selectedOption={filterOption}
        onSelect={setFilterOption}
      />
      
      {/* Assets Table */}
      <AssetTable assets={assets} />
    </div>
  );
};

export default Dashboard;
