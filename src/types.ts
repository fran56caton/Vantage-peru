import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface FiberQuality {
  length: number; // mm
  strength: number; // g/tex
  micronaire: number;
}

export interface Lot {
  id: string;
  producer: string;
  plotCode: string;
  weight: number; // kg
  colorId: string;
  colorName: string;
  colorHex: string;
  fiberQuality: FiberQuality;
  waterSaved: number;
  createdAt: string;
  blockchainHash: string;
}

export const COTTON_COLORS = [
  { id: 'C01', name: 'Crema 01', hex: '#F5F5DC' },
  { id: 'M02', name: 'Marrón 02', hex: '#8B4513' },
  { id: 'V03', name: 'Verde Natural 03', hex: '#556B2F' },
  { id: 'B04', name: 'Beige 04', hex: '#D2B48C' },
  { id: 'O05', name: 'Ocre 05', hex: '#CC7722' },
];

export const WATER_SAVING_FACTOR = 29000; // Liters per kg
