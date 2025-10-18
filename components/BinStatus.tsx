
import React from 'react';
import type { CategoryInfo } from '../types';

interface BinStatusProps {
  categoryInfo: CategoryInfo;
  level: number;
}

const BinStatus: React.FC<BinStatusProps> = ({ categoryInfo, level }) => {
  const isFull = level >= 90;
  const progressBarColor = isFull ? 'bg-red-500' : categoryInfo.color.replace('bg-', 'bg-');

  return (
    <div className={`bg-gray-800 p-4 rounded-lg shadow-lg border-l-4 ${isFull ? 'border-red-500' : 'border-cyan-400'}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className={`${categoryInfo.color} p-2 rounded-full`}>
             {categoryInfo.icon}
          </div>
          <h3 className="font-bold text-white text-lg">{categoryInfo.name}</h3>
        </div>
        <span className={`text-2xl font-bold ${isFull ? 'text-red-400' : 'text-white'}`}>{level}%</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-4">
        <div
          className={`${progressBarColor} h-4 rounded-full transition-all duration-500 ease-in-out`}
          style={{ width: `${level}%` }}
        ></div>
      </div>
      {isFull && <p className="text-red-400 text-sm mt-2 font-semibold animate-pulse">Alert: Bin needs to be emptied!</p>}
    </div>
  );
};

export default BinStatus;
