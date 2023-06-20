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
import LoadingButton from "../../shared/Buttons/Loading";
//Redux
import { useSelector } from "react-redux";
//BaseValues for Schema
import { tasksBaseValues } from "@/src/utils/baseValues";
//Functions Import
import { checkList } from "@/src/functions/isCheckList";

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
  _agents: Array<any>;
  setData: any;
};

const TaskCE = ({ _data, setData, _agents }: Props) => {
  const [taskId, setTaskId] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const [isCheck, setIsCheck] = useState<any[]>([]);
  const [asignees, setAsignees] = useState<any[]>([]);

  const [proceed, setProceed] = useState<boolean>(false);

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
    if (edit) {
      const tempData = { ...task_data };
      let agentsData = [..._agents];

      if (agentsData.length > 0 && tempData.asignees) {
        const asigneeIds = tempData.asignees
          .map((asignee: any) => asignee.id)
          .filter(Boolean);
        const updatedAgentsArr = [...asigneeIds];

        setIsCheck(updatedAgentsArr);
        setAsignees(agentsData);
      }
      reset(tempData);
    }
    if (!edit) {
      let tempState: any = {};
      const tempData = [..._data];

      tempData.forEach((e, i) => {
        return (tempState = { ...e });
      });
      setAsignees(_agents);
      reset(tasksBaseValues);
    }
  }, [edit]);

  const onSubmit = async (data: any) => {
    const CompanyId = Cookies.get("company");
    const UserId = Cookies.get("loginId");

    if (!proceed) {
      console.log(isCheck, proceed, 'check')
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
          if (r.data.status == "success") {
            setTaskId(r.data.payload.id);
            setMessage(r.data.message);
            setLoading(false);
            setProceed(true);
          }
          if (r.data.status == "error") {
            setLoading(false);
          }
        });
    }

    if (proceed && isCheck.length > 0) {
      // setLoading(true);
      const tempStateList = edit ? _data : _agents;
      const asignees: any = [];
      const tempData: any = [];

      tempStateList.forEach((y: any) => {
        if (isCheck.includes(y.id)) {
          asignees.push({
            id: y.id,
            email: y.email,
          });

          console.log(isCheck, asignees);
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
      await axios
        .post(process.env.NEXT_PUBLIC_ERP_POST_ASSIGN_TASK as string, {
          data: isCheck,
          asignees: asignees,
          taskId: taskId,
        })
        .then((r: AxiosResponse) => {
          setLoading(false);
          if (r.data.status === "success") {
            setMessage(r.data.message);
          }
        })
        .catch(() => {
          setLoading(false);
        });
    }
  };

  return (
    <Fragment>
      {(proceed) && <h1>Select agent to assign task.</h1>}
      {_agents||_data?.length >= 1 ? (
        <>
          {(!proceed) && (
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
                  width="w-30"
                  color="text-gray"
                />

                <SelectType
                  register={register}
                  name="priority"
                  control={control}
                  label="Priority"
                  width="w-30"
                  color="text-gray"
                />

                <DatePicker
                  register={register}
                  name="deadline"
                  control={control}
                  label="Deadline of task"
                  width="w-40"
                  color="text-gray"
                />

                <Input
                  register={register}
                  name="bonus"
                  control={control}
                  label="Bonus"
                  width="w-42"
                  color="text-gray"
                />
              </div>
              <>
                <hr />
              </>
              <div className="mt-5 grid mb-2">
                <p className="text-sm mb-1">
                  Write the job description for the brief understanding of task.
                </p>
                <TextArea
                  register={register}
                  name="description"
                  control={control}
                  label=""
                  width="w-30"
                  placeholder="Write job description"
                  color="text-gray"
                />
              </div>
              <>
                <hr />
              </>
              <div className="mb-3 mt-2">
                {loading ? (
                  <LoadingButton style="btn-secondary" />
                ) : (
                  <Button
                    style="btn-secondary"
                    label={edit ? "Update" : "Create"}
                    type="submit"
                  />
                )}
                <p className="mt-2">{message}</p>
              </div>
            </form>
          )}
        </>
      ) : (
        <div>
          <h1>You cannot create a task until you have agents in your firm.</h1>
        </div>
      )}

      {(proceed) && (
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div className="p-0 min-h-[39px] overflow-y-auto">
            {asignees?.length >= 1 ? (
              <>
                {asignees?.map((item: any, index: number) => (
                  <label
                    key={item.id}
                    htmlFor="vertical-list-react"
                    className="flex items-center w-full cursor-pointer"
                  >
                    <div className="mr-3">
                      <Checkbox
                        id="vertical-list-react"
                        className="hover:before:opacity-0"
                        type="checkbox"
                        onChange={(e) =>
                          checkList(e, item, setIsCheck, isCheck)
                        }
                        checked={isCheck.includes(item.id)}
                      />
                    </div>
                    <p className="text-sm mb-1">{item.email}</p>
                  </label>
                ))}
              </>
            ) : (
              <div>
                <h1>There are no agents to assign a task.</h1>
              </div>
            )}
          </div>
          <hr />
          <div className="mb-3 mt-2">
            {loading ? (
              <LoadingButton style="btn-secondary" />
            ) : (
              <>
                {asignees?.length >= 1 && (
                  <div>
                    <Button
                      style="btn-secondary"
                      label={edit ? "Update" : "Create"}
                      type="submit"
                    />
                    <p className="mt-2">{message}</p>
                  </div>
                )}
              </>
            )}
          </div>
        </form>
      )}
    </Fragment>
  );
};

export default TaskCE;
