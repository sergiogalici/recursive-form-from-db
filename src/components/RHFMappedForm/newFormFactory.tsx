import React from "react";
import { useFormContext } from "react-hook-form";
import { useFieldArray } from "react-hook-form";
import { MappedHookForm } from ".";
import { stringFormatter, subFormIdMapper } from "../../utils/stringFormatter";
import { Input } from "../Form/fields/Input";
import Select from "../Form/fields/Select";
import { emptyObjectFactory } from "./utils/emptyObjectFactory";

type NewFormFactoryPropsType = {
  mapKey: string;
  mapValue: any;
  index: number;
};

export const NewFormFactory = ({
  mapKey,
  mapValue,
  index,
}: NewFormFactoryPropsType) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useFormContext<MappedHookForm>();

  const { fields, append, remove } = useFieldArray({
    name: mapKey,
    control,
  });

  if (typeof mapValue === "string") {
    return <Input key={mapKey} id={mapKey} type="input-text" />;
  }

  if (typeof mapValue === "number") {
    return <Input key={mapKey} id={mapKey} type="input-number" />;
  }

  if (Array.isArray(mapValue)) {
    const isValueArrayOfOptions = Object.values(mapValue).some(
      (item) => typeof item === "string"
    );

    if (isValueArrayOfOptions) {
      return <Select id={mapKey} options={mapValue as string[]} key={mapKey} />;
    }

    // console.log("MAP KEY = ", mapKey, "WATCH = ", watch(mapKey));

    return (
      <div className="container">
        <p>{/* stringFormatter(mapKey) */}</p>
        {fields.map((item, index) => {
          return (
            <div key={item.id}>
              <p>{subFormIdMapper(mapKey) + "#" + (index + 1)}</p>
              <p>{/* JSON.stringify(item) */}</p>
              {Object.entries(item).map(([subKey, subValue], i) => {
                //console.log("SUBKEY = ", subKey);
                //console.log("SUBVALUE = ", subValue);
                if (subKey === "id") return null;
                return (
                  <NewFormFactory
                    index={i}
                    mapKey={subKey}
                    mapValue={subValue}
                    key={subKey}
                  />
                );
              })}
            </div>
          );
        })}
        <button
          onClick={() => {
            console.log("MAP VALUE = ", mapValue);
            append(emptyObjectFactory(mapValue[0]));
          }}
          type="button"
        >
          Add {stringFormatter(mapKey)}
        </button>
      </div>
    );
  }

  return null;
};
