import React from "react";
import { useFormContext } from "react-hook-form";

type InputProps = {
  id: string;
};

export const Input = ({ id }: InputProps) => {
  const { register } = useFormContext();
  return <input {...register(id)} />;
};
