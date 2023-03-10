import React from "react";
import { FieldType } from "../../data/data";
import { Input } from "./fields/Input";
import Select from "./fields/Select";

export const formFactory = (field: FieldType): React.ReactNode => {
  if (field.type.startsWith("input")) {
    return <Input id={field.id} key={field.id + field.type} />;
  }

  if (field.type === "select") {
    return (
      <Select
        options={field.children as FieldType[]}
        id={field.id}
        key={field.id + field.type}
      />
    );
  }

  if (field.type === "subForm" && field.children) {
    return field.children.map((child, i) => {
      const childToMap = child as FieldType[];
      return (
        <div key={field.type}>
          <p>{field.id + "#" + (i + 1)}</p>
          {childToMap.map((form) => {
            return formFactory(form);
          })}
        </div>
      );
    });
  }
};
