export default function Footer() {
  return (
    <footer className="border-t bg-white dark:bg-gray-900 dark:border-t-gray-400">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600 dark:text-gray-400">
        <p>© 2026 LinkX. All rights reserved.</p>

        <div className="flex gap-4">
          <a
            href="#"
            className="hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
          >
            Privacy
          </a>
          <a
            href="#"
            className="hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
          >
            Terms
          </a>
          <a
            href="mailto:deepdev039@gmail.com"
            className="hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
