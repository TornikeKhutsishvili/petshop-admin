import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

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
