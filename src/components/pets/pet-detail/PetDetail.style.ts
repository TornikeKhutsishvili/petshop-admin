import styled from "styled-components";

export const Wrapper = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const Card = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 32px;
  width: 100%;
  max-width: 480px;
  position: relative;
`;

export const Image = styled.div`
  font-size: 64px;
  text-align: center;
  margin-bottom: 16px;
`;

export const Name = styled.h2`
  color: #2d3748;
  text-align: center;
  margin-bottom: 4px;
`;

export const Category = styled.p`
  color: #718096;
  text-align: center;
  margin-bottom: 16px;
`;

export const Description = styled.p`
  color: #4a5568;
  font-size: 0.95rem;
  margin-bottom: 20px;
`;

export const Prices = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
`;

export const Price = styled.span`
  font-weight: 600;
  color: #4a6fa5;
`;

export const Stock = styled.p`
  color: #2d3748;
  font-weight: 500;
  margin-bottom: 12px;
`;

export const Badge = styled.span`
  display: inline-block;
  padding: 6px 14px;
  border-radius: 20px;
  background: #4a6fa5;
  color: #ffffff;
  font-size: 13px;
  font-weight: 600;
`;
