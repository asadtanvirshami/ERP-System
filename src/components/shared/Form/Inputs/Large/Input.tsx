import React from "react";
import { Controller } from "react-hook-form";

type Props = {
    register:any,
    name:string,
    label:string
    control:any
};


const Input = (props: Props) => {
  // console.log(props.name)
  return (
    <>
      <Controller
        name={`${props.name}`}
        defaultValue=""
        control={props.control}
        {...props.register(`${props.name}`)}
        render={({ field }:any) => (
            <div className=" relative z-0 w-full mb-6">
            <input
              placeholder=" "
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-white peer"
              {...field}
            />
            <label className="peer-focus:font-medium absolute text-sm text-white dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              {props.label}
            </label>
          </div>
        )}
      />
    </>
  );
};

export default Input;
