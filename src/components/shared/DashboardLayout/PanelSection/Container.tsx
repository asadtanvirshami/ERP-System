import React from "react";
import InfoSection from "../InfoSection";

function Container({ children }: { children: React.ReactNode }) {
  return (
    // <div className="w-full">
    <div className="bg-white rounded-xl mx-auto px-3 sm:px-6 max-w-6xl 2xl:max-w-7xl w-full">
      <>
        {children}
      </>
    </div>
  );
}

const ContainerHOC = React.memo(Container);
export default ContainerHOC;;
