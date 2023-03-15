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
          const childToMap = child as MappedFieldType[];
          return (
            <div key={field.type + field.id + i}>
              <p>{subFormIdMapper(field.id) + "#" + (i + 1)}</p>
              {childToMap.map((form) => {
                return <FormFactory field={form} key={form.id} />;
              })}
              {childToMap.map((child, i) =>
                child.type === "subForm" ? (
                  <div key={child.id + i}>
                    <button
                      type="button"
                      onClick={() =>
                        dispatch(formsActions.addFieldToSubform(child.id))
                      }
                    >
                      Add a {stringFormatter(child.id)}
                    </button>
                  </div>
                ) : null
              )}
            </div>
          );
        })}
      </React.Fragment>
    );
  }
  return null;
};
