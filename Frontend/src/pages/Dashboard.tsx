import Sidebar from "../components/Sidebar";
import { useAuthContext } from "../context/AuthContext";
import { FiLock } from "react-icons/fi";
import LinkLists from "../components/LinkLists";
import { useUrlContext } from "../context/UrlContext";
import { useState } from "react";

export default function Dashboard({ theme, setTheme }) {
  const [url, setUrl] = useState<string>("");
  const { isAuthenticated } = useAuthContext();
  const { createShortUrl, setRefreshFlag } = useUrlContext();

  const handleCreate = async () => {
    const res = await createShortUrl(url as string);
    console.log(res);
    setRefreshFlag(true);
    setUrl("");
  };

  return isAuthenticated ? (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar theme={theme} setTheme={setTheme} />
      <h1 className="text-center md:hidden dark:text-gray-100 font-semibold mt-2 py-2">
        Dashboard
      </h1>
      <main className="flex-1 py-2 px-6 sm:p-6 overflow-y-auto max-h-screen">
        {/* Shorten box */}
        <div className="p-2 border rounded-xl bg-white dark:bg-gray-800 dark:border-gray-700">
          <h2 className="font-medium dark:text-gray-200">Shorten a new link</h2>
          <div className="mt-3 flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste your long URL here"
              className="flex-1 px-4 py-2 rounded-lg dark:text-white border bg-transparent focus:outline-none focus:ring-2 focus:placeholder-gray-900 dark:focus:ring-gray-400 dark:placeholder-gray-400"
            />
            <button
              onClick={handleCreate}
              className="px-5 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Shorten
            </button>
          </div>
        </div>

        {/* Links list */}
        <LinkLists />
      </main>
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
}
