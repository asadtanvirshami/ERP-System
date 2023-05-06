import React, { useState, useEffect, Fragment } from "react";
import { useForm } from "react-hook-form";
import axios, { AxiosResponse } from "axios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Cookies from "js-cookie";
import moment from "moment";
//Components Import
import Input from "@/src/components/shared/Form/Input";
import Button from "@/src/components/shared/Buttons/Button";
import TextArea from "@/src/components/shared/Form/TextArea";
import SelectType from "@/src/components/shared/Form/SelectType";
import DatePicker from "@/src/components/shared/Form/DatePicker";

type Props = {};

const SignupSchema = yup.object().shape({
  //Yup schema to set the values
  title: yup.string().required("Required"),
  description: yup.string().required("Required"),
  priority: yup.string().required("Required"),
  deadline: yup.string().required("Required"),
  bonus: yup.string().required("Required"),
});

const TaskCE = (props: Props) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const CompanyId = Cookies.get('company')
    axios.get(process.env.NEXT_PUBLIC_ERP_GET_AGENTS as string, {headers:{id:CompanyId}})
    .then((r:AxiosResponse)=>{
      console.log(r.data)
    })
  }, [])
  

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    //passing the props in the useForm yupResolver
    resolver: yupResolver(SignupSchema),
  });

  const onSubmit = async (data: any) => {
    setLoading(true);

    //formating the date
    let date = data.deadline.split("-");
    const new_format = date[1] + "/" + date[2] + "/" + date[0];

    //setting the values in data object.
    const newData = [{
      ...data,
      startDate: moment().format("L"),
      startTime: moment().format("h:mm:ss a"),
      deadline: new_format,
    }];
    console.log(newData);

    // await axios
    //   .post(process.env.NEXT_PUBLIC_ERP_POST_TASK as string, newData )
    //   .then((r: AxiosResponse) => {
    //     console.log(r.data);
    //   });
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
            name="title"
            control={control}
            label="Title"
            width={"w-30"}
            color={"text-gray"}
          />

          <SelectType
            register={register}
            name="priority"
            control={control}
            label="Priority"
            width={"w-30"}
            color={"text-gray"}
          />

          <DatePicker
            register={register}
            name="deadline"
            control={control}
            label="Deadline of task"
            width={"w-40"}
            color={"text-gray"}
          />

          <Input
            register={register}
            name="bonus"
            control={control}
            label="Bonus"
            width={"w-48"}
            color={"text-gray"}
          />
        </div>
        <div>
          <hr />
        </div>
        <div className="mt-5 grid mb-2">
          <p className="text-sm mb-1">
            Write the job description for the brief understanding of task.
          </p>
          <TextArea
            register={register}
            name="description"
            control={control}
            label=""
            width={"w-30"}
            placeholder={"Write job description"}
            color={"text-gray"}
          />
        </div>
        <div className="mb-3 mt-2">
          <Button style="btn-secondary" label="Create" type={"submit"} />
        </div>
      </form>
    </Fragment>
  );
};

export default TaskCE;
