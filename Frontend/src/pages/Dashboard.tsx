import LinkLists from "../components/LinkLists";
import { useUrlContext } from "../context/UrlContext";
import { useState } from "react";

export default function Dashboard() {
  const [url, setUrl] = useState<string>("");
  const [linkExist, setLinkExist] = useState<boolean>(false);
  const { createShortUrl, setRefreshFlag } = useUrlContext();

  const handleCreate = async () => {
    const res = await createShortUrl(url as string);
    if (res?.isAlreadyExist) {
      setLinkExist((prev) => !prev);
      setTimeout(() => {
        setLinkExist((prev) => !prev);
      }, 6000);
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
          {linkExist && (
            <p className="text-center rounded-xl font-bold mt-2 py-2 text-white bg-red-800/80">
              Link is Already Exist
            </p>
          )}
        </div>

        {/* Links list */}
        <LinkLists />
      </main>
    </>
  );
}
