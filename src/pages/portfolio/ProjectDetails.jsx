import { useLoaderData, Link } from "react-router-dom";
import ProjectGallery from "../../components/portfolio/ProjectGallery";
import TechStack from "../../components/portfolio/TechStack";

import { delay } from "../../utils/helpers";
import { getAllProjectsAPI } from "../../api";

export async function projectDetailsLoader({ params }) {
  try {
    // await delay(1000);
    const response = await getAllProjectsAPI();
    const project = await response.data.find((p) => p._id === params.projectId);
    if (!project) {
      throw new Error("Project not found");
    }
    return { project };
  } catch (error) {
    throw new Error("Failed to load project details");
  }
}

export default function ProjectDetails() {
  const { project } = useLoaderData();

  useEffect(() => {}, []);

  return (
    <div className="container mx-auto px-4 py-36">
      <Link
        to="/projects"
        className="text-yellow-200 hover:underline mb-6 inline-block"
      >
        ← Back to Projects
      </Link>
      <article className="grid md:grid-cols-2 gap-8">
        <ProjectGallery images={project.images} />
        <div>
          <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
          <p className="text-gray-300 mb-6">{project.description}</p>
          <TechStack technologies={project.technologies} />
          <div className="flex gap-4 mt-6">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                View Live
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                View Code
              </a>
            )}
          </div>
        </div>
      </article>
    </div>
  );
}
