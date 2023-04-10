import React from "react";
import Image from "next/image";

import Brand from "../../public/Image/Icons/logo.png";
import Link from "next/link";

type Props = {};

const signin = (props: Props) => {
  return (
    <div
      data-cy="main-grid"
      className="grid items-center justify-center h-screen w-screen"
    >
      <div className="lg:grid lg:grid-cols-2 xl:grid xl:grid-cols-3 md:grid grid-cols-2 w-screen">
        <div className="hidden sm:flex h-screen align-middle justify-center items-center xl:col-span-2">
          <div className="justify-center align-middle items-center">
            <h1 className="text-center font-body mb-4 text-2xl">
              Powered By
            </h1>
            <Image
              alt="Ralox"
              src={Brand}
              className="w-4/5 h-4/5 p-5 mx-auto"
            />
          </div>
        </div>
        <div className="flex h-screen align-middle justify-center items-center bg-gradient-to-r from-custom-red-500 to-custom-red-700">
          <div className=" justify-center align-middle">
            <h1 className="text-center font-body mb-14 font-semibold text-5xl text-white">
              Sign In
            </h1>
  
              <form className="w-auto lg:w-96 grid">
                <div className=" relative z-0 w-full mb-6">
                  <input
                    type="email"
                    name="floating_email"
                    id="floating_email"
                    className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-white peer"
                    placeholder=" "
                    required
                  />
                  <label className="peer-focus:font-medium absolute text-sm text-white dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Email address
                  </label>
                </div>
                <div className="relative z-0 w-full mb-6 ">
                  <input
                    type="password"
                    name="floating_password"
                    id="floating_password"
                    className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-white focus:outline-none focus:ring-0 focus:border-white peer"
                    placeholder=" "
                    required
                  />
                  <label className="peer-focus:font-medium absolute text-sm text-white dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Password
                  </label>
                </div>
                <div className="text-center mb-4 ">
                  <button
                    type="submit"
                    className="text-white border border-white bg-transparent font-semibold hover:bg-white hover:text-red-500 mt-4 focus:ring-4 focus:outline-none focus:ring-red-700 font-medium rounded-lg text-sm w-full sm:w-100 px-5 py-2.5 text-center dark:bg-white dark:hover:bg-blue-700 dark:focus:ring-white"
                  >
                    Login
                  </button>
                </div>
              </form>
                <span className="mt-4 flex w-100"><p className="text-white font-extralight text-sm mx-1">Don't have an account?</p>
                <Link href="/signup" className="text-white font-semibold text-sm"><p> Create a new account.</p></Link>
                </span>
            </div>
          </div>
        </div>
      </div>
  );
};

export default signin;
