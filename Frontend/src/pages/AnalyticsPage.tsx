import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useAnalyticsContext } from "../context/AnalyticsContext";
import type { OverallAnalyticsData } from "../types/analytics";

const COLORS = ["#2563eb", "#16a34a", "#f59e0b", "#ef4444"];
const API = import.meta.env.VITE_BACKEND_API;

export default function OverallAnalytics() {
  const { getOverallAnalytics, loading, error } = useAnalyticsContext();
  const [data, setData] = useState<OverallAnalyticsData | null>(null);

  const fetchData = async () => {
    const result = await getOverallAnalytics();
    if (result) {
      setData(result);
    }
  };

  useEffect(() => {
    fetchData();
    // Poll every 30 seconds for real-time updates
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading && !data) {
    return (
      <div className="p-6 h-screen w-full flex flex-col gap-4 items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full dark:border-b-white border-2 border-t-transparent" />
        <div className="text-xl dark:text-white">Loading analytics...</div>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="p-6 h-screen w-full flex items-center justify-center">
        <div className="text-xl text-red-500">Error: {error}</div>
      </div>
    );
  }

  const summary = data
    ? {
        totalLinks: data.totalLinks,
        totalClicks: data.kpis.totalClicks,
        todayClicks: data.kpis.todayClicks,
        uniqueIPs: data.kpis.uniqueIPs,
      }
    : {
        totalLinks: 0,
        totalClicks: 0,
        todayClicks: 0,
        uniqueIPs: 0,
      };

  const clicksOverTime = data ? data.clickOverTime : [];
  const referrerData = data
    ? data.trafficSources.map((item) => ({
        name: item.source,
        value: item.clicks,
      }))
    : [];
  const topLinks = data
    ? data.topLinks.map((link) => ({
        shortID: link.shortID,
        clicks: link.clicks,
        lastClick: link.lastClick
          ? new Date(link.lastClick).toLocaleString()
          : "Never",
      }))
    : [];

  return (
    <div className="p-6 h-screen w-full overflow-y-auto space-y-8 dark:text-white">
      {/* Heading */}
      <h1 className="text-2xl font-semibold">Overall Analytics</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Total Links" value={summary.totalLinks} />
        <StatCard title="Total Clicks" value={summary.totalClicks} />
        <StatCard title="Today Clicks" value={summary.todayClicks} />
        <StatCard title="Unique IPs" value={summary.uniqueIPs} />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Clicks Over Time */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
          <h2 className="font-medium mb-3 dark:text-white">Clicks Over Time</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={clicksOverTime}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="clicks" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Referrer Breakdown */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
          <h2 className="font-medium mb-3 dark:text-white">Traffic Sources</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={referrerData} dataKey="value" nameKey="name">
                {referrerData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Links Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
        <h2 className="font-medium mb-3 dark:text-white">
          Top Performing Links
        </h2>
        <table className="w-full text-left">
          <thead className="text-gray-500 dark:text-gray-400 text-sm">
            <tr>
              <th className="py-2">Short URL</th>
              <th>Total Clicks</th>
              <th>Last Click</th>
            </tr>
          </thead>
          <tbody>
            {topLinks.map((link) => (
              <tr key={link.shortID} className="border-t dark:border-gray-700">
                <td className="py-2 font-mono dark:text-white">
                  {API}/{link.shortID}
                </td>
                <td className="dark:text-white">{link.clicks}</td>
                <td className="dark:text-white">{link.lastClick}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
      <p className="text-gray-500 dark:text-gray-400 text-sm">{title}</p>
      <p className="text-2xl font-semibold dark:text-white">{value}</p>
    </div>
  );
}
