import React from "react";
import { Spinner } from "@material-tailwind/react";

type Props = {};

const CricleSpinner = (props: Props) => {
  return (
    <div className="flex justify-center items-cente">
      <div className="mx-auto">
        <Spinner color="red" />
      </div>
    </div>
  );
};

export default CricleSpinner;
