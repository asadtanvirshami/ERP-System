import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios, { AxiosResponse } from "axios";
//Components
import Input from "../../shared/Form/SecondaryInput";
import Button from "../../shared/Buttons/Button";
import Loading from "../../shared/Buttons/Loading";
//Redux
import { useSelector } from "react-redux";

type Props = {
  signUp: boolean;
  companyReg: boolean;
  setSignUp: (active: boolean) => void;
  setCompanyReg: (active: boolean) => void;
};

const CompanyRegSchema = yup.object().shape({
  //Yup schema to set the values
  cname: yup.string().required("Required"),
  location: yup.string().required("Required"),
  address: yup.string().required("Required"),
  type: yup.string().required("Required"),
  businessno: yup.string().required("Required"),
});

const CompanyReg = (props: Props) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>("");
  const id = useSelector((state: any) => state.form.value.id);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    //passing the props in the useForm yupResolver
    resolver: yupResolver(CompanyRegSchema),
  });

  const onSubmit = async (data: object) => {
    setLoading(true);
    //submiting the values to the API and saving in the db
    axios
      .post(process.env.NEXT_PUBLIC_ERP_POST_COMPANY as string, {
        data,
        id: id,
      })
      .then((r: AxiosResponse) => {
        if (r.data.status == "success") {
          setLoading(true);
          props.setCompanyReg(false);
          props.setSignUp(false);
        } else if (r.data.status == "exists") {
          setMessage("Account already exists!");
          setLoading(true);
        }
      });
    console.log(data);
  };

  return (
    <div className="flex h-screen align-middle justify-center items-center bg-gradient-to-r from-custom-red-500 to-custom-red-700">
      <div className=" justify-center align-middle">
        <h1 className="text-center font-body mb-14 font-semibold text-5xl text-white">
          Company Details {id}
        </h1>
        <form
          className="w-auto lg:w-96  mx-auto"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            register={register}
            name="cname"
            control={control}
            label="Company Name"
            width={'w-full'}
            color={'text-white'}
          />
          <Input
            register={register}
            name="location"
            control={control}
            label="Location"
            width={'w-full'}
            color={'text-white'}
          />
          <Input
            register={register}
            name="address"
            control={control}
            label="Address"
            width={'w-full'}
            color={'text-white'}
          />
          <Input
            register={register}
            name="type"
            control={control}
            label="Business Type"
            width={'w-full'}
            color={'text-white'}
          />
          <Input
            register={register}
            name="businessno"
            control={control}
            label="Business No."
            width={'w-full'}
            color={'text-white'}
          />
          <div className="text-center mb-4 ">
            {loading ? (
              <Loading style={"btn-primary"} />
            ) : (
              <Button style={"btn-primary"} type="submit" label="Register" />
            )}
          </div>
          <p className="text-white">{message}</p>
        </form>
      </div>
    </div>
  );
};

export default CompanyReg;
