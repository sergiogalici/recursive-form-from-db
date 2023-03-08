import React from "react";
import { useFormContext } from "react-hook-form/dist/useFormContext";

type InputProps = {
  field: string;
};

const Input = ({ field }: InputProps) => {
  const { register } = useFormContext();
  return <input {...register(field)} />;
};

export default Input;
