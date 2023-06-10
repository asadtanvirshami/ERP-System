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

  useEffect(() => {
    const CompanyId = Cookies.get("company");
    axios
      .get(process.env.NEXT_PUBLIC_ERP_POST_GET_TASK as string, {
        headers: { id: CompanyId },
      })
      .then((r: AxiosResponse) => {
        // let tempArr = [];
        // for (let i = 0; i < r.data.payload.length; i++) {
        //   tempArr.push({
        //     ...r.data.payload[i].Task,
        //     Asignee: r.data.payload[i].User,
        //   });
        // }
        setTasks(r.data.payload);
      });
  }, []);

  console.log(tasks);

  return (
    <div className="">
      <Fragment>
        <Table
          cols={[
            "Description",
            "Start Time",
            "End Time",
            "Bonus",
            "Priority",
            "Title",
            "Code",
            "Status",
            "End Date",
            "Deadline",
            "Edit",
            "Delete",
            "Assigned By",
          ]}
          data={tasks || undefined}
          setData={setTasks}
          modalTitle="Tasks"
          renderModalComponent={<TaskCE _data={tasks} />}
          url={process.env.NEXT_PUBLIC_ERP_POST_DELETE_TASK}
        />
      </Fragment>
    </div>
  );
};

export default index;
