import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { MappedFieldType } from "../../components/Form/model";
import { addField, removeField } from "../../utils/fieldsAddRemoveHandler";
import { getLastFieldElement } from "../../utils/stringFormatter";
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
    addFieldToSubform: (state, { payload }: PayloadAction<string>) => {
      state.forms = state.forms
        ? state.forms.map((field) => {
            return addField(field, payload, getLastFieldElement(payload));
          })
        : null;
    },
    removeFieldFromSubform: (state, { payload }: PayloadAction<string>) => {
      state.forms = state.forms ? removeField(state.forms, payload) : null;
    },
  },
});

export const formsActions = {
  ...formsSlice.actions,
};

export const formsReducer = formsSlice.reducer;
