import React from "react";
import classNames from "classnames";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";
import Logout from "../../../../public/Image/Icons/svgs/Logout.svg";
import MenuItems from "./MenuItems";
import { adminMenu, agentMenu } from "@/src/utils/Menus/";
import { Avatar, IconButton } from "@material-tailwind/react";
import { useUser } from "../../layout/User/UserProvider";

type Props = {
  collapsed: boolean;
  setCollapsed(collapsed: boolean): void;
};

const Sidebar = ({ collapsed, setCollapsed }: Props) => {
  const router = useRouter();
  const {
    user: { name, companyName, profile, logo, type },
  } = useUser();

  const currentMenu = type === "admin" ? adminMenu : agentMenu;

  return (
    <div className="bg-theme-700 border border-none shadow-lg rounded-tr-2xl rounded-br-2xl text-white">
    <div
      className={classNames(
        "borderrounded-t-3xl fixed md:static md:translate-x-0 z-20",
        {
          "w-[250px]": !collapsed,
          "w-16": collapsed,
        }
      )}
    >
      <div className="flex flex-col justify-between h-screen sticky inset-0 w-full">
        <header className={classNames("flex items-center border-b border-b-white p-4", { "justify-between": !collapsed, "justify-center": collapsed })}>
          {!collapsed && (
            <span className="flex items-center whitespace-nowrap font-body">
              <Avatar className="ml-2 mr-3 w-10 h-10" src={logo} />
              {companyName?.toUpperCase()}
            </span>
          )}
          <button
            className="grid place-content-center hover:bg-custom-red-700 w-10 h-10 rounded-full"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <ChevronDoubleRightIcon className="w-5 h-5" /> : <ChevronDoubleLeftIcon className="w-5 h-5" />}
          </button>
        </header>

        <nav className="flex-grow">
          <ul className="my-2 flex flex-col gap-2 items-stretch">
            {currentMenu.map((menu_) => (
              <li className="font-body font-semibold" key={menu_.text}>
                <MenuItems collapsed={collapsed} menu_={menu_} />
              </li>
            ))}
          </ul>
        </nav>

        <footer className="grid place-content-stretch p-4">
        <div className="flex gap-4 items-center h-12 max-w-full overflow-hidden">
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
                    Cookies.remove("_hjSession"),
                      Cookies.remove("user"),
                      router.push("/auth");
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
        </footer>
      </div>
    </div>
    </div>
  );
};

export default React.memo(Sidebar);
