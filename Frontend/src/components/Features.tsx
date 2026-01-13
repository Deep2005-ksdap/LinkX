
const Features = () => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-semibold text-center">
          Everything you need in a link shortener
        </h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          <div className="p-6 bg-white rounded-xl border dark:bg-black dark:border-gray-600">
            <h3 className="font-semibold text-lg">Fast & Simple</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Create short links instantly with a clean and simple interface.
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl border dark:bg-black dark:border-gray-600">
            <h3 className="font-semibold text-lg">Link Management</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Organize, edit, and manage all your links in one place.
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl border dark:bg-black dark:border-gray-600">
            <h3 className="font-semibold text-lg">Analytics Ready</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Track clicks and performance with built-in analytics support.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
