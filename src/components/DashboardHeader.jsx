
import React from 'react';
import { Bell, Menu } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Logo from './Logo';

const DashboardHeader = ({ userType, userName, toggleSidebar }) => {
  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="lg:hidden">
          <Menu size={20} />
        </Button>
        <Logo className="hidden md:flex" />
      </div>
      
      <div className="flex items-center gap-2">
        <div className="hidden md:block">
          <span className="text-sm text-muted-foreground">Welcome, </span>
          <span className="font-medium">{userName}</span>
          <span className="mx-2 text-muted-foreground">|</span>
          <span className="text-sm bg-leaf-100 text-leaf-800 px-2 py-0.5 rounded-full">{userType}</span>
        </div>
        
        <Button variant="ghost" size="icon" className="text-gray-500">
          <Bell size={18} />
        </Button>
        
        <div className="h-8 w-8 rounded-full bg-leaf-200 text-leaf-800 flex items-center justify-center">
          {userName && userName.charAt(0).toUpperCase()}
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
