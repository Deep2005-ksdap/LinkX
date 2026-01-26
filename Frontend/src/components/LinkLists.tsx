import { useEffect } from "react";
import { useUrlContext } from "../context/UrlContext";
import LinkCard from "./LinkCard";

const LinkLists = () => {
  const API = import.meta.env.VITE_BACKEND_API;
  const { urls, loading, getMyUrls, refreshFlag } = useUrlContext();

  useEffect(() => {
    getMyUrls();
  }, [refreshFlag]);

  return (
    <div className="mt-8 space-y-6">
      {loading ? (
        <div className="flex flex-col items-center justify-center gap-4 py-16">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 dark:text-gray-400 font-medium">
            Loading your links...
          </p>
        </div>
      ) : urls.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔗</div>
          <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">
            No links created yet
          </p>
          <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
            Start by shortening your first URL above!
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {urls?.map((url) => (
            <LinkCard
              key={url.id}
              originalUrl={url.fullUrl}
              shortUrl={`${API}/${url.shortID}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default LinkLists;
