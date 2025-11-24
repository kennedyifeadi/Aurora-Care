
export const DoctorNotes: React.FC = () => {
  const sample = {
    lastVisit: '2025-08-15',
    doctor: 'Dr. Martinez',
    summary: 'Baby is healthy. Continue current feeding schedule.',
    next: '2025-09-12'
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow">
      <h3 className="font-semibold mb-2">Doctor Notes</h3>
      <p className="text-sm text-gray-600">Last Visit: {sample.lastVisit} — {sample.doctor}</p>
      <p className="mt-2 text-sm">{sample.summary}</p>
      <div className="mt-3 text-right">
        <button onClick={() => window.dispatchEvent(new CustomEvent('openVisits'))} className="text-sm text-[#8d4ed6]">Open Visit History</button>
      </div>
    </div>
  );
};

export default DoctorNotes;
