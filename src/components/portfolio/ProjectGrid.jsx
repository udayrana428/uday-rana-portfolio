import { Link } from "react-router-dom";

export default function ProjectGrid({ projects }) {
  return (
    <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {projects.map((project) => (
        <Link
          key={project._id}
          to={`/projects/${project._id}`}
          className="card hover:shadow-lg transition-shadow"
        >
          <img
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
            <p className="text-gray-600 mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 rounded-full text-sm"
                >
                  {tech.trim()}
                </span>
              ))}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
