import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  featuredProjectsQuery,
  projectByIdQuery,
  projectsQuery,
} from "../../queries/projects.query";
import {
  createProjectAPI,
  deleteProjectAPI,
  updateProjectAPI,
} from "../../api";

// Query
export const useProjects = (filters) => {
  return useQuery(projectsQuery(filters));
};

export const useProject = (id) => {
  console.log("id", id);
  return useQuery(projectByIdQuery(id));
};

export const useFeaturedProjects = () => {
  return useQuery(featuredProjectsQuery());
};

// Mutation
export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProjectAPI,
    onSuccess: () => {
      // Invalidate cached project lists
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
    },
  });
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ projectId, formData }) =>
      updateProjectAPI(projectId, formData),
    onSuccess: (updatedProject) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({
        queryKey: ["project", updatedProject._id],
      });
      queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProjectAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
    },
  });
};
