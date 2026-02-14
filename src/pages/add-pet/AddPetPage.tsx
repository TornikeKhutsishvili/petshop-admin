import React, { useState } from "react";
import type { categoriesList } from "../../interfaces/categories.interface";
import { Container } from "./AddPetPage.style";

interface FormData {
  [k: string]: FormDataEntryValue;
}

const AddPetPage: React.FC = () => {
  const [categories] = useState<categoriesList[]>([]);

  const onSave = (data: FormData) => {
    console.log("Saved pet:", data);
  };

  return (
    <Container>
      <form
        className="form-container"
        onSubmit={(e) => {
          e.preventDefault();
          const form = e.currentTarget;
          const data = Object.fromEntries(new FormData(form));
          onSave(data);
        }}
      >
        <h2>Add New Pet</h2>

        <input name="name" placeholder="Pet name" required />

        <select name="categoryId" title="categories" required>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.title}
            </option>
          ))}
        </select>

        <button type="submit">Save</button>
      </form>
    </Container>
  );
};

export default AddPetPage;
