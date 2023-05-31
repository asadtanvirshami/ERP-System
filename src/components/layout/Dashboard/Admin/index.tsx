import React, { Fragment, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios, { AxiosResponse } from "axios";
import { BeatLoader } from "react-spinners";
//COMPONENTS
import Container from "@/src/components/shared/DashboardLayout/PanelSection/Container";
import ProgressCard from "@/src/components/shared/Cards/ProgressCard";
import InfoCard from "@/src/components/shared/Cards/InfoCard";
import CreateCard from "@/src/components/shared/Cards/CreateCard";
import Graph from "@/src/components/shared/Graph/Graph";
//EDIT OR CREATE FORMS
import AgentCE from "@/src/components/shared/CreateOrEdit/AgentCE";
import TaskCE from "@/src/components/shared/CreateOrEdit/TaskCE";
import ClientsCE from "@/src/components/shared/CreateOrEdit/ClientsCE";

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
                cols={[
                  "Name",
                  "Phone.",
                  "Password",
                  "Email",
                  "Designation",
                  "Signature",
                  "Edit",
                  "Delete",
                ]}
                renderModalComponent={<AgentCE data={data[0] || undefined} />}
                label="List of Agents"
                title="Agents"
                modalTitle="Agent"
                data={data[0] || undefined}
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
          {loading ? (
              <InfoCard
                cols={[
                  "Name",
                  "Phone.",
                  "Password",
                  "Email",
                  "Designation",
                  "Signature",
                  "Edit",
                  "Delete",
                ]}
                renderModalComponent={<ClientsCE data={data[1] || undefined} />}
                label="List of Sales"
                title="Sales"
                modalTitle="Sale"
                data={data[1] || undefined}
                setData={setData}
                url={''}
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
          {loading ? (
              <InfoCard
                cols={[
                  "Name",
                  "Phone.",
                  "Password",
                  "Email",
                  "Designation",
                  "Signature",
                  "Edit",
                  "Delete",
                ]}
                renderModalComponent={<ClientsCE data={data[2] || undefined} />}
                label="List of Clients"
                title="Clients"
                modalTitle="Client"
                data={data[2] || undefined}
                setData={setData}
                url={''}
              />
            ) : (
              <div className="flex items-center">
                <BeatLoader />
              </div>
            )}
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
