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
      children: cuisines,
    },
    {
      type: "select",
      id: "educationLevel",
      children: edLevels,
    },
    {
      type: "subForm",
      id: "Child",
      subforms: [
        {
          form: [
            { type: "input", id: "children.0.childName" },
            {
              type: "input",
              id: "children.0.childAge",
              isInputTypeNumber: true,
            },
            {
              type: "select",
              id: "children.0.educationLevel",
              children: edLevels,
            },
            {
              type: "select",
              id: "children.0.favouriteCuisine",
              children: cuisines,
            },
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
            {
              type: "select",
              id: "children.1.educationLevel",
              children: edLevels,
            },
            {
              type: "select",
              id: "children.1.favouriteCuisine",
              children: cuisines,
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
            {
              type: "select",
              id: "children.2.educationLevel",
              children: edLevels,
            },
            {
              type: "select",
              id: "children.2.favouriteCuisine",
              children: cuisines,
            },
          ],
        },
      ],
    },
    {
      type: "subForm",
      id: "Pet",
      subforms: [
        {
          form: [
            { type: "input", id: "pets.0.petName" },
            { type: "input", id: "pets.0.petAge", isInputTypeNumber: true },
          ],
        },
        {
          form: [
            { type: "input", id: "pets.1.petName" },
            { type: "input", id: "pets.1.petAge", isInputTypeNumber: true },
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
