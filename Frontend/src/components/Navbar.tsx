import { motion } from "framer-motion";
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
    <motion.header
      className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm dark:border-b-gray-600 sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <motion.div
          className="text-xl dark:text-white font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          whileHover={{ scale: 1.05 }}
        >
          LinkX
        </motion.div>

        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600 dark:text-gray-300">
          <motion.a
            href="#features"
            className="hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
          >
            Features
          </motion.a>
          <motion.a
            className="hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
          >
            Pricing
          </motion.a>
          <motion.a
            target="_blank"
            href="https://github.com/Deep2005-ksdap/LinkX"
            className="hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
          >
            Docs
          </motion.a>
        </nav>

        <div className="flex items-center gap-3">
          <motion.button
            onClick={toggleTheme}
            className="px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {theme === "light" ? <FaMoon /> : <IoSunnyOutline />}
          </motion.button>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to={"/dashboard"}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium shadow-md hover:shadow-lg transition-all duration-300"
            >
              Get Started
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}
