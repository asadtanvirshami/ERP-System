import React, { useState, useEffect, Fragment } from "react";
import { useForm } from "react-hook-form";
import axios, { AxiosResponse } from "axios";
import * as yup from "yup";
import Cookies from "js-cookie";
import { yupResolver } from "@hookform/resolvers/yup";
//Components Import
import Input from "@/src/components/shared/Form/Input";
import Button from "@/src/components/shared/Buttons/Button";
import Loader from "@/src/components/shared/Buttons/Loading";

type Props = {};

const SignupSchema = yup.object().shape({
  //Yup schema to set the values
  name: yup.string().required("Required"),
  designation: yup.string().required("Required"),
  address: yup.string().required("Required"),
  phone: yup.string().max(11).required("Required"),
  email: yup.string().email("Must be an email").required("Required"),
  password: yup.string().required("Required"),
});

const AgentCE = (props: Props) => {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

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
    let companyId = Cookies.get('company')
    console.log(companyId)
    //submiting the values to the API and saving in the db
    axios
      .post(process.env.NEXT_PUBLIC_ERP_POST_SIGNUP as string, {
        data,
        type: "agent",
        id:companyId
      })
      .then((r: AxiosResponse) => {
        console.log(r.data.status)
        if (r.data.status == "success") {
          setLoading(false);
          setMessage("Agent created successfully.")
        } else if (r.data.status == "error") {
          setLoading(false);
          setMessage("Agent already exits!");
        } 
      });
  };

  return (
    <Fragment>
      <form
        className="w-auto mx-auto lg:w-full justify-center grid"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-2 items-center gap-4 mb-2">
          <Input
            register={register}
            name="name"
            control={control}
            label="Full name"
            width={"w-30"}
            color={"text-gray"}
          />
          <Input
            register={register}
            name="phone"
            control={control}
            label="Phone No."
            width={"w-30"}
            color={"text-gray"}
          />
          <Input
            register={register}
            name="designation"
            control={control}
            label="Designation"
            width={"w-30"}
            color={"text-gray"}
          />
          <Input
            register={register}
            name="address"
            control={control}
            label="Address"
            width={"w-30"}
            color={"text-gray"}
          />
          <Input
            register={register}
            name="email"
            control={control}
            label="Email"
            width={"w-30"}
            color={"text-gray"}
          />
          <Input
            register={register}
            name="password"
            control={control}
            label="Password"
            width={"w-30"}
            color={"text-gray"}
          />
        </div>
        <div className="mb-1">
          {loading?<Loader style="btn-secondary"/>:<Button style="btn-secondary" label="Create" type="submit" />}
        </div>
        <p className="text-sm mt-2">{message}</p>
      </form>
    </Fragment>
  );
};

export default AgentCE;
