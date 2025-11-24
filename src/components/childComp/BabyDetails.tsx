import React, { useEffect, useState } from 'react';

type BabyProfile = {
  name?: string;
  dob?: string;
  gender?: string;
  weight?: string;
  height?: string;
  picture?: string; // base64 data URL
};

const readUser = () => {
  if (typeof window === 'undefined') return {} as any;
  const raw = localStorage.getItem('userData');
  return raw ? JSON.parse(raw) : {};
};

const BabyDetails: React.FC = () => {
  const [profile, setProfile] = useState<BabyProfile>({});
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const u = readUser();
    setProfile(u.childProfile || {});
    const openHandler = () => {
      // console.log('BabyDetails: received openBabyEdit');
      setEditing(true);
    };
    const fallbackHandler = () => {
      // console.log('BabyDetails: received babyEditSignal fallback');
      setEditing(true);
    };
    window.addEventListener('openBabyEdit', openHandler as EventListener);
    window.addEventListener('babyEditSignal', fallbackHandler as EventListener);
    return () => {
      window.removeEventListener('openBabyEdit', openHandler as EventListener);
      window.removeEventListener('babyEditSignal', fallbackHandler as EventListener);
    };
  }, []);

  const onFile = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setProfile((p) => ({ ...p, picture: String(reader.result) }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    const raw = localStorage.getItem('userData');
    const obj = raw ? JSON.parse(raw) : {};
    obj.childProfile = { ...(obj.childProfile || {}), ...profile };
    localStorage.setItem('userData', JSON.stringify(obj));
    setEditing(false);
    // notify other components that userData changed
    try {
      window.dispatchEvent(new Event('userDataUpdated'));
    } catch {
      // noop
    }
  };

  return (
    <div>

      {/* Modal edit form triggered by TopBar */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg p-6 w-96">
            <h4 className="font-semibold mb-3">Edit Baby Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs mb-1">Name</label>
                <input value={profile.name || ''} onChange={(e) => setProfile({ ...profile, name: e.target.value })} className="w-full border px-2 py-1 rounded" />
              </div>
              <div>
                <label className="block text-xs mb-1">Date of birth</label>
                <input type="date" value={profile.dob || ''} onChange={(e) => setProfile({ ...profile, dob: e.target.value })} className="w-full border px-2 py-1 rounded" />
              </div>
              <div>
                <label className="block text-xs mb-1">Gender</label>
                <select value={profile.gender || ''} onChange={(e) => setProfile({ ...profile, gender: e.target.value })} className="w-full border px-2 py-1 rounded">
                  <option value="">Select</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs mb-1">Weight (kg)</label>
                <input type="number" value={profile.weight || ''} onChange={(e) => setProfile({ ...profile, weight: e.target.value })} className="w-full border px-2 py-1 rounded" />
              </div>
              <div>
                <label className="block text-xs mb-1">Height (cm)</label>
                <input type="number" value={profile.height || ''} onChange={(e) => setProfile({ ...profile, height: e.target.value })} className="w-full border px-2 py-1 rounded" />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs mb-1">Photo</label>
                <input type="file" accept="image/*" onChange={(e) => onFile(e.target.files ? e.target.files[0] : undefined)} className="w-full" />
                {profile.picture && <div className="mt-2 w-28 h-28 overflow-hidden rounded"><img src={profile.picture} alt="preview" className="w-full h-full object-cover" /></div>}
              </div>

              <div className="md:col-span-2 flex gap-2 mt-3">
                <button onClick={handleSave} className="flex-1 bg-[#8d4ed6] text-white py-2 rounded">Save</button>
                <button onClick={() => setEditing(false)} className="flex-1 border rounded py-2">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BabyDetails;
