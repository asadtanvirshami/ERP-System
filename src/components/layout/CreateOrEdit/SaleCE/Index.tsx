import React, { Fragment, useState } from "react";

import { Agents } from "@/src/interfaces/Agents";

import DefaultStepper from "@/src/components/shared/Stepper";
import SalesCE from "./SalesCE";

import { SalesFormItems } from "@/src/utils/StepperSets/Sales";

import Clients from "./ClientsCE";
import InvoiceCE from "./InvoiceCE";
import GeneratedInvoice from "./GeneratedInvoice";

type Props = {
  data: Array<Agents>;
  setData: any;
  options: any;
};

const Index = ({ data, setData, options }: Props) => {
  const [activeStep, setActiveStep] = useState(3);
  const [state, setState] = useState({
    sale: "",
    client: "",
    invoice: "",
  });
  console.log(state);    

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        SalesFormItems[activeStep].status = "Sale Creation";
        return (
          <SalesCE
            state={state.sale}
            setState={setState}
            active={activeStep}
            setActive={setActiveStep}
            data={data}
            setData={setData}
            options={options}
          />
        );
      case 1:
        SalesFormItems[activeStep].status = "Client Creation";
        return (
          <Clients
            state={state.sale}
            data={data}
            setState={setState}
            active={activeStep}
            setActive={setActiveStep}
            setData={setData}
          />
        );
      case 2:
        SalesFormItems[activeStep].status = "Invoice Creation";
        return (
          <InvoiceCE
            setState={setState}
            state={state}
            data={data}
            active={activeStep}
            setActive={setActiveStep}
            setData={setData}
          />
        );
      case 3:
        SalesFormItems[activeStep].status = "Generated Invoice";
        return (
          <GeneratedInvoice
            id={state.invoice}
            active={activeStep}
          />
        );

      default:
        return null;
    }
  };
  return (
    <div>
      <Fragment>
        <DefaultStepper
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          items={SalesFormItems}
        />
        {/* {SalesFormItems[activeStep].status} */}
        {renderStep()}
      </Fragment>
    </div>
  );
};

const SalesCreationHOC = React.memo(Index);
export default SalesCreationHOC;
