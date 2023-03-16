import React from "react";
import { useForm } from "react-hook-form";
import { FormProvider } from "react-hook-form";
import { formConfig } from "../../data/data";
import { formConfigPreMapper } from "../../utils/formConfigPreMapper";
import { formMapper } from "../../utils/formMapper";
import { rfhMapper } from "../../utils/rhfMapper";
import { Input } from "../Form/fields/Input";
import Select from "../Form/fields/Select";
import { NewFormFactory } from "./newFormFactory";

const preMappedForm = formConfigPreMapper(formConfig);
const mappedForm = formMapper(preMappedForm);
const mappedForHook = rfhMapper(mappedForm);

export type MappedHookForm = typeof mappedForHook;

const onSubmit = (data: any) => console.log(data);

// console.log("FORM = ", mappedForHook);

export const RHFMappedForm = () => {
  const methods = useForm<MappedHookForm>({
    defaultValues: mappedForHook,
  });
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {Object.entries(mappedForHook).map(([key, value], i) => {
          return (
            <NewFormFactory key={key} mapKey={key} mapValue={value} index={i} />
          );
        })}
        <input type="submit" />
      </form>
    </FormProvider>
  );
};
