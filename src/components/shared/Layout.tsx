import React, { useEffect } from "react";
import { useRouter } from "next/router";

function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  useEffect(() => {
    console.log(router.route);
  }, []);

  return (
    <>

      {children}

    </>
  );
}

export default Layout;
