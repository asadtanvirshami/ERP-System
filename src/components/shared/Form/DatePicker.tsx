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

const DatePicker = (props: Props) => {
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
          <div className="w-full mb-6">
            <label
              className={clsx(
                "block text-sm font-medium text-gray-700 mb-1",
                props.color
              )}
            >
              {props.label}
            </label>
            <input
              placeholder=" "
              className={clsx(
                "p-2 border w-full border-[0.5]px rounded-md text-sm focus:outline-none focus:border-blue-500",
                props.width,
                props.color
              )}
              type="date"
              value={"2023-06-03"}
              {...field}
            />
          </div>
        )}
      />
    </>
  );
};

const DatePickerHOC = React.memo(DatePicker);
export default DatePickerHOC;
