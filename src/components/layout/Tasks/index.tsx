import React, { useState, useEffect, Fragment } from "react";
//Interface Imports
import { Agents } from "@/src/interfaces/Agents";
//Component Imports
import Table from "@/src/components/shared/Table";
import TaskCE from "@/src/components/layout/CreateOrEdit/TaskCE";
//Redux
import { useSelector } from "react-redux";
import { getAllTasks, DeleteTask } from "@/src/utils/api/tasks";

type Props = {};

const Index = (props: Props) => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [agents, setAgents] = useState<any[]>([]);

  const userData = useSelector((state: any) => state.user.user);
  const task_data = useSelector((state: any) => state.form.value.values);
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

  const handleDelete = async (id: string) => {
    const tempData = { ...task_data };
    const taskAsignees = []
    const asigneeIds = tempData.asignees
    .map((asignee: any) => asignee.id)
    .filter(Boolean);
    taskAsignees.push(asigneeIds)
    console.log(taskAsignees);
     const deltetedAgent = await DeleteTask(id, asigneeIds);
    // tempData.asignees.forEach((ele, i) => {
    //   console.log("ELEE", ele.id);
    //   asignees.push({
    //     id: ele.id,
    //   });
    // });
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
          onClick={handleDelete}
        />
      </Fragment>
    </div>
  );
};

export default Index;
