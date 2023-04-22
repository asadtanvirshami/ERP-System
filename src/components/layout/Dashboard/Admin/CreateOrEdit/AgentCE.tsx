import React, { useState, useEffect, Fragment } from "react";
import { useForm } from "react-hook-form";
import axios, { AxiosResponse } from "axios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import Input from "@/src/components/shared/Form/Input";
import Button from "@/src/components/shared/Buttons/Button";

type Props = {};

const SignupSchema = yup.object().shape({
  //Yup schema to set the values
  name: yup.string().required("Required"),
  f_name: yup.string().required("Required"),
  designation: yup.string().required("Required"),
  type: yup.string().required("Required"),
  address: yup.string().required("Required"),
  phone: yup.number().max(11).required("Required"),
  cnic: yup.number().max(16).required("Required"),
  email: yup.string().email("Must be an email").required("Required"),
  password: yup.string().required("Required"),
});

const AgentCE = (props: Props) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    //passing the props in the useForm yupResolver
    resolver: yupResolver(SignupSchema),
  });

  const onSubmit = () => {};
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
            name="f_name"
            control={control}
            label="Father name"
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
            name="cnic"
            control={control}
            label="Cnic"
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
          <Button style="btn-secondary" label="Create" type="submit" />
        </div>
      </form>
    </Fragment>
  );
};

export default AgentCE;
