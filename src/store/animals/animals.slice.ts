import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store/index";
import type { animalsList } from "../../interfaces/animals.interface";
import {
  getAnimals,
  addAnimal,
  updateAnimal,
  deleteAnimal,
} from "./animals.thunks";

type TypeError = string | null;

interface IAnimalsState {
  animalsList: animalsList[];
  loading: boolean;
  error: TypeError;
}

const initialState: IAnimalsState = {
  animalsList: [],
  loading: false,
  error: null,
};

const animalsSlice = createSlice({
  name: "animals",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      /** GET ANIMALS */
      .addCase(getAnimals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAnimals.fulfilled, (state, action) => {
        state.animalsList = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getAnimals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch animals";
      })

      /** ADD ANIMAL */
      .addCase(addAnimal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addAnimal.fulfilled, (state, action) => {
        state.animalsList.push(action.payload);
        state.loading = false;
        state.error = null;
      })
      .addCase(addAnimal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to add animal";
      })

      /** UPDATE ANIMAL */
      .addCase(updateAnimal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAnimal.fulfilled, (state, action) => {
        const index = state.animalsList.findIndex(
          (u) => u.uuid === Number(action.payload.uuid),
        );
        if (index !== -1) {
          state.animalsList[index] = action.payload;
        }
        state.loading = false;
        state.error = null;
      })
      .addCase(updateAnimal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to update animal";
      })

      /** DELETE ANIMAL */
      .addCase(deleteAnimal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAnimal.fulfilled, (state, action) => {
        state.animalsList = state.animalsList.filter(
          (u) => u.uuid !== Number(action.payload),
        );
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteAnimal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to delete animal";
      });
  },
});

export default animalsSlice.reducer;

/** SELECTORS */
export const animalsStateSelector = (state: RootState) => state.animals;

export const animalsListSelector = createSelector(
  animalsStateSelector,
  (state) => state.animalsList,
);

export const animalsLoadingSelector = createSelector(
  animalsStateSelector,
  (state) => state.loading,
);

export const animalsErrorSelector = createSelector(
  animalsStateSelector,
  (state) => state.error,
);
