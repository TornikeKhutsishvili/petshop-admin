import React from "react";
import {
  Container,
  HeaderWrapper,
  Title,
  Subtitle,
  Nav,
  NavButton,
} from "./Header.styles";

export type Page = "pets" | "categories" | "add-pet" | "add-category";

interface HeaderProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({ activePage, onNavigate }) => {
  return (
    <Container>
      <HeaderWrapper>
        <Title>🐾 Pet Shop Admin</Title>
        <Subtitle>Manage your pets and categories with elegance</Subtitle>
      </HeaderWrapper>

      <Nav>
        <NavButton
          $active={activePage === "pets"}
          onClick={() => onNavigate("pets")}
        >
          Pets
        </NavButton>

        <NavButton
          $active={activePage === "categories"}
          onClick={() => onNavigate("categories")}
        >
          Categories
        </NavButton>

        <NavButton
          $active={activePage === "add-pet"}
          onClick={() => onNavigate("add-pet")}
        >
          + Add Pet
        </NavButton>

        <NavButton
          $active={activePage === "add-category"}
          onClick={() => onNavigate("add-category")}
        >
          + Add Category
        </NavButton>
      </Nav>
    </Container>
  );
};

export default Header;
