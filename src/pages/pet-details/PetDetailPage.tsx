import type React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import type { animalsList } from "../../interfaces/animals.interface";
import type { categoriesList } from "../../interfaces/categories.interface";
import { animalsListSelector } from "../../store/animals/animals.slice";
import { categoriesListSelector } from "../../store/categories/categories.slice";
import {
  Wrapper,
  BtnBack,
  PetDetail,
  PetDetailHeader,
  PetDetailImage,
  PetDetailInfo,
  PetDetailName,
  PetDetailCategory,
  PetDetailDescription,
  PetDetailPrices,
  PriceDetail,
  PriceLabel,
  PriceValueUSD,
  PriceValueGEL,
  PriceValueStock,
  PetDetailBadge,
  PetDetailSection,
  Actions,
} from "./PetDetailPage.style";

const PetDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const petId = Number(id);
  const pets = useSelector(animalsListSelector);
  const categories = useSelector(categoriesListSelector);

  const pet: animalsList | undefined = pets.find((p) => p.id === petId);
  const category: categoriesList | undefined = categories.find(
    (c) => c.id === pet?.id,
  );

  if (!pet) return null;

  return (
    <Wrapper>
      <BtnBack>← Back to Pets</BtnBack>

      <PetDetail>
        <PetDetailHeader>
          <PetDetailImage>{pet.image}</PetDetailImage>

          <PetDetailInfo>
            <PetDetailName>{pet.name}</PetDetailName>

            <PetDetailCategory>
              {category?.title || "No Category"}
            </PetDetailCategory>

            <PetDetailPrices>
              <PriceDetail>
                <PriceLabel></PriceLabel>
                <PriceValueUSD>${pet.priceUSD}</PriceValueUSD>
              </PriceDetail>
              <PriceDetail>
                <PriceLabel></PriceLabel>
                <PriceValueGEL>₾{pet.priceGEL}</PriceValueGEL>
              </PriceDetail>
              <PriceDetail>
                <PriceLabel>Stock</PriceLabel>
                <PriceValueStock>Stock: {pet.stock}</PriceValueStock>
              </PriceDetail>
            </PetDetailPrices>

            {pet.isPopular && <PetDetailBadge>Popular</PetDetailBadge>}
          </PetDetailInfo>
        </PetDetailHeader>

        <PetDetailSection>
          <PetDetailDescription>{pet.description}</PetDetailDescription>
        </PetDetailSection>
      </PetDetail>

      <Actions></Actions>
    </Wrapper>
  );
};

export default PetDetailPage;
