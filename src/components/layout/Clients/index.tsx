import React, { useState, useEffect, Fragment } from "react";
import axios, { AxiosResponse } from "axios";
//Interface Imports
import { Agents } from "@/src/interfaces/Agents";
//Component Imports
import Table from "@/src/components/shared/Table";
import ClientsCE from "@/src/components/layout/CreateOrEdit/ClientsCE";

import EmptyTable from "../../shared/EmptyComponents/EmptyTable";

import { useSelector } from "react-redux";
import { GetClientsData } from "@/src/utils/api/clients";
import Container from "../../shared/DashboardLayout/PanelSection/Container";

type Props = {};

const Index = (props: Props) => {
  const [data, setData] = useState<Agents[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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

export default Index;
