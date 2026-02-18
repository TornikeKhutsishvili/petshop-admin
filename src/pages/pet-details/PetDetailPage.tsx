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
import {
  get_animals_with_categories,
  update_animal_with_category,
} from "../../store/animals_with_categories/animals_with_categories.thunks";

const PetDetailPage: React.FC = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    dispatch(getAnimals());
    dispatch(getCategories());
    dispatch(get_animals_with_categories());
  }, [dispatch]);

  const pets = useSelector(animalsListSelector);
  const categories = useSelector(categoriesListSelector);
  const animalCategories = useSelector(animalsWithCategoriesListSelector);
  const loading = useSelector(animalsLoadingSelector);

  const petId = id;
  const pet = pets.find((p) => p.id === petId);

  const deletePet = async (petId: string) => {
    try {
      const existingAnimal = pets.find((a) => a.id === petId);
      if (!existingAnimal) return;

      const relation = animalCategories.find((r) =>
        r.animal_id.includes(petId),
      );

      if (relation) {
        const updatedRelation = {
          ...relation,
          animal_id: relation.animal_id.filter((id) => id !== petId),
        };

        await dispatch(
          update_animal_with_category({
            id: relation.id,
            category: updatedRelation,
          }),
        ).unwrap();
      }

      await dispatch(deleteAnimal(petId)).unwrap();
      navigation("/pets");
    } catch (err) {
      console.error("Failed to delete pet", err);
    }
  };

  const getCategoryByAnimal = (animalId: string) => {
    const relation = animalCategories.find((r) =>
      r.animal_id.includes(animalId),
    );

    if (!relation) return undefined;

    return categories.find((c) => c.id === relation?.category_id);
  };

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
              {category?.name || "No Category"}
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
