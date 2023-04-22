import React from "react";
import InfoSection from "../InfoSection";

function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full">
      <div className=" h-screen flex-grow overflow-x-hidden overflow-auto flex flex-wrap content-start p-2">
        <InfoSection />
        {children}
      </div>
    </div>
  );
}

export default Container;
