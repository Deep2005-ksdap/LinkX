import { useState } from "react";
import { useUrlContext } from "../context/UrlContext";
import { Link } from "react-router-dom";
import { MdAnalytics } from "react-icons/md";
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

  return deleteRemind ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-2 text-lg font-semibold text-gray-900">
          Delete link?
        </h2>

        <p className="mb-4 text-sm text-gray-600">
          This action cannot be undone. The link will be permanently deleted.
        </p>

        <div className="flex justify-end gap-3">
          <button
            className="rounded-md border px-4 py-2 text-sm"
            onClick={() => setDeleteRemind(false)}
          >
            Cancel
          </button>

          <button
            className="rounded-md bg-red-600 px-4 py-2 text-sm text-white"
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
    <div className="border rounded-xl p-4 bg-white dark:bg-gray-800 dark:border-gray-500">
      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
        {originalUrl}
      </p>

      <div className="mt-2 flex items-center justify-between">
        <a className="text-indigo-600 font-medium dark:text-blue-600">
          {shortUrl}
        </a>
        {/* <span className="text-sm text-gray-600 dark:text-gray-400">
          {clicks} clicks
        </span> */}
      </div>

      <div className="flex  justify-between">
        <div className="mt-3 flex gap-3 text-sm">
          <button
            onClick={() => {
              copyToClipboard(shortUrl);
              setCopied(true);
              setTimeout(() => {
                setCopied(false);
              }, 8000);
            }}
            className="px-3 py-1 rounded-lg border bg-gray-600 text-white dark:text-gray-200"
          >
            {copied ? "Copied ✔️" : "Copy"}
          </button>
          <button
            onClick={() => setDeleteRemind((prev) => !prev)}
            className="px-3 py-1 rounded-lg border text-red-500 dark:text-red-400"
          >
            Delete
          </button>
        </div>
        <Link
          to={`/dashboard/analytics/${getShortID(shortUrl)}`}
          className="dark:text-gray-200 border flex gap-2 items-center dark:border-gray-600 mt-1 rounded-2xl px-2 py-2"
        >
          <MdAnalytics size={20} />
          view Analytics
        </Link>
      </div>
    </div>
  );
}
