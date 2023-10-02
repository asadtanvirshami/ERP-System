import axios, { AxiosResponse } from "axios";

async function GetClientsData(CompanyId: string, page: number, limit: number) {
  try {
    const response = await axios
      .get(process.env.NEXT_PUBLIC_ERP_GET_CLIENT as string, {
        headers: { id: CompanyId, page: page, limit: limit },
      })
      .then((r: AxiosResponse) => {
        console.log(r.data.payload, r.data.message);
        if (r.data.message == "success") {
          return {
            clients: r.data.payload,
            error: null,
            totalItems: r.data.totalItems,
          };
        }
        if (r.data.message == "error") {
          return { error: Error("Failed to retrieve agents"), clients: null };
        }
      });
    return response;
  } catch (e) {
    return { error: "error", clients: null, totalItems: 0 };
  }
}

async function UpdateInvoice(CompanyId: string, data: any) {
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

async function CreateInvoice(CompanyId: string, data: any) {
  try {
    const response = await axios
      .post(process.env.NEXT_PUBLIC_ERP_CREATE_INVOICE as string, {
        data,
        id: CompanyId
      })
      .then((r: AxiosResponse) => {
        if (r.data.message == "success") {
          return { invoice: r.data.payload, error: null };
        }
        if (r.data.message == "error") {
          return { error: Error("Failed to create client"), invoice: null };
        }
      });
    return response;
  } catch (e) {
    return { error: "error", invoice: null };
  }
}

async function GetInvoiceById(id:string) {
  try {
    const response = await axios
      .get(process.env.NEXT_PUBLIC_ERP_GET_INVOICE_BY_ID as string, {
        headers:{id: id}
      })
      .then((r: AxiosResponse) => {
        if (r.data.message == "success") {
          console.log(r.data.payload,'data in tuils')
          return { invoice: r.data.payload, error: null };
        }
        if (r.data.message == "error") {
          return { error: Error("Failed to create client"), invoice: null };
        }
      });
    return response;
  } catch (e) {
    return { error: "error", invoice: null };
  }
}

export { GetClientsData, CreateInvoice, UpdateInvoice, GetInvoiceById };
