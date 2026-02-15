import styled from "styled-components";

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

export const ActionBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  padding: 24px 32px;
  border-radius: 12px;
  margin-bottom: 32px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

export const Title = styled.h2`
  color: #2d3748;
  font-size: 1.6rem;
  font-weight: 600;
`;

export const Button = styled.button`
  background: #4a6fa5;
  color: white;
  padding: 14px 28px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  font-size: 15px;
  text-decoration: none;
  display: inline-block;
  text-align: center;
  letter-spacing: 0.01em;

  &:hover {
    background: #3e6fa5;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 24px;
`;
