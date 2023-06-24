import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
// Component Imports
import Modal from "../Modal";
import Table from "../Table";
import CardLoader from "../Loader/CardLoader";
import CricleSpinner from "../Loader/CricleSpinner";
// SVGs Imports
import AddIcon from "../../../../public/Image/Icons/svgs/Add.svg";
import EditIcon from "../../../../public/Image/Icons/svgs/edit.svg";
import TrashIcon from "../../../../public/Image/Icons/svgs/trash.svg";
// Redux
import { form_ } from "@/src/redux/reducers/formReducer";
import { useDispatch, useSelector } from "react-redux";
import { checkIsTwoDArray } from "@/src/functions/checkArray";

const InfoCard = ({
  label,
  title,
  modalTitle,
  renderModalComponent: Component,
  data,
  allData,
  index,
  setData,
  cols,
  url,
  data_loading,
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
          if (allData) {
            let newData = [...allData];
            const check = checkIsTwoDArray(allData);
            if (check) {
              const filteredData = data?.filter((item: any) => item.id !== id);
              newData[index] = filteredData;
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

        <>
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
              {data?.length > 0 && !state.loading ? (
                <>
                  {Keys?.map((key, i) => (
                    <Fragment key={i}>
                      {data?.map((item: any, index: any) => (
                        <>
                          <div className="flex">
                            <li key={index} className="w-full p-3">
                              {index + 1}. {item[key]}
                            </li>
                            <div
                              key={item["id"]}
                              className="w-full p-3 justify-end flex text-right"
                            >
                              <li className="px-5">
                                <EditIcon
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
                                  fill="gray"
                                  className="w-5 h-5 cursor-pointer"
                                />
                              </li>
                              <li className="">
                                <TrashIcon
                                  onClick={() => handleOnClick(item.id)}
                                  fill="gray"
                                  className="w-5 h-5 cursor-pointer"
                                />
                              </li>
                            </div>
                          </div>
                          <hr />
                        </>
                      ))}
                    </Fragment>
                  ))}
                </>
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
            <div
              className="font-body cursor-pointer"
              onClick={() => {
                setState((prevState) => ({ ...prevState, viewModal: true }));
                dispatch(form_({ edit: false }));
              }}
            >
              View More
            </div>
          </div>
        </div>
     
        </>

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
        modalSize="lg"
        viewTable={true}
        setShowModal={(show) =>
          setState((prevState) => ({ ...prevState, viewModal: show }))
        }
      >
        <Table
          modalTitle={modalTitle}
          renderModalComponent={Component}
          url={url}
          cols={cols}
          index={index}
          allData={allData}
          data={data || undefined}
          setData={setData}
        />
      </Modal>
    </Fragment>
  );
};

export default InfoCard;
