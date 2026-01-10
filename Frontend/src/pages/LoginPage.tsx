// import axios from "axios";
import { Link } from "react-router-dom";
export interface LoginResponse {
  email: string;
  password: string;
}

export default function Login() {
  // async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
  //   e.preventDefault();
  //   const res = await axios.post<LoginResponse>(
  //     "http://localhost:3000/auth/login",
  //     {
  //       email,
  //       password,
  //     }
  //   );
  //   console.log(res.data.message);
  //   console.log(res.data.token);
  // }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-xl p-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Welcome back
        </h2>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Log in to your LinkX account
        </p>

        <form className="mt-6 space-y-4">
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
            Log In
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-600 dark:text-gray-400">
          Don’t have an account?{" "}
          <Link to="/register" className="text-indigo-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
