import React, { useState, useEffect } from 'react';
import { RiHeartPulseLine } from "react-icons/ri";

interface BloodPressureDisplayProps {
  initialSystolic?: number;
  initialDiastolic?: number;
  status?: 'Normal' | 'High' | 'Low' | 'Elevated';
}

export const BloodPressureDisplay: React.FC<BloodPressureDisplayProps> = ({ 
  initialSystolic = 118, 
  initialDiastolic = 76,
  status = 'Normal' 
}) => {
  const [systolic, setSystolic] = useState(initialSystolic);
  const [diastolic, setDiastolic] = useState(initialDiastolic);

  // Simulate blood pressure changes every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      // Small random variations
      const systolicVariation = Math.round((Math.random() - 0.5) * 6);
      const diastolicVariation = Math.round((Math.random() - 0.5) * 4);
      
      setSystolic(prev => {
        const newSystolic = prev + systolicVariation;
        return Math.max(90, Math.min(160, newSystolic));
      });
      
      setDiastolic(prev => {
        const newDiastolic = prev + diastolicVariation;
        return Math.max(50, Math.min(100, newDiastolic));
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = () => {
    switch (status) {
      case 'High': return 'bg-red-50 text-red-500';
      case 'Low': return 'bg-blue-50 text-blue-500';
      default: return 'bg-green-50 text-green-500';
    }
  };

  const determineStatus = () => {
    if (systolic >= 140 || diastolic >= 90) return 'High';
    if (systolic >= 130 || diastolic >= 80) return 'Elevated';
    if (systolic < 90 || diastolic < 60) return 'Low';
    return 'Normal';
  };

  const currentStatus = determineStatus();

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg max-w-sm w-[350px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <RiHeartPulseLine className="w-5 h-5 text-blue-500" />
          <span className="text-gray-600 font-medium">Blood Pressure</span>
        </div>
        <span className={`text-sm font-medium px-3 py-1 rounded-full ${getStatusColor()}`}>
          {currentStatus}
        </span>
      </div>

      {/* Blood Pressure Values */}
      <div className="mb-2">
        <span className="text-4xl font-bold text-gray-900">
          {systolic}/{diastolic}
        </span>
      </div>

      {/* Unit */}
      <div className="mb-8">
        <span className="text-sm text-gray-500">mmHg</span>
      </div>

      {/* Systolic and Diastolic breakdown */}
      <div className="flex justify-between">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600 mb-1">
            {systolic}
          </div>
          <div className="text-xs text-gray-500">
            Systolic
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600 mb-1">
            {diastolic}
          </div>
          <div className="text-xs text-gray-500">
            Diastolic
          </div>
        </div>
      </div>
    </div>
  );
};
