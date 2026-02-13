import { createAsyncThunk } from "@reduxjs/toolkit";
import type { animalsList } from "../../interfaces/animals.interface";

const BASE_URL = "http://localhost:4003/animals";

// GET
export const getAnimals = createAsyncThunk<
  animalsList[],
  void,
  { rejectValue: string }
>("animals/getAnimals", async (_, thunkAPI) => {
  try {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error();
    return await res.json();
  } catch {
    return thunkAPI.rejectWithValue("Failed to fetch animals");
  }
});

// ADD
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
    return await res.json();
  } catch {
    return thunkAPI.rejectWithValue("Failed to add animal");
  }
});

// UPDATE
export const updateAnimal = createAsyncThunk<
  animalsList,
  { id: number; animal: animalsList },
  { rejectValue: string }
>("animals/updateAnimal", async ({ id, animal }, thunkAPI) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(animal),
    });
    return await res.json();
  } catch {
    return thunkAPI.rejectWithValue("Failed to update animal");
  }
});

// DELETE
export const deleteAnimal = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>("animals/deleteAnimal", async (id, thunkAPI) => {
  try {
    await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
    return id;
  } catch {
    return thunkAPI.rejectWithValue("Failed to delete animal");
  }
});
