import React from "react";
import { useDispatch } from "react-redux";
import { formsActions } from "../../features/forms/reducers";
import { getLastFieldElement } from "../../utils/stringFormatter";
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

export const FormFactory = ({ field }: FormFactoryPropsType) => {
  const dispatch = useDispatch();

  if (field.type.startsWith("input")) {
    return (
      <Input type={field.type} id={field.id} key={field.id + field.type} />
    );
  }

  if (field.type === "select") {
    return (
      <Select
        options={field.children as MappedFieldType[]}
        id={field.id}
        key={field.id + field.type}
      />
    );
  }

  if (field.type === "subForm" && field.children) {
    return (
      <React.Fragment key={field.type + field.key}>
        {field.children.map((child, i) => {
          const childToMap = child as MappedFieldType[];
          return (
            <div key={field.type + field.key + i}>
              <p>{getLastFieldElement(field.key) + "#" + (i + 1)}</p>
              {childToMap.map((form) => {
                return <FormFactory field={form} key={form.key} />;
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
