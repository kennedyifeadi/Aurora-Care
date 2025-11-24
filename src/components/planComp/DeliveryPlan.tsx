
const DeliveryPlan: React.FC = () => {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="font-semibold mb-2">Preferred Delivery Method</h4>
        <div className="bg-white rounded-lg shadow p-3 space-y-2">
          <div className="flex items-center gap-2"><input type="radio" name="delivery" /> <div>Vaginal Delivery</div></div>
          <div className="flex items-center gap-2"><input type="radio" name="delivery" /> <div>Cesarean</div></div>
          <div className="text-xs text-gray-500">Notes: Consider previous cesarean and maternal request.</div>
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-2">Birth Preferences</h4>
        <div className="bg-white rounded-lg shadow p-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Pain management preference</div>
              <div className="text-xs text-gray-500">Epidural preferred</div>
            </div>
            <button className="px-2 py-1 border rounded">Edit</button>
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-2">Delivery Readiness Checklist</h4>
        <div className="bg-white rounded-lg shadow p-3 space-y-2">
          <label className="flex items-center gap-2"><input type="checkbox" /> Hospital bag packed</label>
          <label className="flex items-center gap-2"><input type="checkbox" /> Blood donor available</label>
          <label className="flex items-center gap-2"><input type="checkbox" /> Transportation plan</label>
        </div>
      </div>
    </div>
  );
};

export default DeliveryPlan;
