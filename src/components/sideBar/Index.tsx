import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { TbHeartbeat } from "react-icons/tb";
import { CiGrid42 } from "react-icons/ci";
import { LuBaby } from "react-icons/lu";
import { GrUserFemale } from "react-icons/gr";
import { MdOutlineDateRange } from "react-icons/md";
import { LuHistory } from "react-icons/lu";
import AuroraBirth from "/Aurora-Care.png"
import { BsReverseLayoutSidebarReverse } from "react-icons/bs";





import { useLocation, Link } from "react-router-dom";

export const SideBar = () => {
  const location = useLocation();
  const [monitorOpen, setMonitorOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
    const [showLogoText, setShowLogoText] = useState(true);

  // Handle logo text transition with delay
  const handleCollapse = () => {
    if (collapsed) {
      setCollapsed(false);
      setShowLogoText(false);
      setTimeout(() => {
        setShowLogoText(true);
      }, 215);
    } else {
      setCollapsed(true);
      setShowLogoText(false);
    }
  };
  const sideBarOptions = [
    {
      label: "Dashboard",
      icon: <CiGrid42 size={20} />,
      link: "/dashboard"
    },
    {
      label: "Monitor",
      icon: <TbHeartbeat size={20} />,
      link: "/monitor",
      options: [
        {
          label: "Mother",
          icon: <GrUserFemale size={18} />,
          link: "/monitor/mother"
        },
        {
          label: "Child",
          icon: <LuBaby size={18} />,
          link: "/monitor/child"
        }
      ],
    },
    {
      label: "Plan",
      icon: <MdOutlineDateRange size={20} />,
      link: "/plan"
    },
    {
      label: "History",
      icon: <LuHistory size={20} />,
      link: "/history"
    }
  ];

  return (
    <div className={`h-full bg-white flex flex-col gap-6 justify-between border-r border-gray-200 px-2 transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'}`}>
      <div className={`font-bold text-xl text-[#2a3883] flex items-center justify-between py-2 px-2`}>
        <div className="flex items-center gap-2">
          {!collapsed ? (
            <>
              <img src={AuroraBirth} alt="" className="object-cover w-12 h-12" />
              {showLogoText && <span className="ml-1">Aurora Care</span>}
            </>
          ) : (
            <span className="text-2xl font-extrabold">AC</span>
          )}
        </div>
        <button
          className="ml-2 p-2 rounded hover:bg-gray-100"
          onClick={handleCollapse}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <BsReverseLayoutSidebarReverse className={`transition-transform`} />
        </button>
      </div>
      <div className="flex-1 flex gap-2 flex-col items-center">
        {sideBarOptions.map(option => {
          const isActive = location.pathname.startsWith(option.link);
          if (option.label === "Monitor") {
            return (
              <div key={option.label} className="relative flex flex-col gap-2 w-full items-center">
                <button
                  className={`w-full ${collapsed && "justify-center"} flex items-center justify-between px-2 rounded-lg py-3 text-left border-2 hover:bg-[#fcf2fa] ${isActive ? "bg-[#fcf2fa] border-2 border-[#f0e2fe] text-[#8d4ed6]" : "text-black border-white"}`}
                  onClick={() => setMonitorOpen(!monitorOpen)}
                >
                  <span className="flex items-center gap-3">
                    {option.icon}
                    {!collapsed && <span className="font-medium">{option.label}</span>}
                  </span>
                  {!collapsed && <FaChevronDown className={`ml-auto transition-transform ${monitorOpen ? "rotate-180" : "rotate-0"}`} />}
                </button>
                {monitorOpen && (
                  <div className="pl-6 w-full flex flex-col gap-2">
                    {option.options?.map(sub => (
                      <Link
                        to={sub.link}
                        key={sub.label}
                        className={`flex items-center gap-2 py-2 px-2 rounded-lg border-2  hover:bg-[#fcf2fa] ${location.pathname === sub.link ? "bg-[#fcf2fa] text-[#8d4ed6] border-2 border-[#f0e2fe]" : "text-black border-white"}`}
                      >
                        {sub.icon}
                       {!collapsed && <span>{sub.label}</span>}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          }
          return (
            <Link
              to={option.link}
              key={option.label}
              className={`flex items-center border-2 gap-3 px-2 py-3 rounded-lg ${collapsed && "justify-center"} font-medium hover:bg-[#fcf2fa] w-full ${isActive ? "bg-[#fcf2fa]  border-[#f0e2fe] border-2 text-[#8d4ed6]" : "text-black border-white"}`}
            >
              {option.icon}
              {!collapsed && <span>{option.label}</span>}
            </Link>
          );
        })}
      </div>
      <div className="p-4 w-full flex justify-center">
        {!collapsed && (
          <ul>
            <li className="text-gray-500 cursor-pointer hover:text-[#8d4ed6]">Logout</li>
          </ul>
        )}
      </div>
    </div>
  );
};
