import React, { useEffect } from "react";
import { useRouter } from "next/router";

import Header from "./Header";
import Footer from "./Footer";

function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  useEffect(() => {
    console.log(router.route);
  }, []);

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export default Layout;
