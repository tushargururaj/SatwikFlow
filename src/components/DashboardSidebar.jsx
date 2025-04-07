
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import Logo from './Logo';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { 
  Home, 
  Users, 
  Leaf, 
  Sprout, 
  ClipboardList, 
  ShoppingCart, 
  History,
  User,
  LogOut,
  Building
} from 'lucide-react';

const agentNavItems = [
  { name: 'Dashboard', icon: Home, path: '/agent' },
  { name: 'Farmers', icon: Users, path: '/agent/farmers' },
  { name: 'Add Crop', icon: Leaf, path: '/agent/add-crop' },
  { name: 'Active Crops', icon: Sprout, path: '/agent/active-crops' },
  { name: 'Farmer Updates', icon: ClipboardList, path: '/agent/updates' },
];

const consumerNavItems = [
  { name: 'Home', icon: Home, path: '/consumer' },
  { name: 'My Profile', icon: User, path: '/consumer/profile' },
  { name: 'New Order', icon: ShoppingCart, path: '/consumer/new-order' },
  { name: 'My Orders', icon: History, path: '/consumer/orders' },
];

const communityHeadNavItems = [
  { name: 'Dashboard', icon: Home, path: '/community-head' },
  { name: 'Community Profile', icon: Building, path: '/community-head/profile' },
  { name: 'Place Order', icon: ShoppingCart, path: '/community-head/place-order' },
  { name: 'Order History', icon: History, path: '/community-head/orders' },
  { name: 'New Consumers', icon: Users, path: '/community-head/new-consumers' },
];

const DashboardSidebar = ({ userType, isOpen, setIsOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  
  let navItems = [];
  
  if (userType.toLowerCase() === 'agent') {
    navItems = agentNavItems;
  } else if (userType.toLowerCase() === 'consumer') {
    navItems = consumerNavItems;
  } else if (userType.toLowerCase() === 'community head') {
    navItems = communityHeadNavItems;
  }

  const handleLogout = () => {
    setIsLogoutDialogOpen(false);
    navigate('/');
  };

  return (
    <aside 
      className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transition-transform duration-300 lg:translate-x-0", 
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex flex-col h-full p-4">
        <div className="flex justify-between items-center mb-6 pt-2">
          <Logo />
          <button 
            onClick={() => setIsOpen(false)}
            className="lg:hidden text-gray-500 hover:text-gray-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="space-y-1 flex-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors",
                location.pathname === item.path
                  ? "bg-leaf-50 text-leaf-700 hover:bg-leaf-100"
                  : "text-gray-600 hover:bg-gray-100"
              )}
            >
              <item.icon size={18} />
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="pt-4 mt-auto border-t border-gray-200">
          <button
            onClick={() => setIsLogoutDialogOpen(true)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <LogOut size={18} />
            Log Out
          </button>
        </div>
      </div>

      <AlertDialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
            <AlertDialogDescription>
              You will be redirected to the login page.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout} className="bg-leaf-600 hover:bg-leaf-700">
              Log Out
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </aside>
  );
};

export default DashboardSidebar;
