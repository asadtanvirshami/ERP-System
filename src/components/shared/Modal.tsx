import React, { Fragment, useState } from "react";
import { Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";
//SVG Import
import CrossIcon from "../../../public/Image/Icons/svgs/cross.svg";
//Redux
import { useSelector } from "react-redux";

type Props = {
  showModal: boolean;
  setShowModal: (active: boolean) => void;
  children: React.ReactNode;
  modalSize: any;
  label: string;
};

const Modal = (props: Props) => {
  //Redux Selectors
  const edit = useSelector((state: any) => state.form.value.edit);
  const show_info = useSelector((state: any) => state.form.value.info);

  return (
    <Fragment>
      <Dialog
        open={props.showModal}
        size={props.modalSize}
        handler={() => props.setShowModal(false)}
      >
        <div className="flex  h-full w-full overflow-y-auto overflow-x-hidden outline-none">
          <div className="mt-2 mb-2 w-full justify-center flex font-body text-2xl text-blue-gray-700">
            {show_info ? (
               <>{edit ? null : `${props.label} Info` }</>
              
            ) : (
              <>{edit ? `Edit ${props.label}` : `Create ${props.label}`}</>
            )}
          </div>
          <div className="justify-center w-10 ">
            <CrossIcon
              onClick={() => props.setShowModal(false)}
              className=" h-5 w-5 mt-3 cursor-pointer"
              fill={"gray"}
            />
          </div>
        </div>
        <DialogBody divider className="h-[30rem] overflow-scroll m-3">
          <Fragment>{props.children}</Fragment>
        </DialogBody>
      </Dialog>
    </Fragment>
  );
};

export default Modal;
