import type React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
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

const CategoriesPage: React.FC = () => {
  const navigation = useNavigate();
  const categories = useSelector(categoriesListSelector);
  const loading = useSelector(categoriesLoadingSelector);
  const error = useSelector(categoriesErrorSelector);

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
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            onClick={() => console.log("Category:", category.id)}
          />
        ))}
      </Grid>
    </Container>
  );
};

export default CategoriesPage;
