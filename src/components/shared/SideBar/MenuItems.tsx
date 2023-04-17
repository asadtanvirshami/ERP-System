import Image from "next/image";
import React, { useEffect } from "react";
import { FunctionExpression } from "typescript";
import { useRouter } from "next/router";

type Props = {
  menu_: any;
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
        className=" text-base font-normal rounded-lg flex items-center p-2"
      >
        {router.route == props.menu_.link ? (
          <props.menu_.svg
            className="w-6 h-6 text-gray-500 hover:text-gray-900 transition duration-75"
            fill={"white"}
            alt={props.menu_.text}
            src={props.menu_.svg}
          />
        ) : (
          <props.menu_.svg
            className="w-6 h-6 text-gray-500 hover:text-gray-900 transition duration-75"
            fill={"#9e9e9e"}
            alt={props.menu_.text}
            src={props.menu_.svg}
          />
        )}
        <span
          className={
            router.route == props.menu_.link
              ? `${color.inctive_text} ml-3`
              : `${color.active_text} ml-3`
          }
        >
          {props.menu_.text}
        </span>
      </a>
    </>
  );
};

export default MenuItems;
