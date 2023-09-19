import React from "react";
import { useRouter } from "next/router";
import classNames from "classnames";

type Props = {
  menu_: any;
  collapsed: boolean;
};

const color = {
  active_text: "text-gray-500",
  inctive_text: "text-white",
};

const MenuItems = (props: Props) => {
  const router = useRouter();

  return (
    <>
      <a
        href={props.menu_.link}
        className={classNames({
          "text-indigo-100 flex": true, //colors
          "transition-colors duration-200": true, //animation
          "rounded-md p-2 mx-3 gap-2": !props.collapsed,
          "rounded-full p-2 mx-3 w-10 h-10": props.collapsed,
        })}
      >
        {router.route == props.menu_.link ? (
          <props.menu_.svg
            className="w-6 h-6 text-gray-500 hover:text-white transition duration-75"
            alt={props.menu_.text}
          />
        ) : (
          <props.menu_.svg
            className="w-6 h-6 text-gray-500 hover:text-white transition duration-75"
            alt={props.menu_.text}
          />
        )}
        <span
          className={
            router.route == props.menu_.link
              ? `${color.inctive_text} `
              : `${color.active_text}`
          }
        >
          {!props.collapsed && props.menu_.text}
        </span>
      </a>
    </>
  );
};

const MenuItemsHOC = React.memo(MenuItems);
export default MenuItemsHOC;

