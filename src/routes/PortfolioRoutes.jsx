import { lazy } from "react";
import { Navigate } from "react-router-dom";
import PortfolioLayout from "../layouts/PortfolioLayout";
import ErrorBoundary from "../components/common/ErrorBoundary";
import NotFound from "../pages/NotFound";

// Lazy load pages for better performance
const Home = lazy(() => import("../pages/portfolio/Home"));
const About = lazy(() => import("../pages/portfolio/About"));
const Projects = lazy(() => import("../pages/portfolio/Projects"));
const ProjectDetails = lazy(() => import("../pages/portfolio/ProjectDetails"));
const Contact = lazy(() => import("../pages/portfolio/Contact"));

// Loaders and Actions
// import {
//   homeLoader,
//   aboutLoader,
//   projectsLoader,
//   projectDetailsLoader,
//   contactAction,
// } from "../utils/api";

import { homeLoader } from "../pages/portfolio/Home";
import { aboutLoader } from "../pages/portfolio/About";
import { projectsLoader } from "../pages/portfolio/Projects";
import { projectDetailsLoader } from "../pages/portfolio/ProjectDetails";

const portfolioRoutes = [
  {
    element: <PortfolioLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: homeLoader,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "about",
        element: <About />,
        loader: aboutLoader,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "projects",
        children: [
          {
            index: true,
            element: <Projects />,
            loader: projectsLoader,
            errorElement: <ErrorBoundary />,
          },
          {
            path: ":projectId",
            element: <ProjectDetails />,
            loader: projectDetailsLoader,
            errorElement: <ErrorBoundary />,
          },
        ],
      },
      {
        path: "contact",
        element: <Contact />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];

export default portfolioRoutes;
