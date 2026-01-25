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
    <div className="mt-8 space-y-4">
      {loading ? (
        <div className="flex items-center flex-col gap-2 py-10 dark:text-white font-semibold">
          <div className="h-6 w-6 animate-spin rounded-full dark:border-b-white border-2 border-t-transparent" />
          <p>Wait while Loading....</p>
        </div>
      ) : urls.length === 0 ? (
        <p className="text-center text-gray-500">No links created yet</p>
      ) : (
        urls?.map((url) => (
          <LinkCard
            key={url.id}
            originalUrl={url.fullUrl}
            shortUrl={`${API}/${url.shortID}`}
            clicks={12}
          />
        ))
      )}
    </div>
  );
};

export default LinkLists;
