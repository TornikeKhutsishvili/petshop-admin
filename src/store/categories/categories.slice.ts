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

interface ICategoriesState {
  categoriesList: categoriesList[];
  loading: boolean;
  error: TypeError;
}

const initialState: ICategoriesState = {
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
      /** GET CATEGORIES */
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categoriesList = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch categories";
      })

      /** ADD CATEGORY */
      .addCase(addCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.categoriesList.push(action.payload);
        state.loading = false;
        state.error = null;
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to add category";
      })

      /** UPDATE CATEGORY */
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.categoriesList.findIndex(
          (u) => u.uuid === Number(action.payload.uuid),
        );
        if (index !== -1) {
          state.categoriesList[index] = action.payload;
        }
        state.loading = false;
        state.error = null;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to update category";
      })

      /** DELETE CATEGORY */
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categoriesList = state.categoriesList.filter(
          (u) => u.uuid !== Number(action.payload),
        );
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to delete category";
      });
  },
});

export default categoriesSlice.reducer;

/** SELECTORS */
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
