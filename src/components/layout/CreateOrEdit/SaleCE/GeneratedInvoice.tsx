import React, { useState, useEffect } from "react";
import { GetInvoiceById } from "@/src/utils/api/Invoice";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

import { CheckBadgeIcon } from "@heroicons/react/24/solid";

import { useDispatch, useSelector } from "react-redux";
import { updateInvoiceData } from "@/src/redux/reducers/invoiceReducer";
import { Spinner } from "@material-tailwind/react";

type Props = {
  active: any;
  id: any;
};

const GeneratedInvoice = ({ id, active }: Props) => {
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState<any>(true);

  const [records, setRecords] = useState<any>({ prices: [], services: [] });
  const newInvoiceDetails = {
    sale: ["sale1", "sale2"],
    client: ["client1", "client2"],
    invoice: ["invoice1", "invoice2"],
  };
  const invoice = useSelector((state: any) => state) || {};
  const Dispatch = useDispatch();

  console.log(invoice, "SALE");

  const getInvoice = async () => {
    const InvoiceById = await GetInvoiceById(
      // id
      "20dc8f5d-ac03-44d9-bd85-3bad8985c5be"
    );
    if (InvoiceById) {
      if (InvoiceById.error == null) {
        setData(InvoiceById.invoice);
        console.log(data);
        setLoading(false);
      }
    }
  };

  let data2 = invoice;
  console.log(data2);
  const Calculation = (services: string[], prices: string[]) => {
    const taxRate = 0.07;

    if (!services || !prices || services.length !== prices.length || loading) {
      return { subtotal: 0, taxAmount: 0, total: 0 };
    }

    const subtotal: number = prices.reduce(
      (acc, curr) => acc + parseInt(curr, 10),
      0
    );

    const taxAmount: number = subtotal * taxRate;
    const total: number = subtotal + taxAmount;

    return { subtotal, taxAmount, total };
  };

  const ServiceAndPriceRecords = () => {
    if (loading || !data) {
      return null;
    }
    let tempRecords: any = { service: [], price: [] };
    data.Sales[0].service.forEach((x: any, i: number) => {
      tempRecords.price.push(x.price);
      tempRecords.service.push(x.service);
    });
    setRecords((prevData: any) => ({
      ...prevData,
      prices: tempRecords.price,
      services: tempRecords.service,
    }));
  };

  useEffect(() => {
    getInvoice();
  }, []);

  useEffect(() => {
    ServiceAndPriceRecords();
  }, [data]);

  console.log(data);

  const downloadInvoice = () => {
    const element = document.getElementById("invoice");

    if (element) {
      html2canvas(element).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const imgWidth = 210; // A4 dimensions in mm
        const pageHeight = 295;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;

        const pdf = new jsPDF("p", "mm", "a4");

        let position = 0;

        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save("invoice.pdf");
      });
    }
  };

  return (
    <>
      <button onClick={downloadInvoice}>Download Invoice</button>

      {!loading && data ? (
        <div
          id="invoice"
          className="w-[10rem] m-8 p-8 border border-gray-400  lg:w-[70rem] mx-auto"
        >
          <div className="m-1 flex justify-between items-center">
            <span className="font-bold text-2xl mb-5 text-red-500">
              Invoice{" "}
              <span className="text-gray-300 font-normal">{data.code}</span>
            </span>
            {data.status === "Paid" && (
              <CheckBadgeIcon className="h-24 w-24" color="green" />
            )}
            {/* <Avatar size="xxl" src={data.Company.logo} /> */}
          </div>

          <div className="mb-4">
            <span className="font-bold">
              Invoice No:
              <span> {data.code}</span>
            </span>
            <p className="font-bold">Invoice Date: {data.date}</p>
            <span className="font-bold">
              Invoice Status:{" "}
              <span
                className={
                  data.status === "Paid" ? "text-green-400" : "text-green-400"
                }
              >
                {data.status}
              </span>
            </span>
            <p className="font-bold">Payment Due: {data.date}</p>
          </div>
          <div className="flex justify-between">
            <div>
              <p className="font-bold">From:</p>
              <p className="font-bold">{data.Company.name}</p>
              <p>{data.Company.email}</p>
              <p>{data.Company.address}</p>
              <p>P: {data.Company.phone}</p>
            </div>
            <div>
              <p className="font-bold">To:</p>
              <div className="m-1"></div>
              <p className="font-bold">{data.Client.name}</p>
              <p>{data.Client.email}</p>
              <p>{data.Client.address}</p>
              <p>P: {data.Client.phone}</p>
            </div>
          </div>
          {
            <table className="mt-8 w-full border-collapse">
              <thead className="bg-gray-100">
                <tr className="border-t border-b">
                  <th className="border-r px-4 py-2 text-blue-400">No</th>
                  <th className="border-r px-4 py-2 text-blue-400">
                    Description
                  </th>
                  <th className="border-r px-4 py-2 text-blue-400">Price</th>
                  <th className="px-4 py-2 text-blue-400">Amount</th>
                </tr>
              </thead>
              <tbody>
                {data.Sales[0].service.map((item: any, index: number) => {
                  return (
                    <tr>
                      <>
                        <td className="border-r px-4 py-2">{index + 1}</td>
                        <td className="border-r px-4 py-2">{item.service}</td>
                        <td className="border-r px-4 py-2">${item.price}</td>
                        <td className="px-4 py-2">${item.price}</td>
                      </>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          }
          <div className="mt-8 flex justify-end">
            <div className="w-1/4">
              <p className="font-semibold border-t border-b py-2">
                Subtotal: $
                {Calculation(records.services, records.prices).subtotal}
              </p>
              <p className="border-b py-2">
                Tax (7%): +$
                {Calculation(records.services, records.prices).taxAmount}
              </p>
              <p className="font-bold py-2">
                Total: ${Calculation(records.services, records.prices).total}
              </p>
            </div>
          </div>
          <p className="mt-8 text-xs">
            Notes: any relevant info, terms, payment instructions, etc.
          </p>
        </div>
      ) : (
        <div
          id="invoice"
          className="p-8 border border-gray-400 w-[70rem] h-[30rem] m-auto"
        >
          <div className="m-1 flex items-center text-center">
            <Spinner color="red" className="h-[20rem] w-[4rem] m-auto " />
          </div>
        </div>
      )}
    </>
  );
};

const GeneratedInvoiceHOC = React.memo(GeneratedInvoice);
export default GeneratedInvoiceHOC;
