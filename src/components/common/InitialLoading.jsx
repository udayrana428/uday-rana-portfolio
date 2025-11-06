import { motion } from "framer-motion";

export default function InitialLoading() {
  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-900 flex flex-col items-center justify-center text-center">
      {/* LOGO + ANIMATION */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="mb-6"
      >
        {/* Replace with your actual logo image or styled div */}
        <div className="w-16 h-16 bg-brandDark rounded-xl mx-auto shadow-lg" />
      </motion.div>

      {/* LOGO TEXT */}
      <motion.h1
        className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white tracking-wider"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        UDAY<span className="text-brandDark">RANA</span>
      </motion.h1>

      {/* SLOGAN */}
      <motion.p
        className="text-gray-500 dark:text-gray-400 text-sm md:text-base mt-2 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        Crafting beautiful, fast, and modern web experiences.
      </motion.p>

      {/* PROGRESS BAR */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="w-48 h-2 bg-text-secondary dark:bg-gray-700 rounded-full overflow-hidden"
      >
        <motion.div
          className="h-full bg-brandDark"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </div>
  );
}
