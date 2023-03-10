import React from "react";
import { useFormContext } from "react-hook-form";
import {
  inputTypePicker,
  stringFormatter,
} from "../../../utils/stringFormatter";

type InputProps = {
  id: string;
};

export const Input = ({ id }: InputProps) => {
  const { register } = useFormContext();
  return (
    <input
      type={inputTypePicker(id)}
      placeholder={`Please inser your ${stringFormatter(id)}`}
      {...register(id)}
    />
  );
};
