import React, { useState, useEffect } from "react";
import type { AppProps } from "next/app";
import Router, { useRouter } from "next/router";

import MainLayout from "../components/shared/MainLayout";
import ThreeDots from "../components/shared/Loader/ThreeDots";

import { store } from "../redux/store";
import { Provider } from "react-redux";

//Styles Imports
import "../../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  Router.events.on("routeChangeStart", () => { setLoading(true) });
  Router.events.on("routeChangeComplete", () => { setLoading(false)});

  return (
    <>
      {(router.pathname != "/auth")&& 
        <Provider store={store}>
          <MainLayout>
            {loading && <ThreeDots />}
            {!loading && <Component {...pageProps} />}
          </MainLayout>
        </Provider>
      }
      {(router.pathname == "/auth")&&
        <>
          <Provider store={store}>
            {loading && <ThreeDots />}
            {!loading && <Component {...pageProps} />}
          </Provider>
        </>
      }
    </>
  );
}

export default MyApp;
