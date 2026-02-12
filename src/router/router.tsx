// Layout
import type { RouteObject } from "react-router-dom";
import MainLayout from "../layout/MainLayout.tsx";
// Pages

// Error Page
import ErrorPage from "../pages/ErrorPage.tsx";

const router: RouteObject[] = [
  // Nested Routes
  {
    element: <MainLayout />,
    children: [],
  },

  // Error Handling Routes
  {
    element: <ErrorPage />,
    path: "*",
  },
];

export default router;
