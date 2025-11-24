import React, { useEffect, useState } from 'react';

const readUser = () => {
  if (typeof window === 'undefined') return {} as any;
  const raw = localStorage.getItem('userData');
  return raw ? JSON.parse(raw) : {};
};

const PlanEditModal: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const [form, setForm] = useState<any>({});

  useEffect(() => {
    if (open) {
      const u = readUser();
      setForm(u.plan || {});
    }
  }, [open]);

  const handleSave = () => {
    const raw = localStorage.getItem('userData');
    const obj = raw ? JSON.parse(raw) : {};
    obj.plan = { ...(obj.plan || {}), ...form, lastUpdated: new Date().toLocaleString() };
    localStorage.setItem('userData', JSON.stringify(obj));
    try { window.dispatchEvent(new Event('userDataUpdated')); } catch {};
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-xl p-4">
        <h4 className="font-semibold mb-2">Edit Care Plan</h4>
        <div className="grid grid-cols-1 gap-3">
          <div>
            <label className="block text-xs">Assigned Doctor</label>
            <input value={form.assignedDoctor || ''} onChange={(e) => setForm({ ...form, assignedDoctor: e.target.value })} className="w-full border px-2 py-1 rounded" />
          </div>
          <div>
            <label className="block text-xs">Status</label>
            <select value={form.status || 'Active'} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full border px-2 py-1 rounded">
              <option>Active</option>
              <option>Draft</option>
              <option>Completed</option>
            </select>
          </div>
          <div>
            <label className="block text-xs">Risk Level</label>
            <select value={form.risk || 'Low'} onChange={(e) => setForm({ ...form, risk: e.target.value })} className="w-full border px-2 py-1 rounded">
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
          <div>
            <label className="block text-xs">Delivery Mode</label>
            <select value={form.deliveryMode || 'Undecided'} onChange={(e) => setForm({ ...form, deliveryMode: e.target.value })} className="w-full border px-2 py-1 rounded">
              <option>Undecided</option>
              <option>Vaginal</option>
              <option>Cesarean</option>
            </select>
          </div>
          <div className="flex gap-2 justify-end mt-3">
            <button onClick={handleSave} className="px-4 py-2 bg-[#8d4ed6] text-white rounded">Save</button>
            <button onClick={onClose} className="px-4 py-2 border rounded">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanEditModal;
