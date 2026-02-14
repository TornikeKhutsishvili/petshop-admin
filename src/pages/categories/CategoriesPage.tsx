import type React from "react";
import { useSelector } from "react-redux";
import CategoryCard from "../../components/categories/CategoryCard";
import {
  categoriesListSelector,
  categoriesLoadingSelector,
  categoriesErrorSelector,
} from "../../store/categories/categories.slice";
import { Container, Grid, Title } from "./CategoriesPage.style";

const CategoriesPage: React.FC = () => {
  const categories = useSelector(categoriesListSelector);
  const loading = useSelector(categoriesLoadingSelector);
  const error = useSelector(categoriesErrorSelector);

  if (loading) return <Container>Loading categories...</Container>;
  if (error) return <Container>{error}</Container>;

  return (
    <Container>
      <Title>Categories</Title>

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
