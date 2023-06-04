import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
//Icons & SVGs
import { FunnelIcon, PlusIcon } from "@heroicons/react/24/outline";
import { PropagateLoader } from "react-spinners";

type Props = {
  cols: any;
};

const EmptyTable = ({ cols }: Props) => {
  return (
    <React.Fragment>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50 ">
          <tr>
            <th scope="col" className="py-3 pl-4">
              <div className="flex items-center h-5">
                <input
                  id="checkbox-all"
                  type="checkbox"
                  disabled={true}
                  className="text-blue-60 cursor-not-allowed rounded focus:ring-blue-500"
                />
              </div>
            </th>
            {cols.map((col: any, index: any) => {
              return (
                <th key={index} className="text-left">
                  {col}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-3 pl-4">
              {" "}
              <input
                id="checkbox-all"
                type="checkbox"
                disabled={true}
                className="text-blue-60 rounded cursor-not-allowed focus:ring-blue-500"
              />
            </td>
            <td className="p-3 pl-0">no data to show</td>
          </tr>
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default EmptyTable;
