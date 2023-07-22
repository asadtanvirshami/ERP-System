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
import { DeleteAgent, GetAllAgents } from "@/src/utils/api/team";

type Props = {};

const Index = (props: Props) => {
  const [agents, setAgents] = useState<any[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 5;

  const userData = useSelector((state: any) => state.user.user);
  const CompanyId = userData.companyId;

  async function getAllAgents() {
    const Team = await GetAllAgents(CompanyId,currentPage,pageSize);
    if (Team) {
      if (Team.error  == null) {
        setAgents(Team.agents);
        setTotalPages(Math.ceil(Team.totalItems / pageSize));
      } else {
        setAgents([]);
      }
    } else {
      setAgents([]);
    }
  }

  
  const handleDeleteUser = async (id: string) => {
    const deltetedTask = await DeleteAgent(id);
    if (deltetedTask?.error == null) {
      const newData = agents?.filter((item: any) => item.id !== id);
      setAgents(newData);
    }
  };

  useEffect(() => {
    getAllAgents();
  }, [currentPage]);

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
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          onClick={handleDeleteUser}
        />
      </Fragment>
    </div>
  );
};

export default Index;
