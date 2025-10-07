import { useLoaderData, Link } from "react-router-dom";
import ProjectGallery from "../../components/portfolio/ProjectGallery";
import TechStack from "../../components/portfolio/TechStack";

import { delay } from "../../utils/helpers";
import { getAllProjectsAPI } from "../../api";

const mockProjects = [
  {
    id: 1,
    title: "E-commerce Platform",
    description:
      "A full-stack e-commerce platform built with React and Node.js",
    images: [
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1524508762098-fd966ffb6ef9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800&h=600&fit=crop",
    ],
    image:
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=600&fit=crop", // Main thumbnail
    category: "Web Development",
    technologies: ["React", "Node.js", "MongoDB", "Express"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
    featured: true,
    status: "published",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-16",
  },
  {
    id: 2,
    title: "Portfolio Website",
    description: "Personal portfolio website showcasing my projects and skills",
    images: [
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=800&h=600&fit=crop",
    ],
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop",
    category: "Web Development",
    technologies: ["React", "Tailwind CSS", "Framer Motion"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
    featured: true,
    status: "published",
    createdAt: "2024-01-14",
    updatedAt: "2024-01-16",
  },
  {
    id: 3,
    title: "Mobile Weather App",
    description: "A weather application for iOS and Android",
    images: [
      "https://images.unsplash.com/photo-1601134467661-3d775b999c8b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1530563885674-66db50a1af19?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=800&h=600&fit=crop",
    ],
    image:
      "https://images.unsplash.com/photo-1601134467661-3d775b999c8b?w=800&h=600&fit=crop",
    category: "Mobile Apps",
    technologies: ["React Native", "Redux", "Weather API"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
    featured: false,
    status: "published",
    createdAt: "2024-01-13",
    updatedAt: "2024-01-16",
  },
];
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
