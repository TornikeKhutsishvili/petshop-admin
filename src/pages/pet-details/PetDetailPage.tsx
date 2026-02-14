import type React from "react";
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

interface Props {
  petId: number;
  onClose?: () => void;
}

const PetDetailPage: React.FC<Props> = ({ petId, onClose }) => {
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
        {onClose && (
          <button type="button" onClick={onClose}>
            ✖
          </button>
        )}

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
