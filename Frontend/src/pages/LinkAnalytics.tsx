import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";

const LinkAnalytics: React.FC = () => {
  // dummy data (replace later with API data)
  const shortUrl = "linkx.io/abc123";
  const originalUrl = "https://example.com/very-long-url";

  return (
    <div className="p-6 overflow-y-auto h-screen w-full space-y-6">
      <Link to={"/dashboard"} className="dark:text-white">
        <IoMdArrowRoundBack size={25} />
      </Link>
      {/* ================= Header ================= */}
      <div className="bg-white rounded-lg p-4 shadow">
        <h2 className="text-xl font-semibold">Link Analytics</h2>

        <div className="mt-2 space-y-1">
          <p>
            <span className="font-medium">Short URL:</span>{" "}
            <a href="#" className="text-blue-600 underline">
              {shortUrl}
            </a>
          </p>
          <p className="truncate">
            <span className="font-medium">Original URL:</span> {originalUrl}
          </p>
          <p className="text-sm text-gray-500">Created: 12 Jan 2026</p>
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
          <div className="h-48 flex items-center justify-center text-gray-400">
            Line Chart Placeholder
          </div>
        </ChartBox>

        <ChartBox title="Referrer Breakdown">
          <div className="h-48 flex items-center justify-center text-gray-400">
            Pie / Donut Chart Placeholder
          </div>
        </ChartBox>
      </div>

      {/* ================= Device / Browser ================= */}
      <div className="bg-white rounded-lg p-4 shadow">
        <h3 className="font-semibold mb-3">Devices & Browsers</h3>

        <div className="h-40 flex items-center justify-center text-gray-400">
          Bar Chart Placeholder
        </div>
      </div>

      {/* ================= Recent Clicks ================= */}
      <div className="bg-white rounded-lg p-4 shadow">
        <h3 className="font-semibold mb-3">Recent Clicks</h3>

        <table className="w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Time</th>
              <th className="p-2 border">Referrer</th>
              <th className="p-2 border">Device</th>
              <th className="p-2 border">Browser</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border">12:45 PM</td>
              <td className="p-2 border">Google</td>
              <td className="p-2 border">Mobile</td>
              <td className="p-2 border">Chrome</td>
            </tr>
            <tr>
              <td className="p-2 border">12:40 PM</td>
              <td className="p-2 border">Direct</td>
              <td className="p-2 border">Desktop</td>
              <td className="p-2 border">Firefox</td>
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
  <div className="bg-white rounded-lg p-4 shadow text-center">
    <p className="text-gray-500 text-sm">{title}</p>
    <p className="text-2xl font-bold mt-1">{value}</p>
  </div>
);

type ChartBoxProps = {
  title: string;
  children: React.ReactNode;
};

const ChartBox: React.FC<ChartBoxProps> = ({ title, children }) => (
  <div className="bg-white rounded-lg p-4 shadow">
    <h3 className="font-semibold mb-2">{title}</h3>
    {children}
  </div>
);

export default LinkAnalytics;
