
const BabyPlan: React.FC = () => {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="font-semibold mb-2">Monitoring Goals</h4>
        <div className="bg-white rounded-lg shadow p-3 space-y-2">
          <div className="font-medium">Fetal Heart Rate target</div>
          <div className="text-xs text-gray-500">120 - 160 BPM</div>
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-2">Care Recommendations</h4>
        <div className="bg-white rounded-lg shadow p-3">
          <div className="font-medium">Recommended feeding plan after birth</div>
          <div className="text-xs text-gray-500">Initiate breastfeeding within 1 hour</div>
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-2">Baby Medications / Supplements</h4>
        <div className="bg-white rounded-lg shadow p-3">
          <div className="font-medium">Neonatal vitamins</div>
          <div className="text-xs text-gray-500">As prescribed</div>
        </div>
      </div>
    </div>
  );
};

export default BabyPlan;
