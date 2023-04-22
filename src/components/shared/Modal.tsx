import React, { Fragment, useState } from "react";
import { Dialog } from "@material-tailwind/react";
//SVG Import
import CrossIcon from "../../../public/Image/Icons/svgs/cross.svg";

type Props = {
  showModal: boolean;
  setShowModal: (active: boolean) => void;
  children: React.ReactNode;
  modalSize: any;
  label: string;
};

const Modal = (props: Props) => {
  return (
    <Fragment>
      <Dialog
        open={props.showModal}
        size={props.modalSize}
        handler={() => props.setShowModal(false)}
      >
        <div className="flex ">
          <div className="mt-2 mb-2 w-full justify-center flex font-body text-2xl text-blue-gray-700">
            {props.label}
          </div>
          <div className="justify-center w-10 ">
            <CrossIcon
              onClick={() => props.setShowModal(false)}
              className=" h-5 w-5 mt-3 cursor-pointer"
              fill={"gray"}
            />
          </div>
        </div>
        <div className="m-3">
          <Fragment>{props.children}</Fragment>
        </div>
      </Dialog>
    </Fragment>
  );
};

export default Modal;
