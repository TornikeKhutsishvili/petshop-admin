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

interface Ianimals {
  animalsList: animalsList[];
  loading: boolean;
  error: TypeError;
}

const initialState: Ianimals = {
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
      // GET
      .addCase(getAnimals.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAnimals.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.animalsList = action.payload;
      })
      .addCase(getAnimals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // ADD
      .addCase(addAnimal.pending, (state) => {
        state.loading = true;
      })
      .addCase(addAnimal.fulfilled, (state, action) => {
        state.animalsList.push(action.payload);
      })
      .addCase(addAnimal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // UPDATE
      .addCase(updateAnimal.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAnimal.fulfilled, (state, action) => {
        const index = state.animalsList.findIndex(
          (u) => u.id === action.payload.id,
        );
        if (index !== -1) state.animalsList[index] = action.payload;
      })
      .addCase(updateAnimal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // DELETE
      .addCase(deleteAnimal.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAnimal.fulfilled, (state, action) => {
        state.animalsList = state.animalsList.filter(
          (u) => u.id !== action.payload,
        );
      })
      .addCase(deleteAnimal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default animalsSlice.reducer;

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
