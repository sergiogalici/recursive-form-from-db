import { FieldType, FormConfigType } from "../data/data";

export const formConfigMapper = (
  form: FieldType[],
  parent: string = "",
  index: number = 0
): FieldType[] => {
  return form.map((field) => {
    const newId = parent ? `${parent}.${index}.${field.id}` : "";

    if (field.type === "subForm" && field.children) {
      let childrenToMap = field.children as FormConfigType[];
      childrenToMap = childrenToMap.map((child, i) => {
        return formConfigMapper(child, field.id, i);
      });
      return { ...field, children: childrenToMap };
    }

    if (newId !== "") {
      console.log("NEW ID = ", newId);
      return { ...field, id: newId };
    }

    return field;
  });
};
