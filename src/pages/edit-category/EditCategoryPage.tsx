import type React from "react";
import { useState } from "react";
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
  const categoryId = Number(id);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const categories = useSelector(categoriesListSelector);
  const category = categories.find((c) => c.id === categoryId);

  const [title, setTitle] = useState(category?.title || "");
  const [description, setDescription] = useState(category?.description || "");

  if (!category) {
    return <Container>Category not found</Container>;
  }

  const handleSave = async (e: React.SubmitEvent) => {
    e.preventDefault();

    try {
      await dispatch(
        updateCategory({
          id: categoryId,
          category: {
            ...category,
            title,
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

  return (
    <Container>
      <h2>Edit Category</h2>

      <Form key={category.id} onSubmit={handleSave}>
        <label>Title</label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
