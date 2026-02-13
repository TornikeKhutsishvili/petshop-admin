import styled from "styled-components";

export const HeaderWrapper = styled.header`
  background: #ffffff;
  border-bottom: 1px solid #e2e8f0;
  padding: 20px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Logo = styled.h1`
  font-size: 1.4rem;
  font-weight: 700;
  color: #2d3748;
`;

export const Nav = styled.nav`
  display: flex;
  gap: 12px;
`;

interface NavButtonProps {
  $active: boolean;
}

export const NavButton = styled.button<NavButtonProps>`
  padding: 10px 18px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  background: ${({ $active }) => ($active ? "#4A6FA5" : "#EDF2F7")};
  color: ${({ $active }) => ($active ? "#ffffff" : "#4A5568")};
  transition: all 0.2s ease;

  &:hover {
    background: ${({ $active }) => ($active ? "#3e5c8a" : "#E2E8F0")};
  }
`;
