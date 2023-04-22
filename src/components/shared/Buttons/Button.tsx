import React from "react";
import clsx from 'clsx'


type Props = { label: string; type: any, style:string };

const Button = (props: Props) => {
  return (
    <button
      type={props.type}
      className={props.style}
    >
      {props.label}
    </button>
  );
};

export default Button;
