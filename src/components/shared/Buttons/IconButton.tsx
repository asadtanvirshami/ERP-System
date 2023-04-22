import React from "react";
import clsx from 'clsx'


type Props = { label: string; type: any, width:string };

const IconButton = (props: Props) => {
  return (
    <button
      type={props.type}
      className={clsx(
        "text-white border border-white bg-transparent font-semibold hover:bg-white hover:text-red-500 mt-4 focus:ring-4 focus:outline-none focus:ring-red-700 font-medium rounded-lg text-sm sm:w-100 px-5 py-2.5 text-center dark:bg-white dark:hover:bg-blue-700 dark:focus:ring-white",
        props.width,
      )}
    >
      {props.label}
    </button>
  );
};

export default IconButton;
