import React from "react";
import { useFormContext } from "react-hook-form";
import { stringFormatter } from "../../../utils/stringFormatter";

type InputProps = {
  id: string;
};

export const Input = ({ id }: InputProps) => {
  const { register } = useFormContext();
  return (
    <input
      placeholder={`Please inser your ${stringFormatter(id)}`}
      {...register(id)}
    />
  );
};
