import { useState } from "react";
import { Link } from "react-router-dom";
import { BiSolidDashboard } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { IoIosLogOut } from "react-icons/io";

export default function Sidebar() {
  const [activeTab, setActiveTab] = useState<1 | 2>(1);
  return (
    <aside className="w-64 min-h-screen border-r bg-white dark:bg-gray-900 dark:border-gray-800 hidden md:block">
      <div className="p-6">
        <h2 className="text-xl font-semibold">LinkX</h2>
      </div>

      <nav className="px-4 space-y-1 text-sm text-gray-600 dark:text-gray-400">
        <Link
          onClick={() => setActiveTab(1)}
          to={"/dashboard"}
          className={`block px-3 py-2 rounded-lg ${
            activeTab === 1 && "bg-gray-100"
          } dark:bg-gray-800 text-gray-900 ${
            activeTab === 1 && "dark:text-white"
          }`}
        >
          <BiSolidDashboard />
          Dashboard
        </Link>
        <Link
          onClick={() => setActiveTab(2)}
          to={"/profile"}
          className={`block px-3 py-2 rounded-lg ${
            activeTab === 2 && "bg-gray-100"
          } hover:bg-gray-100 dark:hover:bg-gray-800 ${
            activeTab === 2 && "dark:text-white"
          }`}
        >
          <CgProfile />
          Profile
        </Link>
        <a className="block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
          <IoIosLogOut />
          Logout
        </a>
      </nav>
    </aside>
  );
}
