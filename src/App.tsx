import React from "react";
import { Form } from "./components/Form";
import { formConfig } from "./data/data";
import { formConfigPreMapper } from "./utils/formConfigPreMapper";
import { formMapper } from "./utils/formMapper";
import { useDispatch } from "react-redux";
import { formsActions } from "./features/forms/reducers";
import { rfhMapper } from "./utils/rhfMapper";
import { RHFMappedForm } from "./components/RHFMappedForm";

const App = () => {
  // Generate formData dynamically from formConfig and from user choices ?? initialFormData

  const preMappedForm = formConfigPreMapper(formConfig);
  const mappedForm = formMapper(preMappedForm);
  const dispatch = useDispatch();
  dispatch(formsActions.updateForm(mappedForm));

  const mappedForHook = rfhMapper(mappedForm);

  return (
    <div>
      <RHFMappedForm />
    </div>
  );

  // FN LN FC EL
};

export default App;
