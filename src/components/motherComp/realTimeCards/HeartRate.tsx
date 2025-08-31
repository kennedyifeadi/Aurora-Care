import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

interface HeartRateDisplayProps {
  initialRate?: number;
  status?: 'Normal' | 'High' | 'Low';
}

export const HeartRateDisplay: React.FC<HeartRateDisplayProps> = ({ 
  initialRate = 75, 
  status = 'Normal' 
}) => {
  const [currentRate, setCurrentRate] = useState(initialRate);
  const [bars, setBars] = useState<number[]>([]);

  // Generate 12 bars with heights based on current heart rate
  const generateBars = (rate: number) => {
    const baseHeight = 45; // Base height percentage
    
    return Array.from({ length: 12 }, (_, index) => {
      // Create variation based on heart rate and simulate heartbeat pattern
      const rateVariation = (rate - 70) * 0.8; // Normal resting rate as baseline
      const heartbeatPattern = Math.sin((index / 12) * Math.PI * 4) * 8; // Simulate rhythm
      const randomVariation = (Math.random() - 0.5) * 10;
      
      const height = baseHeight + rateVariation + heartbeatPattern + randomVariation;
      return Math.max(25, Math.min(70, height)); // Clamp between 25% and 70%
    });
  };

  // Update bars when heart rate changes
  useEffect(() => {
    setBars(generateBars(currentRate));
  }, [currentRate]);

  // Simulate heart rate changes every 2.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      // Small random variations around the base heart rate
      const variation = (Math.random() - 0.5) * 3;
      setCurrentRate(prev => {
        const newRate = prev + variation;
        return Math.max(50, Math.min(120, Math.round(newRate))); // Keep within reasonable range
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = () => {
    switch (status) {
      case 'High': return 'bg-red-50 text-red-500';
      case 'Low': return 'bg-blue-50 text-blue-500';
      default: return 'bg-green-50 text-green-500';
    }
  };

  const getThresholdText = () => {
    if (currentRate >= 60 && currentRate <= 100) {
      return 'Threshold: 60-100';
    } else if (currentRate > 100) {
      return 'Threshold: Above 100';
    } else {
      return 'Threshold: Below 60';
    }
  };

  const getStatusText = () => {
    if (currentRate >= 60 && currentRate <= 100) {
      return '✓ Normal';
    } else if (currentRate > 100) {
      return '⚠ High';
    } else {
      return '⚠ Low';
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg max-w-sm w-[300px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-pink-500" />
          <span className="text-gray-600 font-medium">Heart Rate</span>
        </div>
        <span className={`text-sm font-medium px-3 py-1 rounded-full ${getStatusColor()}`}>
          {status}
        </span>
      </div>

      {/* Heart Rate Value */}
      <div className="mb-6">
        <span className="text-4xl font-bold text-gray-900">
          {currentRate} bpm
        </span>
      </div>

      {/* Animated Bars */}
      <div className="flex items-end gap-2 mb-4 h-[100px]">
        {bars.map((height, index) => (
          <div
            key={index}
            className="bg-pink-400 rounded-sm transition-all duration-800 ease-in-out"
            style={{
              height: `${(height / 100) * 200}px`,
              width: '8px',
              minHeight: '24px',
            }}
          />
        ))}
      </div>

      <div className="flex justify-between text-xs text-gray-500">
        <span>{getThresholdText()}</span>
        <span className="text-green-600">{getStatusText()}</span>
      </div>
    </div>
  );
};