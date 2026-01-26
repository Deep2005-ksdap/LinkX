import { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { BiSolidDashboard } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { IoClose, IoMenu, IoLogOut, IoSunnyOutline } from "react-icons/io5";
import { useAuthContext } from "../context/AuthContext";
import { FaMoon } from "react-icons/fa";
import { MdAnalytics, MdOutlineAnalytics } from "react-icons/md";

type Theme = "light" | "dark";

interface SidebarProps {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}

export default function Sidebar({ theme, setTheme }: SidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const toggleTheme = () => {
    setTheme((prev: "dark" | "light") => (prev === "light" ? "dark" : "light"));
  };

  const { user, logout } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    setIsMobileOpen(false);
    navigate("/");
  };

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 border-b dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
        <h1 className="text-lg font-semibold dark:text-white">LinkX</h1>
        <button
          className="dark:text-gray-200 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          onClick={() => setIsMobileOpen(true)}
        >
          <IoMenu size={24} />
        </button>
      </div>

      {/* Overlay (mobile) */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static top-0 left-0 z-40
          h-screen w-64
          bg-white dark:bg-gray-900
          border-r dark:border-gray-800
          shadow-xl
          transform transition-transform duration-300
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b dark:border-gray-800 bg-linear-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
          <h2 className="text-xl font-semibold dark:text-white">LinkX</h2>
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={() => setIsMobileOpen(false)}
          >
            <IoClose className="dark:text-white" size={22} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="px-4 py-4 space-y-1">
          <NavLink
            to="/dashboard"
            className={() => {
              const isActive = location.pathname.endsWith("/dashboard");
              return `flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200
               ${
                 isActive
                   ? "bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-100 shadow-md"
                   : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:shadow-sm"
               }`;
            }}
          >
            <BiSolidDashboard size={18} />
            Dashboard
          </NavLink>
          <NavLink
            to="/dashboard/analytics"
            className={() => {
              const isActive = location.pathname.startsWith(
                "/dashboard/analytics",
              );
              return `flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200
               ${
                 isActive
                   ? "bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-100 shadow-md"
                   : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:shadow-sm"
               }`;
            }}
          >
            {theme === "dark" ? (
              <MdAnalytics size={20} />
            ) : (
              <MdOutlineAnalytics size={20} />
            )}
            Analytics
          </NavLink>
        </nav>

        {/* Bottom Section */}
        <div className="absolute bottom-0 w-full px-4 pb-4">
          {/* Account Button */}
          <button
            onClick={() => setIsAccountOpen(!isAccountOpen)}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-lg
                       text-sm text-gray-600 dark:text-gray-400
                       hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
          >
            <CgProfile size={18} />
            Account
          </button>

          {/* Account Popup */}
          {isAccountOpen && (
            <div className="mt-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 text-sm shadow-lg">
              <p className="font-medium text-gray-900 dark:text-white">
                {user?.fullname.firstname}
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-xs">
                {user?.email}
              </p>
              <div className="flex px-2 mt-4 justify-between">
                <button
                  onClick={toggleTheme}
                  className="px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  {theme === "light" ? <FaMoon /> : <IoSunnyOutline />}
                </button>
                <button
                  onClick={handleLogout}
                  className="flex font-bold items-center gap-1 text-red-500 hover:text-red-600 transition-colors"
                >
                  <IoLogOut />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
