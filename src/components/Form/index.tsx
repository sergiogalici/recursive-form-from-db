import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { FormConfigType } from "../../data/data";
import { formsActions } from "../../features/forms/reducers";
import { selectAllForms } from "../../features/forms/selector";
import { stringFormatter } from "../../utils/stringFormatter";
import { FormFactory } from "./formFactory";
import { MappedFieldType } from "./model";

const onSubmit = (data: any) => console.log(data);

export const Form = () => {
  const methods = useForm<FormConfigType>();

  const currentForm = useSelector(selectAllForms);

  const dispatch = useDispatch();

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {currentForm?.map((item) => {
          return (
            <div key={item.id}>
              <FormFactory field={item} />
              {item.multiple && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      dispatch(formsActions.addFieldToSubform(item.id))
                    }
                  >
                    Add a {stringFormatter(item.id)}
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      dispatch(formsActions.removeFieldFromSubform(item.id))
                    }
                  >
                    Remove {stringFormatter(item.id)}
                  </button>
                </>
              )}
            </div>
          );
        })}
        <input type="submit" />
      </form>
    </FormProvider>
  );
};
