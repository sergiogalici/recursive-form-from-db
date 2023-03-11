import { createSelector } from "@reduxjs/toolkit";
import { MappedFieldType } from "../../components/Form/model";
import { RootState } from "../store";

const selectForms = (state: RootState) => state.forms;

export const selectAllForms = createSelector(selectForms, ({ forms }) => forms);
