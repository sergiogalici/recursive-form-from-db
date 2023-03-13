import React from "react";
import { useDispatch } from "react-redux";
import { formsActions } from "../../features/forms/reducers";
import {
  getLastFieldElement,
  subFormIdMapper,
} from "../../utils/stringFormatter";
import { Input } from "./fields/Input";
import Select from "./fields/Select";
import { MappedFieldType } from "./model";

type FormFactoryPropsType = {
  field: MappedFieldType;
};

const addPetToChild = (childToMap: MappedFieldType[]) => {
  return formsActions.addFieldToSubform(
    childToMap.find(
      (subChild) => getLastFieldElement(subChild.id) === "childPets"
    )?.id ?? ""
  );
};

// add a memo in each single Field Element

export const FormFactory = ({ field }: FormFactoryPropsType) => {
  const dispatch = useDispatch();

  if (field.type.startsWith("input")) {
    return <Input type={field.type} id={field.id} key={field.id} />;
  }

  if (field.type === "select") {
    return (
      <Select
        options={field.children as MappedFieldType[]}
        id={field.id}
        key={field.id}
      />
    );
  }

  if (field.type === "subForm" && field.children) {
    // extract to SubForm component
    return (
      <React.Fragment key={field.type + field.id}>
        {field.children.map((child, i) => {
          const childToMap = child as MappedFieldType[];
          return (
            <div key={field.type + field.id + i}>
              <p>{subFormIdMapper(field.id) + "#" + (i + 1)}</p>
              {childToMap.map((form) => {
                return <FormFactory field={form} key={form.id} />;
              })}
              {getLastFieldElement(field.id) === "children" && (
                <button onClick={() => dispatch(addPetToChild(childToMap))}>
                  Add a pet to child
                </button>
              )}
            </div>
          );
        })}
      </React.Fragment>
    );
  }
  return null;
};
