import React, { useState, useEffect, Fragment } from "react";
import Cookies from "js-cookie";
import axios from "axios";
//Icons & SVGs
import TrashIcon from "../../../../public/Image/Icons/svgs/trash.svg";
//Components
import EmptyTable from "../EmptyComponents/EmptyTable";
import Modal from "../Modal";
//Redux
import { form_ } from "@/src/redux/reducers/formReducer";
import { useDispatch, useSelector } from "react-redux";
//Functions
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { List } from "../List";
import Popovers from "../Popovers";
import TablePagination from "./TablePagination";

const Table = ({
  modalTitle,
  renderModalComponent: Component,
  data,
  cols,
  setCurrentPage,
  deleteFunc,
  onClick,
  totalPages,
  loading,
  currentPage,
}: any) => {
  const [state, setState] = useState({
    showModal: false,
    viewModal: false,
    loading: false,
    cardLoading: false,
    viewDetail: "",
    userDetail: {},
  });
  // Redux initialize
  const dispatch = useDispatch();

  // Redux Selector
  const { id: _id } = useSelector((state: any) => state.form.value);

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
            key !== "User" &&
            key !== "asignees" &&
            key !== "Status" &&
            key !== "active" &&
            key !== "description"
        )
      : null;

  return (
    <Fragment>
      {/* <Card className="xl:max-h-[80rem] md:max-h-[45rem] relative z-10"></Card> */}
      <Card className="flex flex-1 rounded-lg border border-silver  p-2  mt-3 px-4 sm:px-6 lg:px-8">
        <div className="mb-0 flex items-center justify-between p-3">
          <div>
            <Typography variant="h5" color="blue-gray">
              {modalTitle} list
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all members
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button variant="outlined" color="blue-gray" size="sm">
              view all
            </Button>
            <Button
              className="flex items-center gap-3"
              color="red"
              size="sm"
              onClick={() => {
                setState((prevState) => ({
                  ...prevState,
                  showModal: true,
                }));
                dispatch(form_({ edit: false }));
              }}
            >
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add{" "}
              {modalTitle}
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row p-3">
          <div className="w-full md:w-72">
            <div className="flex items-center border border-gray-300 rounded-md p-2">
              <MagnifyingGlassIcon className="h-5 w-5 mr-2" />
              <input
                type="text"
                className="flex-grow focus:outline-none"
                placeholder="Search"
              />
            </div>
          </div>
          {/* <Tabs value="all" className="w-full md:w-max">
            <TabsHeader>
              {cols.map(({ label, value }) => (
                <Tab key={value} value={value}>
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>
          </Tabs> */}
        </div>

        {data.length >= 1 && loading == false ? (
          <CardBody className="overflow-scroll px-0">
            <table className="mt-2 w-full min-w-max table-auto text-left">
              <thead className="">
                <tr>
                  {cols.map((head: string, index: number) => (
                    <th
                      key={index}
                      className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((ele: any, index: number) => {
                  const isLast = index === data.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={ele.id}>
                      <td  className={classes}>
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal font-bold"
                            >
                              {index + 1}.
                            </Typography>
                          </div>
                        </div>
                      </td>
                      {Keys.map((key: string, i: number) => {
                        return (
                          <td key={i} className={classes}>
                            <div className="flex items-center gap-3">
                              <div className="flex flex-col">
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {data[index][key]}
                                </Typography>
                              </div>
                            </div>
                          </td>
                        );
                      })}
                       <td className={classes}>
                          <Tooltip content="Edit Item">
                            <IconButton
                              variant="text"
                              color="blue-gray"
                              onClick={() => {
                                setState((prevState) => ({
                                  ...prevState,
                                  showModal: true,
                                }));
                                dispatch(
                                  form_({
                                    edit: true,
                                    _id: ele.id,
                                    values: ele,
                                  })
                                );
                              }}
                            >
                              <PencilIcon className="h-4 w-4" />
                            </IconButton>
                          </Tooltip>
                        </td>
                        <td  className={classes}>
                          <Tooltip content="Delete Item">
                            <IconButton
                              variant="text"
                              color="blue-gray"
                              onClick={() => {
                                onClick(ele.id);
                              }}
                            >
                              <TrashIcon
                                className="w-5 h-5 cursor-pointer"
                                fill={"gray"}
                              />
                            </IconButton>
                          </Tooltip>
                        </td>

                        {data[index]["asignees"] && (
                          <td className={classes}>
                            <div className="flex items-center gap-3">
                              <div className="flex flex-col">
                                <List
                                  data={ele}
                                  deleteFunc={deleteFunc}
                                  onClick={() => {
                                    setState((prevState) => ({
                                      ...prevState,
                                      showModal: true,
                                    }));
                                    dispatch(
                                      form_({
                                        open: true,
                                        edit: true,
                                        values: ele,
                                      })
                                    );
                                  }}
                                  state={data[index]["asignees"]}
                                />
                              </div>
                            </div>
                          </td>
                        )}
                        {data[index]["comments"] && (
                          <td className={classes}>
                            <div className="flex items-center gap-3">
                              <div className="flex flex-col">
                                <Popovers state={data[index]["comments"]} />
                              </div>
                            </div>
                          </td>
                        )}
                        {data[index]["description"] && (
                          <td className={classes}>
                            <div className="flex items-center gap-3">
                              <div className="flex flex-col">
                                <button
                                  onClick={() => {
                                    setState((prevState) => ({
                                      ...prevState,
                                      viewModal: true,
                                      viewDetail: data[index]["description"],
                                    }));
                                  }}
                                  className="bg-red-500 hover:bg-red-600 text-white px-4  rounded focus:outline-none"
                                >
                                  View
                                </button>
                              </div>
                            </div>
                          </td>
                        )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardBody>
        ) : (
          <EmptyTable loading={loading} cols={cols} />
        )}
        <TablePagination
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </Card>
      <Modal
        onScroll={null}
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
        onScroll={null}
        label={modalTitle}
        showModal={state.viewModal}
        modalSize="sm"
        viewTable={true}
        setShowModal={(show) =>
          setState((prevState) => ({ ...prevState, viewModal: show }))
        }
      >
        <>{state.viewDetail}</>
      </Modal>
    </Fragment>
  );
};

export default Table;
