import { useState, useRef, useEffect } from "react";
import { FiX } from "react-icons/fi";
import { useSidebar } from "../../context/SidebarContext";
import { FaChevronDown } from "react-icons/fa";
import { TbHeartbeat } from "react-icons/tb";
import { CiGrid42 } from "react-icons/ci";
import { LuBaby } from "react-icons/lu";
import { GrUserFemale } from "react-icons/gr";
import { MdOutlineDateRange } from "react-icons/md";
import { LuHistory } from "react-icons/lu";
import AuroraBirth from "/Aurora-Care.png";
import { BsReverseLayoutSidebarReverse } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { useLocation, Link, useNavigate } from "react-router-dom";

export const SideBar = () => {
  const location = useLocation();
  const [monitorOpen, setMonitorOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [showLogoText, setShowLogoText] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { isOpen, closeSidebar } = useSidebar();
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        closeSidebar();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, closeSidebar]);

  const handleCollapse = () => {
    if (collapsed) {
      setCollapsed(false);
      setShowLogoText(false);
      setTimeout(() => {
        setShowLogoText(true);
      }, 300);
    } else {
      setCollapsed(true);
      setShowLogoText(false);
    }
  };

  const handleReset = () => {
    localStorage.removeItem("userData");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/dashboard");
      window.location.reload();
    }, 2000);
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

  const sidebarBase = "bg-white flex flex-col gap-6 justify-between border-r border-gray-200 px-2 transition-all duration-300";
  const desktopClass = `${sidebarBase} h-full ${collapsed ? 'w-20' : 'w-64'} hidden lg:flex`;
  const mobileClass = `${sidebarBase} fixed top-0 left-0 h-screen w-64 z-50 shadow-lg lg:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'} transform`;

  const renderSidebarContent = (isMobile: boolean = false) => (
    <>
      <div className={`font-bold text-xl text-[#2a3883] flex items-center justify-between py-2 px-2`}>
            <div
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              className="flex items-center gap-2">
              {!collapsed || isMobile ? (
                <>
                  <img src={AuroraBirth} alt="" className="object-cover w-12 h-12" />
                  {showLogoText && <span className="ml-1">Aurora Care</span>}
                </>
              ) : (
                <>
                  {!isHovering ? <img src={AuroraBirth} alt="" className={`object-cover w-10 h-10`} /> : <button
                    className="ml-2 p-2 rounded hover:bg-gray-100 cursor-pointer"
                    onClick={handleCollapse}
                    aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                  >
                    <BsReverseLayoutSidebarReverse className={`transition-transform`} size={'23.3px'} />
                  </button>}
                </>
              )}
            </div>
          {/* {isMobile ? <span className="ml-1">Aurora Care</span> : (showLogoText && <span className="ml-1">Aurora Care</span>)} */}
        {isMobile ? (
          <button className="ml-2 p-2 rounded hover:bg-gray-100 cursor-pointer" onClick={closeSidebar} aria-label="Close sidebar">
            <FiX size={28} />
          </button>
        ) : (
          !collapsed && (
            <button
              className="ml-2 p-2 rounded hover:bg-gray-100 cursor-pointer"
              onClick={handleCollapse}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <BsReverseLayoutSidebarReverse className={`transition-transform`} />
            </button>
          )
        )}
      </div>
      <div className="flex-1 flex gap-2 flex-col items-center">
        {sideBarOptions.map(option => {
          const isActive = location.pathname.startsWith(option.link);
          if (option.label === "Monitor") {
            return (
              <div key={option.label} className="relative flex flex-col gap-2 w-full items-center">
                <button
                  className={`w-full ${collapsed && !isMobile ? "justify-center" : ""} flex items-center justify-between px-2 rounded-lg py-3 text-left border-2 hover:bg-[#fcf2fa] ${isActive ? "bg-[#fcf2fa] border-2 border-[#f0e2fe] text-[#8d4ed6]" : "text-black border-white"}`}
                  onClick={() => setMonitorOpen(!monitorOpen)}
                >
                  <span className="flex items-center gap-3">
                    {option.icon}
                    {(!collapsed || isMobile) && <span className="font-medium">{option.label}</span>}
                  </span>
                  {(!collapsed || isMobile) && <FaChevronDown className={`ml-auto transition-transform ${monitorOpen ? "rotate-180" : "rotate-0"}`} />}
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
                        {(!collapsed || isMobile) && <span>{sub.label}</span>}
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
              className={`flex items-center border-2 gap-3 px-2 py-3 rounded-lg ${collapsed && !isMobile ? "justify-center" : ""} font-medium hover:bg-[#fcf2fa] w-full ${isActive ? "bg-[#fcf2fa]  border-[#f0e2fe] border-2 text-[#8d4ed6]" : "text-black border-white"}`}
            >
              {option.icon}
              {(!collapsed || isMobile) && <span>{option.label}</span>}
            </Link>
          );
        })}
      </div>
      <div className={`w-full flex items-center gap-3 px-2 py-3 font-medium text-[#e11768] cursor-pointer hover:bg-[#fcf2fa] mb-2 rounded-lg ${collapsed && !isMobile ? "justify-center" : ""}`} onClick={handleReset}>
        {loading ? <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
        </svg> : <FiLogOut size={20} />}
        {(!collapsed && (<span className="flex"> Logout</span>))}
      </div>
    </>
  );

  return (
    <>
      <div className={desktopClass}>{renderSidebarContent(false)}</div>
      <div ref={sidebarRef} className={mobileClass}>{renderSidebarContent(true)}</div>
    </>
  );
};
