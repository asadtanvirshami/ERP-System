import React from "react";
import { GetStaticProps } from 'next';
import Cookies from "js-cookie";
import axios, { AxiosResponse } from "axios";
//Components
import Signin from "../components/layout/Auth/SignIn";
import Signup from "../components/layout/Auth/SignUp";
import CompanyReg from "../components/layout/Auth/CompanyReg";
import Loader from "../components/shared/Loader/ThreeDots";

type Props = {
  sessionData: object;
};

const auth = (props: Props) => {
  const [signUp, setSignUp] = React.useState<boolean>(false);
  const [companyReg, setCompanyReg] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);

  return (
    <div
      data-cy="main-grid"
      className="grid items-center justify-center h-screen w-screen"
    >
      <div className="lg:grid lg:grid-cols-2 xl:grid xl:grid-cols-3 md:grid grid-cols-2 w-screen">
        <div className="hidden sm:flex h-screen align-middle justify-center items-center xl:col-span-2">
          <div className="justify-center align-middle items-center">
            <h1 className="mx-auto text-8xl font-body font-bold text-red-500">
             ManagementX
            </h1>
            <div className="flex inline-block align-middle justify-center mt-5">
              <div className="p-2 font-body text-2xl">
                {loading && <Loader/>}
                ERP System by{" "}
                <a href={"https://raloxsoft.com/"} className="">
                  Raloxsoft.com
                </a>
              </div>
            </div>
          </div>
        </div>
        {!signUp && !companyReg && (
          <Signin
            signUp={signUp}
            setSignUp={setSignUp}
            setLoading={setLoading}
            loading={loading}
            sessionData={props.sessionData}
          />
        )}
        {signUp && !companyReg && (
          <Signup
            setCompanyReg={setCompanyReg}
            companyReg={companyReg}
            signUp={signUp}
            setSignUp={setSignUp}
          />
        )}
        {signUp && companyReg && (
          <CompanyReg
            setCompanyReg={setCompanyReg}
            companyReg={companyReg}
            signUp={signUp}
            setSignUp={setSignUp}
          />
        )}
      </div>
    </div>
  );
};

export default auth;

export const getStaticProps: GetStaticProps = async () => {
  // Fetch data from external API
  const sessionData = await axios
    .get(process.env.NEXT_ERP_TOKEN_VERIFICATION as string, {
      headers: {
        "x-access-token": `${Cookies.get("token")}`,
        email: `${Cookies.get("email")}`,
        id: `${Cookies.get("id")}`,
      },
    })
    .then((r: AxiosResponse) => r.data);

  const sessionRequest = await sessionData;

  // Pass data to the page via props
  return {
    props: { sessionData: sessionRequest },
  };
};
