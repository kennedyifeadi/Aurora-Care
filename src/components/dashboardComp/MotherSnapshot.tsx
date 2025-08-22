
export const MotherSnapshot = () => {
    return (
        <div className="w-full h-max flex flex-col gap-4 mt-4">
            <div className="w-full">
                <h2 className="font-medium text-lg">Mother Snapshot 👩</h2>
                <p className="text-gray-600">Details about your health and development.</p>
            </div>
            <div className="h-max w-full flex gap-8 flex-wrap">
                <div className="w-[360px] h-[300px] rounded-xl bg-white hover:shadow-md border border-gray-200 ">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div className="w-[360px] h-[300px] rounded-xl bg-white hover:shadow-md border border-gray-200 "></div>
                <div className="w-[360px] h-[300px] rounded-xl bg-white hover:shadow-md border border-gray-200 "></div>
            </div>
            <div className="w-max p-2 rounded-lg active:scale-90 cursor-pointer duration-200 bg-linear-to-l from-[#7057ff] to-[#7057ff] text-white font-medium" onClick={() => { window.alert("Voice Report audio") }}>🎙️Voice Report</div>
        </div>
    )
}
