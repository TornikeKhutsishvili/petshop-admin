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

const PetsPage: React.FC = () => {
  const navigation = useNavigate();
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
    animalId: number,
  ): categoriesList | undefined => {
    const relation = animalCategories.find((r) =>
      r.animal_id.some((id) => String(id) === String(animalId)),
    );

    if (!relation || !relation.category_id?.length) return undefined;

    const categoryId = String(relation.category_id[0]);

    return categories.find((c) => String(c.id) === String(categoryId));
  };

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
