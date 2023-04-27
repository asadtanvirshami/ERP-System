import React, { useEffect,Fragment } from "react";
import axios,{AxiosResponse} from "axios";
//COMPONENTS
import Container from "@/src/components/shared/DashboardLayout/PanelSection/Container";
import ProgressCard from "@/src/components/shared/Cards/ProgressCard";
import InfoCard from "@/src/components/shared/Cards/InfoCard";
import ViewCard from "@/src/components/shared/Cards/ViewCard";
import CreateCard from "@/src/components/shared/Cards/CreateCard";
import Graph from "@/src/components/shared/Graph/Graph";
//EDIT OR CREATE FORMS
import InvoiceCE from "./CreateOrEdit/InvoiceCE";
import AgentCE from "./CreateOrEdit/AgentCE";
import TaskCE from "./CreateOrEdit/TaskCE";

import Agents from '../../../../mock/Agents.json'
import Clients from '../../../../mock/Clients.json'
import Sales from '../../../../mock/Sales.json'

type Props = {};

const index = (props: Props) => {
  useEffect(() => {
    axios.get(process.env.NEXT_PUBLIC_ERP_GET_AGENTS as string).then((x:AxiosResponse)=>{
      console.log(x.data.payload)
    })
  }, [])
  
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
            <InfoCard
              renderModalComponent={<AgentCE />}
              label="List of Agents"
              title="Agents"
              modalTitle="Agent Info"
              data={Agents}
            />
          </div>
        </div>

        <div className="w-full p-2 lg:w-1/3 ">
          <div className="rounded-lg bg-card h-80">
            <ViewCard
              renderModalComponent={<InvoiceCE />}
              label="List of Sales"
              title="Sales"
              modalTitle="Sales Info"
              data={Sales}
            />
          </div>
        </div>
        <div className="w-full p-2 lg:w-1/3 ">
          <div className="rounded-lg bg-card h-80">
          <ViewCard
              renderModalComponent={<InvoiceCE />}
              label="List of Clients"
              title="Clients"
              modalTitle="Clients Info"
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
              modalTitle="Create Task"
              // data={Clients}
            />
          </div>
        </div>
      </Container>
    </Fragment>
  );
};

export default index;
