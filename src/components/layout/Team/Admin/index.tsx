import React, { useState, useEffect, Fragment } from "react";
import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";
//Interface Imports
import { Agents } from "@/src/interfaces/Agents";
//Component Imports
import Table from "@/src/components/shared/Table";

type Props = {};

const index = (props: Props) => {
  const [agents, setAgents] = useState<Agents[]>([]);

  useEffect(() => {
    const CompanyId = Cookies.get("company");
    axios
      .get(process.env.NEXT_PUBLIC_ERP_GET_AGENTS as string, {
        headers: { id: CompanyId },
      })
      .then((r: AxiosResponse) => {
        setAgents(r.data.payload);
      });
  }, []);
  return (
    <div className="">
      <Fragment>
        {agents.length ? (
          <Table
            cols={[
              "Name",
              "Phone.",
              "Password",
              "Email",
              "Designation",
              "Signature",
              "Edit",
              "Delete"
            ]}
            data={agents}
          />
        ) : null}
      </Fragment>
    </div>
  );
};

export default index;
