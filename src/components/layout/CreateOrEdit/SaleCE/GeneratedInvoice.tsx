import React, { useState, useEffect } from "react";
import { GetInvoiceById } from "@/src/utils/api/Invoice";

type Props = {
  active: any;
  id: any;
};

const GeneratedInvoice = ({ id, active }: Props) => {
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState<any>(true);

  const [records, setRecords] = useState<any>({prices:[], services:[]})

  const getInvoice = async () => {
    const InvoiceById = await GetInvoiceById(
      "8b966119-68e8-490a-9806-350f8c350109"
    );
    if (InvoiceById) {
      if (InvoiceById.error == null) {
        setData(InvoiceById.invoice);
        setLoading(false)
      }
    }
  };

  const Calculation = (services: string[], prices: string[]) => {
    const taxRate = 0.07;

    if (!services || !prices || services.length !== prices.length || loading) {
      return { subtotal: 0, taxAmount: 0, total: 0 };
    }

    const subtotal: number = prices.reduce((acc, curr) => acc + parseInt(curr, 10), 0);

    const taxAmount: number = subtotal * taxRate;
    const total: number = subtotal + taxAmount;

    return { subtotal, taxAmount, total };
};

  const ServiceAndPriceRecords = () =>{
    if(loading){
      return null
    }
    let tempRecords:any = {service:[], price:[]}
    data.Sale.service.forEach((x:any,i:number)=>{
      tempRecords.price.push(x.price)
      tempRecords.service.push(x.service)
    })
    setRecords((prevData: any) => ({
      ...prevData,
      prices:tempRecords.price,
      services:tempRecords.service
    }))
  }

  useEffect(() => {
    getInvoice();
  },[]);

  useEffect(()=>{
    ServiceAndPriceRecords();
  },[data])

  return (
    <>
     {!loading ? <div className="m-8 p-8 border border-gray-400 w-[70rem] mx-auto">
        <h1 className="font-bold text-2xl mb-4">Invoice</h1>
        <div className="flex justify-between">
          <div>
            <p>From</p>
            <p className="font-bold">{data.Company.name}</p>
            <p>{data.Company.name}</p>
            <p>{data.Company.address}</p>
            <p>P: {data.Company.phone}</p>
          </div>
          <div>
            <p>For</p>
            <p className="font-bold">{data.Client.name}</p>
            <p>{data.Client.email}</p>
            <p>{data.Client.address}</p>
            <p>P: {data.Client.phone}</p>
          </div>
        </div>
        {<table className="mt-8 w-full border-collapse">
          <thead>
            <tr className="border-t border-b">
              <th className="border-r px-4 py-2">No</th>
              <th className="border-r px-4 py-2">Description</th>
              <th className="border-r px-4 py-2">Price</th>
              <th className="px-4 py-2">Amount</th>
            </tr>
          </thead>
          <tbody>
              {data.Sale.service.map((item:any,index:number)=>{
                return(
            <tr>
                    <>
                    <td className="border-r px-4 py-2">{index+1}</td>
                    <td className="border-r px-4 py-2">{item.service}</td>
                    <td className="border-r px-4 py-2">${item.price}</td>
                    <td className="px-4 py-2">${item.price}</td>
                    </>
            </tr>
                )
              })}
          </tbody>
        </table>}
        <div className="mt-8 flex justify-end">
          <div className="w-1/4">
            <p className="border-t border-b py-2">Subtotal: ${Calculation(records.services,records.prices).subtotal}</p>
            <p className="border-b py-2">Tax (7%): +${Calculation(records.services,records.prices).taxAmount}</p>
            <p className="font-bold py-2">Total: ${Calculation(records.services,records.prices).total}</p>
          </div>
        </div>
        <p className="mt-8 text-xs">
          Notes: any relevant info, terms, payment instructions, etc.
        </p>
      </div> : <></>}
    </>
  );
};

const GeneratedInvoiceHOC = React.memo(GeneratedInvoice);
export default GeneratedInvoiceHOC;
