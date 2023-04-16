import React, { ButtonHTMLAttributes } from "react";

type Props = {label:string, type:any};

const ButtonLg = (props: Props) => {
  return (
    <button
      type={props.type}
      className="text-white border border-white bg-transparent font-semibold hover:bg-white hover:text-red-500 mt-4 focus:ring-4 focus:outline-none focus:ring-red-700 font-medium rounded-lg text-sm w-full sm:w-100 px-5 py-2.5 text-center dark:bg-white dark:hover:bg-blue-700 dark:focus:ring-white"
    >
      {props.label}
    </button>
  );
};

export default ButtonLg;
