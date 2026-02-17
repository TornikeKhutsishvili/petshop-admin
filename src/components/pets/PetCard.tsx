import React from "react";
import type { animalsList } from "../../interfaces/animals.interface";
import type { categoriesList } from "../../interfaces/categories.interface";
import {
  Card,
  ImageDiv,
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
import { useCurrencyConverter } from "../../hooks/useCurrencyConverter";

interface Props {
  pet: animalsList;
  category?: categoriesList;
  onClick: () => void;
}

const PetCard: React.FC<Props> = ({ pet, category, onClick }) => {
  const { converted: priceGEL, loading: gelLoading } = useCurrencyConverter(
    pet.price,
    "usd",
    "gel",
  );

  return (
    <Card key={pet.id} onClick={onClick}>
      <ImageDiv>
        <Image src={pet.image} alt={pet.name} />
      </ImageDiv>

      <Name>{pet.name}</Name>

      <Category>{category?.title || "No Category"}</Category>

      <Price>
        <PriceItemUSD>${pet.price.toFixed(2)}</PriceItemUSD>
        <PriceItemGEL>
          {gelLoading ? "₾..." : `₾${priceGEL?.toFixed(2) ?? "0.00"}`}
        </PriceItemGEL>
      </Price>

      <Description>{pet.description}</Description>

      <Stats>
        {pet.popular && <Badge>Popular</Badge>}
        <Stock>Stock: {pet.inStock}</Stock>
      </Stats>
    </Card>
  );
};

export default PetCard;
