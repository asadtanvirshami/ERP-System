import React from "react";
import { Controller } from "react-hook-form";
import clsx from "clsx";

type Props = {
  register: any;
  name: string;
  label: string;
  control: any;
  width: string;
  color: string;
};

const SelectType = (props: Props) => {
  // console.log(props.name)
  return (
    <>
      <Controller
        name={`${props.name}`}
        defaultValue=""
        style={{ minWidth: props.width }}
        control={props.control}
        {...props.register(`${props.name}`)}
        render={({ field }: any) => (
          <div className="relative z-0 mb-6">
            <select
              className={clsx(
                " py-2.5 px-0 text-sm bg-transparent border-0 border-b-2 border-gray-300 w-full dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus: peer",
                props.width,
                props.color
              )}
              {...field}
            >
              <option className="hidden">{props.label}</option>

              <option className=" cursor-pointer rounded">High</option>
            </select>
          </div>
        )}
      />
    </>
  );
};

export default SelectType;
