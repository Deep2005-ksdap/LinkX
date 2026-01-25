import { createContext, useContext, useState } from "react";
import axios from "axios";
import type { UrlContextType, ShortUrl } from "../types/url";
import type { ReactNode } from "react";
import { toast } from "react-toastify";
import { toastError } from "../utils/toast";

const UrlContext = createContext<UrlContextType | undefined>(undefined);

interface UrlProviderProps {
  children: ReactNode;
}

const API = import.meta.env.VITE_BACKEND_API;

export function UrlProvider({ children }: UrlProviderProps) {
  const [urls, setUrls] = useState<ShortUrl[]>([]);
  const [refreshFlag, setRefreshFlag] = useState<boolean>(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createShortUrl = async (fullUrl: string): Promise<ShortUrl | null> => {
    const toastId = toast.loading("Creating short link...");

    try {
      setLoading(true);
      setError(null);

      const res = await axios.post(
        `${API}/shortURL`,
        { fullUrl },
        { withCredentials: true },
      );

      const data = res.data;
      if (!data.success) {
        setError(data.msg);
        toast.update(toastId, {
          render: data.msg,
          type: "error",
          isLoading: false,
          autoClose: 4000,
        });
        return null;
      }

      if (data.isAlreadyExist) {
        toast.update(toastId, {
          render: "you Own this Link Already...",
          type: "info",
          isLoading: false,
          autoClose: 4000,
        });
      } else {
        toast.update(toastId, {
          render: "Short link created successfully 🚀",
          type: "success",
          isLoading: false,
          autoClose: 4000,
        });
      }
      setRefreshFlag(true);

      return data;
    } catch (err: any) {
      const msg = err.response?.data?.msg || "Failed to create short URL";
      setError(msg);

      toast.update(toastId, {
        render: msg,
        type: "error",
        isLoading: false,
        autoClose: 4000,
      });

      return null;
    } finally {
      setLoading(false);
    }
  };

  const getMyUrls = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.get<{ allLinks: ShortUrl[] }>(`${API}/my-url`, {
        withCredentials: true,
      });

      const { allLinks } = res.data;
      setUrls(allLinks);
    } catch (error: any) {
      const msg = error.response?.data?.message || "Failed to fetch URLs";
      setError(msg);
      toastError(msg);
    } finally {
      setLoading(false);
    }
  };

  const deleteUrl = async (shortID: string): Promise<void> => {
    const toastId = toast.loading("Deleting link...");

    try {
      setLoading(true);
      setError(null);

      await axios.delete(`${API}/${shortID}`, {
        withCredentials: true,
      });

      toast.update(toastId, {
        render: "Link deleted successfully 🗑️",
        type: "success",
        isLoading: false,
        autoClose: 4000,
      });

      setRefreshFlag((prev) => !prev);
    } catch (error: any) {
      const msg = error.response?.data?.message || "Failed to delete link";
      setError(msg);

      toast.update(toastId, {
        render: msg,
        type: "error",
        isLoading: false,
        autoClose: 4000,
      });
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
