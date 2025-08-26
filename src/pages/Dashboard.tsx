import { Calender } from "../components/dashboardComp/Calender";
import { ChildSnapshot } from "../components/dashboardComp/ChildSnapshot";
import { DataManagement } from "../components/dashboardComp/DataManagement";
import { MotherSnapshot } from "../components/dashboardComp/MotherSnapshot";
import { BsSend } from "react-icons/bs";


const Dashboard = () => {
	const userData = localStorage.getItem("userData");
	const parsedUserData = userData ? JSON.parse(userData) : null;
	const fullName = parsedUserData ? parsedUserData[0] : 'User';
	const trimmedName = fullName.trim().split(" ");
	const pregnancyMonths = parsedUserData ? parsedUserData[1] : '0';
	let message = '';
	switch (pregnancyMonths) {
		case '1':
			message = `you are in Week 4 of your pregnancy.`;
			break;
		case '2':
			message = `you are in Week 8 of your pregnancy.`;
			break;
		case '3':
			message = `you are in Week 12 of your pregnancy.`;
			break;
		case '4':
			message = `you are in Week 16 of your pregnancy.`;
			break;
		case '5':
			message = `you are in Week 20 of your pregnancy.`;
			break;
		case '6':
			message = `you are in Week 24 of your pregnancy.`;
			break;
		case '7':
			message = `you are in Week 28 of your pregnancy.`;
			break;
		case '8':
			message = `you are in Week 32 of your pregnancy.`;
			break;
		case '9':
			message = `you are in Week 36 of your pregnancy.`;
			break;
		case '10':
			message = `you are in Week 40 of your pregnancy.`;
			break;
		default:
			break;
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
