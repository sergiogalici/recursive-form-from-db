import React from "react";
import { useFormContext } from "react-hook-form";
import {
  inputTypePicker,
  stringFormatter,
} from "../../../utils/stringFormatter";

type InputProps = {
  id: string;
  type: string;
};

export const Input = ({ id, type }: InputProps) => {
  const { register } = useFormContext();
  return (
    <input
      type={inputTypePicker(type)}
      placeholder={`Please inser your ${stringFormatter(id)}`}
      {...register(id)}
    />
  );
};
