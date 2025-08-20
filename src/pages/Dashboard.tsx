import { Calender } from "../components/dashboardComp/Calender";
import { ChildSnapshot } from "../components/dashboardComp/ChildSnapshot";
import { DataManagement } from "../components/dashboardComp/DataManagement";
import { MotherSnapshot } from "../components/dashboardComp/MotherSnapshot";

const Dashboard = () => {
		return (
			<div className="w-full flex flex-col gap-4 border">
				<div></div>
				<div className="h-[150dvh]">
					<ChildSnapshot />
				</div>
				<div>
					<MotherSnapshot />
				</div>
				<div>
					<Calender />
				</div>
				<div className="h-[500px] border">
					<DataManagement />
				</div>
			</div>
		);
};

export default Dashboard;
