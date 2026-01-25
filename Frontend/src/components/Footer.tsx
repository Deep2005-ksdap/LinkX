import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      className="border-t bg-white dark:bg-gray-900 dark:border-t-gray-400"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600 dark:text-gray-400">
        <p>© 2026 LinkX. All rights reserved.</p>

        <div className="flex gap-4">
          <motion.a
            href="#"
            className="hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
          >
            Privacy
          </motion.a>
          <motion.a
            href="#"
            className="hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
          >
            Terms
          </motion.a>
          <motion.a
            href="#"
            className="hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
          >
            Contact
          </motion.a>
        </div>
      </div>
    </motion.footer>
  );
}
