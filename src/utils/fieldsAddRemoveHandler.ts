import { MappedFieldType } from "../components/Form/model";
import { FieldType, mappedSubFields, MappedSubFieldsType } from "../data/data";
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

export const removeField = (
  form: MappedFieldType[],
  id: string
): MappedFieldType[] => {
  const filteredForm = form.filter((field) => field.id !== id);

  if (filteredForm.length === form.length) {
    return form.map((field) => {
      if (field.multiple && field.children) {
        const childrenToMap = field.children.map((child) =>
          removeField(child, id)
        );
        return { ...field, children: childrenToMap };
      }

      return field;
    });
  }

  return filteredForm;
};
