import React from "react";
import User from "../../../../public/Image/Icons/svgs/User.svg";

type Props = {};

const Card = (props: Props) => {
  return (
    <div className="w-full p-2 lg:w-1/3">
      <div className="rounded-lg bg-white shadow-lg flex justify-between p-3 h-32 ">
        <div className="">
          <div className="flex items-center">
            <User
              className="w-6 h-6 text-gray-500 hover:text-gray-900 transition duration-75"
              fill={"pink"}
            />
            {/* <Image path={`mock_faces_${imgId}`} className="w-10 h-10" /> */}
            <div className="ml-2">
              <div className="flex items-center">
                <div className="mr-2 font-bold text-white">Asad Tvnri</div>
                {/* <Icon path="res-react-dash-tick" /> */}
              </div>
              <div className="text-sm ">34</div>
            </div>
          </div>

          <div className="text-sm  mt-2">44 from 5 tasks completed</div>
          <svg
            className="w-44 mt-3"
            height="6"
            viewBox="0 0 200 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="200" height="6" rx="3" fill="#2D2D2D" />
            <rect x="38" width="2" height="6" fill="#171717" />
            <rect x="78" width="2" height="6" fill="#171717" />
            <rect x="118" width="2" height="6" fill="#171717" />
            <rect x="158" width="2" height="6" fill="#171717" />
            <defs>
              <linearGradient id="paint0_linear" x1="0" y1="0" x2="1" y2="0">
                <stop stopColor="#8E76EF" />
                <stop offset="1" stopColor="#3912D2" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-sm ">Last 6 month</div>
        </div>
      </div>
    </div>
  );
};

const ProgressCardHOC = React.memo(Card);
export default ProgressCardHOC;
