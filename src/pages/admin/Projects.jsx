import { useState } from "react";
// import { useProjects } from "../../context/ProjectContext";
import ProjectCard from "../../components/admin/ProjectCard";
import ProjectForm from "../../components/admin/ProjectForm";
import { useLoaderData } from "react-router-dom";
import { getAllProjectsAPI } from "../../api";
import { useQuery } from "@tanstack/react-query";
import { adminProjectsQuery } from "../../queries/projects.query";
import { IoMdAdd } from "react-icons/io";
import { MdGridView } from "react-icons/md";
import { MdOutlineCalendarViewDay } from "react-icons/md";

// export async function projectsLoader() {
//   try {
//     const response = await getAllProjectsAPI();
//     return {
//       projects: response.data,
//       categories: ["All", "Web Development", "Mobile Apps", "UI/UX Design"],
//     };
//   } catch (error) {
//     throw new Error("Failed to load projects");
//   }
// }

export default function Projects() {
  const { data, isLoading } = useQuery(adminProjectsQuery());
  const projects = data?.data?.projects || [];
  const [showForm, setShowForm] = useState(false);
  const [isGridView, setIsGridView] = useState(true);
  // const { projects: initialProjects } = useLoaderData();
  const [selectedProject, setSelectedProject] = useState(null);

  // const projects = liveProjects.length > 0 ? liveProjects : initialProjects;

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
    <main>
      <div className="relative flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Projects</h1>
        <div className="fixed right-10 ">
          <button
            className="text-3xl rounded-md bg-surfaceAlt
           p-2 mr-3"
          >
            {isGridView ? (
              <MdOutlineCalendarViewDay onClick={() => setIsGridView(false)} />
            ) : (
              <MdGridView onClick={() => setIsGridView(true)} />
            )}
          </button>
          <button
            onClick={() => setShowForm(true)}
            className="text-3xl bg-surfaceAlt rounded-md p-2"
          >
            <IoMdAdd />
          </button>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-surface rounded-lg p-6 w-full max-md:max-w-md max-w-5xl">
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
              className="mt-4 btn bg-surfaceAlt w-full"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      <div className="text-center mt-10">
        {!projects.length && <p>No Projects Added.</p>}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard
            key={project._id}
            project={project}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </main>
  );
}
