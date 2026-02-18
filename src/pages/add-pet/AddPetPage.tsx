import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../store";
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
import { animalsWithCategoriesListSelector } from "../../store/animals_with_categories/animals_with_categories.slice";
import { addAnimal, getAnimals } from "../../store/animals/animals.thunks";
import {
  get_animals_with_categories,
  update_animal_with_category,
} from "../../store/animals_with_categories/animals_with_categories.thunks";
import type { animalsList } from "../../interfaces/animals.interface";
import type { categoriesList } from "../../interfaces/categories.interface";
import type { animals_with_categoriesList } from "../../interfaces/animals_with_categories.interface";
import { getCategories } from "../../store/categories/categories.thunks";

const AddPetPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const categories = useSelector(categoriesListSelector);
  const animalsWithCategories = useSelector(animalsWithCategoriesListSelector);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getAnimals());
    dispatch(get_animals_with_categories());
  }, [dispatch]);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const elements = form.elements as typeof form.elements & {
      name: HTMLInputElement;
      image: HTMLInputElement;
      category: HTMLSelectElement;
      priceUSD: HTMLInputElement;
      stock: HTMLInputElement;
      description: HTMLTextAreaElement;
      isPopular: HTMLInputElement;
    };

    const selectedCategory = categories.find(
      (c: categoriesList) => c.id === elements.category.value,
    );

    const newPet: Omit<animalsList, "id"> = {
      name: elements.name.value.trim(),
      species: selectedCategory?.name || "Unknown",
      price: Number(elements.priceUSD.value),
      inStock: Number(elements.stock.value),
      description: elements.description.value.trim(),
      popular: elements.isPopular.checked,
      image: elements.image.value.trim(),
    };

    try {
      const addedPet = await dispatch(addAnimal(newPet)).unwrap();

      const categoryId = elements.category.value;

      const existingCategory = animalsWithCategories.find(
        (awc) => awc.category_id === categoryId,
      );
      console.log("existingCategory", existingCategory);

      if (existingCategory) {
        const updatedCategory: animals_with_categoriesList = {
          ...existingCategory,
          animal_id: Array.from(
            new Set([...existingCategory.animal_id, addedPet.id]),
          ),
          category_id: existingCategory.category_id,
        };
        console.log("updatedCategory", updatedCategory);

        await dispatch(
          update_animal_with_category({
            id: existingCategory.id,
            category: updatedCategory,
          }),
        ).unwrap();
      } else {
        console.error("No existing category found for id:", categoryId);
      }

      navigate("/pets");
    } catch (err) {
      console.error("Failed to add pet:", err);
    }
  };

  return (
    <Container>
      <BtnBack onClick={() => navigate("/pets")}>← Back to Pets</BtnBack>
      <FormContainer>
        <FormTitle>Add New Pet</FormTitle>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <FormLabel>Pet Name</FormLabel>
            <FormInput type="text" name="name" required />
          </FormGroup>

          <FormGroup>
            <FormLabel>Pet Image URL</FormLabel>
            <FormInput type="text" name="image" required />
          </FormGroup>

          <FormGroup>
            <FormLabel>Category</FormLabel>
            <FormSelect name="category" required>
              <Option value="">Select Category</Option>
              {categories.map((c) => (
                <Option key={c.id} value={c.id}>
                  {c.name}
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
            <TextArea name="description" rows={4} />
          </FormGroup>

          <FormGroup>
            <FormCheck>
              <FormCheckInput type="checkbox" name="isPopular" />
              <FormLabel>Popular Pet</FormLabel>
            </FormCheck>
          </FormGroup>

          <BtnActions>
            <CancelBtn type="button" onClick={() => navigate("/pets")}>
              Cancel
            </CancelBtn>
            <SaveBtn type="submit">Save Pet</SaveBtn>
          </BtnActions>
        </Form>
      </FormContainer>
    </Container>
  );
};

export default AddPetPage;
