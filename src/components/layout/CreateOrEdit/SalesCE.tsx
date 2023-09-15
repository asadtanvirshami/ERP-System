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
import DatePicker from "@/src/components/shared/Form/DatePicker";
//Interface Import
import { Agents } from "@/src/interfaces/Agents";
import { useSelector } from "react-redux";
//BaseValues for Schema
import { agentBaseValues } from "@/src/utils/baseValues";
import SelectType from "../../shared/Form/SelectType";
//API Calls
import { CreatNewSale } from "@/src/utils/api/sale";
import DefaultStepper from "../../shared/Stepper";
import AddRow from "../../shared/AddRow";
import { UpdateClient } from "@/src/utils/api/clients";

type Props = {
  data: Array<Agents>;
  setData: any;
  options: any;
};
interface Row {
  service: string;
  price: number;
}

const SalesSchema = yup.object().shape({
  //Yup schema to set the values
  type: yup.string().required("Required"),
  description: yup.string().required("Required"),
  status: yup.string().required("Required"),
  source: yup.string().required("Required"),
  source_link: yup.string().required("Required"),
  amount_paid: yup.number().required("Required"),
  amount_left: yup.number().required("Required"),
  total_amount: yup.number().required("Required"),
  total_amount_txt: yup.string().required("Required"),
  deadline: yup.string().required("Required"),
});

const SalesCE = (props: Props) => {
  // types.ts
  interface Row {
    service: string;
    price: string;
  }

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [rows, setRows] = useState<Row[]>([{ service: "", price: "" }]);

  const handleAddRow = (newRow: Row) => {
    setRows([...rows, newRow]);
  };

  //Redux initialize
  const edit = useSelector((state: any) => state.form.value.edit);
  const sale_id = useSelector((state: any) => state.form.value._id);
  const sale_data = useSelector((state: any) => state.form.value.values);
  const user_data = useSelector((state: any) => state.user.user);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    //passing the props in the useForm yupResolver
    resolver: yupResolver(SalesSchema),
    defaultValues: sale_data,
  });

  useEffect(() => {
    let tempState = {};
    if (edit == true) {
      const tempData = [...props.data];
      tempData.forEach((e, i) => {
        if (e.id == sale_id) {
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
    const newData = {
      ...data,
      start_date: moment().format("L"),
      end_date: moment().format("L"),
      start_time: moment().format("h:mm:ss a"),
      end_time: moment().format("h:mm:ss a"),
      userId: user_data.loginId,
      companyId: user_data.companyId,
    };
    const createdSale = await CreatNewSale(newData);
    if (createdSale) {
      if (createdSale.error == null) {
        let tempArr;
        setLoading(false);
        setMessage("Sale created successfully.");
        tempArr = [...props.data, createdSale.sale];
        return props.setData(tempArr);
      } else {
        setLoading(false);
        setMessage("Sale not created.");
      }
    } else {
      setLoading(true);
      setMessage("Error occured please wait.");
    }
  };

  const onEdit = async (data: object) => {
    setLoading(true);
    //submiting the values to the API and saving in the db
    const updatedClient = await UpdateClient(sale_id, data);
    if (updatedClient) {
      if (updatedClient.error === null) {
        setLoading(false);
        setMessage("Agent edited successfully.");
        const tempState: Array<any> = [...props.data];
        const i = tempState.findIndex((item) => item.id === sale_id);
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
  const handleRowsChange = (newRows: any) => {
    // Do something with the updated rows
    console.log(newRows);
  };

  return (
    <Fragment>
      <DefaultStepper />
      <div className="flex flex-wrap">
        <div className="w-full lg:w-1/2 p-1 border-r">
          {/* Content for the left column */}
          <div className="w-full lg:w-full mx-auto px-4">
            <h1 className="mb-4">Add Services & amount included in package.</h1>
            <div className="container">
              <AddRow
                options={props.options.services}
                onRowsChange={handleRowsChange}
                rows={rows}
                setRows={setRows}
              />
            </div>
            <hr className="m-4"></hr>
          </div>
        </div>
        <div className="w-full lg:w-1/2 p-4">
          {/* Content for the right column */}
          <div className="p-4">
            <form
              className="w-auto mx-auto lg:w-full justify-center grid"
              onSubmit={handleSubmit(edit ? onEdit : onSubmit)}
            >
              <div className="grid grid-cols-3 gap-2 mb-2">
                <Input
                  register={register}
                  name="type"
                  control={control}
                  label="Work Type"
                  width={"w-full"}
                  color={"text-gray"}
                  placeholder="e.g web package"
                />
                <Input
                  register={register}
                  name="amount_paid"
                  control={control}
                  label="Amount Paid"
                  width={"w-full"}
                  color={"text-gray"}
                  placeholder="0000"
                />
                <Input
                  register={register}
                  name="amount_left"
                  control={control}
                  label="Amount Left"
                  width={"w-full"}
                  color={"text-gray"}
                  placeholder="0000"
                />
                <Input
                  register={register}
                  name="total_amount"
                  control={control}
                  label="Total Amount $"
                  width={"w-full"}
                  color={"text-gray"}
                  placeholder="0000"
                />
                <Input
                  register={register}
                  name="total_amount_txt"
                  control={control}
                  label="Total Amount in Text"
                  width={"w-full"}
                  color={"text-gray"}
                  placeholder="e.g Five Hundred Dollars"
                />
                <DatePicker
                  register={register}
                  name="deadline"
                  control={control}
                  label="Deadline of task"
                  width={"w-full"}
                  color="text-gray"
                />
                <SelectType
                  options={props.options.status}
                  register={register}
                  name="status"
                  control={control}
                  label="Status"
                  width={"w-30"}
                  color={"text-gray"}
                />
                <SelectType
                  options={props.options.sources}
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
                  width={"w-full"}
                  color={"text-gray"}
                  placeholder="e.g www.Upwork.com"
                />
              </div>
              <div className="mb-3">
                <hr></hr>
              </div>
              <TextArea
                register={register}
                name="description"
                control={control}
                label="Write a proper detail of this sale."
                width={"w-30"}
                placeholder={"Write the details about the sale."}
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
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SalesCE;
