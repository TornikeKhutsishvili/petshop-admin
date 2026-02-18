import React from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import type { animalsList } from "../../interfaces/animals.interface";
import type { categoriesList } from "../../interfaces/categories.interface";
import type { animals_with_categoriesList } from "../../interfaces/animals_with_categories.interface";

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
  const { uuid } = useParams();

  useEffect(() => {
    dispatch(getAnimals());
    dispatch(getCategories());
    dispatch(get_animals_with_categories());
  }, [dispatch]);

  const pets = useSelector(animalsListSelector);
  const categories = useSelector(categoriesListSelector);
  const animalCategories = useSelector(animalsWithCategoriesListSelector);
  const loading = useSelector(animalsLoadingSelector);

  const petId = uuid;
  const pet = pets.find((p: animalsList) => Number(p.uuid) === Number(petId));

  const deletePet = async (petId: number) => {
    try {
      const existingAnimal = pets.find((a: animalsList) => a.uuid === petId);
      if (!existingAnimal) {
        console.warn(`Animal with id ${petId} does not exist`);
        return;
      }

      const relation = animalCategories.find((r: animals_with_categoriesList) =>
        r.animal_id.includes(petId),
      );
      if (relation) {
        const updatedRelation = {
          ...relation,
          animal_id: relation.animal_id.filter(
            (uuid: number) => uuid !== petId,
          ),
        };

        await dispatch(
          update_animal_with_category({
            uuid: relation.uuid,
            category: updatedRelation,
          }),
        ).unwrap();
      }

      // Delete animal
      await dispatch(deleteAnimal(petId)).unwrap();

      navigation("/pets");
    } catch (err) {
      console.error("Failed to delete pet", err);
    }
  };

  const getCategoryByAnimal = (animalId: number) => {
    const relation = animalCategories.find((r: animals_with_categoriesList) =>
      r.animal_id.includes(animalId),
    );

    return categories.find(
      (c: categoriesList) => c.uuid === relation?.category_id,
    );
  };

  const category = pet ? getCategoryByAnimal(pet.uuid) : null;

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
          <EditButton onClick={() => navigation(`/edit-pet/${pet.uuid}`)}>
            Edit Pet
          </EditButton>
          <DeleteButton onClick={() => deletePet(pet.uuid)}>
            Delete Pet
          </DeleteButton>
        </Actions>
      </PetDetail>
    </>
  );
};

export default PetDetailPage;
