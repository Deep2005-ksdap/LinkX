import LinkLists from "../components/LinkLists";
import { useUrlContext } from "../context/UrlContext";
import { useState } from "react";
import { FaLink } from "react-icons/fa";

export default function Dashboard() {
  const [url, setUrl] = useState<string>("");
  const [linkExist, setLinkExist] = useState<boolean>(false);
  const { createShortUrl, setRefreshFlag, loading, error, setError } =
    useUrlContext();

  const handleCreate = async () => {
    const data = await createShortUrl(url as string);

    if (data?.isAlreadyExist) {
      setLinkExist((prev) => !prev);
      setTimeout(() => {
        setLinkExist((prev) => !prev);
      }, 6000);
    }
    // Clear error after 5 seconds if it exists
    if (error) {
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
    setRefreshFlag(true);
    setUrl("");
  };

  return (
    <>
      <h1 className="text-center md:hidden dark:text-gray-100 font-semibold mt-2 py-2">
        Dashboard
      </h1>
      <main className="flex-1 py-2 px-6 sm:p-6 overflow-y-auto max-h-screen">
        {/* Shorten box */}
        <div className="p-6 border rounded-xl bg-white dark:bg-gray-800 dark:border-gray-700 shadow-lg">
          <h2 className="font-medium dark:text-gray-200 text-lg">
            Shorten a new link
          </h2>
          <div className="mt-4 flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste your long URL here"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
            />
            <button
              disabled={url === ""}
              onClick={handleCreate}
              className={`px-6 py-3 rounded-lg bg-linear-to-r from-blue-600 to-purple-600 text-white font-medium shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${loading ? "cursor-progress" : "cursor-pointer"}`}
            >
              {!loading ? (
                <>
                  <FaLink className="text-sm" />
                  Shorten
                </>
              ) : (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              )}
            </button>
          </div>
          {linkExist && (
            <p className="text-center rounded-xl font-bold mt-4 py-3 text-white bg-linear-to-r from-red-500 to-red-600 shadow-md">
              Link Already Exists
            </p>
          )}
          {error && (
            <p className="text-center rounded-xl font-bold mt-4 py-3 text-red-100 bg-linear-to-r from-red-500 to-red-600 shadow-md">
              {error}
            </p>
          )}
        </div>

        {/* Links list */}
        <LinkLists />
      </main>
    </>
  );
}
