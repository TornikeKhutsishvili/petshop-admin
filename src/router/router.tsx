import type { RouteObject } from "react-router-dom";
// Layout
import MainLayout from "../layout/MainLayout.tsx";
// Pages
import PetsPage from "../pages/pets/PetsPage.tsx";
import CategoriesPage from "../pages/categories/CategoriesPage.tsx";
import AddPetPage from "../pages/add-pet/AddPetPage.tsx";
import AddCategoryPage from "../pages/add-category/AddCategoryPage.tsx";
import EditPetPage from "../pages/edit-pet/EditPetPage.tsx";
import PetDetailPage from "../pages/pet-details/PetDetailPage.tsx";
// Error Page
import ErrorPage from "../pages/error-page/ErrorPage.tsx";

// Routes
const router: RouteObject[] = [
  // Nested Routes
  {
    element: <MainLayout />,
    children: [
      {
        element: <PetsPage />,
        path: "/pets",
      },
      {
        element: <CategoriesPage />,
        path: "/categories",
      },
      {
        element: <AddPetPage />,
        path: "/add-pet",
      },
      {
        element: <AddCategoryPage />,
        path: "/add-categories",
      },

      // dynamic
      {
        element: <EditPetPage />,
        path: "/edit-pet/:id",
      },
      {
        element: <PetDetailPage />,
        path: "/pet-detail/:id",
      },
    ],
  },

  // Error Handling Routes
  {
    element: <ErrorPage />,
    path: "*",
  },
];

export default router;
