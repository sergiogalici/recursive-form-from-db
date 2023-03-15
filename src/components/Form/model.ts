import { FieldType } from "../../data/data";

export type MappedFieldType = Omit<FieldType, "children" | "multiple"> &
  (
    | {
        multiple?: false;
        children: MappedFieldType[];
      }
    | {
        multiple: true;
        children: MappedFieldType[][];
      }
  );
