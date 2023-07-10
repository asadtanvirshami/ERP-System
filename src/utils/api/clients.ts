import axios, { AxiosResponse } from "axios";

async function getClientsData(CompanyId: string) {
  try {
    const response = await axios
      .get(process.env.NEXT_PUBLIC_ERP_GET_CLIENT as string, {
        headers: { id: CompanyId },
      })
      .then((r: AxiosResponse) => {
        console.log(r.data.payload, r.data.message);
        if (r.data.message == "success") {
          return { clients: r.data.payload, error: null };
        }
        if (r.data.message == "error") {
          return { error: Error("Failed to retrieve agents"), clients: null };
        }
      });
    return response;
  } catch (e) {
    return { error: "error", clients: null };
  }
}

async function UpdateClient(CompanyId: string, data: any) {
    try {
      const response = await axios
        .post(process.env.NEXT_PUBLIC_ERP_UPDATE_CLIENT as string, {
          data,
          type: "agent",
          id: CompanyId,
        })
        .then((r: AxiosResponse) => {
          console.log(r.data.payload, r.data.message);
          if (r.data.message == "success") {
            return { client: r.data.payload, error: null };
          }
          if (r.data.message == "error") {
            return { error: Error("Failed to create agent"), client: null };
          }
        });
      return response;
    } catch (e) {
      return { error: "error", client: null };
    }
  }

  async function CreateNewClient(CompanyId: string, data: any) {
    try {
      const response = await axios
        .post(process.env.NEXT_PUBLIC_ERP_CREATE_CLIENT as string, {
          data,
          id: CompanyId,
        })
        .then((r: AxiosResponse) => {
          if (r.data.message == "success") {
            return { client: r.data.payload, error: null };
          }
          if (r.data.message == "error") {
            return { error: Error("Failed to create client"), client: null };
          }
        });
      return response;
    } catch (e) {
      return { error: "error", client: null };
    }
  }

export { getClientsData, UpdateClient, CreateNewClient };
