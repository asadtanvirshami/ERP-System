import axios, { AxiosResponse } from "axios";

async function GetCompanyData(CompanyId: string) {
    try{
        const response = await axios.get(process.env.NEXT_PUBLIC_ERP_GET_COMPANY_DATA as string, {
            headers: { id: CompanyId, offset: 0 },
           })
           .then((r: AxiosResponse) => {
            //  console.log(r.data.payload,r.data.message);
             if(r.data.message == 'success'){
                return {
                    agents: r.data.payload[0],
                    sales: r.data.payload[1],
                    clients: r.data.payload[2],
                    error: null,
                  };
             }
             if(r.data.message == 'error'){
                return {
                    agents: null,
                    sales: null,
                    clients: null,
                    error: Error("Failed to retrieve tasks"),
                  };
             }
           });
           return response
    }catch(e){
        return { error: "error", agents: null, sales: null, clients: null };
    }

    }
   

export { GetCompanyData };
