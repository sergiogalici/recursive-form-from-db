import { getLastFieldElement } from "../../../utils/stringFormatter";

export const emptyObjectFactory = (object: {}): {} => {
  return Object.entries(object).reduce((acc, [key, value]) => {
    if (Array.isArray(value)) {
      const isValueArrayOfOptions = Object.values(value).some(
        (item) => typeof item === "string"
      );
      if (Array.isArray(value) && !isValueArrayOfOptions) {
        return {
          ...acc,
          [getLastFieldElement(key)]: value.map((subValue) =>
            emptyObjectFactory(subValue)
          ),
        };
      }
    }

    return { ...acc, [getLastFieldElement(key)]: value };
  }, {});
};
