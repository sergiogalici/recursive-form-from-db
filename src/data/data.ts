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
      subforms: [
        {
          form: [
            { type: "input", id: "children.0.childName" },
            { type: "input", id: "children.0.age", isInputTypeNumber: true },
          ],
        },
        {
          form: [
            { type: "input", id: "children.1.childName" },
            {
              type: "input",
              id: "children.1.childAge",
              isInputTypeNumber: true,
            },
          ],
        },
        {
          form: [
            { type: "input", id: "children.2.childName" },
            {
              type: "input",
              id: "children.2.childAge",
              isInputTypeNumber: true,
            },
          ],
        },
        {
          form: [
            { type: "input", id: "pets.0.petName" },
            { type: "input", id: "pets.0.age", isInputTypeNumber: true },
          ],
        },
        {
          form: [
            { type: "input", id: "pets.1.petName" },
            { type: "input", id: "pets.1.age", isInputTypeNumber: true },
          ],
        },
      ],
    },
  ],
};

export type SimpleFormType = FormType & typeof simpleForm;

export type FieldType = {
  type: "input" | "select" | "checkbox" | "option" | "subForm";
  id: string;
  isInputTypeNumber?: boolean;
  children?: FieldType[];
  subforms?: FormType[];
};

export type FormType = {
  form: FieldType[];
};
