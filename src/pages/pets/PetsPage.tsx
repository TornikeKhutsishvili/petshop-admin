import type React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PetCard from "../../components/pets/PetCard";
import type { animalsList } from "../../interfaces/animals.interface";
import type { categoriesList } from "../../interfaces/categories.interface";
import {
  animalsListSelector,
  animalsLoadingSelector,
  animalsErrorSelector,
} from "../../store/animals/animals.slice";
import { categoriesListSelector } from "../../store/categories/categories.slice";
import {
  Container,
  Page,
  ActionBar,
  Title,
  Button,
  CardsGrid,
} from "./PetsPage.style";

const PetsPage: React.FC = () => {
  const navigation = useNavigate();
  const pets = useSelector(animalsListSelector);
  const loading = useSelector(animalsLoadingSelector);
  const error = useSelector(animalsErrorSelector);

  const categories = useSelector(categoriesListSelector);

  const onSelectPet = (id: number) => {
    console.log("Selected pet:", id);
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
              category={categories.find((c: categoriesList) => c.id === pet.id)}
              onClick={() => onSelectPet(pet.id)}
            />
          ))}
        </CardsGrid>
      </Page>
    </Container>
  );
};

export default PetsPage;
