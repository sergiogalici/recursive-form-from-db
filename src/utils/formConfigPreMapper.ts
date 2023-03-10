import { MappedFieldType } from "../components/Form/model";
import { FormConfigType } from "../data/data";

export const formConfigPreMapper = (
  form: FormConfigType
): MappedFieldType[] => {
  return form.map((field) => {
    if (field.multiple) {
      return {
        ...field,
        children: [field.children],
      } as MappedFieldType;
    }
    return field as MappedFieldType;
  });
};
