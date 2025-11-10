import {
  useLoaderData,
  Link,
  useParams,
  useSearchParams,
  useNavigate,
  data,
} from "react-router-dom";
import ProjectGallery from "../../components/portfolio/ProjectGallery";
import TechStack from "../../components/portfolio/TechStack";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

import { delay } from "../../utils/helpers";
import { getAllProjectsAPI } from "../../api";
import { useProject } from "../../hooks/projects/useProjects";
import { Helmet } from "react-helmet-async";

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

  const navigate = useNavigate();

  const { projectId } = useParams();

  console.log("projectId", projectId);

  const { data: project, isLoading, error, isError } = useProject(projectId);
  // console.log("data", data);
  // const project = data?.data;
  console.log("project", project);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <>
      <Helmet>
        <title>{project?.data?.title} | Project by Uday Rana</title>
        <meta
          name="description"
          content={project?.data?.description || "Project details and features"}
        />
        <link
          rel="canonical"
          href={`https://uday-rana-portfolio.vercel.app/projects/${project?.data?._id}`}
        />

        <meta
          property="og:title"
          content={`${project?.data?.title} | Project by Uday Rana`}
        />
        <meta property="og:description" content={project?.data.description} />
        <meta property="og:image" content={project?.data?.mainImage} />
        <meta property="og:type" content="article" />
      </Helmet>

      <main className="container max-w-6xl mx-auto px-4 py-36">
        <button
          onClick={() => {
            if (window.history.length > 2) navigate(-1);
            else navigate("/projects");
          }}
          className="text-brand hover:underline mb-6 inline-block"
        >
          ← Back
        </button>

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
                  Github
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
    </>
  );
}
