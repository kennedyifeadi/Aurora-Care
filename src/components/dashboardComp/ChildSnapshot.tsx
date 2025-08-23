import { useEffect, useState } from "react";
// import { ChildHeartBeatChart } from "./ChildHeartBeatChart";
import HeartBeat from "../../assets/gifs/HeartBeat.gif";
import CheckUp from "../../assets/gifs/CheckUp.gif";
import { ChildHeartBeatChart } from "./ChildHeartBeatChart";
import { FaLongArrowAltUp } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { LuClock3 } from "react-icons/lu";


export const ChildSnapshot = () => {
    const [message, setMessage] = useState("");
    const [shortMessage, setShortMessage] = useState("");
    const currentHeartBeat = 140;

    useEffect(() => {
        const message = currentHeartBeat < 120 ? "baby's heart rate is low, you should see a doctor" : currentHeartBeat > 160 ? "baby's heart rate is high, you should see a doctor" : "your baby is in stable condition";
        const shortMessage = currentHeartBeat < 120 ? "low" : currentHeartBeat > 160 ? "high" : "stable";
        setMessage(message);
        setShortMessage(shortMessage);
    }, [currentHeartBeat]);

    const CheckUpReminders = [
        {
            message: "It's time for your baby's regular check-up.",
            time: "2:00 PM",
            date: "Nov 8, 2025"
        },
        {
            message: "Don't forget to bring your baby's vaccination records.",
            time: "2:00 PM",
            date: "Dec 10, 2025"
        },
        {
            message: "Your baby's next vaccination is due.",
            time: "2:00 PM",
            date: "Sep 22, 2025"
        },
        {
            message: "Your baby's next check-up is due.",
            time: "2:00 PM",
            date: "Jan 15, 2026"
        },
    ]

    return (
        <div className="w-full h-max flex flex-col gap-4 mt-4">
            <div className="w-full">
                <h2 className="font-medium text-lg">Child Snapshot 👶</h2>
                <p className="text-gray-600">Details about your child's health and development.</p>
            </div>
            <div className="h-max w-full flex gap-8 flex-wrap justify-center">
                <div className="w-[380px] md:w-[500px] h-[300px] md:h-[400px] rounded-xl bg-white hover:shadow-md border border-gray-200 p-4 ">
                    <div className="flex justify-between">
                        <span className="flex items-center gap-2 text-[18px] font-medium">
                            Baby's HeartBeat
                            <img src={HeartBeat} alt="HeartBeat" className="w-6 h-6" />
                        </span>
                        <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 19.75C15.1086 19.75 19.25 15.6086 19.25 10.5C19.25 5.39137 15.1086 1.25 10 1.25C4.89137 1.25 0.75 5.39137 0.75 10.5C0.75 15.6086 4.89137 19.75 10 19.75Z" stroke="black" strokeOpacity="0.48" strokeWidth="1.5" />
                            <path d="M10 10.313V15.313" stroke="black" strokeOpacity="0.48" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M10 8.18799C10.6904 8.18799 11.25 7.62834 11.25 6.93799C11.25 6.24763 10.6904 5.68799 10 5.68799C9.30964 5.68799 8.75 6.24763 8.75 6.93799C8.75 7.62834 9.30964 8.18799 10 8.18799Z" fill="black" fillOpacity="0.48" />
                        </svg>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[32px] md:text-[64px] font-bold text-[#7e22ce]">
                            {currentHeartBeat} BPM
                        </span>
                        <span>
                            <p className="text-gray-600 text-[12px] italic">Normal Range: 120 - 160 BPM</p>
                        </span>
                    </div>
                    <div className="w-full h-max">
                        <ChildHeartBeatChart />
                    </div>
                    <div>
                        <p className="flex">
                            {message} | <span className="font-medium text-[#15AF63] flex justify-center items-center"><FaLongArrowAltUp />{shortMessage}</span>
                        </p>
                    </div>
                </div>
                <div className="w-[380px] md:w-[500px] h-max md:h-[400px] rounded-xl bg-white hover:shadow-md border border-gray-200 p-4 ">
                    <div className="flex justify-between">
                        <span className="flex items-center gap-2 text-[18px] font-medium">
                            Upcoming Checkups
                            <img src={CheckUp} alt="CheckUp" className="w-6 h-6" />
                        </span>
                        <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 19.75C15.1086 19.75 19.25 15.6086 19.25 10.5C19.25 5.39137 15.1086 1.25 10 1.25C4.89137 1.25 0.75 5.39137 0.75 10.5C0.75 15.6086 4.89137 19.75 10 19.75Z" stroke="black" strokeOpacity="0.48" strokeWidth="1.5" />
                            <path d="M10 10.313V15.313" stroke="black" strokeOpacity="0.48" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M10 8.18799C10.6904 8.18799 11.25 7.62834 11.25 6.93799C11.25 6.24763 10.6904 5.68799 10 5.68799C9.30964 5.68799 8.75 6.24763 8.75 6.93799C8.75 7.62834 9.30964 8.18799 10 8.18799Z" fill="black" fillOpacity="0.48" />
                        </svg>
                    </div>
                    <div className="flex flex-col gap-2 mt-4">
                        {
                            CheckUpReminders.map((reminders, index) => (
                                <div key={index} className="w-full h-[60px] bg-[#f9fafb] rounded-md duration-200 hover:bg-[#f3f4f6] flex gap-2 items-center px-2">
                                    <span className="flex justify-center items-center h-max p-2 rounded-full text-[#7e22ce] bg-[#f3e8ff]"><MdDateRange /></span>
                                    <span className="flex flex-col">
                                        <span className="text-[14px] font-medium">{reminders.message}</span>
                                        <span className="text-[12px] text-gray-600">{reminders.time} | {reminders.date}</span>
                                    </span>
                                </div>
                            ))
                        }
                        <div className="w-full h-[60px] bg-[#fcf2fa] border-2 border-[#f0e2fe] rounded-md flex gap-2 items-center px-2" >
                            <span className="flex justify-center items-center h-max p-2 rounded-full text-[#7e22ce] bg-[#f3e8ff]"><LuClock3 /></span>
                            <span className="flex flex-col">
                                <span className="text-[14px] font-medium text-[#7e22ce]">Estimated Delivery window</span>
                                <span className="text-[12px] text-[#7e22ce] font-light">4/15/2026 - 4/29/2026</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
