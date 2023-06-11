import React, { useState, useEffect, Fragment } from "react";
import { useForm  } from "react-hook-form";
import axios, { AxiosResponse } from "axios";
import * as yup from "yup";
import Cookies from "js-cookie";
import { yupResolver } from "@hookform/resolvers/yup";
//Components Import
import Input from "@/src/components/shared/Form/Input";
import Button from "@/src/components/shared/Buttons/Button";
import Loader from "@/src/components/shared/Buttons/Loading";
import TextArea from "@/src/components/shared/Form/TextArea";
//Interface Import
import { Agents } from "@/src/interfaces/Agents";
//Function Import
import { checkIsTwoDArray } from "@/src/functions/checkArray";
//Redux
import { useSelector } from "react-redux";
//BaseValues for Schema
import { agentBaseValues } from "@/src/utils/baseValues";
import SelectType from "../Form/SelectType";

type Props = {
  data:Array<Agents>
  setData:any
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
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [clientId, setClientId] = useState("")
  //Redux initialize
  const edit = useSelector((state: any) => state.form.value.edit);
  const client_id = useSelector((state: any) => state.form.value._id);
  const client_data = useSelector((state: any) => state.form.value.values);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    //passing the props in the useForm yupResolver
    resolver: yupResolver(SignupSchema),
    defaultValues:client_data
  });

  useEffect(() => {
    setClientId(client_id);
    let tempState = {};
    if (edit == true) {
      const check = checkIsTwoDArray(props.data)
      if(check){
        const data:any = props.data[2]
        const tempData = [...data];
        tempData.forEach((e, i) => {
          if (e.id == client_id) {
            return tempState = { ...e };
          }
        });
        reset(tempState);
      }else{        
        const tempData = [...props.data];
        tempData.forEach((e, i) => {
          if (e.id == client_id) {
            return tempState = { ...e };
          }
        });
        reset(tempState);
      }
    }
    if (edit == false) {
      reset(agentBaseValues);
    }
  }, [edit]);

  const onSubmit = async (data: object) => {
    setLoading(true);
    let companyId = Cookies.get("company");
    //submiting the values to the API and saving in the db
    axios
      .post(process.env.NEXT_PUBLIC_ERP_CREATE_CLIENT as string, {
        data,
        id: companyId,
      })
      .then((r: AxiosResponse) => {
        if (r.data.message == "success") {
          let tempArr;
          setLoading(false);
          setMessage("Client created successfully.");
          const check = checkIsTwoDArray(props.data)
          if(check){
            const newData:any = props.data
            tempArr = [...newData];
            tempArr[2].push(r.data.payload) 
            return props.setData(tempArr);
          }else{
            tempArr = [...props.data, r.data.payload];
            return props.setData(tempArr);
          }
        } else if (r.data.message == "error") {
          setLoading(false);
          setMessage("Error Occured!");
        }
      });
  };

  const onEdit = async (data: object) => {
    setLoading(true);
    //submiting the values to the API and saving in the db
    axios
      .post(process.env.NEXT_PUBLIC_ERP_UPDATE_CLIENT as string, {
        data,
        id: clientId,
      })
      .then((r: AxiosResponse) => {
        if (r.data.message == "success") {
          setLoading(false);
          setMessage("Agent edited successfully.");
          const check = checkIsTwoDArray(props.data)
          if(check){
            const tempState: Array<any> = [...props.data];
            const i = tempState[2].findIndex((item:any) => item.id === client_id);
            if (i !== -1) {
              tempState[2][i]= data;
              return props.setData(tempState)
            }
          }else{
            const tempState: Array<any> = [...props.data];
            const i = tempState.findIndex((item) => item.id === client_id);
            if (i !== -1) {
              tempState[i] = data;
              return props.setData(tempState)
            }
          }
        } else if (r.data.message == "error") {
          setLoading(false);
          setMessage("Client not edited!");
        }
      });
  };
 

  return (
    <Fragment>
      <form
        className="w-auto mx-auto lg:w-full mt-4 justify-center grid"
        onSubmit={handleSubmit(edit?onEdit:onSubmit)}
      >
        <div className="grid grid-cols-2 items-center gap-4 mb-2">
          <Input
            register={register}
            name="name"
            control={control}
            label="Full name"
            width={"w-full"}
            color={"text-gray"}
          />
          <Input
            register={register}
            name="phone"
            control={control}
            label="Phone No."
            width={"w-30"}
            color={"text-gray"}
          />
          <Input
            register={register}
            name="email"
            control={control}
            label="Email"
            width={"w-30"}
            color={"text-gray"}
          />
          <Input
            register={register}
            name="address"
            control={control}
            label="Address"
            width={"w-30"}
            color={"text-gray"}
          />
          <Input
            register={register}
            name="country"
            control={control}
            label="Country"
            width={"w-30"}
            color={"text-gray"}
          />
          <Input
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
            register={register}
            name="source"
            control={control}
            label="Source"
            width={"w-30"}
            color={"text-gray"}
          />
          <Input
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
          {loading?<Loader style="btn-secondary"/>:<Button style="btn-secondary" label={edit?"Update":"Create"} type="submit" />}
        </div>
        <p className="text-sm mt-2">{message}</p>
      </form>
    </Fragment>
  );
};

export default ClientsCE;
