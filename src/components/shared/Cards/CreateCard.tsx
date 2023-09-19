import React, { Fragment } from "react";
import Modal from "../Modal";
import Image from "next/image";
//Redux
import { form_ } from "@/src/redux/reducers/formReducer";
import { useDispatch } from "react-redux";
import { SquaresPlusIcon } from "@heroicons/react/24/outline";

type Props = {
  label: string;
  description: string;
  title: string;
  modalTitle: string;
  renderModalComponent: React.ReactNode;
  icon:any,
  heroicon:any,
  modalSize:any
};

const CreateCard = (props: Props) => {
  const [showModal, setShowModal] = React.useState<boolean>(false);

  //redux initialize
  const dispatch = useDispatch();

  return (
    <Fragment>
      <div className="flex flex-col h-full rounded-lg shadow-lg">
        <div className="w-full h-20 bg-custom-red-500 shadow-lg rounded" />
        <div
          className="flex flex-col  items-center"
          style={{
            transform: "translate(0, -40px)",
          }}
        >
          <div
            className=""
            style={{
              background: "#414455",
              width: "80px",
              height: "80px",
              borderRadius: "999px",
            }}
          >
             <Image
              src={props.icon}
              alt=""
              className="w-12 h-12 mx-auto mt-4"
            />
            {/* <img
              src="https://assets.codepen.io/3685267/res-react-dash-rocket.svg"
              alt=""
              className="w-full h-full"
            /> */}
          </div>
          <div className="mt-7 font-body font-semibold">{props.title}</div>
          <div className="mt-1 font-body text-sm text-center">{props.description}</div>
          <div
            className="flex items-center p-3 mt-3 bg-blue-gray-300"
            style={{
              borderRadius: "15px",
              padding: "8px 16px",
              justifyContent: "center",
              color: "white",
            }}
          >
            {/* <Icon path="res-react-dash-add-component" className="w-5 h-5" /> */}
            <div className="ml-2 font-body">{props.label}</div>
            <div
              className=" "
              style={{
                borderRadius: "10px",
                padding: "4px 8px 4px 8px",
              }}
            >
              <props.heroicon
                onClick={() => {
                  setShowModal(true);
                  dispatch(form_({ edit: false }));
                }}
                fill={"white"}
                className="w-6 h-6 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
      <Modal
      onScroll={null}
        label={props.modalTitle}
        showModal={showModal}
        modalSize={props.modalSize}
        setShowModal={setShowModal}
        viewTable={false}
      >
        {props.renderModalComponent}
      </Modal>
    </Fragment>
  );
};

const CreateCardHOC = React.memo(CreateCard);
export default CreateCardHOC;
