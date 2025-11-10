import {
  useLoaderData,
  Link,
  useParams,
  useSearchParams,
} from "react-router-dom";
import ProjectGallery from "../../components/portfolio/ProjectGallery";
import TechStack from "../../components/portfolio/TechStack";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

import { delay } from "../../utils/helpers";
import { getAllProjectsAPI } from "../../api";
import { useProject } from "../../hooks/projects/useProjects";

// export async function projectDetailsLoader({ params }) {
//   try {
//     // await delay(1000);
//     const response = await getAllProjectsAPI();
//     const project = await response.data.find((p) => p._id === params.projectId);
//     if (!project) {
//       throw new Error("Project not found");
//     }
//     return { project };
//   } catch (error) {
//     throw new Error("Failed to load project details");
//   }
// }

export default function ProjectDetails() {
  // const { project } = useLoaderData();

  const { projectId } = useParams();

  console.log("projectId", projectId);

  const { data: project, isLoading, error, isError } = useProject(projectId);
  // console.log("data", data);
  // const project = data?.data;
  console.log("project", project);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <main className="container max-w-6xl mx-auto px-4 py-36">
      <Link
        to="/projects"
        className="text-brand hover:underline mb-6 inline-block"
      >
        ← Back to Projects
      </Link>
      <article className="grid md:grid-cols-2 gap-8">
        <ProjectGallery
          images={
            (project.data?.subImages?.length && [
              project.data.mainImage,
              ...project.data.subImages,
            ]) || [project.data.mainImage]
          }
        />
        <div>
          <h1 className="text-3xl font-bold mb-4">{project.data.title}</h1>
          <div className="flex gap-4 my-4">
            {project.data.liveUrl && (
              <a
                href={project.data.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn border rounded-full text-sm"
              >
                <FaExternalLinkAlt size={20} className="inline-block mr-2" />
                View Live
              </a>
            )}
            {project.data.githubUrl && (
              <a
                href={project.data.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary rounded-full text-sm"
              >
                <FaGithub size={20} className="inline-block mr-2" />
                View Code
              </a>
            )}
          </div>
          <p className="text-text-secondary font-josefin mb-6">
            {project.data.description}
          </p>
          {project.data.techStack[0] && (
            <TechStack technologies={project.data.techStack} />
          )}
        </div>
      </article>
    </main>
  );
}
