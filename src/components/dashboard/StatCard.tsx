
import { StatCardProps } from "@/types/dashboard";
import { cn } from "@/lib/utils";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { formatCurrency, formatPercentage } from "@/lib/formatters";

export const StatCard = ({
  title,
  value,
  valueType = "text",
  subtitle,
  icon,
  trend,
  trendValue,
  className
}: StatCardProps) => {
  return (
    <div className={cn(
      "bg-card rounded-lg p-5 shadow-sm border animate-fade-in",
      className
    )}>
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <div className="flex items-baseline space-x-1">
            <span className="text-2xl font-semibold tracking-tight">
              {value}
            </span>
            {subtitle && (
              <span className="text-sm text-muted-foreground">{subtitle}</span>
            )}
          </div>
        </div>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </div>
      
      {trend && (
        <div className="mt-3 flex items-center">
          <span 
            className={cn(
              "flex items-center text-xs font-medium",
              trend === "up" ? "text-green-500" : 
              trend === "down" ? "text-red-500" : 
              "text-muted-foreground"
            )}
          >
            {trend === "up" ? (
              <ArrowUpIcon className="mr-1 h-3 w-3" />
            ) : trend === "down" ? (
              <ArrowDownIcon className="mr-1 h-3 w-3" />
            ) : null}
            {trendValue}
          </span>
        </div>
      )}
    </div>
  );
};
