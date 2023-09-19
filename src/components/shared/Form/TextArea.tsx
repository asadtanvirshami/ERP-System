import React from "react";
import { Controller } from "react-hook-form";

type Props = {
  register: any;
  name: string;
  label: string;
  control: any;
  width: string;
  color: string;
  placeholder:any;
};

const TextArea = (props: Props) => {
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
          <div className="mb-[0.125rem] mr-4 inline-block min-h-[1.5rem] pl-[1.5rem]">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              {props.label}
            </label>
            <textarea
              className="border text-sm rounded-md border-gray-300 p-2 w-full h-24 resize-none focus:outline-none focus:border-blue-500"
              placeholder={props.placeholder}
              {...field}
            ></textarea>
          </div>
        )}
      />
    </>
  );
};

const TextAreaHOC = React.memo(TextArea);
export default TextAreaHOC;
