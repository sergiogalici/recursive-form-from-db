import { Schema, SchemaFieldDescription } from "yup";
import * as yup from "yup";

const cuisines: FieldType[] = [
  {
    type: "option",
    id: "italian",
  },
  {
    type: "option",
    id: "mexican",
  },
  {
    type: "option",
    id: "thai",
  },
];

const edLevels: FieldType[] = [
  {
    type: "option",
    id: "elementarySchool",
  },
  {
    type: "option",
    id: "middleSchool",
  },
  {
    type: "option",
    id: "highSchool",
  },
  {
    type: "option",
    id: "college",
  },
  {
    type: "option",
    id: "graduationDegree",
  },
  {
    type: "option",
    id: "phd",
  },
];

export const formConfig: FieldType[] = [
  {
    type: "input-text",
    id: "firstName",
  },
  {
    type: "input",
    id: "lastName",
  },
  {
    type: "select",
    id: "favouriteCuisine",
    children: cuisines,
  },
  {
    type: "select",
    id: "educationLevel",
    children: edLevels,
  },
  {
    type: "subForm",
    id: "children",
    multiple: true,
    children: [
      { type: "input", id: "name" },
      {
        type: "input",
        id: "age",
        isInputTypeNumber: true,
      },
      {
        type: "select",
        id: "educationLevel",
        children: edLevels,
      },
      {
        type: "select",
        id: "favouriteCuisine",
        children: cuisines,
      },
    ],
  },
  {
    type: "subForm",
    id: "pets",
    children: [
      { type: "input", id: "petName" },
      { type: "input-number", id: "petAge" },
    ],
  },
];

/**
 * 2 children
 * 3 pets
 *
 *
 */

export type FormConfigType = FormType & typeof formConfig;

export type FieldType = {
  type: InputType | "select" | "checkbox" | "option" | "subForm";
  id: string;
  isInputTypeNumber?: boolean;
  children?: FieldType[];
  subforms?: FormType[];
};

export type FormType = {
  form: FieldType[];
};

type InputType =
  | "input-text"
  | "input-submit"
  | "input-number"
  | "input-date"
  | "input-email"
  | "input-checkbox"
  | "input-password";
