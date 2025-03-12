
import { cn } from "@/lib/utils";
import { TabsConfig } from "@/types/dashboard";
import { motion } from "framer-motion";

interface TabNavigationProps {
  tabs: TabsConfig[];
  onTabChange: (tabId: string) => void;
  currentTab: string;
}

export const TabNavigation = ({
  tabs,
  onTabChange,
  currentTab
}: TabNavigationProps) => {
  return (
    <div className="border-b mb-6">
      <div className="flex space-x-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "relative pb-3 text-sm font-medium transition-colors",
              currentTab === tab.id
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <div className="flex items-center space-x-2">
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span 
                  className={cn(
                    "rounded-full px-2 py-0.5 text-xs font-semibold",
                    currentTab === tab.id 
                      ? "bg-highlight text-white" 
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {tab.count}
                </span>
              )}
            </div>
            
            {currentTab === tab.id && (
              <motion.div 
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-highlight" 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
