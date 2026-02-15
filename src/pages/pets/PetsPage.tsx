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

const PetsPage: React.FC = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const pets = useSelector(animalsListSelector);
  const categories = useSelector(categoriesListSelector);
  const loading = useSelector(animalsLoadingSelector);
  const error = useSelector(animalsErrorSelector);
  const animalCategories = useSelector(animalsWithCategoriesListSelector);

  const getCategoryByAnimal = (animalId: number) => {
    const relation = animalCategories.find((r) =>
      r.animal_id.includes(animalId),
    );

    return categories.find((c) => c.id === relation?.category_id[0]);
  };

  useEffect(() => {
    dispatch(getAnimals());
    dispatch(getCategories());
  }, [dispatch]);

  const onSelectPet = (id: number) => {
    navigation(`/pet-detail/${id}`);
  };

  if (loading) return <Container>Loading pets...</Container>;
  if (error) return <Container>{error}</Container>;

  return (
    <Container>
      <Page>
        <ActionBar>
          <Title>All Pets</Title>
          <Button onClick={() => navigation("/add-pet")}>➕ Add New Pet</Button>
        </ActionBar>

        <CardsGrid>
          {pets.map((pet: animalsList) => (
            <PetCard
              key={pet.id}
              pet={pet}
              category={getCategoryByAnimal(pet.id)}
              onClick={() => onSelectPet(pet.id)}
            />
          ))}
        </CardsGrid>
      </Page>
    </Container>
  );
};

export default PetsPage;
