import axios, { AxiosResponse } from "axios";

async function GetAllTasks(
  CompanyId: string,
  currentPage: number,
  pageSize: number
) {
  try {
    const response = await axios
      .get(process.env.NEXT_PUBLIC_ERP_POST_GET_TASK as string, {
        headers: { id: CompanyId, page: currentPage, limit: pageSize },
      })
      .then((r: AxiosResponse) => {
        console.log(r.data.payload, r.data.message);
        if (r.data.message == "success") {
          return {
            tasks: r.data.payload,
            totalTasks: r.data.totalItems,
            error: null,
          };
        }
        if (r.data.message == "error") {
          return {
            error: Error("Failed to retrieve tasks"),
            tasks: null,
            users: null,
            totalTasks:null
          };
        }
      });
    return response;
  } catch (e) {
    return { error: "error", tasks: null, totalTasks: null };
  }
}

async function CreateNewTask(data: any) {
  try {
    const response = await axios
      .post(process.env.NEXT_PUBLIC_ERP_POST_CREATE_TASK as string, data)
      .then((r: AxiosResponse) => {
        console.log(r.data.payload, r.data.message);
        if (r.data.message == "success") {
          return { task: r.data.taskPayload, error: null, updatePayload:r.data.updatePayload };
        }
        if (r.data.message == "error") {
          return { error: Error("Failed to retrieve tasks"), task: null, updatePayload:null };
        }
      });
    return response;
  } catch (e) {
    return { error: "error", task: null, updatePayload:null };
  }
}

async function AssignTask(
  asignee: any,
  taskId: any,
  isCheck: string,
  companyId: string
) {
  try {
    const response = await axios
      .post(process.env.NEXT_PUBLIC_ERP_POST_ASSIGN_TASK as string, {
        data: asignee,
        asignees: isCheck,
        taskId: taskId,
        companyId: companyId,
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

async function DeleteUserTask(userId: string, taskId: string) {
  try {
    const response = await axios
      .delete(process.env.NEXT_PUBLIC_ERP_DELETE_USER_TASK as string, {
        headers: { id: userId, taskId: taskId },
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
    return { error: "error", task: null };
  }
}

async function UpdateTask( data: any) {
  try {
    const response = await axios
      .post(process.env.NEXT_PUBLIC_ERP_UPDATE_TASK as string, {
        data: data,
      })
      .then((r: AxiosResponse) => {
        console.log(r.data.payload, r.data.message);
        if (r.data.message == "success") {
          return { task: r.data.taskPayload, error: null, updatePayload:r.data.updatePayload, assignedUsers:r.data.assignedUsers };
        }
        if (r.data.message == "error") {
          return { error: Error("Failed to retrieve tasks"), task: null, updatePayload:null,assignedUsers:null   };
        }
      });
    return response;
  } catch (e) {
    return { error: "error", task: null,updatePayload:null,assignedUsers:null };
  }
}

async function DeleteTask(taskId: string) {
  try {
    const response = await axios
      .delete(process.env.NEXT_PUBLIC_ERP_POST_DELETE_TASK as string, {
        headers: { id: taskId },
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

export {
  GetAllTasks,
  CreateNewTask,
  AssignTask,
  UpdateTask,
  DeleteTask,
  DeleteUserTask,
};
