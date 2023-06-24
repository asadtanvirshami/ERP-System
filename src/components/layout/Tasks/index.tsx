import React, { useState, useEffect, Fragment, useCallback } from "react";
import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";
//Interface Imports
import { Agents } from "@/src/interfaces/Agents";
//Component Imports
import Table from "@/src/components/shared/Table";
import TaskCE from "@/src/components/layout/CreateOrEdit/TaskCE";

import { User } from "../User/UserProvider";

type Props = {};

const Index = (props: Props) => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [asignees, setAsignees] = useState<any[]>([]);
  
  const {user:{companyId}} = User()
  const CompanyId = companyId


  const getAllCreatedTasks = useCallback(async () => {
    try {
      await axios.get(process.env.NEXT_PUBLIC_ERP_POST_GET_TASK as string, {
        headers: { id: CompanyId },
      }).then((r: AxiosResponse) => {
        if(r.data.payload && r.data.users){
          const tempArr = [r.data.payload, r.data.users];
          setTasks(r.data.payload);
          setAsignees(tempArr);
        }
      });
  
    } catch (error) {
      // Handle error here
      console.error(error);
    }
  }, [CompanyId, setTasks, setAsignees]);
  
  useEffect(() => {
    if (CompanyId !== undefined) {
      getAllCreatedTasks();
    }
  }, [CompanyId, getAllCreatedTasks]);

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
            "Assigned By",
            "Assigned To",
          ]}
          data={tasks || undefined}
          setData={setTasks}
          modalTitle="Tasks"
          renderModalComponent={<TaskCE setData={setAsignees} _agents={asignees[1]} _data={tasks} />}
          url={process.env.NEXT_PUBLIC_ERP_POST_DELETE_TASK}
        />
      </Fragment>
    </div>
  );
};

export default Index;
