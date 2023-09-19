import React from "react";
import clsx from 'clsx'
import { Button } from "@material-tailwind/react";


type Props = { label: string; type: any, width:string };

const IconButton = (props: Props) => {
  return (
    
    <Button  type={props.type} color="red" variant="gradient" size="md">Spiderman</Button>
  );
};

const IconButtonHOC = React.memo(IconButton);
export default IconButtonHOC;
