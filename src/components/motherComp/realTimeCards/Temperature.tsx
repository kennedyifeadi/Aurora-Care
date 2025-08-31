import React, { useState, useEffect } from 'react';
import { FaTemperatureThreeQuarters } from "react-icons/fa6";


interface TemperatureDisplayProps {
  initialTemp?: number;
  status?: 'Normal' | 'High' | 'Low';
}

export const TemperatureDisplay: React.FC<TemperatureDisplayProps> = ({ 
  initialTemp = 98.9, 
  status = 'Normal' 
}) => {
  const [currentTemp, setCurrentTemp] = useState(initialTemp);
  const [bars, setBars] = useState<number[]>([]);

  // Generate 12 bars with heights based on current temperature
  const generateBars = (temp: number) => {
    const baseHeight = 40; // Base height percentage
    
    return Array.from({ length: 12 }, (_, index) => {
      // Create slight variation based on temperature and bar position
      const tempVariation = (temp - 98.6) * 2; // Normal body temp as baseline
      const positionVariation = Math.sin((index / 12) * Math.PI * 2) * 5;
      const randomVariation = (Math.random() - 0.5) * 8;
      
      const height = baseHeight + tempVariation + positionVariation + randomVariation;
      return Math.max(20, Math.min(60, height)); // Clamp between 20% and 60%
    });
  };

  // Update bars when temperature changes
  useEffect(() => {
    setBars(generateBars(currentTemp));
  }, [currentTemp]);

  // Simulate temperature changes every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      // Small random variations around the base temperature
      const variation = (Math.random() - 0.5) * 0.4;
      setCurrentTemp(prev => {
        const newTemp = prev + variation;
        return Math.max(97.0, Math.min(100.0, newTemp)); // Keep within reasonable range
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = () => {
    switch (status) {
      case 'High': return 'bg-red-50 text-red-500';
      case 'Low': return 'bg-blue-50 text-blue-500';
      default: return 'bg-green-50 text-green-500';
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg max-w-sm w-[300px]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FaTemperatureThreeQuarters className="w-4 h-4 text-orange-500" />
          <span className="text-gray-600 font-medium">Temperature</span>
        </div>
        <span className={`text-sm font-medium px-3 py-1 rounded-full ${getStatusColor()}`}>
          {status}
        </span>
      </div>

      <div className="mb-6">
        <span className="text-4xl font-bold text-gray-900">
          {currentTemp.toFixed(1)}°F
        </span>
      </div>

      <div className="flex items-end gap-2 mb-4 h-[100px]">
        {bars.map((height, index) => (
          <div
            key={index}
            className="bg-orange-400 rounded-sm transition-all duration-1000 ease-in-out"
            style={{
              height: `${(height / 100) * 200}px`,
              width: '8px',
              minHeight: '24px',
            }}
          />
        ))}
      </div>

      <div className="flex justify-between text-xs text-gray-500">
        <span>24h trend</span>
        <span>Real-time</span>
      </div>
    </div>
  );
};

