import React, { Fragment, useState } from "react";
import axios from "axios";
//Component Imports
import Modal from "../Modal";
import Table from "../Table";
import CardLoader from "../Loader/CardLoader";
//SVGs Imports
import AddIcon from "../../../../public/Image/Icons/svgs/Add.svg";
import EditIcon from "../../../../public/Image/Icons/svgs/edit.svg";
import TrashIcon from "../../../../public/Image/Icons/svgs/trash.svg";
//Redux
import { form_ } from "@/src/redux/form";
import { useDispatch, useSelector } from "react-redux";
import CricleSpinner from "../Loader/CricleSpinner";

type Props = {
  label: string;
  title: string;
  modalTitle: string;
  renderModalComponent: React.ReactNode;
  data: Array<any>;
  setData: any;
  cols: Array<any>;
};

const InfoCard: React.FunctionComponent<Props> = (props) => {
  const { renderModalComponent: Component, data, setData } = props;
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [viewModal, setViewModal] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [keys, setKeys] = React.useState<any>([]);
  //Redux Selector
  const user_data = useSelector((state: any) => state.form.value.values);
  const data_create = useSelector((state: any) => state.form.value.data_create);

  //redux initialize
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (data?.length > 0) {
      //mapping keys of the columns
      let Keys = Object.keys(data[0]) as (keyof (typeof data)[0])[];
      Keys = Keys.filter((key) => key == "name");
      setKeys(Keys);
    }
    if (data_create === true) {
      //updating the array when user is created
      let tempState: any = [];
      if (data?.length > 0) {
        tempState.push([...data, user_data]);
      } else {
        tempState.push([user_data]);
      }
      setData(tempState);
      dispatch(form_({ data_update: false }));
      return;
    }
  }, [data, data_create]);

  const handleClick = (id: string) => {
    setLoading(true);
    axios
      .delete(process.env.NEXT_PUBLIC_ERP_DELETE_AGENTS as string, {
        headers: { id: id },
      })
      .then((r) => {
        if (r.data.status == "success") {
          let tempState: any = [];
          const newData = data?.filter((x) => x.id !== id); //filtering the deleted user from array
          tempState.push(newData);
          setData(tempState);
          setLoading(false);
        }
      });
  };

  return (
    <Fragment>
      {data || !loading ? (
        <div className="flex p-4 flex-col h-full rounded-lg shadow-lg">
          <div className="flex justify-between items-center">
            <div className="text-theme-700 font-bold font-body">
              {props.title}
            </div>
            <div className="text-theme-700 font-bold ">
              <AddIcon
                onClick={() => {
                  setShowModal(true);
                  dispatch(form_({ form_edit: false }));
                }}
                fill={"gray"}
                className="w-6 h-6 text-gray-500 cursor-pointer"
              />
            </div>
          </div>
          <div className="font-body">{props.label}</div>
          <div className="h-100 flex-grow overflow-x-hidden overflow-auto flex flex-wrap content-start p-2">
            <ul className="p-3 w-full">
              {data?.length > 0 && !loading ? (
                <Fragment>
                  {keys?.map((key: any, i: any) => {
                    return (
                      <Fragment>
                        {data?.map((items, index) => {
                          return (
                            <Fragment>
                              <div className="flex " key={index}>
                                <li className="w-full p-3">
                                  {index + 1}. {items[key]}
                                </li>
                                <div className="w-full p-3 justify-end flex text-right">
                                  <li className="px-5">
                                    <EditIcon
                                      onClick={() => {
                                        setShowModal(true);
                                        dispatch(
                                          form_({
                                            form_edit: true,
                                            _id: items.id,
                                            values: items,
                                          })
                                        );
                                      }}
                                      fill={"gray"}
                                      className="w-5 h-5 cursor-pointer"
                                    />
                                  </li>
                                  <li className="">
                                    <TrashIcon
                                      onClick={() => handleClick(items.id)}
                                      fill={"gray"}
                                      className="w-5 h-5 cursor-pointer"
                                    />
                                  </li>
                                </div>
                              </div>
                              <hr />
                            </Fragment>
                          );
                        })}
                      </Fragment>
                    );
                  })}
                </Fragment>
              ) : (
                <Fragment>
                  {loading && (<CricleSpinner/>)}
                  {data?.length == 0 && <> No Agents to show</>}
                </Fragment>
              )}
            </ul>
          </div>
          <div className="flex-grow" />
          <hr />
          <div className="flex justify-center">
            <div
              className="font-body cursor-pointer"
              onClick={() => {
                setViewModal(true);
                dispatch(form_({ form_edit: false, show_info: true }));
              }}
            >
              View More
            </div>
          </div>
        </div>
      ) : (
        <CardLoader />
      )}
      <Modal
        label={props.modalTitle}
        showModal={showModal}
        modalSize="xs"
        setShowModal={setShowModal}
      >
        {Component}
      </Modal>
      <Modal
        label={props.modalTitle}
        showModal={viewModal}
        modalSize="lg"
        setShowModal={setViewModal}
      >
        <Table cols={props.cols} data={props.data} />
      </Modal>
    </Fragment>
  );
};

export default InfoCard;
