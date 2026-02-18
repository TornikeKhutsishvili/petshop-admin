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

interface IAnimalsWithCategoriesState {
  animals_with_categoriesList: animals_with_categoriesList[];
  loading: boolean;
  error: TypeError;
}

const initialState: IAnimalsWithCategoriesState = {
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
      /** GET */
      .addCase(get_animals_with_categories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(get_animals_with_categories.fulfilled, (state, action) => {
        state.animals_with_categoriesList = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(get_animals_with_categories.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload ?? "Failed to fetch animals with categories";
      })

      /** ADD */
      .addCase(add_animal_with_category.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(add_animal_with_category.fulfilled, (state, action) => {
        state.animals_with_categoriesList.push(action.payload);
        state.loading = false;
        state.error = null;
      })
      .addCase(add_animal_with_category.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to add animal with category";
      })

      /** UPDATE */
      .addCase(update_animal_with_category.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(update_animal_with_category.fulfilled, (state, action) => {
        const index = state.animals_with_categoriesList.findIndex(
          (u) => u.uuid === Number(action.payload.uuid),
        );
        if (index !== -1) {
          state.animals_with_categoriesList[index] = action.payload;
        }
        state.loading = false;
        state.error = null;
      })
      .addCase(update_animal_with_category.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to update animal with category";
      })

      /** DELETE */
      .addCase(delete_animal_with_category.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(delete_animal_with_category.fulfilled, (state, action) => {
        state.animals_with_categoriesList =
          state.animals_with_categoriesList.filter(
            (u) => u.uuid !== Number(action.payload),
          );
        state.loading = false;
        state.error = null;
      })
      .addCase(delete_animal_with_category.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to delete animal with category";
      });
  },
});

export default animals_with_categoriesSlice.reducer;

/** SELECTORS */
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
