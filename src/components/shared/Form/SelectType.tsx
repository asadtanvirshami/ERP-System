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
  options: any;
};

const SelectType = (props: Props) => {
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
             <label className={
            clsx(
              "block text-sm font-medium text-gray-700 mb-1",
              props.color
            )}
           >
              {props.label}
            </label>
            <select
              className={clsx(
                "p-2 border w-full border-[0.5]px rounded-md text-sm focus:outline-none focus:border-blue-500",
                props.width,
                props.color
              )}
              {...field}
            >
              {props.options.map((item:string, index:number) => {
                return (
                  <>
                <option key={index} value={item} >{item}</option>
                </>
                );
              })}
            </select>
          </div>
        )}
      />
    </>
  );
};

export default SelectType;
