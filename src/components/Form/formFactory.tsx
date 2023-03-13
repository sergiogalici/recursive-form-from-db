import React from "react";
import { getLastFieldElement } from "../../utils/stringFormatter";
import { Input } from "./fields/Input";
import Select from "./fields/Select";
import { MappedFieldType } from "./model";

export const formFactory = (field: MappedFieldType): React.ReactNode => {
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
    return field.children.map((child, i) => {
      const childToMap = child as MappedFieldType[];
      return (
        <div key={field.type + field.key + i}>
          <p>{getLastFieldElement(field.key) + "#" + (i + 1)}</p>
          {childToMap.map((form) => {
            return formFactory(form);
          })}
        </div>
      );
    });
  }
};
