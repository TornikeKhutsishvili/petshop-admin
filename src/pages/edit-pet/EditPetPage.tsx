import type React from "react";
import { useNavigate } from "react-router-dom";
import {
  BtnBack,
  Container,
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
  UpdateBtn,
} from "./EditPetPage.style";

const EditPetPage: React.FC = () => {
  const navigation = useNavigate();
  const updatePet = () => {};

  const handleCancel = () => {};

  return (
    <>
      <Container>
        <BtnBack onClick={() => navigation("/pets")}>← Back</BtnBack>

        <FormContainer>
          <FormTitle>Edit Pet</FormTitle>
          <Form onSubmit={updatePet}>
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
                <FormCheckInput
                  type="checkbox"
                  name="isPopular"
                ></FormCheckInput>
                <FormLabel>Popular Pet</FormLabel>
              </FormCheck>
            </FormGroup>

            <BtnActions>
              <CancelBtn onClick={handleCancel}>Cancel</CancelBtn>
              <UpdateBtn>Update Pet</UpdateBtn>
            </BtnActions>
          </Form>
        </FormContainer>
      </Container>
    </>
  );
};

export default EditPetPage;
