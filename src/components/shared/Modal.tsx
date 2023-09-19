import React, { Fragment, useState } from "react";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
//SVG Import
import { XMarkIcon } from "@heroicons/react/24/solid";
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
  const [isOpen, setIsOpen] = useState(false);

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
            <XMarkIcon
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
      ;
    </Fragment>
  );
};
const ModalHOC = React.memo(Modal);
export default ModalHOC;
{
  /* <Fragment>
<>
  {props.showModal && (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-overlay"></div>

      <div className="modal-container bg-white md:w-11/12 lg:w-auto justify-around mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <div className="modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm z-10">
          <XMarkIcon
          onClick={() => props.setShowModal(false)}
            className="h-5 w-5 mt-3 cursor-pointer"
            fill={"gray"}
          />
        </div>

        <div className="modal-content py-4 text-left px-6">
          <div className="modal-title text-3xl font-semibold">
            {props.viewTable ? (
              <>{`${props.label} Info`}</>
            ) : (
              <>
                {edit ? `Edit ${props.label}` : `Create ${props.label}`}
              </>
            )}
          </div>
          <div className="modal-body mt-4">
            <div onScroll={props.onScroll}>{props.children}</div>
          </div>
        </div>
      </div>
    </div>
  )}
</>
</Fragment> */
}

// <Dialog
//   open={props.showModal}
//   size={props.modalSize}
//   handler={() => props.setShowModal(false)}
// >
//   <div className="flex outline-none">
//     <div className="mt-2 mb-2 w-full justify-center flex font-body text-2xl text-blue-gray-700">
//       {props.viewTable ? (
//         <>{`${props.label} Info`}</>
//       ) : (
//         <>{edit ? `Edit ${props.label}` : `Create ${props.label}`}</>
//       )}
//     </div>
//     <div className="justify-center w-10 ">
//       <XMarkIcon
//         onClick={() => props.setShowModal(false)}
//         className=" h-5 w-5 mt-3 cursor-pointer"
//         fill={"gray"}
//       />
//     </div>
//   </div>
//   <DialogBody
//     onScroll={props.onScroll}
//     divider
//     // className="max-h-[10rem] max-w-[90rem] overflow-x-auto"
//     className="max-h-[40rem] max-w-[90rem] overflow-x-auto"
//   >
//     {/* <DialogBody divider className="max-h-[40rem] max-w-[90rem] overflow-x-auto"> */}
//     <Fragment>
//       <div onScroll={props.onScroll}>{props.children}</div>
//     </Fragment>
//   </DialogBody>
//   <DialogFooter>
//     <></>
//   </DialogFooter>
// </Dialog>;
