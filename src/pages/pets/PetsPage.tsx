import type React from "react";
import PetCard from "../../components/pets/pet-card/PetCard";
import type { animalsList } from "../../interfaces/animals.interface";
import type { categoriesList } from "../../interfaces/categories.interface";

interface Props {
  pets: animalsList[];
  categories: categoriesList[];
  onSelectPet: (id: number) => void;
}

const PetsPage: React.FC<Props> = ({ pets, categories, onSelectPet }) => {
  return (
    <div className="page active">
      <div className="action-bar">
        <h2>All Pets</h2>
      </div>

      <div className="cards-grid">
        {pets.map((pet) => (
          <PetCard
            key={pet.id}
            pet={pet}
            category={categories.find((c) => c.id === pet.id)}
            onClick={() => onSelectPet(pet.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default PetsPage;
