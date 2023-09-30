import React, { useRef } from "react";
import classNames from "classnames";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
//ICON IMPORTS & SVGs
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";
import Logout from "../../../../public/Image/Icons/svgs/Logout.svg";
//Component imports
import MenuItems from "./MenuItems";
//UTILs Imports
import { adminMenu, agentMenu } from "@/src/utils/Menus/";
import { Avatar, IconButton } from "@material-tailwind/react";

import { User } from "../../layout/User/UserProvider";

// add NavItem prop to component prop
type Props = {
  collapsed: boolean;
  setCollapsed(collapsed: boolean): void;
};

const Sidebar = ({ collapsed, setCollapsed }: Props) => {
  const router = useRouter();
  const {
    user: { name, companyName, profile, logo },
  } = User();

  const Icon = collapsed ? ChevronDoubleRightIcon : ChevronDoubleLeftIcon;
  return (
    <div
      className={classNames({
        "borderrounded-t-3xl fixed md:static md:translate-x-0 z-20 ": true,
        "transition-all duration-300 ease-in-out": false,
        "w-[250px]": !collapsed,
        "w-16": collapsed,
      })}
    >
      <div
        className={classNames({
          " flex flex-col justify-between h-screen sticky inset-0 w-full  ":
            true,
        })}
      >
        {/* logo and collapse button */}
        <div
          className={classNames({
            "flex items-center border-b border-b-white transition-none": true,
            "p-4 justify-between": !collapsed,
            "py-4 justify-center": collapsed,
          })}
        >
          {!collapsed && (
            <span className="flex items-center whitespace-nowrap font-body">
              <div className="ml-1 mr-3">
                <Avatar className="w-10 h-10 sm:hidden xl:block" src={logo} />
              </div>
              <p className="text-center align-middle items-center">{companyName?.toUpperCase()}</p>
            </span>
          )}
          <button
            className="grid place-content-center hover:bg-custom-red-700 w-10 h-10 rounded-full opacity-0 md:opacity-100"
            onClick={() => setCollapsed(!collapsed)}
          >
            <Icon className="w-5 h-5" />
          </button>
        </div>
        <nav className="flex-grow">
          <ul
            className={classNames({
              "my-2 flex flex-col gap-2 items-stretch": true,
            })}
          >
            <ul
              className={classNames({
                "my-2 flex flex-col gap-2 items-stretch": true,
              })}
            >
              {adminMenu.map((menu_, i) => {
                return (
                  <li className="font-body font-semibold" key={menu_.id}>
                    <MenuItems collapsed={collapsed} menu_={menu_} />
                  </li>
                );
              })}
            </ul>
          </ul>
        </nav>
        <div
          className={classNames({
            "grid place-content-stretch p-4 ": true,
          })}
        >
          <div className="flex gap-4 items-center h-12 max-w-full overflow-hidden">
            {/* <User
              className="w-6 h-6 text-gray-500 hover:text-gray-900 transition duration-75"
              fill={"#fff"}
              src={User}
            /> */}
            {!profile ? (
              <IconButton
                color="red"
                ripple={true}
                variant="gradient"
                className={
                  collapsed
                    ? "rounded-full hover:shadow-none w-8 h-8 transition duration-75"
                    : "rounded-full hover:shadow-none "
                }
              >
                <span> {name?.charAt(0).toUpperCase()}</span>
              </IconButton>
            ) : (
              <Avatar className="sm:hidden xl:block" src={profile} />
            )}
            {!collapsed && (
              <div className="=flex items-center h-full sm:justify-center xl:justify-start ">
                <div className="sm:hidden xl:block font-bold text-white">
                  {name?.toUpperCase("0")}
                </div>
                <Link href="." className="color-white text-sm">
                  View Profile
                </Link>
                <button
                  className="float-right "
                  onClick={() => {
                    Cookies.remove("_hjSession"), router.push("/auth");
                  }}
                >
                  <Logout
                    className="block sm:hidden xl:block w-6 h-5 ml-10"
                    fill={"#fff"}
                  />
                </button>
                <div className="flex-grow block sm:hidden xl:block" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
const SidebarHOC = React.memo(Sidebar);
export default SidebarHOC;
