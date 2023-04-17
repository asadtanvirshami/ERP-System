import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
//IMAGES SVG
import Dashboard from "../../../public/Image/Icons/svgs/Dashboard.svg";
import Agents from "../../../public/Image/Icons/svgs/Agents.svg";
import Logout from "../../../public/Image/Icons/svgs/Logout.svg";
import User from "../../../public/Image/Icons/svgs/User.svg";
//Components
import MenuItems from "./SideBar/MenuItems";

function Layout({ children }: { children: React.ReactNode }) {
  const [name, setName] = useState<any>("");
  const [email, setEmail] = useState<any>("");
  const [type, setType] = useState<any>("");
  const router = useRouter();

  useEffect(() => {
    let user = Cookies.get("user");
    let type = Cookies.get("type");
    setName(user);
    setType(type);
  }, []);

  const adminMenu = [
    { id: 0, text: "Dashboard", link: "/", svg: Dashboard },
    { id: 1, text: "Agents", link: "/agents", svg: Agents },
  ];
  const mangerMenu = [
    { id: 0, text: "Dashboard", link: "/", svg: Dashboard },
    { id: 1, text: "Agents", link: "/agents", svg: Agents },
  ];
  const agentMenu = [
    { id: 0, text: "Dashboard", link: "/", svg: Dashboard },
    { id: 1, text: "Agents", link: "/agents", svg: Agents },
  ];

  return (
    <>
      <div className="flex overflow-hidden bg-theme-700">
        <aside
          id="sidebar"
          className="fixed hidden z-20 h-full flex lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75"
          aria-label="Sidebar"
        >
          <div className="relative flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-theme-700 pt-0">
            <div className="text-center mt-4">
              <h1 className="font-body text-2xl text-white">RaloxSoft</h1>
            </div>
            <div className="flex-1 flex flex-col overflow-y-auto mt-3">
              <div className="flex-1 px-3 bg-theme-700 divide-y space-y-1">
                <ul className="space-y-2 pb-2">
                  {type == "admin" && (
                    <>
                      {adminMenu.map((menu_, i) => {
                        return (
                          <li key={i}>
                            <MenuItems menu_={menu_} />
                          </li>
                        );
                      })}
                    </>
                  )}
                  {type == "manager" && (
                    <>
                      {mangerMenu.map((menu_, i) => {
                        return (
                          <li key={i}>
                            <MenuItems menu_={menu_} />
                          </li>
                        );
                      })}
                    </>
                  )}
                  {type == "agent" && (
                    <>
                      {agentMenu.map((menu_, i) => {
                        return (
                          <li key={i}>
                            <MenuItems menu_={menu_} />
                          </li>
                        );
                      })}
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
          <div className="flex-shrink-0 overflow-hidden bg-theme-700">
            <hr />
            <div className="flex items-center h-full sm:justify-center xl:justify-start p-4">
              <User
                className="w-6 h-6 text-gray-500 hover:text-gray-900 transition duration-75"
                fill={"#fff"}
                src={User}
              />
              <div className="block sm:hidden xl:block ml-2 font-bold text-white">
                {name}
              </div>
              <div className="flex-grow block sm:hidden xl:block" />
              <button
                onClick={() => {
                  Cookies.remove("user"),
                    Cookies.remove("loginId"),
                    Cookies.remove("token"),
                    Cookies.remove("designation"),
                    Cookies.remove("type"),
                    router.push("/auth");
                }}
              >
                <Logout
                  className="block sm:hidden xl:block w-6 h-5"
                  fill={"#fff"}
                  src={Logout}
                />
              </button>
            </div>
          </div>
        </aside>
      </div>
      <div className="flex w-full">
        <div className="w-full h-screen hidden sm:block sm:w-20 xl:w-60 flex-shrink-0"></div>
        <div className=" h-screen flex-grow overflow-x-hidden overflow-auto flex flex-wrap content-start p-5">
          <div className="w-full sm:flex p-2 items-end">
            <div className="sm:flex-grow flex justify-between">
              <div className="">
                <div className="flex items-center">
                  <div className="text-3xl font-bold text-black">{name}</div>
                  <div className="flex items-center p-2 bg-card ml-2 rounded-xl">
                    <div className="ml-2 font-bold font-body">RaloxSoft</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="ml-2">{email}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full p-2">{children}</div>
        </div>
      </div>
    </>
  );
}

export default Layout;
