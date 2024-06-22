"use client"

import { useStateContext } from '@/app/context/AppContext';
import NotFound from '@/app/notfound/page';
import React, { useState } from 'react';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const { token} = useStateContext();
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

 if(token) return (
    <div className="container mx-auto p-4">
      <h1 className="text-1xl font-bold mb-4">Hello User Dashboard</h1>
      <div className="bg-white shadow-md rounded-lg p-4">
        {/* Tabs Navigation */}
        <div className="mb-4 border-b">
          <nav className="flex space-x-4">
            {['overview', 'orders', 'products', 'account'].map((tab) => (
              <button
                key={tab}
                className={`tab-button px-4 py-2 text-gray-600 border-b-2 border-transparent hover:text-blue-500 focus:outline-none ${
                  activeTab === tab ? 'border-blue-500 text-blue-500' : ''
                }`}
                onClick={() => handleTabClick(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>
        {/* Tabs Content */}
        <div>
          {activeTab === 'overview' && (
            <div id="overview" className="tab-content block">
              <h2 className="text-xl font-semibold mb-2">Overview</h2>
              <p>Welcome to your dashboard. Here you can see an overview of your e-commerce activities.</p>
            </div>
          )}
          {activeTab === 'orders' && (
            <div id="orders" className="tab-content block">
              <h2 className="text-xl font-semibold mb-2">Orders</h2>
              <p>Here are your recent orders.</p>
            </div>
          )}
          {activeTab === 'products' && (
            <div id="products" className="tab-content block">
              <h2 className="text-xl font-semibold mb-2">Products</h2>
              <p>Manage your products here.</p>
            </div>
          )}
          {activeTab === 'account' && (
            <div id="account" className="tab-content block">
              <h2 className="text-xl font-semibold mb-2">Account</h2>
              <p>Update your account information.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
  return (
    <div>
      <NotFound />
    </div>
  );
};

export default Dashboard;
