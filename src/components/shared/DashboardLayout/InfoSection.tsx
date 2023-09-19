import React from "react";
import moment from "moment";

import { User } from "../../layout/User/UserProvider";

type Props = {};

const InfoSection = (props: Props) => {

  const {user} = User()

  return (
    <>
      {" "}
      <div className="w-full sm:flex p-2 items-end">
        <div className="sm:flex-grow flex justify-between">
          <div className="">
            <div className="flex items-center">
              <div className="text-3xl font-bold font-body text-theme-700 ">
                {user.name?.toUpperCase()}
              </div>
              <div className="flex items-center p-2 bg-card ml-2 rounded-xl">
                {/* <Icon path="res-react-dash-premium-star" /> */}-
                <div className="ml-2 font-bold font-body text-theme-700">
                  {user.designation}
                </div>
              </div>
            </div>
            <div className="flex items-center">
              {/* <Icon
          path="res-react-dash-date-indicator"
          className="w-3 h-3"
        /> */}
              <p className="font-body">{user.email}</p>
            </div>
              <p className="font-body text-theme-700 font-semibold">{moment().format('MMMM Do YYYY')}</p>
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

const InfoSectionHOC = React.memo(InfoSection);
export default InfoSectionHOC;
