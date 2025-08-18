import { SideBar } from "../components/sideBar/Index";
import { TopNav } from "../components/navBar/Index";
import { MainRoute } from "../routes/MainRoute";

export const MainLayout = () => {
  return (
    <div className="flex max-h-screen w-full h-screen ">
      <div className="w-max h-full">
        <SideBar />
      </div>
      <div className="flex-1 h-full flex flex-col">
        <TopNav />
        <MainRoute />
      </div>
    </div>
  );
}
