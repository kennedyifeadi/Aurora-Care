
export const Calender = () => {
    const TrimesterMilestones = [
        {
            title: "First Trimester",
            description: "Weeks 1-12: Your baby is developing rapidly.",
            dueDate: "Jan 15, 2026"
        },
        {
            title: "Second Trimester",
            description: "Weeks 13-26: Your baby's organs are forming.",
            dueDate: "Apr 15, 2026"
        },
        {
            title: "Third Trimester",
            description: "Weeks 27-40: Your baby is growing and preparing for birth.",
            dueDate: "Jul 15, 2026"
        },
        {
            title: "Fourth Trimester",
            description: "Weeks 41-52: Your baby is adjusting to life outside the womb.",
            dueDate: "Oct 15, 2026"
        }
    ];

    return (
        <div className="h-max w-full flex gap-8 flex-wrap">
            <div className="w-[360px] md:w-[500px] h-[300px] md:h-[400px] rounded-xl bg-white hover:shadow-md border border-gray-200 ">
                <div>
                    <h1>
                        Due Date Countdown
                    </h1>
                </div>
                <div>
                    <h1>35 weeks left</h1>
                    <span>Expected Delivery: Apr 23, 2026</span>
                </div>
                <div>
                    <h1>Trimester Milestones</h1>
                </div>
            </div>
            <div className="w-[360px] md:w-[500px] h-[300px] md:h-[400px] rounded-xl bg-white hover:shadow-md border border-gray-200 "></div>
        </div>
    )
}
