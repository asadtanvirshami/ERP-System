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
          <div className="block text-sm font-medium text-gray-700 mb-1">
            <select
              className={clsx(
                "p-2 border w-full border-[0.5]px rounded-md text-sm focus:outline-none focus:border-blue-500",
                props.width,
                props.color
              )}
              {...field}
            >
              <option className="hidden  rounded-md">{props.label}</option>

              <option className=" cursor-pointer rounded  rounded-md">High</option>
            </select>
          </div>
        )}
      />
    </>
  );
};

export default SelectType;
