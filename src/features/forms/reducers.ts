import { PayloadAction, createAction, createSlice } from "@reduxjs/toolkit";
import { MappedFieldType } from "../../components/Form/model";
import { FormData } from "./../../data/oldSchema";
import { FormsState } from "./model";

const initialState: FormsState = {
  forms: null,
};

const formsSlice = createSlice({
  name: "forms",
  initialState,
  reducers: {
    updateForm: (state, { payload }: PayloadAction<MappedFieldType[]>) => {
      state.forms = payload;
    },
  },
});

export const formsActions = {
  ...formsSlice.actions,
};

export const formsReducer = formsSlice.reducer;
