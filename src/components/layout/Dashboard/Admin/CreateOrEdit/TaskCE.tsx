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
  description: yup.string().required("Required"),
  type: yup.string().required("Required"),
  priority: yup.string().required("Required"),
  assignedTo: yup.string().required("Required"),
});

const TaskCE = (props: Props) => {
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
            name="description"
            control={control}
            label="Description"
            width={"w-30"}
            color={"text-gray"}
          />
          <Input
            register={register}
            name="assignedTo"
            control={control}
            label="Assigned To"
            width={"w-30"}
            color={"text-gray"}
          />
          <Input
            register={register}
            name="priority"
            control={control}
            label="Priority"
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

export default TaskCE;
