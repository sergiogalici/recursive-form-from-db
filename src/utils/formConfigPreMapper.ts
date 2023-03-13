import { MappedFieldType } from "../components/Form/model";
import { FieldType, FormConfigType } from "../data/data";

export const formConfigPreMapper = (form: FieldType[]): MappedFieldType[] => {
  return form.map((field) => {
    if (field.multiple) {
      const childrenToMap = field.children as FieldType[];
      const isSubFormInChildren = field.children?.map(
        (child) => child.type === "subForm"
      );
      if (isSubFormInChildren) {
        // remove repetitions
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
