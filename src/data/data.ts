import { Schema, SchemaFieldDescription } from "yup";
import * as yup from "yup";

export const simpleForm: FormType = {
  form: [
    {
      type: "input",
      id: "firstName",
    },
    {
      type: "input",
      id: "lastName",
    },
    {
      type: "select",
      id: "favouriteCuisine",
      children: [
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
      ],
    },
    {
      type: "select",
      id: "educationLevel",
      children: [
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
      ],
    },
    {
      type: "subForm",
      id: "children",
      subform: [
        { subFormName: "children", form: [{ type: "input", id: "childName" }] },
      ],
    },
  ],
};

export type SimpleFormType = FormType & typeof simpleForm;

export type FieldType = {
  type: "input" | "select" | "checkbox" | "option" | "subForm";
  id: string;
  children?: FieldType[];
  subform?: SubFormType[];
};

type SubFormType = {
  subFormName: string;
  form: FieldType[];
};

export type FormType = {
  form: FieldType[];
};
