import React from 'react';
import PropagateLoader from 'react-spinners/PropagateLoader';

function Loader() {
  return (
    <div className="mx-auto " style={{position:"relative",top:"35vh"}}>
      <PropagateLoader color="#36d7b7" />
    </div>
  );
}

export default Loader;
