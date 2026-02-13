import type React from "react";
import type { animalsList } from "../../../interfaces/animals.interface";
import type { categoriesList } from "../../../interfaces/categories.interface";

interface Props {
  pet: animalsList;
  category?: categoriesList;
  onClick: () => void;
}

const PetCard: React.FC<Props> = ({ pet, category, onClick }) => {
  return (
    <>
      <div className="pet-card" onClick={onClick}>
        <div className="pet-image">🐾</div>
        <div className="pet-name">{pet.name}</div>
        <div className="pet-category">{category?.title}</div>
        <div className="pet-price">
          <span>${pet.priceUSD}</span>
          <span>₾{pet.priceGEL}</span>
        </div>
        {pet.isPopular && <span className="popular-badge">Popular</span>}
      </div>
    </>
  );
};

export default PetCard;
