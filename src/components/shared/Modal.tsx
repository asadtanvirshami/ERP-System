import React, { Fragment, useState } from "react";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
//SVG Import
import CrossIcon from "../../../public/Image/Icons/svgs/cross.svg";
//Redux
import { useSelector } from "react-redux";
import Button from "./Buttons/Button";

type Props = {
  showModal: boolean;
  setShowModal: (active: boolean) => void;
  children: React.ReactNode;
  modalSize: any;
  label: string;
  viewTable: any;
  onScroll: any;
};

const Modal = (props: Props) => {
  //Redux Selectors
  const edit = useSelector((state: any) => state.form.value.edit);

  return (
    <Fragment>
      <Dialog
        open={props.showModal}
        size={props.modalSize}
        handler={() => props.setShowModal(false)}
      >
        <div className="flex outline-none">
          <div className="mt-2 mb-2 w-full justify-center flex font-body text-2xl text-blue-gray-700">
            {props.viewTable ? (
              <>{`${props.label} Info`}</>
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
        <DialogBody
          onScroll={props.onScroll}
          divider
          // className="max-h-[10rem] max-w-[90rem] overflow-x-auto"
          className="max-h-[40rem] max-w-[90rem] overflow-x-auto"
        >
          {/* <DialogBody divider className="max-h-[40rem] max-w-[90rem] overflow-x-auto"> */}
          <Fragment>
            <div onScroll={props.onScroll}>{props.children}</div>
          </Fragment>
        </DialogBody>
        <DialogFooter>
          <></>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
};

export default Modal;
