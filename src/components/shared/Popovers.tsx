import React from "react";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Button
} from "@material-tailwind/react";

type Props = {
    state:any
};

const Popovers = ({state}: Props) => {
  return (
    <div>
      <Popover placement="top">
        <PopoverHandler>
          <Button ripple={false} color="red" variant="text">View</Button>
        </PopoverHandler>
        <PopoverContent>
          <span>{state}</span>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Popovers;
