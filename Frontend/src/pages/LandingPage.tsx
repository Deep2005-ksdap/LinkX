import Features from "../components/Features";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      {/* Navbar */}
      <Navbar />

      {/* Hero */}
      <main className="flex-1 dark:text-white dark:bg-gray-900">
        <section className="max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              Shorten links. Track clicks. Share smarter.
            </h1>
            <p className="mt-4 text-gray-600 md:text-lg">
              LinkX helps you create clean, memorable short links with a
              professional look.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Paste your long URL here"
                className="flex-1 px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
              <button className="px-6 py-3 rounded-lg bg-gray-900 text-white dark:border-gray-600 dark:border-2">
                Shorten
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
