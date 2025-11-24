
const tabs = [
  { key: 'mother', label: 'Mother Plan' },
  { key: 'baby', label: 'Baby Plan' },
  { key: 'delivery', label: 'Delivery Plan' },
  { key: 'medication', label: 'Medication Plan' },
  { key: 'emergency', label: 'Emergency Protocol' },
];

const PlanTabs: React.FC<{ active: string; onChange: (k: string) => void }> = ({ active, onChange }) => {
  return (
    <div className="bg-white rounded-lg shadow p-2 flex gap-2 overflow-auto">
      {tabs.map(t => (
        <button key={t.key} onClick={() => onChange(t.key)} className={`px-3 py-2 rounded-md text-sm ${active === t.key ? 'bg-[#8d4ed6] text-white' : 'text-gray-600'}`}>
          {t.label}
        </button>
      ))}
    </div>
  );
};

export default PlanTabs;
