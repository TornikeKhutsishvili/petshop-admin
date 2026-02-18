import { createAsyncThunk } from "@reduxjs/toolkit";
import type { categoriesList } from "../../interfaces/categories.interface";

const BASE_URL = "http://localhost:4003/categories";

/** GET CATEGORIES */
export const getCategories = createAsyncThunk<
  categoriesList[],
  void,
  { rejectValue: string }
>("categories/getCategories", async (_, thunkAPI) => {
  try {
    const res = await fetch(BASE_URL);
    if (!res.ok) {
      return thunkAPI.rejectWithValue(
        `Failed to fetch categories: ${res.status} ${res.statusText}`,
      );
    }
    const data: categoriesList[] = await res.json();
    return data;
  } catch {
    return thunkAPI.rejectWithValue("Failed to fetch categories");
  }
});

/** ADD CATEGORY */
export const addCategory = createAsyncThunk<
  categoriesList,
  categoriesList,
  { rejectValue: string }
>("categories/addCategory", async (category, thunkAPI) => {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(category),
    });

    if (!res.ok) {
      return thunkAPI.rejectWithValue(
        `Failed to add category: ${res.status} ${res.statusText}`,
      );
    }

    const data: categoriesList = await res.json();
    return data;
  } catch {
    return thunkAPI.rejectWithValue("Failed to add category");
  }
});

/** UPDATE CATEGORY */
export const updateCategory = createAsyncThunk<
  categoriesList,
  { uuid: number; category: categoriesList },
  { rejectValue: string }
>("categories/updateCategory", async ({ uuid, category }, thunkAPI) => {
  try {
    const res = await fetch(`${BASE_URL}?id=${uuid}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(category),
    });

    if (!res.ok) {
      return thunkAPI.rejectWithValue(
        `Failed to update category: ${res.status} ${res.statusText}`,
      );
    }

    const data: categoriesList = await res.json();
    return data;
  } catch {
    return thunkAPI.rejectWithValue("Failed to update category");
  }
});

/** DELETE CATEGORY */
export const deleteCategory = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>("categories/deleteCategory", async (uuid, thunkAPI) => {
  try {
    const res = await fetch(`${BASE_URL}?id=${uuid}`, { method: "DELETE" });
    if (!res.ok) {
      return thunkAPI.rejectWithValue(
        `Failed to delete category: ${res.status} ${res.statusText}`,
      );
    }
    return uuid;
  } catch {
    return thunkAPI.rejectWithValue("Failed to delete category");
  }
});
