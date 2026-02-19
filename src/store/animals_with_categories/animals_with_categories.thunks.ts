import { createAsyncThunk } from "@reduxjs/toolkit";
import type { animals_with_categoriesList } from "../../interfaces/animals_with_categories.interface";

const BASE_URL = "http://localhost:4003/animals_with_categories";

/** GET ANIMALS WITH CATEGORIES */
export const get_animals_with_categories = createAsyncThunk<
  animals_with_categoriesList[],
  void,
  { rejectValue: string }
>(
  "animals_with_categories/get_animals_with_categories",
  async (_, thunkAPI) => {
    try {
      const res = await fetch(BASE_URL);
      if (!res.ok) {
        return thunkAPI.rejectWithValue(
          `Failed to fetch animals_with_categories: ${res.status} ${res.statusText}`,
        );
      }
      const data: animals_with_categoriesList[] = await res.json();
      return data;
    } catch {
      return thunkAPI.rejectWithValue(
        "Failed to fetch animals_with_categories",
      );
    }
  },
);

/** ADD ANIMAL WITH CATEGORY */
export const add_animal_with_category = createAsyncThunk<
  animals_with_categoriesList,
  Omit<animals_with_categoriesList, "id">,
  { rejectValue: string }
>(
  "animals_with_categories/add_animal_with_category",
  async (category, thunkAPI) => {
    try {
      const res = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(category),
      });

      if (!res.ok) {
        return thunkAPI.rejectWithValue(
          `Failed to add animal_with_category: ${res.status} ${res.statusText}`,
        );
      }

      const data: animals_with_categoriesList = await res.json();
      return data;
    } catch {
      return thunkAPI.rejectWithValue("Failed to add animal_with_category");
    }
  },
);

/** UPDATE ANIMAL WITH CATEGORY */
export const update_animal_with_category = createAsyncThunk<
  animals_with_categoriesList,
  { id: string; category: animals_with_categoriesList },
  { rejectValue: string }
>(
  "animals_with_categories/update_animal_with_category",
  async ({ id, category }, thunkAPI) => {
    try {
      const res = await fetch(`${BASE_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(category),
      });

      if (!res.ok) {
        return thunkAPI.rejectWithValue(
          `Failed to update animal_with_category: ${res.status} ${res.statusText}`,
        );
      }

      const data: animals_with_categoriesList = await res.json();
      return data;
    } catch {
      return thunkAPI.rejectWithValue("Failed to update animal_with_category");
    }
  },
);

/** DELETE ANIMAL WITH CATEGORY */
export const delete_animal_with_category = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>(
  "animals_with_categories/delete_animal_with_category",
  async (id, thunkAPI) => {
    try {
      const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) {
        return thunkAPI.rejectWithValue(
          `Failed to delete animal_with_category: ${res.status} ${res.statusText}`,
        );
      }
      return id;
    } catch {
      return thunkAPI.rejectWithValue("Failed to delete animal_with_category");
    }
  },
);
