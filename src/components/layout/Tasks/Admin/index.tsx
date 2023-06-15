import React, { useState, useEffect, Fragment } from "react";
import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";
//Interface Imports
import { Agents } from "@/src/interfaces/Agents";
//Component Imports
import Table from "@/src/components/shared/Table";
import TaskCE from "@/src/components/shared/CreateOrEdit/TaskCE";

type Props = {};

const index = (props: Props) => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [asignees, setAsignees] = useState<any[]>([]);

  useEffect(() => {
    const CompanyId = Cookies.get("company");
    axios
      .get(process.env.NEXT_PUBLIC_ERP_POST_GET_TASK as string, {
        headers: { id: CompanyId },
      })
      .then((r: AxiosResponse) => {
        let tempArr = [];
        tempArr.push(r.data.payload, r.data.users)
        setTasks(r.data.payload);
        setAsignees(tempArr)
      });
  }, []);

  console.log(tasks);

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
          renderModalComponent={<TaskCE setData={setAsignees} _data={asignees} />}
          url={process.env.NEXT_PUBLIC_ERP_POST_DELETE_TASK}
        />
      </Fragment>
    </div>
  );
};

export default index;
