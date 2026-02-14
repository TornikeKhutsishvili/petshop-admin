import styled from "styled-components";

export const Card = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 28px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:hover {
    background: #f7fafc;
    transform: translateY(-4px);
    border-color: #cbd5e0;
  }
`;

export const Title = styled.div`
  font-size: 1.3rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 12px;
  letter-spacing: -0.01em;
`;

export const Description = styled.div`
  color: #718096;
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 20px;
`;

export const CountPet = styled.div`
  color: #718096;
  font-size: 0.9rem;
  margin-bottom: 20px;
  font-weight: 500;
`;

export const CardAction = styled.div`
  display: flex;
  gap: 12px;
`;

export const EditButton = styled.button`
  padding: 10px 18px;
  font-size: 13px;
  background: #edf2f7;
  color: #4a5568;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
  text-align: center;
  letter-spacing: 0.01em;
`;

export const DeleteButton = styled.button`
  padding: 10px 18px;
  font-size: 13px;
  background: #c53030;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
  text-align: center;
  letter-spacing: 0.01em;
`;
