import React from "react";

type Props = {};

const Settings = (props: Props) => {
  return (
    <div className="container">
      <div className="flex flex-col lg:flex-row">
        <div className="bg-gradient-to-r border rounded-lg from-gray-200 to-white lg:h-screen lg:w-1/4">
          <div className="flex p-12">
            <h2 className=" font-body font-semibold text-black lg:text-4xl">
              Settings
            </h2>
          </div>
          <div className="pl-12">
            <span><h2 className="font-body font-semibold pt-2 pb-2">Account</h2></span>
            <ul className="p-1">
              <li className="p-1">Profile account</li>
              <li className="p-1">Company account</li>
            </ul>
            <span><h2 className="font-body font-semibold pt-2 pb-2">Security & Privacy</h2></span>
            <ul className=" p-1">
              <li className="p-1">Reset Email</li>
              <li className="p-1">Reset Password</li>
            </ul>
            <span><h2 className="font-body font-semibold pt-2 pb-2">Option sets</h2></span>
            <ul className=" p-1">
              <li className="p-1">Sources</li>
              <li className="p-1">Reset Password</li>
            </ul>
          </div>
        </div>
        <div className="lg:w-2/3 p-5 overflow-y-auto  flex items-center justify-center align-middle">
          <div className=" ">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
              voluptas aut esse, dolorem, maxime distinctio ducimus quidem
              molestias quas debitis ipsa hic odit natus. Sed eligendi incidunt
              quibusdam nihil ipsam!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
