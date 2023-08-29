import React, { Fragment } from "react";
import Modal from "../Modal";
import Table from "../Table";

type Props = {
  label: string;
  title: string;
  modalTitle: string;
  renderModalComponent: React.ReactNode;
  data: Array<any>;
};
const ViewCard = ({ label, title, modalTitle, data }: Props) => {
  const [showModal, setShowModal] = React.useState<boolean>(false);

  const Keys = Object.keys(data[0]) as (keyof (typeof data)[0])[];

  console.log(Keys);
  return (
    <Fragment>
      <div className="flex p-4 flex-col h-full rounded-lg shadow-lg">
        <div className="flex justify-between items-center">
          <div className="text-theme-700 font-bold font-body">{title}</div>
        </div>
        <div className="font-body">{label}</div>
        <div className="h-100 flex-grow overflow-x-hidden overflow-auto flex flex-wrap content-start p-2">
          <ul className="p-3 w-full">
            {data.map((items, index) => {
              return (
                <div key={index}>
                  {
                    <li key={index} className=" p-3">
                      {Keys.map((key: any, i) => (
                        <td key={i}>
                          {index + 1} {data[0][key]}
                        </td>
                      ))}
                    </li>
                  }
                  <hr />
                </div>
              );
            })}
          </ul>
        </div>
        <div className="flex-grow" />
        <hr />
        <div className="flex justify-center">
          <div className="font-body cursor-pointer" onClick={() => setShowModal(true)}>
            View More
          </div>
        </div>
      </div>
      <Modal
        onScroll={false}
        label={modalTitle}
        showModal={showModal}
        modalSize="lg"
        setShowModal={setShowModal}
        viewTable={true}
      >
        <Table data={data} />
      </Modal>
    </Fragment>
  );
};

export default ViewCard;
