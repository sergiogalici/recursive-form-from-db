import React from "react";
import { useForm } from "react-hook-form";
import { FormProvider } from "react-hook-form/dist/useFormContext";
import { Form } from "./components/Form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { simpleForm } from "./data/data";


const App = () => {

  return <Form formData={simpleForm} />;
};

export default App;
