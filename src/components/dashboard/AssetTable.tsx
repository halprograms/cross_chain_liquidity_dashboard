
import { AssetData } from "@/types/dashboard";
import { formatCurrency, formatNumber, formatPercentage } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import { ChevronUpIcon, Search, ArrowUpRightIcon, ArrowDownRightIcon, BarChart3Icon, ExternalLinkIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface AssetTableProps {
  assets: AssetData[];
}

export const AssetTable = ({ assets }: AssetTableProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredAssets, setFilteredAssets] = useState(assets);

  useEffect(() => {
    const filtered = assets.filter(asset => 
      asset.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredAssets(filtered);
  }, [assets, searchQuery]);

  const renderStatusIndicator = (status: number) => {
    const width = `${status * 25}%`;
    let color = "bg-muted";
    
    if (status === 1) color = "bg-red-500";
    if (status === 2) color = "bg-green-500";
    if (status === 3) color = "bg-blue-500";
    
    return (
      <div className="status-indicator">
        <div 
          className={`status-indicator-value ${color}`}
          style={{ width }}
        />
      </div>
    );
  };

  return (
    <div className="bg-card rounded-lg border shadow-sm animate-fade-in">
      <div className="p-4 flex justify-between items-center border-b">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search assets..."
            className="pl-9 w-[280px] bg-muted/40 border-0 focus-visible:ring-1"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="h-9">
            <BarChart3Icon className="h-4 w-4 mr-2" />
            View All
          </Button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/40 font-medium text-muted-foreground">
              <th className="text-left py-3 px-4">Asset</th>
              <th className="text-left py-3 px-4">Status</th>
              <th className="text-right py-3 px-4">
                <div className="flex items-center justify-end">
                  <span>Deposit</span>
                  <ChevronUpIcon className="h-4 w-4 ml-1" />
                </div>
              </th>
              <th className="text-right py-3 px-4">Daily Rewards</th>
              <th className="text-right py-3 px-4">Earned</th>
              <th className="text-right py-3 px-4">APR</th>
              <th className="text-right py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAssets.map((asset) => (
              <tr 
                key={asset.id} 
                className="border-b hover:bg-muted/20 transition-colors"
              >
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-3">
                    <div className="relative rounded-full overflow-hidden h-8 w-8 bg-muted flex items-center justify-center">
                      <img 
                        src={asset.icon} 
                        alt={asset.name} 
                        className="h-7 w-7 object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://placehold.co/100x100?text=Asset";
                        }}
                      />
                      {asset.secondaryIcon && (
                        <div className="absolute -right-1 -bottom-1 h-5 w-5 rounded-full border-2 border-white bg-muted overflow-hidden flex items-center justify-center">
                          <img 
                            src={asset.secondaryIcon} 
                            alt=""
                            className="h-4 w-4 object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "https://placehold.co/100x100?text=Sub";
                            }}
                          />
                        </div>
                      )}
                    </div>
                    <span className="font-medium">{asset.name}</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  {renderStatusIndicator(asset.status)}
                </td>
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <span>{formatCurrency(asset.deposit)}</span>
                    <div className="flex items-center justify-center rounded-full bg-blue-500 h-6 w-6">
                      <ArrowDownRightIcon className="h-3.5 w-3.5 text-white" />
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 text-right">
                  {formatCurrency(asset.dailyRewards)}
                </td>
                <td className="py-3 px-4 text-right">
                  {formatCurrency(asset.earned)}
                </td>
                <td className="py-3 px-4 text-right">
                  <span className="text-green-500 font-medium">
                    {formatNumber(asset.apr, 2)}%
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <div className="flex justify-end space-x-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ExternalLinkIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
