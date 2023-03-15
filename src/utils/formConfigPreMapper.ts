import { MappedFieldType } from "../components/Form/model";
import { FieldType } from "../data/data";

export const formConfigPreMapper = (form: FieldType[]): MappedFieldType[] => {
  return form.map((field) => {
    if (field.multiple && field.children) {
      const childrenToMap = field.children as FieldType[];
      const anySubFormsInChildren = field.children.some(
        (child) => child.type === "subForm"
      );

      if (anySubFormsInChildren) {
        return {
          ...field,
          children: [formConfigPreMapper(childrenToMap)],
        } as MappedFieldType;
      }

      return {
        ...field,
        children: [field.children],
      } as MappedFieldType;
    }

    return field as MappedFieldType;
  });
};
