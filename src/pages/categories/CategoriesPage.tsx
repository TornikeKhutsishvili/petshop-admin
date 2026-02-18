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
import {
  deleteCategory,
  getCategories,
} from "../../store/categories/categories.thunks";
import { getAnimals } from "../../store/animals/animals.thunks";
import { animalsWithCategoriesListSelector } from "../../store/animals_with_categories/animals_with_categories.slice";
import { get_animals_with_categories } from "../../store/animals_with_categories/animals_with_categories.thunks";

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
    dispatch(get_animals_with_categories());
  }, [dispatch]);

  const handleEditCategory = (uuid: number) => {
    navigation(`/edit-category/${uuid}`);
  };

  const handleDeleteCategory = async (uuid: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?",
    );
    if (!confirmDelete) return;

    try {
      await dispatch(deleteCategory(uuid)).unwrap();
      alert("Category deleted successfully!");
    } catch (err) {
      console.error("Failed to delete category:", err);
      alert("Failed to delete category. Check console for details.");
    }
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
        {categories &&
          categories.map((category) => {
            const petsCount = animalCategories
              .filter(
                (relation) => relation.category_id === Number(category.uuid),
              )
              .reduce(
                (total, relation) => total + relation.animal_id.length,
                0,
              );

            return (
              <CategoryCard
                key={category.uuid}
                category={category}
                petsCount={petsCount}
                onClick={() => console.log("Category clicked", category.uuid)}
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
