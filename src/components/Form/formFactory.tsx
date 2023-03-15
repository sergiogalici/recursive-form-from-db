import React from "react";
import { useDispatch } from "react-redux";
import { formsActions } from "../../features/forms/reducers";
import {
  getLastFieldElement,
  stringFormatter,
  subFormIdMapper,
} from "../../utils/stringFormatter";
import { Input } from "./fields/Input";
import Select from "./fields/Select";
import { MappedFieldType } from "./model";

type FormFactoryPropsType = {
  field: MappedFieldType;
};

// add a memo in each single Field Element

export const FormFactory = ({ field }: FormFactoryPropsType) => {
  const dispatch = useDispatch();

  if (field.type.startsWith("input")) {
    return <Input type={field.type} id={field.id} key={field.id} />;
  }

  if (field.type === "select" && !field.multiple) {
    return <Select options={field.children} id={field.id} key={field.id} />;
  }

  if (field.type === "subForm" && field.multiple) {
    // extract to SubForm component
    return (
      <React.Fragment key={field.id}>
        {field.children.map((child, i) => {
          return (
            <div className="container" key={field.type + field.id + i}>
              <p>{subFormIdMapper(field.id) + "#" + (i + 1)}</p>
              {child.map((form) => {
                return (
                  <div key={form.id}>
                    <FormFactory field={form} />
                    {form.multiple && (
                      <>
                        <button
                          type="button"
                          onClick={() =>
                            dispatch(formsActions.addFieldToSubform(form.id))
                          }
                        >
                          Add a {stringFormatter(form.id)}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            dispatch(
                              formsActions.removeFieldFromSubform(form.id)
                            );
                          }}
                        >
                          Remove {stringFormatter(form.id)}
                        </button>
                      </>
                    )}
                  </div>
                );
              })}
              {child.map((child, i) =>
                child.type === "subForm" ? <div key={child.id + i}></div> : null
              )}
            </div>
          );
        })}
      </React.Fragment>
    );
  }
  return null;
};
