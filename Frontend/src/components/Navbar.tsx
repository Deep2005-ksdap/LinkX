import { useState } from "react";
import { IoSunnyOutline } from "react-icons/io5";
import { FaMoon } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [dark, setDark] = useState<boolean>(false);
  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setDark((prev) => !prev);
  };

  return (
    <header className="border-b bg-white dark:bg-gray-900 dark:border-b-gray-600">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-xl dark:text-white font-semibold">LinkX</div>

        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600 dark:text-gray-300">
          <a className="hover:text-gray-900 dark:hover:text-white">Features</a>
          <a className="hover:text-gray-900 dark:hover:text-white">Pricing</a>
          <a className="hover:text-gray-900 dark:hover:text-white">Docs</a>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="px-3 py-2 text-sm rounded-lg border dark:text-white dark:border-gray-700"
          >
            {dark ? <FaMoon /> : <IoSunnyOutline />}
          </button>

          <Link to={"/dashboard"} className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
