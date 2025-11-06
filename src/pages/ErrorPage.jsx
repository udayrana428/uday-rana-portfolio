import { useRouteError, Link } from "react-router-dom";
import { delay, motion } from "framer-motion";
import { FaHome, FaRedoAlt } from "react-icons/fa";

export default function ErrorPage() {
  const error = useRouteError();
  console.log("error", error);
  const isDev = import.meta.env.MODE === "development";

  const status = error?.status || 500;
  const message =
    error?.statusText || error?.message || "Something went wrong.";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      {/* Animated Illustration / Video */}
      <motion.video
        src="/videos/Questioning.webm"
        autoPlay
        loop
        muted
        playsInline
        className="mb-8 w-40 h-40 rounded-xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      />

      {/* Title */}
      <motion.h1
        className="text-5xl font-extrabold text-brand mb-4"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Oops! {status}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-lg text-gray-300 mb-6 text-center max-w-md"
      >
        We ran into an unexpected issue while loading this page.
        <br />
        Please try again, or return to the homepage.
      </motion.p>

      {/* Message */}

      {/* Developer Info (only in Dev mode) */}
      {isDev && (
        <>
          {/* <motion.p
            className="text-lg text-text-secondary max-w-md mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {message}
          </motion.p> */}
          <pre className="bg-surface text-red-400 text-sm p-4 rounded-lg mb-6 max-w-md overflow-x-auto text-left">
            {message || JSON.stringify(error, null, 2)}
          </pre>
        </>
      )}

      {/* Actions */}
      <motion.div
        className="flex gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <button
          onClick={() => window.location.reload()}
          className="flex items-center gap-2 border border-gray-500 text-gray-300 hover:text-white px-4 py-2 rounded-xl transition-colors"
        >
          <FaRedoAlt /> Try Again
        </button>
        <Link
          to="/"
          className="flex items-center gap-2 bg-brand text-background px-4 py-2 rounded-xl hover:opacity-90 transition-opacity"
        >
          <FaHome /> Go Home
        </Link>
      </motion.div>
    </div>
  );
}
