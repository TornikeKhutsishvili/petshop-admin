import styled from "styled-components";

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

export const BtnBack = styled.div`
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

export const FormContainer = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 40px;
  max-width: 650px;
  margin: 0 auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

export const FormTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 32px;
  text-align: center;
  letter-spacing: -0.02em;
`;

export const Form = styled.form``;

export const FormGroup = styled.div`
  margin-bottom: 24px;
`;

export const FormLabel = styled.label`
  display: block;
  box-sizing: border-box;
  margin-bottom: 8px;
  font-weight: 500;
  color: #4a5568;
  font-size: 15px;
`;

export const FormInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 16px 20px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 15px;
  transition: all 0.3s ease;
  background: #ffffff;
`;

export const FormSelect = styled.select`
  width: 100%;
  box-sizing: border-box;
  padding: 16px 20px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 15px;
  transition: all 0.3s ease;
  background: #ffffff;
`;

export const Option = styled.option``;

export const TextArea = styled.textarea`
  width: 100%;
  box-sizing: border-box;
  padding: 16px 20px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 15px;
  transition: all 0.3s ease;
  background: #ffffff;
`;

export const FormCheck = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const FormCheckInput = styled.input`
  width: 18px;
  height: 18px;
  accent-color: #4a6fa5;
`;

export const BtnActions = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-top: 32px;
`;

export const CancelBtn = styled.button`
  background: #edf2f7;
  color: #4a5568;
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

  &:hover {
    background: #e6e6e6;
  }
`;

export const SaveBtn = styled.button`
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
    background: #1d3860;
  }
`;
