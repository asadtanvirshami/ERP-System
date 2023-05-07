import React, { Fragment, useState } from "react";
import { Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";
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
        <DialogHeader>
        <div className="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none">
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
        </DialogHeader>
        <DialogBody divider className="h-[10rem] overflow-scroll">
          <Fragment>{props.children}</Fragment>
        </DialogBody>
      </Dialog>
    </Fragment>
  );
};

export default Modal;
