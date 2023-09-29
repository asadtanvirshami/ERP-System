import React from "react";
import { Stepper, Step, Button } from "@material-tailwind/react";
import { HomeIcon, CogIcon, UserIcon } from "@heroicons/react/24/outline";
 

type Props = {
  activeStep: any;
  setActiveStep: any;
  items:any
};

const DefaultStepper = ({activeStep, setActiveStep, items}:Props) => {
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);
 
  const handleNext = () => !isLastStep && setActiveStep((cur:any) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur:any) => cur - 1);
 
  return (
    <div className="w-full py-4 px-8">
      <Stepper
        activeStep={activeStep}
        isLastStep={(value) => setIsLastStep(value)}
        isFirstStep={(value) => setIsFirstStep(value)}
      >
        <Step>
          <HomeIcon className="h-5 w-5" />
        </Step>
        <Step>
          <UserIcon className="h-5 w-5" />
        </Step>
        <Step>
          <CogIcon className="h-5 w-5" />
        </Step>
      </Stepper>
    </div>
  )
}
const StepperHOC = React.memo(DefaultStepper);
export default StepperHOC;