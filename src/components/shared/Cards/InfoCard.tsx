import React, { Fragment, useState } from "react";
import axios from "axios";
import {
  TrashIcon,
  PencilSquareIcon,
  PlusSmallIcon,
} from "@heroicons/react/24/outline";
// Component Imports
import Modal from "../Modal";
import CricleSpinner from "../Loader/CricleSpinner";
// Redux
import { form_ } from "@/src/redux/reducers/formReducer";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

const InfoCard = ({
  label,
  title,
  modalTitle,
  renderModalComponent: Component,
  data,
  setData,
  url,
  link,
}: any) => {
  const [state, setState] = useState({
    showModal: false,
    viewModal: false,
    loading: false,
  });

  // Redux intialization
  const dispatch = useDispatch();
  const { id: _id, values: _data } = useSelector(
    (state: any) => state.form.value
  );

  //Setting the object keys
  let Keys;
  if (data?.length >= 1) {
    Keys = Object.keys(data[0]) as Array<keyof (typeof data)[0]>;
    Keys = Keys.filter((key) => key === "name");
  }

  const handleOnClick = (id: string) => {
    // Function to handle global delete
    setState((prevState) => ({ ...prevState, loading: true }));
    axios
      .delete(url as string, { headers: { id: id } })
      .then((response) => {
        if (response.data.status === "success") {
          const newData = data?.filter((item: any) => item.id !== id);
          setData(newData);
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
      <>
        <div className="flex p-4 flex-col h-full rounded-lg shadow-lg">
          <div className="flex justify-between items-center">
            <div className="text-theme-700 font-bold font-body">{title}</div>
            <div className="text-theme-700 font-bold ">
              <PlusSmallIcon
                onClick={() => {
                  setState((prevState) => ({ ...prevState, showModal: true }));
                  dispatch(form_({ edit: false }));
                }}
                className="w-6 h-6 text-gray-500 cursor-pointer"
              />
            </div>
          </div>
          <div className="font-body">{label}</div>
          <div className="h-100 flex-grow overflow-x-hidden overflow-auto flex flex-wrap content-start p-2">
            <ul className="p-3 w-full">
              {data?.length > 0 && !state.loading ? (
                <Fragment>
                  {Keys?.map((keys, i) => (
                    <Fragment key={i}>
                      {data?.map((item: any, index: any) => (
                        <div key={item["id"]}>
                          <div className="flex">
                            <li className="w-full p-3 text-[15px]">
                              <strong>{index + 1}. </strong> {item[keys]}
                            </li>
                            <div className="w-full p-3 justify-end flex text-right">
                              <li className="px-5">
                                <PencilSquareIcon
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
                                  className="w-5 h-5 cursor-pointer"
                                />
                              </li>
                              <li className="">
                                <TrashIcon
                                  onClick={() => handleOnClick(item.id)}
                                  className="w-5 h-5 cursor-pointer"
                                />
                              </li>
                            </div>
                          </div>
                          <hr />
                        </div>
                      ))}
                    </Fragment>
                  ))}
                </Fragment>
              ) : (
                <>
                  {state.loading && data?.length > 0 && <CricleSpinner />}
                  {data?.length == 0 && <> No {modalTitle} to show</>}
                </>
              )}
            </ul>
          </div>
          <div className="flex-grow" />
          <hr />
          <div className="flex justify-center">
            <div className="font-body cursor-pointer pt-0">
              <Link href={link}>
                <p className="pt-2">View More</p>
              </Link>
            </div>
          </div>
        </div>
      </>

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
      {/* <Modal
        onScroll={null}
        label={modalTitle}
        showModal={state.viewModal}
        modalSize="lg"
        viewTable={false}
        setShowModal={(show) =>
          setState((prevState) => ({ ...prevState, viewModal: show }))
        }
      ></Modal> */}
    </Fragment>
  );
};

export default InfoCard;
