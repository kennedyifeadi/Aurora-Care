
const AlertCard = ({ title, desc }: { title: string; desc: string }) => (
  <div className="bg-white rounded-lg shadow p-4">
    <div className="font-semibold">{title}</div>
    <div className="text-xs text-gray-500">{desc}</div>
  </div>
);

const EmergencyProtocol: React.FC = () => {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="font-semibold mb-2">When to Trigger an Emergency</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <AlertCard title="Heavy bleeding" desc="Seek immediate care" />
          <AlertCard title="Severe headache" desc="May indicate preeclampsia" />
          <AlertCard title="Reduced fetal movement" desc="Call assigned doctor" />
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-2">Emergency Actions</h4>
        <div className="bg-white rounded-lg shadow p-3 space-y-2">
          <div className="font-medium">Call assigned doctor</div>
          <div className="font-medium">Call clinic</div>
          <div className="font-medium">Use ambulance route</div>
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-2">Automated Responses</h4>
        <div className="bg-white rounded-lg shadow p-3">
          <div className="text-sm">Auto-alert midwife if vitals cross threshold</div>
          <div className="text-sm">Auto-activate High Risk mode</div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyProtocol;
