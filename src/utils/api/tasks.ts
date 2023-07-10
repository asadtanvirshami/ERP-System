import axios, { AxiosResponse } from "axios";

async function getAllTasks(CompanyId: string) {
  try {
    const response = await axios
      .get(process.env.NEXT_PUBLIC_ERP_POST_GET_TASK as string, {
        headers: { id: CompanyId },
      })
      .then((r: AxiosResponse) => {
        console.log(r.data.payload, r.data.message);
        if (r.data.message == "success") {
          return { tasks: r.data.payload, users: r.data.users, error: null };
        }
        if (r.data.message == "error") {
          return {
            error: Error("Failed to retrieve tasks"),
            tasks: null,
            users: null,
          };
        }
      });
    return response;
  } catch (e) {
    return { error: "error", tasks: null, users: null };
  }
}
async function CreateNewTask(data: any) {
  try {
    const response = await axios
      .post(process.env.NEXT_PUBLIC_ERP_POST_CREATE_TASK as string, data)
      .then((r: AxiosResponse) => {
        console.log(r.data.payload, r.data.message);
        if (r.data.message == "success") {
          return { task: r.data.payload, error: null };
        }
        if (r.data.message == "error") {
          return { error: Error("Failed to retrieve tasks"), task: null };
        }
      });
    return response;
  } catch (e) {
    return { error: "error", task: null };
  }
}

async function AssignTask(asignee: any, taskId: any, isCheck: string) {
  try {
    const response = await axios
      .post(process.env.NEXT_PUBLIC_ERP_POST_ASSIGN_TASK as string, {
        data: asignee,
        asignees: isCheck,
        taskId: taskId,
      })
      .then((r: AxiosResponse) => {
        console.log(r.data.payload, r.data.message);
        if (r.data.message == "success") {
          return { task: r.data.payload, error: null };
        }
        if (r.data.message == "error") {
          return { error: Error("Failed to retrieve tasks"), task: null };
        }
      });
    return response;
  } catch (e) {
    return { error: "error", task: null };
  }
}

async function UpdateTask(taskId: string, data: any) {
  try {
    const response = await axios
      .post(process.env.NEXT_PUBLIC_ERP_UPDATE_TASK as string, {
        taskId: taskId,
        asignees: data,
      })
      .then((r: AxiosResponse) => {
        console.log(r.data.payload, r.data.message);
        if (r.data.message == "success") {
          return { task: r.data.payload, error: null };
        }
        if (r.data.message == "error") {
          return { error: Error("Failed to retrieve tasks"), task: null };
        }
      });
    return response;
  } catch (e) {
    return { error: "error", task: null };
  }
}

async function DeleteTask(taskId: string, data: any) {
  console.log('Asigness',data)
  try {
    const response = await axios
      .delete(process.env.NEXT_PUBLIC_ERP_POST_DELETE_TASK as string, {
        headers: { id: taskId, asignees: data },
      })
      .then((r: AxiosResponse) => {
        console.log(r.data.payload, r.data.message);
        if (r.data.message == "success") {
          return { payload: r.data.payload, error: null };
        }
        if (r.data.message == "error") {
          return { error: Error("Failed to delete tasks"), payload: null };
        }
      });
    return response;
  } catch (e) {
    return { error: "error", payload: null };
  }
}

export { getAllTasks, CreateNewTask, AssignTask, UpdateTask, DeleteTask };
