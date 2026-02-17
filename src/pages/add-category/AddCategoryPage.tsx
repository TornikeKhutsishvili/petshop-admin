import React from "react";
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
import { add_animal_with_category } from "../../store/animals_with_categories/animals_with_categories.thunks";
import type { AppDispatch } from "../../store";
import { categoriesListSelector } from "../../store/categories/categories.slice";
import type { categoriesList } from "../../interfaces/categories.interface";
import type { animals_with_categoriesList } from "../../interfaces/animals_with_categories.interface";

const AddCategoryPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const categories = useSelector(categoriesListSelector);

  const addCategoryHandler = async (e: React.FormEvent<HTMLFormElement>) => {
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

    try {
      await dispatch(addCategory(newCategory)).unwrap();

      const newAWC: animals_with_categoriesList = {
        id: nextId,
        animal_id: [],
        category_id: nextId,
      };

      await dispatch(add_animal_with_category(newAWC)).unwrap();

      navigate("/categories");
    } catch (err) {
      console.error("Failed to add category:", err);
    }
  };

  const handleCancel = () => {
    navigate("/categories");
  };

  return (
    <Container>
      <BtnBack onClick={handleCancel}>← Back to Categories</BtnBack>

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
