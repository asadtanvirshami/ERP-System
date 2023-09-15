import React, { useState, useEffect, Fragment } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
//Components Import
import Input from "@/src/components/shared/Form/Input";
import Button from "@/src/components/shared/Buttons/Button";
import Loader from "@/src/components/shared/Buttons/Loading";
import TextArea from "@/src/components/shared/Form/TextArea";
//Interface Import
import { Clients } from "@/src/interfaces/Clients";
import { useSelector } from "react-redux";
//BaseValues for Schema
import { agentBaseValues } from "@/src/utils/baseValues";
import SelectType from "../../shared/Form/SelectType";
//API Calls
import { CreateNewClient, UpdateClient } from "@/src/utils/api/clients";

type Props = {
  data: Array<Clients>;
  setData: any;
};

const SignupSchema = yup.object().shape({
  //Yup schema to set the values
  name: yup.string().required("Required"),
  city: yup.string().required("Required"),
  country: yup.string().required("Required"),
  source: yup.string().required("Required"),
  source_link: yup.string().required("Required"),
  comments: yup.string().required("Required"),
  address: yup.string().required("Required"),
  phone: yup.string().max(11).required("Required"),
  email: yup.string().email("Must be an email").required("Required"),
});

const ClientsCE = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  // const [clientId, setClientId] = useState("");
  //Redux initialize
  const edit = useSelector((state: any) => state.form.value.edit);
  const client_id = useSelector((state: any) => state.form.value._id);
  const client_data = useSelector((state: any) => state.form.value.values);
  const companyId = useSelector((state: any) => state.user.user.companyId);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    //passing the props in the useForm yupResolver
    resolver: yupResolver(SignupSchema),
    defaultValues: client_data,
  });

  useEffect(() => {
    let tempState = {};
    if (edit == true) {
      const tempData = [...props.data];
      tempData.forEach((e, i) => {
        if (e.id == client_id) {
          return (tempState = { ...e });
        }
      });
      reset(tempState);
    }
    if (edit == false) {
      reset(agentBaseValues);
    }
  }, [edit]);

  const onSubmit = async (data: object) => {
    setLoading(true);
    //submiting the values to the API and saving in the db
    const createdClient = await CreateNewClient(companyId, data);
    if (createdClient) {
      if (createdClient.error == null) {
        let tempArr;
        setLoading(false);
        setMessage("Client created successfully.");
        tempArr = [...props.data, createdClient.client];
        return props.setData(tempArr);
      } else {
        setLoading(false);
        setMessage("Client not created.");
      }
    } else {
      setLoading(true);
      setMessage("Error occured please wait.");
    }
  };

  const onEdit = async (data: object) => {
    setLoading(true);
    //submiting the values to the API and saving in the db
    const updatedClient = await UpdateClient(client_id, data);
    if (updatedClient) {
      if (updatedClient.error === null) {
        setLoading(false);
        setMessage("Agent edited successfully.");
        const tempState: Array<any> = [...props.data];
        const i = tempState.findIndex((item) => item.id === client_id);
        if (i !== -1) {
          tempState[i] = data;
          return props.setData(tempState);
        }
      } else {
        setLoading(true);
        setMessage("Client not edited!");
      }
    } else {
      setLoading(true);
      setMessage("Error ocurred please wait.");
    }
  };

  return (
    <Fragment>
      <form
        className="w-auto mx-auto lg:w-full mt-4 justify-center grid"
        onSubmit={handleSubmit(edit ? onEdit : onSubmit)}
      >
        <div className="grid grid-cols-2 items-center gap-4 mb-2">
          <Input
            placeholder="John Doe"
            register={register}
            name="name"
            control={control}
            label="Full name"
            width={"w-full"}
            color={"text-gray"}
          />
          <Input
            placeholder="+1"
            register={register}
            name="phone"
            control={control}
            label="Phone No."
            width={"w-30"}
            color={"text-gray"}
          />
          <Input
            placeholder="xyz@gmail.com"
            register={register}
            name="email"
            control={control}
            label="Email"
            width={"w-30"}
            color={"text-gray"}
          />
          <Input
            placeholder="West Ave street 2"
            register={register}
            name="address"
            control={control}
            label="Address"
            width={"w-30"}
            color={"text-gray"}
          />
          <Input
            placeholder="United States"
            register={register}
            name="country"
            control={control}
            label="Country"
            width={"w-30"}
            color={"text-gray"}
          />
          <Input
            placeholder="Salem, VA"
            register={register}
            name="city"
            control={control}
            label="City"
            width={"w-30"}
            color={"text-gray"}
          />
          {/* <SelectType
            register={register}
            name="source"
            control={control}
            label="Source"
            width={"w-30"}
            color={"text-gray"}
          /> */}
          <Input
            placeholder="LinkedIn"
            register={register}
            name="source"
            control={control}
            label="Source"
            width={"w-30"}
            color={"text-gray"}
          />
          <Input
            placeholder="www.LinkedIn.com"
            register={register}
            name="source_link"
            control={control}
            label="Source Link"
            width={"w-30"}
            color={"text-gray"}
          />
        </div>
        <TextArea
          register={register}
          name="comments"
          control={control}
          label=""
          width={"w-30"}
          placeholder={"Leave some comments about client."}
          color={"text-gray"}
        />
        <div className="mt-3">
          {loading ? (
            <Loader style="bg-red-500 text-white py-1.5 px-5 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300" />
          ) : (
            <Button
              style="bg-red-500 text-white py-1.5 px-5 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
              label={edit ? "Update" : "Create"}
              type="submit"
            />
          )}
        </div>
        <p className="text-sm mt-2">{message}</p>
      </form>
    </Fragment>
  );
};

export default ClientsCE;
