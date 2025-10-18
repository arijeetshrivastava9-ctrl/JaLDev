
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold text-cyan-400 tracking-wider">
          JaLDev - AI Waste Segregation Dashboard
        </h1>
        <div className="flex items-center space-x-2">
           <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
           <span className="text-sm text-gray-300">LIVE</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
