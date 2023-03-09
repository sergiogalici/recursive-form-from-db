import React from "react";
import { useFormContext } from "react-hook-form";
import { stringFormatter } from "../../../utils/stringFormatter";

type InputProps = {
  id: string;
  isInputTypeNumber?: boolean;
};

export const Input = ({ id, isInputTypeNumber }: InputProps) => {
  const { register } = useFormContext();
  return (
    <input
      type={isInputTypeNumber ? "number" : "text"}
      placeholder={`Please inser your ${stringFormatter(id)}`}
      {...register(id)}
    />
  );
};
