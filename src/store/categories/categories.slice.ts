import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store/index";
import type { categoriesList } from "../../interfaces/categories.interface";
import {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "./categories.thunks";

type TypeError = string | null;

interface Icategories {
  categoriesList: categoriesList[];
  loading: boolean;
  error: TypeError;
}

const initialState: Icategories = {
  categoriesList: [],
  loading: false,
  error: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.categoriesList = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // ADD
      .addCase(addCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.categoriesList.push(action.payload);
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // UPDATE
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.categoriesList.findIndex(
          (u) => u.id === action.payload.id,
        );
        if (index !== -1) state.categoriesList[index] = action.payload;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // DELETE
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categoriesList = state.categoriesList.filter(
          (u) => u.id !== action.payload,
        );
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default categoriesSlice.reducer;

export const categoriesStateSelector = (state: RootState) => state.categories;

export const categoriesListSelector = createSelector(
  categoriesStateSelector,
  (state) => state.categoriesList,
);

export const categoriesLoadingSelector = createSelector(
  categoriesStateSelector,
  (state) => state.loading,
);

export const categoriesErrorSelector = createSelector(
  categoriesStateSelector,
  (state) => state.error,
);
