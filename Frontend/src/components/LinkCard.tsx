import { useState } from "react";
import { useUrlContext } from "../context/UrlContext";
import { Link } from "react-router-dom";
import { MdAnalytics } from "react-icons/md";
import { FaCopy, FaTrash, FaCheck } from "react-icons/fa";
import { toastInfo } from "../utils/toast";

type LinkCardProps = {
  originalUrl: string;
  shortUrl: string;
  clicks: number;
};

export default function LinkCard({
  originalUrl,
  shortUrl,
  clicks,
}: LinkCardProps) {
  const [copied, setCopied] = useState<boolean>(false);
  const [deleteRemind, setDeleteRemind] = useState<boolean>(false);
  const { deleteUrl } = useUrlContext();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toastInfo("Link copied 📋");
  };

  const getShortID = (shortUrl: string): string => {
    return new URL(shortUrl).pathname.replace("/", "");
  };

  const handleDelete = () => {
    const shortId = getShortID(shortUrl);
    deleteUrl(shortId);
  };

  return (
    <>
      {deleteRemind ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-sm rounded-lg bg-white dark:bg-gray-800 p-6 shadow-lg">
            <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
              Delete link?
            </h2>

            <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              This action cannot be undone. The link will be permanently
              deleted.
            </p>

            <div className="flex justify-end gap-3">
              <button
                className="rounded-md border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
                onClick={() => setDeleteRemind(false)}
              >
                Cancel
              </button>

              <button
                className="rounded-md bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700 transition-colors duration-300"
                onClick={() => {
                  handleDelete();
                  setDeleteRemind(false);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="border rounded-xl p-6 bg-white dark:bg-gray-800 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <p className="text-sm text-gray-500 truncate dark:text-gray-400 mb-2">
            {originalUrl}
          </p>

          <div className="flex items-center justify-between mb-4">
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-semibold dark:text-blue-400 hover:underline text-lg"
            >
              {shortUrl}
            </a>
            <div className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
              {clicks} clicks
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex gap-3">
              <button
                onClick={() => {
                  copyToClipboard(shortUrl);
                  setCopied(true);
                  setTimeout(() => {
                    setCopied(false);
                  }, 8000);
                }}
                className="px-4 py-2 rounded-lg bg-linear-to-r from-green-500 to-blue-500 text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2"
              >
                {copied ? <FaCheck /> : <FaCopy />}
                {copied ? "Copied!" : "Copy"}
              </button>
              <button
                onClick={() => setDeleteRemind((prev) => !prev)}
                className="px-4 py-2 rounded-lg border border-red-300 text-red-600 dark:border-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300 flex items-center gap-2"
              >
                <FaTrash />
                Delete
              </button>
            </div>
            <Link
              to={`/dashboard/analytics/${getShortID(shortUrl)}`}
              className="bg-linear-to-r from-purple-500 to-pink-500 text-white font-medium flex gap-2 items-center rounded-lg px-4 py-2 hover:shadow-lg transition-all duration-300"
            >
              <MdAnalytics size={18} />
              Analytics
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
