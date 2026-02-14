import type React from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { categoriesListSelector } from "../../store/categories/categories.slice";
import { updateCategory } from "../../store/categories/categories.thunks";
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

  const categories = useSelector(categoriesListSelector);
  const category = categories.find((c) => c.id === categoryId);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState(category?.title || "");
  const [description, setDescription] = useState(category?.description || "");

  if (!category) return <Container>Category not found</Container>;

  const handleSave = async () => {
    await dispatch(
      updateCategory({
        id: categoryId,
        category: { ...category, title, description },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }) as any,
    );
    navigate("/categories");
  };

  const handleCancel = () => navigate("/categories");

  return (
    <Container>
      <h2>Edit Category</h2>
      <Form>
        <label>Title</label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />

        <label>Description</label>
        <TextArea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <ButtonGroup>
          <Button onClick={handleSave}>Save</Button>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </ButtonGroup>
      </Form>
    </Container>
  );
};

export default EditCategoryPage;
