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
  return (
    <div className="border rounded-xl p-4 bg-white dark:bg-gray-800 dark:border-gray-500">
      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
        {originalUrl}
      </p>

      <div className="mt-2 flex items-center justify-between">
        <a className="text-indigo-600 font-medium dark:text-blue-600">
          {shortUrl}
        </a>
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {clicks} clicks
        </span>
      </div>

      <div className="mt-3 flex gap-3 text-sm">
        <button className="px-3 py-1 rounded-lg border bg-gray-600 text-white dark:text-gray-200">
          Copy
        </button>
        <button className="px-3 py-1 rounded-lg border text-red-500 dark:text-red-400">
          Delete
        </button>
      </div>
    </div>
  );
}
