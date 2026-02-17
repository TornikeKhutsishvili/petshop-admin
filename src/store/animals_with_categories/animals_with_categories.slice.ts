import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store/index";
import type { animals_with_categoriesList } from "../../interfaces/animals_with_categories.interface";
import {
  add_animal_with_category,
  delete_animal_with_category,
  get_animals_with_categories,
  update_animal_with_category,
} from "./animals_with_categories.thunks";

type TypeError = string | null;

interface Ianimals_with_categories {
  animals_with_categoriesList: animals_with_categoriesList[];
  loading: boolean;
  error: TypeError;
}

const initialState: Ianimals_with_categories = {
  animals_with_categoriesList: [],
  loading: false,
  error: null,
};

const animals_with_categoriesSlice = createSlice({
  name: "animals_with_categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET
      .addCase(get_animals_with_categories.pending, (state) => {
        state.loading = true;
      })
      .addCase(get_animals_with_categories.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.animals_with_categoriesList = action.payload;
      })
      .addCase(get_animals_with_categories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // ADD
      .addCase(add_animal_with_category.pending, (state) => {
        state.loading = true;
      })
      .addCase(add_animal_with_category.fulfilled, (state, action) => {
        state.animals_with_categoriesList.push(action.payload);
      })
      .addCase(add_animal_with_category.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // UPDATE
      .addCase(update_animal_with_category.pending, (state) => {
        state.loading = true;
      })
      .addCase(update_animal_with_category.fulfilled, (state, action) => {
        const index = state.animals_with_categoriesList.findIndex(
          (u) => u.id === action.payload.id,
        );
        if (index !== -1)
          state.animals_with_categoriesList[index] = action.payload;
      })
      .addCase(update_animal_with_category.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // DELETE
      .addCase(delete_animal_with_category.pending, (state) => {
        state.loading = true;
      })
      .addCase(delete_animal_with_category.fulfilled, (state, action) => {
        state.animals_with_categoriesList =
          state.animals_with_categoriesList.filter(
            (u) => u.id !== action.payload,
          );
      })
      .addCase(delete_animal_with_category.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default animals_with_categoriesSlice.reducer;

export const animals_with_categoriesStateSelector = (state: RootState) =>
  state.animals_with_categories;

export const animalsWithCategoriesListSelector = createSelector(
  animals_with_categoriesStateSelector,
  (state) => state.animals_with_categoriesList,
);

export const animalsWithCategoriesLoadingSelector = createSelector(
  animals_with_categoriesStateSelector,
  (state) => state.loading,
);

export const animalsWithCategoriesErrorSelector = createSelector(
  animals_with_categoriesStateSelector,
  (state) => state.error,
);
