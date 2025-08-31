import React, { useState } from 'react';

interface Note {
  id: string;
  author: string;
  time: string;
  message: string;
  type: 'doctor' | 'nurse';
}

interface PainAssessmentProps {
  initialPainLevel?: number;
}

export const PainAssessmentDisplay: React.FC<PainAssessmentProps> = ({ 
  initialPainLevel = 6 
}) => {
  const [painLevel, setPainLevel] = useState(initialPainLevel);
  const [notes] = useState<Note[]>([
    {
      id: '1',
      author: 'Dr. Martinez',
      time: '2:30 PM',
      message: 'Patient managing contractions well. Epidural effective.',
      type: 'doctor'
    },
    {
      id: '2',
      author: 'Nurse Kelly',
      time: '1:45 PM',
      message: 'Breathing techniques helping with pain management.',
      type: 'nurse'
    }
  ]);

  const getPainEmoji = (level: number) => {
    if (level <= 2) return '😊';
    if (level <= 4) return '😐';
    if (level <= 6) return '😟';
    if (level <= 8) return '😣';
    return '😰';
  };

  const getPainDescription = (level: number) => {
    if (level <= 2) return 'Comfortable';
    if (level <= 4) return 'Mild Discomfort';
    if (level <= 6) return 'Moderate Discomfort';
    if (level <= 8) return 'Significant Pain';
    return 'Severe Pain';
  };

  const getProgressColor = (level: number) => {
    if (level <= 3) return 'bg-green-500';
    if (level <= 5) return 'bg-yellow-500';
    if (level <= 7) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPainLevel(parseInt(event.target.value));
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg w-full">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <span className="text-2xl">{getPainEmoji(painLevel)}</span>
        <span className="text-gray-700 font-medium text-lg">Pain/Comfort Assessment</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pain Level Section */}
        <div>
          <div className="mb-4">
            <span className="text-sm text-gray-600">Current Pain Level: {painLevel}/10</span>
          </div>

          {/* Progress Bar with Slider */}
          <div className="mb-4">
            <div className="relative">
              {/* Progress Bar Background */}
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className={`h-full rounded-full transition-all duration-300 ${getProgressColor(painLevel)}`}
                  style={{ width: `${(painLevel / 10) * 100}%` }}
                />
              </div>

              {/* Slider directly on top of progress bar */}
              <input
                type="range"
                min="0"
                max="10"
                value={painLevel}
                onChange={handleSliderChange}
                className="absolute top-0 left-0 w-full h-3 appearance-none bg-transparent cursor-pointer slider-custom"
              />
            </div>

            {/* Scale labels */}
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>No Pain</span>
              <span>Severe</span>
            </div>
          </div>

          <style>{`
            .slider-custom::-webkit-slider-thumb {
              appearance: none;
              width: 20px;
              height: 20px;
              background: white;
              border: 2px solid #d1d5db;
              border-radius: 50%;
              cursor: pointer;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
              position: relative;
              z-index: 10;
            }
            .slider-custom::-webkit-slider-thumb:hover {
              border-color: #9ca3af;
              box-shadow: 0 2px 8px rgba(0,0,0,0.15);
            }
            .slider-custom::-moz-range-thumb {
              width: 20px;
              height: 20px;
              background: white;
              border: 2px solid #d1d5db;
              border-radius: 50%;
              cursor: pointer;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
              position: relative;
              z-index: 10;
            }
            .slider-custom::-webkit-slider-track {
              background: transparent;
              height: 12px;
            }
            .slider-custom::-moz-range-track {
              background: transparent;
              height: 12px;
            }
          `}</style>

          {/* Pain Description */}
          <div className="flex items-center gap-2">
            <span className="text-2xl">{getPainEmoji(painLevel)}</span>
            <span className="text-lg font-semibold text-gray-700">
              {getPainDescription(painLevel)}
            </span>
          </div>
        </div>

        {/* Recent Notes Section */}
        <div>
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Recent Notes</h3>
            <div className="space-y-3 max-h-48 overflow-y-auto">
              {notes.map((note) => (
                <div 
                  key={note.id}
                  className={`p-3 rounded-lg ${
                    note.type === 'doctor' ? 'bg-blue-50 border-l-4 border-blue-400' : 'bg-green-50 border-l-4 border-green-400'
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className={`text-sm font-medium ${
                      note.type === 'doctor' ? 'text-blue-700' : 'text-green-700'
                    }`}>
                      {note.author}
                    </span>
                    <span className="text-xs text-gray-500">{note.time}</span>
                  </div>
                  <p className="text-sm text-gray-600">{note.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
