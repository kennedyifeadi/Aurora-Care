
const sample = [
  { id: '1', name: 'First Vaccination', status: 'Pending' },
  { id: '2', name: '6-week Growth Check', status: 'Pending' },
  { id: '3', name: 'First Tooth', status: 'Achieved' },
];

export const Milestones: React.FC = () => {
  return (
    <div className="bg-white rounded-xl p-4 shadow">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">Milestones</h3>
      </div>
      <div className="space-y-2">
        {sample.map(m => (
          <div key={m.id} className="flex items-center justify-between p-2 rounded-md bg-gray-50">
            <div>
              <div className="font-medium">{m.name}</div>
              <div className="text-xs text-gray-500">Due: TBD</div>
            </div>
            <div className="flex items-center gap-2">
              <div className={`text-xs px-2 py-1 rounded-full ${m.status === 'Achieved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{m.status}</div>
              <button className="px-2 py-1 border rounded">✓</button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 text-right">
        <button onClick={() => window.dispatchEvent(new CustomEvent('openMilestones'))} className="text-sm text-[#8d4ed6]">View All Milestones</button>
      </div>
    </div>
  );
};

export default Milestones;
