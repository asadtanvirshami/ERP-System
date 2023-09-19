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

const Checkbox = (props: Props) => {
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
            <input
              className="relative float-left cursor-pointer rounded -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] "
              type="checkbox"
              value=""
              id="checkboxDefault"
              {...field}
            />
            <label className="inline-block pl-[0.15rem] hover:cursor-pointer">
              {props.label}
            </label>
          </div>
        )}
      />
    </>
  );
};

const CheckboxHOC = React.memo(Checkbox);
export default CheckboxHOC;