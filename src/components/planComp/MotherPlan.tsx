
const MonitoringRow = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="bg-white rounded-lg shadow p-3 flex items-center justify-between">
    <div>
      <div className="font-medium">{title}</div>
      {subtitle && <div className="text-xs text-gray-500">{subtitle}</div>}
    </div>
    <div>
      <button onClick={() => window.dispatchEvent(new CustomEvent('openMonitoringDetails', { detail: { title, subtitle } }))} className="px-2 py-1 text-sm border rounded">Details</button>
    </div>
  </div>
);

const MotherPlan: React.FC = () => {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="font-semibold mb-2">Monitoring Goals</h4>
        <div className="space-y-2">
          <MonitoringRow title="Weight target" subtitle="Target: 60-70 kg" />
          <MonitoringRow title="Blood pressure target" subtitle="<= 140/90" />
          <MonitoringRow title="Temperature range" subtitle="36.5 - 37.5°C" />
          <MonitoringRow title="Heart rate range" subtitle="60 - 100 BPM" />
          <MonitoringRow title="Contraction guidelines" subtitle="Call when contractions every 5 min" />
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-2">Daily Care Instructions</h4>
        <div className="bg-white rounded-lg shadow p-3 space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Hydration goals</div>
              <div className="text-xs text-gray-500">Drink 2-3 liters daily</div>
            </div>
            <button className="px-2 py-1 text-sm border rounded">Notes</button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Nutrition guidelines</div>
              <div className="text-xs text-gray-500">Balanced diet with iron-rich foods</div>
            </div>
            <button className="px-2 py-1 text-sm border rounded">Notes</button>
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-2">Medication / Supplements</h4>
        <div className="bg-white rounded-lg shadow p-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Iron Supplement</div>
              <div className="text-xs text-gray-500">30mg — daily</div>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm">Reminder</label>
              <input type="checkbox" />
            </div>
          </div>
          <div className="mt-3 text-right">
            <button className="px-3 py-1 bg-[#8d4ed6] text-white rounded">Add New Medication</button>
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-2">High-Risk Flags</h4>
        <div className="flex gap-2 flex-wrap">
          <div className="text-xs px-2 py-1 rounded bg-red-100 text-red-700">Hypertension</div>
          <div className="text-xs px-2 py-1 rounded bg-yellow-100 text-yellow-700">Gestational diabetes</div>
          <div className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-700">Previous cesarean</div>
        </div>
      </div>
    </div>
  );
};

export default MotherPlan;
