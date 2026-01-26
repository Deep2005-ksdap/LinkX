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
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <div className="text-xl dark:text-white font-medium">
          Loading analytics...
        </div>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="p-6 h-screen w-full flex items-center justify-center">
        <div className="text-xl text-red-500 bg-red-50 dark:bg-red-900/20 px-6 py-4 rounded-lg border border-red-200 dark:border-red-800">
          Error: {error}
        </div>
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
      <h1 className="text-3xl font-bold bg-linear-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
        Overall Analytics
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Links" value={summary.totalLinks} />
        <StatCard title="Total Clicks" value={summary.totalClicks} />
        <StatCard title="Today Clicks" value={summary.todayClicks} />
        <StatCard title="Unique IPs" value={summary.uniqueIPs} />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Clicks Over Time */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <h2 className="font-semibold mb-4 dark:text-white text-lg">
            Clicks Over Time
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={clicksOverTime}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="clicks"
                stroke="#2563eb"
                strokeWidth={3}
                dot={{ fill: "#2563eb", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "#2563eb", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Referrer Breakdown */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <h2 className="font-semibold mb-4 dark:text-white text-lg">
            Traffic Sources
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={referrerData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
              >
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
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
        <h2 className="font-semibold mb-6 dark:text-white text-lg">
          Top Performing Links
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="text-gray-500 dark:text-gray-400 text-sm border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="py-3 px-2">Short URL</th>
                <th className="py-3 px-2">Total Clicks</th>
                <th className="py-3 px-2">Last Click</th>
              </tr>
            </thead>
            <tbody>
              {topLinks.map((link) => (
                <tr
                  key={link.shortID}
                  className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <td className="py-3 px-2 font-mono dark:text-white text-sm">
                    {API}/{link.shortID}
                  </td>
                  <td className="py-3 px-2 dark:text-white font-medium">
                    {link.clicks}
                  </td>
                  <td className="py-3 px-2 dark:text-white text-sm">
                    {link.lastClick}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
      <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-2">
        {title}
      </p>
      <p className="text-3xl font-bold dark:text-white bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        {value.toLocaleString()}
      </p>
    </div>
  );
}
