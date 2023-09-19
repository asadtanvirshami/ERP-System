import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

type Props = {
  onClick: any;
  title: string;
  activeTab: any;
  val: number;
};

const TabsCom = ({ title, onClick, activeTab, val }: Props) => {
  console.log(val, activeTab);
  return (
    <div className="mb-8">
      <div>
        <button
          key={activeTab}
          onClick={onClick}
          className={
            val == activeTab
              ? "text-white w-full rounded-lg bg-custom-red-500 transition-transform duration-300 ease-in-out "
              : "text-gray-500 w-full rounded-lg bg-gray-200"
          }
        >
          {title}
        </button>
      </div>
    </div>
  );
};

const TabsHOC = React.memo(TabsCom);
export default TabsHOC;
