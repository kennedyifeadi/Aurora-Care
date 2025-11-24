import React, { useEffect, useMemo, useState } from 'react';

const readUser = () => {
  if (typeof window === 'undefined') return {} as any;
  const raw = localStorage.getItem('userData');
  return raw ? JSON.parse(raw) : {};
};

const StatCard = ({ title, value }: { title: string; value: string | number }) => (
  <div className="min-w-[140px] flex-shrink-0 bg-white rounded-lg p-3 shadow">
    <div className="text-xs text-gray-500">{title}</div>
    <div className="text-lg font-bold mt-2">{value}</div>
  </div>
);

export const QuickStats: React.FC = () => {
  const [u, setU] = useState(() => readUser());

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

  // derive latest measurements from stored childMeasurements array if present
  const latest = useMemo(() => {
    const measurements = (u.childMeasurements || []).slice().sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const latestItem = measurements[0] || {};
    const weight = latestItem.weight || u.latestWeight || (u.childProfile && u.childProfile.weight) || '—';
    const height = latestItem.height || u.latestHeight || (u.childProfile && u.childProfile.height) || '—';
    const head = latestItem.headCircumference || u.headCircumference || '—';
    // BMI: weight (kg) / (height (m))^2
    let bmi = '—';
    const w = Number(weight);
    const h = Number(height);
    if (w && h) {
      const heightM = h / 100;
      bmi = (w / (heightM * heightM)).toFixed(1);
    }
    return { weight, height, head, bmi };
  }, [u]);

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex gap-3 py-2">
        <StatCard title="Latest Weight" value={latest.weight || '—'} />
        <StatCard title="Latest Height" value={latest.height || '—'} />
        <StatCard title="Head Circumference" value={latest.head || '—'} />
        <StatCard title="BMI" value={latest.bmi || '—'} />
      </div>
    </div>
  );
};

export default QuickStats;
