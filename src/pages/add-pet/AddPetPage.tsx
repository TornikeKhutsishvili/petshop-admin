import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  BtnBack,
  FormContainer,
  FormTitle,
  Form,
  FormGroup,
  FormLabel,
  FormInput,
  FormSelect,
  Option,
  TextArea,
  FormCheck,
  FormCheckInput,
  BtnActions,
  CancelBtn,
  SaveBtn,
} from "./AddPetPage.style";

const AddPetPage: React.FC = () => {
  const navigation = useNavigate();
  const addPet = () => {};
  const handleCancel = () => {};

  return (
    <Container>
      <BtnBack onClick={() => navigation("/pets")}>← Back to Pets</BtnBack>

      <FormContainer>
        <FormTitle>Add New Pet</FormTitle>
        <Form onSubmit={addPet}>
          <FormGroup>
            <FormLabel>Pet Name</FormLabel>
            <FormInput type="text" name="name" required></FormInput>
          </FormGroup>

          <FormGroup>
            <FormLabel>Category</FormLabel>
            <FormSelect name="category" required>
              <Option value={""}></Option>
            </FormSelect>
          </FormGroup>

          <FormGroup>
            <FormLabel>Price (USD)</FormLabel>
            <FormInput
              type="number"
              name="priceUSD"
              step="0.01"
              required
            ></FormInput>
          </FormGroup>

          <FormGroup>
            <FormLabel>Price (GEL)</FormLabel>
            <FormInput
              type="number"
              name="priceGEL"
              step="0.01"
              required
            ></FormInput>
          </FormGroup>

          <FormGroup>
            <FormLabel>Stock</FormLabel>
            <FormInput type="number" name="stock" required></FormInput>
          </FormGroup>

          <FormGroup>
            <FormLabel>Description</FormLabel>
            <TextArea name="description" rows={4}></TextArea>
          </FormGroup>

          <FormGroup>
            <FormCheck>
              <FormCheckInput type="checkbox" name="isPopular"></FormCheckInput>
              <FormLabel>Popular Pet</FormLabel>
            </FormCheck>
          </FormGroup>

          <BtnActions>
            <CancelBtn onClick={handleCancel}>Cancel</CancelBtn>
            <SaveBtn>Save Pet</SaveBtn>
          </BtnActions>
        </Form>
      </FormContainer>
    </Container>
  );
};

export default AddPetPage;
