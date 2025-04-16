import { useRouteError, Link } from "react-router-dom";

export default function ProjectsError() {
  const error = useRouteError();

  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Projects Error</h2>
        <p className="text-gray-600 mb-6">
          {error.message || "Failed to load projects. Please try again."}
        </p>
        <div className="space-x-4">
          <Link
            to="/admin/projects"
            className="btn btn-primary"
            onClick={() => window.location.reload()}
          >
            Retry
          </Link>
          <Link to="/admin" className="btn btn-secondary">
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
