
export const ChildSnapshot = () => {
    return (
        <div className="w-full h-max flex flex-col gap-4 mt-4">
            <div className="w-full">
                <h2 className="font-medium text-lg">Child Snapshot 👶</h2>
                <p className="text-gray-600">Details about your child's health and development.</p>
            </div>
            <div className="h-max w-full flex gap-8 flex-wrap">
                <div className="w-[360px] md:w-[500px] h-[300px] md:h-[400px] rounded-xl bg-white hover:shadow-md border border-gray-200 "></div>
                <div className="w-[360px] md:w-[500px] h-[300px] md:h-[400px] rounded-xl bg-white hover:shadow-md border border-gray-200 "></div>
            </div>
        </div>
    )
}
