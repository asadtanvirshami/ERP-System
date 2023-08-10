import React, { useState, useEffect, Fragment } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";
//Interface Imports
import { Agents } from "@/src/interfaces/Agents";
//Components Imports
import { Button } from "@material-tailwind/react";
import Input from "@/src/components/shared/Form/Input";
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
import { User } from "../../User/UserProvider";
//Utils
import { CreateNewTask, AssignTask, UpdateTask } from "@/src/utils/api/tasks";
import { GetAllAgents } from "@/src/utils/api/team";

const SignupSchema = yup.object().shape({
  //Yup schema to set the values
  title: yup.string().required("Required"),
  description: yup.string().required("Required"),
  status: yup.string().required("Required"),
  deadline: yup.string().required("Required"),
  project_length: yup.string().required("Required"),
});

type Props = {
  _data: Array<any>;
  setData: any;
};

const ProjectCE = ({ _data, setData }: Props) => {
  const [projectId, setProjectId] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [loadingData, setLoadingData] = useState<boolean>(false);

  const [isCheck, setIsCheck] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);

  const [totalUsers, setTotalUsers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // Number of users to show per page

  const [proceed, setProceed] = useState<boolean>(true);

  //Redux Selectors
  const edit = useSelector((state: any) => state.form.value.edit);
  const openState = useSelector((state: any) => state.form.value.open);
  const project_data = useSelector((state: any) => state.form.value.values);
  const user_data = useSelector((state: any) => state.user.user);

  const {
    user: { companyId: userCompanyId },
  } = User();
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
    defaultValues: project_data,
  });

  const fetchUsers = async () => {
    setLoadingData(true);
    const Users = await GetAllAgents(companyId, currentPage, pageSize);
    if (Users) {
      if (Users.error == null) {
        const newUsers = users.concat(Users.agents);
        setUsers(newUsers);
        setTotalUsers(Users.totalItems);
        setLoadingData(false);
      } else {
        setLoadingData(false);
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  useEffect(() => {
    if (edit) {
      setProjectId(project_data.id);
      openState && edit ? setProceed(true) : setProceed(false);
      const tempData = { ...project_data };
      let agentsData: any = [];

      if (project_data && tempData.asignees) {
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
    if (!proceed) {
      setLoading(true);
      //setting the data object
      const newData = {
        ...data,
        startDate: moment().format("L"),
        startTime: moment().format("h:mm:ss a"),
        deadline: data.deadline,
        userId: user_data.loginId,
        companyId: user_data.companyId,
      };
      const createdProject = await CreateNewTask(newData);
      console.log(createdProject);
      if (createdProject) {
        if (createdProject.error == null) {
          setMessage("Project created successfully.");
          setLoading(false);
          setProceed(true);
          setProjectId(createdProject.task.id);
          let tempArr = [..._data, createdProject.task];
          return setData ? setData(tempArr) : null;
        } else {
          return (
            setProceed(false),
            setLoading(true),
            setMessage("Project not created")
          );
        }
      } else {
        setProceed(false),
          setLoading(true),
          setMessage("Error occured please wait.");
      }
    }
    if (proceed) {
      setLoading(true);
      const tempStateList = users;
      const asignees: any = [];

      tempStateList.forEach((y: any) => {
        if (isCheck.includes(y.id)) {
          asignees.push({
            id: y.id,
            email: y.email,
            projectId: projectId,
          });
        }
      });

      const assignedProject = await AssignTask(
        isCheck,
        projectId,
        asignees,
        user_data.companyId
      );
      setLoading(true);

      if (assignedProject) {
        if (assignedProject.error == null) {
          setLoading(false);
          const tempState: Array<any> = [..._data];
          const i = tempState.findIndex((item) => item.id === projectId);
          if (i !== -1) {
            console.log(tempState[i].asignees);
            const updatedItem = { ...tempState[i], asignees };
            tempState[i] = updatedItem;
            return setData ? setData(tempState) : null;
          }
          setMessage("Project assigned successfully.");
        } else {
          setMessage("Project not assigned.");
          setLoading(true);
        }
      } else {
        setMessage("Error occurred please wait.");
        setLoading(true);
      }
    }
  };

  const onEdit = async (data: any) => {
    if (!proceed) {
      setLoading(true);
      //setting the data object
      const newData = {
        ...data,
        startDate: moment().format("L"),
        startTime: moment().format("h:mm:ss a"),
        deadline: data.deadline,
        userId: user_data.id,
        companyId: user_data.companyId,
      };

      const updatedProject = await UpdateTask(project_data.id, newData);
      if (updatedProject) {
        if (updatedProject.error == null) {
          setMessage("Project updated successfully.");
          const tempState: Array<any> = [..._data];
          const i = tempState.findIndex((item) => item.id === project_data.id);
          if (i !== -1) {
            tempState[i] = data;
            setLoading(false);
            return setData(tempState);
          }
          setProceed(true);
        } else {
          setMessage("Project not created");
          setLoading(true);
          setProceed(false);
        }
      } else {
        setMessage("Error occured please wait.");
        setLoading(true);
        setProceed(false);
      }
    }
    if (proceed) {
      setLoading(true);
      const tempStateList = users;
      const asignees: any = [];

      tempStateList.forEach((y: any) => {
        if (isCheck.includes(y.id)) {
          asignees.push({
            id: y.id,
            email: y.email,
            projectId: projectId,
          });
        }
      });

      const assignedTask = await AssignTask(
        isCheck,
        projectId,
        asignees,
        user_data.companyId
      );

      if (assignedTask) {
        if (assignedTask.error == null) {
          const tempState: Array<any> = [..._data];
          const i = tempState.findIndex((item) => item.id === projectId);
          if (i !== -1) {
            const updatedItem = { ...tempState[i], asignees };
            tempState[i] = updatedItem;
            setData ? setData(tempState) : null;
          }
          setMessage("Task assigned successfully.");
          setLoading(false);
        } else {
          setMessage("Task not assigned.");
          setLoading(true);
        }
      } else {
        setMessage("Error occurred please wait.");
        setLoading(true);
      }
    }
  };

  return (
    <Fragment>
      {/* {proceed && <h1>Select agent to assign task.</h1>} */}
      <div className="flex flex-wrap">
        <div className="w-full lg:w-1/2 p-1 border-r">
          {/* Content for the left column */}
          <div className="w-full lg:w-full mx-auto px-4">
            <form
              className="w-auto mx-auto lg:w-full justify-center grid"
              onSubmit={handleSubmit(edit == true ? onEdit : onSubmit)}
              >
              <h1  className="mt-4">Create project to assign agents.</h1>
              <div className="grid grid-cols-2 items-center gap-4 mb-2 mt-4">
                <Input
                  register={register}
                  name="title"
                  control={control}
                  label="Title"
                  width="w-30"
                  color="text-gray"
                  placeholder="Market-place project"
                />

                <SelectType
                  register={register}
                  name="status"
                  control={control}
                  label="Status"
                  width="w-30"
                  color="text-gray"
                />

                <DatePicker
                  register={register}
                  name="deadline"
                  control={control}
                  label="Deadline of project"
                  width="w-40"
                  color="text-gray"
                />

                <Input
                  register={register}
                  name="project_length"
                  control={control}
                  label="Project Length"
                  width="w-42"
                  color="text-gray"
                  placeholder="1 to 3 months"
                />
              </div>
              <>
                <hr />
              </>
              <div className="mt-5 grid mb-2">
                <p className="text-sm mb-1">
                  Write the job description for the brief understanding of project.
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
                  <LoadingButton style="bg-red-500 text-white py-1.5 px-5 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300" />
                ) : (
                  <Button
                  ripple={false}
                  className="bg-red-500 text-white py-1.5 px-5 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
                  type="submit"
                  size="md"
                >
                  {edit ? "Update" : "Create"}
                </Button>
                )}
                <p className="mt-2">{message}</p>
              </div>
            </form>
          </div>
        </div>
      <div className="w-full lg:w-1/2 p-4">
        <h1  className="m-2">Assign agents to this project.</h1>
        <hr className="m-2"></hr>
          <form onSubmit={handleSubmit(edit == true ? onEdit : onSubmit)}>
            <TaskAssign
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              Loading={loadingData}
              isCheck={isCheck}
              setIsCheck={setIsCheck}
              edit={edit}
              users={users}
              loading={loading}
              message={message}
              totalUsers={totalUsers}
              checkList={checkList}
              disabled={proceed}
            />
          </form>
      </div>
      </div>
    </Fragment>
  );
};

export default ProjectCE;
