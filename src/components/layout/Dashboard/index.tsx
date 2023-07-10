import React, { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
//Components Imports
import Admin from "./Admin/index";
import Agent from "./Agent/index";

import { User } from "../User/UserProvider";

import { useSelector } from "react-redux";

type Props = {
  sessionData: any;
  type: string;
};

const Dashboard = (props: Props) => {
  const router = useRouter();
  const {
    user: { type },
  } = User();

  const userData = useSelector((state: any) => state.user.user);

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
          {/* <Agent /> */}
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

export default Dashboard;
