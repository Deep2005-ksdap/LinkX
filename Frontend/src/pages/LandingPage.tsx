import { useState } from "react";
import { motion } from "framer-motion";
import { FaLink, FaCopy, FaCheck } from "react-icons/fa";
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
    <div className="min-h-screen flex flex-col text-gray-900 relative overflow-hidden">
      {/* Navbar */}
      <Navbar theme={theme} setTheme={setTheme} />

      {/* Hero */}
      <main className="flex-1 dark:text-white relative z-10 overflow-hidden">
        {/* Animated Background */}
        <motion.div
          className="absolute inset-0 bg-linear-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            backgroundSize: "200% 200%",
          }}
        />

        <div className="relative z-10">
          <section className="max-w-7xl mx-auto px-4 py-16 md:py-24">
            <motion.div
              className="max-w-3xl"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1
                className="text-3xl md:text-5xl font-bold leading-tight bg-linear-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Shorten links. Track clicks. Share smarter.
              </motion.h1>
              <motion.p
                className="mt-4 text-gray-600 dark:text-gray-400 md:text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                LinkX helps you create clean, memorable short links with a
                professional look.
              </motion.p>

              <motion.div
                className="mt-8 flex flex-col sm:flex-row gap-3"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <input
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  type="text"
                  placeholder="Paste your long URL here"
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md"
                />
                <motion.button
                  onClick={handleCreate}
                  className="px-6 py-3 rounded-lg bg-linear-to-r from-blue-600 to-purple-600 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={loading}
                >
                  {!loading ? (
                    <>
                      <FaLink className="text-sm" />
                      Shorten
                    </>
                  ) : (
                    <motion.div
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  )}
                </motion.button>
              </motion.div>

              {show && (
                <motion.div
                  className="flex flex-col items-center mt-6"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 w-full max-w-md">
                    <input
                      disabled
                      type="text"
                      value={link}
                      className="flex-1 text-center px-4 py-3 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none text-gray-800 dark:text-gray-200"
                    />
                    <motion.button
                      onClick={() => copyToClipboard(link)}
                      className="mt-3 px-6 py-2 rounded-lg bg-linear-to-r from-green-500 to-blue-500 text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 w-full justify-center"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {copied ? (
                        <>
                          <FaCheck className="text-sm" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <FaCopy className="text-sm" />
                          Copy to clipboard
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </section>

          {/* Features */}
          <Features />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
