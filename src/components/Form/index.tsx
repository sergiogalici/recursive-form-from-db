import React from "react";
import { useFormContext, useForm, FormProvider } from "react-hook-form";
import { Input } from "./fields/Input";

const onSubmit = (data: any) => console.log(data);

export const Form = (props: any) => {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Input id={props.data.firstName} />
      </form>
    </FormProvider>
  );
};
