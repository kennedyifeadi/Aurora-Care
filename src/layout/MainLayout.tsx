
import { SideBar } from "../components/sideBar/Index";
import { TopNav } from "../components/navBar/Index";
import { MainRoute } from "../routes/MainRoute";
import { SidebarProvider } from "../context/SidebarContext";

export const MainLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex max-h-screen w-full h-screen ">
        <SideBar />
        <div className="flex-1 h-full flex flex-col">
          <TopNav />
          <MainRoute />
        </div>
      </div>
    </SidebarProvider>
  );
}
