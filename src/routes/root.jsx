import { createBrowserRouter } from "react-router-dom";
import adminRoutes from "./AdminRoutes";
import portfolioRoutes from "./PortfolioRoutes";
import RootLayout from "../layouts/RootLayout";
import ErrorPage from "../pages/ErrorPage";
import NotFound from "../pages/NotFound";
import Login from "../pages/auth/Login";
// import { loginAction } from "../pages/auth/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      ...portfolioRoutes,
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin",
    children: adminRoutes,
    errorElement: <ErrorPage />,
  },
]);

export default router;
