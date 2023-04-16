import React, { useState, useEffect } from "react";
import Router from "next/router";
import { useForm } from "react-hook-form";
import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
//Components
import Input from "../../shared/Form/Inputs/Large/Input";
import Button from "../../shared/Buttons/Large/Button";
import Loading from "../../shared/Buttons/Large/Loading";

type Props = {
  setSignUp: (active: boolean) => void;
  signUp: boolean;
  sessionData: any;
};

const SignupSchema = yup.object().shape({
  //Yup schema to set the values
  email: yup.string().email("Must be an email").required("Required"),
  password: yup.string().required("Required"),
});

const Signin = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if (props.sessionData.isLoggedIn == true) {
      Router.push("/");
    }
  }, [props.sessionData]);

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
    await axios
      .post(process.env.NEXT_PUBLIC_ERP_POST_LOGIN as string, {
        data,
        type: "admin",
      })
      .then((r: AxiosResponse) => {
        if (r.data.message == "success") {
          setLoading(false);
          const token: any = jwt_decode(r.data.token);
          Cookies.set("token", r.data.token, { expires: 1 });
          Cookies.set("user", token.name, { expires: 1 });
          Cookies.set("designation", token.role, { expires: 1 });
          Cookies.set("loginId", token.loginId, { expires: 1 });
          Cookies.set("type", token.type, { expires: 1 });
          Router.push("/");
        } else if (r.data.message == "invalid") {
          setLoading(false);
          setMessage("Invalid email or password!");
        }
      });
  };

  return (
    <div className="flex h-screen align-middle justify-center items-center bg-gradient-to-r from-custom-red-500 to-custom-red-700">
      <div className=" justify-center align-middle">
        <h1 className="text-center font-body mb-14 font-semibold text-5xl text-white">
          Sign In
        </h1>
        <form className="w-auto lg:w-96 grid" onSubmit={handleSubmit(onSubmit)}>
          <Input
            register={register}
            name="email"
            control={control}
            label="Email"
          />
          <Input
            register={register}
            name="password"
            control={control}
            label="Password"
          />
          <div className="text-center mb-4 ">
            {loading ? <Loading /> : <Button type="submit" label="Register" />}
          </div>
          <p className="text-white">{message}</p>
        </form>
        <span className="mt-4 flex w-100">
          <p className="text-white font-extralight text-sm mx-1">
            Don't have an account?
          </p>
          <button
            onClick={() => {
              props.setSignUp(true);
            }}
            className="bg-transparent text-white font-semibold text-sm"
          >
            <p> Create a new account.</p>
          </button>
        </span>
      </div>
    </div>
  );
};

export default Signin;
