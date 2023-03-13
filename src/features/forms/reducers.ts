import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { MappedFieldType } from "../../components/Form/model";
import { addField, removeField } from "../../utils/fieldsAddRemoveHandler";
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
            if (field.multiple && field.id === payload) {
              field = addField(field);
            }

            return field;
          })
        : null;
    },
    removeFieldFromSubform: (state, { payload }: PayloadAction<string>) => {
      state.forms = state.forms
        ? state.forms.map((field) => {
            if (field.multiple && field.id === payload) {
              field = removeField(field);
            }
            return field;
          })
        : null;
    },
  },
});

export const formsActions = {
  ...formsSlice.actions,
};

export const formsReducer = formsSlice.reducer;
