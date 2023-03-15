import { MappedFieldType } from "../components/Form/model";
export const formMapper = (
  form: MappedFieldType[],
  parent = "",
  index: number = 0
) => {
  return form.map((field) => {
    const newId = parent ? `${parent}.${index}.${field.id}` : "";

    if (field.children && field.multiple) {
      let childrenToMap = field.children as MappedFieldType[][];

      childrenToMap = childrenToMap.map((child, i) => {
        return formMapper(child, newId !== "" ? newId : field.id, i);
      });

      return {
        ...field,
        children: childrenToMap,
        id: parent === "" ? field.id : `${parent}.${index}.${field.id}`,
      };
    }

    if (newId !== "") {
      return { ...field, id: newId };
    }

    return field;
  });
};
