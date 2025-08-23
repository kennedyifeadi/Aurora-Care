import { MotherHeartBeatChart } from "./MotherHeartBeatChart";
import { MotherContractionChart } from "./MotherContractionChart";
import { MotherCervicalDialationChart } from "./MotherCervicalDialationChart";
import HeartBeat from "../../assets/gifs/HeartBeat.gif";
import Target from "../../assets/gifs/Target.gif";
import { useEffect, useState } from "react";
import { FaLongArrowAltUp } from "react-icons/fa";
import { IoAnalytics } from "react-icons/io5";
import { MotherPastData } from "../../data/data";


export const MotherSnapshot = () => {
    const [message, setMessage] = useState("");
    const [shortMessage, setShortMessage] = useState("");
    const [contractionMessage, setContractionMessage] = useState("");
    const [cervicalDilationMessage, setCervicalDilationMessage] = useState("");
    const [shortContractionMessage, setShortContractionMessage] = useState("");
    const [shortCervicalDilationMessage, setShortCervicalDilationMessage] = useState("");
    const currentHeartBeat = 80;
    const currentContractions = MotherPastData.length > 0 ? MotherPastData[MotherPastData.length - 1].contractions : 0;
    const currentCervicalDilation = MotherPastData.length > 0 ? MotherPastData[MotherPastData.length - 1].cervicalDialation : 0;

    useEffect(() => {
        const message = currentHeartBeat < 60 ? "your heart rate is low, you should see a doctor" : currentHeartBeat > 120 ? "your heart rate is high, you should see a doctor" : "your heart rate is in stable condition";
        const shortMessage = currentHeartBeat < 60 ? "low" : currentHeartBeat > 120 ? "high" : "stable";
        const contractionMessage = currentContractions < 5 ? "your contractions are low, see a doctor" : currentContractions > 10 ? "your contractions are high, see a doctor" : "your contractions are in stable condition";
        const shortContractionMessage = currentContractions < 5 ? "low" : currentContractions > 10 ? "high" : "stable";
        const cervicalDilationMessage = currentCervicalDilation < 3 ? "your cervical dilation is low, you should see a doctor" : currentCervicalDilation > 7 ? "your cervical dilation is high, you should see a doctor" : "your cervical dilation is in stable condition";
        const shortCervicalDilationMessage = currentCervicalDilation < 3 ? "low" : currentCervicalDilation > 7 ? "high" : "stable";
        setMessage(message);
        setShortMessage(shortMessage);
        setContractionMessage(contractionMessage);
        setShortContractionMessage(shortContractionMessage);
        setCervicalDilationMessage(cervicalDilationMessage);
        setShortCervicalDilationMessage(shortCervicalDilationMessage);
    }, [currentHeartBeat, currentContractions, currentCervicalDilation]);
    return (
        <div className="w-full h-max flex flex-col gap-4 mt-4">
            <div className="w-full">
                <h2 className="font-medium text-lg">Mother Snapshot 👩</h2>
                <p className="text-gray-600">Details about your health and development.</p>
            </div>
            <div className="h-max w-full flex justify-center items-center gap-4 flex-wrap md:flex-nowrap">
                {/* Heartbeat Card */}
                <div className="w-[380px] md:w-[400px] h-[300px] md:h-[400px] rounded-xl bg-white hover:shadow-md border border-gray-200 p-4 flex-shrink-0">
                    <div className="flex justify-between">
                        <span className="flex items-center gap-2 text-[18px] font-medium">
                            Mother's HeartBeat
                            <img src={HeartBeat} alt="HeartBeat" className="w-6 h-6" />
                        </span>
                        <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 19.75C15.1086 19.75 19.25 15.6086 19.25 10.5C19.25 5.39137 15.1086 1.25 10 1.25C4.89137 1.25 0.75 5.39137 0.75 10.5C0.75 15.6086 4.89137 19.75 10 19.75Z" stroke="black" strokeOpacity="0.48" strokeWidth="1.5" />
                            <path d="M10 10.313V15.313" stroke="black" strokeOpacity="0.48" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M10 8.18799C10.6904 8.18799 11.25 7.62834 11.25 6.93799C11.25 6.24763 10.6904 5.68799 10 5.68799C9.30964 5.68799 8.75 6.24763 8.75 6.93799C8.75 7.62834 9.30964 8.18799 10 8.18799Z" fill="black" fillOpacity="0.48" />
                        </svg>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[32px] md:text-[48px] font-bold text-[#7e22ce]">
                            {currentHeartBeat} BPM
                        </span>
                        <span>
                            <p className="text-gray-600 text-[12px] italic">Normal Range: 70 - 90 BPM</p>
                        </span>
                    </div>
                    <div className="w-full h-max">
                        <MotherHeartBeatChart />
                    </div>
                    <div>
                        <p className="flex">
                            {message} | <span className="font-medium text-[#15AF63] flex justify-center items-center"><FaLongArrowAltUp />{shortMessage}</span>
                        </p>
                    </div>
                </div>
                {/* Contraction Card */}
                <div className="w-[380px] md:w-[400px] h-[300px] md:h-[400px] rounded-xl bg-white hover:shadow-md border border-gray-200 p-4 flex-shrink-0">
                    <div className="flex justify-between">
                        <span className="flex items-center gap-2 text-[18px] font-medium">
                            Contractions
                        <IoAnalytics className="text-[#7e22ce]" />
                        </span>
                        <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 19.75C15.1086 19.75 19.25 15.6086 19.25 10.5C19.25 5.39137 15.1086 1.25 10 1.25C4.89137 1.25 0.75 5.39137 0.75 10.5C0.75 15.6086 4.89137 19.75 10 19.75Z" stroke="black" strokeOpacity="0.48" strokeWidth="1.5" />
                            <path d="M10 10.313V15.313" stroke="black" strokeOpacity="0.48" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M10 8.18799C10.6904 8.18799 11.25 7.62834 11.25 6.93799C11.25 6.24763 10.6904 5.68799 10 5.68799C9.30964 5.68799 8.75 6.24763 8.75 6.93799C8.75 7.62834 9.30964 8.18799 10 8.18799Z" fill="black" fillOpacity="0.48" />
                        </svg>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[32px] md:text-[48px] font-bold text-[#7e22ce]">
                            {
                                currentContractions
                            }cm
                        </span>
                        <span>
                            <p className="text-gray-600 text-[12px] italic">
                                Time: {
                                    MotherPastData.length > 0 ? MotherPastData[MotherPastData.length - 1].time : 0
                                }
                            </p>
                        </span>
                    </div>
                    <div className="w-full h-max">
                        <MotherContractionChart />
                    </div>
                     <div>
                        <p className="flex">
                            {contractionMessage} | <span className="font-medium text-[#15AF63] flex justify-center items-center"><FaLongArrowAltUp />{shortContractionMessage}</span>
                        </p>
                    </div>
                </div>
                {/* Cervical Dialation Card */}
                <div className="w-[380px] md:w-[400px] h-[300px] md:h-[400px] rounded-xl bg-white hover:shadow-md border border-gray-200 p-4 flex-shrink-0">
                    <div className="flex justify-between">
                        <span className="flex items-center gap-2 text-[18px] font-medium">
                            Cervical Dialation
                            <img src={Target} alt="Cervical Dialation" className="w-6 h-6" />

                        </span>
                        <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 19.75C15.1086 19.75 19.25 15.6086 19.25 10.5C19.25 5.39137 15.1086 1.25 10 1.25C4.89137 1.25 0.75 5.39137 0.75 10.5C0.75 15.6086 4.89137 19.75 10 19.75Z" stroke="black" strokeOpacity="0.48" strokeWidth="1.5" />
                            <path d="M10 10.313V15.313" stroke="black" strokeOpacity="0.48" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M10 8.18799C10.6904 8.18799 11.25 7.62834 11.25 6.93799C11.25 6.24763 10.6904 5.68799 10 5.68799C9.30964 5.68799 8.75 6.24763 8.75 6.93799C8.75 7.62834 9.30964 8.18799 10 8.18799Z" fill="black" fillOpacity="0.48" />
                        </svg>
                    </div>
                                        <div className="flex flex-col">
                        <span className="text-[32px] md:text-[48px] font-bold text-[#7e22ce]">
                            {
                                currentCervicalDilation
                            }cm
                        </span>
                        <span>
                            <p className="text-gray-600 text-[12px] italic">
                                Time: {
                                    MotherPastData.length > 0 ? MotherPastData[MotherPastData.length - 1].time : 0
                                }
                            </p>
                        </span>
                    </div>
                    <div className="w-full h-max flex items-center justify-center">
                        <MotherCervicalDialationChart />
                    </div>
                    <div>
                        <p className="flex">
                            {cervicalDilationMessage} | <span className="font-medium text-[#15AF63] flex justify-center items-center"><FaLongArrowAltUp />{shortCervicalDilationMessage}</span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="w-max p-2 rounded-lg active:scale-90 cursor-pointer duration-200 bg-linear-to-l from-[#7057ff] to-[#7057ff] text-white font-medium" onClick={() => { window.alert("Voice Report audio") }}>🎙️Voice Report</div>
        </div>
    )
}
