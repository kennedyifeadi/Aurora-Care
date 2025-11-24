
export const HealthLogs: React.FC = () => {
  return (
    <div className="bg-white rounded-xl p-4 shadow">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">Health Logs</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="p-3 bg-gray-50 rounded">
          <div className="text-xs text-gray-500">Feeding</div>
          <div className="font-medium">Last: 1 hr ago</div>
          <button className="mt-2 px-2 py-1 border rounded">Add</button>
        </div>
        <div className="p-3 bg-gray-50 rounded">
          <div className="text-xs text-gray-500">Sleep</div>
          <div className="font-medium">Last: 2 hr ago</div>
          <button className="mt-2 px-2 py-1 border rounded">Add</button>
        </div>
        <div className="p-3 bg-gray-50 rounded">
          <div className="text-xs text-gray-500">Diaper</div>
          <div className="font-medium">Last: 30 min ago</div>
          <button className="mt-2 px-2 py-1 border rounded">Add</button>
        </div>
      </div>
      <div className="mt-3 text-right">
        <button onClick={() => window.dispatchEvent(new CustomEvent('openLogs'))} className="text-sm text-[#8d4ed6]">Open Full Logs</button>
      </div>
    </div>
  );
};

export default HealthLogs;
