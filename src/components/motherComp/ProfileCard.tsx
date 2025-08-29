import React, { useState, useRef } from 'react';
import { Phone, Plus, Clock, Download } from 'lucide-react';

interface UserData {
  name?: string;
  age?: number;
  bloodType?: string;
  patientId?: string;
  gravida?: string;
  para?: string;
  gestationalAge?: number; // in days
  expectedDueDate?: string;
  riskLevel?: 'High-Risk' | 'Medium-Risk' | 'Low-Risk';
  deliveryPlan?: string;
  conditions?: string[];
  allergies?: string[];
  medications?: string[];
  assignedDoctor?: string;
  emergencyContact?: string;
  emergencyContactRelation?: string;
  profileImage?: string;
  notes?: Note[];
}

interface Note {
  id: string;
  content: string;
  timestamp: string;
}

export const ProfileCard: React.FC = () => {
  // Default user data with fallback values
  const [userData, setUserData] = useState<UserData>({
    name: 'ken',
    age: 29,
    bloodType: 'O+',
    patientId: 'MC-2024-0847',
    gravida: 'G3',
    para: 'P2',
    gestationalAge: 212, // 212 days = 30 weeks, 2 days
    expectedDueDate: 'May 8, 2026',
    riskLevel: 'High-Risk',
    deliveryPlan: 'Vaginal Delivery',
    conditions: ['Gestational Diabetes', 'Mild Hypertension'],
    allergies: ['Penicillin', 'Latex'],
    medications: ['Prenatal Vitamins', 'Iron Supplement', 'Folic Acid'],
    assignedDoctor: 'Dr. Sarah Chen',
    emergencyContact: 'John Johnson',
    emergencyContactRelation: 'Husband',
    profileImage: '',
    notes: []
  });

  const [showNoteModal, setShowNoteModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [newNote, setNewNote] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Convert gestational age from days to weeks and days
  const getGestationalAgeDisplay = (days: number = 0) => {
    const weeks = Math.floor(days / 7);
    const remainingDays = days % 7;
    return `${weeks} weeks, ${remainingDays} days`;
  };

  // Handle image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target?.result as string;
        setUserData(prev => ({
          ...prev,
          profileImage: imageData
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle call nurse
  const handleCallNurse = () => {
    window.location.href = 'tel:+1234567890';
  };

  // Handle add note
  const handleAddNote = () => {
    if (newNote.trim()) {
      const note: Note = {
        id: Date.now().toString(),
        content: newNote.trim(),
        timestamp: new Date().toLocaleString()
      };
      
      setUserData(prev => ({
        ...prev,
        notes: [...(prev.notes || []), note]
      }));
      
      setNewNote('');
      setShowNoteModal(false);
    }
  };

  // Export notes
  const handleExportNotes = () => {
    const notesText = userData.notes?.map(note => 
      `[${note.timestamp}]\n${note.content}\n\n`
    ).join('') || 'No notes available.';
    
    const blob = new Blob([notesText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${userData.name || 'patient'}_notes.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'High-Risk': return 'bg-red-100 text-red-800';
      case 'Medium-Risk': return 'bg-yellow-100 text-yellow-800';
      case 'Low-Risk': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="w-md bg-white rounded-2xl shadow-lg overflow-hidden p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-[24px] font-bold">Mother's Profile</h1>
      </div>

      {/* Profile Section */}
      <div className="">
        <div className="flex items-center space-x-4 mb-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
              {userData.profileImage ? (
                <img src={userData.profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-[#d87cdc] flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">{userData.name?.[0]?.toUpperCase() || 'P'}</span>
                </div>
              )}
            </div>
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="absolute -bottom-1 -right-1 w-6 h-6 bg-orange-400 rounded-full flex items-center justify-center text-white text-[10px] md:text-xs hover:bg-orange-500 transition-colors"
            >
              <Plus size={12} />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900">{userData.name || 'Unknown'}</h2>
            <p className="text-[10px] md:text-sm text-gray-600">Age: {userData.age || 'Unknown'}</p>
            <p className="text-[10px] md:text-sm text-gray-600">Blood Type: {userData.bloodType || 'Unknown'}</p>
          </div>
          <div className="text-right text-[10px] md:text-sm text-gray-600">
            <p>Patient ID: {userData.patientId || 'Unknown'}</p>
            <p>Gravida/Para: {userData.gravida || 'G0'}{userData.para || 'P0'}</p>
          </div>
        </div>

        {/* Gestational Info */}
        <div className="grid grid-cols-2 gap-4 mb-4 bg-[#faf5ff] p-2 rounded-lg">
          <div>
            <h3 className="text-[10px] md:text-sm font-medium text-[#7d3bb3] mb-1">Gestational Age</h3>
            <p className="text-[12px] md:text-sm font-semibold text-[#7f22ce]">
              {getGestationalAgeDisplay(userData.gestationalAge)}
            </p>
          </div>
          <div>
            <h3 className="text-[10px] md:text-sm font-medium text-[#7d3bb3] mb-1">Expected Due Date</h3>
            <p className="text-[12px] md:text-sm font-semibold text-[#7f22ce]">{userData.expectedDueDate || 'Unknown'}</p>
          </div>
          <div>
            <h3 className="text-[10px] md:text-sm font-medium text-[#7d3bb3] mb-1">Risk Level</h3>
            <span className={`inline-block px-2 py-1 text-[10px] md:text-xs font-medium rounded-full ${getRiskLevelColor(userData.riskLevel || '')}`}>
              {userData.riskLevel || 'Unknown'}
            </span>
          </div>
          <div>
            <h3 className="text-[10px] md:text-sm font-medium text-[#7d3bb3] mb-1">Delivery Plan</h3>
            <p className="text-[12px] md:text-sm font-semibold text-[#7f22ce]">{userData.deliveryPlan || 'Unknown'}</p>
          </div>
        </div>

        {/* Medical Info */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <h3 className="text-[12px] font-medium mb-2">Conditions</h3>
            <div className="space-y-1">
              {(userData.conditions || []).slice(0, 2).map((condition, index) => (
                <p key={index} className="text-[8px] md:text-xs bg-[#fef2f2] p-2 rounded-full text-[#c0322f] ">{condition}</p>
              ))}
              {(userData.conditions?.length || 0) > 2 && (
                <p className="text-[8px] md:text-xs text-gray-500 text-end">+{(userData.conditions?.length || 0) - 2} more</p>
              )}
              {(!userData.conditions || userData.conditions.length === 0) && (
                <p className="text-[8px] md:text-xs text-gray-400">None</p>
              )}
            </div>
          </div>
          <div>
            <h3 className="text-[12px] font-medium mb-2">Allergies</h3>
            <div className="space-y-1">
              {(userData.allergies || []).slice(0, 2).map((allergy, index) => (
                <p key={index} className="text-[8px] md:text-xs bg-[#fff7ed] p-2 rounded-full text-[#c5523a] ">{allergy}</p>
              ))}
              {(userData.allergies?.length || 0) > 2 && (
                <p className="text-[8px] md:text-xs text-gray-500 text-end">+{(userData.allergies?.length || 0) - 2} more</p>
              )}
              {(!userData.allergies || userData.allergies.length === 0) && (
                <p className="text-[8px] md:text-xs text-gray-400">None</p>
              )}
            </div>
          </div>
          <div>
            <h3 className="text-[12px] font-medium mb-2">Medications</h3>
            <div className="space-y-1">
              {(userData.medications || []).slice(0, 2).map((medication, index) => (
                <p key={index} className="text-[8px] md:text-xs bg-[#eff6ff] p-2 rounded-full text-[#2256db] ">{medication}</p>
              ))}
              {(userData.medications?.length || 0) > 2 && (
                <p className="text-[8px] md:text-xs text-gray-500 text-end">+{(userData.medications?.length || 0) - 2} more</p>
              )}
              {(!userData.medications || userData.medications.length === 0) && (
                <p className="text-[8px] md:text-xs text-gray-400">None</p>
              )}
            </div>
          </div>
        </div>

        {/* Care Team */}
        <div className="mb-4 bg-[#f9fafb] p-2 rounded-lg">
          <h3 className="text-[10px] md:text-sm font-medium text-gray-700 mb-3">Care Team & Contacts</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] md:text-sm text-gray-600">Assigned Doctor</p>
              <p className="text-[10px] md:text-sm font-semibold text-blue-700">{userData.assignedDoctor || 'Dr. Unknown'}</p>
            </div>
            <div>
              <p className="text-[10px] md:text-sm text-gray-600">Emergency Contact</p>
              <p className="text-[10px] md:text-sm font-semibold text-green-700">{userData.emergencyContact || 'Unknown'} ({userData.emergencyContactRelation || 'Unknown'})</p>
            </div>
          </div>
        </div>

        {/* Status Badge */}
        <div className="mb-4">
          <span className="inline-block px-3 py-1 text-[10px] md:text-xs font-medium text-orange-700 bg-orange-100 rounded-full">
            At Risk - Close Monitoring
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button
            onClick={handleCallNurse}
            className="flex-1 flex items-center justify-center space-x-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Phone size={16} />
            <span className="text-[10px] md:text-sm font-medium">Call Nurse</span>
          </button>
          <button
            onClick={() => setShowNoteModal(true)}
            className="flex items-center justify-center space-x-2 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Plus size={16} />
            <span className="text-[10px] md:text-sm font-medium">Add Note</span>
          </button>
          <button
            onClick={() => setShowHistoryModal(true)}
            className="flex items-center justify-center space-x-2 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Clock size={16} />
            <span className="text-[10px] md:text-sm font-medium">History</span>
          </button>
        </div>
      </div>

      {/* Add Note Modal */}
      {showNoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000c2]">
          <div className="bg-white rounded-lg p-6 w-80 max-w-90vw">
            <h3 className="text-lg font-semibold mb-4">Add Note</h3>
            <textarea
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Enter your note here..."
              className="w-full h-32 border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex space-x-3 mt-4">
              <button
                onClick={handleAddNote}
                className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Save Note
              </button>
              <button
                onClick={() => {
                  setShowNoteModal(false);
                  setNewNote('');
                }}
                className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* History Modal */}
      {showHistoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000c2]">
          <div className="bg-white rounded-lg p-6 w-96 max-w-90vw max-h-80vh overflow-hidden flex flex-col">
            <h3 className="text-lg font-semibold mb-4">Note History</h3>
            <div className="flex-1 overflow-y-auto mb-4">
              {userData.notes && userData.notes.length > 0 ? (
                <div className="space-y-3">
                  {userData.notes.map((note) => (
                    <div key={note.id} className="border border-gray-200 rounded-lg p-3">
                      <p className="text-[10px] md:text-xs text-gray-500 mb-2">{note.timestamp}</p>
                      <p className="text-[10px] md:text-sm text-gray-900">{note.content}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">No notes available</p>
              )}
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleExportNotes}
                className="flex-1 flex items-center justify-center space-x-2 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                <Download size={16} />
                <span>Export</span>
              </button>
              <button
                onClick={() => setShowHistoryModal(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};