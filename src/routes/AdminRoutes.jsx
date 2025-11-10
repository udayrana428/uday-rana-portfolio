import { lazy } from "react";
import AdminLayout from "../layouts/AdminLayout";
import Projects from "../pages/admin/Projects";
import ProjectsError from "../pages/admin/ProjectsError";
import ErrorPage from "../pages/ErrorPage";
import NotFound from "../pages/NotFound";
// import { projectsLoader } from "../pages/admin/Projects";
// import { projectAction } from "../components/admin/ProjectForm";

// Lazy load other admin pages
const Dashboard = lazy(() => import("../pages/admin/Dashboard"));
const Profile = lazy(() => import("../pages/admin/Profile"));

const adminRoutes = [
  {
    element: <AdminLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        errorElement: <ErrorPage />,
      },
      {
        path: "projects",
        element: <Projects />,
        // loader: projectsLoader,
        // action: projectAction,
        errorElement: <ProjectsError />,
      },
      {
        path: "profile",
        element: <Profile />,
        errorElement: <ErrorPage />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];

export default adminRoutes;
