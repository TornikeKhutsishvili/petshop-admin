import type React from "react";
import type { animalsList } from "../../../interfaces/animals.interface";
import type { categoriesList } from "../../../interfaces/categories.interface";
import {
  Card,
  Image,
  Name,
  Category,
  Price,
  PriceItemUSD,
  PriceItemGEL,
  Description,
  Stats,
  Badge,
  Stock,
} from "./PetCard.style";

interface Props {
  pet: animalsList;
  category?: categoriesList;
  onClick: () => void;
}

const PetCard: React.FC<Props> = ({ pet, category, onClick }) => {
  return (
    <Card key={pet.id} onClick={onClick}>
      <Image>{pet.image}</Image>

      <Name>{pet.name}</Name>

      <Category>{category?.title || "No Category"}</Category>

      <Price>
        <PriceItemUSD>${pet.priceUSD}</PriceItemUSD>
        <PriceItemGEL>₾{pet.priceGEL}</PriceItemGEL>
      </Price>

      <Description>{pet.description}</Description>

      <Stats>
        {pet.isPopular && <Badge>Popular</Badge>}
        <Stock></Stock>
      </Stats>
    </Card>
  );
};

export default PetCard;
