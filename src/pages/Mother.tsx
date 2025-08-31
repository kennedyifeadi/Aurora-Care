import { PainAssessmentDisplay } from "../components/motherComp/ComfortAssessmentCard"
import { ProfileCard } from "../components/motherComp/ProfileCard"
import { BloodPressureDisplay } from "../components/motherComp/realTimeCards/BloodPressure"
import { CervicalDilationDisplay } from "../components/motherComp/realTimeCards/CervicalDilation"
import { ContractionsDisplay } from "../components/motherComp/realTimeCards/Contractions"
import { HeartRateDisplay } from "../components/motherComp/realTimeCards/HeartRate"
import { OxygenSaturationDisplay } from "../components/motherComp/realTimeCards/OxygenSaturation"
import { TemperatureDisplay } from "../components/motherComp/realTimeCards/Temperature"
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
        <div className="flex flex-col gap-8">
          <div className="flex gap-8 flex-wrap md:justify-start justify-center">
            <TemperatureDisplay />
            <HeartRateDisplay />
            <BloodPressureDisplay />
          </div>
          <div className="flex gap-8 flex-wrap md:justify-start justify-center">
            <OxygenSaturationDisplay />
            <CervicalDilationDisplay />
            <ContractionsDisplay />
          </div>
        </div>
      </div>
      <div className="flex">
        <PainAssessmentDisplay initialPainLevel={5} />
      </div>
      <div></div>
      <div></div>
    </div>
  )
}
