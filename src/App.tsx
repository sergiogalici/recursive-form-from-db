import React from "react";
import { useForm } from "react-hook-form";
import { FormProvider } from "react-hook-form/dist/useFormContext";
import { Form } from "./components/Form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const edLevels = [
  "earlyEducation",
  "elementarySchool",
  "middleSchool",
  "highSchool",
  "college",
  "graduateSchool",
  "graduateSchool",
  "phd",
];

const cuisines = [
  "italian",
  "american",
  "mexican",
  "thai",
  "chinese",
  "japanese",
  "korean",
];

const edLevelsSchema = yup.string().oneOf(edLevels);

const favouriteCuisinesSchema = yup.string().oneOf(cuisines);

const schema = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().required().email(),
    addresses: yup
      .array()
      .of(
        yup.object().shape({
          address: yup.string().required(),
          houseNumber: yup.number().required().positive().min(1).max(9999),
          city: yup.string().required(),
          state: yup.string().required(),
        })
      )
      .min(1),
    totalChildren: yup.array().of(
      yup.object().shape({
        name: yup.string().required(),
        age: yup.number().positive().min(1).max(99),
        educationalLevels: edLevelsSchema,
        favouriteCuisine: favouriteCuisinesSchema,
      })
    ),
    educationalLevels: edLevelsSchema,
    favouriteCuisine: favouriteCuisinesSchema,
  })
  .required();

export type FormData = yup.InferType<typeof schema>;

const App = () => {
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      educationalLevels: "",
      email: "",
      favouriteCuisine: "",
      addresses: [],
      totalChildren: [],
    },
    resolver: yupResolver(schema),
  });

  return <Form />;
};

export default App;
