import React from "react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";

interface IFormInputs {
  firstName: string;
  lastName: string;
  email: string;
  addresses: AddressType[];
}

type AddressType = {
  address: string;
  city: string;
};

const onSubmit: SubmitHandler<IFormInputs> = (data) => console.log(data);

const App = () => {
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<IFormInputs>({
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "addresses",
    control,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        placeholder="Insert your name"
        {...register("firstName", { required: true })}
      />
      {errors.firstName && "First name is required"}
      <input
        placeholder="Insert your last name"
        {...register("lastName", { required: true })}
      />
      {errors.lastName && "Last name is required"}
      <input
        type="email"
        placeholder="Insert your email"
        {...register("email", { required: true, minLength: 10 })}
      />
      {errors.email && errors.email.message}
      <p>How many residencies do you have?</p>
      <button
        onClick={() =>
          append({
            address: "",
            city: "",
          })
        }
      >
        Add a residence
      </button>
      {fields.map((_, i) => {
        return (
          <div key={Date.now() * Math.random()} className="input-container">
            <p>Address #{i + 1}</p>
            <input
              placeholder={`Insert address`}
              {...register(`addresses.${i}.address`)}
            />
            <input
              placeholder={`Insert city`}
              {...register(`addresses.${i}.city`)}
            />
            <button onClick={() => remove(i)}>Remove residence</button>
          </div>
        );
      })}

      <input type="submit" />
    </form>
  );
};

export default App;
