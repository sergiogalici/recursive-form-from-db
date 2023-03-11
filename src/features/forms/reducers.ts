import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { MappedFieldType } from "../../components/Form/model";
import { FormConfigType } from "../../data/data";
import { formConfigPreMapper } from "../../utils/formConfigPreMapper";
import { formMapper } from "../../utils/formMapper";
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
    // Use A GroupBy Map { payload: payload, subFormName: name }
    addFieldToSubform: (state, { payload }: PayloadAction<FormConfigType>) => {
      state.forms = state.forms
        ? state.forms.map((field) => {
            if (field.key && field.multiple && field.id === "children") {
              const childrenToMap = field.children as MappedFieldType[][];
              const preMapped = formConfigPreMapper(payload);
              const mapped = formMapper(
                preMapped,
                field.id,
                childrenToMap.length
              );

              childrenToMap.push(mapped);

              field.children = childrenToMap;
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
