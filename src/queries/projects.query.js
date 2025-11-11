import { queryOptions, useQueryClient } from "@tanstack/react-query";
import {
  createProjectAPI,
  getAllProjectsAdminAPI,
  getAllProjectsAPI,
  getFeaturedProjectsAPI,
  getProjectAPI,
} from "../api";

export const projectsQuery = (filters) => {
  return queryOptions({
    queryKey: ["projects", filters],
    queryFn: () => getAllProjectsAPI(filters).then((res) => res.data),
    staleTime: 1000 * 60 * 5,
    // staleTime: 0,
    cacheTime: 1000 * 60 * 5,
  });
};

export const projectByIdQuery = (id) => {
  return queryOptions({
    queryKey: ["project", id],
    queryFn: () => getProjectAPI(id).then((res) => res.data),
    staleTime: 1000 * 60 * 5,
    // staleTime: 0,
  });
};

export const featuredProjectsQuery = () => {
  return queryOptions({
    queryKey: ["featured-projects"],
    queryFn: getFeaturedProjectsAPI,
    staleTime: 1000 * 60 * 5,
  });
};

// Admin
export const adminProjectsQuery = (filters) => {
  return queryOptions({
    queryKey: ["admin-projects", filters],
    queryFn: () => getAllProjectsAdminAPI(filters).then((res) => res.data),
    staleTime: 0, // always stale
    cacheTime: 0, // don't store
    // refetchOnMount: true,
    refetchOnWindowFocus: false,
    // refetchInterval: 10000, // optional: auto-refresh every 10s
  });
};
