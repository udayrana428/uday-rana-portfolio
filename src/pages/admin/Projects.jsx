import { useState } from "react";
import { useProjects } from "../../context/ProjectContext";
import ProjectCard from "../../components/admin/ProjectCard";
import ProjectForm from "../../components/admin/ProjectForm";
import { useLoaderData } from "react-router-dom";
import { getAllProjectsAPI } from "../../api";

export async function projectsLoader() {
  try {
    const response = await getAllProjectsAPI();
    return {
      projects: response.data,
      categories: ["All", "Web Development", "Mobile Apps", "UI/UX Design"],
    };
  } catch (error) {
    throw new Error("Failed to load projects");
  }
}

export default function Projects() {
  const { projects: liveProjects, isLoading } = useProjects();
  const [showForm, setShowForm] = useState(false);
  const { projects: initialProjects } = useLoaderData();
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = liveProjects.length > 0 ? liveProjects : initialProjects;

  const handleEdit = (project) => {
    setSelectedProject(project);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedProject(null);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Projects</h1>
        <button onClick={() => setShowForm(true)} className="btn btn-primary">
          Add New Project
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {selectedProject ? "Edit Project" : "Add New Project"}
            </h2>
            <div className="max-h-[calc(100vh-12rem)] overflow-y-auto">
              <ProjectForm
                project={selectedProject}
                onSuccess={handleCloseForm}
              />
            </div>
            <button
              onClick={handleCloseForm}
              className="mt-4 btn btn-secondary w-full"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard
            key={project._id}
            project={project}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  );
}
