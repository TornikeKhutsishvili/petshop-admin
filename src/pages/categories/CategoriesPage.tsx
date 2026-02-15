import type React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CategoryCard from "../../components/categories/CategoryCard";
import {
  categoriesListSelector,
  categoriesLoadingSelector,
  categoriesErrorSelector,
} from "../../store/categories/categories.slice";
import {
  Container,
  Grid,
  Title,
  ActionBar,
  Button,
} from "./CategoriesPage.style";
import type { AppDispatch } from "../../store";
import { useEffect } from "react";
import { getCategories } from "../../store/categories/categories.thunks";
import { getAnimals } from "../../store/animals/animals.thunks";
import { animalsWithCategoriesListSelector } from "../../store/animals_with_categories/animals_with_categories.slice";

const CategoriesPage: React.FC = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const categories = useSelector(categoriesListSelector);
  const loading = useSelector(categoriesLoadingSelector);
  const error = useSelector(categoriesErrorSelector);
  const animalCategories = useSelector(animalsWithCategoriesListSelector);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getAnimals());
  }, [dispatch]);

  const handleEditCategory = (id: number) => {
    console.log("Edit category", id);
    navigation(`/edit-category/${id}`);
  };

  const handleDeleteCategory = (id: number) => {
    console.log("Delete category", id);
    // აქ შეგიძლია გამოიძახო delete thunk
  };

  if (loading) return <Container>Loading categories...</Container>;
  if (error) return <Container>{error}</Container>;

  return (
    <Container>
      <ActionBar>
        <Title>Categories</Title>
        <Button onClick={() => navigation("/add-category")}>
          ➕ Add New Category
        </Button>
      </ActionBar>

      <Grid>
        {categories.map((category) => {
          const petsCount = animalCategories.filter((pet) =>
            pet.category_id?.includes(category.id),
          ).length;

          return (
            <CategoryCard
              key={category.id}
              category={category}
              petsCount={petsCount}
              onClick={() => console.log("Category clicked", category.id)}
              onEdit={handleEditCategory}
              onDelete={handleDeleteCategory}
            />
          );
        })}
      </Grid>
    </Container>
  );
};

export default CategoriesPage;
