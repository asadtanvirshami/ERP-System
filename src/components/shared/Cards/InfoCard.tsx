import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
// Component Imports
import Modal from "../Modal";
import Table from "../Table";
import CardLoader from "../Loader/CardLoader";
// SVGs Imports
import AddIcon from "../../../../public/Image/Icons/svgs/Add.svg";
import EditIcon from "../../../../public/Image/Icons/svgs/edit.svg";
import TrashIcon from "../../../../public/Image/Icons/svgs/trash.svg";
// Redux
import { form_ } from "@/src/redux/form";
import { useDispatch, useSelector } from "react-redux";
import CricleSpinner from "../Loader/CricleSpinner";

const InfoCard = ({
  label,
  title,
  modalTitle,
  renderModalComponent: Component,
  data,
  setData,
  cols,
  url
}: any) => {
  const [state, setState] = useState({
    showModal: false,
    viewModal: false,
    loading: false,
  });
  const [keys, setKeys] = React.useState<Array<keyof typeof data[0]>>([]);

  // Redux Selector
  const { id: _id, values: _data, create: data_create, update: data_update, delete: data_delete } = useSelector(
    (state: any) => state.form.value
  );

  // Redux initialize
  const dispatch = useDispatch();

  useEffect(() => {
    if (data?.length > 0) {
      let Keys: Array<keyof typeof data[0]> = Object.keys(data[0]) as Array<keyof typeof data[0]>;
      Keys = Keys.filter((key) => key === "name");
      setKeys(Keys);
    }
    if (data_create) {
      // Updating the array when a user is created
      let newArr=[]
      const tempState = data?.length > 0 ? [...data, _data] : [_data];
      newArr.push(tempState)
      setData(newArr)
      dispatch(form_({ create: false }));
    }
    if (data_update) {
      // Updating the array when a user is updated
      setState((prevState) => ({ ...prevState, loading: true }));
      if (data?.length > 0 || _data) {
        const tempState = [...data];
        const i = tempState.findIndex((item) => item.id === _data.id);
        if (i !== -1) {
          tempState[i] = _data;
          setData([tempState]);
        }
        dispatch(form_({ update: false, edit: true }));
      }
      setState((prevState) => ({ ...prevState, loading: false }));
    }

  }, [data, data_create, data_update, data_delete]);

  const handleOnClick = (id:string) => {
    // Function to handle global delete
    setState((prevState) => ({ ...prevState, loading: true }));
    axios
      .delete(url as string, { headers: { id: id } }) // Replace with the correct endpoint URL for deleting data
      .then((response) => {
        if (response.data.status === 'success') {
          const newData = data?.filter((item: any) => item.id !== id);
          setData([newData]);
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
      {data? (
        <div className="flex p-4 flex-col h-full rounded-lg shadow-lg">
          <div className="flex justify-between items-center">
            <div className="text-theme-700 font-bold font-body">{title}</div>
            <div className="text-theme-700 font-bold ">
              <AddIcon
                onClick={() => {
                  setState((prevState) => ({ ...prevState, showModal: true }));
                  dispatch(form_({ edit: false }));
                }}
                fill="gray"
                className="w-6 h-6 text-gray-500 cursor-pointer"
              />
            </div>
          </div>
          <div className="font-body">{label}</div>
          <div className="h-100 flex-grow overflow-x-hidden overflow-auto flex flex-wrap content-start p-2">
            <ul className="p-3 w-full">
              {data?.length && !state.loading ? (
                <>
                  {keys?.map((key, i) => (
                    <Fragment key={i}>
                      {data?.map((item: any, index: any) => (
                        <Fragment key={item[key].id}>
                          <div className="flex">
                            <li className="w-full p-3">
                              {index + 1}. {item[key]}
                            </li>
                            <div className="w-full p-3 justify-end flex text-right">
                              <li className="px-5">
                                <EditIcon
                                  onClick={() => {
                                    setState((prevState) => ({ ...prevState, showModal: true }));
                                    dispatch(
                                      form_({
                                        edit: true,
                                        _id: item.id,
                                        values: item,
                                      })
                                    );
                                  }}
                                  fill="gray"
                                  className="w-5 h-5 cursor-pointer"
                                />
                              </li>
                              <li className="">
                                <TrashIcon
                                  onClick={() =>
                                    handleOnClick(item.id)
                                  }
                                  fill="gray"
                                  className="w-5 h-5 cursor-pointer"
                                />
                              </li>
                            </div>
                          </div>
                          <hr />
                        </Fragment>
                      ))}
                    </Fragment>
                  ))}
                </>
              ) : (
                <>
                  {state.loading && <CricleSpinner />}
                  {data?.length === 0 && <> No Agents to show</>}
                </>
              )}
            </ul>
          </div>
          <div className="flex-grow" />
          <hr />
          <div className="flex justify-center">
            <div
              className="font-body cursor-pointer"
              onClick={() => {
                setState((prevState) => ({ ...prevState, viewModal: true }));
                dispatch(form_({ edit: false, info: true }));
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
        label={modalTitle}
        showModal={state.showModal}
        modalSize="xs"
        setShowModal={(show) =>
          setState((prevState) => ({ ...prevState, showModal: show }))
        }
      >
        {Component}
      </Modal>
      <Modal
        label={modalTitle}
        showModal={state.viewModal}
        modalSize="lg"
        setShowModal={(show) =>
          setState((prevState) => ({ ...prevState, viewModal: show }))
        }
      >
        <Table modalTitle="Create" renderModalComponent={Component} url={url} cols={cols} data={data} />
      </Modal>
    </Fragment>
  );
};

export default InfoCard;
