import React, { useState, useEffect, Fragment } from "react";
//Interface Imports
import { Agents } from "@/src/interfaces/Agents";
//Component Imports
import Table from "@/src/components/shared/Table";
import TaskCE from "@/src/components/layout/CreateOrEdit/TaskCE";
//Redux
import { useSelector } from "react-redux";
import { getAllTasks, DeleteTask, DeleteUserTask } from "@/src/utils/api/tasks";

type Props = {};

const Index = (props: Props) => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [agents, setAgents] = useState<any[]>([]);

  const userData = useSelector((state: any) => state.user.user);
  const CompanyId = userData.companyId;

  async function GetAllTasks() {
    const Tasks = await getAllTasks(CompanyId);
    if (Tasks) {
      if (Tasks.error == null) {
        setAgents(Tasks.users);
        setTasks(Tasks.tasks);
      } else {
        setAgents([]);
        setTasks([]);
      }
    } else {
      setAgents([]);
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

  const handleDeleteUserTask = async (id: string, taskId:string) => {
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
    try {
      GetAllTasks();
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <div className="">
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
            "Status",
            "End Date",
            "Deadline",
            "Edit",
            "Delete",
            "Assigned To",
          ]}
          data={tasks}
          setData={setTasks}
          modalTitle="Tasks"
          renderModalComponent={
            <TaskCE
              setAgents={setAgents}
              setTasks={setTasks}
              _agents={agents}
              _data={tasks}
            />
          }
          onClick={handleDeleteTask}
          deleteFunc={handleDeleteUserTask}
        />
      </Fragment>
    </div>
  );
};

export default Index;
