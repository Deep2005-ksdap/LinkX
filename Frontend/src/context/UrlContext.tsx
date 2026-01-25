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
        { withCredentials: true },
      );

      const data = res.data;
      if (!data.success) {
        setError(data.msg);
        return null;
      }
      return data;
    } catch (err: any) {
      setError(err.response?.data?.msg || "Failed to create short URL");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getMyUrls = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get<{ allLinks: ShortUrl[] }>(
        "http://localhost:3000/my-url",
        {
          withCredentials: true,
        },
      );
      const { allLinks } = res.data;
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
      await axios.delete(`http://localhost:3000/${shortID}`, {
        withCredentials: true,
      });
      setRefreshFlag((prev) => !prev);
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to Delete");
    } finally {
      setLoading(false);
    }
  };

  const value: UrlContextType = {
    loading,
    urls,
    error,
    setError,
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
