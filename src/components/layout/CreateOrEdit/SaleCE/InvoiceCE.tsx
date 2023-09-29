import React, { useState, useEffect, Fragment } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";
//Components Import
import Input from "@/src/components/shared/Form/Input";
import Button from "@/src/components/shared/Buttons/Button";
import Loader from "@/src/components/shared/Buttons/Loading";
import TextArea from "@/src/components/shared/Form/TextArea";
import SelectType from "@/src/components/shared/Form/SelectType";
//Interface Import
import { Clients } from "@/src/interfaces/Clients";
import { useSelector } from "react-redux";
//BaseValues for Schema
import { agentBaseValues } from "@/src/utils/baseValues";
//API Calls
import { CreateInvoice, UpdateInvoice } from "@/src/utils/api/Invoice";

type Props = {
  state:any,
  data: any;
  setData: any;
  active:number,
  setState:any,
  setActive:any
};

const SignupSchema = yup.object().shape({
  //Yup schema to set the values
  tax: yup.string().required("Required"),
  due_date: yup.string().required("Required"),
  due_amount: yup.string().required("Required"),
  status: yup.string().required("Required"),
});

const InvoiceCE = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  // const [clientId, setClientId] = useState("");
  //Redux initialize
  const edit = useSelector((state: any) => state.form.value.edit);
  const invoice_id = useSelector((state: any) => state.form.value._id);
  const invoice_data = useSelector((state: any) => state.form.value.values);
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
    defaultValues: invoice_data,
  });

  useEffect(() => {
    let tempState = {};
    if (edit == true) {
      const tempData = [...props.data];
      tempData.forEach((e, i) => {
        if (e.id == invoice_id) {
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
    console.log(props.state)
    const newData ={
        ...data,
        state: props.state,
        date:  moment().format('MM-DD-YY'),
        time: moment().format("h:mm:ss a"),

    }
    setLoading(true);
    //submiting the values to the API and saving in the db
    const createdInvoice = await CreateInvoice(companyId, newData);
    if (createdInvoice) {
      if (createdInvoice.error == null) {
        let tempArr;
        setLoading(false);
        props.setActive(3)
        props.setState((prevData: any) => ({
          ...prevData,
          invoice:createdInvoice.invoice.id
        }))
        setMessage("Invoice created successfully.");
        // tempArr = [...props.data, createdClient.client];
        // return props.setData(tempArr);
      } else {
        setLoading(false);
        setMessage("Invoice not created.");
      }
    } else {
      setLoading(true);
      setMessage("Error occured please wait.");
    }
  };

  const onEdit = async (data: object) => {
    setLoading(true);
    //submiting the values to the API and saving in the db
    const updatedInvoice = await UpdateInvoice(invoice_id, data);
    if (updatedInvoice) {
      if (updatedInvoice.error === null) {
        setLoading(false);
        setMessage("Agent edited successfully.");
        // const tempState: Array<any> = [...props.data];
        // const i = tempState.findIndex((item) => item.id === client_id);
        // if (i !== -1) {
        //   tempState[i] = data;
        //   return props.setData(tempState);
        // }
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
            placeholder="7%"
            register={register}
            name="tax"
            control={control}
            label="Tax"
            width={"w-full"}
            color={"text-gray"}
          />
          <Input
             placeholder="01-02-23"
             register={register}
             name="due_date"
            control={control}
            label="Due Date"
            width={"w-30"}
            color={"text-gray"}
          />
          <Input
            placeholder="2000"
            register={register}
            name="due_amount"
            control={control}
            label="Due Amount"
            width={"w-30"}
            color={"text-gray"}
          />
          <Input
            placeholder="Paid"
            register={register}
            name="status"
            control={control}
            label="Status of Invoice"
            width={"w-30"}
            color={"text-gray"}
          />
          
        </div>
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

const InvoiceCEHOC = React.memo(InvoiceCE);
export default InvoiceCEHOC;
