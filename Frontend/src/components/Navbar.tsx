import { IoSunnyOutline } from "react-icons/io5";
import { FaMoon } from "react-icons/fa";
import { Link } from "react-router-dom";

type Theme = "light" | "dark";

interface NavbarProps {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}

export default function Navbar({ theme, setTheme }: NavbarProps) {
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <header className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm dark:border-b-gray-600 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-xl dark:text-white font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          LinkX
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600 dark:text-gray-300">
          <a
            href="#features"
            className="hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
          >
            Features
          </a>
          <a className="hover:text-gray-900 dark:hover:text-white transition-colors duration-300">
            Pricing
          </a>
          <a
            target="_blank"
            href="https://github.com/Deep2005-ksdap/LinkX"
            className="hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
          >
            Docs
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
          >
            {theme === "light" ? <FaMoon /> : <IoSunnyOutline />}
          </button>

          <Link
            to={"/dashboard"}
            className="px-4 py-2 rounded-lg bg-linear-to-r from-blue-600 to-purple-600 text-white font-medium shadow-md hover:shadow-lg transition-all duration-300"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
