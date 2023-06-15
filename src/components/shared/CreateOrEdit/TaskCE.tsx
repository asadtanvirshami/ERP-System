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
import LoadingButton from "../Buttons/Loading";
//Redux
import { useSelector } from "react-redux";
//BaseValues for Schema
import { tasksBaseValues } from "@/src/utils/baseValues";
import Tabs from "../Tabs";

const SignupSchema = yup.object().shape({
  //Yup schema to set the values
  title: yup.string().required("Required"),
  description: yup.string().required("Required"),
  priority: yup.string().required("Required"),
  deadline: yup.string().required("Required"),
  bonus: yup.string().required("Required"),
});

type Props = {
  _data: Array<any>;
  setData: any
};

const TaskCE = ({ _data, setData }: Props) => {
  const [taskId, setTaskId] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const [isCheck, setIsCheck] = useState<any[]>([]);

  const [active, setActive] = useState<number>(0);

  //Redux Selectors
  const edit = useSelector((state: any) => state.form.value.edit);
  const task_data = useSelector((state: any) => state.form.value.values);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    //passing the props in the useForm yupResolver
    resolver: yupResolver(SignupSchema),
    defaultValues: task_data,
  });

  useEffect(() => {
    let tempState: any = {};
    let agentsArr: any = [];
    const tempData = [..._data[0]];
    let agentsData = [..._data[1]];

    tempData.forEach((e, i) => {
      return (tempState = { ...e });
    });

    if (_data[1].length > 0) {
      agentsData.forEach((ele, inx) => {
        agentsArr.push({ ...ele, check: false });
        tempData.forEach((e: any, index: number) => {
          for (let i = 0; i < e.asignees?.length; i++) {
            agentsArr.push(e.asignees[i].id);
          }
        });
      });
      return setIsCheck(agentsArr);
    }

    reset(tempState);
    if (edit == false) {
      reset(tasksBaseValues);
    }
  }, [edit]);

  const handleClick = (e: any, data: any) => {
    const { checked } = e.target;
    setIsCheck([...isCheck, data.id]);
    if (!checked) {
      const unChecked = isCheck.filter((x) => x !== data.id);
      setIsCheck(unChecked);
    }
  };

  const onSubmit = async (data: any) => {
    const CompanyId = Cookies.get("company");
    const UserId = Cookies.get("loginId");

    if (active == 0) {
      setLoading(true);
      //setting the data object
      const newData = {
        ...data,
        startDate: moment().format("L"),
        startTime: moment().format("h:mm:ss a"),
        deadline: data.deadline,
        userId: UserId,
        companyId: CompanyId,
      };
      await axios
        .post(process.env.NEXT_PUBLIC_ERP_POST_CREATE_TASK as string, newData)
        .then((r: AxiosResponse) => {
          console.log(r.data);
          if (r.data.status == "success") {
            setTaskId(r.data.payload.id);
            setMessage(r.data.message);
            setLoading(false);
            setActive(1);
          }
          if (r.data.status == "error") {
            setLoading(false);
          }
        });
    }

    if (active == 1 && isCheck.length > 0) {
      setLoading(true);
      //creating new Array
      const tempStateIsCheck = [...isCheck];
      const tempStateList = [..._data[0]];

      let asignees: any = [];
      const tempData: any = [];

      tempStateIsCheck.forEach((x, indexone) => {
        tempStateList.forEach((y: any, index) => {
          if (x === y.id) {
            asignees.push({
              id: y.id,
              email: y.email,
            });
            tempData.push({
              ...data,
              startDate: moment().format("L"),
              startTime: moment().format("h:mm:ss a"),
              deadline: data.date,
              userId: y.id,
              companyId: CompanyId,
              taskId: taskId,
            });
          }
        });
      });
      console.log(tempData);
      await axios
        .post(process.env.NEXT_PUBLIC_ERP_POST_ASSIGN_TASK as string, {
          data: tempData,
          asignees: asignees,
          taskId: taskId,
        })
        .then((r: AxiosResponse) => {
          console.log(r.data);
          if (r.data.status == "success") {
            setMessage(r.data.message);
            setLoading(false);
          }
          if (r.data.status == "error") {
            setLoading(false);
          }
        });
    }
  };

  const onEdit = async (data: any) => {
    const CompanyId = Cookies.get("company");
    const UserId = Cookies.get("loginId");

    if (active == 0) {
      setLoading(true);
      //setting the data object
      const newData = {
        ...data,
        startDate: moment().format("L"),
        startTime: moment().format("h:mm:ss a"),
        deadline: data.deadline,
        userId: UserId,
        companyId: CompanyId,
      };
      await axios
        .post(process.env.NEXT_PUBLIC_ERP_POST_CREATE_TASK as string, newData)
        .then((r: AxiosResponse) => {
          console.log(r.data);
          if (r.data.status == "success") {
            setTaskId(r.data.payload.id);
            setMessage(r.data.message);
            setLoading(false);
            setActive(1);
          }
          if (r.data.status == "error") {
            setLoading(false);
          }
        });
    }

    if (active == 1 && isCheck.length > 0) {
      setLoading(true);
      //creating new Array
      const tempStateIsCheck = [...isCheck];
      const tempStateList = [..._data[0]];

      let asignees: any = [];
      const tempData: any = [];

      tempStateIsCheck.forEach((x, indexone) => {
        tempStateList.forEach((y: any, index) => {
          if (x === y.id) {
            asignees.push({
              id: y.id,
              email: y.email,
            });
            tempData.push({
              ...data,
              startDate: moment().format("L"),
              startTime: moment().format("h:mm:ss a"),
              deadline: data.date,
              userId: y.id,
              companyId: CompanyId,
              taskId: taskId,
            });
          }
        });
      });

      await axios
        .post(process.env.NEXT_PUBLIC_ERP_POST_ASSIGN_TASK as string, {
          data: tempData,
          asignees: asignees,
          taskId: taskId,
        })
        .then((r: AxiosResponse) => {
          console.log(r.data);
          if (r.data.status == "success") {
            setMessage(r.data.message);
            setLoading(false);
            const tempState: Array<any> = [..._data[0]];
            tempState.forEach((ele, i) => {
              for(let i = 0; i < tempState.length; i++){
              tempStateIsCheck.forEach((x, indexone) => {
                const i = tempState.findIndex((item) => item.id === x.id);
                if (i !== -1) {
                  tempState[i] = data;
                  return setData(tempState);
                }
              });
            }
            });
          }
          if (r.data.status == "error") {
            setLoading(false);
          }
        });
    }
  };

  const tabs = [
    { title: "Task", val: 0 },
    { title: "Asignees", val: 1 },
  ];

  return (
    <Fragment>
      <div className=" text-center items-center align-middle mx-auto grid grid-cols-2">
        {tabs.map((ele, i) => {
          return (
            <div key={ele.val} className="">
              <Tabs
                activeTab={active}
                title={ele.title}
                val={ele.val}
                onClick={() => {
                  setActive(ele.val);
                }}
              />
            </div>
          );
        })}
      </div>
      {active == 1 && (
        <div>
          <h1>Select agent to assign task.</h1>
        </div>
      )}
      {_data[0]?.length >= 1 ? (
        <>
          {active == 0 && (
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
                  width={"w-42"}
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
                {loading ? (
                  <LoadingButton style="btn-secondary" />
                ) : (
                  <Button
                    style="btn-secondary"
                    label="Create"
                    type={"submit"}
                  />
                )}
                <p className="mt-2">{message}</p>
              </div>
            </form>
          )}

          {active == 1 && (
            <form onSubmit={handleSubmit(onSubmit)} className="">
              <div className="p-0 min-h-[39px] overflow-y-auto">
                {_data[1]?.length >= 1 ? (
                  <Fragment>
                    {_data[1]?.map((item: any, index: number) => {
                      return (
                        <>
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
                        </>
                      );
                    })}
                  </Fragment>
                ) : (
                  <div>
                    <h1>There are no agents to assign task.</h1>
                  </div>
                )}
              </div>
              <hr />
              <div className="mb-3 mt-2">
                {loading ? (
                  <LoadingButton style="btn-secondary" />
                ) : (
                  <Fragment>
                    {_data[1]?.length >= 1 && (
                      <div>
                        <Button
                          style="btn-secondary"
                          label="Create"
                          type={"submit"}
                        />
                        <p className="mt-2">{message}</p>
                      </div>
                    )}
                  </Fragment>
                )}
              </div>
            </form>
          )}
        </>
      ) : (
        <>
          <div>
            <h1>You cannot create task until you have agents in your firm.</h1>
          </div>
        </>
      )}
    </Fragment>
  );
};

export default TaskCE;
