import type React from "react";
import {
  Card,
  Title,
  Description,
  CardAction,
  CountPet,
  EditButton,
  DeleteButton,
} from "./CategoryCard.style";
import type { categoriesList } from "../../interfaces/categories.interface";

interface Props {
  category: categoriesList;
  onClick: () => void;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

const CategoryCard: React.FC<Props> = ({
  category,
  onEdit,
  onClick,
  onDelete,
}) => {
  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onEdit?.(category.id);
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onDelete?.(category.id);
  };

  return (
    <Card key={category.id} onClick={onClick}>
      <Title>{category.title}</Title>
      <Description>{category.description}</Description>
      <CountPet>{}</CountPet>
      <CardAction>
        <EditButton onClick={handleEdit}>Edit</EditButton>
        <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
      </CardAction>
    </Card>
  );
};

export default CategoryCard;
