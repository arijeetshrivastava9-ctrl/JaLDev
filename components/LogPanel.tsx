
import React, { useRef, useEffect } from 'react';
import type { LogEntry } from '../types';

interface LogPanelProps {
  logs: LogEntry[];
}

const LogPanel: React.FC<LogPanelProps> = ({ logs }) => {
  const logContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const getLogColor = (type: LogEntry['type']) => {
    switch (type) {
      case 'success':
        return 'text-green-400';
      case 'warning':
        return 'text-yellow-400';
      case 'error':
        return 'text-red-400';
      case 'info':
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg h-full flex flex-col max-h-[calc(100vh-12rem)]">
      <h2 className="text-xl font-bold text-white mb-4 border-b border-gray-700 pb-2">Event Log</h2>
      <div ref={logContainerRef} className="log-panel flex-grow overflow-y-auto pr-2">
        <ul className="space-y-2 text-sm">
          {logs.map((log) => (
            <li key={log.id} className="flex items-start">
              <span className="font-mono text-cyan-400 mr-2">{log.timestamp}</span>
              <span className={`${getLogColor(log.type)}`}>{log.message}</span>
            </li>
          ))}
          {logs.length === 0 && <p className="text-gray-500">No events yet...</p>}
        </ul>
      </div>
    </div>
  );
};

export default LogPanel;
