import React, { useState, useEffect } from 'react';
import { BiTargetLock } from "react-icons/bi";


interface CervicalDilationDisplayProps {
  initialDilation?: number;
}

export const CervicalDilationDisplay: React.FC<CervicalDilationDisplayProps> = ({ 
  initialDilation = 4.2
}) => {
  const [currentDilation, setCurrentDilation] = useState(initialDilation);

  // Determine labor stage based on dilation
  const getStage = (dilation: number) => {
    if (dilation >= 10) return 'Complete';
    if (dilation >= 7) return 'Transition';
    if (dilation >= 4) return 'Active';
    return 'Latent';
  };

  const getStageText = (stage: string) => {
    switch (stage) {
      case 'Complete': return 'Stage: Complete Labor';
      case 'Transition': return 'Stage: Transition Labor';
      case 'Active': return 'Stage: Active Labor';
      default: return 'Stage: Latent Labor';
    }
  };

  const getStatusColor = () => {
    const stage = getStage(currentDilation);
    switch (stage) {
      case 'Complete': return 'text-green-600 bg-green-50';
      case 'Transition': return 'text-red-500 bg-red-50';
      case 'Active': return 'text-orange-500 bg-orange-50';
      default: return 'text-purple-600 bg-purple-50';
    }
  };

  const getProgressBarColor = () => {
    const stage = getStage(currentDilation);
    switch (stage) {
      case 'Complete': return 'bg-green-500';
      case 'Transition': return 'bg-red-500';
      case 'Active': return 'bg-orange-500';
      default: return 'bg-purple-500';
    }
  };

  // Simulate dilation progression (optional for demo)
  useEffect(() => {
    const interval = setInterval(() => {
      // Very small variations - dilation changes slowly in real life
      const variation = (Math.random() - 0.4) * 0.3; // Slight bias toward progression
      setCurrentDilation(prev => {
        const newDilation = prev + variation;
        return Math.max(0, Math.min(10, Math.round(newDilation * 10) / 10)); // Keep to 1 decimal place
      });
    }, 8000); // Longer interval since dilation changes slowly

    return () => clearInterval(interval);
  }, []);

  const currentStage = getStage(currentDilation);
  const progressPercentage = (currentDilation / 10) * 100;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg max-w-sm w-[350px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <BiTargetLock className="w-5 h-5 text-purple-500" />
          <span className="text-gray-600 font-medium">Cervical Dilation</span>
        </div>
        <span className={`text-sm font-medium px-3 py-1 rounded-full  ${getStatusColor()}`}>
          {currentStage}
        </span>
      </div>

      {/* Dilation Value */}
      <div className="mb-6">
        <span className="text-4xl font-bold text-gray-900">
          {currentDilation.toFixed(1)} cm
        </span>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-1500 ease-out ${getProgressBarColor()}`}
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Progress Labels */}
      <div className="flex justify-between text-xs text-gray-500 mb-4">
        <span>0cm (Latent)</span>
        <span>10cm (Complete)</span>
      </div>

      {/* Stage Display */}
      <div className={`text-sm font-medium ${getStatusColor()}`} style={{backgroundColor: "transparent"}}>
        {getStageText(currentStage)}
      </div>
    </div>
  );
};
