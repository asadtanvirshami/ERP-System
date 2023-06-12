import React, { useState } from "react";

type Props = {
  state: any;
};

const Popovers = ({ state }: Props) => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={()=>{setPopoverOpen(prev=>!prev)}}
        className="bg-red-500 hover:bg-red-600 text-white px-4  rounded focus:outline-none"
      >
        View
      </button>
      {popoverOpen && (
        <div className="popover-container shadow-md absolute mb-2 bottom-full left-1/5  transform -translate-x-1/2 inline-block items-end justify-center mt-2">
        <div className={"popover bg-white shadow-md rounded-md p-2 transition-all duration-300 max-h-16 overflow-y-auto fade-in"}>
          <span className="text-gray-700">
           {state}
          </span>
        </div>
      </div>
      )}
    </div>
  );
};

export default Popovers;
