import React from "react";
import PropagateLoader from "react-spinners/PropagateLoader";

function ThreeDots() {
  return (
    <div className="text-center" style={{position:"relative",top:"35vh"}}>
      <PropagateLoader className="h-5 w-5" color="red" />
  </div>
  );
}

export default ThreeDots;
