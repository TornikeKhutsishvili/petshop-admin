import type React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  BtnBack,
  Container,
  FormContainer,
  FormTitle,
  Form,
  FormGroup,
  FormLabel,
  FormInput,
  TextArea,
  FormCheck,
  FormCheckInput,
  BtnActions,
  CancelBtn,
  UpdateBtn,
} from "./EditPetPage.style";
import { updateAnimal } from "../../store/animals/animals.thunks";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../store";
import { animalsListSelector } from "../../store/animals/animals.slice";
import { useEffect } from "react";
import type { animalsList } from "../../interfaces/animals.interface";

const EditPetPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const pets = useSelector(animalsListSelector);

  const pet = pets.find((p) => p.id === id);

  useEffect(() => {
    if (!pet) {
      navigate("/pets");
    }
  }, [pet, navigate]);

  const updatePet = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!pet) return;

    const form = e.currentTarget;

    const updatedPet: animalsList = {
      ...pet,
      name: (form.name as unknown as HTMLInputElement).value,
      price: Number((form.priceUSD as unknown as HTMLInputElement).value),
      inStock: Number((form.stock as unknown as HTMLInputElement).value),
      description: (form.description as unknown as HTMLTextAreaElement).value,
      popular: (form.isPopular as unknown as HTMLInputElement).checked,
      image: (form.image as unknown as HTMLInputElement)?.value || pet.image,
    };

    try {
      await dispatch(updateAnimal({ id: pet.id, animal: updatedPet })).unwrap();
      navigate("/pets");
    } catch (err) {
      console.error("Failed to update pet:", err);
    }
  };

  const handleCancel = () => navigate("/pets");

  if (!pet) return <div>Loading...</div>;

  return (
    <Container>
      <BtnBack onClick={handleCancel}>← Back to pets</BtnBack>
      <FormContainer>
        <FormTitle>Edit Pet</FormTitle>
        <Form onSubmit={updatePet}>
          <FormGroup>
            <FormLabel>Pet Name</FormLabel>
            <FormInput
              type="text"
              name="name"
              defaultValue={pet.name}
              required
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>Price (USD)</FormLabel>
            <FormInput
              type="number"
              name="priceUSD"
              defaultValue={pet.price}
              step="0.01"
              required
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>Stock</FormLabel>
            <FormInput
              type="number"
              name="stock"
              defaultValue={pet.inStock}
              required
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>Description</FormLabel>
            <TextArea
              name="description"
              defaultValue={pet.description}
              rows={4}
            ></TextArea>
          </FormGroup>

          <FormGroup>
            <FormCheck>
              <FormCheckInput
                type="checkbox"
                name="isPopular"
                defaultChecked={pet.popular}
              />
              <FormLabel>Popular Pet</FormLabel>
            </FormCheck>
          </FormGroup>

          <BtnActions>
            <CancelBtn onClick={handleCancel}>Cancel</CancelBtn>
            <UpdateBtn type="submit">Update Pet</UpdateBtn>
          </BtnActions>
        </Form>
      </FormContainer>
    </Container>
  );
};

export default EditPetPage;
