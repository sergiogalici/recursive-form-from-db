import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useDispatch } from "react-redux";
import { FormConfigType } from "../../data/data";
import { formsActions } from "../../features/forms/reducers";
import { formConfigPreMapper } from "../../utils/formConfigPreMapper";
import { formMapper } from "../../utils/formMapper";
import { formFactory } from "./formFactory";
import { MappedFieldType } from "./model";

const onSubmit = (data: any) => console.log(data);

type FormPropsType = {
  formConfig: FormConfigType;
};

const mapper = (mappedForm: MappedFieldType[]): React.ReactNode => {
  return mappedForm.map((item) => {
    return formFactory(item);
  });
};

export const Form = ({ formConfig }: FormPropsType) => {
  const methods = useForm<FormConfigType>();
  const preMappedForm = formConfigPreMapper(formConfig);
  const mappedForm = formMapper(preMappedForm);
  const dispatch = useDispatch();
  dispatch(formsActions.updateForm(mappedForm));
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {mapper(mappedForm)}
        <input type="submit" />
      </form>
    </FormProvider>
  );
};
