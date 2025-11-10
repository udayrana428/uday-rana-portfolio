import { createBrowserRouter } from "react-router-dom";
import adminRoutes from "./AdminRoutes";
import portfolioRoutes from "./PortfolioRoutes";
import RootLayout from "../layouts/RootLayout";
import ErrorPage from "../pages/ErrorPage";
import NotFound from "../pages/NotFound";
import Login from "../pages/auth/Login";
import PrivateRoute from "./PrivateRoute";
// import { loginAction } from "../pages/auth/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      ...portfolioRoutes,
      {
        path: "/login",
        element: <Login />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/admin",
        element: <PrivateRoute />,
        children: adminRoutes,
        errorElement: <ErrorPage />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  // {
  //   path: "/login",
  //   element: <Login />,
  //   errorElement: <ErrorPage />,
  // },
  // {
  //   path: "/admin",
  //   element: <PrivateRoute />,
  //   children: adminRoutes,
  //   errorElement: <ErrorPage />,
  // },
]);

export default router;
