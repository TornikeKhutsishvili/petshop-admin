import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import styled from "styled-components";

export type Page = "pets" | "categories" | "add-pet" | "add-category";

const Main = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const pathToPage: Record<string, Page> = {
  "/pets": "pets",
  "/categories": "categories",
  "/add-pet": "add-pet",
  "/add-category": "add-category",
};

const pageToPath: Record<Page, string> = {
  pets: "/pets",
  categories: "/categories",
  "add-pet": "/add-pet",
  "add-category": "/add-category",
};

const MainLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const activePage: Page = pathToPage[location.pathname] ?? "pets";

  const onNavigate = (page: Page) => {
    navigate(pageToPath[page]);
  };

  return (
    <>
      <Header activePage={activePage} onNavigate={onNavigate} />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </>
  );
};

export default MainLayout;
