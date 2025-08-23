import { MotherPastData } from "../../data/data";

export const MotherCervicalDialationChart = () => {
  // Get latest dialation value
  const latest = MotherPastData[MotherPastData.length - 1]?.cervicalDialation ?? 0;
  // Meter scale from 0 to 10
  return (
    <div className="w-full flex flex-col items-center justify-center py-6">
      <span className="font-medium text-[18px] mb-2">Cervical Dialation</span>
      <div className="w-full flex flex-col items-center">
        <div className="w-full h-6 bg-gray-200 rounded-full relative">
          <div
            className="h-6 bg-[#7e22ce] rounded-full transition-all duration-300"
            style={{ width: `${(latest / 10) * 100}%` }}
          ></div>
          <span className="absolute left-0 top-7 text-xs text-gray-500">0</span>
          <span className="absolute right-0 top-7 text-xs text-gray-500">10</span>
        </div>
        <span className="mt-2 text-lg font-bold text-[#7e22ce]">{latest} cm</span>
      </div>
    </div>
  );
}
