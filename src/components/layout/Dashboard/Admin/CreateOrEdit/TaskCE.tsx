import React, { useState, useEffect, Fragment } from "react";
import { useForm } from "react-hook-form";
import axios, { AxiosResponse } from "axios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Cookies from "js-cookie";
import moment from "moment";
//Material Tailwind Import
import { Checkbox } from "@material-tailwind/react";
//Interface Imports
import { Agents } from "@/src/interfaces/Agents";
//Components Imports
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
  const [loading, setLoading] = useState<boolean>(false);
  const [proceed, setProceed] = useState<boolean>(false);

  const [agents, setAgents] = useState<Agents[]>([]);
  const [isCheck, setIsCheck] = useState<any[]>([]);

  useEffect(() => {
    const CompanyId = Cookies.get("company");
    axios
      .get(process.env.NEXT_PUBLIC_ERP_GET_AGENTS as string, {
        headers: { id: CompanyId },
      })
      .then((r: AxiosResponse) => {
        console.log(r.data.payload);
        setAgents(r.data.payload);
      });
  }, []);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    //passing the props in the useForm yupResolver
    resolver: yupResolver(SignupSchema),
  });

  const handleClick = (e: any, data: any) => {
    const { checked } = e.target;
    setIsCheck([...isCheck, data.id]);
    if (!checked) {
      const unChecked = isCheck.filter((x) => x !== data.id);
      setIsCheck(unChecked);
    }
  };

  const onSubmit = async (data: any) => {
    setLoading(true);
    const CompanyId = Cookies.get("company");
    //formating the date
    let date = data.deadline.split("-");
    const new_format = date[1] + "/" + date[2] + "/" + date[0];
    const tempStateIsCheck = [...isCheck]
    const tempStateList = [...agents]
    const tempData:any = []
    tempStateIsCheck.forEach((x,indexone)=>{
      tempStateList.forEach((y:any,index)=>{
        if(x === y.id){
         tempData.push({
          ...data,
          startDate: moment().format("L"),
          startTime: moment().format("h:mm:ss a"),
          deadline: new_format,
          userId: y.id,
          companyId:CompanyId
         })
      }})
    })
    console.log(tempData)

    if (!proceed) {
      setProceed(true);
    }
    if (proceed && isCheck.length > 0) {
      await axios
        .post(process.env.NEXT_PUBLIC_ERP_POST_TASK as string, tempData)
        .then((r: AxiosResponse) => {
          console.log(r.data);
        });
    }
  };

  return (
    <Fragment>
      {!proceed && (
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
      )}
      {proceed && (
        <Fragment>
          <div>
            <h1>Select agent to assign task.</h1>
          </div>
          <form  onSubmit={handleSubmit(onSubmit)}>
            {agents.map((item: Agents, index) => {
              return (
                <>
                  <div className="p-0">
                    <label
                      htmlFor="vertical-list-react"
                      className="flex items-center w-full cursor-pointer"
                    >
                      <div className="mr-3">
                        <Checkbox
                          id="vertical-list-react"
                          className="hover:before:opacity-0"
                          type="checkbox"
                          onChange={(e) => handleClick(e, item)}
                          checked={isCheck.includes(item.id)}
                        />
                      </div>
                      <p className="text-sm mb-1">
                        {item.name} {item.designation}
                      </p>
                    </label>
                  </div>
                </>
              );
            })}
               <div className="mb-3 mt-2">
            <Button style="btn-secondary" label="Create" type={"submit"} />
          </div>
          </form>
        </Fragment>
      )}
    </Fragment>
  );
};

export default TaskCE;
