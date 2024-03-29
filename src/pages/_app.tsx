import React, { useState, useEffect } from "react";
import type { AppProps } from "next/app";
import Router, { useRouter } from "next/router";

import MainLayout from "../components/shared/MainLayout";
import ThreeDots from "../components/shared/Loader/ThreeDots";

import { store } from "../redux/store";
import { Provider } from "react-redux";

import {UserProvider} from "../components/layout/User/UserProvider/index";

//Styles Imports
import "../../styles/globals.css";
// million-ignore
function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  Router.events.on("routeChangeStart", () => {
    setLoading(true);
  });
  Router.events.on("routeChangeComplete", () => {
    setLoading(false);
  });

  return (
    <>
      {router.pathname != "/auth" && (
        <Provider store={store}>
          <UserProvider>
            <MainLayout>
              {loading && <ThreeDots />}
              {!loading && <Component {...pageProps} />}
            </MainLayout>
          </UserProvider>
        </Provider>
      )}
      {router.pathname == "/auth" && (
        <>
          <Provider store={store}>
            <UserProvider>
              {loading && <ThreeDots />}
              {!loading && <Component {...pageProps} />}
            </UserProvider>
          </Provider>
        </>
      )}
    </>
  );
}

export default MyApp;
