
import React, { useState } from 'react';
import DashboardHeader from './DashboardHeader';
import DashboardSidebar from './DashboardSidebar';

const DashboardLayout = ({ children, userType, userName = 'User' }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // Create overlay for mobile view when sidebar is open
  const Overlay = () => (
    <div
      className={`fixed inset-0 z-30 bg-black bg-opacity-50 transition-opacity lg:hidden ${
        sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={() => setSidebarOpen(false)}
    />
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader 
        userType={userType} 
        userName={userName} 
        toggleSidebar={toggleSidebar} 
      />
      
      <DashboardSidebar 
        userType={userType} 
        isOpen={sidebarOpen} 
        setIsOpen={setSidebarOpen} 
      />
      
      <Overlay />
      
      <main className="lg:pl-64 pt-4">
        <div className="px-4 sm:px-6 lg:px-8 pb-6">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
