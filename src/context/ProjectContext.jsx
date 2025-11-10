import { createContext, useContext, useState, useEffect } from "react";
import {
  createProjectAPI,
  deleteProjectAPI,
  getAllProjectsAPI,
  updateProjectAPI,
} from "../api";

const ProjectContext = createContext();

export function ProjectProvider({ children }) {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all projects on mount
  // useEffect(() => {
  //   const fetchProjects = async () => {
  //     setIsLoading(true);
  //     setError(null);
  //     try {
  //       const response = await getAllProjectsAPI();
  //       setProjects(response.data);
  //     } catch (error) {
  //       console.error("Failed to fetch projects:", error);
  //       setError(error.message || "Failed to fetch projects");
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchProjects();
  // }, []);

  const addProject = async (project) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await createProjectAPI(project);
      console.log("response", response);
      setProjects((prev) => [...prev, response.data.project]);
    } catch (error) {
      console.error("Failed to add project:", error);
      setError(error.message || "Failed to add project");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProject = async (id, updatedProject) => {
    setIsLoading(true);
    setError(null);
    try {
      await updateProjectAPI(id, updatedProject);
      setProjects((prev) =>
        prev.map((project) =>
          project._id === id ? { ...project, ...updatedProject } : project
        )
      );
    } catch (error) {
      console.error("Failed to update project:", error);
      setError(error.message || "Failed to update project");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProject = async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      console.log("deleteId: ", id);
      const response = await deleteProjectAPI(id);
      console.log("deleteResponse: ", response);
      setProjects((prev) => prev.filter((project) => project._id !== id));
    } catch (error) {
      console.error("Failed to delete project:", error);
      setError(error.message || "Failed to delete project");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        isLoading,
        error,
        addProject,
        updateProject,
        deleteProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProjects must be used within a ProjectProvider");
  }
  return context;
}
