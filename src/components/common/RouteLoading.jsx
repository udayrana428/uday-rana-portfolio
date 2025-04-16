import { motion } from "framer-motion";

export default function RouteLoading() {
  return (
    <div className="min-h-[200px] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-2">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear",
            }}
            className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full"
          />
          <span className="text-gray-600 dark:text-gray-300">Loading...</span>
        </div>
      </motion.div>
    </div>
  );
}
