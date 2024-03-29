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
import CardLoader from "@/src/components/shared/Loader/CardLoader";

import { User } from "../../User/UserProvider";
import { GetAllAgents } from "@/src/utils/api/team";
import { GetClientsData } from "@/src/utils/api/clients";
import SalesCE from "../../CreateOrEdit/SaleCE/SalesCE";
import InfoSection from "@/src/components/shared/DashboardLayout/InfoSection";

import salesPNG from "../../../../../public/Image/Icons/pngs/sales.png";
import tasksPNG from "../../../../../public/Image/Icons/pngs/task.png";
import projectPNG from "../../../../../public/Image/Icons/pngs/project.png";
import { ArrowTrendingUpIcon } from "@heroicons/react/24/solid";
import { Square3Stack3DIcon } from "@heroicons/react/24/solid";
import { SquaresPlusIcon } from "@heroicons/react/24/solid";
import ProjectCE from "../../CreateOrEdit/ProjectCE/ProjectCE";
import axios, { AxiosResponse } from "axios";

type InfoCardData = {
  title: string;
  name: string;
  modalTitle: string;
  label: string;
  component: JSX.Element;
  url: string | null;
  page: string;
  // cols: string[];
};

const Index = () => {
  const [data, setData] = useState<any>({ agents: [], sales: [], clients: [] });
  const [options, setOptions] = useState<any>({
    status: [],
    services: [],
    sources: [],
    designation: [],
  });
  const [loading, setLoading] = useState<boolean>(true);
  const {
    user: { companyId: userCompanyId },
  } = User();
  const companyId = userCompanyId;

  const getCompanyData = useCallback(async () => {
    const AgentsData = await GetAllAgents(companyId, 1, 5);
    const ClientsData = await GetClientsData(companyId, 1, 5);
    //scroll table attach karna hai

    if (AgentsData && ClientsData) {
      if (ClientsData.error == null && AgentsData?.error == null) {
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

  async function getOptions() {
    axios
      .get(process.env.NEXT_PUBLIC_ERP_GET_OPTIONS as string)
      .then((response: AxiosResponse) => {
        setOptions({
          status: response.data[0].status,
          services: response.data[0].services,
          sources: response.data[0].sources,
          designation: response.data[0].designation,
        });
      });
  }

  useEffect(() => {
    try {
      getOptions();
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
        page: "/team",
        component: (
          <AgentCE
            options={options}
            setData={(agents: any) =>
              setData((prevData: any) => ({ ...prevData, agents }))
            }
            data={data["agents"]}
          />
        ),
        url: process.env.NEXT_PUBLIC_ERP_DELETE_AGENT || null,
        name: "agents",
      },
    ],
    [data]
  );

  return (
    <Fragment>
      <Container>
        <InfoSection />
        <div className="h-screen flex-grow overflow-x-hidden overflow-auto flex flex-wrap content-start p-2">
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
                    link={infoCard.page}
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
              {[...Array(1)].map((_, i) => (
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
                icon={salesPNG}
                heroicon={ArrowTrendingUpIcon}
                renderModalComponent={
                  <SalesCE
                    options={options}
                    setData={null}
                    data={data.agents}
                  />
                }
                label="Create Sale"
                description="You can create sale attached with the client and generate invoice."
                title="Sale Creation"
                modalTitle="Sale"
                modalSize={"xl"}
              />
            </div>
          </div>
          <div className="w-full p-2 lg:w-1/3">
            <div className="rounded-lg bg-white shad h-80">
              <CreateCard
                icon={projectPNG}
                heroicon={Square3Stack3DIcon}
                renderModalComponent={
                  <ProjectCE options={options} setData={null} _data={data.agents} />
                }
                label="Create Project"
                description="You can create project and assign agents."
                title="Project Creation"
                modalTitle="Project"
                modalSize={"lg"}
              />
            </div>
          </div>
          <div className="w-full p-2 lg:w-1/3">
            <div className="rounded-lg bg-white shad h-80">
              <CreateCard
                heroicon={SquaresPlusIcon}
                icon={tasksPNG}
                renderModalComponent={
                  <TaskCE setTasks={null} options={options} _data={data.agents} />
                }
                label="Create Task"
                description="Create a task for agents."
                title="Tasks Creation"
                modalTitle="Task"
                modalSize={"lg"}
              />
            </div>
          </div>
        </div>
      </Container>
    </Fragment>
  );
};

export default Index;
