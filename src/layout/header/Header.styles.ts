import styled from "styled-components";

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

export const HeaderWrapper = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 40px;
  margin-bottom: 40px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  text-align: center;
`;

export const Title = styled.h1`
  color: #2d3748;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 12px;
  letter-spacing: -0.02em;
`;

export const Subtitle = styled.p`
  color: #718096;
  font-size: 1.1rem;
  font-weight: 400;
`;

export const Nav = styled.div`
  display: flex;
  flex-wrap: wrap;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 8px;
  margin-bottom: 40px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

interface NavButtonProps {
  $active: boolean;
}

export const NavButton = styled.button<NavButtonProps>`
  flex: 1;
  padding: 16px 24px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  font-size: 15px;
  background: ${({ $active }) => ($active ? "#4A6FA5" : "transparent")};
  color: ${({ $active }) => ($active ? "#ffffff" : "#718096")};
  transition: all 0.3s ease;

  &:hover {
    background: #4a6fa5;
    color: #ffffff;
  }
`;
