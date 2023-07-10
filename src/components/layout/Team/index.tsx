import React, { useState, useEffect, Fragment } from "react";
import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";
//Interface Imports
import { Agents } from "@/src/interfaces/Agents";
//Component Imports
import Table from "@/src/components/shared/Table";
import AgentCE from "@/src/components/layout/CreateOrEdit/AgentCE";
//Redux
import { useSelector } from "react-redux";
import { GetAllAgents } from "@/src/utils/api/team";

type Props = {};

const Index = (props: Props) => {
  const [agents, setAgents] = useState<any[]>([]);

  const userData = useSelector((state: any) => state.user.user);
  const CompanyId = userData.companyId;

  async function getAllAgents() {
    const Team = await GetAllAgents(CompanyId);
    if (Team) {
      if (Team.error  == null) {
        setAgents(Team.agents);
      } else {
        setAgents([]);
      }
    } else {
      setAgents([]);
    }
  }

  useEffect(() => {
    try {
      getAllAgents();
    } catch (e) {
      console.log(e);
    }
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
          renderModalComponent={
            <AgentCE setData={setAgents} data={agents || undefined} />
          }
          url={process.env.NEXT_PUBLIC_ERP_DELETE_AGENT}
        />
      </Fragment>
    </div>
  );
};

export default Index;
