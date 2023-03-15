export const stringFormatter = (string: string): string => {
  if (string.includes(".")) {
    const lastField = stringFormatter(string.split(".").pop() ?? "");
    return lastField.split(" ").length < 2
      ? lastField
      : lastField.split(" ")[0].concat(" " + lastField.split(" ")[1]);
  }
  return string.split("").reduce((acc, char, i) => {
    const newChar: string =
      i === 0
        ? char
        : char === char.toUpperCase()
        ? ` ${char.toLowerCase()}`
        : char;
    acc += newChar;
    return acc;
  }, "");
};

export const inputTypePicker = (input: string): string => {
  return input.split("-")[1];
};

export const getLastFieldElement = (fieldId: string | undefined): string => {
  if (fieldId === undefined) return "";
  return fieldId.split(".").length > 1 ? fieldId.split(".").pop()! : fieldId;
};

export const subFormIdMapper = (fieldId: string | undefined): string => {
  if (fieldId === undefined) return "";
  return fieldId.split(".").length > 1
    ? fieldId
        .split(".")
        .map((field) =>
          !isNaN(Number(Number(field)))
            ? (Number(field) + 1).toString()
            : stringFormatter(field)
        )
        .join(" ")
    : fieldId;
};
