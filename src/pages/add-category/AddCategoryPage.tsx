import type React from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  BtnBack,
  Form,
  FormContainer,
  FormTitle,
  FormGroup,
  FormLabel,
  FormInput,
  TextArea,
  BtnActions,
  CancelBtn,
  SaveBtn,
} from "./AddCategoryPage.style";

const AddCategoryPage: React.FC = () => {
  const navigation = useNavigate();
  const addCategory = () => {};
  const handleCancel = () => {};

  return (
    <>
      <Container>
        <BtnBack onClick={() => navigation("/categories")}>
          ← Back to Categories
        </BtnBack>

        <FormContainer>
          <FormTitle>Add New Category</FormTitle>
          <Form onSubmit={addCategory}>
            <FormGroup>
              <FormLabel>Category Title</FormLabel>
              <FormInput type="text" name="title" required></FormInput>
            </FormGroup>

            <FormGroup>
              <FormLabel>Description</FormLabel>
              <TextArea name="description" rows={4}></TextArea>
            </FormGroup>

            <BtnActions>
              <CancelBtn onClick={handleCancel}>Cancel</CancelBtn>
              <SaveBtn>Save Category</SaveBtn>
            </BtnActions>
          </Form>
        </FormContainer>
      </Container>
    </>
  );
};

export default AddCategoryPage;
