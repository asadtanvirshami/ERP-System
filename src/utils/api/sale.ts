import axios, { AxiosResponse } from "axios";

async function GetAllSales(
  CompanyId: string,
  currentPage: number,
  pageSize: number
) {
  try {
    const response = await axios
      .get(process.env.NEXT_PUBLIC_ERP_GET_SALES as string, {
        headers: { id: CompanyId, page: currentPage, limit: pageSize },
      })
      .then((r: AxiosResponse) => {
        console.log(r.data.payload, r.data.message);
        if (r.data.message == "success") {
          return {
            sales: r.data.payload,
            totalItems: r.data.totalItems,
            error: null,
          };
        }
        if (r.data.message == "error") {
          return {
            error: Error("Failed to retrieve tasks"),
            sales: null,
            totalItems: null,
          };
        }
      });
    return response;
  } catch (e) {
    return { error: "error", tasks: null, totalTasks: null };
  }
}

async function CreatNewSale(data: any) {
  try {
    const response = await axios
      .post(process.env.NEXT_PUBLIC_ERP_CREATE_SALES as string, data)
      .then((r: AxiosResponse) => {
        console.log(r.data.payload, r.data.message);
        if (r.data.message == "success") {
          return { sale: r.data.payload, error: null };
        }
        if (r.data.message == "error") {
          return { error: Error("Failed to retrieve sales"), sale: null };
        }
      });
    return response;
  } catch (e) {
    return { error: "error", sale: null };
  }
}

export {GetAllSales, CreatNewSale}