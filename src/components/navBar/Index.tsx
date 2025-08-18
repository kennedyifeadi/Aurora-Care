import { useEffect } from "react";
import { SearchBar } from "./SearchBar"
import { RiNotification2Line } from "react-icons/ri";

export const TopNav = () => {
  const user = localStorage.getItem("userData");
  const userData = user ? JSON.parse(user) : null;
  const initials = userData ? userData[0].trim().split(" ") : ['U', 'U'];
  const fullName = userData ? userData[0] : 'User';
  useEffect(() => {
   console.log("User Data:", userData);
  }, [userData]);
  return (
    <div className="w-full h-16 border-b border-gray-200 flex items-center justify-between px-4">
      <SearchBar />
      <div className="flex gap-5">
        <div className="bg-[#f9fafb] rounded-lg border border-gray-200 cursor-pointer flex justify-center items-center h-10 w-10">
          <RiNotification2Line className="text-gray-500" size={20} />
        </div>
        <div className="flex w-max h-full gap-2 justify-center items-center">
          <h1 className="font-medium text-[18px] capitalize">{fullName}</h1>
          <span className="rounded-full h-10 w-10 bg-[#d87cdc] text-white uppercase font-medium text-[18px] flex justify-center items-center">
            {(initials[0]?.[0]) + (initials[1]?.[0] || '')}
          </span>
        </div>
      </div>
    </div>
  )
}
