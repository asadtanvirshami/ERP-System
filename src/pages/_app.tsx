import React,{ useState, useEffect } from 'react';
import type { AppProps } from 'next/app'
import Router, { useRouter  } from 'next/router';

import Layout from '../components/shared/Layout';
import Loader from '../components/shared/loader';

import { store } from '../redux/store';
import { Provider } from 'react-redux';

//Styles Imports
import '../../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    Router.events.on("routeChangeStart", () => { setLoading(true) });
    Router.events.on("routeChangeComplete", () => { setLoading(false)});  
    setTimeout(() => setLoading(false), 1000)
  }, [])

  return( 
    <>
      { (router.pathname !='/auth') &&
        <Provider store={store}>
         <Layout>
              { loading && <Loader/> }
              { !loading &&  <Component {...pageProps} /> }
         </Layout> 
         </Provider>
      }
      { (router.pathname =='/auth') &&
        <>
        <Provider store={store}>
         { loading && <Loader/> }
         { !loading &&  <Component {...pageProps} /> }
         </Provider>
        </>
      }
   </>
  )
}

export default MyApp