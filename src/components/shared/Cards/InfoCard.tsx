import React, { Fragment, useState } from "react";
import Modal from "../Modal";
import AddIcon from "../../../../public/Image/Icons/svgs/Add.svg";
import { Agents } from "../../../interfaces/Agents";
import Table from "../Table";

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
                  <li className=" p-3">
                    {items.name} {items.designation} {items.role}
                  </li>
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
