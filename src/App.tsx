import React from "react";
import { useForm } from "react-hook-form";
import { FormProvider } from "react-hook-form/dist/useFormContext";
import { Form } from "./components/Form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { formConfig } from "./data/data";

const App = () => {
  // Generate formData dynamically from formConfig and from user choices ?? initialFormData

  return <Form formConfig={formConfig} />;

  // FN LN FC EL
};

export default App;
