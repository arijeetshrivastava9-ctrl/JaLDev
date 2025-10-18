
import type { ReactNode } from 'react';

export enum WasteCategory {
  WET = 'Wet/Organic',
  METALLIC = 'Metallic',
  PLASTIC = 'Plastic',
  DRY = 'Dry/Residual',
}

export enum SystemState {
  IDLE = 'IDLE',
  PROCESSING = 'PROCESSING',
  FULL_ALERT = 'BIN FULL',
  ERROR = 'ERROR',
}

export interface Bin {
  category: WasteCategory;
  level: number; // Percentage
}

export interface WasteItem {
  id: number;
  type: WasteCategory;
  imageUrl: string;
}

export interface SensorReadings {
  irDetected: boolean;
  moisture: boolean;
  metal: boolean;
  capacitive: 'PLASTIC' | 'DRY' | 'NONE';
}

export interface AIPrediction {
  category: WasteCategory | null;
  confidence: number;
}

export interface LogEntry {
  id: number;
  timestamp: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
}

export interface CategoryInfo {
  name: WasteCategory;
  color: string;
  icon: ReactNode;
}
