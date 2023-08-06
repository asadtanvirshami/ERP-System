import React from "react";
import { Controller } from "react-hook-form";
import clsx from "clsx";

type Props = {
    register:any,
    name:string,
    label:string
    control:any,
    width:string,
    color:string
};


const Input = (props: Props) => {
  // console.log(props.name)
  return (
    <>
      <Controller
        name={`${props.name}`}
        defaultValue=""
        style={{minWidth:props.width}}
        control={props.control}
        {...props.register(`${props.name}`)}
        render={({ field }:any) => (
            <div className="relative z-0 w-full mb-6">
            <input
              placeholder=" "
              className={clsx(
                "block py-2.5 px-0 text-sm bg-transparent border-0 border-b-2 border-gray-300 appe  arance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus: peer",
                props.width,
                props.color
              )}
              {...field}
            />
            <label className={
            clsx(
              "peer-focus:font-medium absolute text-sm  dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus: peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6",
              props.color
            )}
           >
              {props.label}
            </label>
          </div>
        )}
      />
    </>
  );
};

export default Input;
