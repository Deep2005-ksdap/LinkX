import { Link } from "react-router-dom";
import { FiAlertTriangle } from "react-icons/fi";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 text-center shadow-sm">
        
        <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900/30 mb-4">
          <FiAlertTriangle className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
        </div>

        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          404 — Page Not Found
        </h1>

        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          The page you’re looking for doesn’t exist or was moved.
        </p>

        <div className="mt-6 space-y-3">
          <Link
            to="/"
            className="block w-full py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
          >
            Go Home
          </Link>

          <Link
            to="/dashboard"
            className="block w-full py-2 rounded-lg border border-gray-300 dark:border-gray-600
                       text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
