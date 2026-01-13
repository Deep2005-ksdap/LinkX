import { useState } from "react";
import Features from "../components/Features";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useUrlContext } from "../context/UrlContext";

export default function LandingPage({theme, setTheme}) {
  const [url, setUrl] = useState<string>("");
  const { createShortUrl, loading } = useUrlContext();

  const handleCreate = async () => {
    const res = await createShortUrl(url as string);
    console.log(res);
    setUrl("")
  };
  return (
    <div className="min-h-screen flex flex-col   text-gray-900">
      {/* Navbar */}
      <Navbar theme={theme} setTheme={setTheme}/>

      {/* Hero */}
      <main className="flex-1 dark:text-white bg-white dark:bg-gray-900">
        <section className="max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              Shorten links. Track clicks. Share smarter.
            </h1>
            <p className="mt-4 text-gray-600 dark:text-gray-400 md:text-lg">
              LinkX helps you create clean, memorable short links with a
              professional look.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                type="text"
                placeholder="Paste your long URL here"
                className="flex-1 px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
              <button
                onClick={handleCreate}
                className="px-6 py-3 rounded-lg bg-gray-900 text-white dark:border-gray-800 dark:border-2"
              >
                {!loading ? (
                  "Shorten"
                ) : (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                )}
              </button>
            </div>
          </div>
        </section>
                
        {/* Features */}
        <Features />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
