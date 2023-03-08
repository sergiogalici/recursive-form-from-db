import { PayloadAction, createAction, createSlice } from "@reduxjs/toolkit";
import { FormData } from "../../App";
import { FormsState } from "./model";

const initialState: FormsState = {
  forms: [
    {
      email: "",
      firstName: "",
      lastName: "",
      addresses: [{ address: "", city: "", houseNumber: 1, state: "" }],
    },
  ],
};

const formsSlice = createSlice({
  name: "forms",
  initialState,
  reducers: {
    updateForm: (state, { payload }: PayloadAction<FormData>) => {
      state.forms = [...state.forms, payload];
    },
  },
});

export const formsActions = {
  ...formsSlice.actions,
};

export const formsReducer = formsSlice.reducer;
