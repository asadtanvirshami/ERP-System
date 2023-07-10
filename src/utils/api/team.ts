import axios, { AxiosResponse } from "axios";

async function GetAllAgents(CompanyId: string) {
  try {
    const response = await axios
      .get(process.env.NEXT_PUBLIC_ERP_GET_AGENTS as string, {
        headers: { id: CompanyId },
      })
      .then((r: AxiosResponse) => {
        console.log(r.data.payload, r.data.message);
        if (r.data.message == "success") {
          return { agents: r.data.payload, error: null };
        }
        if (r.data.message == "error") {
          return { error: Error("Failed to retrieve agents"), agents: null };
        }
      });
    return response;
  } catch (e) {
    return { error: "error", agents: null };
  }
}

async function CreateNewAgent(CompanyId: string, data: any) {
  try {
    const response = await axios
      .post(process.env.NEXT_PUBLIC_ERP_POST_SIGNUP as string, {
        data,
        type: "agent",
        id: CompanyId,
      })
      .then((r: AxiosResponse) => {
        console.log(r.data.payload, r.data.message);
        if (r.data.message == "success") {
          return { agent: r.data.payload, error: null };
        }
        if (r.data.message == "error") {
          return { error: Error("Failed to create agent"), agent: null };
        }
      });
    return response;
  } catch (e) {
    return { error: "error", agent: null };
  }
}

async function UpdateAgent(userId: string, data: any) {
  try {
    const response = await axios
      .post(process.env.NEXT_PUBLIC_ERP_UPDATE_AGENT as string, {
        data,
        type: "agent",
        id: userId,
      })
      .then((r: AxiosResponse) => {
        console.log(r.data.payload, r.data.message);
        if (r.data.message == "success") {
          return { agent: r.data.payload, error: null };
        }
        if (r.data.message == "error") {
          return { error: Error("Failed to create agent"), agent: null };
        }
      });
    return response;
  } catch (e) {
    return { error: "error", agent: null };
  }
}

export { CreateNewAgent, GetAllAgents, UpdateAgent };
