import React, { useState, useEffect } from "react";
import { GetInvoiceById } from "@/src/utils/api/Invoice";

type Props = {
  active: any;
  id: any;
};

interface ServiceType {
    service: string;
    price: number;
  }

const GeneratedInvoice = ({ id, active }: Props) => {
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState<any>(true);

  const getInvoice = async () => {
    const InvoiceById = await GetInvoiceById(
      "bed61762-c5eb-4723-8388-c75513c3b7ab"
    );
    if (InvoiceById) {
      if (InvoiceById.error == null) {
        setData(InvoiceById.invoice);
        console.log(InvoiceById.invoice, "Data");
        setLoading(false)
      }
    }
  };

  const Cal = ({ service, price }: ServiceType) => {
    const taxRate = 0.07;
  
    if (!service || typeof price !== "number") {
      return { subtotal: 0, taxAmount: 0, total: 0 };
    }
  
    const subtotal = price;
    const taxAmount = subtotal * taxRate;
    const total = subtotal + taxAmount;
  
    return { subtotal, taxAmount, total };
  };

  useEffect(() => {
    getInvoice();
  }, []);

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
            <tr>
              {data.Sale.service.map((item,index)=>{
                return(
                    <>
                    <td className="border-r px-4 py-2">{index+1}</td>
                    <td className="border-r px-4 py-2">{item.service}</td>
                    <td className="border-r px-4 py-2">${item.price}</td>
                    <td className="px-4 py-2">${Cal(item.service,item.price).taxAmount}</td>
                    </>
                )
              })}
            </tr>
          </tbody>
        </table>}
        <div className="mt-8 flex justify-end">
          <div className="w-1/4">
            <p className="border-t border-b py-2">Subtotal: $99.00</p>
            <p className="border-b py-2">Tax (7%): +$6.93</p>
            <p className="font-bold py-2">Total: $105.93</p>
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
