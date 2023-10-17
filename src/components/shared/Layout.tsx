import React, { useState } from "react";
import classNames from "classnames";

//Components
import Sidebar from "./SideBar";

function Layout({ children }: { children: React.ReactNode }) {

  const [collapsed, setSidebarCollapsed] = useState(false);
  
  return (
    <>
      <div
        className={classNames({
          // use grid layout
          "grid min-h-screen": true,
          // toggle the width of the sidebar depending on the state
          "grid-cols-sidebar": !collapsed,
          "grid-cols-sidebar-collapsed": collapsed,
          // transition animation classes
          "transition-[grid-template-columns] duration-300 ease-in-out": true,
        })}
      >
        {/* sidebar */}
        {/* <div className="bg-gradient-to-r border rounded-lg from-gray-300 to-white shadow-lg rounded-tr-2xl rounded-br-2xl text-red"> */}

        <Sidebar
          collapsed={collapsed}
          setCollapsed={() => setSidebarCollapsed((prev) => !prev)}
        />

        {/* content */}
        <main className=" h-screen flex-grow overflow-x-hidden overflow-auto flex-wrap content-start p-2">
          <>{children}</>
        </main>
      </div>
    </>
  );
}

const MainLayoutHOC = React.memo(Layout);
export default MainLayoutHOC;
