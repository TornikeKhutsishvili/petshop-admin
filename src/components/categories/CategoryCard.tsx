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
  petsCount?: number;
  onClick: () => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const CategoryCard: React.FC<Props> = ({
  category,
  petsCount = 0,
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

      <CountPet>
        {petsCount} pet{petsCount !== 1 ? "s" : ""}
      </CountPet>

      <CardAction>
        <EditButton onClick={handleEdit}>Edit</EditButton>
        <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
      </CardAction>
    </Card>
  );
};

export default CategoryCard;
