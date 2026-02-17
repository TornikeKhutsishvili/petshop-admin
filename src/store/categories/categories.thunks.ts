import { createAsyncThunk } from "@reduxjs/toolkit";
import type { categoriesList } from "../../interfaces/categories.interface";

const BASE_URL = "http://localhost:4003/categories";

// GET
export const getCategories = createAsyncThunk<
  categoriesList[],
  void,
  { rejectValue: string }
>("categories/getCategories", async (_, thunkAPI) => {
  try {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error();
    return await res.json();
  } catch {
    return thunkAPI.rejectWithValue("Failed to fetch categories");
  }
});

// ADD
export const addCategory = createAsyncThunk<
  categoriesList,
  Omit<categoriesList, "id">,
  { rejectValue: string }
>("categories/addCategory", async (category, thunkAPI) => {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(category),
    });
    return await res.json();
  } catch {
    return thunkAPI.rejectWithValue("Failed to add category");
  }
});

// UPDATE
export const updateCategory = createAsyncThunk<
  categoriesList,
  { id: number; category: categoriesList },
  { rejectValue: string }
>("categories/updateCategory", async ({ id, category }, thunkAPI) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(category),
    });
    return await res.json();
  } catch {
    return thunkAPI.rejectWithValue("Failed to update category");
  }
});

// DELETE
export const deleteCategory = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>("categories/deleteCategory", async (id, thunkAPI) => {
  try {
    await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
    return id;
  } catch {
    return thunkAPI.rejectWithValue("Failed to delete category");
  }
});
