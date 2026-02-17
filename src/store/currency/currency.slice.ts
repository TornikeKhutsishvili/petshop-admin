import {
  createSelector,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { RootState } from "../../store/index";

export type CurrencyType = "usd" | "gel" | "eur" | "gbp" | "jpy";

interface ICurrencyState {
  currency: CurrencyType;
}

const initialState: ICurrencyState = {
  currency: "usd",
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setCurrency: (state, action: PayloadAction<CurrencyType>) => {
      state.currency = action.payload;
    },
  },
});

export const { setCurrency } = currencySlice.actions;
export default currencySlice.reducer;
export const currencyStateSelector = (state: RootState) => state.currency;

export const currencySelector = createSelector(
  currencyStateSelector,
  (state) => state.currency,
);
