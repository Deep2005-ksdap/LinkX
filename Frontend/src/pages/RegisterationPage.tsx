import { useState } from "react";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export default function RegisterationPage() {
  const { error, loading, register } = useAuthContext();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState<string>("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPass, setShowPass] = useState<boolean>(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const fullname = { firstname, lastname };
    await register({ fullname, email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 shadow-lg">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Start shortening links with LinkX
          </p>
        </div>

        {error && (
          <div className="mt-4 text-sm text-red-500 bg-red-50 dark:bg-red-900/20 px-4 py-3 rounded-lg border border-red-200 dark:border-red-800">
            {Array.isArray(error) ? (
              <ul className="list-disc list-inside">
                {error.map((err, index) => (
                  <li key={index}>{err.msg}</li>
                ))}
              </ul>
            ) : (
              error
            )}
          </div>
        )}

        <form onSubmit={handleRegister} className="mt-6 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 w-full">
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                First Name
              </label>
              <input
                type="text"
                placeholder="First name"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                className="mt-2 w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           transition-colors duration-200"
                required
              />
            </div>

            <div className="flex-1">
              <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Last Name{" "}
                <span className="text-xs text-gray-400">(Optional)</span>
              </label>
              <input
                type="text"
                placeholder="Last name"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                className="mt-2 w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           transition-colors duration-200"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="mt-2 w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         transition-colors duration-200"
            />
          </div>

          <div>
            <div className="flex justify-between">
              <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowPass((prev) => !prev)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              >
                {showPass ? <FaEyeSlash size={18} /> : <FaRegEye size={18} />}
              </button>
            </div>
            <input
              type={`${showPass ? "text" : "password"}`}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-2 w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         transition-colors duration-200"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 py-3 rounded-lg bg-linear-to-r from-purple-600 to-blue-600 text-white font-medium
                       shadow-md hover:shadow-lg transition-all duration-200
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Creating Account...
              </div>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-purple-600 dark:text-purple-400 font-medium hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
