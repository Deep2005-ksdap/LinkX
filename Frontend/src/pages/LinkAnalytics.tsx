import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";

const LinkAnalytics: React.FC = () => {
  // dummy data (replace later with API data)
  const shortUrl = "linkx.io/abc123";
  const originalUrl = "https://example.com/very-long-url";

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
            <a href="#" className="text-blue-600 dark:text-blue-400 underline">
              {shortUrl}
            </a>
          </p>
          <p className="truncate">
            <span className="font-medium dark:text-white">Original URL:</span>{" "}
            {originalUrl}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Created: 12 Jan 2026
          </p>
        </div>
      </div>

      {/* ================= Metrics ================= */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard title="Total Clicks" value="1245" />
        <MetricCard title="Unique Visitors" value="812" />
        <MetricCard title="Last Click" value="2 hrs ago" />
        <MetricCard title="Avg / Day" value="56" />
      </div>

      {/* ================= Charts Section ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartBox title="Clicks Over Time">
          <div className="h-48 flex items-center justify-center text-gray-400 dark:text-gray-500">
            Line Chart Placeholder
          </div>
        </ChartBox>

        <ChartBox title="Referrer Breakdown">
          <div className="h-48 flex items-center justify-center text-gray-400 dark:text-gray-500">
            Pie / Donut Chart Placeholder
          </div>
        </ChartBox>
      </div>

      {/* ================= Device / Browser ================= */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
        <h3 className="font-semibold mb-3 dark:text-white">
          Devices & Browsers
        </h3>

        <div className="h-40 flex items-center justify-center text-gray-400 dark:text-gray-500">
          Bar Chart Placeholder
        </div>
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
