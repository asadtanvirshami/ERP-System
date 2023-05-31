import React, { Fragment, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios, { AxiosResponse } from "axios";
import { BeatLoader } from "react-spinners";
//COMPONENTS
import Container from "@/src/components/shared/DashboardLayout/PanelSection/Container";
import ProgressCard from "@/src/components/shared/Cards/ProgressCard";
import InfoCard from "@/src/components/shared/Cards/InfoCard";
import ViewCard from "@/src/components/shared/Cards/ViewCard";
import CreateCard from "@/src/components/shared/Cards/CreateCard";
import Graph from "@/src/components/shared/Graph/Graph";
//EDIT OR CREATE FORMS
import AgentCE from "./CreateOrEdit/AgentCE";
import TaskCE from "./CreateOrEdit/TaskCE";
//Mock Data
import Clients from "../../../../mock/Clients.json";
import Sales from "../../../../mock/Sales.json";

type Props = {};

const index = (props: Props) => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getCompnayData() {
      setLoading(true);
      const CompanyId = await Cookies.get("company");
      await axios
        .get(process.env.NEXT_PUBLIC_ERP_GET_COMPANY_DATA as string, {
          headers: { id: CompanyId, offset: 0 },
        })
        .then((r: AxiosResponse) => {
          if (r.data.message === "success") {
            setData(r.data.payload);
            setLoading(true);
          }
          if (r.data !== "success") {
            setLoading(true);
          }
        });
    }
    getCompnayData();
  }, []);
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
        <div className="w-full p-2 lg:w-1/3 ">
          <div className="rounded-lg bg-card h-80">
            {loading ? (
              <InfoCard
                renderModalComponent={<AgentCE data={data[0]} />}
                label="List of Agents"
                title="Agents"
                modalTitle="Agent"
                cols={["name", "designation", "role"]}
                data={data[0]}
                setData={setData}
                url={process.env.NEXT_PUBLIC_ERP_DELETE_AGENT}
              />
            ) : (
              <div className="flex items-center">
                <BeatLoader />
              </div>
            )}
          </div>
        </div>

        <div className="w-full p-2 lg:w-1/3 ">
          <div className="rounded-lg bg-card h-80">
            <ViewCard
              renderModalComponent={<TaskCE />}
              label="List of Sales"
              title="Sales"
              modalTitle="Sales"
              data={Sales}
            />
          </div>
        </div>
        <div className="w-full p-2 lg:w-1/3 ">
          <div className="rounded-lg bg-card h-80">
            <ViewCard
              renderModalComponent={<TaskCE />}
              label="List of Clients"
              title="Clients"
              modalTitle="Clients"
              data={Clients}
            />
          </div>
        </div>
        <div className="w-full p-2 lg:w-1/3">
          <div className="rounded-lg bg-white shad h-80">
            <CreateCard
              renderModalComponent={<TaskCE />}
              label="Create Task"
              description="Create a task for agents."
              title="Tasks"
              modalTitle="Task"
              // data={Clients}
            />
          </div>
        </div>
      </Container>
    </Fragment>
  );
};

export default index;
