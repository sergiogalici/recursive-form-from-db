import React from "react";
import { useFormContext } from "react-hook-form";

export const Input = () => {
  const { register } = useFormContext();
  return <input {...register("test")} />;
};
