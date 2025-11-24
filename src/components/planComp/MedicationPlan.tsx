
const MedicationPlan: React.FC = () => {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="font-semibold mb-2">Mother's Medication Summary</h4>
        <div className="bg-white rounded-lg shadow p-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Folic Acid</div>
              <div className="text-xs text-gray-500">400mcg — daily</div>
            </div>
            <div className="text-sm">Active</div>
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-2">Baby Medication Summary</h4>
        <div className="bg-white rounded-lg shadow p-3">
          <div className="font-medium">(No baby medications prescribed)</div>
          <div className="mt-3 text-right">
            <button onClick={() => window.dispatchEvent(new CustomEvent('openAddMedication'))} className="px-3 py-1 bg-[#8d4ed6] text-white rounded">Add Medication</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicationPlan;
