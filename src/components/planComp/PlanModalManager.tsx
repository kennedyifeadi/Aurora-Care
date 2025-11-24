import React, { useEffect, useState } from 'react';

type View =
  | { key: 'monitoring'; detail: { title: string; subtitle?: string } }
  | { key: 'medicationEditor'; detail?: any }
  | null;

const MonitoringDetails = ({ title, subtitle, onClose }: any) => (
  <div className="p-4">
    <h3 className="font-semibold mb-2">{title}</h3>
    {subtitle && <div className="text-sm text-gray-600 mb-4">{subtitle}</div>}
    <div className="text-sm text-gray-700">Detailed guidance and schedule go here.</div>
    <div className="mt-4 text-right">
      <button onClick={onClose} className="px-3 py-1 border rounded">Close</button>
    </div>
  </div>
);

const MedicationEditor = ({ onClose }: { onClose: () => void }) => {
  const [form, setForm] = useState({ name: '', dose: '', route: '', freq: '', duration: '' });

  const handleSave = () => {
    const raw = localStorage.getItem('userData');
    const obj = raw ? JSON.parse(raw) : {};
    obj.plan = obj.plan || {};
    obj.plan.medications = obj.plan.medications || [];
    obj.plan.medications.push({ id: Date.now().toString(), ...form });
    localStorage.setItem('userData', JSON.stringify(obj));
    try { window.dispatchEvent(new Event('userDataUpdated')); } catch {}
    onClose();
  };

  return (
    <div className="p-4 grid grid-cols-1 gap-3">
      <div>
        <label className="block text-xs">Drug name</label>
        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border px-2 py-1 rounded" />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-xs">Dose</label>
          <input value={form.dose} onChange={(e) => setForm({ ...form, dose: e.target.value })} className="w-full border px-2 py-1 rounded" />
        </div>
        <div>
          <label className="block text-xs">Route</label>
          <input value={form.route} onChange={(e) => setForm({ ...form, route: e.target.value })} className="w-full border px-2 py-1 rounded" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-xs">Frequency</label>
          <input value={form.freq} onChange={(e) => setForm({ ...form, freq: e.target.value })} className="w-full border px-2 py-1 rounded" />
        </div>
        <div>
          <label className="block text-xs">Duration</label>
          <input value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} className="w-full border px-2 py-1 rounded" />
        </div>
      </div>
      <div className="flex gap-2 justify-end mt-2">
        <button onClick={handleSave} className="px-3 py-1 bg-[#8d4ed6] text-white rounded">Save</button>
        <button onClick={onClose} className="px-3 py-1 border rounded">Cancel</button>
      </div>
    </div>
  );
};

const PlanModalManager: React.FC = () => {
  const [view, setView] = useState<View>(null);

  useEffect(() => {
    const monitoringHandler = (e: Event) => {
      const detail = (e as CustomEvent).detail || { title: 'Details' };
      setView({ key: 'monitoring', detail });
    };
    const medHandler = () => setView({ key: 'medicationEditor' });

    window.addEventListener('openMonitoringDetails', monitoringHandler as EventListener);
    window.addEventListener('openAddMedication', medHandler as EventListener);

    // fallbacks
    window.addEventListener('monitoringSignal', monitoringHandler as EventListener);
    window.addEventListener('addMedicationSignal', medHandler as EventListener);

    return () => {
      window.removeEventListener('openMonitoringDetails', monitoringHandler as EventListener);
      window.removeEventListener('openAddMedication', medHandler as EventListener);
      window.removeEventListener('monitoringSignal', monitoringHandler as EventListener);
      window.removeEventListener('addMedicationSignal', medHandler as EventListener);
    };
  }, []);

  if (!view) return null;

  const close = () => setView(null);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[85vh] overflow-auto">
        <div className="p-4">
          {view.key === 'monitoring' && <MonitoringDetails title={view.detail.title} subtitle={view.detail.subtitle} onClose={close} />}
          {view.key === 'medicationEditor' && <MedicationEditor onClose={close} />}
        </div>
      </div>
    </div>
  );
};

export default PlanModalManager;
