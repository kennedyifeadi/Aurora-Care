import { useState } from "react";

export const Calender = () => {
    const TrimesterMilestones = [
        {
            title: "First Trimester",
            description: "Weeks 1-12: Your baby is developing rapidly.",
        },
        {
            title: "Second Trimester",
            description: "Weeks 13-26: Your baby's organs are forming.",
        },
        {
            title: "Third Trimester",
            description: "Weeks 27-40: Your baby is growing and preparing for birth.",
        },
        {
            title: "Fourth Trimester",
            description: "Weeks 41-52: Your baby is adjusting to life outside the womb.",
        }
    ];

    // Get user pregnancy month from localStorage
    const userData = typeof window !== 'undefined' ? localStorage.getItem("userData") : null;
    const parsedUserData = userData ? JSON.parse(userData) : null;
    const pregnancyMonths: string = parsedUserData ? String(parsedUserData[1]) : '0';
    // Map month to week number
    const monthToWeek: { [key: string]: number } = {
        '1': 4,
        '2': 8,
        '3': 12,
        '4': 16,
        '5': 20,
        '6': 24,
        '7': 28,
        '8': 32,
        '9': 36,
        '10': 40
    };
    // Get current week number from month
    const userWeek = monthToWeek[pregnancyMonths] || 4;
    // Use today's date to align the calendar
    const today = new Date();
    // Calculate days since pregnancy start
    const pregnancyStartDate = new Date(today.getFullYear(), today.getMonth(), 1); // Start of current month
    // Calculate week start day for user week
    const weekStartDay = (userWeek - 4) * 7;
    const weekStartDate = new Date(pregnancyStartDate);
    weekStartDate.setDate(pregnancyStartDate.getDate() + weekStartDay);
    const weekEndDate = new Date(weekStartDate);
    weekEndDate.setDate(weekEndDate.getDate() + 6);
    const weekLabel = `Week ${userWeek}: ${weekStartDate.toLocaleString('default', { month: 'short' })} ${weekStartDate.getDate()} - ${weekEndDate.toLocaleString('default', { month: 'short' })} ${weekEndDate.getDate()}, ${weekEndDate.getFullYear()}`;

    const [activeMobileTooltip, setActiveMobileTooltip] = useState<{ week: number; day: number } | null>(null);

    return (
        <div className="h-max w-full flex gap-8 flex-wrap">
            <div className="w-[360px] md:w-[500px] h-max p-4 md:h-[400px] rounded-xl bg-white flex flex-col hover:shadow-md border border-gray-200 ">
                <div>
                    <h1 className="text-[24px] font-medium">
                        Due Date Countdown
                    </h1>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <h1 className="text-[24px] text-[#7e22ce] font-medium">35 weeks left</h1>
                    <span className="text-[14px] text-gray-500">Expected Delivery: Apr 23, 2026</span>
                </div>
                <div className="flex flex-col gap-2 mt-4">
                    <h1 className="text-[18px] text-gray-800 font-medium">Trimester Milestones</h1>
                    {
                        TrimesterMilestones.map((milestone, index) => (
                            <div key={index} className="flex w-full items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                                <div className="flex flex-col">
                                    <h1 className="text-gray-800 text-[16px]">{milestone.title}</h1>
                                    <p className="text-gray-500 text-[14px]">{milestone.description}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="w-[360px] md:w-[500px] h-[300px] md:h-[400px] rounded-xl bg-white hover:shadow-md border border-gray-200 p-4 flex flex-col">
                <div className="mb-2">
                    <h1 className="text-[20px] font-medium">Pregnancy Calendar</h1>
                    <span className="text-[14px] text-gray-500">{weekLabel}</span>
                </div>
                <div className="flex flex-col w-full gap-4 overflow-y-auto overflow-x-hidden">
                    {["Past Week", "Current Week", "Next Week"].map((label, idx) => {
                        // Calculate week start day for each week
                        const weekOffset = idx - 1; // -1: Past, 0: Current, 1: Next
                        const weekNum = userWeek + weekOffset * 4;
                        const weekStartDay = (weekNum - 4) * 7;
                        // Use start of current local month for alignment
                        const pregnancyStartDate = new Date(today.getFullYear(), today.getMonth(), 1);
                        // Week number for display and tooltips
                        const weekMessages = [
                            [
                                "Start of Week 4: Embryo implants in uterus.",
                                "Cells begin forming major organs.",
                                "Neural tube development begins.",
                                "Placenta starts to form.",
                                "Heartbeat may be detected.",
                                "Arms and legs start to bud.",
                                "End of Week 4: Major organs begin to develop."
                            ],
                            [
                                "Start of Week 5: Heart starts beating.",
                                "Brain and spinal cord grow rapidly.",
                                "Facial features begin to form.",
                                "Limb buds lengthen.",
                                "Blood vessels develop.",
                                "Eyes and ears start to form.",
                                "End of Week 5: Heartbeat visible on ultrasound."
                            ],
                            [
                                "Start of Week 6: Baby’s size doubles.",
                                "Hands and feet start to form.",
                                "Brain activity increases.",
                                "Lungs begin to develop.",
                                "Fingers and toes appear.",
                                "Eyes become more defined.",
                                "End of Week 6: Baby’s heartbeat strengthens."
                            ]
                        ];
                        return (
                            <div key={label} className={`w-full flex flex-col ${label === "Current Week" ? ' border-2 border-[#7e22ce] bg-[#f3e8ff]' : 'bg-gray-50'} rounded-lg md:p-2 p-1 transition-all duration-200`}>
                                <span className="font-medium text-[16px] mb-1">{label}</span>
                                <div className="flex flex-wrap gap-1">
                                    {Array.from({ length: 7 }).map((_, i) => {
                                        const dayOfPregnancy = weekStartDay + i;
                                        const todayCell = label === "Current Week" && dayOfPregnancy === ((userWeek - 4) * 7);
                                        // Calculate actual date
                                        const dateObj = new Date(pregnancyStartDate);
                                        dateObj.setDate(dateObj.getDate() + dayOfPregnancy);
                                        const month = dateObj.toLocaleString('default', { month: 'short' });
                                        const day = dateObj.getDate();
                                        // Tooltip position logic
                                        let tooltipPosition = 'left-1/2 -translate-x-1/2';
                                        if (i === 0) tooltipPosition = 'left-0 translate-x-0';
                                        if (i === 6) tooltipPosition = 'right-0 translate-x-0';
                                        // Mobile-specific position
                                        let mobileTooltipPosition = '';
                                        if (window.innerWidth < 640) {
                                            if (i === 0) mobileTooltipPosition = 'left-0 translate-x-0';
                                            else if (i === 6) mobileTooltipPosition = 'right-0 translate-x-0';
                                            else mobileTooltipPosition = 'left-1/2 -translate-x-1/2';
                                        }
                                        // Tooltip message
                                        const message = weekMessages[idx][i];
                                        const isActiveMobile = activeMobileTooltip && activeMobileTooltip.week === idx && activeMobileTooltip.day === i;
                                        return (
                                            <div
                                                key={i}
                                                className={`relative group flex flex-col items-center justify-center h-14 w-14 rounded-lg border transition-all duration-200 cursor-pointer ${todayCell ? 'border-[#7e22ce] bg-[#e9d5ff]' : 'border-gray-200'} `}
                                                onClick={() => {
                                                    if (window.innerWidth < 640) {
                                                        setActiveMobileTooltip(isActiveMobile ? null : { week: idx, day: i });
                                                    }
                                                }}
                                            >
                                                <span className="font-semibold text-[12px] md:text-[14px]">Day {dayOfPregnancy}</span>
                                                <span className="md:text-xs text-[10px] text-gray-500">{month} {day}</span>
                                                {/* Tooltip: hover on desktop, click on mobile */}
                                                <div className={`absolute z-10 top-12 w-36 p-2 bg-white border border-gray-300 rounded shadow-lg text-xs text-gray-700 transition-opacity duration-200
                                                    sm:${tooltipPosition} sm:group-hover:block sm:opacity-100 sm:pointer-events-auto
                                                    ${isActiveMobile ? `block opacity-100 pointer-events-auto ${mobileTooltipPosition}` : 'hidden'}
                                                    sm:hidden`}
                                                >
                                                    <span>{message}</span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
                <span className="mt-2 text-xs text-gray-500">*Scroll to view past/next week. Hover a day to see details</span>
            </div>
        </div>
    )
}
