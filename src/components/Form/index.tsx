import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useSelector } from "react-redux";
import { FormConfigType } from "../../data/data";
import { selectAllForms } from "../../features/forms/selector";
import { formFactory } from "./formFactory";
import { MappedFieldType } from "./model";

const onSubmit = (data: any) => console.log(data);

const mapper = (mappedForm: MappedFieldType[]): React.ReactNode => {
  return mappedForm.map((item) => {
    return formFactory(item);
  });
};

export const Form = () => {
  const methods = useForm<FormConfigType>();

  const currentForm = useSelector(selectAllForms);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {mapper(currentForm!)}
        <input type="submit" />
      </form>
    </FormProvider>
  );
};
