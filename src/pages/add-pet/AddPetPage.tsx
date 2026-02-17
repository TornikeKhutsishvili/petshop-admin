import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  BtnBack,
  FormContainer,
  FormTitle,
  Form,
  FormGroup,
  FormLabel,
  FormInput,
  FormSelect,
  Option,
  TextArea,
  FormCheck,
  FormCheckInput,
  BtnActions,
  CancelBtn,
  SaveBtn,
} from "./AddPetPage.style";
import { categoriesListSelector } from "../../store/categories/categories.slice";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../store";
import { addAnimal } from "../../store/animals/animals.thunks";
import { animalsListSelector } from "../../store/animals/animals.slice";
import { update_animal_with_category } from "../../store/animals_with_categories/animals_with_categories.thunks";
import type { animalsList } from "../../interfaces/animals.interface";
import type { categoriesList } from "../../interfaces/categories.interface";
import { animalsWithCategoriesListSelector } from "../../store/animals_with_categories/animals_with_categories.slice";
import type { animals_with_categoriesList } from "../../interfaces/animals_with_categories.interface";

export interface Category {
  id: number;
  title: string;
}

const AddPetPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector(categoriesListSelector);
  const animals = useSelector(animalsListSelector);
  const animals_with_categories = useSelector(
    animalsWithCategoriesListSelector,
  );

  const addPet = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const elements = form.elements as typeof form.elements & {
      name: HTMLInputElement;
      category: HTMLSelectElement;
      priceUSD: HTMLInputElement;
      stock: HTMLInputElement;
      description: HTMLTextAreaElement;
      isPopular: HTMLInputElement;
      image: HTMLInputElement;
    };

    const maxId = animals.length
      ? Math.max(...animals.map((a: animalsList) => a.id))
      : 0;
    const nextId = maxId + 1;

    const newPet = {
      id: nextId,
      name: elements.name.value,
      species:
        categories.find(
          (c: categoriesList) => c.id === Number(elements.category.value),
        )?.title || "",
      price: Number(elements.priceUSD.value),
      inStock: Number(elements.stock.value),
      description: elements.description.value,
      popular: elements.isPopular.checked,
      image: elements.image.value || "",
    };

    try {
      const addedPet = await dispatch(addAnimal(newPet)).unwrap();
      const categoryId = Number(elements.category.value);

      const existingCategory = animals_with_categories.find(
        (awc: animals_with_categoriesList) =>
          awc.category_id.includes(categoryId),
      );

      if (existingCategory) {
        const updatedCategory: animals_with_categoriesList = {
          ...existingCategory,
          animal_id: Array.from(
            new Set([...existingCategory.animal_id, addedPet.id]),
          ),
        };
        console.log("Updated category to link new pet:", updatedCategory);

        await dispatch(
          update_animal_with_category({
            id: existingCategory.id,
            category: updatedCategory,
          }),
        ).unwrap();
      }

      navigate("/pets");
    } catch (err) {
      console.error("Failed to add pet:", err);
    }
  };

  const handleCancel = () => navigate("/pets");

  return (
    <Container>
      <BtnBack onClick={handleCancel}>← Back to Pets</BtnBack>
      <FormContainer>
        <FormTitle>Add New Pet</FormTitle>
        <Form onSubmit={addPet}>
          <FormGroup>
            <FormLabel>Pet Name</FormLabel>
            <FormInput type="text" name="name" required />
          </FormGroup>

          <FormGroup>
            <FormLabel>Pet Image</FormLabel>
            <FormInput type="text" name="image" required />
          </FormGroup>

          <FormGroup>
            <FormLabel>Category</FormLabel>
            <FormSelect name="category">
              <Option value="">Select Category</Option>
              {categories.map((c: Category) => (
                <Option key={c.id} value={c.id}>
                  {c.title}
                </Option>
              ))}
            </FormSelect>
          </FormGroup>

          <FormGroup>
            <FormLabel>Price (USD)</FormLabel>
            <FormInput type="number" name="priceUSD" step="0.01" required />
          </FormGroup>

          <FormGroup>
            <FormLabel>Stock</FormLabel>
            <FormInput type="number" name="stock" required />
          </FormGroup>

          <FormGroup>
            <FormLabel>Description</FormLabel>
            <TextArea name="description" rows={4}></TextArea>
          </FormGroup>

          <FormGroup>
            <FormCheck>
              <FormCheckInput type="checkbox" name="isPopular" />
              <FormLabel>Popular Pet</FormLabel>
            </FormCheck>
          </FormGroup>

          <BtnActions>
            <CancelBtn onClick={handleCancel}>Cancel</CancelBtn>
            <SaveBtn type="submit">Save Pet</SaveBtn>
          </BtnActions>
        </Form>
      </FormContainer>
    </Container>
  );
};

export default AddPetPage;
