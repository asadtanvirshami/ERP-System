import React, { useState, useEffect, Fragment } from "react";
import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";
//Interface Imports
import { Agents } from "@/src/interfaces/Agents";
//Component Imports
import Table from "@/src/components/shared/Table";
import AgentCE from "@/src/components/layout/CreateOrEdit/AgentCE";

type Props = {};

const Index = (props: Props) => {
  const [agents, setAgents] = useState<Agents[]>([]);

  useEffect(() => {
    const CompanyId = Cookies.get("company");
    axios
      .get(process.env.NEXT_PUBLIC_ERP_GET_AGENTS as string, {
        headers: { id: CompanyId },
      })
      .then((r: AxiosResponse) => {
        console.log(r.data.payload);
        setAgents(r.data.payload);
      });
  }, []);
  
  return (
    <div className="">
      <Fragment>
        
          <Table
            cols={[
              "No",
              "Name",
              "Phone.",
              "Password",
              "Email",
              "Designation",
              "Signature",
              "Edit",
              "Delete",
            ]}
            data={agents || undefined}
            setData={setAgents}
            modalTitle="Agent"
            renderModalComponent={<AgentCE setData={setAgents} data={agents || undefined} />}
            url={process.env.NEXT_PUBLIC_ERP_DELETE_AGENT}
          />
      </Fragment>
    </div>
  );
};

export default Index;
