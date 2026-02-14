import type React from "react";
import { Card, Title } from "./CategoryCard.style";
import type { categoriesList } from "../../interfaces/categories.interface";

interface Props {
  category: categoriesList;
  onClick?: () => void;
}

const CategoryCard: React.FC<Props> = ({ category, onClick }) => {
  return (
    <Card onClick={onClick}>
      <Title>{category.title}</Title>
    </Card>
  );
};

export default CategoryCard;
