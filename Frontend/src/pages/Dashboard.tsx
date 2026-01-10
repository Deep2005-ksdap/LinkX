import Sidebar from "../components/Sidebar";
import LinkCard from "../components/LinkCard";


export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />

      <main className="flex-1 p-6">
        <h1 className="text-2xl font-semibold">Dashboard</h1>

        {/* Shorten box */}
        <div className="mt-6 p-4 border rounded-xl bg-white dark:bg-gray-800 dark:border-gray-700">
          <h2 className="font-medium">Shorten a new link</h2>
          <div className="mt-3 flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Paste your long URL here"
              className="flex-1 px-4 py-2 rounded-lg border bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
            <button className="px-5 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">
              Shorten
            </button>
          </div>
        </div>

        {/* Links list */}
        <div className="mt-8 space-y-4">
          <LinkCard
            originalUrl="https://example.com/very-long-url"
            shortUrl="linkx.in/abc123"
            clicks={12}
          />
          <LinkCard
            originalUrl="https://anotherexample.com/page"
            shortUrl="linkx.in/xyz789"
            clicks={4}
          />
        </div>
      </main>
    </div>
  );
}
