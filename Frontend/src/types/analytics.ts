export interface AnalyticsData {
  totalClicks: number;
  clicksByDate?: {
    date: string;
    count: number;
  }[];
}

export interface AnalyticsContextType {
  loading: boolean;
  error: string | null;
  getPerLinkAnalytics: (shortID: string) => Promise<AnalyticsData | null>;
}
