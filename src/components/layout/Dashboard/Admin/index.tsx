import React, {
  Fragment,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
// COMPONENTS
import Container from "@/src/components/shared/DashboardLayout/PanelSection/Container";
import ProgressCard from "@/src/components/shared/Cards/ProgressCard";
import InfoCard from "@/src/components/shared/Cards/InfoCard";
import CreateCard from "@/src/components/shared/Cards/CreateCard";
import Graph from "@/src/components/shared/Graph/Graph";
// EDIT OR CREATE FORMS
import AgentCE from "@/src/components/layout/CreateOrEdit/AgentCE";
import TaskCE from "@/src/components/layout/CreateOrEdit/TaskCE/TaskCE";
import ClientsCE from "@/src/components/layout/CreateOrEdit/ClientsCE";
import CardLoader from "@/src/components/shared/Loader/CardLoader";

import { User } from "../../User/UserProvider";
import { GetAllAgents } from "@/src/utils/api/team";
import { GetClientsData } from "@/src/utils/api/clients";
import SalesCE from "../../CreateOrEdit/SalesCE";

type InfoCardData = {
  title: string;
  name: string;
  modalTitle: string;
  label: string;
  component: JSX.Element;
  url: string | null;
  page:string
  // cols: string[];
};

const Index = () => {
  const [data, setData] = useState<any>({ agents: [], sales: [], clients: [] });
  const [loading, setLoading] = useState<boolean>(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 5;

  const {
    user: { companyId: userCompanyId },
  } = User();
  const companyId = userCompanyId;

  const getCompanyData = useCallback(async () => {
    const AgentsData = await GetAllAgents(companyId, currentPage, pageSize);
    const ClientsData = await GetClientsData(companyId);
    //scroll table attach karna hai 

    if (AgentsData && ClientsData) {
      if (ClientsData.error == null && AgentsData?.error == null) {
        setTotalPages(Math.ceil(AgentsData.totalItems / pageSize));
        setData({
          agents: AgentsData?.agents,
          sales: [],
          clients: ClientsData.clients,
        });
        setLoading(false);
      } else {
        setLoading(true);
      }
    } else {
      setLoading(true);
    }
  }, [companyId]);

  useEffect(() => {
    try {
      getCompanyData();
    } catch (e) {
      console.log(e);
    }
  }, [getCompanyData]);

  const infoCardObj: InfoCardData[] = useMemo(
    () => [
      {
        title: "Agents",
        modalTitle: "Agent",
        label: "List of Agents",
        page:'/team',
        component: (
          <AgentCE
            setData={(agents: any) =>
              setData((prevData: any) => ({ ...prevData, agents }))
            }
            data={data["agents"]}
          />
        ),
        url: process.env.NEXT_PUBLIC_ERP_DELETE_AGENT || null,
        name: "agents",
      },
      {
        title: "Sales",
        modalTitle: "Sales",
        label: "List of Sales",
        page:'/sales',
        component: (
          <SalesCE
            setData={(agents: any) =>
              setData((prevData: any) => ({ ...prevData, agents }))
            }
            data={data.clients}
          />
        ),
        url: process.env.NEXT_PUBLIC_ERP_DELETE_AGENT || null,
        name: "sales",
      },
      {
        title: "Clients",
        modalTitle: "Client",
        label: "List of Clients",
        page:'/clients',
        component: (
          <ClientsCE
            setData={(clients: any) =>
              setData((prevData: any) => ({ ...prevData, clients }))
            }
            data={data.clients}
          />
        ),
        url: process.env.NEXT_PUBLIC_ERP_DELETE_AGENT || null,
        name: "clients",
      },
      // Add other InfoCardData objects for sales and clients
    ],
    [data] // Add dependencies if necessary
  );

  return (
    <Fragment>
      <Container>
        <ProgressCard />
        <ProgressCard />
        <ProgressCard />

        <div className="w-full p-2 lg:w-2/3">
          <div className="rounded-lg bg-card sm:h-80 h-60">
            <Graph />
          </div>
        </div>

        {Object.entries(data).length >= 1 && !loading ? (
          infoCardObj.map((infoCard, i) => (
            <div key={i} className="w-full p-2 lg:w-1/3 ">
              <div className="rounded-lg bg-card h-80">
                <InfoCard
                  label={infoCard.label}
                  title={infoCard.title}
                  modalTitle={infoCard.modalTitle}
                  renderModalComponent={infoCard.component}
                  url={infoCard.url}
                  data_loading={loading}
                  index={i}
                  data={data[infoCard.name]}
                  totalPages={totalPages}
                  currentPage={currentPage}
                  link={infoCard.page}
                  setCurrentPage={setCurrentPage}
                  setData={(updatedData: any) =>
                    setData((prevData: any) => ({
                      ...prevData,
                      [infoCard.name]: updatedData,
                    }))
                  }
                />
              </div>
            </div>
          ))
        ) : (
          <Fragment>
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-full p-2 lg:w-1/3 ">
                <div className="rounded-lg bg-card h-80">
                  <CardLoader />
                </div>
              </div>
            ))}
          </Fragment>
        )}

        <div className="w-full p-2 lg:w-1/3">
          <div className="rounded-lg bg-white shad h-80">
            <CreateCard
              renderModalComponent={
                <TaskCE setTasks={null} _data={data.agents} />
              }
              label="Create Task"
              description="Create a task for agents."
              title="Tasks"
              modalTitle="Task"
            />
          </div>
        </div>
      </Container>
    </Fragment>
  );
};

export default Index;
