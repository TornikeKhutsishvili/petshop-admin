import { combineReducers, configureStore } from "@reduxjs/toolkit";

import categoriesReducer from "./categories/categories.slice";
import animalsReducer from "./animals/animals.slice";

const rootReducer = combineReducers({
  categories: categoriesReducer,
  animals: animalsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
