import { FieldType } from "../../data/data";

export type MappedFieldType = Omit<FieldType, "children"> & {
  children: MappedFieldType[] | MappedFieldType[][];
};
