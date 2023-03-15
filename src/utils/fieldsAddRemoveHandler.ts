import { MappedFieldType } from "../components/Form/model";
import {
  childField,
  FieldType,
  mappedSubFields,
  MappedSubFieldsType,
  petField,
} from "../data/data";
import { formConfigPreMapper } from "./formConfigPreMapper";
import { formMapper } from "./formMapper";

export const addField = (
  field: MappedFieldType,
  payload: string,
  mappedPayload: string
) => {
  if (field.multiple && field.id === payload) {
    let fieldToAdd: FieldType[] =
      mappedSubFields[mappedPayload as keyof MappedSubFieldsType];

    const childrenToMap = field.children as MappedFieldType[][];
    const preMapped = formConfigPreMapper(fieldToAdd!);
    const mapped = formMapper(preMapped, field.id, childrenToMap.length);

    childrenToMap.push(mapped);

    field.children = childrenToMap;
    return field;
  }

  if (field.multiple && field.id !== payload) {
    const childrenToMap = field.children as MappedFieldType[][];
    childrenToMap.map((child) => {
      return child.map((field) => {
        return addField(field, payload, mappedPayload);
      });
    });

    return {
      ...field,
      children: childrenToMap,
    };
  }
  return field;
};

export const removeField = (form: MappedFieldType[], id: string) => {
  return form.filter((field) => {
    if (field.id === id) {
      return false;
    }

    if (field.id !== id && field.multiple) {
      const childrenToFilter = field.children as MappedFieldType[][];
      field.children = childrenToFilter.filter((child) => {
        return removeField(child, id);
      });
    }

    return true;
  });
};
