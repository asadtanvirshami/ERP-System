import React from "react";
import PropagateLoader from "react-spinners/PropagateLoader";
import clsx from 'clsx'
type Props = { style:string };

const LoadingButton = (props: Props) => {
  return (
<button
      className={props.style}
    >
      <div
        className="h-5 w-5 flex mx-auto animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status">
      </div>
    </button>
  );
};

const LoadingButtonHOC = React.memo(LoadingButton);
export default LoadingButtonHOC;
