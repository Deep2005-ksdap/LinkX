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

const COLORS = ["#2563eb", "#16a34a", "#f59e0b", "#ef4444"];

const summary = {
  totalLinks: 12,
  totalClicks: 1420,
  todayClicks: 54,
  uniqueIPs: 380,
};

const clicksOverTime = [
  { date: "Jan 10", clicks: 120 },
  { date: "Jan 11", clicks: 210 },
  { date: "Jan 12", clicks: 180 },
  { date: "Jan 13", clicks: 260 },
  { date: "Jan 14", clicks: 300 },
];

const referrerData = [
  { name: "Google", value: 500 },
  { name: "Direct", value: 400 },
  { name: "Twitter", value: 300 },
  { name: "Others", value: 220 },
];

const topLinks = [
  { shortID: "abc123", clicks: 320, lastClick: "2 mins ago" },
  { shortID: "xyz789", clicks: 210, lastClick: "10 mins ago" },
  { shortID: "qwe456", clicks: 180, lastClick: "1 hr ago" },
];

export default function OverallAnalytics() {
  return (
    <div className="p-6 h-screen w-full overflow-y-auto space-y-8">
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
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="font-medium mb-3">Clicks Over Time</h2>
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
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="font-medium mb-3">Traffic Sources</h2>
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
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="font-medium mb-3">Top Performing Links</h2>
        <table className="w-full text-left">
          <thead className="text-gray-500 text-sm">
            <tr>
              <th className="py-2">Short ID</th>
              <th>Total Clicks</th>
              <th>Last Click</th>
            </tr>
          </thead>
          <tbody>
            {topLinks.map((link) => (
              <tr key={link.shortID} className="border-t">
                <td className="py-2 font-mono">{link.shortID}</td>
                <td>{link.clicks}</td>
                <td>{link.lastClick}</td>
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
    <div className="bg-white rounded-xl shadow p-4">
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  );
}
