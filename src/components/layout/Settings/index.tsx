import React, { useState } from "react";

import { settingMenu } from "@/src/utils/Menus";

import CreateOptions from "./CreateOptions";

type Props = {};

const Settings = (props: Props) => {
  const [active, setActive] = useState<number>(0);
  const flattenedMenus = settingMenu.flatMap((item) => item.menu);

  const renderStep = () => {
    switch (active) {
      case 5:
        return <CreateOptions />;

      default:
        return null;
    }
  };
  return (
    <div className="">
      <div className="flex flex w-full lg:flex-row">
        <div className="bg-gradient-to-r border rounded-lg from-gray-200 to-white lg:h-screen lg:w-1/4">
          <div className="flex p-12">
            <h2 className=" font-body font-semibold text-black lg:text-4xl">
              Settings
            </h2>
          </div>
          <div className="pl-12">
            {settingMenu.map((item, index) => {
              return (
                <>
                  <span>
                    <h2
                      key={item.title}
                      className="font-body font-semibold pt-2 pb-2"
                    >
                      {item.title}
                    </h2>
                  </span>
                  <ul className="p-1">
                    {item.menu.map((menu, i) => {
                      const flatIndex = flattenedMenus.findIndex(
                        (flatMenu) => flatMenu.label === menu.label
                      );
                      return (
                        <li
                          onClick={() => setActive(flatIndex)}
                          key={menu.label}
                          className={`p-1 cursor-pointer ${
                            active === flatIndex ? "text-custom-red-500" : ""
                          }`}
                        >
                          {menu.label}
                        </li>
                      );
                    })}
                  </ul>
                </>
              );
            })}
          </div>
        </div>
        {renderStep()}
      </div>
    </div>
  );
};

export default Settings;
