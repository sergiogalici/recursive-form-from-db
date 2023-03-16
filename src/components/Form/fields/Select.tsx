import React from "react";
import { useFormContext } from "react-hook-form";
import { stringFormatter } from "../../../utils/stringFormatter";
import { MappedFieldType } from "../model";

type SelectPropsType = {
  id: string;
  options: MappedFieldType[] | string[];
};

export const Select = ({ id, options }: SelectPropsType) => {
  const { register } = useFormContext();
  return (
    <>
      <label htmlFor={id}>{stringFormatter(id) + " "}</label>
      <select {...register(id)}>
        {options &&
          options.map((item) => {
            return (
              <option key={item as string} value={item as string}>
                {stringFormatter(item as string)}
              </option>
            );
          })}
      </select>
    </>
  );
};

export default Select;
