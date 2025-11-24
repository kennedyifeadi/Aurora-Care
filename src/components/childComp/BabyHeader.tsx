import React, { useEffect, useState } from 'react';

const readUser = () => {
  if (typeof window === 'undefined') return {} as any;
  const raw = localStorage.getItem('userData');
  return raw ? JSON.parse(raw) : {};
};

export const BabyHeader: React.FC = () => {
  const [u, setU] = useState(() => readUser());

  useEffect(() => {
    const handler = () => setU(readUser());
    // listen for explicit event dispatched by BabyDetails/save
    window.addEventListener('userDataUpdated', handler as EventListener);
    // also respond to storage events from other tabs
    const storageHandler = (e: StorageEvent) => {
      if (e.key === 'userData') handler();
    };
    window.addEventListener('storage', storageHandler);
    return () => {
      window.removeEventListener('userDataUpdated', handler as EventListener);
      window.removeEventListener('storage', storageHandler);
    };
  }, []);

  const profile = u.childProfile || {};

  const displayName = profile.name || u.fullName || 'Baby';
  const displayPicture = profile.picture || u.profileImage;
  const displayDob = profile.dob || u.dueDate || u.dateOfBirth || 'Unknown';
  const displayGender = profile.gender || u.gender || 'Unknown';
  const displayWeight = profile.weight || u.birthWeight || '—';

  return (
    <div className="w-full bg-white rounded-xl p-4 flex items-center gap-4">
      <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
        {displayPicture ? (
          <img src={displayPicture} alt="baby" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-[#d87cdc] flex items-center justify-center">
            <span className="text-2xl font-bold text-white">{displayName[0]}</span>
          </div>
        )}
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">{displayName}</h2>
            <p className="text-sm text-gray-600">DOB: {displayDob}</p>
            <p className="text-sm text-gray-600">Gender: {displayGender}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Birth Weight: {displayWeight}</p>
            <p className="text-sm text-gray-600">Delivery: {u.deliveryPlan || '—'}</p>
            <div className="mt-2 inline-block px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">{u.status || 'Stable'}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BabyHeader;
