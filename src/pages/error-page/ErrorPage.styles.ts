import { Link } from "react-router-dom";
import styled from "styled-components";
import root from "../../styles/rootStyle";

export const ErrorPageWrapper = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e5b299;
`;

export const ErrorCard = styled.div`
  background-color: ${root.colors.white};
  padding: 50px 60px;
  border-radius: ${root.borderRadius};
  box-shadow: ${root.shadow};
  text-align: center;
  max-width: 500px;
  width: 100%;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  color: ${root.colors.primary};
  margin-bottom: 15px;
`;

export const Description = styled.p`
  font-size: 1rem;
  color: ${root.colors.text};
  margin-bottom: 30px;
  line-height: 1.6;
`;

export const BackButton = styled(Link)`
  display: inline-block;
  padding: 12px 24px;
  background-color: ${root.colors.primary};
  color: ${root.colors.white};
  border-radius: ${root.borderRadius};
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${root.colors.secondary};
  }
`;
