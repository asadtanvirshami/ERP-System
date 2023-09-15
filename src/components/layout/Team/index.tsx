import React, { useState, useEffect, Fragment } from "react";
import axios, { AxiosResponse } from "axios";
//Interface Imports
import { Agents } from "@/src/interfaces/Agents";
//Component Imports
import Table from "@/src/components/shared/Table";
import AgentCE from "@/src/components/layout/CreateOrEdit/AgentCE";
import Container from "../../shared/DashboardLayout/PanelSection/Container";
//Redux
import { useSelector } from "react-redux";
import { DeleteAgent, GetAllAgents } from "@/src/utils/api/team";

type Props = {
  sessionData:object
};

const Index = (props: Props) => {
  const [agents, setAgents] = useState<Agents[]>([]);
  const [options, setOptions] = useState<any>({
    status: [],
    services: [],
    sources: [],
    designation: [],
  });

  const [loading, setLoading] = useState<boolean>(true);

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
        setLoading(false)
      } else {
        setAgents([]);
        setLoading(false)
      }
    } else {
      setAgents([]);
    }
  }

  async function getOptions() {
    axios
      .get(process.env.NEXT_PUBLIC_ERP_GET_OPTIONS as string)
      .then((response: AxiosResponse) => {
        console.log(response.data[0].services);
        setOptions({
          status: response.data[0].status,
          services: response.data[0].services,
          sources: response.data[0].sources,
          designation: response.data[0].designation,
        });
      });
  }
  useEffect(() => {getOptions()}, [])
  
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
    <Container>
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
            <AgentCE options={options} setData={setAgents} data={agents || undefined} />
          }
          totalPages={totalPages}
          currentPage={currentPage}
          loading={loading}
          setCurrentPage={setCurrentPage}
          onClick={handleDeleteUser}
        />
      </Fragment>
    </Container>
  );
};

export default Index;
