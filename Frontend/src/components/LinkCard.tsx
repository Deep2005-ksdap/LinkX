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
    <div className="border rounded-xl p-4 bg-white dark:bg-gray-800 dark:border-gray-700">
      <p className="text-sm text-gray-500 truncate">
        {originalUrl}
      </p>

      <div className="mt-2 flex items-center justify-between">
        <a className="text-indigo-600 font-medium">
          {shortUrl}
        </a>
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {clicks} clicks
        </span>
      </div>

      <div className="mt-3 flex gap-3 text-sm">
        <button className="px-3 py-1 rounded-lg border">
          Copy
        </button>
        <button className="px-3 py-1 rounded-lg border">
          Delete
        </button>
      </div>
    </div>
  );
}
