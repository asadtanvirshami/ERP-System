import React, { useState, useEffect, Fragment } from "react";
import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";
//Interface Imports
import { Agents } from "@/src/interfaces/Agents";
//Component Imports
import Table from "@/src/components/shared/Table";
import ClientsCE from "@/src/components/layout/CreateOrEdit/ClientsCE";
import TableLoader from "@/src/components/shared/EmptyComponents/EmptyTable";

type Props = {};

const index = (props: Props) => {
  const [data, setData] = useState<Agents[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getClientsData(){
      const CompanyId = await Cookies.get("company");
      await axios
      .get(process.env.NEXT_PUBLIC_ERP_GET_CLIENT as string, {
        headers: { id: CompanyId },
      })
      .then((r: AxiosResponse) => {
        setData(r.data.payload);
        setLoading(false)
      });
      setLoading(false)}
      getClientsData()
  }, []);

  return (
    <div className="">
      <Fragment>
          <Table
            cols={[
              "Name",
              "Address",
              "City",
              "Country",
              "Email",
              "Phone",
              "Source",
              "Source Link",
              "Edit",
              "Edit",
              "Delete",
              "View",
            ]}
            data={data}
            setData={setData}
            modalTitle="Client"
            renderModalComponent={<ClientsCE setData={setData} data={data} />}
            url={process.env.NEXT_PUBLIC_ERP_DELETE_CLIENT}
          />
      </Fragment>
    </div>
  );
};

export default index;
