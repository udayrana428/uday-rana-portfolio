import { useQuery } from "@tanstack/react-query";
import {
  featuredProjectsQuery,
  projectByIdQuery,
  projectsQuery,
} from "../../queries/projects.query";

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
