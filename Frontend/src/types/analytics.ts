export interface AnalyticsData {
  totalClicks: number;
  uniqueVisitors: number;
  lastClickedAt: string | null;
  clicksByDate: clicksByDate[];
  referrerClicks: {
    referrer: string;
    clicks: number;
  }[];
  shortUrl: string;
  originalUrl: string;
  createdAt: string;
}

export interface clicksByDate {
  date: string;
  clicks: number;
}

export interface OverallAnalyticsData {
  totalLinks: number;
  kpis: {
    totalClicks: number;
    todayClicks: number;
    uniqueIPs: number;
  };
  clickOverTime: clicksByDate[];
  trafficSources: {
    source: string;
    clicks: number;
  }[];
  topLinks: {
    shortID: string;
    clicks: number;
    lastClick: string;
  }[];
}

export interface AnalyticsContextType {
  loading: boolean;
  error: string | null;
  getPerLinkAnalytics: (shortID: string) => Promise<AnalyticsData | null>;
  getOverallAnalytics: () => Promise<OverallAnalyticsData | null>;
}
