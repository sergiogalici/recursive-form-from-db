import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { FormConfigType } from "../../data/data";
import { formConfigPreMapper } from "../../utils/formConfigPreMapper";
import { formMapper } from "../../utils/formMapper";
import { formFactory } from "./formFactory";

const onSubmit = (data: any) => console.log(data);

type FormPropsType = {
  formConfig: FormConfigType;
};

const mapper = (form: FormConfigType): React.ReactNode => {
  const preMappedForm = formConfigPreMapper(form);
  const mappedForm = formMapper(preMappedForm);
  return mappedForm.map((item) => {
    return formFactory(item);
  });
};

export const Form = ({ formConfig }: FormPropsType) => {
  const methods = useForm<FormConfigType>();
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {mapper(formConfig)}
        <input type="submit" />
      </form>
    </FormProvider>
  );
};
