import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInputs {
  firstName: string;
  lastName: string;
  numberOfRecidencies: number;
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
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<IFormInputs>({
    defaultValues: {
      firstName: "",
      lastName: "",
      numberOfRecidencies: 1,
    },
  });

  const selectedResidencies = Number(watch("numberOfRecidencies"));

  const arrOfRes = Array.from(Array(selectedResidencies));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName", { required: true })} />
      {errors.firstName && "First name is required"}
      <input {...register("lastName", { required: true })} />
      {errors.lastName && "Last name is required"}
      <input
        min={1}
        type="number"
        {...register("numberOfRecidencies", { min: 1 })}
      />
      {errors.numberOfRecidencies && "Not a valid input"}
      {arrOfRes.map((_, i) => {
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
          </div>
        );
      })}

      <input type="submit" />
    </form>
  );
};

export default App;
