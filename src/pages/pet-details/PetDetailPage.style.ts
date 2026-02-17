import styled from "styled-components";

export const Wrapper = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const BtnBack = styled.a`
  background: #edf2f7;
  color: #4a5568;
  margin-bottom: 24px;
  border: 1px solid #e2e8f0;
  padding: 14px 28px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  font-size: 15px;
  text-decoration: none;
  display: inline-block;
  text-align: center;
  letter-spacing: 0.01em;
`;

export const PetDetail = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

export const PetDetailHeader = styled.div`
  display: flex;
  gap: 40px;
  margin-bottom: 40px;
`;

export const PetDetailImageDiv = styled.div`
  width: 320px;
  height: 320px;
  background: #edf2f7;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4a5568;
  font-size: 5rem;
  flex-shrink: 0;
`;

export const PetDetailImage = styled.img`
  width: 320px;
  height: 320px;
`;

export const PetDetailInfo = styled.div`
  flex: 1;
`;

export const PetDetailName = styled.div`
  font-size: 2.8rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 20px;
  letter-spacing: -0.02em;
`;

export const PetDetailCategory = styled.div`
  background: #4a6fa5;
  color: white;
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 30px;
  display: inline-block;
`;

export const PetDetailPrices = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 30px;
`;

export const PriceDetail = styled.div`
  text-align: center;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  flex: 1;
`;

export const PriceLabel = styled.div`
  font-size: 0.9rem;
  color: #718096;
  margin-bottom: 8px;
  font-weight: 500;
`;

export const PriceValueUSD = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: #38a169;
`;

export const PriceValueGEL = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: #c53030;
`;

export const PriceValueStock = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
`;

export const PetDetailBadge = styled.span`
  font-size: 1rem;
  padding: 10px 20px;
  background: #feebc8;
  color: #dd6b20;
  border-radius: 8px;
  font-weight: 600;
  border: 1px solid #f6ad55;
`;

export const PetDetailSection = styled.section`
  margin-bottom: 40px;
`;

export const PetDetailSectionH3 = styled.h3`
  color: #2d3748;
  margin-bottom: 20px;
  font-size: 1.4rem;
  font-weight: 600;
`;

export const PetDetailDescriptionWrapper = styled.div`
  background: #f8f9fa;
  padding: 28px;
  border-radius: 10px;
  margin-bottom: 30px;
  border: 1px solid #e2e8f0;
`;

export const PetDetailDescriptionP = styled.p`
  margin: 0;
  line-height: 1.7;
  font-size: 1.05rem;
`;

export const Actions = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
`;

export const EditButton = styled.button`
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
  background: #4a6fa5;
  color: white;

  &:hover {
    background: #2b5d8c;
  }
`;

export const DeleteButton = styled.button`
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
  background: #c53030;
  color: white;

  &:hover {
    background: #e53e3e;
  }
`;
