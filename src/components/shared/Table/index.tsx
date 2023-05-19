import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
//Icons & SVGs
import { FunnelIcon, PlusIcon } from "@heroicons/react/24/outline";
import EditIcon from "../../../../public/Image/Icons/svgs/edit.svg";
import TrashIcon from "../../../../public/Image/Icons/svgs/trash.svg";

type Props = {
  data: Array<any>;
  cols: Array<any>;
};

const Table = ({ data, cols }: Props) => {
  const [type, setType] = useState<string | undefined>("");
  const [path, setPath] = useState<string | undefined>("");

  useEffect(() => {
    let pathname = window.location.pathname;
    let type = Cookies.get("type");
    return setType(type), setPath(pathname);
  }, []);

  let Keys = Object.keys(data[0]) as (keyof (typeof data)[0])[];
  Keys = Keys.filter(
    (key) =>
      key !== "id" &&
      key !== "type" &&
      key !== "img" &&
      key !== "id" &&
      key !== "createdAt" &&
      key !== "updatedAt" &&
      key !=="CompanyId"
  );

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <div className="flex justify-between py-3 pl-2">
          <div className="relative max-w-xs">
            <label htmlFor="hs-table-search" className="sr-only">
              Search
            </label>
            <input
              type="text"
              name="hs-table-search"
              id="hs-table-search"
              className="block w-full p-3 pl-10 text-sm border-gray-200 rounded-md focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
              placeholder="Search..."
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <svg
                className="h-3.5 w-3.5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="relative">
              {type == "admin" && (
                <button className="mx-3 relative z-0 inline-flex text-sm rounded-md shadow-sm focus:ring-accent-500 focus:border-accent-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1">
                  <span className="relative inline-flex items-center px-3 py-3 space-x-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md sm:py-2">
                    <div>
                      <PlusIcon className="h-5" />
                    </div>
                    <div className="hidden sm:block">
                      Add {path == "/team" ? "agent" : ""}
                    </div>
                  </span>
                </button>
              )}
              <button className="relative z-0 inline-flex text-sm rounded-md shadow-sm focus:ring-accent-500 focus:border-accent-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1">
                <span className="relative inline-flex items-center px-3 py-3 space-x-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md sm:py-2">
                  <div>
                    <FunnelIcon className="h-5" />
                  </div>
                  <div className="hidden sm:block">Filters</div>
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="p-1.5 w-full align-middle">
          <div className="overflow-hidden border rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 ">
                <tr>
                  <th scope="col" className="py-3 pl-4">
                    <div className="flex items-center h-5">
                      <input
                        id="checkbox-all"
                        type="checkbox"
                        className="text-blue-60 rounded focus:ring-blue-500"
                      />
                    </div>
                  </th>
                  {cols.map((col: any, index: any) => {
                    return <th className="text-left">{col}</th>;
                  })}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 ">
                {data.length > 0 ? (
                  <React.Fragment>
                    {data.map((index) => {
                      return (
                        <React.Fragment>
                          {
                            <tr key={data[0][Keys[0]]} className=" ">
                              <td className="py-3 pl-4">
                                <div className="flex items-center h-5">
                                  <input
                                    type="checkbox"
                                    className="text-blue-600 border-gray-200 rounded focus:ring-blue-500"
                                  />
                                  <label htmlFor="checkbox" className="sr-only">
                                    Checkbox
                                  </label>
                                </div>
                              </td>
                              {Keys.map((key: any, i) => (
                                <td
                                  key={i}
                                  className="text-sm text-gray-800 whitespace-nowrap"
                                >
                                  {data[0][key]}
                                </td>
                              ))}
                              <td className="text-sm font-medium whitespace-nowrap mx-2">
                                <EditIcon
                                  className="w-5 h-5 cursor-pointer"
                                  fill={"gray"}
                                />
                              </td>
                              <td className="text-sm font-medium whitespace-nowrap mx-2">
                                <TrashIcon
                                  className="w-5 h-5 cursor-pointer"
                                  fill={"gray"}
                                />
                              </td>
                            </tr>
                          }
                          <hr />
                        </React.Fragment>
                      );
                    })}
                  </React.Fragment>
                ) : (
                  <></>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
