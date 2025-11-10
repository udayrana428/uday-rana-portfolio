import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URI,
  withCredentials: true, // important for sending the refresh token cookie
  timeout: 120000,
});

// Separate instance → avoids infinite refresh loops
const refreshClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URI,
  withCredentials: true,
});

let accessToken = null; // keep in memory
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

// Attach access token before each request
apiClient.interceptors.request.use(
  (config) => {
    console.log("accessToken", accessToken);
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
    // ✅ Detect FormData automatically
    if (config.data instanceof FormData) {
      // Let the browser set Content-Type + boundary automatically
      delete config.headers["Content-Type"];
    } else {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Handle 401 errors and refresh token
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      // Avoid refresh during logout request
      if (originalRequest.url.includes("/logout")) {
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return apiClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const res = await refreshTokenAPI(); // backend reads refresh token from cookie
        const newToken = res.data?.data?.accessToken;

        accessToken = newToken; // store in memory only
        // apiClient.defaults.headers.Authorization = `Bearer ${newToken}`;

        processQueue(null, newToken);
        // return apiClient(originalRequest);
        if (newToken) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return apiClient(originalRequest);
        }
      } catch (err) {
        processQueue(err, null);
        accessToken = null;
        localStorage.removeItem("user");
        window.location.href = "/login";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export const setAccessToken = (token) => {
  accessToken = token;
};

export default apiClient;

export const refreshTokenAPI = () => {
  return refreshClient.post("/users/refresh-token");
};

// Contact Email

export const sendContactEmailAPI = (data) => {
  return apiClient.post("/users/send-contact-email", data);
};

// AUTH API

export const loginUserAPI = (data) => {
  return apiClient.post("/users/login", data);
};
export const logoutUserAPI = () => {
  return apiClient.post("/users/logout");
};

export const currentUserAPI = () => {
  return apiClient.get("/users/current-user");
};

// PROJECT API

export const getAllProjectsAPI = (filters) => {
  return apiClient.get("/projects/getAllProjects", { params: filters });
};

export const getProjectAPI = (projectId) => {
  return apiClient.get(`/projects/getProject/${projectId}`); //("/projects/getProjectById", )
};

export const getFeaturedProjectsAPI = () => {
  return apiClient.get("/projects/getFeaturedProjects");
};
export const createProjectAPI = (data) => {
  return apiClient.post("/projects/createProject", data);
};

export const deleteProjectAPI = (projectId) => {
  // console.log("projectId", projectId);
  return apiClient.delete(`/projects/deleteProject/${projectId}`);
};

export const updateProjectAPI = (projectId, data) => {
  console.log("formData", data);
  return apiClient.patch(`/projects/updateProject/${projectId}`, data);
};

// Admin

export const getAllProjectsAdminAPI = (filters) => {
  return apiClient.get("/projects/getAllProjectsAdmin", { params: filters });
};
