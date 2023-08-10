import { Button } from "@material-tailwind/react";
import React, { useState } from "react";

interface Row {
  service: string;
  price: string;
}

interface AddRowProps {
  onRowsChange: (rows: Row[]) => void;
  rows:any,
  setRows:any
}

const AddRow: React.FC<AddRowProps> = ({ onRowsChange, rows, setRows, }) => {

  const handleServiceChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newRows = [...rows];
    newRows[index].service = event.target.value;
    setRows(newRows);
    onRowsChange(newRows);
  };

  const handlePriceChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newRows = [...rows];
    newRows[index].price = event.target.value;
    setRows(newRows);
    onRowsChange(newRows);
  };

  const handleAddRow = () => {
    setRows([...rows, { service: "", price: "" }]);
  };

  const handleRemoveRow = (index: number) => {
    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
    onRowsChange(newRows);
  };

  return (
    <div className="max-w-3xl mx-auto px-4">
      <div className="">
        <table className="w-full">
          <thead>
            <tr>
              <th className="w-1/2 md:w-1/3">Service</th>
              <th className="w-1/4 md:w-1/3">Price</th>
              <th className="w-1/4 md:w-1/3">Action</th>
            </tr>
          </thead>
          <tbody className="min-h-[200px] md:min-h-0 overflow-y-auto w-full">
            {rows.map((row:any, index:any) => (
              <tr key={index}>
                <td className="m-2">
                  <input
                    type="text"
                    placeholder="Service"
                    className="p-2 mt-2 border h-10 w-full md:w-full border-[0.5]px rounded-md text-sm focus:outline-none focus:border-blue-500"
                    value={row.service}
                    onChange={(e) => handleServiceChange(e, index)}
                  />
                </td>
                <td className="m-2">
                  <input
                    type="number"
                    placeholder="Price"
                    className="p-2 mx-2 mt-2 border h-10 w-full md:w-full border-[0.5]px rounded-md text-sm focus:outline-none focus:border-blue-500"
                    value={row.price}
                    onChange={(e) => handlePriceChange(e, index)}
                  />
                </td>
                <td className="text-center">
                  {index !== 0 && (
                    <Button
                      className="bg-red-500 text-white py-2 px-1 mx-1 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300 w-full md:w-auto"
                      onClick={() => handleRemoveRow(index)}
                    >
                      Remove
                    </Button>
                  )}
                  {index >= 0 && (
                    <Button
                      className="bg-red-500 text-white py-2 px-1 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300 w-full md:w-auto"
                      onClick={handleAddRow}
                    >
                   Add Row
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddRow;
