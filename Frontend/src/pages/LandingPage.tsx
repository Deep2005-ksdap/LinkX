import { useState } from "react";
import Features from "../components/Features";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useUrlContext } from "../context/UrlContext";
import { toastError, toastInfo } from "../utils/toast";

type Theme = "light" | "dark";

interface LandingPageProps {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}

export default function LandingPage({ theme, setTheme }: LandingPageProps) {
  const [link, setLink] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const { createShortUrl, loading } = useUrlContext();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toastInfo("Link copied 📋");
    setCopied((prev) => !prev);
    setTimeout(() => {
      setCopied(false);
    }, 8000);
  };

  const handleCreate = async () => {
    if (!url.trim()) {
      toastError("Please enter a valid URL to shorten");
      return;
    }
    const data = await createShortUrl(url as string);

    if (!data) {
      setShow(false);
      setUrl("");
    } else {
      setLink(data?.shortUrl as string);
      setShow(true);
      setUrl("");
    }
  };
  return (
    <div className="min-h-screen flex flex-col   text-gray-900">
      {/* Navbar */}
      <Navbar theme={theme} setTheme={setTheme} />

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
            {show && (
              <div className="flex flex-col items-center">
                <input
                  disabled
                  type="text"
                  value={link}
                  className="flex-1 text-center mt-3 px-4 py-3 w-full rounded-lg border focus:outline-none"
                />
                <button
                  onClick={() => copyToClipboard(link)}
                  className="px-10 py-3 rounded-lg bg-gray-900 text-white dark:border-gray-400 dark:border-2"
                >
                  {copied ? "Copied ✔️" : "Copy to clipboard"}
                </button>
              </div>
            )}
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
