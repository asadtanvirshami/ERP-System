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
import User from "../../../../public/Image/Icons/svgs/User.svg";
import Logout from "../../../../public/Image/Icons/svgs/Logout.svg";
//Component imports
import MenuItems from "./MenuItems";
//UTILs Imports
import { adminMenu } from "@/src/utils/Menus/Admin";

// add NavItem prop to component prop
type Props = {
  collapsed: boolean;
  setCollapsed(collapsed: boolean): void;
};

const Sidebar = ({ collapsed, setCollapsed }: Props) => {
  const router = useRouter();
  const Icon = collapsed ? ChevronDoubleRightIcon : ChevronDoubleLeftIcon;
  return (
    <div
      className={classNames({
        "bg-theme-700 text-zinc-50 fixed md:static md:translate-x-0 z-20": true,
        "transition-all duration-300 ease-in-out": false,
        "w-[300px]": !collapsed,
        "w-16": collapsed,
      })}
    >
      <div
        className={classNames({
          "flex flex-col justify-between h-screen sticky inset-0 w-full": true,
        })}
      >
        {/* logo and collapse button */}
        <div
          className={classNames({
            "flex items-center border-b border-b-custom-red-700 transition-none":
              true,
            "p-4 justify-between": !collapsed,
            "py-4 justify-center": collapsed,
          })}
        >
          {!collapsed && <span className="whitespace-nowrap font-body">ManagementX</span>}
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
                  <li>
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
          <div className="flex gap-4 items-center h-11 overflow-hidden">
            <User
              className="w-6 h-6 text-gray-500 hover:text-gray-900 transition duration-75"
              fill={"#fff"}
              src={User}
            />
            {!collapsed && (
              <div className="=flex items-center h-full sm:justify-center xl:justify-start ">
                <div className=" sm:hidden xl:block font-bold text-white">
                  Jacob Williams
                </div>
                <Link href="." className="color-white text-sm">
                  View Profile
                </Link>
                <button
                  className="float-right"
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
                    className="block sm:hidden xl:block w-6 h-5 ml-28"
                    fill={"#fff"}
                    src={Logout}
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
export default Sidebar;
