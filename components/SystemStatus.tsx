
import React from 'react';
import { SystemState } from '../types';

interface SystemStatusProps {
  status: SystemState;
  totalItems: number;
  accuracy: number;
  onStartCycle: () => void;
}

const SystemStatus: React.FC<SystemStatusProps> = ({ status, totalItems, accuracy, onStartCycle }) => {
  const statusConfig = {
    [SystemState.IDLE]: { text: 'Idle - Ready for next item', color: 'text-gray-400', pulse: false },
    [SystemState.PROCESSING]: { text: 'Processing Item...', color: 'text-yellow-400', pulse: true },
    [SystemState.FULL_ALERT]: { text: 'Bin Full! System Paused', color: 'text-red-500', pulse: true },
    [SystemState.ERROR]: { text: 'Error Detected', color: 'text-red-600', pulse: false },
  };

  const currentStatus = statusConfig[status];

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col sm:flex-row items-center justify-between">
      <div className="flex items-center mb-4 sm:mb-0">
         <div className={`w-4 h-4 rounded-full mr-3 ${currentStatus.pulse ? 'animate-pulse' : ''} ${currentStatus.color.replace('text-', 'bg-')}`}></div>
        <h2 className="text-xl font-bold text-white">System Status: <span className={currentStatus.color}>{currentStatus.text}</span></h2>
      </div>

      <div className="flex items-center space-x-6 text-center">
        <div>
          <p className="text-gray-400 text-sm">Total Items Sorted</p>
          <p className="text-2xl font-bold text-cyan-400">{totalItems.toLocaleString()}</p>
        </div>
         <div>
          <p className="text-gray-400 text-sm">Classification Accuracy</p>
          <p className="text-2xl font-bold text-cyan-400">{accuracy.toFixed(2)}%</p>
        </div>
      </div>
      
      <button 
        onClick={onStartCycle}
        disabled={status !== SystemState.IDLE}
        className="mt-4 sm:mt-0 px-6 py-2 bg-cyan-600 text-white font-bold rounded-lg hover:bg-cyan-500 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed disabled:text-gray-400"
      >
        Process Next
      </button>
    </div>
  );
};

export default SystemStatus;
