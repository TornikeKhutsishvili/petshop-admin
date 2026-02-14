import type React from "react";
import { useSelector } from "react-redux";
import type { animalsList } from "../../../interfaces/animals.interface";
import type { categoriesList } from "../../../interfaces/categories.interface";
import { animalsListSelector } from "../../../store/animals/animals.slice";
import { categoriesListSelector } from "../../../store/categories/categories.slice";
import {
  Wrapper,
  Card,
  Image,
  Name,
  Category,
  Description,
  Prices,
  Price,
  Stock,
  Badge,
} from "./PetDetail.style";

interface Props {
  petId: number;
  onClose?: () => void;
}

const petEmojis = ["🐕", "🐱", "🐦", "🐠", "🐰", "🐹", "🦔", "🐢"];

const PetDetail: React.FC<Props> = ({ petId, onClose }) => {
  const pets = useSelector(animalsListSelector);
  const categories = useSelector(categoriesListSelector);

  const pet: animalsList | undefined = pets.find((p) => p.id === petId);
  const category: categoriesList | undefined = categories.find(
    (c) => c.id === pet?.id,
  );

  if (!pet) return null;

  const emoji = petEmojis[pet.id % petEmojis.length];

  return (
    <Wrapper>
      <Card>
        {onClose && <button onClick={onClose}>✖</button>}

        <Image>{emoji}</Image>

        <Name>{pet.name}</Name>

        <Category>{category?.title || "No Category"}</Category>

        <Description>{pet.description}</Description>

        <Prices>
          <Price>${pet.priceUSD}</Price>
          <Price>₾{pet.priceGEL}</Price>
        </Prices>

        <Stock>Stock: {pet.stock}</Stock>

        {pet.isPopular && <Badge>Popular</Badge>}
      </Card>
    </Wrapper>
  );
};

export default PetDetail;
