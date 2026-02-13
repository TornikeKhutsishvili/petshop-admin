import type { RouteObject } from "react-router-dom";
// Layout
import MainLayout from "../layout/MainLayout.tsx";
// Pages

// Error Page
import ErrorPage from "../pages/error-page/ErrorPage.tsx";

// Types
import type { Page } from "../layout/header/Header.tsx";
interface CreateRouterArgs {
  activePage: Page;
  onNavigate: (page: Page) => void;
}

// Routes
const router = ({
  activePage,
  onNavigate,
}: CreateRouterArgs): RouteObject[] => [
  // Nested Routes
  {
    element: <MainLayout activePage={activePage} onNavigate={onNavigate} />,
    children: [],
  },

  // Error Handling Routes
  {
    element: <ErrorPage />,
    path: "*",
  },
];

export default router;
