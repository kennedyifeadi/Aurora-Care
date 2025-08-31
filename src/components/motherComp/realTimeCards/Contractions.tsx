import React, { useState, useEffect } from 'react';
import { Activity } from 'lucide-react';

interface ContractionsDisplayProps {
  initialFrequency?: number;
  initialDuration?: number;
  initialIntensity?: number;
  status?: 'Active' | 'Mild' | 'Strong' | 'Inactive';
}

export const ContractionsDisplay: React.FC<ContractionsDisplayProps> = ({ 
  initialFrequency = 4, 
  initialDuration = 52,
  initialIntensity = 3,
  status = 'Active' 
}) => {
  const [frequency, setFrequency] = useState(initialFrequency); // minutes between contractions
  const [duration, setDuration] = useState(initialDuration); // seconds
  const [intensity, setIntensity] = useState(initialIntensity); // 1-5 scale
  const [isContracting, setIsContracting] = useState(false);

  // Simulate contraction cycle
  useEffect(() => {
    const interval = setInterval(() => {
      // Small variations in contraction patterns
      const freqVariation = (Math.random() - 0.5) * 1;
      const durVariation = Math.round((Math.random() - 0.5) * 10);
      const intensityVariation = (Math.random() - 0.5) * 0.5;

      setFrequency(prev => Math.max(2, Math.min(8, prev + freqVariation)));
      setDuration(prev => Math.max(30, Math.min(90, prev + durVariation)));
      setIntensity(prev => Math.max(1, Math.min(5, prev + intensityVariation)));

      // Simulate contraction happening
      setIsContracting(true);
      setTimeout(() => setIsContracting(false), duration * 50); // Visual feedback
    }, frequency * 1000); // Convert minutes to milliseconds for demo (sped up)

    return () => clearInterval(interval);
  }, [frequency, duration]);

  const getStatusColor = () => {
    switch (status) {
      case 'Strong': return 'text-red-500 bg-red-50';
      case 'Mild': return 'text-yellow-500 bg-yellow-50';
      case 'Inactive': return 'text-gray-500 bg-gray-50';
      default: return 'text-orange-500 bg-orange-50';
    }
  };

  const determineStatus = () => {
    if (intensity >= 4) return 'Strong';
    if (intensity >= 2.5) return 'Active';
    if (intensity >= 1.5) return 'Mild';
    return 'Inactive';
  };

  const getIntensityText = () => {
    if (intensity >= 4.5) return 'Strong';
    if (intensity >= 3.5) return 'Moderate';
    if (intensity >= 2.5) return 'Moderate';
    if (intensity >= 1.5) return 'Mild';
    return 'Light';
  };

  const currentStatus = determineStatus();

  return (
    <div className={`bg-white rounded-2xl p-6 shadow-lg max-w-sm w-[350px] transition-all duration-300 ${isContracting ? 'ring-2 ring-pink-300 bg-pink-50' : ''}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Activity className={`w-5 h-5 transition-colors duration-300 ${isContracting ? 'text-pink-600' : 'text-pink-500'}`} />
          <span className="text-gray-600 font-medium">Contractions</span>
        </div>
        <span className={`text-sm font-medium px-3 py-1 rounded-full ${getStatusColor()}`}>
          {currentStatus}
        </span>
      </div>

      {/* Frequency */}
      <div className="mb-4">
        <div className="text-sm text-gray-500 mb-1">Frequency</div>
        <div className="text-2xl font-bold text-pink-600">
          Every {frequency.toFixed(0)} min
        </div>
      </div>

      {/* Duration */}
      <div className="mb-4">
        <div className="text-sm text-gray-500 mb-1">Duration</div>
        <div className="text-lg font-semibold text-gray-700">
          {duration}-{duration + 8} sec
        </div>
      </div>

      {/* Intensity */}
      <div className="mb-2">
        <div className="text-sm text-gray-500 mb-1">Intensity</div>
        
        {/* Intensity Progress Bar - 5 Segments */}
        <div className="mb-2">
          <div className="flex gap-1">
            {Array.from({ length: 5 }, (_, index) => {
              const segmentNumber = index + 1;
              let fillPercentage = 0;
              
              if (intensity >= segmentNumber) {
                fillPercentage = 100; // Fully filled
              } else if (intensity > segmentNumber - 1) {
                fillPercentage = (intensity - (segmentNumber - 1)) * 100; // Partially filled
              }
              
              return (
                <div key={index} className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-1000 ease-out bg-pink-500"
                    style={{ width: `${fillPercentage}%` }}
                  />
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="text-lg font-semibold text-gray-700">
          {getIntensityText()} ({intensity.toFixed(1)}/5)
        </div>
      </div>
    </div>
  );
};
