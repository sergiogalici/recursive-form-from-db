// RHF abstraction
import React from "react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { formsActions } from "./../../features/forms/reducers";
import { selectAllForms } from "./../../features/forms/selector";
import * as yup from "yup";
import Input from "./fields/Input";

export const Form = () => {
  return <Input field="firstName" />;
};
