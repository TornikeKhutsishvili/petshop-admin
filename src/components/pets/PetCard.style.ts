import styled from "styled-components";

export const Card = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 28px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    border-color: #cbd5e0;
  }
`;

export const ImageDiv = styled.div`
  width: 100%;
  height: 220px;
  background: #edf2f7;
  border-radius: 8px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4a5568;
  font-size: 3.5rem;
`;

export const Image = styled.img`
  width: 100%;
  height: 230px;
`;

export const Name = styled.h3`
  font-size: 1.4rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 12px;
  letter-spacing: -0.01em;
`;

export const Category = styled.p`
  display: inline-block;
  background: #4a6fa5;
  color: white;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  margin-bottom: 16px;
`;

export const Price = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 16px;
`;

export const PriceItemUSD = styled.div`
  color: #38a169;
`;

export const PriceItemGEL = styled.div`
  color: #c53030;
`;

export const Description = styled.div`
  color: #718096;
  font-size: 0.95rem;
  margin-bottom: 20px;
  line-height: 1.6;
`;

export const Stats = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const Badge = styled.span`
  background: #feebc8;
  color: #dd6b20;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 600;
  border: 1px solid #f6ad55;
`;

export const Stock = styled.span`
  color: #4a5568;
  font-weight: 500;
  font-size: 0.9rem;
`;
