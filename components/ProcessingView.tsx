import React from 'react';
import { WASTE_CATEGORIES_INFO } from '../constants';
import type { WasteItem, SensorReadings, AIPrediction, WasteCategory } from '../types';

interface ProcessingViewProps {
  currentItem: WasteItem | null;
  sensorReadings: SensorReadings | null;
  aiPrediction: AIPrediction | null;
  finalDecision: WasteCategory | null;
}

const SensorIndicator: React.FC<{ label: string; active: boolean; value?: string }> = ({ label, active, value }) => (
  <div className="flex justify-between items-center text-sm p-2 bg-gray-700/50 rounded">
    <span className="font-semibold text-gray-300">{label}:</span>
    <div className="flex items-center space-x-2">
      {value && <span className="text-cyan-300 font-mono">{value}</span>}
      <span className={`px-3 py-1 text-xs font-bold rounded-full ${active ? 'bg-green-500 text-white' : 'bg-gray-600 text-gray-300'}`}>
        {active ? 'ACTIVE' : 'INACTIVE'}
      </span>
    </div>
  </div>
);

const ProcessingView: React.FC<ProcessingViewProps> = ({ currentItem, sensorReadings, aiPrediction, finalDecision }) => {
  const finalCategoryInfo = finalDecision ? WASTE_CATEGORIES_INFO[finalDecision] : null;

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-white mb-4 border-b border-gray-700 pb-2">Live Processing Stage</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Camera Feed & AI */}
        <div className="flex flex-col space-y-4">
          <div className="bg-black rounded-md aspect-video flex items-center justify-center overflow-hidden">
            {currentItem ? (
              <img src={currentItem.imageUrl} alt="Waste item" className="w-full h-full object-cover" />
            ) : (
              <p className="text-gray-500">Awaiting Item...</p>
            )}
          </div>
          <div className="bg-gray-900 p-4 rounded-lg">
            <h3 className="font-bold text-cyan-400 mb-2">AI Vision Analysis</h3>
            {aiPrediction && aiPrediction.category ? (
               <div className="flex items-center justify-between">
                <p className="text-lg">Classification: <span className="font-bold text-white">{aiPrediction.category}</span></p>
                <p className="text-lg">Confidence: <span className="font-bold text-white">{(aiPrediction.confidence * 100).toFixed(1)}%</span></p>
               </div>
            ) : (
              <p className="text-gray-400 text-sm">Awaiting AI model prediction...</p>
            )}
          </div>
        </div>

        {/* Sensors & Decision */}
        <div className="flex flex-col space-y-4">
           <div className="bg-gray-900 p-4 rounded-lg flex-grow">
            <h3 className="font-bold text-cyan-400 mb-3">Physical Sensor Readings</h3>
            <div className="space-y-2">
                <SensorIndicator label="IR Presence" active={sensorReadings?.irDetected ?? false} />
                <SensorIndicator label="Moisture" active={sensorReadings?.moisture ?? false} />
                <SensorIndicator label="Inductive (Metal)" active={sensorReadings?.metal ?? false} />
                <SensorIndicator label="Capacitive" active={!!sensorReadings && sensorReadings.capacitive !== 'NONE'} value={sensorReadings?.capacitive} />
            </div>
           </div>
           <div className={`p-4 rounded-lg transition-all duration-300 ${finalCategoryInfo ? finalCategoryInfo.color : 'bg-gray-900'}`}>
                <h3 className="font-bold text-white mb-2">Final Sorting Decision</h3>
                {finalCategoryInfo ? (
                    <div className="flex items-center space-x-4">
                        {/* Fix: Check if icon is a valid React element before cloning. `React.cloneElement` requires a ReactElement, but `finalCategoryInfo.icon` is typed as a wider `ReactNode`. This prevents a TypeScript error. */}
                        {React.isValidElement(finalCategoryInfo.icon) ? React.cloneElement(finalCategoryInfo.icon, {className: "h-12 w-12 text-white"}) : finalCategoryInfo.icon}
                        <div>
                            <p className="text-sm text-gray-200">Sorted As:</p>
                            <p className="text-2xl font-extrabold text-white tracking-wide">{finalCategoryInfo.name}</p>
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-400 text-sm">Fusing sensor data and AI analysis...</p>
                )}
           </div>
        </div>

      </div>
    </div>
  );
};

export default ProcessingView;