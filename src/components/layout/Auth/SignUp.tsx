import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios, { AxiosResponse } from "axios";
//Components
import Input from "../../shared/Form/SecondaryInput";
import Button from "../../shared/Buttons/Button";
import Loading from "../../shared/Buttons/Loading";
//Redux
import { form_ } from "@/src/redux/reducers/formReducer";
import { useDispatch } from "react-redux";

type Props = {
  signUp: boolean;
  companyReg: boolean;
  setSignUp: (active: boolean) => void;
  setCompanyReg: (active: boolean) => void;
};

const SignupSchema = yup.object().shape({
  //Yup schema to set the values
  fname: yup.string().required("Required"),
  lname: yup.string().required("Required"),
  email: yup.string().email("Must be an E-mail!").required("Required"),
  phone: yup
    .string()
    .min(11, "Must be 11 Digits!")
    .max(11, "Must be 11 Digits!")
    .required("Required"),
  password: yup.string().required("Required"),
});

const Signup = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  //redux initialize
  const dispatch = useDispatch();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    //passing the props in the useForm yupResolver
    resolver: yupResolver(SignupSchema),
  });

  const onSubmit = async (data: object) => {
    setLoading(true);
    //submiting the values to the API and saving in the db
    axios
      .post(process.env.NEXT_PUBLIC_ERP_POST_SIGNUP as string, {
        data,
        type: "admin",
        designation:"owner"
      })
      .then((r: AxiosResponse) => {
        if (r.data.status == "success") {
          setLoading(false);
          console.log(r.data.payload.id)
          dispatch(form_({ id: r.data.payload.id }));
          props.setCompanyReg(true);
        } else if (r.data.status == "exists") {
          setLoading(false);
          setMessage("Account already exits!");
        }
      });
  };

  return (
    <div className="flex h-screen align-middle justify-center items-center bg-gradient-to-r from-custom-red-500 to-custom-red-700">
      <div className=" justify-center align-middle">
        <h1 className="text-center font-body mb-14 font-semibold text-5xl text-white">
          Sign Up
        </h1>
        <form className="w-auto lg:w-96 grid" onSubmit={handleSubmit(onSubmit)}>
          <Input
            register={register}
            name="fname"
            control={control}
            label="First Name"
            width={'w-full'}
            color={'text-white'}
          />

          <Input
            register={register}
            name="lname"
            control={control}
            label="Last Name"
            width={'w-full'}
            color={'text-white'}
          />

          <Input
            register={register}
            name="email"
            control={control}
            label="Email"
            width={'w-full'}
            color={'text-white'}
          />

          <Input
            register={register}
            name="phone"
            control={control}
            label="Phone Number"
            width={'w-full'}
            color={'text-white'}
          />

          <Input
            register={register}
            name="password"
            control={control}
            label="Password"
            width={'w-full'}
            color={'text-white'}
          />
          <div className="text-center mb-4 ">
            {loading ? (
              <Loading style={"btn-primary"} />
            ) : (
              <Button style={"btn-primary"} type="submit" label="Register" />
            )}
          </div>
        </form>
        <p className="text-white">{message}</p>
        <span className="mt-4 flex w-100">
          <p className="text-white font-extralight text-sm mx-1">
            Already have an account?
          </p>
          <p
            onClick={() => props.setSignUp(false)}
            className="text-white font-semibold text-sm"
          >
            <p> Sign in here.</p>
          </p>
        </span>
      </div>
    </div>
  );
};

const SignupHOC = React.memo(Signup);
export default SignupHOC;