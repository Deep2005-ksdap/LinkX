import { createContext, useContext, useState } from "react";
import axios from "axios";
import type { UrlContextType, ShortUrl } from "../types/url";
import type { ReactNode } from "react";

const UrlContext = createContext<UrlContextType | undefined>(undefined);

interface UrlProviderProps {
  children: ReactNode;
}

export function UrlProvider({ children }: UrlProviderProps) {
  const [urls, setUrls] = useState<ShortUrl[]>([]);
  const [refreshFlag, setRefreshFlag] = useState<boolean>(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createShortUrl = async (fullUrl: string): Promise<ShortUrl | null> => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.post(
        "http://localhost:3000/shortURL",
        { fullUrl },
        { withCredentials: true }
      );

      return res.data; // { shortId, shortUrl, fullUrl }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create short URL");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getMyUrls = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get<ShortUrl[]>("http://localhost:3000/my-url", {
        withCredentials: true,
      });
      const { allLinks } = res.data as { allLinks: ShortUrl[] };
      setUrls(allLinks);
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to fetch URLs");
    } finally {
      setLoading(false);
    }
  };

  const deleteUrl = async (shortID: string): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.delete<String>(
        `http://localhost:3000/${shortID}`,
        {
          withCredentials: true,
        }
      );
      setRefreshFlag((prev) => !prev);
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to Delete");
    } finally {
      setLoading(false);
    }
  };

  const value: UrlContextType = {
    loading,
    error,
    urls,
    refreshFlag,
    setRefreshFlag,
    getMyUrls,
    deleteUrl,
    createShortUrl,
  };

  return <UrlContext.Provider value={value}>{children}</UrlContext.Provider>;
}

export function useUrlContext() {
  const context = useContext(UrlContext);
  if (!context) {
    throw new Error("useUrlContext must be used inside UrlProvider");
  }
  return context;
}
