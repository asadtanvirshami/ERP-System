import React, { useState, useEffect, Fragment } from "react";
import Cookies from "js-cookie";
import axios from "axios";
//Icons & SVGs
import { FunnelIcon, PlusIcon } from "@heroicons/react/24/outline";
import EditIcon from "../../../../public/Image/Icons/svgs/edit.svg";
import TrashIcon from "../../../../public/Image/Icons/svgs/trash.svg";
//Components
import EmptyTable from "../EmptyComponents/EmptyTable";
import Modal from "../Modal";
//Redux
import { form_ } from "@/src/redux/form";
import { useDispatch, useSelector } from "react-redux";
//Functions
import { checkIsTwoDArray } from "@/src/functions/checkArray";

const Table = ({
  modalTitle,
  renderModalComponent: Component,
  data,
  setData,
  cols,
  allData,
  index,
  url,
}: any) => {
  const [type, setType] = useState<string | undefined>("");
  const [path, setPath] = useState<string | undefined>("");
  const [state, setState] = useState({
    showModal: false,
    viewModal: false,
    loading: false,
    cardLoading: false,
    viewDetail: "",
  });
  // Redux initialize
  const dispatch = useDispatch();

  // Redux Selector
  const { id: _id } = useSelector((state: any) => state.form.value);

  useEffect(() => {
    async function checkPathAndTypes() {
      let pathname = window.location.pathname;
      let type = Cookies.get("type");
      return setType(type), setPath(pathname);
    }
    checkPathAndTypes();
  }, [data]);

  let Keys: any =
    data?.length > 0
      ? (Object.keys(data[0]) as (keyof (typeof data)[0])[])
      : null;
  Keys =
    data?.length > 0
      ? Keys?.filter(
          (key: any) =>
            key !== "id" &&
            key !== "type" &&
            key !== "img" &&
            key !== "id" &&
            key !== "createdAt" &&
            key !== "updatedAt" &&
            key !== "CompanyId" &&
            key !== "UserId" &&
            key !== "comments" && 
            key !== "User" 
        )
      : null;

  const handleOnClick = (id: string) => {
    // Function to handle global delete
    setState((prevState) => ({ ...prevState, loading: true }));
    axios
      .delete(url as string, { headers: { id: id } })
      .then((response) => {
        if (response.data.status === "success") {
          if (allData) {
            let newData = [...allData];
            const check = checkIsTwoDArray(allData);
            if (check) {
              const filteredData = data?.filter((item: any) => item.id !== id);
              newData[index] = filteredData;
              console.log(newData);
              return setData(newData);
            }
          } else {
            const newData = data?.filter((item: any) => item.id !== id);
            setData(newData);
          }
        }
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
      })
      .finally(() => {
        setState((prevState) => ({ ...prevState, loading: false }));
      });
  };

  return (
    <Fragment>
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
                  <button
                    onClick={() => {
                      setState((prevState) => ({
                        ...prevState,
                        showModal: true,
                      }));
                      dispatch(form_({ edit: false }));
                    }}
                    className="mx-3 relative z-0 inline-flex text-sm rounded-md shadow-sm focus:ring-accent-500 focus:border-accent-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1"
                  >
                    <span className="relative inline-flex items-center px-3 py-3 space-x-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md sm:py-2">
                      <div>
                        <PlusIcon className="h-5" />
                      </div>
                      <div className="hidden sm:block">
                        Add{" "}
                        {(path == "/team" && "Agent") ||
                          (path == "/clients" && "Client") ||
                          (path == "/" && `${modalTitle}`)}
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
              {data.length >= 1 ? (
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
                        return (
                          <th key={index} className="text-left">
                            {col}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 ">
                    <React.Fragment>
                      {data.map((item: any, index: any) => {
                        return (
                          <React.Fragment key={index}>
                            {
                              <tr key={item.id} className=" ">
                                <td className="py-3 pl-4">
                                  <div className="flex items-center h-5">
                                    <input
                                      type="checkbox"
                                      className="text-blue-600 border-gray-200 rounded focus:ring-blue-500"
                                    />
                                    <label
                                      htmlFor="checkbox"
                                      className="sr-only"
                                    >
                                      Checkbox
                                    </label>
                                  </div>
                                </td>
                                {Keys?.length >= 1 && (
                                  <>
                                    {Keys.map((key: any, i: any) => (
                                      <td
                                        key={i}
                                        className="text-sm text-gray-800 whitespace-nowrap"
                                      >
                                        {data[index][key]}
                                      </td>
                                    ))}
                                  </>
                                )}
                                <td className="text-sm font-medium whitespace-nowrap mx-2">
                                  <EditIcon
                                    className="w-5 h-5 cursor-pointer"
                                    fill={"gray"}
                                    onClick={() => {
                                      setState((prevState) => ({
                                        ...prevState,
                                        showModal: true,
                                      }));
                                      dispatch(
                                        form_({
                                          edit: true,
                                          _id: item.id,
                                          values: item,
                                        })
                                      );
                                    }}
                                  />
                                </td>
                                <td className="text-sm font-medium whitespace-nowrap mx-2">
                                  <TrashIcon
                                    className="w-5 h-5 cursor-pointer"
                                    fill={"gray"}
                                    onClick={() => {
                                      handleOnClick(item.id);
                                    }}
                                  />
                                </td>
                                {data[index]["comments"] && (
                                  <td
                                    className="text-sm font-medium whitespace-nowrap mx-2"
                                    onClick={(show) =>
                                      setState((prevState: any) => ({
                                        ...prevState,
                                        viewModal: show,
                                        viewDetail: data[index]["comments"],
                                      }))
                                    }
                                  >
                                    View
                                  </td>
                                )}
                                {data[index]["User"] && (
                                  <td
                                    className="text-sm font-medium whitespace-nowrap mx-2"
                                  >
                                    {data[index]["User"].name}
                                  </td>
                                )}
                              </tr>
                            }
                            <hr />
                          </React.Fragment>
                        );
                      })}
                    </React.Fragment>
                  </tbody>
                </table>
              ) : (
                <EmptyTable cols={cols} />
              )}
            </div>
          </div>
        </div>
      </div>
      <Modal
        label={modalTitle}
        showModal={state.showModal}
        modalSize="xs"
        viewTable={false}
        setShowModal={(show) =>
          setState((prevState) => ({ ...prevState, showModal: show }))
        }
      >
        {Component}
      </Modal>
      <Modal
        label={modalTitle}
        showModal={state.viewModal}
        modalSize="xs"
        viewTable={true}
        setShowModal={(show) =>
          setState((prevState) => ({ ...prevState, viewModal: show }))
        }
      >
        {state.viewDetail}
      </Modal>
    </Fragment>
  );
};

export default Table;
