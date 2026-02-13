import React from "react";
import { HeaderWrapper, Logo, Nav, NavButton } from "./Header.styles";

export type Page = "pets" | "categories" | "add-pet" | "add-category";

interface HeaderProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({ activePage, onNavigate }) => {
  return (
    <HeaderWrapper>
      <Logo>🐾 Pet Shop Admin</Logo>

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
    </HeaderWrapper>
  );
};

export default Header;
