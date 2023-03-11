import { FieldType } from "../../data/data";

export type MappedFieldType = Omit<FieldType, "children"> & {
  key: string;
  children: MappedFieldType[] | MappedFieldType[][];
};
