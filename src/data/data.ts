import { Field } from "react-hook-form";

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

export const favouriteToysField: FieldType[] = [
  { type: "input-text", id: "toyManufacturer" },
  { type: "input-number", id: "toyPrice" },
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
  {
    type: "subForm",
    id: "childFavouriteToys",
    children: favouriteToysField,
    multiple: true,
  },
];

const ratingsField: FieldType[] = [
  {
    type: "input-number",
    id: "buyerRating",
  },
];

const productBuyerField: FieldType[] = [
  {
    type: "input-text",
    id: "buyerName",
  },
  {
    type: "input-number",
    id: "productQuantity",
  },
  {
    type: "subForm",
    id: "buyerRatings",
    multiple: true,
    children: ratingsField,
  },
];

const productField: FieldType[] = [
  {
    type: "input-text",
    id: "productName",
  },
  {
    type: "subForm",
    id: "productBuyers",
    multiple: true,
    children: productBuyerField,
  },
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
    // addNewItemTitle: "aggiungi figlio",
    children: childField,
  },
  {
    type: "subForm",
    id: "pets",
    multiple: true,
    children: petField,
  },
  {
    type: "subForm",
    id: "products",
    multiple: true,
    children: productField,
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
  childFavouriteToys: favouriteToysField,
  products: productField,
  productBuyers: productBuyerField,
  buyerRatings: ratingsField,
};

export type MappedSubFieldsType = {
  pets: FieldType[];
  children: FieldType[];
  childPets: FieldType[];
  childFavouriteToys: FieldType[];
  products: FieldType[];
  productBuyers: FieldType[];
  buyerRatings: FieldType[];
};
