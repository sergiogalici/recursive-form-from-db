import React from "react";
import { useFormContext, useForm, FormProvider } from "react-hook-form";
import { FieldType, FormConfigType } from "../../data/data";
import { formConfigMapper } from "../../utils/getItemDepth";
import { Input } from "./fields/Input";
import Select from "./fields/Select";

const onSubmit = (data: any) => console.log(data);

type FormPropsType = {
  formConfig: FormConfigType;
};

const mapper = (form: FormConfigType): React.ReactNode => {
  console.log(formConfigMapper(form));
  return <p>aaa</p>;
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
