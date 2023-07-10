import React, { useState, useEffect, Fragment } from "react";
import axios, { AxiosResponse } from "axios";
//Interface Imports
import { Agents } from "@/src/interfaces/Agents";
//Component Imports
import Table from "@/src/components/shared/Table";
import ClientsCE from "@/src/components/layout/CreateOrEdit/ClientsCE";

import EmptyTable from "../../shared/EmptyComponents/EmptyTable";

import { useSelector } from "react-redux";
import { getClientsData } from "@/src/utils/api/clients";

type Props = {};

const Index = (props: Props) => {
  const [data, setData] = useState<Agents[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const CompanyId = useSelector((state: any) => state.user.user.companyId);

  async function dataCall() {
    try {
      const Clients = await getClientsData(CompanyId);
      if (Clients) {
        if(Clients.error == null){
          setData(Clients.clients);
          setLoading(false);
        }else{
          setData([])
        }
      }else{
        setData([])
        setLoading(true)
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    dataCall();
  }, []);

  return (
    <div className="">
      <Fragment>
        {!loading ? (
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
        ) : (
          <div>
            <EmptyTable
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
            />
          </div>
        )}
      </Fragment>
    </div>
  );
};

export default Index;
