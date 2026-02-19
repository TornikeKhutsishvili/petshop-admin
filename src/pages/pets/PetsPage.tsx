import type React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Styles
import {
  Container,
  Page,
  ActionBar,
  Title,
  Button,
  CardsGrid,
} from "./PetsPage.style";

// Interfaces
import PetCard from "../../components/pets/PetCard";
import type { animalsList } from "../../interfaces/animals.interface";
import type { categoriesList } from "../../interfaces/categories.interface";

// redux store
import { useDispatch, useSelector } from "react-redux";
import {
  animalsListSelector,
  animalsLoadingSelector,
  animalsErrorSelector,
} from "../../store/animals/animals.slice";
import { categoriesListSelector } from "../../store/categories/categories.slice";
import { getAnimals } from "../../store/animals/animals.thunks";
import { getCategories } from "../../store/categories/categories.thunks";
import { animalsWithCategoriesListSelector } from "../../store/animals_with_categories/animals_with_categories.slice";
import type { AppDispatch } from "../../store";
import { get_animals_with_categories } from "../../store/animals_with_categories/animals_with_categories.thunks";
import type { animals_with_categoriesList } from "../../interfaces/animals_with_categories.interface";

const PetsPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const pets = useSelector(animalsListSelector);
  const categories = useSelector(categoriesListSelector);
  const animalCategories = useSelector(animalsWithCategoriesListSelector);
  const loading = useSelector(animalsLoadingSelector);
  const error = useSelector(animalsErrorSelector);

  useEffect(() => {
    dispatch(getAnimals());
    dispatch(getCategories());
    dispatch(get_animals_with_categories());
  }, [dispatch]);

  const getCategoryByAnimal = (
    animalId: string,
  ): categoriesList | undefined => {
    const relation = animalCategories.find((r: animals_with_categoriesList) =>
      r.animal_id.some((id) => id === animalId),
    );

    if (!relation || !relation.category_id) return undefined;

    const categoryId = relation.category_id;

    const categoriesId = categories.find(
      (c: categoriesList) => c.id === categoryId,
    );

    return categoriesId;
  };

  const petsWithCategories = pets.map((pet: animalsList) => {
    return {
      ...pet,
      category: getCategoryByAnimal(pet.id),
    };
  });

  const onSelectPet = (id: string) => {
    navigate(`/pet-detail/${id}`);
  };

  if (loading || categories.length === 0 || animalCategories.length === 0)
    return <Container>Loading pets...</Container>;
  if (error) return <Container>{error}</Container>;

  return (
    <Container>
      <Page>
        <ActionBar>
          <Title>All Pets</Title>
          <Button onClick={() => navigate("/add-pet")}>➕ Add New Pet</Button>
        </ActionBar>

        <CardsGrid>
          {petsWithCategories.map((pet) => (
            <PetCard
              key={pet.id}
              pet={pet}
              category={pet.category}
              onClick={() => onSelectPet(pet.id)}
            />
          ))}
        </CardsGrid>
      </Page>
    </Container>
  );
};

export default PetsPage;
