export const stringFormatter = (string: string): string => {
  return string.split("").reduce((acc, char, i) => {
    const newChar: string =
      i === 0
        ? char.toUpperCase()
        : char === char.toUpperCase()
        ? ` ${char}`
        : char;
    acc += newChar;
    return acc;
  }, "");
};
