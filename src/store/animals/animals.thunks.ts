import { createAsyncThunk } from "@reduxjs/toolkit";
import type { animalsList } from "../../interfaces/animals.interface";

const BASE_URL = "http://localhost:4003/animals";

/** GET ANIMALS */
export const getAnimals = createAsyncThunk<
  animalsList[],
  void,
  { rejectValue: string }
>("animals/getAnimals", async (_, thunkAPI) => {
  try {
    const res = await fetch(BASE_URL);
    if (!res.ok) {
      return thunkAPI.rejectWithValue(
        `Failed to fetch animals: ${res.status} ${res.statusText}`,
      );
    }
    const data: animalsList[] = await res.json();
    return data;
  } catch {
    return thunkAPI.rejectWithValue("Failed to fetch animals");
  }
});

/** ADD ANIMAL */
export const addAnimal = createAsyncThunk<
  animalsList,
  Omit<animalsList, "id">,
  { rejectValue: string }
>("animals/addAnimal", async (animal, thunkAPI) => {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(animal),
    });

    if (!res.ok) {
      return thunkAPI.rejectWithValue(
        `Failed to add animal: ${res.status} ${res.statusText}`,
      );
    }

    const data: animalsList = await res.json();
    return data;
  } catch {
    return thunkAPI.rejectWithValue("Failed to add animal");
  }
});

/** UPDATE ANIMAL - PATCH */
export const updateAnimal = createAsyncThunk<
  animalsList,
  { id: string; animal: animalsList },
  { rejectValue: string }
>("animals/updateAnimal", async ({ id, animal }, thunkAPI) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(animal),
    });

    if (!res.ok) {
      return thunkAPI.rejectWithValue(
        `Failed to update animal: ${res.status} ${res.statusText}`,
      );
    }

    const data: animalsList = await res.json();
    return data;
  } catch {
    return thunkAPI.rejectWithValue("Failed to update animal");
  }
});

/** DELETE ANIMAL */
export const deleteAnimal = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("animals/deleteAnimal", async (id, thunkAPI) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
    if (!res.ok) {
      return thunkAPI.rejectWithValue(
        `Failed to delete animal: ${res.status} ${res.statusText}`,
      );
    }
    return id;
  } catch {
    return thunkAPI.rejectWithValue("Failed to delete animal");
  }
});
