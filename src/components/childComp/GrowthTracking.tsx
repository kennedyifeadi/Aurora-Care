import React, { useEffect, useMemo, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const readUser = () => {
  if (typeof window === 'undefined') return {} as any;
  const raw = localStorage.getItem('userData');
  return raw ? JSON.parse(raw) : {};
};

export const GrowthTracking: React.FC = () => {
  const u = readUser();
  const [measurements, setMeasurements] = useState<any[]>(() => (u.childMeasurements || []).slice());
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ date: '', weight: '', height: '', head: '' });

  useEffect(() => {
    const raw = localStorage.getItem('userData');
    const obj = raw ? JSON.parse(raw) : {};
    setMeasurements((obj.childMeasurements || []).slice());
    const handler = () => {
      const raw2 = localStorage.getItem('userData');
      const obj2 = raw2 ? JSON.parse(raw2) : {};
      setMeasurements((obj2.childMeasurements || []).slice());
    };
    window.addEventListener('userDataUpdated', handler as EventListener);
    const storageHandler = (e: StorageEvent) => { if (e.key === 'userData') handler(); };
    window.addEventListener('storage', storageHandler);
    return () => {
      window.removeEventListener('userDataUpdated', handler as EventListener);
      window.removeEventListener('storage', storageHandler);
    };
  }, []);

  const weightData = useMemo(() => measurements.map((m: any, i: number) => ({ age: `${i}m`, w: Number(m.weight) })), [measurements]);
  const heightData = useMemo(() => measurements.map((m: any, i: number) => ({ age: `${i}m`, h: Number(m.height) })), [measurements]);

  const handleAdd = () => {
    const note = { id: Date.now().toString(), date: form.date || new Date().toISOString(), weight: form.weight, height: form.height, headCircumference: form.head };
    const raw = localStorage.getItem('userData');
    const obj = raw ? JSON.parse(raw) : {};
    obj.childMeasurements = [...(obj.childMeasurements || []), note];
    localStorage.setItem('userData', JSON.stringify(obj));
    setMeasurements(obj.childMeasurements.slice());
    setShowAdd(false);
    setForm({ date: '', weight: '', height: '', head: '' });
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">Growth Tracking</h3>
        <div className="flex gap-2">
          <button onClick={() => window.dispatchEvent(new CustomEvent('openGrowth'))} className="px-3 py-1 bg-[#8d4ed6] text-white rounded-md">View Full Growth Chart</button>
          <button onClick={() => setShowAdd(true)} className="px-3 py-1 border rounded-md">Add Measurement</button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weightData}>
              <XAxis dataKey="age" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="w" stroke="#7e22ce" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={heightData}>
              <XAxis dataKey="age" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="h" stroke="#7e22ce" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Add Measurement Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg p-6 w-80 shadow">
            <h4 className="font-semibold mb-3">Add Measurement</h4>
            <label className="text-xs">Date</label>
            <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="w-full border px-2 py-1 rounded mb-2" />
            <label className="text-xs">Weight (kg)</label>
            <input type="number" value={form.weight} onChange={(e) => setForm({ ...form, weight: e.target.value })} className="w-full border px-2 py-1 rounded mb-2" />
            <label className="text-xs">Height (cm)</label>
            <input type="number" value={form.height} onChange={(e) => setForm({ ...form, height: e.target.value })} className="w-full border px-2 py-1 rounded mb-2" />
            <label className="text-xs">Head Circumference (cm)</label>
            <input type="number" value={form.head} onChange={(e) => setForm({ ...form, head: e.target.value })} className="w-full border px-2 py-1 rounded mb-3" />
            <div className="flex gap-2">
              <button onClick={handleAdd} className="flex-1 bg-[#8d4ed6] text-white py-2 rounded">Save</button>
              <button onClick={() => setShowAdd(false)} className="flex-1 border rounded py-2">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GrowthTracking;
