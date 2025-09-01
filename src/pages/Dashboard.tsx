import { Calender } from "../components/dashboardComp/Calender";
import { ChildSnapshot } from "../components/dashboardComp/ChildSnapshot";
import { DataManagement } from "../components/dashboardComp/DataManagement";
import { MotherSnapshot } from "../components/dashboardComp/MotherSnapshot";
import { BsSend } from "react-icons/bs";


const Dashboard = () => {
	const userData = localStorage.getItem("userData");
	const parsedUserData = userData ? JSON.parse(userData) : null;
	const fullName = parsedUserData?.fullName || 'User';
	const trimmedName = fullName.trim().split(" ");
	const gestationalDays = parsedUserData?.gestationalAge ? Number(parsedUserData.gestationalAge) : 0;
	const weeks = Math.floor(gestationalDays / 7);
	const days = gestationalDays % 7;
	let message = '';
	if (gestationalDays > 0) {
		message = `You are in Week ${weeks}${days > 0 ? `, Day ${days}` : ''} of your pregnancy.`;
	} else {
		message = 'Gestational age not set.';
	}

	return (
		<div className="w-full flex flex-col gap-4 py-4 px-4">
			<div className="w-full h-max flex justify-between items-center">
				<div>
					<h1 className="capitalize font-medium text-[18px] md:text-[36px]">Hello {trimmedName[0]} 👋</h1>
					<span className="text-gray-600 text-[12px] md:text-[14px]">{message}</span>
				</div>
				<div className="w-max h-10 rounded-lg">
					<button className="flex gap-1 items-center px-2 text-[12px] md:text-[16px] md:px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2" onClick={() => {window.alert("Data Shared!")}}>Share Data <BsSend className="text-white font-bold" />
					</button>
				</div>
			</div>
			<div className="w-full h-max">
				<ChildSnapshot />
			</div>
			<div>
				<MotherSnapshot />
			</div>
			<div>
				<Calender />
			</div>
			<div className="h-max">
				<DataManagement  />
			</div>
		</div>
	);
};

export default Dashboard;
