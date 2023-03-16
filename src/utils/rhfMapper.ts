import { MappedFieldType } from "../components/Form/model";

export const rfhMapper = (form: MappedFieldType[]): any => {
  return form.reduce((acc, curr, i) => {
    switch (curr.type) {
      case "input-text":
        return { ...acc, [curr.id]: "" };
      case "input-number":
        return { ...acc, [curr.id]: 0 };
      case "select":
        return {
          ...acc,
          [curr.id]: optionsMapper(curr.children as MappedFieldType[]),
        };
      case "subForm":
        return {
          ...acc,
          [curr.id]: curr.children.map((child) =>
            rfhMapper(child as MappedFieldType[])
          ),
        };
    }

    return acc;
  }, {});
};

const optionsMapper = (options: MappedFieldType[]) => {
  return options.map((option) => option.id);
};
