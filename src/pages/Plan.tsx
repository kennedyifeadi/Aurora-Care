
import React, { useState } from 'react';
import PlanTopBar from '../components/planComp/PlanTopBar';
import PlanModalManager from '../components/planComp/PlanModalManager';
import PlanHeader from '../components/planComp/PlanHeader';
import PlanTabs from '../components/planComp/PlanTabs';
import MotherPlan from '../components/planComp/MotherPlan';
import BabyPlan from '../components/planComp/BabyPlan';
import DeliveryPlan from '../components/planComp/DeliveryPlan';
import MedicationPlan from '../components/planComp/MedicationPlan';
import EmergencyProtocol from '../components/planComp/EmergencyProtocol';
import PlanEditModal from '../components/planComp/PlanEditModal';

export const Plan: React.FC = () => {
  const [active, setActive] = useState<string>('mother');
  const [showEdit, setShowEdit] = useState(false);

  // Allow passing an optional onEdit callback to PlanTopBar without using `any`
  const PlanTopBarTyped = PlanTopBar as React.ComponentType<{ onEdit?: () => void }>;

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-50 pb-24">
      <div className="max-w-[1200px] mx-auto">
        <PlanTopBarTyped onEdit={() => setShowEdit(true)} />
        <div className="mt-4">
          <PlanHeader />
        </div>
        <div className="mt-4">
          <PlanTabs active={active} onChange={setActive} />
        </div>

        <div className="mt-4">
          {active === 'mother' && <MotherPlan />}
          {active === 'baby' && <BabyPlan />}
          {active === 'delivery' && <DeliveryPlan />}
          {active === 'medication' && <MedicationPlan />}
          {active === 'emergency' && <EmergencyProtocol />}
        </div>

        <PlanEditModal open={showEdit} onClose={() => setShowEdit(false)} />
        <PlanModalManager />

        <div className="fixed bottom-4 right-0 flex justify-center pointer-events-none">
          <div className="max-w-[1200px] w-full px-4 pointer-events-auto">
            <div className="bg-white rounded-lg shadow p-3 flex justify-end">
              <button onClick={() => {
                const raw = localStorage.getItem('userData');
                const obj = raw ? JSON.parse(raw) : {};
                obj.plan = obj.plan || {};
                obj.plan.lastSaved = new Date().toLocaleString();
                localStorage.setItem('userData', JSON.stringify(obj));
                try {
                  window.dispatchEvent(new Event('userDataUpdated'));
                } catch (err) {
                  console.error('Failed to dispatch userDataUpdated event', err);
                }
                // small visual confirmation - console for now
                console.log('Plan saved', obj.plan.lastSaved);
              }} className="px-4 py-2 bg-[#8d4ed6] text-white rounded">Save Plan Changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plan;
