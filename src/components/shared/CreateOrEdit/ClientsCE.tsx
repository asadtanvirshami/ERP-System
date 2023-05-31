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
//Redux
import { form_ } from "@/src/redux/form";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
//BaseValues for Schema
import { agentBaseValues } from "@/src/utils/baseValues";
import SelectType from "../Form/SelectType";

type Props = {
  data:Array<Agents>
};

const SignupSchema = yup.object().shape({
  //Yup schema to set the values
  name: yup.string().required("Required"),
  designation: yup.string().required("Required"),
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
  //Redux Selectors
  const delete_client = useSelector((state: any) => state.form.value.delete);
  const edit = useSelector((state: any) => state.form.value.edit);
  const client_id = useSelector((state: any) => state.form.value._id);
  const client_data = useSelector((state: any) => state.form.value.values);
  //redux initialize
  const dispatch = useDispatch();

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
    setClientId(client_id)
    if(edit==true){
      let tempState = {}
      const tempData = [...props.data]
      tempData.forEach((e,i)=>{if(e.id==client_id){tempState = {...e}}})
      reset(tempState)
    }
    if(delete_client == true){
      setLoading(true);
      axios
        .delete(process.env.NEXT_PUBLIC_ERP_DELETE_AGENTS as string, {
          headers: { id: client_id },
        })
        .then((r) => {
          if (r.data.status == "success") {
            dispatch(form_({ id:client_id, delete:true }));
          }
        });
    }
    if(edit==false){reset(agentBaseValues)}
  }, [edit])
  
  const onSubmit = async (data: object) => {
    setLoading(true);
    let companyId = Cookies.get('company')
    //submiting the values to the API and saving in the db
    axios
      .post(process.env.NEXT_PUBLIC_ERP_POST_SIGNUP as string, {
        data,
        id:companyId
      })
      .then((r: AxiosResponse) => {
        console.log(r.data.status)
        if (r.data.status == "success") {
          setLoading(false);
          setMessage("Client created successfully.")
          console.log(r.data.payload)
          dispatch(form_({ values: r.data.payload, create:true }));

        } else if (r.data.status == "error") {
          setLoading(false);
          setMessage("Client already exits!");
        } 
      });
  };

  const onEdit = async (data: object) => {
    setLoading(true);
    //submiting the values to the API and saving in the db
    console.log(client_id)
    axios
      .post(process.env.NEXT_PUBLIC_ERP_UPDATE_AGENT as string, {
        data,
        id:clientId
      })
      .then((r: AxiosResponse) => {
        if (r.data.message == "success") {
          setLoading(false);
          setMessage("Client updated successfully.")
          console.log(r.data,'data')
          dispatch(form_({ values: data, edit:true, update:true }));

        } else if (r.data.message == "error") {
          setLoading(false);
          setMessage("Client not updated!");
        } 
      });
  };   

  return (
    <Fragment>
      <form
        className="w-auto mx-auto lg:w-full justify-center grid"
        onSubmit={handleSubmit(edit?onEdit:onSubmit)}
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
          <SelectType
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
