import { ProfileCard } from "../components/motherComp/ProfileCard"
import { VitalsCard } from "../components/motherComp/VitalsCard"

export const Mother = () => {
  return (
    <div className="flex flex-col w-full gap-4 p-4">
      <div className="flex gap-8 w-full h-max flex-wrap">
        <ProfileCard />
        <VitalsCard />
      </div>
      <div className="flex flex-col flex-wrap gap-4">
        <h1 className="text-[20px] md:text-[24px] font-bold">Real-Time Vitals Monitoring</h1>
        <div>

        </div>
      </div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}
