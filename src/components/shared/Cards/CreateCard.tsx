import React, { Fragment } from "react";
import Modal from "../Modal";
import AddIcon from "../../../../public/Image/Icons/svgs/Add.svg";
//Redux
import { form_ } from "@/src/redux/form";
import { useDispatch } from "react-redux";

type Props = {
  label: string;
  description: string;
  title: string;
  modalTitle: string;
  renderModalComponent: React.ReactNode;
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
            <img
              src="https://assets.codepen.io/3685267/res-react-dash-rocket.svg"
              alt=""
              className="w-full h-full"
            />
          </div>
          <div className="mt-7 font-body font-semibold">{props.title}</div>
          <div className="mt-1 font-body">{props.description}</div>
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
              className="ml-2 bg-blue-gray-100"
              style={{
                borderRadius: "10px",
                padding: "4px 8px 4px 8px",
              }}
            >
              <AddIcon
                onClick={() => {
                  setShowModal(true);
                  dispatch(form_({ form_edit: false }));
                }}
                fill={"white"}
                className="w-6 h-6 text-gray-500 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
      <Modal
        label={props.modalTitle}
        showModal={showModal}
        modalSize="xs"
        setShowModal={setShowModal}
      >
        {props.renderModalComponent}
      </Modal>
    </Fragment>
  );
};

export default CreateCard;
