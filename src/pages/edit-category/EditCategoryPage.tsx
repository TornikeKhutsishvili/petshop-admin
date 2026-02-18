import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { categoriesListSelector } from "../../store/categories/categories.slice";
import { updateCategory } from "../../store/categories/categories.thunks";
import type { AppDispatch } from "../../store";
import {
  Container,
  Form,
  Input,
  TextArea,
  ButtonGroup,
  Button,
} from "./EditCategoryPage.style";

const EditCategoryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const categoryId = id || "";

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const categories = useSelector(categoriesListSelector);
  const category = categories.find((c) => c.id === categoryId);

  const [name, setName] = useState<string>(category?.name || "");
  const [description, setDescription] = useState<string>(
    category?.description || "",
  );

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!category) {
      alert("Category not found.");
      return;
    }

    try {
      await dispatch(
        updateCategory({
          id: categoryId,
          category: {
            ...category,
            name,
            description,
          },
        }),
      ).unwrap();

      navigate("/categories");
    } catch (err) {
      console.error("Update failed", err);
      alert("Failed to update category. Check console for details.");
    }
  };

  const handleCancel = () => navigate("/categories");

  if (!category) {
    return <Container>Category not found</Container>;
  }

  return (
    <Container>
      <h2>Edit Category</h2>

      <Form onSubmit={handleSave}>
        <label>Title</label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label>Description</label>
        <TextArea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <ButtonGroup>
          <Button type="submit">Save</Button>
          <Button type="button" variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </ButtonGroup>
      </Form>
    </Container>
  );
};

export default EditCategoryPage;
