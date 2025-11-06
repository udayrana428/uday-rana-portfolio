import { useRouteError, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHome, FaRedoAlt } from "react-icons/fa";

export default function ErrorBoundary() {
  const error = useRouteError();

  const isDev = import.meta.env.MODE === "development";

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-white px-4">
      {/* Simple animation or illustration */}
      <motion.video
        src="/videos/Questioning.webm"
        autoPlay
        loop
        muted
        playsInline
        className="mb-8 rounded-xl"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      />

      <h1 className="text-4xl font-josefin font-bold mb-4 text-brand">Oops!</h1>
      <p className="text-lg text-gray-300 mb-6 text-center max-w-md">
        We ran into an unexpected issue while loading this page.
        <br />
        Please try again, or return to the homepage.
      </p>

      {isDev && (
        <pre className="text-red-400 bg-surface p-4 rounded-md text-sm mb-4">
          {error?.message || error?.statusText}
        </pre>
      )}

      <div className="flex gap-4">
        <button
          onClick={() => window.location.reload()}
          className=" flex items-center gap-2"
        >
          <FaRedoAlt /> Try Again
        </button>
        <Link
          to="/"
          className="btn btn-secondary bg-brand flex items-center gap-2"
        >
          <FaHome /> Go Home
        </Link>
      </div>
    </div>
  );
}
