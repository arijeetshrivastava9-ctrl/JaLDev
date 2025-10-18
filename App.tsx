
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import { WasteCategory, SystemState } from './types';
import type { Bin, WasteItem, SensorReadings, AIPrediction, LogEntry } from './types';

const App: React.FC = () => {
  const [systemState, setSystemState] = useState<SystemState>(SystemState.IDLE);
  const [bins, setBins] = useState<Bin[]>([
    { category: WasteCategory.WET, level: 10 },
    { category: WasteCategory.METALLIC, level: 45 },
    { category: WasteCategory.PLASTIC, level: 88 },
    { category: WasteCategory.DRY, level: 20 },
  ]);
  const [currentItem, setCurrentItem] = useState<WasteItem | null>(null);
  const [sensorReadings, setSensorReadings] = useState<SensorReadings | null>(null);
  const [aiPrediction, setAiPrediction] = useState<AIPrediction | null>(null);
  const [finalDecision, setFinalDecision] = useState<WasteCategory | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [totalItems, setTotalItems] = useState<number>(137);
  const [correctlyClassified, setCorrectlyClassified] = useState<number>(130);

  const logIdCounter = useRef(0);

  const addLog = useCallback((message: string, type: LogEntry['type']) => {
    setLogs(prev => [
      ...prev.slice(-99), // Keep logs to a max of 100 entries
      {
        id: logIdCounter.current++,
        timestamp: new Date().toLocaleTimeString(),
        message,
        type,
      },
    ]);
  }, []);

  const runSimulationCycle = useCallback(() => {
    if (systemState !== SystemState.IDLE) return;
    
    setSystemState(SystemState.PROCESSING);
    setCurrentItem(null);
    setSensorReadings(null);
    setAiPrediction(null);
    setFinalDecision(null);

    // 1. New Item Detected
    setTimeout(() => {
      const categories = Object.values(WasteCategory);
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      const newItem: WasteItem = {
        id: Date.now(),
        type: randomCategory,
        imageUrl: `https://picsum.photos/seed/${Date.now()}/400/300`,
      };
      setCurrentItem(newItem);
      addLog(`New item detected. Starting segregation process.`, 'info');
    }, 1000);

  }, [addLog, systemState]);

  useEffect(() => {
    if (systemState === SystemState.PROCESSING && currentItem && !sensorReadings) {
        // 2. Physical Sensor Reading
        setTimeout(() => {
            const newReadings: SensorReadings = {
                irDetected: true,
                moisture: currentItem.type === WasteCategory.WET,
                metal: currentItem.type === WasteCategory.METALLIC,
                capacitive: currentItem.type === WasteCategory.PLASTIC ? 'PLASTIC' : currentItem.type === WasteCategory.DRY ? 'DRY' : 'NONE',
            };
            setSensorReadings(newReadings);
            addLog(`Physical sensors activated.`, 'info');
        }, 1500);
    }
  }, [systemState, currentItem, sensorReadings, addLog]);

  useEffect(() => {
     if (systemState === SystemState.PROCESSING && sensorReadings && !aiPrediction) {
        // 3. AI Vision Analysis
        setTimeout(() => {
            const isAccurate = Math.random() < 0.95; // 95% accuracy
            const categories = Object.values(WasteCategory);
            const predictedCategory = isAccurate 
                ? currentItem!.type 
                : categories[Math.floor(Math.random() * categories.length)];

            const newPrediction: AIPrediction = {
                category: predictedCategory,
                confidence: Math.random() * (0.99 - 0.85) + 0.85,
            };
            setAiPrediction(newPrediction);
            addLog(`AI vision classified item as: ${predictedCategory}.`, 'info');
        }, 1500);
     }
  }, [systemState, sensorReadings, aiPrediction, addLog, currentItem]);

  useEffect(() => {
    if(systemState === SystemState.PROCESSING && aiPrediction && !finalDecision) {
        // 4. Final Decision & Sorting
        setTimeout(() => {
            let decision = aiPrediction.category!;

            // Prioritize physical sensor readings
            if (sensorReadings?.metal) {
                decision = WasteCategory.METALLIC;
                if (aiPrediction.category !== WasteCategory.METALLIC) {
                    addLog(`Metal sensor override. Correcting AI prediction.`, 'warning');
                }
            } else if (sensorReadings?.moisture) {
                decision = WasteCategory.WET;
                 if (aiPrediction.category !== WasteCategory.WET) {
                    addLog(`Moisture sensor override. Correcting AI prediction.`, 'warning');
                }
            }
            
            setFinalDecision(decision);
            setTotalItems(prev => prev + 1);
            if(decision === currentItem!.type) {
                setCorrectlyClassified(prev => prev + 1);
            }

            setBins(prevBins => prevBins.map(bin => {
                if (bin.category === decision) {
                    const newLevel = Math.min(100, bin.level + Math.floor(Math.random() * 5 + 3));
                     if (newLevel >= 90) {
                        setSystemState(SystemState.FULL_ALERT);
                        addLog(`${bin.category} bin is almost full!`, 'warning');
                     }
                    return { ...bin, level: newLevel };
                }
                return bin;
            }));
            addLog(`Final decision: ${decision}. Item sorted.`, 'success');

        }, 1500);
    }
  }, [systemState, aiPrediction, finalDecision, addLog, currentItem, sensorReadings]);

   useEffect(() => {
     if (finalDecision) {
        // 5. Reset for next cycle
        setTimeout(() => {
            if(systemState !== SystemState.FULL_ALERT) {
                setSystemState(SystemState.IDLE);
            }
            setCurrentItem(null);
            setSensorReadings(null);
            setAiPrediction(null);
            setFinalDecision(null);
        }, 2000);
     }
   }, [finalDecision, systemState]);


  useEffect(() => {
    const isAnyBinFull = bins.some(bin => bin.level >= 90);
    if(systemState !== SystemState.PROCESSING) {
        if(isAnyBinFull) {
            setSystemState(SystemState.FULL_ALERT);
        } else {
            setSystemState(SystemState.IDLE);
        }
    }
  }, [bins, systemState]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <Header />
      <main className="p-4 sm:p-6 lg:p-8">
        <Dashboard
          systemState={systemState}
          bins={bins}
          currentItem={currentItem}
          sensorReadings={sensorReadings}
          aiPrediction={aiPrediction}
          finalDecision={finalDecision}
          logs={logs}
          totalItems={totalItems}
          accuracy={(correctlyClassified / totalItems) * 100}
          onStartCycle={runSimulationCycle}
        />
      </main>
    </div>
  );
};

export default App;
