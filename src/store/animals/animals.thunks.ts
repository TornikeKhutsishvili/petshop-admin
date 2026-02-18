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
  animalsList,
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
  { uuid: number; animal: animalsList },
  { rejectValue: string }
>("animals/updateAnimal", async ({ uuid, animal }, thunkAPI) => {
  try {
    const res = await fetch(`${BASE_URL}?id=${uuid}`, {
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
  number,
  number,
  { rejectValue: string }
>("animals/deleteAnimal", async (uuid, thunkAPI) => {
  try {
    const res = await fetch(`${BASE_URL}?id=${uuid}`, { method: "DELETE" });
    if (!res.ok) {
      return thunkAPI.rejectWithValue(
        `Failed to delete animal: ${res.status} ${res.statusText}`,
      );
    }
    return uuid;
  } catch {
    return thunkAPI.rejectWithValue("Failed to delete animal");
  }
});
