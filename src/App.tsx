import React from "react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { formsActions } from "./features/forms/reducers";
import { selectAllForms } from "./features/forms/selector";

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

  const {
    fields: addressesFields,
    append: appendAddresses,
    remove: removeAddresses,
  } = useFieldArray({
    name: "addresses",
    control,
  });

  const {
    fields: totalChildrenFields,
    append: appendChild,
    remove: removeChild,
  } = useFieldArray({
    name: "totalChildren",
    control,
  });

  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
    dispatch(formsActions.updateForm(data));
  };

  const forms = useSelector(selectAllForms);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="Insert your name"
          {...register("firstName", { required: true })}
        />
        <p>{errors.firstName?.message}</p>
        <input
          placeholder="Insert your last name"
          {...register("lastName", { required: true })}
        />
        <p>{errors.lastName?.message}</p>
        <input
          placeholder="Insert your email"
          {...register("email", { required: true, minLength: 10 })}
        />
        <p>{errors.email?.message}</p>
        <p>Select an Education Level</p>
        <select {...register(`educationalLevels`)}>
          {edLevels.map((level, i) => {
            return (
              <option key={Date.now() * Math.random()} value={level}>
                {level}
              </option>
            );
          })}
        </select>
        <p>Select a favourite cuisine</p>
        <select {...register(`favouriteCuisine`)}>
          {cuisines.map((level, i) => {
            return (
              <option key={Date.now() * Math.random()} value={level}>
                {level}
              </option>
            );
          })}
        </select>
        {addressesFields.map((field, i) => {
          return (
            <div key={field.id} className="container">
              <p>Address #{i + 1}</p>
              <input
                placeholder={`Insert address`}
                {...register(`addresses.${i}.address`)}
              />
              <p>{errors.addresses && errors.addresses[i]?.address?.message}</p>
              <input
                placeholder={`Insert house number`}
                {...register(`addresses.${i}.houseNumber`)}
              />
              <p>
                {errors.addresses && errors.addresses[i]?.houseNumber?.message}
              </p>
              <input
                placeholder={`Insert city`}
                {...register(`addresses.${i}.city`)}
              />
              <p>{errors.addresses && errors.addresses[i]?.city?.message}</p>
              <input
                placeholder={`Insert state`}
                {...register(`addresses.${i}.state`)}
              />
              <p>{errors.addresses && errors.addresses[i]?.state?.message}</p>

              <button onClick={() => removeAddresses(i)}>
                Remove residence
              </button>
              <button
                onClick={() =>
                  setValue(`addresses.${i}`, {
                    address: "default address",
                    houseNumber: 1,
                    city: "default city",
                    state: "default state",
                  })
                }
              >
                Add a default residence
              </button>
            </div>
          );
        })}

        {totalChildrenFields.map((field, i) => {
          return (
            <div className="container" key={field.id}>
              <input
                placeholder={`Insert child name`}
                {...register(`totalChildren.${i}.name`)}
              />
              <p>
                {errors.totalChildren && errors.totalChildren[i]?.name?.message}
              </p>
              <input
                placeholder={`Insert child age`}
                {...register(`totalChildren.${i}.age`)}
              />
              <p>
                {errors.totalChildren && errors.totalChildren[i]?.age?.message}
              </p>
              <p>Select an Education Level</p>
              <select {...register(`totalChildren.${i}.educationalLevels`)}>
                {edLevels.map((level) => {
                  return (
                    <option key={Date.now() * Math.random()} value={level}>
                      {level}
                    </option>
                  );
                })}
              </select>
              <p>Select a favourite cuisine</p>

              <select {...register(`totalChildren.${i}.favouriteCuisine`)}>
                {cuisines.map((level, i) => {
                  return (
                    <option key={Date.now() * Math.random()} value={level}>
                      {level}
                    </option>
                  );
                })}
              </select>
              <button onClick={() => removeChild(i)}>Remove child</button>
            </div>
          );
        })}
        <button
          onClick={() =>
            appendAddresses({
              address: "",
              city: "",
              houseNumber: 1,
              state: "",
            })
          }
        >
          Add a residence
        </button>
        <button
          onClick={() =>
            appendChild({
              name: "",
              age: 1,
              educationalLevels: "earlyEducation",
            })
          }
        >
          Add a child
        </button>
        <p>{errors.addresses?.message}</p>
        <input type="submit" />
        <button onClick={() => reset()}>Reset the entire form</button>
        <button
          onClick={() => {
            setValue("firstName", "Default");
            setValue("lastName", "Default");
            setValue("email", "default@default.com");
          }}
        >
          Set all fields to default
        </button>
      </form>
      {forms.map((form) => {
        return (
          <p key={Date.now() * Math.random()}>Form of: {form.firstName}</p>
        );
      })}
    </>
  );
};

export default App;
