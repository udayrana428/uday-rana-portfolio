import { useRouteError, Link } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full px-6 py-12 bg-white shadow-lg rounded-lg text-center">
        <h1 className="text-6xl font-bold text-red-600 mb-4">
          {error.status || "500"}
        </h1>
        <p className="text-2xl font-semibold text-gray-800 mb-4">
          {error.statusText || "Something went wrong"}
        </p>
        <p className="text-gray-600 mb-8">
          {error.message || "An unexpected error has occurred."}
        </p>
        <div className="space-x-4">
          <Link to="/" className="btn btn-primary">
            Go Home
          </Link>
          <button
            onClick={() => window.location.reload()}
            className="btn btn-secondary"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}
