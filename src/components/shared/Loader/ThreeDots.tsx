import React from "react";
import PropagateLoader from "react-spinners/PropagateLoader";

function ThreeDots() {
  return (
    <div className="text-center" style={{position:"relative",top:"35vh"}}>
      <PropagateLoader color="red" />
  </div>
  );
}

export default ThreeDots;
