import { useEffect } from "react";
import { useUrlContext } from "../context/UrlContext";
import LinkCard from "./LinkCard";

const LinkLists = () => {
  const BASE_SHORT_URL = "http://localhost:3000";
  const { urls, loading, getMyUrls, refreshFlag } = useUrlContext();

  useEffect(() => { 
    getMyUrls();
  }, [refreshFlag]);

  return (
    <div className="mt-8 space-y-4">
      {loading ? (
        <div className="flex justify-center py-10">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-t-transparent" />
        </div>
      ) : urls.length === 0 ? (
        <p className="text-center text-gray-500">No links created yet</p>
      ) : (
        urls?.map((url) => (
          <LinkCard
            key={url.id}
            originalUrl={url.fullUrl}
            shortUrl={`${BASE_SHORT_URL}/${url.shortID}`}
            clicks={12}
          />
        ))
      )}
    </div>
  );
};

export default LinkLists;
