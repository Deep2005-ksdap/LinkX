import { Link } from "react-router-dom";

export default function RegisterationPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-xl p-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Create your account
        </h2>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Start shortening links with LinkX
        </p>

        <form className="mt-6 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 w-full">
            <div className="flex-1">
              <label className="text-sm text-gray-600 dark:text-gray-300">
                First Name
              </label>
              <input
                type="text"
                placeholder="First name"
                className="mt-1 w-full px-4 py-2 rounded-lg border bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-600"
                required
              />
            </div>

            <div className="flex-1">
              <label className="text-sm text-gray-600 dark:text-gray-300">
                Last Name{" "}
                <span className="text-xs text-gray-400">(Optional)</span>
              </label>
              <input
                type="text"
                placeholder="Last name"
                className="mt-1 w-full px-4 py-2 rounded-lg border bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-600 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="mt-1 w-full px-4 py-2 rounded-lg border bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="mt-1 w-full px-4 py-2 rounded-lg border bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <button
            type="button"
            className="w-full mt-2 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Create Account
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
