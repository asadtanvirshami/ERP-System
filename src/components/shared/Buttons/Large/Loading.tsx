import React from "react";

type Props = {};

const LoadingButton = (props: Props) => {
  return (
    <button className="text-white border border-white bg-transparent font-semibold mt-4 font-medium rounded-lg text-sm w-full sm:w-100 px-5 py-2 text-center dark:bg-white dark:hover:bg-blue-700 dark:focus:ring-white">
      <div
        className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      ></div>
    </button>
  );
};

export default LoadingButton;
