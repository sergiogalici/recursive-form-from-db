import React from "react";
import { FieldType } from "../../../data/data";
import { useFormContext } from "react-hook-form";
import { stringFormatter } from "../../../utils/stringFormatter";

type SelectPropsType = {
  id: string;
  options: FieldType[];
};

export const Select = ({ id, options }: SelectPropsType) => {
  const { register } = useFormContext();
  return (
    <>
      <label htmlFor={id}>{stringFormatter(id)}</label>
      <select {...register(id)}>
        {options &&
          options.map((child) => {
            return (
              <option key={child.id} value={child.id}>
                {stringFormatter(child.id)}
              </option>
            );
          })}
      </select>
    </>
  );
};

export default Select;
