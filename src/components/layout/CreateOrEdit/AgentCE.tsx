import React, { useState, useEffect, Fragment } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
//Components Import
import Input from "@/src/components/shared/Form/Input";
import Button from "@/src/components/shared/Buttons/Button";
import Loader from "@/src/components/shared/Buttons/Loading";
//Interface Import
import { Agents } from "@/src/interfaces/Agents";
//Redux
import { useSelector } from "react-redux";
//BaseValues for Schema
import { agentBaseValues } from "@/src/utils/baseValues";
//API Calls
import { CreateNewAgent, UpdateAgent } from "@/src/utils/api/team";

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
    defaultValues: agent_data,
  });

  useEffect(() => {
    setAgentId(agent_id);
    let tempState = {};
    if (edit == true) {
      const tempData = [...props.data];
      tempData.forEach((e, i) => {
        if (e.id == agent_id) {
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
    const createdAgent = await CreateNewAgent(companyId, data);
    if (createdAgent) {
      if (createdAgent.error == null) {
        let tempArr = {};
        setLoading(false);
        setMessage("Agent created successfully.");
        tempArr = [...props.data, createdAgent.agent];
        return props.setData(tempArr);
      } 
    } else {
      setLoading(false);
      setMessage("Email already registered.");
    }
  };

  const onEdit = async (data: object) => {
    setLoading(true);
    //submiting the values to the API and saving in the db
    const updatedAgent = await UpdateAgent(agentId, data);
    if (updatedAgent) {
      if (updatedAgent.error == null) {
        setLoading(false);
        setMessage("Agent edited successfully.");
        const agents = props.data as any[];
        const i = agents.findIndex((item) => item.id === agent_id);
        if (i !== -1) {
          let tempState: any = props.data;
          tempState[i] = data;
          props.setData(tempState);
        }
      } else {
        setLoading(true);
        setMessage("Agent not edited!");
      }
    } else {
      setLoading(false);
      setMessage("Error occured please wait.");
    }
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
