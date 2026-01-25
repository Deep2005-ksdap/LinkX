import { createContext, useContext, useState, type ReactNode } from "react";
import type {
  AnalyticsContextType,
  AnalyticsData,
  OverallAnalyticsData,
} from "../types/analytics";
import axios from "axios";

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(
  undefined,
);

interface AnalyticsProviderProps {
  children: ReactNode;
}

const API = import.meta.env.VITE_BACKEND_API;

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getPerLinkAnalytics = async (
    shortID: string,
  ): Promise<AnalyticsData | null> => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.get(
        `${API}/analytics/${shortID}`,
        { withCredentials: true },
      );

      return res.data; // { totalClicks, clicksByDate }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to load analytics");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getOverallAnalytics =
    async (): Promise<OverallAnalyticsData | null> => {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get(
          `${API}/analytics/over-all`,
          { withCredentials: true },
        );

        return res.data;
      } catch (err: any) {
        setError(
          err.response?.data?.message || "Failed to load overall analytics",
        );
        return null;
      } finally {
        setLoading(false);
      }
    };

  const value: AnalyticsContextType = {
    loading,
    error,
    getPerLinkAnalytics,
    getOverallAnalytics,
  };

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export function useAnalyticsContext() {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error(
      "useAnalyticsContext must be used inside AnalyticsProvider",
    );
  }
  return context;
}
