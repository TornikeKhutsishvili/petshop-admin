import styled from "styled-components";

export const Card = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  padding: 24px;
  cursor: pointer;
  text-align: center;
  transition: all 0.2s ease;

  &:hover {
    background: #f7fafc;
    transform: translateY(-2px);
  }
`;

export const Title = styled.h3`
  color: #2d3748;
  font-size: 1.1rem;
  font-weight: 600;
`;
