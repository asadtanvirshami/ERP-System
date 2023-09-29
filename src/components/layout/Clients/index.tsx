import React, { useState, useEffect, Fragment } from "react";
import axios, { AxiosResponse } from "axios";
//Interface Imports
import { Clients } from "@/src/interfaces/Clients";
//Component Imports
import Table from "@/src/components/shared/Table";
import ClientsCE from "@/src/components/layout/CreateOrEdit/SaleCE/ClientsCE";
import Container from "../../shared/DashboardLayout/PanelSection/Container";
//Redux
import { useSelector } from "react-redux";
import { GetClientsData } from "@/src/utils/api/clients";

type Props = {};

const Index = (props: Props) => {
  const [data, setData] = useState<Clients[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [options, setOptions] = useState<any>({
    status: [],
    services: [],
    sources: [],
    designation: [],
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 5;


  const CompanyId = useSelector((state: any) => state.user.user.companyId);

  async function dataCall() {
    try {
      const Clients = await GetClientsData(CompanyId,currentPage,pageSize );
      if (Clients) {
        if(Clients.error == null){
          setData(Clients.clients);
          setTotalPages(Math.ceil(Clients.totalItems / pageSize));
          setLoading(false);
        }else{
          setData([])
        }
      }else{
        setData([])
        setLoading(false)
      }
    } catch (e) {
      console.log(e);
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

  useEffect(() => {
    dataCall();
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
          data={data || undefined}
          setData={setData}
          modalTitle="Clients"
          renderModalComponent={
            <ClientsCE setData={setData} data={data || undefined} />
          }
          loading={loading}
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </Fragment>
    </Container>
  );
};

const ClientsHOC = React.memo(Index);
export default ClientsHOC;

