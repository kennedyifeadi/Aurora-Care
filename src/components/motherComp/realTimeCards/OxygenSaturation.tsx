import React, { useState, useEffect } from 'react';
import { RiLungsLine } from "react-icons/ri";

interface OxygenSaturationDisplayProps {
  initialSaturation?: number;
  status?: 'Normal' | 'Low' | 'Critical';
}

export const OxygenSaturationDisplay: React.FC<OxygenSaturationDisplayProps> = ({ 
  initialSaturation = 98, 
  status = 'Normal' 
}) => {
  const [currentSaturation, setCurrentSaturation] = useState(initialSaturation);

  // Simulate oxygen saturation changes every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      // Small random variations (oxygen saturation is usually quite stable)
      const variation = (Math.random() - 0.5) * 2;
      setCurrentSaturation(prev => {
        const newSaturation = prev + variation;
        return Math.max(85, Math.min(100, Math.round(newSaturation))); // Keep within reasonable range
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = () => {
    switch (status) {
      case 'Critical': return 'bg-red-50 text-red-500';
      case 'Low': return 'bg-blue-50 text-blue-500';
      default: return 'bg-green-50 text-green-500';
    }
  };

  const determineStatus = () => {
    if (currentSaturation >= 95) return 'Normal';
    if (currentSaturation >= 90) return 'Low';
    return 'Critical';
  };

  const currentStatus = determineStatus();

  const getProgressBarColor = () => {
    if (currentSaturation >= 95) return 'bg-teal-500';
    if (currentSaturation >= 90) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg max-w-sm w-[350px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <RiLungsLine className="w-5 h-5 text-teal-500" />
          <span className="text-gray-600 font-medium">Oxygen Saturation</span>
        </div>
        <span className={`text-sm font-medium px-3 py-1 rounded-full ${getStatusColor()}`}>
          {currentStatus}
        </span>
      </div>

      {/* Oxygen Saturation Value */}
      <div className="mb-6">
        <span className="text-4xl font-bold text-gray-900">
          {currentSaturation}%
        </span>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-1000 ease-out ${getProgressBarColor()}`}
            style={{ width: `${currentSaturation}%` }}
          />
        </div>
      </div>

      {/* Alert Threshold */}
      <div className="text-xs text-gray-500">
        Alert threshold: &lt; 95%
      </div>
    </div>
  );
};