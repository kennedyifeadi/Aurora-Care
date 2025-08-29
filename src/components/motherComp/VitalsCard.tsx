import { RiHeartPulseLine } from "react-icons/ri";
import { FaTemperatureThreeQuarters } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { RiLungsLine } from "react-icons/ri";
import { BiTargetLock } from "react-icons/bi";
import { FaCircleCheck } from "react-icons/fa6";
import { RiShieldCheckFill } from "react-icons/ri";


export const VitalsCard = () => {
  const vitalSigns = {
    heartRate: '88',
    bloodPressure: '118/76',
    temperature: '98.6',
    oxygenSaturation: '98',
    cervicalDialation: '3'
  };

  const name = {
    heartRate: 'Heart Rate',
    bloodPressure: 'Blood Pressure',
    temperature: 'Temperature',
    oxygenSaturation: 'Oxygen Saturation',
    cervicalDialation: 'Cervical Dilation'
  };

  const units = {
    heartRate: 'bpm',
    bloodPressure: 'mmHg',
    temperature: '°F',
    oxygenSaturation: '%',
    cervicalDialation: 'cm'
  };

  const icons = {
    heartRate:  <FaRegHeart />,
    bloodPressure: <RiHeartPulseLine />,
    temperature: <FaTemperatureThreeQuarters />,
    oxygenSaturation: <RiLungsLine />,
    cervicalDialation: <BiTargetLock />
  };

  return (
    <div className="flex w-md flex-col gap-4 p-4 rounded-lg shadow-md bg-white">
      <div className="flex w-full">
        <h1 className="text-[24px] font-bold">Vitals Summary</h1>
      </div>
      <div className="gap-2 flex flex-col">
        {
          Object.entries(vitalSigns).map(([key, value]) => (
            <div key={key} className="flex justify-between bg-gray-50 hover:bg-gray-100 rounded-xl items-center p-4 duration-200">
              <div className="flex gap-2">
                <div className="text-[#9333ea] flex justify-center items-center">
                  {icons[key as keyof typeof icons]}
                </div>
                <div className="flex flex-col">
                  <span className="text-[18px] text-gray-950 font-medium">{name[key as keyof typeof name]}</span>
                  <span className="flex">
                    <span className="text-[18px] text-gray-700 font-bold">{value}</span>
                    <span className="text-[14px] text-gray-500 flex items-end  ml-1">
                      {units[key as keyof typeof units]}
                    </span>
                  </span>
                </div>
              </div>
              <div className="flex justify-center items-center bg-[#f0fdf4] px-3 py-1 rounded-full text-[#23c55e]">
                <FaCircleCheck />
              </div>
            </div>
          ))
        }
      </div>
      <div className="p-4 bg-gradient-to-r from-[#f0fdf5] to-[#eff6fe] flex items-center rounded-xl border border-[#dbfae8] gap-2">
        <span className="text-[18px] text-[#166534]"><RiShieldCheckFill /></span>
        <span className="font-medium md:text-[18px] text-[#166534] text-[14px]">All critical vitals within normal range</span>
      </div>
    </div>
  )
}
