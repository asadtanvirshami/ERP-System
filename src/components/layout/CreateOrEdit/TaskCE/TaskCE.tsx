import React, { useState, useEffect, Fragment } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
//Components Imports
import Input from "@/src/components/shared/Form/Input";
import Button from "@/src/components/shared/Buttons/Button";
import TextArea from "@/src/components/shared/Form/TextArea";
import SelectType from "@/src/components/shared/Form/SelectType";
import DatePicker from "@/src/components/shared/Form/DatePicker";
import LoadingButton from "../../../shared/Buttons/Loading";
import TaskAssign from "../Assign/TaskAssign";
//Redux
import { useSelector } from "react-redux";
//BaseValues for Schema
import { tasksBaseValues } from "@/src/utils/baseValues";
//Functions Import
import { checkList } from "@/src/functions/isCheckList";
//Provider
import { useUser } from "../../User/UserProvider";
//Utils
import { CreateNewTask, UpdateTask } from "@/src/utils/api/tasks";
import { GetAllAgents } from "@/src/utils/api/team";
import { Agents } from "@/src/interfaces/Agents";

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
  setTasks: any;
  options: any;
};

const TaskCE = ({ _data, setTasks, options }: Props) => {
  const [taskId, setTaskId] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [isCheck, setIsCheck] = useState<any[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4; // Number of users to show per page

  const [proceed, setProceed] = useState<boolean>(false);

  //Redux Selectors
  const edit = useSelector((state: any) => state.form.value.edit);
  const openState = useSelector((state: any) => state.form.value.open);
  const task_data = useSelector((state: any) => state.form.value.values);
  const user_data = useSelector((state: any) => state.user.user);

  const {
    user: { companyId: userCompanyId },
  } = useUser();
  const companyId = userCompanyId;

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

  const fetchUsers = async (
    companyId: any,
    currentPage: any,
    pageSize: any
  ) => {
    const Users = await GetAllAgents(companyId, currentPage, pageSize);
    if (Users?.error == null) {
      return Users?.agents;
    } else {
      throw new Error("Error"); // Handle error using React Query's error handling
    }
  };

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ["users", companyId],
    ({ pageParam = 1 }) => fetchUsers(companyId, pageParam, pageSize),
    {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.length < pageSize) {
          // Indicates no more pages to fetch
          return undefined;
        }
        return allPages.length + 1; // Increment page number
      },
    }
  );

  useEffect(() => {
    const pages: any = data?.pages.flatMap((x) => x);
    setUsers(pages);
  }, [data]);

  useEffect(() => {
    if (edit) {
      setTaskId(task_data.id);
      openState && edit ? setProceed(true) : setProceed(false);
      const tempData = { ...task_data };
      let agentsData: any = [];

      if (task_data && tempData.asignees) {
        const asigneeIds = tempData.asignees
          .map((asignee: any) => asignee.id)
          .filter(Boolean);
        const updatedAgentsArr = [...asigneeIds];

        users.forEach((ele, inx) => {
          agentsData.push({ ...ele, check: false });
          tempData.asignees.forEach((e: any, i: number) => {
            if (ele.id == e.id) {
              agentsData[inx].check = true;
            }
          });
        });
        setIsCheck(updatedAgentsArr);
      }
      reset(tempData);
    }
    if (!edit) {
      let tempState: any = {};
      const tempData = [..._data];
      tempData.forEach((e, i) => {
        return (tempState = { ...e });
      });
      reset(tasksBaseValues);
    }
  }, [edit]);

  const onSubmit = async (data: any) => {
    setLoading(true);
    const tempStateList = users;
    const asignees: any = [];

    tempStateList.forEach((y: any) => {
      if (isCheck.includes(y.id)) {
        asignees.push({
          id: y.id,
          email: y.email,
        });
      }
    });

    const newData = {
      ...data,
      startDate: moment().format("L"),
      startTime: moment().format("h:mm:ss a"),
      deadline: data.deadline,
      userId: user_data.loginId,
      companyId: user_data.companyId,
      isCheck: isCheck,
      asignees: asignees,
    };

    const createdTask = await CreateNewTask(newData);
    if (createdTask) {
      if (createdTask.error == null) {
        setMessage("Task created successfully.");
        setLoading(false);

        let tempArr = [..._data, createdTask.task];
        const tempState: Array<any> = [..._data];
        const i = tempState.findIndex((item) => item.id === taskId);
        return setTasks ? setTasks(tempArr) : null;
      } else {
        return setLoading(true), setMessage("Task not created");
      }
    } else {
      setLoading(true), setMessage("Error occured please wait.");
    }
  };

  const onEdit = async (data: any) => {
    setLoading(true);
    const tempStateList = users;
    const asignees: any = [];
    console.log(tempStateList, "puss");
    tempStateList.forEach((y: any) => {
      if (isCheck.includes(y.id)) {
        asignees.push({
          id: y.id,
          email: y.email,
        });
      }
    });

    const newData = {
      ...data,
      startDate: moment().format("L"),
      startTime: moment().format("h:mm:ss a"),
      deadline: data.deadline,
      userId: user_data.loginId,
      companyId: user_data.companyId,
      isCheck: isCheck,
      asignees: asignees,
    };
    console.log(newData, "New");

    const updatedTask = await UpdateTask(newData);
    console.log(updatedTask?.assignedUsers);
    if (updatedTask) {
      if (updatedTask.error == null) {
        setMessage("Task created successfully.");
        setLoading(false);

        let tempArr = [..._data, updatedTask.task];
        const tempState: Array<any> = [..._data];
        const i = tempState.findIndex((item) => item.id === task_data.id);
        if (i !== -1) {
          tempState[i] = { ...data, asignees: asignees };
          setLoading(false);
          return setTasks(tempState);
        }
        return setTasks ? setTasks(tempArr) : null;
      } else {
        return setLoading(true), setMessage("Task not created");
      }
    } else {
      setLoading(true), setMessage("Error occured please wait.");
    }
  };

  return (
    <Fragment>
      {proceed && <h1>Select agent to assign task.</h1>}

      <div className="flex flex-wrap">
        <div className="w-full lg:w-1/2 p-1 border-r">
          <form
            className="w-auto mx-auto lg:w-full justify-center grid"
            onSubmit={handleSubmit(edit == true ? onEdit : onSubmit)}
          >
            <div className="grid grid-cols-2 items-center gap-4 mb-2 ">
              <Input
                register={register}
                name="title"
                control={control}
                label="Title"
                width={"w-full"}
                color="text-gray"
                placeholder="10 Leads"
              />

              <SelectType
                options={options.status}
                register={register}
                name="priority"
                control={control}
                label="Priority"
                width={"w-full"}
                color="text-gray"
              />

              <DatePicker
                register={register}
                name="deadline"
                control={control}
                label="Deadline of task"
                width={"w-full"}
                color="text-gray"
              />

              <Input
                register={register}
                name="bonus"
                control={control}
                label="Bonus"
                width={"w-full"}
                color="text-gray"
                placeholder="10%"
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
                width={"w-full"}
                placeholder="Write job description"
                color="text-gray"
              />
            </div>
            <>
              <hr />
            </>
            <div className="mb-3 mt-5">
              {loading ? (
                <LoadingButton style="bg-red-500 text-white py-1.5 px-5 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300" />
              ) : (
                <Button
                  style="bg-red-500 text-white py-1.5 px-5 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
                  label={edit ? "Update" : "Create"}
                  type="submit"
                />
              )}
              <p className="mt-2">{message}</p>
            </div>
          </form>
        </div>
        <div className="w-full lg:w-1/2 p-1 border-r">
          <form onSubmit={handleSubmit(edit == true ? onEdit : onSubmit)}>
            <TaskAssign
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              isCheck={isCheck}
              setIsCheck={setIsCheck}
              edit={edit}
              isFetchingNextPage={isFetchingNextPage}
              users={data?.pages}
              loading={isLoading}
              fetchNextPage={fetchNextPage}
              message={message}
              hasNextPage={hasNextPage}
              checkList={checkList}
            />
          </form>
        </div>
      </div>
    </Fragment>
  );
};
const TaskHOC = React.memo(TaskCE);
export default TaskHOC;
