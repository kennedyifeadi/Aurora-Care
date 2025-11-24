import React, { useEffect, useState } from 'react';
import Milestones from './Milestones';
import GrowthTracking from './GrowthTracking';
import ImmunizationSchedule from './ImmunizationSchedule';
import HealthLogs from './HealthLogs';
import DoctorNotes from './DoctorNotes';

type ViewKey = 'milestones' | 'growth' | 'immunization' | 'logs' | 'visits' | null;

const ModalManager: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<ViewKey>(null);

  useEffect(() => {
    const openHandler = (e: Event & { detail?: any }) => {
      const type = (e as CustomEvent).type;
      if (type === 'openMilestones') setView('milestones');
      if (type === 'openGrowth') setView('growth');
      if (type === 'openImmunization') setView('immunization');
      if (type === 'openLogs') setView('logs');
      if (type === 'openVisits') setView('visits');
      setOpen(true);
    };

    const handlers = [
      'openMilestones',
      'openGrowth',
      'openImmunization',
      'openLogs',
      'openVisits',
    ];

    handlers.forEach((h) => window.addEventListener(h, openHandler as EventListener));

    // fallback signals (if any) - listen for simple signal names too
    const fallback = (e: Event) => {
      const name = (e as CustomEvent).type;
      if (name === 'milestonesSignal') { setView('milestones'); setOpen(true); }
      if (name === 'growthSignal') { setView('growth'); setOpen(true); }
      if (name === 'immunizationSignal') { setView('immunization'); setOpen(true); }
      if (name === 'logsSignal') { setView('logs'); setOpen(true); }
      if (name === 'visitsSignal') { setView('visits'); setOpen(true); }
    };
    ['milestonesSignal','growthSignal','immunizationSignal','logsSignal','visitsSignal'].forEach(s => window.addEventListener(s, fallback as EventListener));

    return () => {
      handlers.forEach((h) => window.removeEventListener(h, openHandler as EventListener));
      ['milestonesSignal','growthSignal','immunizationSignal','logsSignal','visitsSignal'].forEach(s => window.removeEventListener(s, fallback as EventListener));
    };
  }, []);

  const close = () => {
    setOpen(false);
    setView(null);
  };

  if (!open) return null;

  let content: React.ReactNode = null;
  switch (view) {
    case 'milestones':
      content = <Milestones />;
      break;
    case 'growth':
      content = <GrowthTracking />;
      break;
    case 'immunization':
      content = <ImmunizationSchedule />;
      break;
    case 'logs':
      content = <HealthLogs />;
      break;
    case 'visits':
      content = <DoctorNotes />;
      break;
    default:
      content = null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[85vh] overflow-auto p-4 relative">
        <button onClick={close} aria-label="Close" className="absolute top-3 right-3 px-2 py-1 rounded bg-gray-100">✕</button>
        <div className="mt-2">
          {content}
        </div>
      </div>
    </div>
  );
};

export default ModalManager;
