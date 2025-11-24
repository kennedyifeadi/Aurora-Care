
import React from 'react';
import TopBar from '../components/childComp/TopBar';
import BabyHeader from '../components/childComp/BabyHeader';
import BabyDetails from '../components/childComp/BabyDetails';
import ModalManager from '../components/childComp/ModalManager';
import QuickStats from '../components/childComp/QuickStats';
import RealtimeVitals from '../components/childComp/RealtimeVitals';
import GrowthTracking from '../components/childComp/GrowthTracking';
import Milestones from '../components/childComp/Milestones';
import ImmunizationSchedule from '../components/childComp/ImmunizationSchedule';
import HealthLogs from '../components/childComp/HealthLogs';
import DoctorNotes from '../components/childComp/DoctorNotes';

export const Child: React.FC = () => {
  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-50">
      <div className="max-w-[1200px] mx-auto">
        <TopBar />
        <div className="mt-4">
          <BabyHeader />
        </div>

        <div className="mt-4">
          <BabyDetails />
        </div>
        <ModalManager />

        <div className="mt-4">
          <QuickStats />
        </div>

        <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <RealtimeVitals />
            <div className="mt-4">
              <GrowthTracking />
            </div>
            <div className="mt-4">
              <HealthLogs />
            </div>
          </div>
          <div className="lg:col-span-1 flex flex-col gap-4">
            <Milestones />
            <ImmunizationSchedule />
            <DoctorNotes />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Child;
