import styled from "styled-components";

export const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 40px 20px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;

  label {
    font-weight: 600;
    color: #2d3748;
  }
`;

export const Input = styled.input`
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  font-size: 1rem;
`;

export const TextArea = styled.textarea`
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  font-size: 1rem;
  min-height: 100px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 16px;
`;

interface ButtonProps {
  variant?: "secondary";
}

export const Button = styled.button<ButtonProps>`
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  background: ${({ variant }) =>
    variant === "secondary" ? "#E2E8F0" : "#4A6FA5"};
  color: ${({ variant }) => (variant === "secondary" ? "#4A5568" : "#fff")};

  &:hover {
    background: ${({ variant }) =>
      variant === "secondary" ? "#CBD5E0" : "#3e5c8a"};
  }
`;
