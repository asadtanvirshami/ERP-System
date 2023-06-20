import React, { Fragment } from 'react'
import {GetServerSideProps} from 'next'
import Cookies from "cookies";
import axios, { AxiosResponse } from 'axios';
//Component import
import Dashboard from '../components/layout/Dashboard/';

type Props = {
  sessionData:object
}

const index = (props: Props) => {
  return (
    <Fragment><Dashboard sessionData={props.sessionData}/></Fragment>
  )
}

export default index

export const getServerSideProps: GetServerSideProps = async ({req, res}) => {
  // Fetch data from external API
  const cookies = new Cookies(req, res);
  const sessionData = await axios
  .get(process.env.NEXT_ERP_TOKEN_VERIFICATION as string, {
    headers: {
    "x-access-token": `${cookies.get("_hjSession")}`,
  }
})
.then((r:AxiosResponse) => r.data);

const sessionRequest = await sessionData;

// Pass data to the page via props
return {
  props: {sessionData: sessionRequest },
};
}