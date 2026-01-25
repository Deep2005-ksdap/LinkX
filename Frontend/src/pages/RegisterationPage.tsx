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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 dark:text-white px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-xl p-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Create your account
        </h2>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Start shortening links with LinkX
        </p>

        {error && (
          <div className="mt-4 text-sm text-red-500 bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg">
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
              <label className="text-sm text-gray-600 dark:text-gray-300">
                First Name
              </label>
              <input
                type="text"
                placeholder="First name"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
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
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
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
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="mt-1 w-full px-4 py-2 rounded-lg border bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <div className="flex justify-between">
              <label className="text-sm text-gray-600 dark:text-gray-300">
                Password
              </label>
              <span
                onClick={() => setShowPass((prev) => !prev)}
                className="text-2xl dark:text-gray-100"
              >
                {showPass ? <FaEyeSlash /> : <FaRegEye />}
              </span>
            </div>
            <input
              type={`${showPass ? "text" : "password"}`}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-1 w-full px-4 py-2 rounded-lg border bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-2 rounded-lg bg-indigo-600 text-white font-medium
                       hover:bg-indigo-700 transition
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Redirecting..." : "Create Account"}
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
