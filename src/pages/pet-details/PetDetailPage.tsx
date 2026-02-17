import React from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Styles
import {
  Wrapper,
  BtnBack,
  PetDetail,
  PetDetailHeader,
  PetDetailImageDiv,
  PetDetailImage,
  PetDetailInfo,
  PetDetailName,
  PetDetailCategory,
  PetDetailPrices,
  PriceDetail,
  PriceLabel,
  PriceValueUSD,
  PriceValueGEL,
  PriceValueStock,
  PetDetailBadge,
  PetDetailSection,
  PetDetailSectionH3,
  PetDetailDescriptionWrapper,
  PetDetailDescriptionP,
  Actions,
  EditButton,
  DeleteButton,
} from "./PetDetailPage.style";

// Redux store
import { useDispatch, useSelector } from "react-redux";
import {
  animalsListSelector,
  animalsLoadingSelector,
} from "../../store/animals/animals.slice";
import { deleteAnimal, getAnimals } from "../../store/animals/animals.thunks";
import { getCategories } from "../../store/categories/categories.thunks";
import { categoriesListSelector } from "../../store/categories/categories.slice";
import { animalsWithCategoriesListSelector } from "../../store/animals_with_categories/animals_with_categories.slice";
import type { AppDispatch } from "../../store";
import { useCurrencyConverter } from "../../hooks/useCurrencyConverter";
import { delete_animal_with_category } from "../../store/animals_with_categories/animals_with_categories.thunks";

const PetDetailPage: React.FC = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();

  const pets = useSelector(animalsListSelector);
  const categories = useSelector(categoriesListSelector);
  const animalCategories = useSelector(animalsWithCategoriesListSelector);
  const loading = useSelector(animalsLoadingSelector);

  const deletePet = async (petId: number) => {
    try {
      await dispatch(deleteAnimal(petId)).unwrap();
      await dispatch(delete_animal_with_category(petId)).unwrap();
      navigation("/pets");
    } catch (err) {
      console.error("Failed to delete pet", err);
    }
  };

  const getCategoryByAnimal = (animalId: number) => {
    const relation = animalCategories.find((r) =>
      r.animal_id.includes(animalId),
    );
    return categories.find((c) => c.id === relation?.category_id);
  };

  useEffect(() => {
    dispatch(getAnimals());
    dispatch(getCategories());
  }, [dispatch]);

  const petId = id;
  const pet = pets.find((p) => String(p.id) === petId);
  const category = pet ? getCategoryByAnimal(pet.id) : null;

  const { converted: priceGEL, loading: gelLoading } = useCurrencyConverter(
    pet?.price || 0,
    "usd",
    "gel",
  );

  if (loading) return <Wrapper>Loading pets...</Wrapper>;
  if (!pet) return <Wrapper>Pet not found</Wrapper>;

  return (
    <>
      <BtnBack onClick={() => navigation(-1)}>← Back to Pets</BtnBack>

      <PetDetail>
        <PetDetailHeader>
          <PetDetailImageDiv>
            <PetDetailImage src={pet.image} alt={pet.name} />
          </PetDetailImageDiv>

          <PetDetailInfo>
            <PetDetailName>{pet.name}</PetDetailName>

            <PetDetailCategory>
              {category?.title || "No Category"}
            </PetDetailCategory>

            <PetDetailPrices>
              <PriceDetail>
                <PriceLabel>Price USD</PriceLabel>
                <PriceValueUSD>
                  {typeof pet.price === "number"
                    ? `$${pet.price.toFixed(2)}`
                    : "0.00"}
                </PriceValueUSD>
              </PriceDetail>
              <PriceDetail>
                <PriceLabel>Price GEL</PriceLabel>
                <PriceValueGEL>
                  {gelLoading
                    ? "₾..."
                    : `₾${typeof priceGEL === "number" ? priceGEL.toFixed(2) : "0.00"}`}
                </PriceValueGEL>
              </PriceDetail>
              <PriceDetail>
                <PriceLabel>Stock</PriceLabel>
                <PriceValueStock>{pet.inStock}</PriceValueStock>
              </PriceDetail>
            </PetDetailPrices>

            {pet.popular && <PetDetailBadge>Popular</PetDetailBadge>}
          </PetDetailInfo>
        </PetDetailHeader>

        <PetDetailSection>
          <PetDetailSectionH3>Description</PetDetailSectionH3>
          <PetDetailDescriptionWrapper>
            <PetDetailDescriptionP>{pet.description}</PetDetailDescriptionP>
          </PetDetailDescriptionWrapper>
        </PetDetailSection>

        <Actions>
          <EditButton onClick={() => navigation(`/edit-pet/${pet.id}`)}>
            Edit Pet
          </EditButton>
          <DeleteButton onClick={() => deletePet(pet.id)}>
            Delete Pet
          </DeleteButton>
        </Actions>
      </PetDetail>
    </>
  );
};

export default PetDetailPage;
