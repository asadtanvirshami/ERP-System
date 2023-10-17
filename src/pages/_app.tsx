import React, { useState, useEffect } from "react";
import type { AppProps } from "next/app";
import Router, { useRouter } from "next/router";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

import ThreeDots from "../components/shared/Loader/ThreeDots";

import { store, persistor } from "../redux/store";
import { Provider } from "react-redux";

import { UserProvider } from "../components/layout/User/UserProvider/index";

//Styles Imports
import "../../styles/globals.css";
import Layout from "../components/shared/Layout";
import { PersistGate } from "redux-persist/integration/react";

const queryClient = new QueryClient();

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
      {(router.pathname !== "/auth" &&  router.pathname !== "/") && (
        <Provider store={store}>
          <UserProvider>
            <PersistGate persistor={persistor}>
              <QueryClientProvider client={queryClient}>
                {loading && <ThreeDots />}
                {!loading && (
                  <Layout>
                    <Component {...pageProps} />{" "}
                  </Layout>
                )}
              </QueryClientProvider>
            </PersistGate>
          </UserProvider>
        </Provider>
      )}
      {(router.pathname === "/auth" || router.pathname === "/") && (
        <Provider store={store}>
          <UserProvider>
            {loading && <ThreeDots />}
            {!loading && <Component {...pageProps} />}
          </UserProvider>
        </Provider>
      )}
    </>
  );
}

export default MyApp;
