import React, { useState, useEffect, Fragment } from "react";
import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";
//Interface Imports
import { Agents } from "@/src/interfaces/Agents";
//Component Imports
import Table from "@/src/components/shared/Table";
import ClientsCE from "@/src/components/shared/CreateOrEdit/ClientsCE";

type Props = {};

const index = (props: Props) => {
  const [data, setData] = useState<Agents[]>([]);

  useEffect(() => {
    const CompanyId = Cookies.get("company");
    axios
      .get(process.env.NEXT_PUBLIC_ERP_GET_CLIENT as string, {
        headers: { id: CompanyId },
      })
      .then((r: AxiosResponse) => {
        setData(r.data.payload);
      });
  }, []);
  
  return (
    <div className="">
      <Fragment>
        {data.length ? (
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
              "Delete",
              "View"
            ]}
            data={data || undefined}
            setData={setData}
            modalTitle="Client"
            renderModalComponent={<ClientsCE setData={setData} data={data || undefined} />}
            url={process.env.NEXT_PUBLIC_ERP_DELETE_CLIENT}
          />
        ) : null}
      </Fragment>
    </div>
  );
};

export default index;
