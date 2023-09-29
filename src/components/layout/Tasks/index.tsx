import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { Tasks } from "@/src/interfaces/Tasks";
import Table from "@/src/components/shared/Table";
import TaskCE from "@/src/components/layout/CreateOrEdit/TaskCE/TaskCE";
import Container from "../../shared/DashboardLayout/PanelSection/Container";
import { useSelector } from "react-redux";
import { GetAllTasks, DeleteTask, DeleteUserTask } from "@/src/utils/api/tasks";

type Props = {
  sessionData:any
};

const Index = ({ sessionData }: Props) => {
  const [tasks, setTasks] = useState<Tasks[]>([]);
  const [options, setOptions] = useState<any>({
    status: [],
    services: [],
    sources: [],
    designation: [],
  });
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 5;

  const userData = useSelector((state: any) => state.user.user);
  const CompanyId = userData.companyId;

  useEffect(() => {
    async function fetchData() {
      await getOptions();
      await getAllTasks();
    }
    fetchData();
  }, [currentPage]);

  async function getAllTasks() {
    setLoading(true);
    const TasksResponse = await GetAllTasks(CompanyId, currentPage, pageSize);
    if (TasksResponse?.error == null) {
      setTasks(TasksResponse?.tasks);
      setTotalPages(Math.ceil(TasksResponse?.totalTasks / pageSize));
    } else {
      setTasks([]);
    }
    setLoading(false);
  }

  async function getOptions() {
    try {
      const response: AxiosResponse = await axios.get(process.env.NEXT_PUBLIC_ERP_GET_OPTIONS as string);
      const { status, services, sources, designation } = response.data[0];
      setOptions({ status, services, sources, designation });
    } catch (error) {
      console.error("Failed to fetch options:", error);
    }
  }

  const handleDeleteTask = async (id: string) => {
    const deletedTask = await DeleteTask(id);
    if (deletedTask?.error == null) {
      setTasks(prevTasks => prevTasks.filter(item => item.id !== id));
    }
  };

  const handleDeleteUserTask = async (id: string, taskId: string) => {
    const deletedUserTask = await DeleteUserTask(id, taskId);
    if (deletedUserTask?.error == null) {
      setTasks(prevTasks => {
        const updatedTasks = [...prevTasks];
        const taskIndex = updatedTasks.findIndex(task => task.id === taskId);
        if (taskIndex !== -1) {
          updatedTasks[taskIndex].asignees = updatedTasks[taskIndex].asignees.filter((asignee:any) => asignee.id !== id);
        }
        return updatedTasks;
      });
    }
  };

  return (
    <Container>
      <Table
        cols={[
          //...columns
        ]}
        loading={loading}
        modalTitle="Tasks"
        modalSize={'lg'}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        data={tasks}
        setData={setTasks}
        totalPages={totalPages}
        renderModalComponent={<TaskCE options={options} setTasks={setTasks} _data={tasks} />}
        onClick={handleDeleteTask}
        deleteFunc={handleDeleteUserTask}
      />
    </Container>
  );
};

const TasksHOC = React.memo(Index);
export default TasksHOC;
