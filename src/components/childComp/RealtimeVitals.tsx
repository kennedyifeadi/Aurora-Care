import React, { useEffect, useState } from 'react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

const readUser = () => {
  if (typeof window === 'undefined') return {} as any;
  const raw = localStorage.getItem('userData');
  return raw ? JSON.parse(raw) : {};
};

const MiniCard = ({ title, value, data, alert }: any) => (
  <div className="bg-white rounded-lg p-3 shadow w-full">
    <div className="flex items-center justify-between">
      <div>
        <div className="text-xs text-gray-500">{title}</div>
        <div className="text-lg font-bold">{value}</div>
      </div>
      <div className="w-24 h-12">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data || []}>
            <Area dataKey="v" stroke="#7e22ce" fillOpacity={0.2} fill="#7e22ce" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
    <div className="mt-2 text-xs text-gray-500 flex items-center justify-between">
      <span>Updated: {new Date().toLocaleTimeString()}</span>
      <span className={`${alert === 'high' ? 'text-red-600' : alert === 'warn' ? 'text-yellow-600' : 'text-green-600'}`}>●</span>
    </div>
  </div>
);

export const RealtimeVitals: React.FC = () => {
  const [u, setU] = useState(() => readUser());
  // sample small datasets
  const [tempData] = useState(Array.from({ length: 10 }).map((_, i) => ({ v: 36 + Math.sin(i / 2) }))); 
  const [hrData] = useState(Array.from({ length: 10 }).map((_, i) => ({ v: 130 + Math.cos(i / 3) * 10 })));
  const [spo2Data] = useState(Array.from({ length: 10 }).map((_, i) => ({ v: 95 + Math.sin(i / 3) }))); 

  useEffect(() => {
    const handler = () => setU(readUser());
    window.addEventListener('userDataUpdated', handler as EventListener);
    const storageHandler = (e: StorageEvent) => {
      if (e.key === 'userData') handler();
    };
    window.addEventListener('storage', storageHandler);
    return () => {
      window.removeEventListener('userDataUpdated', handler as EventListener);
      window.removeEventListener('storage', storageHandler);
    };
  }, []);

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
      <MiniCard title="Temperature" value={`${u.temperature || '36.5'} °C`} data={tempData} alert={u.temperature > 37.5 ? 'high' : ''} />
      <MiniCard title="Heart Rate" value={`${u.heartRate || 140} BPM`} data={hrData} alert={u.heartRate > 160 ? 'high' : ''} />
      <MiniCard title="SpO₂" value={`${u.spo2 || 98} %`} data={spo2Data} alert={u.spo2 < 92 ? 'high' : ''} />
      <MiniCard title="Respiratory Rate" value={`${u.respRate || 30} rpm`} data={hrData} />
    </div>
  );
};

export default RealtimeVitals;
