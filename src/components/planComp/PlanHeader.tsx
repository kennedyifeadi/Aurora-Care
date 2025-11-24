
const readUser = () => {
  if (typeof window === 'undefined') return {} as any;
  const raw = localStorage.getItem('userData');
  return raw ? JSON.parse(raw) : {};
};

const PlanHeader: React.FC = () => {
  const u = readUser();
  const plan = u.plan || {};

  return (
    <div className="bg-white rounded-xl p-4 shadow flex flex-col md:flex-row md:items-center md:justify-between gap-3">
      <div className="flex items-start md:items-center gap-4 w-full md:w-auto">
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gray-100 flex items-center justify-center text-lg md:text-xl font-bold">
          {(u.childProfile && u.childProfile.name ? u.childProfile.name[0] : (u.fullName || 'P')[0])}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-base md:text-lg font-semibold truncate">{(u.childProfile && u.childProfile.name) || u.fullName || 'Patient'}</div>
          <div className="text-xs md:text-sm text-gray-500">Gestational Age: {u.gestationalAge ? `${Math.floor(u.gestationalAge/7)}w ${u.gestationalAge%7}d` : '—'}</div>
          <div className="text-xs md:text-sm text-gray-500">Assigned: {plan.assignedDoctor || u.doctorEmail || '—'}</div>
        </div>
      </div>

      <div className="w-full md:w-auto text-left md:text-right">
        <div className="text-sm font-medium">Status: <span className="px-2 py-1 rounded bg-green-100 text-green-700">{plan.status || 'Active'}</span></div>
        <div className="text-xs md:text-sm text-gray-500 mt-1">Last updated: {plan.lastUpdated || '—'}</div>
        <div className="mt-2 flex gap-2 overflow-x-auto md:justify-end">
          <div className="text-xs px-2 py-1 rounded-full bg-gray-100 whitespace-nowrap">Risk: {plan.risk || 'Low'}</div>
          <div className="text-xs px-2 py-1 rounded-full bg-gray-100 whitespace-nowrap">Delivery: {plan.deliveryMode || 'Undecided'}</div>
        </div>
      </div>
    </div>
  );
};

export default PlanHeader;
