
import { SideBar } from "../components/sideBar/Index";
import { TopNav } from "../components/navBar/Index";
import { MainRoute } from "../routes/MainRoute";
import { SidebarProvider } from "../context/SidebarContext";

export const MainLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex w-full h-screen">
        <SideBar />
        <div className="flex-1 h-full flex flex-col overflow-hidden">
          <TopNav />
          <div className="flex-1 overflow-y-auto">
            <MainRoute />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
