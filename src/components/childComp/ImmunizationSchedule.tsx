
const sample = [
  { id: 1, name: 'BCG', date: '2025-09-10', status: 'Done' },
  { id: 2, name: 'HepB', date: '2025-10-01', status: 'Upcoming' },
  { id: 3, name: 'Polio', date: '2025-11-15', status: 'Upcoming' },
];

export const ImmunizationSchedule: React.FC = () => {
  return (
    <div className="bg-white rounded-xl p-4 shadow">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">Immunization Schedule</h3>
      </div>
      <div className="flex gap-3 overflow-x-auto py-2">
        {sample.map(v => (
          <div key={v.id} className="min-w-[180px] bg-white rounded p-3 shadow">
            <div className="font-medium">{v.name}</div>
            <div className="text-sm text-gray-500">Due: {v.date}</div>
            <div className={`mt-2 inline-block px-2 py-1 rounded-full text-xs ${v.status === 'Done' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{v.status}</div>
          </div>
        ))}
      </div>
      <div className="mt-3 text-right">
        <button onClick={() => window.dispatchEvent(new CustomEvent('openImmunization'))} className="text-sm text-[#8d4ed6]">Open Full Immunization Record</button>
      </div>
    </div>
  );
};

export default ImmunizationSchedule;
