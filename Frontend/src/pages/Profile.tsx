import { IoClose } from "react-icons/io5";
import Sidebar from "../components/Sidebar";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";

export default function Profile() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar isOpen={isOpen} />

      <main className="flex-1 p-6 max-w-3xl">
        <div className="flex justify-between items-center">
          {isOpen ? (
            <IoClose
              onClick={() => setIsOpen((prev) => !prev)}
              className="dark:text-white text-2xl sm:hidden"
            />
          ) : (
            <GiHamburgerMenu
              onClick={() => setIsOpen((prev) => !prev)}
              className="dark:text-white text-2xl sm:hidden"
            />
          )}
          <h1 className="text-2xl text-center dark:text-gray-100 font-semibold ">
            Profile
          </h1>
        </div>

        <div className="mt-6 p-6 border rounded-xl bg-white dark:bg-gray-800 dark:border-gray-700 space-y-4">
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-2 rounded-lg border bg-transparent"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-lg border bg-transparent"
            />
          </div>

          <button className="mt-4 px-5 py-2 rounded-lg bg-indigo-600 text-white">
            Save Changes
          </button>
        </div>
      </main>
    </div>
  );
}
