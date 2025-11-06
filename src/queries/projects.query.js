import { queryOptions } from "@tanstack/react-query";
import {
  getAllProjectsAPI,
  getFeaturedProjectsAPI,
  getProjectAPI,
} from "../api";

export const projectsQuery = (filters) => {
  return queryOptions({
    queryKey: ["projects", filters],
    queryFn: () => getAllProjectsAPI(filters).then((res) => res.data),
    staleTime: 1000 * 60 * 5,
  });
};

export const projectByIdQuery = (id) => {
  return queryOptions({
    queryKey: ["project", id],
    queryFn: () => getProjectAPI(id).then((res) => res.data),
    staleTime: 1000 * 60 * 5,
  });
};

export const featuredProjectsQuery = () => {
  return queryOptions({
    queryKey: ["featured-projects"],
    queryFn: getFeaturedProjectsAPI,
    staleTime: 1000 * 60 * 5,
  });
};
