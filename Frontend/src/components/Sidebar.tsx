import { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { BiSolidDashboard } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { IoClose, IoMenu, IoLogOut, IoSunnyOutline } from "react-icons/io5";
import { useAuthContext } from "../context/AuthContext";
import { FaMoon } from "react-icons/fa";
import { MdAnalytics, MdOutlineAnalytics } from "react-icons/md";

export default function Sidebar({ theme, setTheme }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
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
      <div className="md:hidden flex items-center justify-between px-4 py-3 border-b dark:border-gray-800">
        <h1 className="text-lg font-semibold dark:text-white">LinkX</h1>
        <button
          className="dark:text-gray-200"
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
          transform transition-transform duration-300
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b dark:text-gray-10000">
          <h2 className="text-xl font-semibold dark:text-white">LinkX</h2>
          <button className="md:hidden" onClick={() => setIsMobileOpen(false)}>
            <IoClose className="dark:text-white" size={22} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="px-4 py-4 space-y-1">
          <NavLink
            to="/dashboard"
            className={() => {
              const isActive = location.pathname.endsWith("/dashboard");
              return `flex items-center gap-3 px-3 py-2 rounded-lg text-sm
               ${
                 isActive
                   ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                   : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
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
              return `flex items-center gap-3 px-3 py-2 rounded-lg text-sm
               ${
                 isActive
                   ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                   : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
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
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg
                       text-sm text-gray-600 dark:text-gray-400
                       hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <CgProfile size={18} />
            Account
          </button>

          {/* Account Popup */}
          {isAccountOpen && (
            <div className="mt-2 rounded-lg border border-gray-400 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 p-3 text-sm">
              <p className="font-medium text-gray-900 dark:text-white">
                {user?.name}
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-xs">
                {user?.email}
              </p>
              <div className="flex px-2 mt-4 justify-between">
                <button
                  onClick={toggleTheme}
                  className="px-3 py-2 text-sm rounded-lg border dark:text-white dark:border-gray-700"
                >
                  {theme === "light" ? <FaMoon /> : <IoSunnyOutline />}
                </button>
                <button
                  onClick={handleLogout}
                  className="mt-3 flex font-bold items-center gap-1 text-red-500 hover:text-red-600"
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
