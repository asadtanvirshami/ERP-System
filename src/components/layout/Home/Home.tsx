import React, { useEffect, useState } from "react";
import Router from "next/router";
import ThreeDots from "../../shared/Loader/ThreeDots";
import { delay } from "@/src/functions/delay";

const Home = ({ session }: any) => {
    console.log(session)
  const makeRoute = async () => {
    await delay(3000);
    if (session.isLoggedIn == false) {
      Router.push("/auth");
    }else{
        Router.push("/dashboard");  
    }
  };
  useEffect(() => {
    makeRoute();
  }, []);

  return <ThreeDots />;
};

export default Home;
