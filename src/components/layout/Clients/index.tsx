import React, { useState, useEffect, Fragment } from "react";
import axios, { AxiosResponse } from "axios";
//Interface Imports
import { Agents } from "@/src/interfaces/Agents";
//Component Imports
import Table from "@/src/components/shared/Table";
import ClientsCE from "@/src/components/layout/CreateOrEdit/ClientsCE";

import { User } from "../User/UserProvider";
import EmptyTable from "../../shared/EmptyComponents/EmptyTable";

type Props = {};

const Index = (props: Props) => {
  const [data, setData] = useState<Agents[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const {
    user: { companyId },
  } = User();
  const _CompanyId = companyId;

  async function getClientsData() {
    try {
      await axios
        .get(process.env.NEXT_PUBLIC_ERP_GET_CLIENT as string, {
          headers: { id: _CompanyId },
        })
        .then((r: AxiosResponse) => {
          if (r.data.message == "success") {
            setData(r.data.payload);
            setLoading(false);
          } else {
            setLoading(true);
          }
        });
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getClientsData();
  }, []);

  return (
    <div className="">
      <Fragment>
       {!loading? (<Table
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
        />):(
          <div>
            <EmptyTable cols={[
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
          ]}/>
          </div>
        )}
      </Fragment>
    </div>
  );
};

export default Index;
