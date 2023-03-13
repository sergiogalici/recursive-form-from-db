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

export const petField: FieldType[] = [
  { type: "input-text", id: "petName" },
  { type: "input-number", id: "petAge" },
];

export const childField: FieldType[] = [
  { type: "input-text", id: "name" },
  {
    type: "input-number",
    id: "age",
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
  { type: "subForm", id: "childPets", children: petField, multiple: true },
];

export const formConfig: FieldType[] = [
  {
    type: "input-text",
    id: "firstName",
  },
  {
    type: "input-text",
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
    children: childField,
  },
  {
    type: "subForm",
    id: "pets",
    multiple: true,
    children: petField,
  },
];

export type FormConfigType = FieldType[];

export type FieldType = {
  type: InputType | "select" | "checkbox" | "option" | "subForm";
  id: string;
  children?: FieldType[];
  multiple?: boolean;
};

type InputType =
  | "input-text"
  | "input-submit"
  | "input-number"
  | "input-date"
  | "input-email"
  | "input-checkbox"
  | "input-password";

export const mappedSubFields: MappedSubFieldsType = {
  pets: petField,
  children: childField,
  childPets: petField,
};

export type MappedSubFieldsType = {
  pets: FieldType[];
  children: FieldType[];
  childPets: FieldType[];
};
