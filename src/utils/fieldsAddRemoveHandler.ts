import { MappedFieldType } from "../components/Form/model";
import { childField, FieldType, petField } from "../data/data";
import { formConfigPreMapper } from "./formConfigPreMapper";
import { formMapper } from "./formMapper";

export const addField = (field: MappedFieldType) => {
  let fieldToAdd: FieldType[];

  if (field.id === "children") {
    fieldToAdd = childField;
  }

  if (field.id === "pets") {
    fieldToAdd = petField;
  }

  const childrenToMap = field.children as MappedFieldType[][];
  const preMapped = formConfigPreMapper(fieldToAdd!);
  const mapped = formMapper(preMapped, field.id, childrenToMap.length);

  childrenToMap.push(mapped);

  field.children = childrenToMap;
  return field;
};

export const removeField = (field: MappedFieldType) => {
  const childrenToMap = field.children as MappedFieldType[][];

  childrenToMap.pop();

  field.children = childrenToMap;

  return field;
};
