
import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboardIcon, PieChartIcon, WalletIcon, SettingsIcon, PlusIcon, ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface NavItemProps {
  icon: ReactNode;
  label: string;
  href: string;
  isActive: boolean;
}

const NavItem = ({ icon, label, href, isActive }: NavItemProps) => (
  <Link to={href}>
    <div
      className={cn(
        "flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
        isActive 
          ? "bg-primary text-primary-foreground" 
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      <div className="flex-shrink-0">{icon}</div>
      <span>{label}</span>
      {isActive && (
        <motion.div 
          layoutId="nav-indicator"
          className="ml-auto h-1.5 w-1.5 rounded-full bg-primary-foreground"
        />
      )}
    </div>
  </Link>
);

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  const location = useLocation();
  
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-card border-r shadow-sm hidden md:block z-20">
        <div className="flex flex-col h-full py-4">
          {/* Logo */}
          <div className="px-4 mb-6 flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
                <span className="font-bold text-primary-foreground">FD</span>
              </div>
              <span className="ml-2 font-semibold text-xl">Finance</span>
            </div>
          </div>
          
          {/* Create New Button */}
          <div className="px-4 mb-4">
            <Button className="w-full justify-start">
              <PlusIcon className="mr-2 h-4 w-4" />
              Create New
            </Button>
          </div>
          
          {/* Navigation */}
          <div className="space-y-1 px-3">
            <NavItem
              href="/dashboard"
              icon={<LayoutDashboardIcon className="h-4 w-4" />}
              label="Dashboard"
              isActive={location.pathname === "/dashboard"}
            />
            <NavItem
              href="/analytics"
              icon={<PieChartIcon className="h-4 w-4" />}
              label="Analytics"
              isActive={location.pathname === "/analytics"}
            />
            <NavItem
              href="/wallet"
              icon={<WalletIcon className="h-4 w-4" />}
              label="Wallet"
              isActive={location.pathname === "/wallet"}
            />
          </div>
          
          <div className="mt-auto px-3 space-y-1">
            <NavItem
              href="/settings"
              icon={<SettingsIcon className="h-4 w-4" />}
              label="Settings"
              isActive={location.pathname === "/settings"}
            />
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 md:ml-64">
        {/* Header */}
        <header className="sticky top-0 z-10 h-16 bg-background/80 backdrop-blur-md border-b flex items-center px-4 md:px-6">
          <div className="flex items-center justify-between w-full">
            <h1 className="text-xl font-semibold">Finance Dashboard</h1>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                <span>Account</span>
                <ChevronDownIcon className="h-4 w-4" />
              </div>
              
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-sm">
                JD
              </div>
            </div>
          </div>
        </header>
        
        {/* Page Content */}
        <main className="min-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </div>
    </div>
  );
};
