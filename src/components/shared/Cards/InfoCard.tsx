import React, { Fragment, useState } from "react";
//Component Imports
import Modal from "../Modal";
import Table from "../Table";
//SVGs Imports
import AddIcon from "../../../../public/Image/Icons/svgs/Add.svg";
import EditIcon from "../../../../public/Image/Icons/svgs/edit.svg";
import TrashIcon from "../../../../public/Image/Icons/svgs/trash.svg";

type Props = {
  label: string;
  title: string;
  modalTitle: string;
  renderModalComponent: React.ReactNode;
  data: Array<any>;
};

const InfoCard: React.FunctionComponent<Props> = (props) => {
  const { renderModalComponent: Component } = props;
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [viewModal, setViewModal] = React.useState<boolean>(false);

  return (
    <Fragment>
      <div className="flex p-4 flex-col h-full rounded-lg shadow-lg">
        <div className="flex justify-between items-center">
          <div className="text-theme-700 font-bold font-body">
            {props.title}
          </div>
          <div className="text-theme-700 font-bold ">
            <AddIcon
              onClick={() => setShowModal(true)}
              fill={"gray"}
              className="w-6 h-6 text-gray-500 cursor-pointer"
            />
          </div>
        </div>
        <div className="font-body">{props.label}</div>
        <div className="h-100 flex-grow overflow-x-hidden overflow-auto flex flex-wrap content-start p-2">
          <ul className="p-3 w-full">
            {props.data.map((items, index) => {
              return (
                <Fragment>
                  <div className="flex " key={index}>
                    <li className="w-full p-3">
                      {items.name} {items.designation}
                    </li>
                    <div className="w-full p-3 justify-end flex text-right">
                      <li className="px-5">
                        <EditIcon
                          onClick={() => {
                            setShowModal(true);
                          }}
                          fill={"gray"}
                          className="w-5 h-5 cursor-pointer"
                        />
                      </li>
                      <li className="">
                        <TrashIcon
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
          </ul>
        </div>
        <div className="flex-grow" />
        <hr />
        <div className="flex justify-center">
          <div
            className="font-body cursor-pointer"
            onClick={() => {
              setViewModal(true);
            }}
          >
            View More
          </div>
        </div>
      </div>
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
        <Table data={props.data} />
      </Modal>
    </Fragment>
  );
};

export default InfoCard;
