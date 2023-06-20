import React, { useState, useEffect } from "react";
import Router from "next/router";
import { useForm } from "react-hook-form";
import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
//Components
import Input from "../../shared/Form/Input";
import Button from "../../shared/Buttons/Button";
import Loading from "../../shared/Buttons/Loading";
//Redux
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import { loginSuccess } from "@/src/redux/actions/userActions/userActions";
type Props = {
  setSignUp: (active: boolean) => void;
  setLoading: (active: boolean) => void;
  signUp: boolean;
  sessionData: any;
  loading:boolean;
};

const SignupSchema = yup.object().shape({
  //Yup schema to set the values
  email: yup.string().email("Must be an email").required("Required"),
  password: yup.string().required("Required"),
});

const Signin = (props: Props) => {
  const [message, setMessage] = useState<string>("");
  const isAuthenticated = useSelector((state:any) => state.user.isAuthenticated);

  //redux initialize
  const dispatch = useDispatch()

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
    props.setLoading(true);
    //submiting the values to the API and saving in the db
    await axios
      .post(process.env.NEXT_PUBLIC_ERP_POST_LOGIN as string, {data})
      .then((r: AxiosResponse) => {
        if (r.data.message == "success") {
          props.setLoading(false);
          const token: any = jwt_decode(r.data.token);
          Cookies.set("_hjSession", r.data.token, { expires: 1 });
          dispatch(loginSuccess(r.data.payload, token.type))
          console.log(isAuthenticated)
          Router.push("/");
        } else if (r.data.message == "invalid") {
          props.setLoading(false);
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
            {props.loading ? <Loading style={"btn-primary"} /> : <Button style={"btn-primary"} type="submit" label="Login" />}
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
            <p> Create a company account.</p>
          </button>
        </span>
      </div>
    </div>
  );
};

export default Signin;
