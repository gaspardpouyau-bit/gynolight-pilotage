
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Pause, RotateCcw, Activity } from 'lucide-react';
import { TreatmentType } from '../types';

const TreatmentControl: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [intensity, setIntensity] = useState(3);

  const treatmentNames: Record<string, string> = {
    [TreatmentType.CONFORT_INTIME]: 'Confort Intime',
    [TreatmentType.HYDRATATION]: 'Hydratation',
    [TreatmentType.CONFORT_URINAIRE]: 'Confort Urinaire',
  };

  useEffect(() => {
    // Fixed: Use ReturnType<typeof setInterval> instead of NodeJS.Timeout to avoid namespace errors in browser environments
    let interval: ReturnType<typeof setInterval> | undefined;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((600 - timeLeft) / 600) * 100;

  return (
    <div className="flex-1 flex flex-col h-full bg-white">
      {/* Header */}
      <div className="px-6 pt-12 pb-6 flex items-center justify-between">
        <button onClick={() => navigate('/')} className="p-2 hover:bg-pink-50 rounded-full">
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button>
        <h1 className="text-xl font-bold text-gray-800">{treatmentNames[type || ''] || 'Traitement'}</h1>
        <div className="w-10" />
      </div>

      <div className="flex-1 flex flex-col items-center px-8 pt-12">
        {/* Progress Circle */}
        <div className="relative w-64 h-64 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="128"
              cy="128"
              r="110"
              stroke="currentColor"
              strokeWidth="12"
              fill="transparent"
              className="text-pink-50"
            />
            <circle
              cx="128"
              cy="128"
              r="110"
              stroke="currentColor"
              strokeWidth="12"
              fill="transparent"
              strokeDasharray={2 * Math.PI * 110}
              strokeDashoffset={2 * Math.PI * 110 * (1 - progress / 100)}
              strokeLinecap="round"
              className="text-pink-500 transition-all duration-500 ease-linear"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-gray-800">{formatTime(timeLeft)}</span>
            <span className="text-sm text-gray-400 mt-1 uppercase tracking-widest">Restant</span>
          </div>
        </div>

        {/* Intensity Control */}
        <div className="w-full mt-16 space-y-4">
          <div className="flex justify-between items-center px-2">
            <span className="text-sm font-semibold text-gray-500">Intensité</span>
            <span className="text-sm font-bold text-pink-600">Niveau {intensity}</span>
          </div>
          <input
            type="range"
            min="1"
            max="5"
            step="1"
            value={intensity}
            onChange={(e) => setIntensity(parseInt(e.target.value))}
            className="w-full h-2 bg-pink-100 rounded-lg appearance-none cursor-pointer accent-pink-500"
          />
          <div className="flex justify-between px-1 text-[10px] text-gray-400 font-bold">
            <span>DOUX</span>
            <span>MODÉRÉ</span>
            <span>INTENSE</span>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-16 flex items-center gap-8">
          <button
            onClick={() => setTimeLeft(600)}
            className="p-4 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
          >
            <RotateCcw className="w-6 h-6" />
          </button>
          
          <button
            onClick={() => setIsActive(!isActive)}
            className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-95 ${
              isActive ? 'bg-gray-800 text-white' : 'bg-pink-500 text-white shadow-pink-200'
            }`}
          >
            {isActive ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 ml-1 fill-current" />}
          </button>

          <button
            className="p-4 rounded-full bg-pink-50 text-pink-500 hover:bg-pink-100 transition-colors"
          >
            <Activity className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="p-8 text-center text-xs text-gray-400">
        Assurez-vous que l'appareil est correctement positionné avant de lancer le traitement.
      </div>
    </div>
  );
};

export default TreatmentControl;
