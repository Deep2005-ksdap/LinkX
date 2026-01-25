import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    <AnimatePresence>
      {deleteRemind ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-full max-w-sm rounded-lg bg-white dark:bg-gray-800 p-6 shadow-lg"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
              Delete link?
            </h2>

            <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              This action cannot be undone. The link will be permanently
              deleted.
            </p>

            <div className="flex justify-end gap-3">
              <motion.button
                className="rounded-md border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
                onClick={() => setDeleteRemind(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Cancel
              </motion.button>

              <motion.button
                className="rounded-md bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700 transition-colors duration-300"
                onClick={() => {
                  handleDelete();
                  setDeleteRemind(false);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Delete
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          className="border rounded-xl p-4 bg-white dark:bg-gray-800 dark:border-gray-500 shadow-sm hover:shadow-lg transition-shadow duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          whileHover={{ y: -2 }}
        >
          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
            {originalUrl}
          </p>

          <div className="mt-2 flex items-center justify-between">
            <a className="text-blue-600 font-medium dark:text-blue-400 hover:underline">
              {shortUrl}
            </a>
          </div>

          <div className="flex justify-between">
            <div className="mt-3 flex gap-3 text-sm">
              <motion.button
                onClick={() => {
                  copyToClipboard(shortUrl);
                  setCopied(true);
                  setTimeout(() => {
                    setCopied(false);
                  }, 8000);
                }}
                className="px-3 py-1 rounded-lg border bg-gray-600 text-white dark:text-gray-200 hover:bg-gray-700 transition-colors duration-300 flex items-center gap-1"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {copied ? <FaCheck /> : <FaCopy />}
                {copied ? "Copied" : "Copy"}
              </motion.button>
              <motion.button
                onClick={() => setDeleteRemind((prev) => !prev)}
                className="px-3 py-1 rounded-lg border text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-300 flex items-center gap-1"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaTrash />
                Delete
              </motion.button>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to={`/dashboard/analytics/${getShortID(shortUrl)}`}
                className="dark:text-gray-200 border flex gap-2 items-center dark:border-gray-600 mt-1 rounded-2xl px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
              >
                <MdAnalytics size={20} />
                View Analytics
              </Link>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
