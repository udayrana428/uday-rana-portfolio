// Import necessary modules and utilities
import axios from "axios";
import { LocalStorage } from "../utils/index";

// Create an Axios instance for API requests
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URI,
  withCredentials: true,
  timeout: 120000,
});

// Add an interceptor to set authorization header with user token before requests
apiClient.interceptors.request.use(
  function (config) {
    // Retrieve user token from local storage
    const token = localStorage.getItem("token");
    // Set authorization header with bearer token
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Contact Email

export const sendEmail = (data) => {
  return apiClient.post("/contact/sendmail", data);
};

// AUTH API

export const loginUser = (data) => {
  return apiClient.post("/auth/login", data);
};
export const logoutUser = () => {
  return apiClient.post("/auth/logout");
};

// PROJECT API

export const getAllProjectsAPI = () => {
  return apiClient.get("/projects/fetchAllProjects");
};
export const createProjectAPI = (data) => {
  return apiClient.post("/projects/createProject", data);
};

export const deleteProjectAPI = (projectId) => {
  // console.log("projectId", projectId);
  return apiClient.delete(`/projects/deleteProject/${projectId}`);
};

export const updateProjectAPI = (projectId, data) => {
  return apiClient.put(`/projects/updateProject/${projectId}`, data);
};
