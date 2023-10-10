import React from "react";
import { Stepper, Step, Button } from "@material-tailwind/react";
import { UsersIcon, CurrencyDollarIcon, CheckBadgeIcon, NewspaperIcon ,BuildingLibraryIcon } from "@heroicons/react/24/outline";
 

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
        <Step >
          <NewspaperIcon className="h-5 w-5" />
        </Step>
        <Step>
          <UsersIcon className="h-5 w-5" />
        </Step>
        <Step>
          <BuildingLibraryIcon className="h-5 w-5" />
        </Step>
        <Step>
          <CheckBadgeIcon className="h-5 w-5" />
        </Step>
      </Stepper>
    </div>
  )
}
const StepperHOC = React.memo(DefaultStepper);
export default StepperHOC;