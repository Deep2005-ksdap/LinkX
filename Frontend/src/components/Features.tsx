import {
  FaBolt,
  FaChartLine,
  FaLock,
  FaUser,
  FaUserCheck,
} from "react-icons/fa";

const Features = () => {
  return (
    <section id="features" className="bg-gray-50 dark:bg-gray-900 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-semibold text-center text-gray-900 dark:text-white">
          Everything you need in a modern link shortener
        </h2>

        {/* Core Features */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-shadow duration-300">
            <FaBolt className="text-blue-500 text-2xl mb-3" />
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
              Fast & Simple
            </h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Create short links instantly with a clean and intuitive interface.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-shadow duration-300">
            <FaChartLine className="text-green-500 text-2xl mb-3" />
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
              Smart Analytics
            </h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Track clicks and performance insights for every link you create.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-shadow duration-300">
            <FaLock className="text-purple-500 text-2xl mb-3" />
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
              Link Ownership
            </h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Logged-in users get full control, editing, and deletion rights.
            </p>
          </div>
        </div>

        {/* Guest vs User Section */}
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {/* Guest Card */}
          <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 shadow-sm hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-900 dark:text-white">
              <FaUser className="text-gray-500" />
              Guest User
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-gray-700 dark:text-gray-400">
              <li>• Create short links without signing up</li>
              <li>• Links expire automatically after 7 days</li>
              <li>• Limited link creation rate</li>
              <li>• No permanent ownership or editing</li>
            </ul>
          </div>

          {/* Logged-in Card */}
          <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-900 dark:text-white">
              <FaUserCheck className="text-blue-500" />
              Logged-in User
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-gray-700 dark:text-gray-400">
              <li>• Permanent short links</li>
              <li>• Full ownership and deletion rights</li>
              <li>• Advanced analytics and history</li>
              <li>• Higher rate limits and better control</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
