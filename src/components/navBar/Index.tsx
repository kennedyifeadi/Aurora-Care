
import { useEffect } from "react";
import { SearchBar } from "./SearchBar";
import { RiNotification2Line } from "react-icons/ri";
import { FiMenu } from "react-icons/fi";
import { useSidebar } from "../../context/SidebarContext";

export const TopNav = () => {
  const user = localStorage.getItem("userData");
  const userData = user ? JSON.parse(user) : null;
  const initials = userData ? userData[0].trim().split(" ") : ['U', 'U'];
  const fullName = userData ? userData[0] : 'User';
  const truncatedName = fullName.length > 10 ? fullName.slice(0, 10) + '...' : fullName;
  const { openSidebar, isOpen } = useSidebar();
  useEffect(() => {
    console.log("User Data:", userData);
  }, [userData]);
  return (
    <div className="w-full h-[8%] border-b border-gray-200 flex items-center justify-between px-4 relative">
      {/* Mobile menu icon */}
      <div className="lg:hidden flex items-center mr-2">
        {!isOpen && (
          <button onClick={openSidebar} aria-label="Open sidebar">
            <FiMenu size={28} className="text-[#2a3883]" />
          </button>
        )}
      </div>
      <SearchBar />
      <div className="flex gap-5">
        <div className="bg-[#f9fafb] rounded-lg border border-gray-200 cursor-pointer flex justify-center items-center h-10 w-10">
          <RiNotification2Line className="text-gray-500" size={20} />
        </div>
        <div className="flex w-max h-full gap-2 justify-center items-center">
          {/* Mobile: truncated, Desktop: full name */}
          <h1 className="font-medium text-[14px] md:text-[18px] capitalize block lg:hidden">{truncatedName}</h1>
          <h1 className="font-medium text-[14px] md:text-[18px] capitalize hidden lg:block">{fullName}</h1>
          <span className="rounded-full h-10 w-10 bg-[#d87cdc] text-white uppercase font-medium text-[18px] flex justify-center items-center">
            {(initials[0]?.[0]) + (initials[1]?.[0] || '')}
          </span>
        </div>
      </div>
    </div>
  );
}
