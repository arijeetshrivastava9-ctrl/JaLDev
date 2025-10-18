
import React from 'react';
import BinStatus from './BinStatus';
import SystemStatus from './SystemStatus';
import ProcessingView from './ProcessingView';
import LogPanel from './LogPanel';
import { WASTE_CATEGORIES_INFO } from '../constants';
import type { SystemState, Bin, WasteItem, SensorReadings, AIPrediction, LogEntry, WasteCategory } from '../types';

interface DashboardProps {
  systemState: SystemState;
  bins: Bin[];
  currentItem: WasteItem | null;
  sensorReadings: SensorReadings | null;
  aiPrediction: AIPrediction | null;
  finalDecision: WasteCategory | null;
  logs: LogEntry[];
  totalItems: number;
  accuracy: number;
  onStartCycle: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  systemState,
  bins,
  currentItem,
  sensorReadings,
  aiPrediction,
  finalDecision,
  logs,
  totalItems,
  accuracy,
  onStartCycle,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      
      {/* Left Column / Main View */}
      <div className="lg:col-span-2 xl:col-span-3 space-y-6">
        <SystemStatus 
          status={systemState} 
          totalItems={totalItems}
          accuracy={accuracy}
          onStartCycle={onStartCycle}
        />
        
        <ProcessingView 
          currentItem={currentItem}
          sensorReadings={sensorReadings}
          aiPrediction={aiPrediction}
          finalDecision={finalDecision}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {bins.map((bin) => (
            <BinStatus
              key={bin.category}
              categoryInfo={WASTE_CATEGORIES_INFO[bin.category]}
              level={bin.level}
            />
          ))}
        </div>
      </div>
      
      {/* Right Column / Logs */}
      <div className="lg:col-span-1 xl:col-span-1">
        <LogPanel logs={logs} />
      </div>

    </div>
  );
};

export default Dashboard;
