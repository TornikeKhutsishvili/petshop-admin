import type { RouteObject } from "react-router-dom";
// Layout
import MainLayout from "../layout/MainLayout.tsx";
// Pages
import Index from "../pages/Index.tsx";
import PetsPage from "../pages/pets/PetsPage.tsx";
import CategoriesPage from "../pages/categories/CategoriesPage.tsx";
import AddPetPage from "../pages/add-pet/AddPetPage.tsx";
import AddCategoryPage from "../pages/add-category/AddCategoryPage.tsx";
import PetDetailPage from "../pages/pet-details/PetDetailPage.tsx";
import EditPetPage from "../pages/edit-pet/EditPetPage.tsx";
import EditCategoryPage from "../pages/edit-category/EditCategoryPage.tsx";
// Error Page
import ErrorPage from "../pages/error-page/ErrorPage.tsx";

// Routes
const router: RouteObject[] = [
  // Nested Routes
  {
    element: <MainLayout />,
    children: [
      {
        element: <Index />,
        index: true,
      },
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
        path: "/add-category",
      },

      // dynamic
      {
        element: <PetDetailPage />,
        path: "/pets/:id",
      },
      {
        element: <EditPetPage />,
        path: "/pets/:id",
      },
      {
        element: <EditCategoryPage />,
        path: "/categories/:id",
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
