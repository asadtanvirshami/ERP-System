import React,{useEffect} from "react";

type Props = {};

const InfoSection = (props: Props) => {
  useEffect(() => {}, [])
  
  return (
    <>
      {" "}
      <div className="w-full sm:flex p-2 items-end">
        <div className="sm:flex-grow flex justify-between">
          <div className="">
            <div className="flex items-center">
              <div className="text-3xl font-bold text-body text-theme-700 ">
           
              </div>
              <div className="flex items-center p-2 bg-card ml-2 rounded-xl">
                {/* <Icon path="res-react-dash-premium-star" /> */}

                <div className="ml-2 font-bold text-body text-theme-700">
                  PREMIUM
                </div>
              </div>
            </div>
            <div className="flex items-center">
              {/* <Icon
          path="res-react-dash-date-indicator"
          className="w-3 h-3"
        /> */}
              <p className="ml-2 text-body text-theme-700 ">October 26</p>
            </div>
          </div>
          {/* <IconButton
      icon="res-react-dash-sidebar-open"
      className="block sm:hidden"
      onClick={onSidebarHide}
    /> */}
        </div>
      </div>
    </>
  );
};

export default InfoSection;
