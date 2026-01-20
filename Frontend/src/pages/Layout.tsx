import { FiLock } from "react-icons/fi";
import Sidebar from "../components/Sidebar";
import { useAuthContext } from "../context/AuthContext";
import { Outlet } from "react-router-dom";

type Theme = "light" | "dark";

interface LayoutProps {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}

const Layout = ({ theme, setTheme }: LayoutProps) => {
  const { isAuthenticated } = useAuthContext();

  return isAuthenticated ? (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar theme={theme} setTheme={setTheme} />

      <Outlet />
    </div>
  ) : (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 text-center shadow-sm">
        <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30 mb-4">
          <FiLock className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
        </div>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Access Restricted
        </h2>

        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          You need to be logged in to view your dashboard.
        </p>

        <div className="mt-6 space-y-3">
          <a
            href="/login"
            className="block w-full py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
          >
            Go to Login
          </a>

          <a
            href="/register"
            className="block w-full py-2 rounded-lg border border-gray-300 dark:border-gray-600
                       text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            Create an Account
          </a>
        </div>
      </div>
    </div>
  );
};

export default Layout;
