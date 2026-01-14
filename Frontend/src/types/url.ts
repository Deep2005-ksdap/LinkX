import type { Dispatch, SetStateAction } from "react";

export interface ShortUrl {
  id?: string;
  shortID: string;
  owner?: string;
  fullUrl: string;
  updatedAt?: Date;
  createdAt?: Date;
}

export interface AnalyticsData {
  totalClicks: number;
  clicksByDate?: {
    date: string;
    count: number;
  }[];
}

export interface UrlContextType {
  urls: ShortUrl[];
  loading: boolean;
  error: string | null;
  refreshFlag: boolean;

  setRefreshFlag: Dispatch<SetStateAction<boolean>>;
  deleteUrl: (shortID: string) => Promise<void>;
  createShortUrl: (fullUrl: string) => Promise<ShortUrl | null>;
  getMyUrls: () => Promise<void>;
  getAnalytics: (shortID: string) => Promise<AnalyticsData | null>;
}
