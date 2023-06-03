import React, { useState, useEffect, Fragment } from "react";
import { useForm } from "react-hook-form";
import axios, { AxiosResponse } from "axios";
import * as yup from "yup";
import Cookies from "js-cookie";
import { yupResolver } from "@hookform/resolvers/yup";
//Components Import
import Input from "@/src/components/shared/Form/Input";
import Button from "@/src/components/shared/Buttons/Button";
import Loader from "@/src/components/shared/Buttons/Loading";
//Functions import
import { checkIsTwoDArray } from "@/src/functions/checkArray";
//Interface Import
import { Agents } from "@/src/interfaces/Agents";
//Redux
import { useSelector } from "react-redux";
//BaseValues for Schema
import { agentBaseValues } from "@/src/utils/baseValues";

type Props = {
  data: Array<Agents>;
  setData: any;
};

const SignupSchema = yup.object().shape({
  //Yup schema to set the values
  name: yup.string().required("Required"),
  designation: yup.string().required("Required"),
  address: yup.string().required("Required"),
  phone: yup.string().max(11).required("Required"),
  email: yup.string().email("Must be an email").required("Required"),
  password: yup.string().required("Required"),
});

const AgentCE = (props: Props) => {
  const [_data, _setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [agentId, setAgentId] = useState("");
  //Redux Selectors
  const edit = useSelector((state: any) => state.form.value.edit);
  const agent_id = useSelector((state: any) => state.form.value._id);
  const agent_data = useSelector((state: any) => state.form.value.values);
  
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    //passing the props in the useForm yupResolver
    resolver: yupResolver(SignupSchema),
    defaultValues: agent_data,
  });

  useEffect(() => {
    setAgentId(agent_id);
    let tempState = {};
    if (edit == true) {
      const check = checkIsTwoDArray(props.data)
      if(check){
        const data:any = props.data[0]
        const tempData = [...data];
        tempData.forEach((e, i) => {
          if (e.id == agent_id) {
            return tempState = { ...e };
          }
        });
        reset(tempState);
      }else{        
        const tempData = [...props.data];
        tempData.forEach((e, i) => {
          if (e.id == agent_id) {
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
      .post(process.env.NEXT_PUBLIC_ERP_POST_SIGNUP as string, {
        data,
        type: "agent",
        id: companyId,
      })
      .then((r: AxiosResponse) => {
        if (r.data.status == "success") {
          setLoading(false);
          setMessage("Agent created successfully.");
          const check = checkIsTwoDArray(props.data)
          if(check){
            const newData:any = props.data
            let tempArr = [...newData];
            tempArr[0].push(r.data.payload) 
            return props.setData(tempArr);
          }else{
            let tempArr = [...props.data, r.data.payload];
            return props.setData([tempArr]);
          }
        } else if (r.data.status == "error") {
          setLoading(false);
          setMessage("Agent already exits!");
        }
      });
  };

  const onEdit = async (data: object) => {
    setLoading(true);
    //submiting the values to the API and saving in the db
    axios
      .post(process.env.NEXT_PUBLIC_ERP_UPDATE_AGENT as string, {
        data,
        id: agentId,
      })
      .then((r: AxiosResponse) => {
        if (r.data.message == "success") {
          setLoading(false);
          setMessage("Agent edited successfully.");
          const check = checkIsTwoDArray(props.data)
          if(check){
            const tempState: Array<any> = [...props.data];
            const i = tempState[0].findIndex((item:any) => item.id === agent_id);
            if (i !== -1) {
              tempState[0][i]= data;
              return props.setData(tempState)
            }
          }else{
            const tempState: Array<any> = [...props.data];
            const i = tempState.findIndex((item) => item.id === agent_id);
            if (i !== -1) {
              tempState[i] = data;
              return props.setData(tempState)
            }
          }
        } else if (r.data.message == "error") {
          setLoading(false);
          setMessage("Agent not edited!");
        }
      });
  };

  return (
    <Fragment>
      <form
        className="w-auto mx-auto lg:w-full justify-center grid"
        onSubmit={handleSubmit(edit ? onEdit : onSubmit)}
      >
        <div className="grid grid-cols-2 items-center gap-4 mb-2">
          <Input
            register={register}
            name="name"
            control={control}
            label="Full name"
            width={"w-30"}
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
            name="designation"
            control={control}
            label="Designation"
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
            name="email"
            control={control}
            label="Email"
            width={"w-30"}
            color={"text-gray"}
          />
          <Input
            register={register}
            name="password"
            control={control}
            label="Password"
            width={"w-30"}
            color={"text-gray"}
          />
        </div>
        <div className="mb-1">
          {loading ? (
            <Loader style="btn-secondary" />
          ) : (
            <Button
              style="btn-secondary"
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

export default AgentCE;
