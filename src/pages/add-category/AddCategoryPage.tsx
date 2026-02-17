import type React from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { addCategory } from "../../store/categories/categories.thunks";
import type { AppDispatch } from "../../store";
import { categoriesListSelector } from "../../store/categories/categories.slice";
import type { categoriesList } from "../../interfaces/categories.interface";

const AddCategoryPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const categories = useSelector(categoriesListSelector);

  const addCategoryHandler = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const maxId = categories.length
      ? Math.max(...categories.map((c: categoriesList) => c.id))
      : 0;
    const nextId = maxId + 1;

    const newCategory = {
      id: nextId,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
    };

    dispatch(addCategory(newCategory))
      .unwrap()
      .then(() => {
        navigate("/categories");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleCancel = () => {
    navigate("/categories");
  };

  return (
    <Container>
      <BtnBack onClick={() => navigate("/categories")}>
        ← Back to Categories
      </BtnBack>

      <FormContainer>
        <FormTitle>Add New Category</FormTitle>

        <Form onSubmit={addCategoryHandler}>
          <FormGroup>
            <FormLabel>Category Title</FormLabel>
            <FormInput type="text" name="title" required />
          </FormGroup>

          <FormGroup>
            <FormLabel>Description</FormLabel>
            <TextArea name="description" rows={4} />
          </FormGroup>

          <BtnActions>
            <CancelBtn type="button" onClick={handleCancel}>
              Cancel
            </CancelBtn>
            <SaveBtn type="submit">Save Category</SaveBtn>
          </BtnActions>
        </Form>
      </FormContainer>
    </Container>
  );
};

export default AddCategoryPage;
