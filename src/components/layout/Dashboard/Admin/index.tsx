import React, { Fragment, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios, { AxiosResponse } from "axios";
//COMPONENTS
import Container from "@/src/components/shared/DashboardLayout/PanelSection/Container";
import ProgressCard from "@/src/components/shared/Cards/ProgressCard";
import InfoCard from "@/src/components/shared/Cards/InfoCard";
import CreateCard from "@/src/components/shared/Cards/CreateCard";
import Graph from "@/src/components/shared/Graph/Graph";
//EDIT OR CREATE FORMS
import AgentCE from "@/src/components/layout/CreateOrEdit/AgentCE";
import TaskCE from "@/src/components/layout/CreateOrEdit/TaskCE";
import ClientsCE from "@/src/components/layout/CreateOrEdit/ClientsCE";
import CardLoader from "@/src/components/shared/Loader/CardLoader";

type Props = {};

const Index = (props: Props) => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const infoCardOBj: any = {
    0: {
      title: "Agents",
      modalTitle: "Agent",
      label: "List of Agents",
      component: <AgentCE setData={setData} data={data} />,
      url: process.env.NEXT_PUBLIC_ERP_DELETE_AGENT,
      cols: [
        "Name",
        "Phone.",
        "Password",
        "Email",
        "Designation",
        "Signature",
        "Edit",
        "Delete",
      ],
    },
    1: {
      title: "Sales",
      modalTitle: "Sales",
      label: "List of Sales",
      component: <AgentCE setData={setData} data={data} />,
      url: null,
      cols: [
        "Name",
        "Phone.",
        "Password",
        "Email",
        "Designation",
        "Signature",
        "Edit",
        "Delete",
      ],
    },
    2: {
      title: "Clients",
      modalTitle: "Client",
      label: "List of Clients",
      component: <ClientsCE setData={setData} data={data} />,
      url: process.env.NEXT_PUBLIC_ERP_DELETE_CLIENT,
      cols: [
        "Name",
        "Phone.",
        "Password",
        "Email",
        "Designation",
        "Signature",
        "Edit",
        "Delete",
      ],
    },
  };

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
            if (r.data.payload.length > 0) {
              setData(r.data.payload);
              setLoading(false);
            } else {
              setData([[], [], []]);
              setLoading(false);
            }
            console.log(data, "data");
          }
          if (r.data !== "success") {
            setLoading(true);
          }
        });
    }
    getCompnayData();
  }, []);

  console.log(data, "data");
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
        {data.length != 0 ? (
          <>
            {data.map((x: any, i: number) => {
              return (
                <Fragment key={i}>
                  {data.length != 0 ? (
                    <div className="w-full p-2 lg:w-1/3 ">
                      <div className="rounded-lg bg-card h-80">
                        <InfoCard
                          cols={infoCardOBj[i].cols}
                          label={infoCardOBj[i].label}
                          title={infoCardOBj[i].title}
                          modalTitle={infoCardOBj[i].modalTitle}
                          renderModalComponent={infoCardOBj[i].component}
                          url={infoCardOBj[i].url}
                          data_loading={loading}
                          index={i}
                          data={data[i] || undefined}
                          allData={data || undefined}
                          setData={setData}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="w-full p-2 lg:w-1/3 ">
                      <div className="rounded-lg bg-card h-80">
                        <CardLoader />
                      </div>
                    </div>
                  )}
                </Fragment>
              );
            })}
          </>
        ) : (
          <Fragment>
            <div className="w-full p-2 lg:w-1/3 ">
              <div className="rounded-lg bg-card h-80">
                <CardLoader />
              </div>
            </div>
            <div className="w-full p-2 lg:w-1/3 ">
              <div className="rounded-lg bg-card h-80">
                <CardLoader />
              </div>
            </div>
            <div className="w-full p-2 lg:w-1/3 ">
              <div className="rounded-lg bg-card h-80">
                <CardLoader />
              </div>
            </div>
          </Fragment>
        )}
        <div className="w-full p-2 lg:w-1/3">
          <div className="rounded-lg bg-white shad h-80">
            <CreateCard
              renderModalComponent={
                <TaskCE _agents={data[0]} setData={setData} _data={data[0]} />
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
