import React from "react";
import { Form } from "./components/Form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { childField, formConfig } from "./data/data";
import { formConfigPreMapper } from "./utils/formConfigPreMapper";
import { formMapper } from "./utils/formMapper";
import { useDispatch } from "react-redux";
import { formsActions } from "./features/forms/reducers";

const App = () => {
  // Generate formData dynamically from formConfig and from user choices ?? initialFormData

  const preMappedForm = formConfigPreMapper(formConfig);
  const mappedForm = formMapper(preMappedForm);
  const dispatch = useDispatch();
  dispatch(formsActions.updateForm(mappedForm));

  return (
    <div>
      <Form />
      <button
        onClick={() => dispatch(formsActions.addFieldToSubform(childField))}
      >
        Add a Child
      </button>
    </div>
  );

  // FN LN FC EL
};

export default App;
