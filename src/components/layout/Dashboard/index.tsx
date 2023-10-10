import React, { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
//Components Imports
import Admin from "./Admin/index";
import Agent from "./Agent/index";

import { useUser } from "../User/UserProvider";

import { useSelector } from "react-redux";

type Props = {
  sessionData: any;
  type: string;
};

const Dashboard = (props: Props) => {
  const router = useRouter();
  const {
    user: { type },
  } = useUser();

  useEffect(() => {
    if (props.sessionData.isLoggedIn == false) {
      router.push("/auth");
    }
  }, []);

  return (
    <Fragment>
      {type == "admin" && (
        <Fragment>
          <Admin />
        </Fragment>
      )}
      {type == "agent" && (
        <Fragment>
          <Agent />
        </Fragment>
      )}
    </Fragment>
  );
};

const DashboardHOC = React.memo(Dashboard);
export default DashboardHOC;

