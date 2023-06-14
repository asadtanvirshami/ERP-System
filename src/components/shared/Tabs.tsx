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
    <div>
      <div>
        <button
          key={activeTab}
          onClick={onClick}
          className={val == activeTab ? "text-white w-full rounded-lg bg-custom-red-700" : ""}
        >
          {title}
        </button>
      </div>
      ++
      
    </div>
  );
};

export default TabsCom;
