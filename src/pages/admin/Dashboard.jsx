import { useProjects } from "../../hooks/projects/useProjects";

export default function Dashboard() {
  const { data } = useProjects();
  const projects = data?.projects || [];

  return (
    <main>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6 bg-surface">
          <h2 className="text-xl font-semibold mb-2">Total Projects</h2>
          <p className="text-3xl font-bold text-blue-600">{projects.length}</p>
        </div>
        <div className="card p-6 bg-surface">
          <h2 className="text-xl font-semibold mb-2">Published Projects</h2>
          <p className="text-3xl font-bold text-green-600">
            {projects.filter((p) => p.status === "published").length}
          </p>
        </div>
        <div className="card p-6 bg-surface">
          <h2 className="text-xl font-semibold mb-2">Draft Projects</h2>
          <p className="text-3xl font-bold text-gray-600">
            {projects.filter((p) => p.status === "draft").length}
          </p>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="card">
          <div className="divide-y">
            {projects.slice(0, 5).map((project) => (
              <div key={project._id} className="p-4">
                <h3 className="font-medium">{project.title}</h3>
                <p className="text-sm text-gray-600">
                  Last updated:{" "}
                  {new Date(project.updatedAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
