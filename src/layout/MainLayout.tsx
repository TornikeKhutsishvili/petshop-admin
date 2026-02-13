import React, { type PropsWithChildren } from "react";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import styled from "styled-components";

type Page = "pets" | "categories" | "add-pet" | "add-category";

interface LayoutProps extends PropsWithChildren {
  activePage: Page;
  onNavigate: (page: Page) => void;
}

const Main = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const MainLayout: React.FC<LayoutProps> = ({
  children,
  activePage,
  onNavigate,
}) => {
  return (
    <>
      <Header activePage={activePage} onNavigate={onNavigate} />
      <Main>{children}</Main>
      <Footer />
    </>
  );
};

export default MainLayout;
