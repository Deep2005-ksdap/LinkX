import React, { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import { useAnalyticsContext } from "../context/AnalyticsContext";
import type { AnalyticsData } from "../types/analytics";

const LinkAnalytics: React.FC = () => {
  const { shortID } = useParams();
  const { getPerLinkAnalytics, loading, error } = useAnalyticsContext();

  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(
    null,
  );

  useEffect(() => {
    if (!shortID) return;
    const fetchAnalytics = async () => {
      const data = await getPerLinkAnalytics(shortID);
      if (data) {
        setAnalyticsData(data);
      }
    };
    fetchAnalytics();
  }, [shortID]);

  if (loading) {
    return (
      <div className="p-6 h-screen w-full flex flex-col gap-4 items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full dark:border-b-white border-2 border-t-transparent" />
        <div className="text-lg dark:text-white">Loading analytics...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 h-screen w-full flex items-center justify-center">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <div className="p-6 h-screen w-full flex items-center justify-center">
        <div className="text-gray-500">No data available</div>
      </div>
    );
  }

  const {
    totalClicks,
    uniqueVisitors,
    lastClickedAt,
    clicksByDate,
    referrerClicks,
    shortUrl,
    originalUrl,
    createdAt,
  } = analyticsData;
  const avgPerDay =
    clicksByDate.length > 0 ? Math.round(totalClicks / clicksByDate.length) : 0;

  return (
    <div className="p-6 overflow-y-auto h-screen w-full space-y-6 dark:text-white">
      <Link
        to={"/dashboard"}
        className="flex gap-1 items-center font-bold dark:text-white"
      >
        <IoMdArrowRoundBack size={20} />
        Back
      </Link>
      {/* ================= Header ================= */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
        <h2 className="text-xl font-semibold dark:text-white">
          Link Analytics
        </h2>

        <div className="mt-2 space-y-1">
          <p>
            <span className="font-medium dark:text-white">Short URL:</span>{" "}
            <a
              href={shortUrl}
              className="text-blue-600 dark:text-blue-400 underline"
            >
              {shortUrl}
            </a>
          </p>
          <p className="truncate">
            <span className="font-medium dark:text-white">Original URL:</span>{" "}
            {originalUrl}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Created: {new Date(createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* ================= Metrics ================= */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard title="Total Clicks" value={totalClicks.toString()} />
        <MetricCard title="Unique Visitors" value={uniqueVisitors.toString()} />
        <MetricCard
          title="Last Click"
          value={
            lastClickedAt ? new Date(lastClickedAt).toLocaleString() : "Never"
          }
        />
        <MetricCard title="Avg / Day" value={avgPerDay.toString()} />
      </div>

      {/* ================= Charts Section ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartBox title="Clicks Over Time">
          <div className="h-48 overflow-y-auto">
            {clicksByDate.length > 0 ? (
              <ul className="space-y-1">
                {clicksByDate.map((item, index) => (
                  <li key={index} className="flex justify-between text-sm">
                    <span>{item.date}</span>
                    <span>{item.clicks} clicks</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400 dark:text-gray-500">
                No click data available
              </div>
            )}
          </div>
        </ChartBox>

        <ChartBox title="Referrer Breakdown">
          <div className="h-48 overflow-y-auto">
            {referrerClicks.length > 0 ? (
              <ul className="space-y-1">
                {referrerClicks.map((item, index) => (
                  <li key={index} className="flex justify-between text-sm">
                    <span>{item.referrer}</span>
                    <span>{item.clicks} clicks</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400 dark:text-gray-500">
                No referrer data available
              </div>
            )}
          </div>
        </ChartBox>
      </div>

      {/* ================= Recent Clicks ================= */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
        <h3 className="font-semibold mb-3 dark:text-white">Recent Clicks</h3>

        <table className="w-full text-sm border dark:border-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="p-2 border dark:border-gray-600 dark:text-white">
                Time
              </th>
              <th className="p-2 border dark:border-gray-600 dark:text-white">
                Referrer
              </th>
              <th className="p-2 border dark:border-gray-600 dark:text-white">
                Device
              </th>
              <th className="p-2 border dark:border-gray-600 dark:text-white">
                Browser
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border dark:border-gray-600 dark:text-white">
                12:45 PM
              </td>
              <td className="p-2 border dark:border-gray-600 dark:text-white">
                Google
              </td>
              <td className="p-2 border dark:border-gray-600 dark:text-white">
                Mobile
              </td>
              <td className="p-2 border dark:border-gray-600 dark:text-white">
                Chrome
              </td>
            </tr>
            <tr>
              <td className="p-2 border dark:border-gray-600 dark:text-white">
                12:40 PM
              </td>
              <td className="p-2 border dark:border-gray-600 dark:text-white">
                Direct
              </td>
              <td className="p-2 border dark:border-gray-600 dark:text-white">
                Desktop
              </td>
              <td className="p-2 border dark:border-gray-600 dark:text-white">
                Firefox
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

/* ================= Reusable Components ================= */

type MetricProps = {
  title: string;
  value: string;
};

const MetricCard: React.FC<MetricProps> = ({ title, value }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow text-center">
    <p className="text-gray-500 dark:text-gray-400 text-sm">{title}</p>
    <p className="text-2xl font-bold mt-1 dark:text-white">{value}</p>
  </div>
);

type ChartBoxProps = {
  title: string;
  children: React.ReactNode;
};

const ChartBox: React.FC<ChartBoxProps> = ({ title, children }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
    <h3 className="font-semibold mb-2 dark:text-white">{title}</h3>
    {children}
  </div>
);

export default LinkAnalytics;
