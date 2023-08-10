import React, { useState, useEffect, Fragment, useCallback } from "react";
//Interface Imports
import { Agents } from "@/src/interfaces/Agents";
//Component Imports
import Table from "@/src/components/shared/Table";
import TaskCE from "@/src/components/layout/CreateOrEdit/TaskCE/TaskCE";
//Redux
import { useSelector } from "react-redux";
import { GetAllTasks, DeleteTask, DeleteUserTask } from "@/src/utils/api/tasks";
import Container from "../../shared/DashboardLayout/PanelSection/Container";

type Props = {};

const Index = (props: Props) => {
  const [tasks, setTasks] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 5;

  const userData = useSelector((state: any) => state.user.user);
  const CompanyId = userData.companyId;

  async function getAllTasks() {
    setLoading(true)
    const Tasks = await GetAllTasks(CompanyId, currentPage, pageSize);
    if (Tasks) {
      if (Tasks.error == null) {
        setTasks(Tasks.tasks);
        setTotalPages(Math.ceil(Tasks.totalTasks / pageSize));
        setLoading(false)
      } else {
        setTasks([]);
      }
    } else {
      setTasks([]);
    }
  }

  const handleDeleteTask = async (id: string) => {
    const deltetedTask = await DeleteTask(id);
    if (deltetedTask?.error == null) {
      const newData = tasks?.filter((item: any) => item.id !== id);
      setTasks(newData);
    }
  };

  const handleDeleteUserTask = async (id: string, taskId: string) => {
    const tempData: any[] = [...tasks];
    const deletedUserTask = await DeleteUserTask(id, taskId);
    if (deletedUserTask?.error == null) {
      const i = tasks.findIndex((item) => item.id === taskId);
      if (i !== -1) {
        const updatedAsignees = tempData[i].asignees.filter(
          (x: any) => x.id !== id
        );
        const updatedTask = { ...tempData[i], asignees: updatedAsignees };
        tempData[i] = updatedTask;
        setTasks(tempData);
      }
    } else {
      return null;
    }
  };

  useEffect(() => {
    getAllTasks();
  }, [currentPage]);

  return (
    <Container>
      <Fragment>
        <Table
          cols={[
            "No.",
            "Description",
            "Start Time",
            "End Time",
            "Bonus",
            "Priority",
            "Title",
            "Code",
            "Status",
            "Start Date",
            "End Date",
            "Deadline",
            "Edit",
            "Delete",
            "Assigned To",
          ]}
          loading={loading}
          modalTitle="Tasks"
          modalSize={'lg'}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          data={tasks}
          setData={setTasks}
          totalPages={totalPages}
          renderModalComponent={<TaskCE setTasks={setTasks} _data={tasks} />}
          onClick={handleDeleteTask}
          deleteFunc={handleDeleteUserTask}
        />
      </Fragment>
    </Container>
  );
};

export default Index;
